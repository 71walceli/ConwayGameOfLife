/* eslint-disable array-callback-return */
class Grid {
  constructor(grid) {
    this.width = grid.width
    this.height = grid.height
    this.tiles = new Array(this.height).fill().map(() => Array(this.width).fill(0))

    if (grid.tiles) {
      this.tiles.map((_, i) => {
        this.tiles[i].map((_, j) => {
          this.tiles[i][j] = grid.tiles[i][j]
        })
      })
    }
  }
  
  getNeighbors (x, y) {
    let neighbors = Array(9).map((_) => undefined)
    for (let _y=0; _y<=2; _y++) {   // Index from second row and column to second to last row
      for (let _x=0; _x<=2; _x++) {  // and column
        try {
          neighbors[_y*3 +_x] = this.tiles[y+_y-1][x+_x-1]
        } catch (error) {
          continue
        }
      }
    }

    neighbors = [...neighbors.slice(0,4), ...neighbors.slice(5,9)]
    neighbors = neighbors.filter(cell => cell !== undefined && cell !== null)
    // TODO Show all 8 neighbors
    return neighbors
  }

  willChange (x, y) {
    const neighbors = this.getNeighbors(x, y)
    const aliveNeighbors = neighbors.reduce((total, addValue) => total+addValue)
    const cellWillChange = Number(this.tiles[y][x]
      ? aliveNeighbors !== 2 && aliveNeighbors !== 3 
      : aliveNeighbors === 3)
    return cellWillChange
  }

  getChangeBuffer() {
    const changeBuffer = new Array(this.height).fill().map(() => Array(this.width).fill(0))

    for (var y = 0; y < this.height; y += 1) {
      for (var x = 0; x < this.width; x += 1) {
        changeBuffer[y][x] = this.willChange(x, y);
      }
    }
    return changeBuffer
  }

  nextStep() {
    const changeBuffer = this.getChangeBuffer()
    const newGrid = {}
    newGrid.width = this.width
    newGrid.height = this.height
    newGrid.tiles = this.tiles.slice().map(row => row.slice())

    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        newGrid.tiles[y][x] = changeBuffer[y][x] ? Number(!newGrid.tiles[y][x]) : newGrid.tiles[y][x]
      }
    }

    return new Grid(newGrid)
  }
}

export default Grid
