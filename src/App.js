import React from "react";
import NavBar from "./Componet/NavigationBar/NavBar";
import DisplayData from "./Componet/MainFrame/DisplayData";
const App =()=>{
  return(
    <React.Fragment>
      <NavBar/>
      <DisplayData/>
    </React.Fragment>
  );
}

export default App;