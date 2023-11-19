import Router from "./Router";
import Header from "../header/Header";
import Footer from "../footer/Footer";

import "./app.css";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="container mx-auto centerComponent">
        <Router />
      </div>
      <Footer />
    </div>
  );
}

export default App;
