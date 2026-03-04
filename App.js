import logo from './logo.svg';
import './App.css';
import Todo from './Todo';
import { TodoContext } from './contexts/TodoContext';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";



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
  


  const [todos, Settodos] = useState(InitTodos);

  return (
    <div className="App " style={{
      
      direction:"rtl"
    }}>
      <TodoContext.Provider value={{todos,Settodos}}>
      <Todo></Todo>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
