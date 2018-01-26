import React from "react"

class SizeControls extends React.Component {
  render() {
    return (
      <div className="sizeControls">
        <button
          className="size small buttons"
          data-value="20"
          onClick={(e) => this.props.changeSize(e)}
        >20x20</button>
        <button className="size medium buttons" data-value="40" onClick={(e) => this.props.changeSize(e)}>40x40</button>
        <button className="size large buttons" data-value="60" onClick={(e) => this.props.changeSize(e)}>60x60</button>
      </div>
    )
  }

}

export default SizeControls;
