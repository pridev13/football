import { updateObject, getRandomInt, shuffleArray } from '../shared/utility';
import { getNewTeamName, getNewPlayerName, getNewColor } from '../shared/nameOptions';
import { getRandomAvatar } from '../shared/avatarOptions';

const initState = {
  teams: [],
  score: [0, 0],
  moves: [],
  maxMoves: 30,
  possession: 0,
  kickoff: '',
  playing: false,
  fieldCols: 8
};

const initTeam = (state) => {

  const team = {
    teamName: getNewTeamName(),
    players: [
      createPlayer('gk'),
      createPlayer('def'),
      createPlayer('mid'),
      createPlayer('att'),
    ],
    color: getNewColor(),
    status: 'def' //att/def
  };

  const teams = state.teams.concat(team);

  return updateObject(state, {
    teams: teams
  });

}

const startMatch = (state) => {

  const kickoff = getRandomInt(1, 2) - 1;

  const newState = {
    possession: kickoff,
    kickoff: state.teams[kickoff].teamName,
    teams: [
      { ...state.teams[0] },
      { ...state.teams[1] },
    ],
    playing: true
  };

  newState.teams[kickoff].status = 'att';

  //give ball to att of kickoff team
  newState.teams[kickoff].players = [...state.teams[kickoff].players];
  const pId = getPlayerKeyByPosition(newState.teams[kickoff].players, 'att');
  newState.teams[kickoff].players[pId] = updateObject(
    newState.teams[kickoff].players[pId],
    { ball: true }
  );

  const event = {
    type: 'kickoff',
    team: newState.kickoff,
    step: state.moves.length
  };

  newState.moves = state.moves.concat(event);

  return updateObject(state, newState);

}

const endMatch = (state) => {

  const result = determineResult(state);

  const event = {
    type: 'end',
    score: state.score[0] + ':' + state.score[1],
    step: state.moves.length,
    ...result
  }

  const moves = [...state.moves];
  moves.unshift(event);

  const newState = {
    moves: moves,
    playing: false
  }

  return updateObject(state, newState);

}

const determineResult = (state) => {

  const score = state.score;

  const result = {};

  if (score[0] === score[1]) {
    result.result = 'draw';
  }
  else if (score[0] > score[1]) {
    result.result = 'win';
    result.winner = state.teams[0].teamName;
  }
  else {
    result.result = 'win';
    result.winner = state.teams[1].teamName;
  }

  return result;

}

/*
- Wie valt aan, team A of B?
  -> Team A
- wie heeft de bal?
  -> Speler X
- welke linie staat X?
  -> Linie Y
- Wie staat daar van team B?
  -> Speler Z
  -> Niemand
    -> Spelers team a linie naar voren en opnieuw
- Wat zijn de opties voor X vanaf linie Y?
  -> Passeren en passen
  -> Schieten
- Wat is het resultaat van de actie?
  -> Balverlies
  -> Er voorbij
  -> Goal
  -> Keeper

*/

const getRealLine = (line, teamId, totalLines) => {

  let realLine = line;

  if (teamId === 1) {
    realLine = totalLines - (line - 1);
  }

  return realLine;

}

const getTeamLine = (line, teamId, totalLines) => {

  let teamLine = line;

  if (teamId === 1) {
    teamLine = totalLines - (line - 1);
  }

  return teamLine;

}

