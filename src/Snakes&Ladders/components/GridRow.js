import React from 'react'
import Players from './Players';

const GridRow = props => (
  props.grid.map((gR, index) => {
    return (
      <td
      key={index} 
      width="45" 
      height="15" 
      className="number"
      style={{background: gR % 2 === 0 ? 'yellow' : 'white' }}>
        <span id={gR}>
          <strong>{gR}</strong>
          <Players {...props} gR={gR}/>
        </span>
      </td>
    )
  })
);

export default GridRow