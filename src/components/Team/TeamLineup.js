import React, { Component } from 'react';
import PlayerLineup from '../Player/PlayerLineup';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Team extends Component {

  componentDidMount() {
    this.props.onTeamMounted();
  }

  render() {

    let teamName = 'Generating...';
    let players = 'Generating players...';

    if (this.props.teams[this.props.id]) {

      const team = this.props.teams[this.props.id];

      teamName = team.teamName;

      players = <React.Fragment>
        {team.players.map((el) => {
          return <PlayerLineup key={el.pos} {...el} />
        })}
      </React.Fragment>;

    }

    return (
      <div className="team">
        <h2 className="team-name">{teamName}</h2>
        <div className="players">
          {players}
        </div>
      </div>
    );

  }

}

const mapStateToProps = (redux) => {
  return {
    teams: redux.teams
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTeamMounted: () => dispatch(actions.initTeam())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);