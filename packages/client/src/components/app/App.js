import Router from './Router';

import './app.css';

function App() {
  return (
    <div className="wrapper relative">
      <div className="container mx-auto centerComponent">
        <Router />
      </div>
      <div id="popup" className="absolute left-1 bottom-16 dragFromLeft"></div>
    </div>
  );
}

export default App;
