import { useState, useContext } from "react";
import "./TodoElement.css";
import { TodoContext } from "./contexts/TodoContext";
import { SnackBarContext } from "./contexts/SnackBarContext";

export default function TodoElement({ todo }) {
  const { todos, Settodos } = useContext(TodoContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [upDating, setupDating] = useState({
    title: todo.title,
    details: todo.details,
  });

  const theme = {
    primary: "#ff7b00",
    success: "#2e7d32",
    danger: "#d32f2f",
  };

  // console.log(snack);

  function handleCheck() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) return { ...t, IsComplete: !t.IsComplete };
      return t;
    });
    Settodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function confirmDelete() {
    const upDateDelete = todos.filter((t) => t.id !== todo.id);
    Settodos(upDateDelete);
    setIsDeleting(false);
    localStorage.setItem("todos", JSON.stringify(upDateDelete));
  }

  function handelUpdating() {
    const UPdating = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: upDating.title, details: upDating.details };
      }
      return t;
    });
    Settodos(UPdating);
    setIsUpdating(false);
    localStorage.setItem("todos", JSON.stringify(UPdating));
  }

  return (
    <>
      {(isDeleting || isUpdating) && (
        <div
          className="overlay-screen"
          onClick={() => {
            setIsDeleting(false);
            setIsUpdating(false);
          }}
          style={{ zIndex: 1000 }}
        ></div>
      )}

      {isDeleting && (
        <div
          className="confirmation-box shadow-lg p-4"
          style={{
            borderRadius: "15px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1001,
            background: "white",
            width: "90%",
            maxWidth: "400px",
          }}
        >
          <h4 className="fw-bold text-danger">حذف المهمة؟</h4>
          <p>
            هل أنت متأكد من حذف: <strong>{todo.title}</strong>؟
          </p>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button
              onClick={() => setIsDeleting(false)}
              className="btn btn-light"
            >
              تراجع
            </button>
            <button onClick={confirmDelete} className="btn btn-danger px-4">
              حذف
            </button>
          </div>
        </div>
      )}

      {isUpdating && (
        <div
          className="confirmation-box shadow-lg p-4"
          style={{
            borderRadius: "15px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1001,
            background: "white",
            width: "90%",
            maxWidth: "400px",
          }}
        >
          <h4 className="fw-bold" style={{ color: theme.primary }}>
            تعديل المهمة
          </h4>
          <input
            className="form-control mb-2"
            placeholder="العنوان"
            onChange={(e) =>
              setupDating({ ...upDating, title: e.target.value })
            }
            value={upDating.title}
          />
          <textarea
            className="form-control mb-3"
            placeholder="التفاصيل"
            rows="3"
            onChange={(e) =>
              setupDating({ ...upDating, details: e.target.value })
            }
            value={upDating.details}
          />
          <div className="d-flex justify-content-end gap-2">
            <button
              onClick={() => setIsUpdating(false)}
              className="btn btn-light"
            >
              إلغاء
            </button>
            <button
              onClick={handelUpdating}
              className="btn text-white px-4"
              style={{ backgroundColor: theme.primary }}
            >
              حفظ التعديل
            </button>
          </div>
        </div>
      )}

      <div
        className="card mb-3 border-0 shadow-sm"
        style={{
          borderRadius: "15px",
          transition: "0.3s",
          opacity: todo.IsComplete ? 0.7 : 1,
          borderRight: `5px solid ${todo.IsComplete ? theme.success : theme.primary}`,
        }}
      >
        <div className="card-body d-flex align-items-center justify-content-between p-3">
          <div style={{ textAlign: "right", flex: 1 }}>
            <h5
              className="fw-bold mb-1"
              style={{
                textDecoration: todo.IsComplete ? "line-through" : "none",
                color: todo.IsComplete ? "#6c757d" : "#212529",
              }}
            >
              {todo.title}
            </h5>
            <p
              className="small mb-0 text-muted"
              style={{
                textDecoration: todo.IsComplete ? "line-through" : "none",
              }}
            >
              {todo.details || "لا توجد تفاصيل"}
            </p>
          </div>

          <div className="d-flex gap-1">
            <button
              onClick={handleCheck}
              className="btn btn-sm shadow-sm"
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                backgroundColor: todo.IsComplete ? theme.success : "white",
                border: `1px solid ${theme.success}`,
                color: todo.IsComplete ? "white" : theme.success,
              }
            
            }
            >
              {todo.IsComplete ? "✓" : "✓"}
            </button>

            <button
              onClick={() => setIsUpdating(true)}
              className="btn btn-sm btn-light shadow-sm"
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                color: theme.primary,
              }}
            >
              🖋️
            </button>

            <button
              onClick={() => setIsDeleting(true)}
              className="btn btn-sm btn-light shadow-sm"
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                color: theme.danger,
              }}
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
