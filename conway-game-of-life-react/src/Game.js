import Grid from './Grid.js';
import React from 'react';
import Tile from './Tile.js'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: new Grid(props.grid)
    }
  }
  
  componentDidMount() {
    this.props.parentBinder(this)
  }

  nextStep() {
    this.setState({
      grid: this.state.grid.nextStep()
    })
  }

  handleTileClick(x,y) {
    const grid = this.state.grid.clone()
    grid.tiles[y][x] = grid.tiles[y][x] ? 0 : 1
    this.setState({
      grid: grid
    })
  }

  render() {
    return (
      <table className="grid">
        <tbody> 
          {this.state.grid.tiles.map((row, y) =>
            <tr key={`Row ${y}`}> 
              {row.map((cell, x) => 
                <td key={`Tile ${x}, ${y}`}>
                  <Tile state={cell} game={this} onClick={ () => this.handleTileClick(x,y) } />
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default Game
