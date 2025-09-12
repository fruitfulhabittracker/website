import mainImage from './images/main.png';
import moodtrackImage from './images/moodtrack.png';
import thirtyDayImage from './images/30-day.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={mainImage} className="App-logo" alt="main" />
        <img src={moodtrackImage} className="App-logo" alt="moodtrack" />
        <img src={thirtyDayImage} className="App-logo" alt="30-day" />
      </header>
    </div>
  );
}

export default App;
