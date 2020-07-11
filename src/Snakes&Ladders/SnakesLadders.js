import React from 'react';
import gridNumber from './json/GridNumber.json';
import snakes from './json/snakes.json';
import ladders from './json/ladders.json';
import imageplayer1 from './images/image-1.png';
import imageplayer2 from './images/image-2.png';
import one from './images/one.png'
import two from './images/two.png'
import three from './images/three.png'
import four from './images/four.png'
import five from './images/five.png'
import six from './images/six.png'
import './css/snakesandladders.css';

export class SnakesLadders extends React.Component {

  state = {
    user: {
      player1: 0,
      player2: 0,
    },
    dice: {
      player1: 6,
      player2: 6,
    },
    disabled: {
      player1: false,
      player2: true,
    },
    loadDice: {
      player1: false,
      player2: false,
    }
  }

  componentDidMount() {
    this.getElement();
    this.getElement_1();
  }

  gridLayoutCol = props => {
    const GridRow = this.gridLayoutRow;
    return gridNumber.map((gC, index) => {
      return (
        <tr key={index}>
          <GridRow grid={gC} />
        </tr>
      )
    })
  };

  players = ({ gR }) => {
    return (
      <>
        {this.state.user.player1 === gR &&
          <span>
            <img alt="player1" src={imageplayer1} width="15" height="15" style={{ borderRadius: '50%' }} />
          </span>
        }
        {this.state.user.player2 === gR &&
          <span>
            <img alt="player2" src={imageplayer2} width="15" height="15" style={{ borderRadius: '50%' }} />
          </span>
        }
      </>
    )
  }

  dices = () => {
    const { loadDice, disabled, dice } = this.state;
    return (
      ['player1', 'player2'].map(p =>
        <td style={{background:  disabled[p] ? 'white': 'skyblue' }} key={p} colSpan="5">
          <div>
            <strong>{p}</strong>{' '}
            {loadDice[p] ? 'Loading...'
              : <img
                id={p}
                onClick={this.randomize}
                height="40"
                width="40"
                src={this.getDice(dice[p])}
                style={{ pointerEvents: disabled[p] ? 'none' : 'all' }}
                alt={dice[p]}
              />}
          </div>
        </td>)
    )
  }
  gridLayoutRow = props => {
    const { grid } = props;
    const Players = this.players;
    return grid.map((gR, index) => {
      return (
        <td key={index} width="45" height="15" style={{ border: '1px solid black', background: gR % 2 === 0 ? 'yellow' : 'white' }}>
          <span id={gR}>
            {gR}
            <Players gR={gR} />
          </span>
        </td>
      )
    })
  }

  getDice = number => {
    switch (number) {
      case 1:
        return one;
      case 2:
        return two;
      case 3:
        return three;
      case 4:
        return four;
      case 5:
        return five;
      case 6:
        return six;
      default:
        return null;
    }
  }

  convertInObject = element => {
    const { top, right, bottom, left, width, height, x, y } = element.getBoundingClientRect()
    return { top, right, bottom, left, width, height, x, y }
  }

  getElement = e => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    for (let i = 0; i < snakes.length; i += 1) {
      const startIndex = this.convertInObject(document.getElementById(snakes[i][0]));
      const endIndex = this.convertInObject(document.getElementById(snakes[i][1]));
      if (startIndex && endIndex) {
        ctx.lineWidth = 8;
        ctx.strokeStyle = "red";
        ctx.moveTo(startIndex['x']+18, startIndex['y']+18);
        ctx.lineTo(endIndex['x'], endIndex['y']);
        ctx.stroke();
      }
    }
  }

  getElement_1 = e => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext("2d");
    for (let i = 0; i < ladders.length; i += 1) {
      const startIndex = this.convertInObject(document.getElementById(ladders[i][0]));
      const endIndex = this.convertInObject(document.getElementById(ladders[i][1]));
      if (startIndex && endIndex) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = "blue";
        ctx.moveTo(startIndex['x'], startIndex['y']);
        ctx.lineTo(endIndex['x'], endIndex['y']);
        ctx.stroke();
        ctx.moveTo(startIndex['x'] + 20, startIndex['y']);
        ctx.lineTo(endIndex['x'] + 20, endIndex['y']);
        ctx.stroke();
      }
    }
  }

  moveUser = (number, userId) => {
    const { user, dice } = this.state;
    const finalMove = user[userId] + number;
    if (finalMove <= 100) {
      user[userId] = finalMove;
      dice[userId] = number;
      this.setState({
        user,
        dice
      }, () => {
        if (user[userId] === 100) {
          alert(`Game Over: ${userId} Won`);
          this.init();
        }
        const result = this.isItemInArray([...snakes, ...ladders], this.state.user[userId]);
        if (result[0]) {
          this.changeLocation(result[1], userId);
        }
      })
    }
  };

  init = () => {
    this.setState({
      user: {
        player1: 0,
        player2: 0
      },
    })
  }

  changeLocation = (location, userId) => {
    const { user } = this.state;
    user[userId] = location;
    this.setState({
      user
    });
  }

  isItemInArray = (array, item) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][0] === item) {
        return [true, array[i][1]];
      }
    }
    return [false];
  };

  randomize = e => {
    const { id } = e.target;
    const { loadDice } = this.state;
    loadDice[id] = true;
    this.setState({ loadDice });
    setTimeout(() => {
      loadDice[id] = false;
      this.setState({ loadDice }, () => {
        const random = Math.floor(Math.random() * 6) + 1;
        if (this.validate(random, id))
          this.moveUser(random, id);
      });
    }, 1000);
  };

  validate = (number, userId) => {
    const { user, dice } = this.state;
    this.toggleDisable();
    if (user[userId] > 0) {
      return true;
    } else if (number === 1) {
      return true;
    }
    dice[userId] = number;
    this.setState({
      dice
    });
    return false;
  };

  toggleDisable = () => {
    const { disabled } = this.state;
    disabled['player1'] = !disabled['player1'];
    disabled['player2'] = !disabled['player2'];
    this.setState({
      disabled
    });
  };

  render() {
    const Grid = this.gridLayoutCol;
    const Dices = this.dices;
    return (
      <div>
        <canvas id="canvas" width="1349" height="605" style={{ 'position': 'absolute', 'zIndex': '999' }}></canvas>
        <canvas id="canvas1" width="1349" height="605" style={{ 'position': 'absolute', 'zIndex': '999' }}></canvas>
        <table style={{ margin: '0px auto', textAlign: 'center' }} cellPadding="13">
          <thead>
            <tr>
              <th colSpan="10"><strong>SNAKES & LADDERS</strong></th>
            </tr>
            <tr>
              <th colSpan="10">
                <span>Get one and start the walk, reach at hundred and win the game</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <Grid />
            <tr>
              <Dices />
            </tr>

          </tbody>
        </table>
      </div>
    );
  }
}