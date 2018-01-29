import React from 'react';
import './App.css';
import Controls from "./Controls";
import gridLayout from "./gridLayout";
import Grid from "./Grid";
import SpeedControls from './SpeedControls';
import SizeControls from './SizeControls';

class App extends React.Component {
  constructor() {
    super();
    // Set initial state
    this.state = {
      //Initialise grid as empty array
      grid: [],
      //Game is initially paused
      gameStatus: "paused",
      // Speed in ms
      speed: 200,
      // Number of generations
      generations: 0,
      // use to determine size of grid at start. New grid sizes stored here, but maybe different function to one in willmount, as new grid will be empty
      gridSize: 40
    }
    // Bind functions
    this.editGrid = this.editGrid.bind(this);
    this.runGame = this.runGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.generateGrid = this.generateGrid.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
  }
  // generate initial random grid
  generateGrid(e) {
    if (e && e.target.classList.contains("generatePattern")) {
      const button = e.target;
      if (this.state.gridSize === 40) {

        const rand = Math.floor(Math.random() * 10) + 1;
        const grid = gridLayout[this.state.gridSize][rand];
        this.setState({ grid });
      } else {
        const grid = gridLayout[this.state.gridSize];
        this.setState({ grid });
        button.classList.add("error");
        setTimeout(() =>
          button.classList.remove("error"), 2000)
      }
    } else {
      // Get gridSize from state
      const size = this.state.gridSize;
      // create object for assigning values to array values
      const assign = {
        1: true,
        2: false
      };
      // Initialise empty grid
      const grid = [];
      // generate arrays
      for (let j = 0; j < size; j += 1) {
        const newArray = [];
        for (let i = 0; i < size; i += 1) {
          //generate random number between one and two and then use to select value from assign object
          const rand = Math.floor(Math.random() * 2) + 1;
          newArray.push(assign[rand]);
        }
        grid.push(newArray);
      }
      // set grid state to new grid
      this.setState({ grid });
    }
  }
  // generate grid before compononent mounts
  componentWillMount() {
    this.generateGrid();
  }
  // start game once component has rendered
  componentDidMount() {
    setTimeout(this.startGame, 1000);
  }

  // editGrid function
  editGrid(e) {
    // Get current row and column from clicked element's ID
    const coord = e.target.id.split("-");
    const row = +coord[0];
    const column = +coord[1];
    // Get current grid state and set to newGrid
    const newGrid = [...this.state.grid];
    // Update newGrid to reflect change in clicked cell
    newGrid[row][column] = !newGrid[row][column];
    // Set state using the now updated newGrid
    this.setState({ grid: newGrid });
  }

  // Start game function
  startGame(e) {
    // If the game is paused or reset, then run function
    if (this.state.gameStatus === "paused" || this.state.gameStatus === "reset") {
      // Get the main control buttons
      const control = document.querySelectorAll(".controlButtons");
      // Remove active-button class to remove highlight from all control buttons
      control.forEach(button => button.classList.remove("active-button"));
      // Add active-button class to play button so it is highlighted
      document.querySelector(".play").classList.add("active-button");
      // Run game with interval, interval determined by state.speed
      const intervalID = setInterval(() => {
        this.runGame();
      }, this.state.speed); // Speed
      //Update game status to running
      const gameStatus = "running";
      // Set gameStatus and Interval ID state. Interval ID state is so game can be paused
      this.setState({
        intervalID,
        gameStatus
      });
    }
  }

