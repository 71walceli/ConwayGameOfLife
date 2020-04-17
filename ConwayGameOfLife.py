class ConwayGameOfLife:
  """
  Implementation of Conway's Game of Life.
  """
  def __init__(self, grid):
    """
    Initializes `ConwayGameOfLife` with its grid and its attributes, such as generation count.

    Attributes
    ----------
    grid : list[list]
      The space that hold all the cells.
    changeBuffer : list[list]
      Buffer that stores whether a cell changes in the next generation. It is used to indicate if a
      cell must become dead or alive while transitioning generations.

    Parameters
    ----------
    grid : tuple
      A tuple that must have just tho integers, corresponding to grid's width and height. such as 
      `(width, height)`.
    grid : list[list]
      A list made of lists that make up a 2D square grid. 

    Raises
    ------
    ValueError
      With regards to `grid`
        - If `grid` is a tuple that has somethong other than two integers.
        - If `grid` is not a square array, for example, it has uneven number of cells for given rows
        or columns
        - If 
    """
    if   isinstance(grid, tuple):
      x, y = grid
      self.grid = [[0 for cell in range(x)] for row in range(y)]
    elif isinstance(grid, list):
      self.grid = self.initializeGrid(grid)
    self.width  = len(self.grid[0])
    self.height = len(self.grid)
    
    # TODO change grid to have surrounding columns and rows, in order to ease implementation of
    # self.getNeighbors()
    #self.grid = [[None for x in range(self.width +2)] for y in range(self.height +2)]

    self.changeBuffer = [[0 for cell in range(self.width)] for row in range(self.height)]
    self.nextGenerationBuffer()

  @staticmethod
  def initializeGrid(grid):
    """
    Checks if given grid is valid.
    """
    expectedWidth = len(grid[0])
    for row in grid:
      if len(row) != expectedWidth:
        raise ValueError("Given grid has rows with different lengths.")
      for cell in row:
        if cell != 0 and cell != 1:
          raise ValueError("Only binary values are permitted.")
    return grid

  def getNeighbors(self, position) -> list:
    """
    Returns a list with all the neighbors that a given cell has.
    """
    x, y = position
    grid = [[None for x in range(self.width +2)] for y in range(self.height +2)]
    for row in range(1, self.height +1):    # Index from second row and column to second to last row
      for cell in range(1, self.width +1):  # and column
        grid[row][cell] = self.grid[row -1][cell -1]  # indexed for self.grid must be offset.

    neighbors = [x for y in grid for x in y]  # Traverse `grid` and list all the
    # neighboring cells. `None` values are discarded.
    #if len(neighbors) > 8: raise BaseException()  # It will actually happen as `neighbors` as it
    del neighbors[4]  # Delete the cell in the given position as itself can't be a neighbor.
    neighbors = [x for y in neighbors if x != None]  # Traverse `grid` and list all the
    return neighbors

  def willChange(self, position):
    """
    If this cell 
    """
    def countAlive():
      return sum(self.getNeighbors(position))
    x, y = position
    isCellAlive = self.grid[y][x]
    aliveNeighbors = countAlive()
    if isCellAlive:
      return aliveNeighbors not in range(2, 4)  # won't change if given cell has either 2 or 3
      # alive neighbor cells, otherwise, flag it for killing.
    else:
      return aliveNeighbors == 3  # Given cell will become alive if it has exactly 3 neighbors.
      
  def nextGenerationBuffer(self):
    for row in range(self.height):
      for cell in range(self.width):
        self.changeBuffer[row][cell] = self.willChange(position)
  
  def nextGeneration(self):
    for row in range(self.height):
      for cell in range(self.width):
        if self.changeBuffer[row][cell]:
          self.grid[row][cell] = int(not self.grid[row][cell])

  def getGrid(self):
    return self.grid

    
