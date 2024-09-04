import Calendar from './components/Calendar.jsx';

import './App.css';

function App() {
  return (
    <main>
      <div className='presentation-section'>
        <h1>
          <span>Śleziak Dawid</span>
        </h1>
        <h2>Junior Front-End Developer</h2>
      </div>
      <div className='scheduler-section'>
        <Calendar />
      </div>
    </main>
  );
}

export default App;
