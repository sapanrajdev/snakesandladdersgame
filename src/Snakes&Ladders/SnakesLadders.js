import React from 'react';
import snakes from './json/snakes.json';
import ladders from './json/ladders.json';
import { utils } from './utils';
import './css/snakesandladders.css';
import Dices from './components/Dices';
import GridCol from './components/GridCol';

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

  getElement = e => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    for (let i = 0; i < snakes.length; i += 1) {
      const startIndex = utils.convertInObject(document.getElementById(snakes[i][0]));
      const endIndex = utils.convertInObject(document.getElementById(snakes[i][1]));
      if (startIndex && endIndex) {
        ctx.lineWidth = 8;
        ctx.strokeStyle = "red";
        ctx.moveTo(startIndex['x']+18-330, startIndex['y']+18);
        ctx.lineTo(endIndex['x']-330, endIndex['y']);
        ctx.stroke();
      }
    }
  }

  getElement_1 = e => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext("2d");
    for (let i = 0; i < ladders.length; i += 1) {
      const startIndex = utils.convertInObject(document.getElementById(ladders[i][0]));
      const endIndex = utils.convertInObject(document.getElementById(ladders[i][1]));
      if (startIndex && endIndex) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = "blue";
        ctx.moveTo(startIndex['x']-300-10, startIndex['y']);
        ctx.lineTo(endIndex['x']-300-10, endIndex['y']+20);
        ctx.stroke();
        ctx.moveTo(startIndex['x'] + 20-330-10, startIndex['y']);
        ctx.lineTo(endIndex['x'] + 20-330-10, endIndex['y']+20);
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
        const result = utils.isItemInArray([...snakes, ...ladders], this.state.user[userId]);
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
    return (
      <div>
        <canvas id="canvas" width="790" height="550"></canvas>
        <canvas id="canvas1" width="790" height="550"></canvas>
        <table cellPadding="10">
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
            <GridCol {...this.state} />
            <tr>
              <Dices {...this.state} randomize={this.randomize} />
            </tr>

          </tbody>
        </table>
      </div>
    );
  }
}