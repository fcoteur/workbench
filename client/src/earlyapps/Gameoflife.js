import React from 'react';

export default class Gameoflife extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      board: [],
      dim: [70, 70],
      count: 0
    }
    this.generationPassing = this.generationPassing.bind(this);
    this.randomboard = this.randomboard.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.clear = this.clear.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  render() {
    let styleBtn = {
      borderRadius: 5,
      borderStyle: 'solid',
      borderWidth: 1,
      padding: 5,
      margin: 5,
      textAlign: 'center'
    }
    return (
      <div style={styleBtn} >
        <button style={styleBtn} onClick={this.start} type="button">Start</button>
        <button style={styleBtn} onClick={this.pause} type="button">Pause</button>
        <button style={styleBtn} onClick={this.clear} type="button">Clear</button>
        <button style={styleBtn} onClick={this.randomboard} type="button">Random</button>
        <input style={styleBtn} value={this.state.count}/>
        <Board board={this.state.board} dim={this.state.dim} toggleCellNumber={this.handleToggle}/>
      </div>
    )
  }
  componentWillMount() {
    // generate board and populate randomly
    this.randomboard();
  } 
  handleToggle(cell){
    let board = this.state.board;
    if (board[cell] === 0) {board[cell] = 1;} else {board[cell] = 0;}
    this.setState({board: board});
  }
  
  start() {
    this.interval = setInterval(this.generationPassing, 200);
  }
  pause() {
    clearInterval(this.interval);
  }
  clear () {
    clearInterval(this.interval);
    let board =[];
    const totalCells = this.state.dim[0] * this.state.dim[1];
    for (let i = 0; i < totalCells ; i++) {
      board.push(0);
    }
    this.setState({board: board, count:0})
  }
  randomboard() {
    // generate board and populate randomly
    let board =[];
    const totalCells = this.state.dim[0] * this.state.dim[1];
    for (let i = 0; i < totalCells ; i++) {
      board.push(Math.floor(Math.random()*2));
    }
    this.setState({board: board, count: 0}, function() {
      this.start();
    });
  }
  generationPassing() {
    // count generations  +1
    this.setState({count: this.state.count + 1});
    
    // 0 = no life ; 1 = life 
    let destinyScore;
    let x = this.state.dim[0];
    let board = this.state.board;
    let boardLength = board.length;
    let newBoard=[];
    for (let i = 0; i < board.length ; i++) {
      // calculate the aount of neighbourgs represented by the cardinal position
      let  nw, n, ne, e, se, s, sw, w;
      if ((i-x)-1 >= 0) {nw = board[(i-x)-1];} else {nw = board[boardLength + (i-x)-1];}
      if ((i-x) >= 0) {n = board[(i-x)];} else {n = board[boardLength + (i-x)];}
      if ((i-x)+1 >= 0) {ne = board[(i-x)+1];} else {ne = board[boardLength + (i-x)+1];}
      if (i-1 >= 0) {w = board[i-1];} else {w = board[boardLength + (i-1)];}
      if (i+1 <= boardLength) {e = board[i+1];} else {e = board[(i+1)-boardLength];}
      if ((i+x)-1 <= boardLength) {sw = board[(i+x)-1];} else {sw = board[((i+x)-1)-boardLength];}
      if ((i+x) <= boardLength) {s = board[(i+x)];} else {s = board[(i+x)-boardLength];} 
      if ((i+x)+1 <= boardLength) {se = board[(i+x)+1];} else {se = board[(i+x)+1-boardLength];}
      destinyScore =   nw + n + ne + e + se + s + sw + w;
      // populate new board with rules of the game
      if (board[i] === 1) {
        switch(destinyScore){
          case 0:
          case 1:
            newBoard.push(0); // death of isolation
            break;
          case 2:
          case 3:
            newBoard.push(1); // live
            break;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            newBoard.push(0); // death by overpopulation
            break
          default:
            newBoard.push(0);
            break;
        }
      } else {
        if (destinyScore === 3) {
          newBoard.push(1); // 3 parents -> new born!
        } else {
          newBoard.push(0); // no parents... remains dead
        }
      }
    } 
    this.setState({board: newBoard});
    
  }
}

class  Board extends React.Component {
  constructor(props) {
    super(props);    
    this.onItemClick = this.onItemClick.bind(this);
  }
  render() {
    // generate an array of lines to be rendered
    let tableOfLines =[];
    for (let i = 0; i < this.props.dim[1]; i++){
      let linesOfCells =[];
      for (let j=0; j<this.props.dim[0]; j++){
        
        linesOfCells.push(this.props.board[this.props.dim[0]*i+j]);
      }
      tableOfLines.push(linesOfCells);
    }
    // style the cells
    let style0 = {
      backgroundColor: "white",
      height: 10,
      width: 10,
      margin: 0,
      padding: 0,
      borderWidth: 0
    }
    let style1 = {
      backgroundColor: "black",
      height: 10,
      width: 10,
      margin: 0,
      padding: 0,
      borderWidth: 0
    }
    let styleDiv = {
      height: 10
    }
    return (
      <div style={{margin:10}}>
        {
          tableOfLines.map((data,index) => {
            let line = index;
            return (
              <div style={styleDiv}>
                {data.map((cell,i) => {
                  if (cell === 0) {return <button onClick={() => {this.onItemClick(i,line);}} style={style0} type="button"/>}
                  if (cell === 1) {return <button onClick={() => {this.onItemClick(i,line);}} style={style1} type="button"/>}
                  return null
                })}
              </div>
            )
          })            
        }
      </div>
    );
  }
  onItemClick(index,line) {
    this.props.toggleCellNumber(index + (this.props.dim[0] * line));
  }
}
