import logo from "./logo.svg";
import "./App.css";
import Todo from "./Todo";
import { TodoContext } from "./contexts/TodoContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MySnackBar from "./MySnackBar";
import { createContext, useContext } from "react";
import { SnackBarContext } from "./contexts/SnackBarContext";

const InitTodos = [
  {
    id: uuidv4(),
    title: "قراءه كتاب",
    details: " تخليص كتاب العدات الذرية",
    IsComplete: false,
  },
  {
    id: uuidv4(),
    title: "قراءه قران",
    details: " تخليص 3 اجزاء",
    IsComplete: false,
  },

  {
    id: uuidv4(),
    title: "قراءه فلم",
    details: " تخليص  سنيارو",
    IsComplete: false,
  },

  {
    id: uuidv4(),
    title: "قراءه كتاب سنيمايئئ",
    details: "  الذرية",
    IsComplete: false,
  },
];

function App() {
  const [ShowSnack, setShowSnack] = useState(false);
  const [todos, Settodos] = useState(InitTodos);

  function SnackOpen() {
    setShowSnack(true);
    setTimeout(() => {
      setShowSnack(false);
    }, 3000);
  }

  return (
    <SnackBarContext.Provider value={{ SnackOpen: SnackOpen }}>
      <div
        className="App "
        style={{
          direction: "rtl",
        }}
      >
        <MySnackBar ShowSnack={ ShowSnack } />

        <TodoContext.Provider value={{ todos, Settodos }}>
          <Todo></Todo>
        </TodoContext.Provider>
      </div>
    </SnackBarContext.Provider>
  );
}

export default App;
