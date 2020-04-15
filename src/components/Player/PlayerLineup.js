import React from 'react';
import Avatar from 'avataaars';

const player = React.memo((props) => {

  const skills = Object.keys(props.skills).map((key) => {

    const skillClasses = ['player-skill', 'skill-' + key];

    return (

      <div className={skillClasses.join(' ')} key={key}>
        {key}: {props.skills[key]}
      </div>

    );

  });

  const classNames = ['player', 'player-' + props.pos];

  return (
    <div className={classNames.join(' ')}>

      <div className="player-avatar">

        <Avatar {...props.avatar} />

      </div>
      <div className="player-name">{props.name}</div>
      <div className="player-pos">{props.pos}</div>

      <div className="player-skills">
        {skills}
      </div>

    </div>
  );

})

export default player;