import {shuffleArray} from '../shared/utility';

const nameOptions = {
  teamNames: shuffleArray([
    'Ajax',
    'PSV',
    'Juventus',
    'Real Madrid',
    'Barcelona',
    'Manchester United',
    'Arsenal',
    'PSG',
    'Bayern München'
  ]),
  firstNames: shuffleArray([
    'Frenkie',
    'Daley',
    'Abdelhak',
    'Cristiano',
    'Zlatan',
    'André',
    'Hakim',
    'Dusan',
    'Lionel',
    'Johan',
    'Riechedley',
    'Davinson',
    'Kylian'
  ]),
  lastNames: shuffleArray([
    'Onana',
    'Blind',
    'de Boer',
    'Obama',
    'Mbappé',
    'Teixeira',
    'Cruijff',
    'Ronaldo',
    'Messi',
    'Ibrahimovic',
    'de Jong',
    'Litmanen',
    'Kanu'
  ]),
  colors: shuffleArray([
    'blue',
    'red',
    'black',
    'orange'
  ])
};

export const getNewTeamName = () => {
  return nameOptions.teamNames.shift();
}

export const getNewPlayerName = () => {
  return nameOptions.firstNames.shift() + " " + nameOptions.lastNames.shift();
}

export const getNewColor = () => {
  return nameOptions.colors.shift();
}