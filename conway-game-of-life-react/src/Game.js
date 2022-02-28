import Tile from './Tile.js'

const Game = props => {
  // TODO App must manage it's own style
  const grid = props.grid;
  
  return(
    <table className="grid">
      <tbody> 
        {grid.tiles.map((row, y) =>
          <tr key={`Row ${y}`}> 
            {row.map((cell, x) => 
              <td key={`Tile ${x}, ${y}`}>
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
