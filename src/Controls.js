import React from 'react';

class Controls extends React.Component {
  render() {
    return (
      <div>
        <p className="gens">Generations: {this.props.gens}</p>
        <button onClick={this.props.startGame}>Start</button>
        <button onClick={this.props.pauseGame}>Pause</button>
        <button onClick={this.props.resetGame}>Reset</button>

      </div>
    )
  }
}

export default Controls;
