import React, { useEffect, useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

import Scoreboard from '../../components/Scoreboard/Scoreboard';
import TeamLineup from '../../components/Team/TeamLineup';
import Field from '../Field/Field';
import Moves from '../../containers/Moves/Moves';

const Match = (props) => {

  const dispatch = useDispatch();
  const startMatch = useCallback(() => dispatch(actions.startMatch()), [dispatch]);
  const doMove = useCallback(() => dispatch(actions.doMove()), [dispatch]);
  const endMatch = useCallback(() => dispatch(actions.endMatch()), [dispatch]);

  const moves = props.moves;
  const maxMoves = props.maxMoves;
  const playing = props.playing;

  useEffect(() => {
    startMatch();
  }, [startMatch]);

  useEffect(() => {

    if (playing) {

      if (moves.length < maxMoves) {

        setTimeout(() => {
          doMove();
        }, 1000);

      }
      else {
        endMatch();
      }

    }

  }, [moves, maxMoves, playing, doMove, endMatch]);

  return (
    <React.Fragment>
      <Scoreboard />
      <TeamLineup id="0" />
      <Field />
      <Moves moves={props.moves} />
      <TeamLineup id="1" />
    </React.Fragment>
  );

}

const mapStateToProps = (redux) => {
  return {
    moves: redux.moves,
    maxMoves: redux.maxMoves,
    playing: redux.playing
  };
}

export default connect(mapStateToProps, null)(Match);