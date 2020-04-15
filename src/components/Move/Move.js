import React from 'react';

const move = React.memo((props) => {

  // console.log('Rendering move ' + props.step);

  let output = '';
  const classes = ['move', 'move-' + props.type];

  switch (props.type) {
    case 'kickoff':
      output = 'Kickoff by ' + props.team;
      break;
    case 'forward':
       output = props.att.team.teamName + ' pushes forward';
       break;
    case 'continue':
      output = props.att.player.name + ' gets past ' + props.def.player.name;
      break;
    case 'switch':
      output = props.def.player.name + ' dispossesses ' + props.att.player.name;
      break;
    case 'save':
      output = props.def.player.name + ' saves shot from ' + props.att.player.name + '!';
      break;
    case 'goal':
      output = props.att.player.name + ' scores against ' + props.def.player.name + '!';
      break;
    case 'end':
      if(props.result === 'draw') {
        output = 'Match ends in ' + props.score + ' draw!';
      }
      else {
        output = props.winner + ' wins ' + props.score + '!';
      }
      break;
    default:
      output = props.type;
  }

  return (
    <div className={classes.join(' ')}>

      {props.step}' - {output}

    </div>
  );

});

export default move;