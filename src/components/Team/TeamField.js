import React from 'react';
import PlayerField from '../Player/PlayerField';

const teamField = (props) => {

  const classes = [
    'field-team',
    'color-' + props.color,
    'team-' + props.id,
    'team-' + props.status
  ];

  const players = <React.Fragment>
    {props.players.map((el) => {
      return <PlayerField key={el.pos} dir={props.id === 0 ? 'left' : 'right'} {...el} />
    })}
  </React.Fragment>;

  return (
    <div className={classes.join(' ')}>
      {players}
    </div>
  );

}

export default teamField;