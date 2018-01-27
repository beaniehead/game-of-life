import React from "react"

class SizeControls extends React.Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const sizeButtons = document.querySelectorAll(".size");
    sizeButtons.forEach(button => button.classList.remove("active-button"));
    e.target.classList.add("active-button");
    this.props.changeSize(e);
  }
  render() {
    return (
      <div className="sizeControls">
        <button
          className="size small buttons"
          data-value="20"
          onClick={(e) => this.handleClick(e)}
        >
          20x20
        </button>
        <button
          className="size medium buttons active-button"
          data-value="40"
          onClick={(e) => this.handleClick(e)}
        >
          40x40
        </button>
        <button
          className="size large buttons"
          data-value="60"
          onClick={(e) => this.handleClick(e)}
        >
          60x60
        </button>
      </div>
    )
  }

}

export default SizeControls;
