import React from 'react';
import Move from '../../components/Move/Move';

const moves = (props) => {

  return (
    <div className="moves">

      {props.moves.map((el) => (
        <Move key={el.step} {...el} />
      ))}

    </div>
  );

}

export default moves;