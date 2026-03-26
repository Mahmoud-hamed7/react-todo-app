import { useContext, useState } from "react";
import "./App.css";
import { SnackBarContext } from "./contexts/SnackBarContext";


export default function MySnackBar({ ShowSnack ,message="تمام اضافت" }) {

  const [deleteStyle,setdeleteStyle]= useState('')
  return (
    <>
      {ShowSnack &&
      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div className="toast show border-0 shadow-sm custom-toast">
          <div className="toast-accent bg-success"></div>
          <div className="d-flex align-items-center p-3">
            <div className="icon-wrapper bg-success-subtle text-success me-3">
              <i  className="bi bi-check2-circle"></i>
            </div>
            <div className="flex-grow-1">
              <div className="fw-bold text-dark">{message}</div>
             
            </div>
            <button
              type="button"
              className="btn-close ms-2 mb-auto shadow-none"
            ></button>
          </div>
          <div className="toast-progress">
            <div className="toast-bar bg-success"></div>
          </div>
        </div>
      </div>}
    </>
  );
}
