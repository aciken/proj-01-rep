import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MainPage } from './MainPage';
import { Login } from "./LoginForm"; 
import { Signup } from "./SignupForm";
import { MainLoged } from "./MainLogedPage";
import { ProfilePage } from "./ProfilePage";
import { Success } from "./Succes";

import './app.css';




export function App() {



  





  return (
<Router>
<Routes>
   <Route exact path="/" element={<MainPage/>} />
   <Route exact path="/login" element={<Login />} />
   <Route exact path="/signup" element={<Signup/>} />
   <Route exact path="/logedPage" element={<MainLoged/>} />
   <Route exact path="/success" element={<Success/>} />
</Routes>
</Router>
  );
}
