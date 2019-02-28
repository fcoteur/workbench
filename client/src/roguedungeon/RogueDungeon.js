import React from 'react'
import styled from 'styled-components';

import Board from './Board'
import Info from './Info'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default class RogueDungeon extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      board: [],
      visibleBoard:[],
      dim: [30, 30], // columns,lines
      positionPlayer: [],
      health: 0,
      weapon: 0,
      attackPower: 0,
      levelXP: 0,
      dungeon: 0,
      weapons: ["spade","dagger", "small sword", "silver sword", "thunder sword"],
      enemies: []
    }
    this.generateVisibleBoard = this.generateVisibleBoard.bind(this);
  }
  render() {
    return (
      <Container>
        <Info 
          dungeon={this.state.dungeon} 
          health={this.state.health}
          weapon={this.state.weapons[this.state.weapon]}
          attackPower={this.state.attackPower}
          levelXP={this.state.levelXP}
          enemies={this.state.enemies}
          />
        <Board 
          board={this.state.board} 
          visibleBoard={this.state.visibleBoard} 
          dim={this.state.dim}
          />
      </Container>
    )
  }
  componentWillMount() {
    this.reset();
    this.drawNewBoard();
    document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }
  reset() {
    // set all default states
    this.setState({      
      health: 20,
      weapon: 0,
      attackPower: 5,
      levelXP: 0,
      dungeon: 1,
    });
  }
  drawNewBoard() {
    // get initial position and launch the creation of the maze
    let initPos = [Math.floor(Math.random()*this.state.dim[0]), Math.floor(Math.random()*this.state.dim[1])];
    this.setState({
      positionPlayer: initPos,
      enemies: []
    }, () => {
      this.createMaze(initPos);
      this.generateVisibleBoard();
    });
  } 
  onKeyPressed(data) {
    let board=this.state.board,
        col = this.state.positionPlayer[0],
        row = this.state.positionPlayer[1],
        cols= this.state.dim[0],
        indexMove, 
        indexActualPos;
    
    // get move from keyboard
    indexActualPos = col + row * cols;
    if (data.key ==="ArrowDown")  {row++;}
    if (data.key ==="ArrowLeft")  {col--;}
    if (data.key ==="ArrowUp")  {row--;}
    if (data.key ==="ArrowRight")  {col++;}
    indexMove = col + row * cols;
    
    // move in case the next move is free
    if (board[indexMove]===0 && col<cols && col>=0) {
      board[indexActualPos]=0;
      board[indexMove]=2;
      this.setState({
        board: board, 
        positionPlayer:[col, row]
      }, this.generateVisibleBoard());
    }
    
    // the next move is an arm
    if (board[indexMove]===4) {
      board[indexActualPos]=0;
      board[indexMove]=2;
      this.setState({
        board: board, 
        positionPlayer:[col, row], 
        weapon: this.state.weapon + 1,
        attackPower: this.state.attackPower + 3
      }, this.generateVisibleBoard());
    }
    
    // the  next move is a health
    if (board[indexMove]===5) {
      board[indexActualPos]=0;
      board[indexMove]=2;
      this.setState({
        board: board, 
        positionPlayer:[col, row], 
        health: this.state.health + 5,
      }, this.generateVisibleBoard());
    }
    
    // the next move is an enemy or THE BOSS
    if (board[indexMove]===3 || board[indexMove]===7 ) {
      let enemies = this.state.enemies,
          healthPlayer= this.state.health;
      for (let i=0; i<enemies.length; i++){
        if (enemies[i].index === indexMove){
          // player strikes first, levelXP adds an aditional % of damage
          enemies[i].health -= Math.floor(Math.random() * this.state.attackPower + (Math.random() * this.state.attackPower) * this.state.levelXP / 100);
          if (board[indexMove]===7 && enemies[i].health<=0) {
            alert("YOU KILLED THE BOSS!!! YOU WIN!!!!");
            this.reset();
            return;
          }
          // the enemy strikes, if still alive
          if (enemies[i].health>0) { 
            healthPlayer -= Math.floor(Math.random()*enemies[i].attackPower);
            if (healthPlayer<=0) {
              alert("GAME OVER");
              this.reset();
              this.drawNewBoard();
              return;
            }
          } else {
            board[indexActualPos]=0;
            board[indexMove]=2;
            this.setState({
              positionPlayer:[col, row]
            }, this.generateVisibleBoard());
          }
        }
      }
      this.setState({
        health: healthPlayer,
        enemies: enemies,
        levelXP: this.state.levelXP + 10
      });

    }
    
    // the next move is door
    if (board[indexMove]===6) {
      this.setState({
        dungeon: this.state.dungeon + 1
      });
      this.drawNewBoard();
    }
    }
  createMaze(){
    let cols=this.state.dim[0],
        rows=this.state.dim[1],
        totalCells = cols * rows,
        board =[],
        maxLength=15,
        amountTunnel=160,
        direction,
        length, index,
        tailPos=this.state.positionPlayer,
        enemmiesPerDungeon=5,
        armsPerDungeon=1,
        healthPerDungeon=5;
    // generate a board full of 1 (walls)
    for (let i = 0; i < totalCells ; i++) {
      board.push(1);
    }
   // dig tunnels
    let digCol = tailPos[0],
        digRow = tailPos[1];
    // randomly assign direction but prevent opposite direction from last move
    for (let i = 0; i < amountTunnel; i++){
      let newDirection = Math.floor(Math.random()*4); // 0-North, 1-East, 2-South, 3-West
      while (newDirection === direction+2 || newDirection === direction-2 || newDirection === direction) {
        newDirection = Math.floor(Math.random()*4);
      }
      direction = newDirection;// 0-North, 1-East, 2-South, 3-West
      length = Math.floor(Math.random()*maxLength) +1;  
      // dig the tunnel
      for (let i = 0; i<length; i++){
        switch (direction) {
          case 0:
            if(digRow>0) {digRow--;}
            break;
          case 1:
            if (digCol+1<cols) {digCol++;}
            break;
          case 2:
            if (digRow+1<rows) {digRow++;}
            break;
          case 3:
            if (digCol>0) {digCol--;}
            break;
          default:
            break;
        }
        index = digCol + digRow * cols;
        board[index]=0;  
      }
    } 
    // place the  player in the maze
    index = this.state.positionPlayer[0] + this.state.positionPlayer[1] * cols;
    board[index] = 2;  
    
    // place ennemies
    for (let i=0; i<enemmiesPerDungeon;i++) {
      do {
        index=Math.floor(Math.random()*totalCells);
      } 
      while (board[index] !==0);
      this.state.enemies.push({
        index: index, 
        health: 10 + (this.state.dungeon*2), 
        attackPower: 5 + (this.state.dungeon*2)
      });
      board[index]=3;
    }
    
    // place the boss
    if (this.state.dungeon >=4) {
      do {
        index=Math.floor(Math.random()*totalCells);
      } 
      while (board[index] !==0);
      this.state.enemies.push({
        index: index,
        health: 50,
        attackPower: 18
      });
      board[index]=7;
    }
    
    //place arms
    for (let i=0; i<armsPerDungeon;i++) {
      do {index=Math.floor(Math.random()*totalCells);} 
      while (board[index] !==0);
      board[index]=4;
    }
    //place healths
    for (let i=0; i<healthPerDungeon;i++) {
      do {index=Math.floor(Math.random()*totalCells);} 
      while (board[index] !==0);
      board[index]=5;
    }
    //place door
    if (this.state.dungeon < 4) {
      do {index=Math.floor(Math.random()*totalCells);} 
      while (board[index] !==0);
      board[index]=6;
    }
    // update the board
    this.setState({board: board});
  }
  generateVisibleBoard() {
    let visibleBoard =[],
        cols = this.state.dim[0],
        indexPos = this.state.positionPlayer[0] + this.state.positionPlayer[1] * cols;
    const totalCells = this.state.dim[0] * this.state.dim[1];
    for (let i = 0; i < totalCells ; i++) {
      visibleBoard.push(8);
    }
    // apply visibility aroud the position of the player
    let widthVis = 9 // must be odd!!!!
    for (let i=0 ; i<widthVis; i++) {
      visibleBoard[indexPos-(widthVis-1)/2+i]=1;
      visibleBoard[indexPos-(widthVis-1)/2+i + cols]=1;
      visibleBoard[indexPos-(widthVis-1)/2+i + 2*cols]=1;
      visibleBoard[indexPos-(widthVis-1)/2+i + 3*cols]=1;
      visibleBoard[indexPos-(widthVis-2)/2+i + 4*cols]=1;
      visibleBoard[indexPos-(widthVis-1)/2+i - cols ]=1;
      visibleBoard[indexPos-(widthVis-1)/2+i - 2*cols]=1;
      visibleBoard[indexPos-(widthVis-1)/2+i - 3*cols ]=1;
      visibleBoard[indexPos-(widthVis-2)/2+i - 4*cols ]=1;
    }
    
    this.setState({visibleBoard: visibleBoard});
  }
}
