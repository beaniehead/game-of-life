import React from 'react';
import logo from './logo.svg';
import './App.css';
//import gridLayout from "./gridLayout";
import Controls from "./Controls";
import Grid from "./Grid";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      gameStatus: "paused",
      gridSize: 35,
      speed: 50
      //use to determine size of grid at start. New grid sizes stored here, but maybe different function to one in willmount, as new grid will be empty
      // maybe use nested loops and simple push new grid to array
    }
    this.editGrid = this.editGrid.bind(this);
    this.runGame = this.runGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentWillMount() {
    const size = this.state.gridSize;
    const assign = {
      1: true,
      2: false
    };
    const grid = [];
    for (let j = 0; j < size; j += 1) {
      const newArray = [];
      for (let i = 0; i < size; i += 1) {
        const rand = Math.floor(Math.random() * 2) + 1;
        newArray.push(assign[rand]);
      }
      grid.push(newArray);
    }
    this.setState({ grid });
  }

  componentDidMount() {
    setTimeout(this.startGame, 1000);
  }
  editGrid(e) {
    const coord = e.target.id.split("-");
    const row = +coord[0];
    const column = +coord[1];
    // Get current grid state and set to newGrid
    const newGrid = [...this.state.grid];
    // Update newGrid to reflect change in clicked cell
    newGrid[row][column] = !newGrid[row][column]
    // Set state using the now updated newGrid
    this.setState({
      grid: newGrid
    });
  }

  startGame() {
    // let i = 1;
    const intervalID = setInterval(() => {
      this.runGame();
      // i++;
    }, this.state.speed); //Speed
    this.setState({ intervalID });
  }

  runGame() {
    // Get current grid status
    const gridStatus = [...this.state.grid];
    // Need to assess the status of the eight neighbours of each cell for every cell and store the value in arrays
    // Map through each cell, using its row and cell number to
    const grid = gridStatus.map(gridRow =>
      gridRow.map((cell, index) => {
        let row = gridStatus.indexOf(gridRow);
        let column = index;
        // Need to get status of neighbours.
        // Row -1: col-1, col=, col+1
        // Row  =: col-1, col+1
        // Row +1: col-1, col=, col+1
        let alive = 0;
        for (let i = row - 1; i <= row + 1; i++) {
          let compareRow;
          if (i < 0) {
            compareRow = gridStatus.length - 1;
          } else if (i === gridStatus.length) {
            compareRow = 0;
          } else {
            compareRow = i;
          }
          // loop through each cell and compare
          for (let j = column - 1; (j <= column + 1) && (alive <= 4); j++) {
            let compareColumn;
            if (j < 0) {
              compareColumn = gridStatus[row].length - 1;
            } else if (j === gridStatus[row].length) {
              compareColumn = 0;
            } else {
              compareColumn = j;
            }
            // logic here for comparing all the neighbours and calculated how many are alive
            // if (gridStatus[compareRow][compareColumn] === true || gridStatus[compareRow][compareColumn] === "true-old"||gridStatus[compareRow][compareColumn] === "true-mature") {
            if (gridStatus[compareRow][compareColumn] === true || gridStatus[compareRow][compareColumn] === "true-old") {
              // if (gridStatus[compareRow][compareColumn] === true) {
              alive++;
            }

          }
        }
        //Above loops calculate all cells, including current cell, so - one from total alive to see how many neighbouring cells are alive
        // TODO Can return on 4 in the loops as this is the max needed to calculate status
        alive = cell === true ? alive - 1 : alive;
        alive = cell === "true-old" ? alive - 1 : alive;
        // alive = cell === "true-mature" ? alive - 1 : alive;
        // Logic for status of new cell
        // 1. Check whether current cell is alive or dead (true or false)
        // 2. If false, change to true if alive = 3
        function updateCell(cell) {
          let done = false;
          if (cell === false && done === false) {
            if (alive === 3) {
              cell = true;
              done = true;
            }
          }
          // 3. If true
          if ((cell === true || cell === "true-old") && done === false) {
            // if ((cell === true) && done === false) {
            if (alive <= 1 || alive >= 4) {
              cell = false;
              done = true;
            }
            else {
              cell = "true-old";
              done = true;
            }
          }

          // if ((cell === "true-old" || cell == "true-mature") && done === false) {
          //   if (alive <= 1 || alive >= 4) {
          //     cell = false;
          //     done = true;
          //   } else {
          //     cell = "true-mature";
          //     done=true;
          //   }
          // }
          return cell;
        }
        return updateCell(cell);
      })
    )
    this.setState({ grid })
  }

  pauseGame() {
    //function to pause the game
    clearInterval(this.state.intervalID);
  };

  resetGame() {
    //function to reset the grid and stop the game

    const gridState = [...this.state.grid];
    const grid = gridState
      .map(gridrow => gridrow
        .map(cell => cell = false)
      );
    this.setState({ grid });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">The Game of Life</h1>
        </header>
        <Controls
          startGame={this.startGame}
          pauseGame={this.pauseGame}
          resetGame={this.resetGame}
        />
        <Grid
          editGrid={this.editGrid}
          grid={this.state.grid}
        />
      </div>
    );
  }
}

export default App;
