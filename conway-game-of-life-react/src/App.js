//import logo from './logo.svg';
import Game from './Game.js'
import { ArrowLeft, ArrowRight } from '@rsuite/icons';
import Grid from './Grid.js'
import { useState } from 'react';


function App() {
  // TODO Just xample data. Should be null in the beginning. and set un through menu.
  const gridData = {}
  gridData.width =  5
  gridData.height = 5
  gridData.tiles = [
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
  ]
  // TODO Move to actual game as it should be more eresponsible for the grid.
  const [grid, setGrid] = useState(new Grid(gridData));
  const rockerButtonStyle = {
    color: 'cyan',
    backgroundColor: "black",
    fontSize: "1.5em",
  };

  return (
    <div>
      <Game grid={grid}  />
      <div className='RockerButtonContainer'>
        <button style={rockerButtonStyle}>
          <ArrowLeft />
        </button>
        <button style={rockerButtonStyle}
          onClick={() => {
            const nextStep = grid.nextStep()
            setGrid(nextStep)
          }}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default App;
