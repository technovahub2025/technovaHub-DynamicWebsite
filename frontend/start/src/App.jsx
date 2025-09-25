import React from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom"
import LandingPage from "./pages/LandingPage";
import Header from "./Components/Header/Header";
import TermsAndCondition from "./pages/TermsAndCondition";

const App = () => {
  return(
      <div className="">
        <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/termsandCondition"  element={<TermsAndCondition/>}/>
        </Routes>
        
        
        </BrowserRouter>
    
    </div>
  ) 
};

export default App;
