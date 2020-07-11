import React from 'react'
import gridNumber from '../json/GridNumber.json';
import GridRow from './GridRow';

const GridCol = props => (
  gridNumber.map((gC, index) => {
    return (
      <tr key={index}>
        <GridRow {...props} grid={gC} />
      </tr>
    )
  })
);

export default GridCol;