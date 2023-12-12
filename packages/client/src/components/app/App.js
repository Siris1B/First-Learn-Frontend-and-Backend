import Router from './Router';

function App() {
  return (
    <div className="wrapper relative">
      <Router />
      <div id="popup" className="absolute left-1 bottom-16 dragFromLeft"></div>
    </div>
  );
}

export default App;
