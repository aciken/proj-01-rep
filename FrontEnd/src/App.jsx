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

import './app.css';




export function App() {



  





  return (
    <div>
            <Helmet>
          <title>Ploady</title>
          <meta name="description" content="Ploady is an AI tool made to improve your youtube video quality." />
          <link rel="icon" href="./assets/ploadyLOGO.png" />
          </Helmet>
<Router>
<Routes>
  
   <Route exact path="/" element={<MainPage/>} />
   <Route exact path="/login" element={<Login />} />
   <Route exact path="/signup" element={<Signup/>} />
   <Route exact path="/logedPage" element={<MainLoged/>} />
   <Route exact path="/success" element={<Success/>} />
</Routes>
</Router>
</div>
  );
}
