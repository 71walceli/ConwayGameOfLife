from random import randint

import unittest
import ConwayGameOfLife

class ConwayGameOfLifeBaseTest(unittest.TestCase):
  def setUp(self):
    pass

  def tearDown(self):
    pass

class CreatingGame(ConwayGameOfLifeBaseTest):
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


if __name__ == '__main__':
  unittest.main()
