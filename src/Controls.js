import React from 'react';

class Controls extends React.Component {
  render() {
    return (
      <div className="topInfo">
        <div className="topControls">
          <button className="buttons controlButtons play" onClick={this.props.startGame}><i className="fa fa-play" aria-hidden="true"></i>
</button>
          <button className="buttons controlButtons pause" onClick={this.props.pauseGame}><i className="fa fa-pause" aria-hidden="true"></i></button>
          <button className="buttons controlButtons reset" onClick={() => this.props.resetGame(this.props.gridSize)}><i className="fa fa-stop" aria-hidden="true"></i></button>
        </div>
        <p className="gens">Generations: {this.props.gens}</p>
      </div>
    )
  }
}

export default Controls;
