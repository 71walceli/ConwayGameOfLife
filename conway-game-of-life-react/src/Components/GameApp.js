import Game from './Game.js'

import { ArrowLeft, ArrowRight } from '@rsuite/icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import Grid from './Grid';

function GameApp(props) {
  const location = useLocation()
  const [gridHistory, setGridHistory] = useState(new Array(0))
  const [stepNumber, setStepNumber] = useState(0)
  const [game, setGame] = useState()

  const [currentGrid, setCurrentGrid] = useState(() => {
    const gridData = {...location.state.gridData}
    const tiles = location.state.randomGrid 
      ? Array(gridData.height).fill().map(() => 
          Array(gridData.width).fill().map(() => 
            Number(Math.round(Math.random(0,1)))
          )
        )
      : Array(gridData.height).fill().map( () => Array(gridData.width).fill(0) )
    
      setGridHistory([tiles])

      return new Grid({
        width: gridData.width,
        height: gridData.height,
        tiles: tiles,
      })
  })

  const pushGameTiles = (tiles) => {
    const newHistory = gridHistory.slice()
    newHistory.push(tiles)
    setGridHistory(newHistory)
    setStepNumber(stepNumber+1)
  }
  
  const nextStep = () => {
    const nextGrid = currentGrid.nextStep()
    pushGameTiles(nextGrid.tiles)
    setCurrentGrid(nextGrid)
  }

  const showStep = (_stepNumber) => {
    if (_stepNumber < 0)
      return
    setStepNumber(_stepNumber)
    setCurrentGrid((prevGrid) => {
      setStepNumber(_stepNumber)
      return new Grid({
        width: prevGrid.width,
        height: prevGrid.height,
        tiles: gridHistory[_stepNumber].slice().map(row => row.slice())
      })
    })
  }

  const handleTileClick = (x,y) => {
    setCurrentGrid((_currentGrid) => {
      const grid = _currentGrid.clone()
      console.log({
        grid: grid,
        "grid.tiles": grid.tiles
      })
      grid.tiles[y][x] = grid.tiles[y][x] ? 0 : 1
      return grid
    })
    setGridHistory((gridHistory) => {
      const newGridHistory = gridHistory.slice(0, stepNumber + 1);
      newGridHistory[stepNumber] = currentGrid.tiles
      return newGridHistory
    })
  }

  return (
    <div>
      <Game grid={currentGrid} tileOnClick={handleTileClick} />
      <div className='RockerButtonContainer'>
        <button>
          <ArrowLeft onClick={() => {showStep(stepNumber-1)}} />
        </button>
        <button onClick={ () => {nextStep()} }>
          <ArrowRight />
        </button>
      </div>
      <div>
        <span>History</span>
        <div style={{
          display: "flex",
          flexFlow: "horizontal",
          flexWrap: "wrap",
        }}>
          {gridHistory.map((_, _stepNumber) => 
            <span key={`H${_stepNumber}`} style={{
              margin: "10px",
            }}>{
              <a href='' onClick={(event) => {
                showStep(_stepNumber)
                event.preventDefault()
              }}>
                {_stepNumber}
              </a>
            }</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameApp;
