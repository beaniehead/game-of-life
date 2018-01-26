import React from "react"

class SpeedControls extends React.Component {
  render() {
    return (
      <div className="speedControls">
        <button
          className="speed1 speed buttons"
          data-value="500"
          onClick={(e) => this.props.changeSpeed(e)}
        >Slow
        </button>
        <button className="speed2 speed buttons active-button" data-value="200" onClick={(e) => this.props.changeSpeed(e)}>
        Medium
        </button>
        <button className="speed3 speed buttons" data-value="100" onClick={(e) => this.props.changeSpeed(e)}>
        Fast
        </button>
      </div>
    )
  }

}

export default SpeedControls;
