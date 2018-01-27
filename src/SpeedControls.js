import React from "react"

class SpeedControls extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const speedButtons = document.querySelectorAll(".speed");
    speedButtons.forEach(button => button.classList.remove("active-button"));
    e.target.classList.add("active-button");
    this.props.changeSpeed(e);
  }
  
  render() {
    return (
      <div className="speedControls">
        <button
          className="speed1 speed buttons"
          data-value="500"
          onClick={(e) => this.handleClick(e)}
        >Slow
        </button>
        <button
          className="speed2 speed buttons active-button"
          data-value="200"
          onClick={(e) => this.handleClick(e)}>
          Medium
        </button>
        <button
          className="speed3 speed buttons"
          data-value="100"
          onClick={(e) => this.handleClick(e)}>
          Fast
        </button>
      </div>
    )
  }

}

export default SpeedControls;
