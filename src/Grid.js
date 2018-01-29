import React from 'react';
//Generates grid
const Grid = (props) => {
  // assigns current grid array to gridData
  const gridData = props.grid;
  // Returns rows and columns that correspond to the 2d array in gridData
  return (
    <div className="gridWrapper">
      <div className="grid">
        {gridData
          .map((gridRow, index) =>
            <div
              // Set class to include row number
              className={`row row${index}`}
              key={gridData.indexOf(gridRow)}>
              {gridRow
                .map((cell, index) => {
                  //need to set the class alive or dead from the state
                  const row = gridData.indexOf(gridRow);
                  const column = index;
                  const status = gridData[row][column];
                  return (
                    <div
                      onClick={(e) => this.props.editGrid(e)}
                      // Set grid status as taken from array
                      className={`cell alive-${status}`}
                      // Set ID to row and column coordinates of cell
                      id={`${gridData.indexOf(gridRow)}-${index}`}
                      // Set Cell to row and column coordinates of cell
                      key={`${gridData.indexOf(gridRow)}-${index}`}
                    ></div>
                  )
                }
                )}
            </div>
          )}


      </div>
    </div>
  )
}

export default Grid;
