//import logo from './logo.svg';
import Game from './Game.js'
import './App.css';
import Arrows from '@rsuite/icons';

function App() {
  const grid = {}
  grid.width =  5
  grid.height = 5
  //grid.tiles = Array(grid.width*grid.height).fill().map( () => Math.round(Math.random(0,1)) )

  return (
    <Game grid={grid} />
  );
}

export default App;
