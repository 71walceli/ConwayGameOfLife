from random import randint

import unittest
import ConwayGameOfLife

class BaseTest(unittest.TestCase):
  def setUp(self):
    pass

  def tearDown(self):
    pass

class CreatingGame(BaseTest):
  def setUp(self):
    pass

  def test_createFromTuple1(self):
    game     = ConwayGameOfLife.ConwayGameOfLife((10, 10))
    expected = [[0 for cell in range(10)] for row in range(10)]
    self.assertEqual(game.grid, expected)
  
  def test_createFromTuple2(self):
    game     = ConwayGameOfLife.ConwayGameOfLife((5, 10))
    expected = [[0 for cell in range(5)] for row in range(10)]
    self.assertEqual(game.grid, expected)
  
  def test_createFromListOfLists1(self):
    grid  = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
    ]
    game     = ConwayGameOfLife.ConwayGameOfLife(grid)
    expected = [[0 for cell in range(10)] for row in range(10)]
    self.assertEqual(game.grid, expected)
  
  def test_createFromListOfLists2(self):
    grid          = [[randint(0,1) for cell in range(10)] for row in range(5)]
    game          = ConwayGameOfLife.ConwayGameOfLife(grid)
    expectedSize  = (10, 5)
    width, height = len(game.grid[0]), len(game.grid)
    self.assertEqual((width, height), expectedSize)
    
  def tearDown(self):
    pass

class NeighborDetection(BaseTest):
  def createSmallGrid(self):
    grid_initial = [
      [0,1,0],
      [1,1,1],
      [0,1,0],
    ]
    self.game = ConwayGameOfLife.ConwayGameOfLife(grid_initial)
  
  def createBigGrid(self):
    grid_initial = [
      [0,0,1,0,0],
      [0,1,0,1,0],
      [1,0,0,0,1],
      [0,1,0,1,0],
      [0,0,1,0,0],
    ]
    self.game = ConwayGameOfLife.ConwayGameOfLife(grid_initial)

  def test_neighborsAt2_2_BigGrid(self):
    self.createSmallGrid()
    position          = (2,2)
    neighbors         = self.game.getNeighbors(position)
    expectedNeighbors = [1,0,1,0,0,1,0,1]
  
  def test_neighborsAt1_1_BigGrid(self):
    self.createSmallGrid()
    position          = (1,1)
    neighbors         = self.game.getNeighbors(position)
    expectedNeighbors = [0,0,1,0,0,1,0,0]
  
  def test_neighborsAt3_4_BigGrid(self):
    self.createSmallGrid()
    position          = (3,4)
    neighbors         = self.game.getNeighbors(position)
    expectedNeighbors = [0,0,1,0,0]

  def test_neighborsAt1_1_smallGrid(self):
    self.createSmallGrid()
    position          = (1,1)
    neighbors         = self.game.getNeighbors(position)
    expectedNeighbors = [0,1,0,1,1,0,1,0]
  
  def test_neighborsAt0_0_smallGrid(self):
    self.createSmallGrid()
    position          = (0,0)
    neighbors         = self.game.getNeighbors(position)
    expectedNeighbors = [1,1,1]
  
  def test_neighborsAt2_2_smallGrid(self):
    self.createSmallGrid()
    position          = (2,2)
    neighbors         = self.game.getNeighbors(position)
    expectedNeighbors = [1,1,1]
  
  def test_neighborsAt1_2_smallGrid(self):
    self.createSmallGrid()
    position          = (1,2)
    neighbors         = self.game.getNeighbors(position)
    expectedNeighbors = [1,1,1,0,0]
  
class TestRules(BaseTest):
  def grid1(self):
    grid_initial = [
      [0,1,0],
      [0,1,0],
      [0,1,0],
    ]
    self.game = ConwayGameOfLife.ConwayGameOfLife(grid_initial)

  def test_OneCellDies(self):
    grid_initial = [
      [0,0,0],
      [0,1,0],
      [0,0,0],
    ]
    self.game = ConwayGameOfLife.ConwayGameOfLife(grid_initial)
    grid_expected = [[0 for cell in range(3)] for row in range(3)]
    self.game.nextGeneration()
    self.assertEqual(self.game.grid, grid_expected)

  def test_threeCellsChange(self):
    self.grid1()
    grid_expected = [
      [0,0,0], 
      [1,1,1], 
      [0,0,0], 
    ]
    self.game.nextGeneration()
    self.assertEqual(self.game.grid, grid_expected)

  def test_TwoCellsDie(self):
    grid_initial = [
      [0,0,0],
      [0,1,0],
      [0,1,0],
    ]
    self.game = ConwayGameOfLife.ConwayGameOfLife(grid_initial)
    grid_expected = [[0 for cell in range(3)] for row in range(3)]
    self.game.nextGeneration()
    self.assertEqual(self.game.grid, grid_expected)

class ExpectedErrors(BaseTest):
  pass

if __name__ == '__main__':
  unittest.main()
