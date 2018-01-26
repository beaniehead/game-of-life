import React from "react"

class SpeedControls extends React.Component {
  render() {
    return (
      <div>
        <button
          className="speed"
          data-value="500"
          onClick={(e) => this.props.changeSpeed(e)}
        >Slow</button>
        <button className="speed" data-value="200"  onClick={(e) => this.props.changeSpeed(e)}>Medium</button>
        <button className="speed active-button" data-value="100"  onClick={(e) => this.props.changeSpeed(e)}>Fast</button>
      </div>
    )
  }

}

export default SpeedControls;
