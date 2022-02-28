//import logo from './logo.svg';
import Game from './Game.js'
import { ArrowLeft, ArrowRight } from '@rsuite/icons';

function App() {
  const rockerButtonStyle = {
    color: 'cyan',
    backgroundColor: "black",
    fontSize: "1.5em",
  };

  return (
    <div>
    <Game grid={grid} />
      <div className='RockerButtonContainer'>
        <button style={rockerButtonStyle}>
          <ArrowLeft />
        </button>
        <button style={rockerButtonStyle}
          onClick={() => {
            const nextStep = grid.nextStep()
            setGrid(nextStep)
          }}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default App;
