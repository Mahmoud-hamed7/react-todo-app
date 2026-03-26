import { createContext, useContext, useState } from "react";
import MySnackBar from "../MySnackBar";
export const SnackBarContext = createContext({});

export const SnackBarProvider = ({ children }) => {
    const [ShowSnack, setShowSnack] = useState(false);
    const [message, setMessage] = useState("تمام اضافت ");
    
    
    function SnackOpen(message) {
        setShowSnack(true);
        setMessage(message);
        setTimeout(() => {
            setShowSnack(false);
        }, 3000);
    }
    
    return (
        <SnackBarContext.Provider  value={{SnackOpen}}> 
      {children}
      <MySnackBar ShowSnack={ShowSnack} message={message} />
    </SnackBarContext.Provider > 
  );
  
  
};


export const useSnackBar = () => {
    return(
         useContext(SnackBarContext)
    )
}