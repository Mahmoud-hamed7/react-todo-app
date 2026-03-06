import { useState, useEffect, useContext, useMemo } from "react";
import TodoElement from "./TodoElment";
import { TodoContext } from "./contexts/TodoContext";
import { v4 as uuidv4 } from "uuid";

export default function Todo() {
  const [addtodo, Setaddtodo] = useState("");
  const { todos, Settodos } = useContext(TodoContext);
  const [displayTodos, SetDisplayTodos] = useState("all");

  function handleDisplayTodos(status) {
    SetDisplayTodos(status);
  }

  const theme = {
    primary: "#ff7b00",
    secondary: "#fff3e0",
    dark: "#cc5500",
  };

  const completedTodos = useMemo(() => {
    // console.log("calling completee");

    return todos.filter((t) => t.IsComplete);
  }, [todos]);
  const nonCompletedTodos = useMemo(() => {
    todos.filter((t) => {
      //  console.log("calling not completee");

      return !t.IsComplete;
    });
  }, [todos]);

  let TodosTobeRender = todos;
  if (displayTodos === "completed") TodosTobeRender = completedTodos;
  else if (displayTodos === "nonCompleted") TodosTobeRender = nonCompletedTodos;

  const todoList = TodosTobeRender.map((t) => {
    return <TodoElement key={t.id} todo={t} />;
  });

  function handleAddTodo() {
    if (addtodo.trim() === "") return;
    const NewTodo = {
      id: uuidv4(),
      title: addtodo,
      details: "",
      IsComplete: false,
    };
    const UpdatedTodos = [...todos, NewTodo];
    Settodos(UpdatedTodos);
    Setaddtodo("");
    localStorage.setItem("todos", JSON.stringify(UpdatedTodos));
  }

  useEffect(() => {
    const savedData = localStorage.getItem("todos");
    if (savedData && savedData !== "undefined") {
      Settodos(JSON.parse(savedData));
    } else {
      Settodos([]);
    }
  }, [Settodos]);

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div
        className="card shadow-lg border-0"
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          maxHeight: "90vh",
        }}
      >
        <div
          className="p-4 text-center text-white shadow-sm"
          style={{ backgroundColor: theme.primary }}
        >
          <h2 className="fw-bold m-0">مهامي اليومية</h2>
        </div>

        <div className="p-3 bg-light border-bottom">
          <div className="btn-group w-100" role="group">
            {["all", "completed", "nonCompleted"].map((status) => (
              <button
                key={status}
                onClick={() => handleDisplayTodos(status)}
                className="btn"
                style={{
                  backgroundColor:
                    displayTodos === status ? theme.primary : "transparent",
                  color: displayTodos === status ? "white" : theme.primary,
                  border: `1px solid ${theme.primary}`,
                  transition: "0.3s",
                }}
              >
                {status === "all"
                  ? "الكل"
                  : status === "completed"
                    ? "منجز"
                    : "غير منجز"}
              </button>
            ))}
          </div>
        </div>

        <div
          className="p-3"
          style={{
            overflowY: "auto",
            minHeight: "200px",
            backgroundColor: "#fcfcfc",
          }}
        >
          {todoList.length > 0 ? (
            todoList
          ) : (
            <p className="text-muted text-center mt-4">لا توجد مهام حالياً..</p>
          )}
        </div>

        <div className="p-4 bg-white border-top">
          <div className="input-group">
            <input
              onChange={(event) => Setaddtodo(event.target.value)}
              value={addtodo}
              className="form-control form-control-lg border-0 bg-light"
              placeholder="ماذا تود أن تفعل؟"
              style={{ borderRadius: "10px 0 0 10px", fontSize: "1rem" }}
            />
            <button
              disabled={addtodo.trim().length === 0}
              onClick={handleAddTodo}
              className="btn px-4"
              style={{
                backgroundColor: theme.primary,
                color: "white",
                borderRadius: "0 10px 10px 0",
                opacity: addtodo.trim().length === 0 ? 0.6 : 1,
              }}
            >
              إضافة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
