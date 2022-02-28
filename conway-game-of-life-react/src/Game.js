import { useEffect, useState } from 'react'
import Grid from './Grid.js'
import Tile from './Tile.js'

const Game = props => {
  const [grid, setGrid] = useState(new Grid(props.grid));
  
  return(
    <table className="grid">
      <tbody> 
        {grid.tiles.map((row, y) =>
          <tr key={`Row ${y}`}> 
            {row.map((cell, x) => 
              <td key={`Tile at ${x}, ${y}`}>
              <Tile state={cell} />
            </td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Game
