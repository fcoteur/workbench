import React from 'react'

export default class Board extends React.Component {
  render() {
    let visibleBoard = this.props.visibleBoard;
    let board= this.props.board;
    // apply visibility layer to the baord
    for (let i = 0; i < board.length; i++) {
      if (visibleBoard[i]!==8) {visibleBoard[i]=board[i];}
    }
    // generate an array of lines to be rendered
    let tableOfLines =[];
    for (let i = 0; i < this.props.dim[1]; i++){
      let linesOfCells =[];
      for (let j=0; j<this.props.dim[0]; j++){
        linesOfCells.push(visibleBoard[this.props.dim[0]*i+j]);
      }
      tableOfLines.push(linesOfCells);
    }
    // set the colors
    let mapOfColors= [
      {backgroundColor:'silver'}, // 0 - free & visible
      {backgroundColor:'black'}, // 1 - wall
      {backgroundColor:'blue'}, // 2 - player
      {backgroundColor:'#ff6666'}, // 3 - ennemmi
      {backgroundColor:'orange'}, // 4 - arm
      {backgroundColor:'green'},  // 5 - health
      {backgroundColor:'purple'},  // 6 - door
      {backgroundColor:'red',
       borderWidth: 5,
       borderColor: 'black'},  // 7-  THE BOSS
      {backgroundColor: "grey"} // 8 - hidden
    ];

    let btn = {
      height: "15px", 
      width: '15px',
      margin: '0px',
      padding: '0px',
      border: 'none'
    }
    return (
      <div className="board">
        {
          tableOfLines.map((data,index) => {
            return (
              <div style={{height: '15px'}}>
                {data.map((cell,i) => {
                  const styleBtn = {...mapOfColors[cell],...btn}                  
                  return <button style={styleBtn} type="button"/>
                })}
              </div>
            )
          })            
        }
      </div>
    );
  }

}