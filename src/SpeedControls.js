import React from "react"

const SpeedControls = (props) => {
  // Function to handle click on speed controls - Stateless
  const handleClick = (e) => {
    // Remove highlight class from all speed buttons
    const speedButtons = document.querySelectorAll(".speed");
    speedButtons.forEach(button => button.classList.remove("active-button"));
    // Add active-button class to current clicked button
    e.target.classList.add("active-button");
    // Run changeSpeed function, passing the event
    props.changeSpeed(e);
  }

  return (
    <div className="speedControls">
      <button
        className="speed1 speed buttons"
        data-value="500"
        onClick={(e) => handleClick(e)}
      >
        Slow
      </button>
      <button
        className="speed2 speed buttons active-button"
        data-value="200"
        onClick={(e) => handleClick(e)}
      >
        Medium
      </button>
      <button
        className="speed3 speed buttons"
        data-value="100"
        onClick={(e) => handleClick(e)}
      >
        Fast
      </button>
    </div>
  )
}

export default SpeedControls;