  runGame() {
    // Get current grid status
    const gridStatus = [...this.state.grid];
    // Need to assess the status of the eight neighbours of each cell for every cell
    // and store the value in arrays
    // Map through each cell, using its row and cell number to
    const grid = gridStatus.map(gridRow =>
      gridRow.map((cell, index) => {
        const row = gridStatus.indexOf(gridRow);
        const column = index;
        // Get status of neighbours.
        // Row -1: col-1, col=, col+1
        // Row  =: col-1, col+1
        // Row +1: col-1, col=, col+1
        //Set alive to 0, to count number of alive neighbours
        let alive = 0;

        // Run through all neighbours to get compare rows, as the grid loops round, the first and last rows need to count as nieghbours
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
            if (gridStatus[compareRow][compareColumn] === true || gridStatus[compareRow][compareColumn] === "true-old") {
              //If a neighbouring cell's array value is true, then incremement the alive value
              alive++;
            }
          }
        }
        // Above loops calculate all cells, including current cell, so - one from total alive to see how many neighbouring cells are alive
        alive = cell === true ? alive - 1 : alive;
        alive = cell === "true-old" ? alive - 1 : alive;
        // Logic for status of new cell
        // 1. Check whether current cell is alive or dead (true or false)
        // 2. If false, change to true if alive = 3
        function updateCell(cell) {
          // use done to stop function when neighbour status is determined
          let done = false;
          // If current cell is dead
          if (cell === false && done === false) {
            // If alive neighbours totals 3
            if (alive === 3) {
              //Set current cell to 3
              cell = true;
              // Assign done to true to skip below if statements
              done = true;
            }
          }
          // If current cell is alive (either simply true or true-old, which means it is older than one generation)
          if ((cell === true || cell === "true-old") && done === false) {
            // If total of alive neighbours is <= 1 or >=4 then the current cell dies
            if (alive <= 1 || alive >= 4) {
              cell = false;
              done = true;
            } else {
              //the current cell stays alive and has a state of true-old, indicating it is more than one generation old
              cell = "true-old";
              done = true;
            }
          }
          //return cell value
          return cell;
        }
        //run updateCell function
        return updateCell(cell);
      }));
    // Stop the game running if the current grid and the new caculated grid are the same
    if (JSON.stringify(grid) === JSON.stringify(gridStatus)) {
      clearInterval(this.state.intervalID);
      const gameStatus = "paused";
      this.setState({ gameStatus });
      // highlight the pause button and remove highlight from start button
      const control = document.querySelectorAll(".controlButtons");
      control.forEach(button => button.classList.remove("active-button"));
      document.querySelector(".pause").classList.add("active-button");
    } else {
      // update the new grid and increase the number of generations by 1
      let generations = this.state.generations;
      generations++;
      this.setState({ generations, grid });
    }
  }

  pauseGame(e) {
    // function to pause the game if the game is running
    if (this.state.gameStatus === "running") {
      // update class of control buttons to control highlighting
      const control = document.querySelectorAll(".controlButtons");
      control.forEach(button => button.classList.remove("active-button"));
      document.querySelector(".pause").classList.add("active-button");
      // clearInterval to pause game and update state.gameState
      clearInterval(this.state.intervalID);
      const gameStatus = "paused";
      this.setState({ gameStatus });
    }
  }

  resetGame(gridSize, e) {
    // function to reset game
    // reset button highlight on game reset or grid size change
    const control = document.querySelectorAll(".controlButtons");
    control.forEach(button => button.classList.remove("active-button"));
    document.querySelector(".reset").classList.add("active-button");
    //  function to reset the grid and stop the game
    const grid = [];
    // resets the grid array to an array of all false values
    for (let j = 0; j < gridSize; j += 1) {
      const newArray = Array(gridSize).fill(false);
      grid.push(newArray);
    }
    // Sets state.grid to new grid 
    this.setState({ grid });
    // stops current game
    clearInterval(this.state.intervalID);
    // sets game status to reset
    const gameStatus = "reset";
    // resets generation count and updates state
    const generations = 0;
    this.setState({
      gameStatus,
      generations
    });
  }

  changeSpeed(e) {
    // Get speed in ms from data-value tag on button
    const speed = +(e.target.dataset.value);
    // Gets the state of the game when the change size button was clicked
    const changeState = this.state.gameStatus;
    // set game status to paused
    const gameStatus = "paused";
    // clearInterval on grid running
    clearInterval(this.state.intervalID);
    // set speed state to new speed value, and status to paused

    // Function to determine the state of the game at button press, if it was running, then continue running, if not, then stay
    // at initial state
    function startUp() {
      if (changeState === "running") {
        this.startGame();
      }
    }
    this.setState({
      speed,
      gameStatus
    },
      // Return game to state at button click
      startUp
    );
  }

  changeSize(e) {
    // highlight current clicked speed button only
    const control = document.querySelectorAll(".controlButtons");
    control.forEach(button => button.classList.remove("active-button"));
    document.querySelector(".pause").classList.add("active-button");
    // set gridsize to value of current clicked button
    const gridSize = +e.target.dataset.value;
    // update state.gridSize to new size
    this.setState({ gridSize });
    // reset game and generate blank grid of new size
    this.resetGame(gridSize);
  }


  handleGenerate(e) {
    //function to generate random grid on button press
    // highlight button on press and then remove highlight
    e.target.classList.add("active-button");
    const buttons = document.querySelectorAll(".generate");
    setTimeout(() => buttons.forEach(button => button.classList.remove("active-button")), 300);
    // reset game 
    this.resetGame();
    // generate a new random grid that will match current grid size
    this.generateGrid(e);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Game of Life</h1>
          <p className="subtitle">Find out more about Conway's game of life <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noopener noreferrer">here.</a></p>
        </header>
        <div className="main">
          <Controls
            gridSize={this.state.gridSize}
            gens={this.state.generations}
            startGame={this.startGame}
            pauseGame={this.pauseGame}
            resetGame={this.resetGame}
          />
          <Grid
            editGrid={this.editGrid}
            grid={this.state.grid}
          />
          <SpeedControls
            changeSpeed={this.changeSpeed}
          />
          <SizeControls
            changeSize={this.changeSize}
          />
          <button
            className="generateGrid generate buttons"
            onClick={(e) => this.handleGenerate(e)}
          >Generate Random Grid
          </button>
          <button
            className="generatePattern generate buttons"
            onClick={(e) => this.handleGenerate(e)}
          >Load Pattern
          </button>
        </div>
      </div>
    );
  }
}

export default App;
