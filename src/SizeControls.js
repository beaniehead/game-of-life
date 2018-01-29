import React from "react"
const SizeControls = (props) => {
  // Function to handle click on size controls - Stateless
  const handleClick = (e) => {
    // Remove highlight class from all size buttons
    const sizeButtons = document.querySelectorAll(".size");
    sizeButtons.forEach(button => button.classList.remove("active-button"));
    // Add active-button class to current clicked button
    e.target.classList.add("active-button");
    // Run changeSize function, passing the event
    props.changeSize(e);
  }

  return (
    <div className="sizeControls">
      <button
        className="size small buttons"
        data-value="20"
        onClick={(e) => handleClick(e)}
      >
        20x20
      </button>
      <button
        className="size medium buttons active-button"
        data-value="40"
        onClick={(e) => handleClick(e)}
      >
        40x40
      </button>
      <button
        className="size large buttons"
        data-value="60"
        onClick={(e) => handleClick(e)}
      >
        60x60
      </button>
    </div>
  )
}

export default SizeControls;
