import React from 'react';
import { connect } from 'react-redux';

import { AccessibilityNew, DirectionsWalk, DirectionsRun } from '@material-ui/icons';

const playerField = (props) => {

  const classes = [
    'field-player',
    'pos-' + props.pos,
    props.ball ? 'has-ball' : 'no-ball'
  ];

  let offset = 'calc(100%/' + props.fCols + ' * ' + (props.line - 1) + ' + 100%/' + (props.fCols * 4) + ')';

  if(props.pos === 'gk') {
    offset = '0px';
  }

  const style = {};
  style[props.dir] = offset;

  return (
    <div title={props.name} className={classes.join(' ')} style={style}>
      <div className="normal">
        {props.pos === 'gk' ?
          <AccessibilityNew /> :
          <DirectionsWalk />
        }
      </div>
      <div className="moving">
        <DirectionsRun />
      </div>
    </div>
  );

}

const mapStateToProps = (redux) => {
  return {
    fCols: redux.fieldCols
  };
}

export default connect(mapStateToProps, null)(playerField);