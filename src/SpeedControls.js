import React from "react"

class SpeedControls extends React.Component {
  render() {
    return (
      <div className="speedControls">
        <button
          className="speed1 speed buttons"
          data-value="500"
          onClick={(e) => this.props.changeSpeed(e)}
        ><i className="fa fa-forward" aria-hidden="true" data-value="500" onClick={(e) => this.props.changeSpeed(e)}></i>
        </button>
        <button className="speed2 speed buttons" data-value="200" onClick={(e) => this.props.changeSpeed(e)}><i className="fa fa-forward" aria-hidden="true" data-value="200" onClick={(e) => this.props.changeSpeed(e)}></i><i className="fa fa-forward" aria-hidden="true" data-value="200" onClick={(e) => this.props.changeSpeed(e)}></i>
        </button>
        <button className="speed3 speed buttons" data-value="100" onClick={(e) => this.props.changeSpeed(e)}><i className="fa fa-forward" aria-hidden="true" data-value="100" onClick={(e) => this.props.changeSpeed(e)}></i><i className="fa fa-forward" aria-hidden="true" data-value="100" onClick={(e) => this.props.changeSpeed(e)}></i><i className="fa fa-forward" aria-hidden="true" data-value="100" onClick={(e) => this.props.changeSpeed(e)}></i>
        </button>
      </div>
    )
  }

}

export default SpeedControls;
