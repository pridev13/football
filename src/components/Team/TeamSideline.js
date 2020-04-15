import React from 'react';

const teamSideline = React.memo((props) => {

  const classes = [
    'team',
    'team-' + props.color
  ];

  return (

    <div className={classes.join(' ')}>
      {props.teamName}
    </div>

  );

})

export default teamSideline;