import { LogedNav } from "./LogedNav"
import { LogedHero } from "./LogedHero"
import { ProfilePage } from "./ProfilePage"
import { useState, useEffect } from "react";
import {  useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { YoutubeUpload } from "./YoutubeUpload";
import axios from "axios";




export function MainLoged() {

  const navigate = useNavigate();

  let i = 0;

  console.log(i)
window.addEventListener('load', function() {
  console.log(localStorage.getItem('TabOpen'))
  if(i < 1){
 if(localStorage.getItem('TabOpen') == 'true'){
  navigate('/');
 } else {
  localStorage.setItem('TabOpen', 'true');
 }
 i++;
 console.log(i)
} 
});

window.addEventListener('beforeunload', function() {
  localStorage.setItem('TabOpen', 'false');
})


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
    await axios.post('http://localhost:3000/creditSend', {
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




    // useEffect(() => {
    //     const ws = new WebSocket('ws://localhost:8080');
      
    //     ws.onopen = () => {
    //       console.log('WebSocket connection opened');
    //     };
      
    //     ws.onerror = (error) => {
    //       console.error('WebSocket error:', error);
    //     };
      
    //     ws.onclose = (event) => {
    //       console.log('WebSocket connection closed:', event.code, event.reason);
    //     };
      
    //     ws.onmessage = (event) => {
    //       console.log('Received message:', event.data);
    //       if (event.data === 'usage reset') {
    //         setUsageLocal(0);
    //         setUsage(0);
    //         localStorage.setItem('usage', usage);
    //         console.log(usageLocal)
    //         console.log('Usage was reset!');
    //         setUsageLimit(uses)
    //       }
      
    //     };
      
    //     return () => {
    //       if (ws.readyState === WebSocket.OPEN) {
    //         ws.close();
    //       }
    //     };
    //   }, []);





        const [navRes, setNavRes] = useState('main-page');
      
        const changeNavRes = (newNavRes) => {
          setNavRes(newNavRes);
        };



    return (
        <div className="main-page">
            <LogedNav navRes={navRes} onChangeNavRes={changeNavRes}/>
            {navRes === "main-page" ? (
            <YoutubeUpload id={id} credits={credits} setCredits={setCredits} />

            ) : (
          //  <LogedHero id={id} tier={tier} usageLocal={usageLocal} setUsageLocal={setUsageLocal} uses={uses} usageLimit={usageLimit} setUsageLimit={setUsageLimit} usage={usage}  />
            <ProfilePage/>

            )}
        </div>
    );
}
