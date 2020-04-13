class ConwayGameOfLife:
  """
  Implementation of Conway's Game of Life.
  """
  def __init__(self, grid):
    """
    Initializes `ConwayGameOfLife` with its grid and its attributes, such as generation count.

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
      self.grid = [[0 for cell in range(grid[0])] for row in range(grid[1])]
    elif isinstance(grid, list):
      # TODO Refactor this code into a function in order to be able to preprocess data into 2D grids
      # to be able to initialize a `grid`.
      expectedWidth = len(grid[0])
      for row in grid:
        if len(row) != expectedWidth:
          raise ValueError("Given grid has rows with different lengths.")
        for cell in row:
          if cell != 0 and cell != 1:
            raise ValueError("Only binary values are permitted.")
      self.grid = grid
