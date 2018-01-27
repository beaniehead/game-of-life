import React from 'react';

class Controls extends React.Component {

  render() {
    return (
      <div className="topInfo">
        <div className="topControls">

          <i className="fa fa-play buttons controlButtons play" onClick={(e) => this.props.startGame(e)} aria-hidden="true">
          </i>

          <i className="fa fa-pause buttons controlButtons pause" aria-hidden="true" onClick={(e) => this.props.pauseGame(e)}>
          </i>

          <i className="fa fa-stop buttons controlButtons reset" aria-hidden="true" onClick={(e) => this.props.resetGame(this.props.gridSize, e)}>
          </i>

        </div>
        <p className="gens">Generations: {this.props.gens}</p>
      </div>
    )
  }
}

export default Controls;
