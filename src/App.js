import "./App.css";
import { Header } from "./components";
import Router from "./utils/Router";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
      <Sidebar />
      <ToastContainer />
    </div>
  );
}

export default App;