const doMove = (state) => {

  const newState = {};
  const newTeams = [
    { ...state.teams[0] },
    { ...state.teams[1] }
  ];
  const newMoves = state.moves.slice();

  let newPlayers1 = [];
  let newPlayers2 = [];

  // Wie valt aan, team A of B?
  const posTeamId = state.possession;
  const posTeam = newTeams[posTeamId];
  const nonPosTeamId = getNonPossessionTeam(state);
  const nonPosTeam = newTeams[nonPosTeamId];

  // wie heeft de bal?
  const attackerId = getPlayerKeyWithBall(posTeam.players);
  const attacker = posTeam.players[attackerId];
  console.log('Attacker: ' + attackerId);

  // welke linie staat de aanvaller?
  const attLine = attacker.line;
  const realAttLine = getRealLine(attLine, posTeamId, state.fieldCols);
  console.log('Att. line: ' + attLine);
  console.log('Real att. line: ' + realAttLine);

  // Wie staat daar van de tegenstander?
  const defLine = getTeamLine(realAttLine, nonPosTeamId, state.fieldCols);
  console.log('Def. line: ' + defLine);

  const defenderId = getPlayerKeyByLine(nonPosTeam.players, defLine);
  console.log('Def. ID: ' + defenderId);

  const event = {
    att: {
      team: posTeam,
      player: attacker
    },
    def: {
      team: nonPosTeam
    },
    type: '',
    step: state.moves.length
  };

  //geen verdediger op deze lijn
  if (defenderId === false) {

    event.type = 'forward';

    //pass forward
    newPlayers1 = passBall(posTeam.players, 1);

    //no player to pass too
    if (!newPlayers1) {
      //move att team up
      newPlayers1 = moveTeam(posTeam.players, 1);
    }

    //update att players
    newTeams[posTeamId] = updateObject(posTeam, {
      players: newPlayers1
    });

  }
  else {

    const defender = nonPosTeam.players[defenderId];

    event.def.player = defender;

    const moveResult = headToHead(attacker, defender);
    console.log('Result: ' + moveResult);

    if (moveResult === 1) { //attacker won

      if (defender.pos === 'gk') {

        event.type = 'goal';

        //GOAL!
        newState.score = [...state.score];
        newState.score[state.possession]++;

        //switch possession
        newState.possession = nonPosTeamId;

        //back to kick-off & switch statuses
        newTeams[posTeamId] = updateObject(posTeam, {
          status: 'def',
          players: moveTeam(posTeam.players, 'init')
        });

        newTeams[nonPosTeamId] = updateObject(nonPosTeam, {
          status: 'att',
          players: moveTeam(nonPosTeam.players, 'init')
        });

        //set ball poss
        newPlayers1 = setBallPoss(newTeams[posTeamId].players, false);
        newPlayers2 = setBallPoss(newTeams[nonPosTeamId].players, 'att');

        newTeams[posTeamId] = updateObject(newTeams[posTeamId], {
          players: newPlayers1
        });

        newTeams[nonPosTeamId] = updateObject(newTeams[nonPosTeamId], {
          players: newPlayers2
        });

        // console.log('------------------Stop here---------------------');

      }
      else {

        event.type = 'continue';

        //pass forward
        newPlayers1 = passBall(posTeam.players, 1);

        //no player to pass too
        if (!newPlayers1) {
          newPlayers1 = posTeam.players;
        }
        //move att team up
        newPlayers1 = moveTeam(newPlayers1, 1);

        //update att players
        newTeams[posTeamId] = updateObject(posTeam, {
          players: newPlayers1
        });

        //move def team down
        newTeams[nonPosTeamId] = updateObject(nonPosTeam, {
          players: moveTeam(nonPosTeam.players, -1)
        });

      }

    }
    else { //defender/keeper won

      //switch possession
      newState.possession = nonPosTeamId;

      //switch team statuses
      newTeams[posTeamId] = updateObject(posTeam, {
        status: 'def',
        players: moveTeam(posTeam.players, -1) //move att team back
      });

      //do not move def team
      newTeams[nonPosTeamId] = updateObject(nonPosTeam, {
        status: 'att'
      });

      //default line for possession for other team
      let posLine = defender.pos;

      if (defender.pos === 'gk') { //keeper won
        event.type = 'save';
        //Save by the keeper! Start with ball at defender.
        posLine = 'def';
      }
      else {
        event.type = 'switch';
      }

      //set ball poss
      newPlayers1 = setBallPoss(newTeams[posTeamId].players, false);
      newTeams[posTeamId] = updateObject(newTeams[posTeamId], {
        players: newPlayers1
      });

      newPlayers2 = setBallPoss(newTeams[nonPosTeamId].players, posLine);
      newTeams[nonPosTeamId] = updateObject(newTeams[nonPosTeamId], {
        players: newPlayers2
      });

    }
  }

  newMoves.unshift(event);

  return updateObject(state, {
    ...newState,
    teams: newTeams,
    moves: newMoves
  });

}

