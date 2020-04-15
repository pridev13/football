import React from 'react';
import { connect } from 'react-redux';

const scoreboard = React.memo((props) => {

  let fixture = 'Loading...';

  if(props.teams[0] && props.teams[1]) {

    fixture = props.teams[0].teamName + ' vs. ' + props.teams[1].teamName;
    document.title = fixture;

  }

  return (
    <div className="scoreboard">

      <h1 className="fixture">
        {fixture}
      </h1>

      <div className="score">
        {props.score[0]} : {props.score[1]}
      </div>

    </div>
  );

})

const mapStateToProps = (redux) => {
  return {
    teams: redux.teams,
    score: redux.score
  };
}

export default connect(mapStateToProps, null)(scoreboard);