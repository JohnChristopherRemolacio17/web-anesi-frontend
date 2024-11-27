import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/Sidebar";
import Main from "./components/graphs/Main";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Main />
    </>
  );
}

export default App;