const moveTeam = (players, dir) => {

  const newPlayers = [];

  players.map((pl) => {

    const player = { ...pl };

    if (dir === 'init') {
      player.line = player.sLine;
    }
    else if (player.pos !== 'gk') {
      player.line = Math.max(player.sLine, player.line + dir);
    }

    newPlayers.push(player);

    return true;

  });

  return newPlayers;

};

const passBall = (players, dir) => {

  let result = false;

  const pId = getPlayerKeyWithBall(players);

  if (pId !== false) {

    const pl = players[pId];

    const pId2 = getPlayerKeyByLine(players, pl.line + dir);

    if (pId2 !== false) {
      result = setBallPoss(players, players[pId2].pos);
    }

  }

  return result;

}

const setBallPoss = (players, pos) => {

  const newPlayers = [];
  let pId = false;

  if (pos !== false) {
    pId = getPlayerKeyByPosition(players, pos);
  }

  players.map((pl, key) => {

    const player = { ...pl };

    if (pos === false) {
      player.ball = false;
    }
    else {
      player.ball = key === pId;
    }

    newPlayers.push(player);

    return true;

  });

  return newPlayers;

};

const getNonPossessionTeam = (state) => {

  switch (state.possession) {
    case 1:
      return 0;
    default:
      return 1;
  }

}

const getPlayerKeyByLine = (players, line) => {

  let id = false;

  players.map((pl, key) => {

    if (pl.line === line) {
      id = key;
    }

    return true;

  });

  return id;

}

const getPlayerKeyByPosition = (players, pos) => {

  let id = false;

  players.map((pl, key) => {

    if (pl.pos === pos) {
      id = key;
    }

    return true;

  });

  return id;

}

const getPlayerKeyWithBall = (players) => {

  let id = false;

  players.map((pl, key) => {

    if (pl.ball === true) {
      id = key;
    }

    return true;

  });

  return id;

}

const getPlayerSkill = (player, skill) => {
  return player.skills[skill];
}

const headToHead = (attacker, defender) => {

  const att = getPlayerSkill(attacker, 'att');

  let head2head = Array(att).fill('att');

  let result = 1;

  if (defender.pos === 'gk') {
    //schot op doel
    const gk = getPlayerSkill(defender, 'gk');
    head2head = [...head2head, ...Array(gk).fill('gk')];
  }
  else {
    //passeren
    const def = getPlayerSkill(defender, 'def');
    head2head = [...head2head, ...Array(def).fill('def')];
  }

  head2head = shuffleArray(head2head);

  if (head2head.pop() === 'att') {
    result = 1;
  }
  else {
    result = -1;
    // if (defender.pos !== 'gk') result = 1; //temp for testing
  }

  // result = 1; //temp for testing
  // if (defender.pos === 'gk') result = -1; //temp for testing

  return result;

}

const createPlayer = (pos) => {

  const player = {
    name: getNewPlayerName(),
    pos: pos,
    skills: {
      'gk': getRandomInt(1, 2),
      'def': getRandomInt(1, 6),
      'att': getRandomInt(1, 6)
    },
    ball: false,
    line: 1,
    avatar: getRandomAvatar()
  };

  switch (pos) {
    case 'def':
      player.line = 2;
      player.skills[pos] = getRandomInt(6, 10);
      break;
    case 'mid':
      player.line = 3;
      player.skills['def'] = getRandomInt(4, 8);
      player.skills['att'] = getRandomInt(4, 8);
      break;
    case 'att':
      player.line = 4;
      player.skills[pos] = getRandomInt(6, 10);
      break;
    default:
      player.skills[pos] = getRandomInt(6, 10);
      break;
  }

  player.sLine = player.line;

  return player;

}

const reducer = (state = initState, action) => {

  switch (action.type) {
    case 'INIT_TEAM':
      return initTeam(state);
    case 'START_MATCH':
      return startMatch(state);
    case 'END_MATCH':
      return endMatch(state);
    case 'DO_MOVE':
      return doMove(state);
    default:
      return state;
  }

};

export default reducer;