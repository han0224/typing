import "./App.css";
import { Main } from "./components/Main";
import { TITLE } from "./constants/String";

function App() {
  return (
    <div className="App">
      <header>
        <h1>{TITLE.HEADER}</h1>
      </header>
      <Main />
    </div>
  );
}

export default App;
