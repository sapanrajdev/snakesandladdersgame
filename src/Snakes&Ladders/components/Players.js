import React from 'react'
import imageplayer1 from '../images/image-1.png';
import imageplayer2 from '../images/image-2.png';

const Players = props => {
  const { user, gR } = props;
  return (
    <>
      {user.player1 === gR &&
        <span>
          <img alt="player1" src={imageplayer1} width="15" height="15" style={{ borderRadius: '50%' }} />
        </span>
      }
      {user.player2 === gR &&
        <span>
          <img alt="player2" src={imageplayer2} width="15" height="15" style={{ borderRadius: '50%' }} />
        </span>
      }
    </>
  );
}

export default Players;