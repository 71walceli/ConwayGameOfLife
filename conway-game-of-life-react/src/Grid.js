class Grid {
  constructor(grid) {
    this.width = grid.width
    this.height = grid.height
    this.tiles = new Array(this.height).fill().map(() => Array(this.width).fill(0))

    if (grid.tiles) {
      this.tiles.map((_, i) => {
        this.tiles[i].map((_, j) => {
          this.tiles[i][j] = grid.tiles[i*this.height +j]
        })
      })
    }
  }
}

export default Grid
