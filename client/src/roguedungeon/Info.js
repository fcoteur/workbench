import React from 'react'

export default class Info extends React.Component  {
  render() {
    let styleBtn = {
      padding: 0,
      margin: 0,
      textAlign: 'left'
    }
    let styleDiv = {
      display: "flex", 
      flexDirection: "row",
      justifyContent: "space-around"
    }
    return (
      <div>  
        <div style={styleDiv}>
          <div style={styleBtn}>
            <div style={styleBtn}><strong>Player: </strong></div>
            <div style={styleBtn}><strong>Dungeon: </strong>{this.props.dungeon}</div>
            <div style={styleBtn}><strong>Health: </strong>{this.props.health}</div>
            <div style={styleBtn}><strong>Level: </strong>{this.props.levelXP} XP</div>   
            <div style={styleBtn}><strong>Weapon: </strong>{this.props.weapon}</div>
            <div style={styleBtn}><strong>Attack Power: </strong>{this.props.attackPower}</div>
          </div>
          <div style={styleBtn}>
            <span style={styleBtn}><strong>Enemies: </strong>{this.props.enemies.map((data, index) => {
                return <div>#{index +1 } health: {data.health } attack Power: {data.attackPower}</div>
              })
                                                             }</span>
          </div>
        </div>
      </div>
    )
  }
}
