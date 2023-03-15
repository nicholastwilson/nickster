// import logo from './logo.svg';
import './App.css';
import qos_png from './qos.png';
import jod_png from './jod.png';
import PinochleGame from './games/PinochleGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={qos_png} alt="Queen of Spades" className="App-logo" />
        <img src={jod_png} alt="Jack of Diamonds" className="App-logo2" />
        <p>Nickster Cards™ coming to a browser near you!</p>
        <button style={{height: "30px", width: "100px", fontSize: "16px"}} onClick={PinochleGame.start}>Play!</button>
      </header>
    </div>
  );
}

export default App;
