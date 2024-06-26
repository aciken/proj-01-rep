import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MainPage } from './MainPage';
import { Login } from "./LoginForm"; 
import { Signup } from "./SignupForm";
import { MainLoged } from "./MainLogedPage";
import { ProfilePage } from "./ProfilePage";
import { Success } from "./Succes";
import { Helmet } from 'react-helmet';
import { Analytics } from "@vercel/analytics/react"
import { NewLogedPageAll } from "./NewLogedPage/NewLogedPageAll";
import { PromptGenerate } from "./NewLogedPage/PromptGenerate";
import { RestartPassword } from "./RestartPassword";
import { NewPassword } from "./NewPassword";


import './app.css';




export function App() {



  





  return (
    <div>
<Analytics/>
<Router>
<Routes>
   <Route exact path="/" element={<MainPage/>} />
   <Route exact path="/login" element={<Login />} />
   <Route exact path="/signup" element={<Signup/>} />
    <Route exact path="/restartPassword" element={<RestartPassword/>} />
    <Route path="/restartPassword/restart/:changablePart" element={<NewPassword />} />
   {/* <Route exact path="/logedPage/shorts" element={<NewLogedPageAll/>} /> */}
   <Route exact path="/logedPage" element={<PromptGenerate/>} />
   <Route exact path="/success" element={<Success/>} />
   
</Routes>
</Router>
</div>
  );
}
