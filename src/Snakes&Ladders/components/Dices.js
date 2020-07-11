import React from 'react'
import { utils } from '../utils';

const Dices = ({ loadDice, disabled, dice, randomize }) => {
  return (
    ['player1', 'player2'].map(p =>
      <td style={{background:  disabled[p] ? 'white': 'skyblue' }} key={p} colSpan="5">
        <div>
          <strong>{p}</strong>{' '}
          {loadDice[p] ? 'Loading...'
            : <img
              id={p}
              onClick={randomize}
              height="40"
              width="40"
              src={utils.getDice(dice[p])}
              style={{ pointerEvents: disabled[p] ? 'none' : 'all' }}
              alt={dice[p]}
            />}
        </div>
      </td>)
  )
}

export default Dices;