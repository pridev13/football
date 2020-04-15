import React from 'react';
import { connect } from 'react-redux';
import TeamSideline from '../../components/Team/TeamSideline';
import TeamField from '../../components/Team/TeamField';

import fieldImg from '../../assets/images/field.svg';

const field = React.memo((props) => {

  return (

    <div className="field-wrapper">

      <div className="field">

        <div className="background">
          <img src={fieldImg} alt="" />
        </div>

        <div className="overlay">

          <div className="section section-1"></div>
          <div className="section section-2"></div>
          <div className="section section-3"></div>
          <div className="section section-4"></div>
          <div className="section section-5"></div>
          <div className="section section-6"></div>
          <div className="section section-7"></div>
          <div className="section section-8"></div>

        </div>

        {props.teams[0] ? <TeamField {...props.teams[0]} id={0} /> : null}
        {props.teams[1] ? <TeamField {...props.teams[1]} id={1} /> : null}

      </div>

      <div className="sideline">
        {props.teams[0] ? <TeamSideline {...props.teams[0]} /> : null}
        {props.teams[1] ? <TeamSideline {...props.teams[1]} /> : null}
      </div>

    </div>

  );

})

const mapStateToProps = (redux) => {
  return {
    teams: redux.teams,
    fCols: redux.fieldCols
  };
}

export default connect(mapStateToProps, null)(field);