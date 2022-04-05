import "./App.css";
import { Header } from "./components";
import Router from "./utils/Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
