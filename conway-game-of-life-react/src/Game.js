import Grid from './Grid.js';
import React from 'react';
import Tile from './Tile.js'

class Game extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    //this.props.parentBinder(this)
  }

  render() {
    return (
      <table className="grid">
        <tbody> 
          {this.props.grid.tiles.map((row, y) => 
            <tr key={`R${y}`}> 
              {row.map((cell, x) => 
                <td key={`R${x} C${y}`}>
                  <Tile state={cell} game={this} onClick={ () => this.props.tileOnClick(x,y) } />
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
