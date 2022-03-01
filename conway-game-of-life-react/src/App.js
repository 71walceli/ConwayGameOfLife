import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Game from './Game.js'
import { ArrowLeft, ArrowRight } from '@rsuite/icons';
import Grid from './Grid.js'
import { useEffect, useState } from 'react';


function App() {
  const [game, setGame] = useState()
  // TODO To be refactored
  const rockerButtonStyle = {
    color: 'cyan',
    backgroundColor: "black",
    fontSize: "1.5em",
  };
  // TODO Just sample data. Should be null in the beginning. and set un through menu.
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

  return (
    <div>
      <Game grid={gridData} parentBinder={setGame} />
      <div className='RockerButtonContainer'>
        <button style={rockerButtonStyle}>
          <ArrowLeft />
        </button>
        <button style={rockerButtonStyle}
          onClick={() => {
            game.nextStep()
          }}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default App;
