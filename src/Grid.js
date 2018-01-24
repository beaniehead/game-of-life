import React from 'react';

class Grid extends React.Component {



  render() {
    const gridData = this.props.grid;
    return (
      <div className="gridWrapper">
        <div className="grid">
          {gridData
            .map((gridRow, index) =>
              <div
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
                        className={`cell alive-${status}`}
                        id={`${gridData.indexOf(gridRow)}-${index}`}
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
}

export default Grid;
