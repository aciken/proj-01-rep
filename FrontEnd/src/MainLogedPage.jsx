import { LogedNav } from "./LogedNav"
import { LogedHero } from "./LogedHero"
import { ProfilePage } from "./ProfilePage"
import { useState, useEffect } from "react";
import {  useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { YoutubeUpload } from "./YoutubeUpload";
import axios from "axios";




export function MainLoged() {








  const location = useLocation();
  const initialID = localStorage.getItem('id') || location.state.id;
  console.log(initialID)
  const [id, setID] = useState(initialID);
  const [credits, setCredits] = useState(0);
  
  

  
  useEffect(() => {
    localStorage.setItem('id', id);
  }, [id]);
  

async function creditSend() {

  try {
    await axios.post('https://proj-01-rep-backend1.onrender.com/creditSend', {
    id
  })
  .then(res => {
    setCredits(res.data.credits)
  })
  } catch (error) {
    console.log(error)
  }


}

useEffect(() => {
  creditSend();
}, []); 








        const [navRes, setNavRes] = useState('main-page');
      
        const changeNavRes = (newNavRes) => {
          setNavRes(newNavRes);
        };



    return (
        <div className="main-page">
            <LogedNav navRes={navRes} onChangeNavRes={changeNavRes}/>
            <YoutubeUpload id={id} credits={credits} setCredits={setCredits} creditSend={creditSend}/>
        </div>
    );
}
