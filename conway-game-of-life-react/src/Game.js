import { useEffect, useState } from 'react'
import Grid from './Grid.js'
import Tile from './Tile.js'

const Game = props => {
  const [grid, setGrid] = useState(new Grid(props.grid));
  
  return(
    <table className="grid">{
      grid.tiles.map(row =>
        <tr>{
          row.map(cell =>
            <td>
              <Tile state={cell} />
            </td>
          )
        }</tr>
      )
    }</table>
  )
}

export default Game
