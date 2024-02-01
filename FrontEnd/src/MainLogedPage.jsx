import { LogedNav } from "./LogedNav"
import { LogedHero } from "./LogedHero"
import { ProfilePage } from "./ProfilePage"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { YoutubeUpload } from "./YoutubeUpload";




export function MainLoged() {




    const location = useLocation();
    const {id} = location.state;
    const {tier} = location.state;
    const {usage} = location.state;
    const [usageLocal, setUsageLocal] = useState(usage);

    console.log(`ID is ${id} || Tier is ${tier} || Usage is ${usage} || UsageLocal is ${usageLocal}`)
 
    console.log(usageLocal);
  
    useEffect(() => {
      setUsageLocal(usage); // Update the usageLocal state when the usage prop changes
    }, [usage]);

    let uses = 0;

    if(tier == 1){
      uses = 5;
    } else if(tier == 2){
      uses = 10;
    } else{
      uses = 15;
    }
  
  let firstUse = 0;
  
  if(usageLocal >= uses){
     firstUse = 0;
  } else {
     firstUse = uses - usageLocal;
  }
  
    const [usageLimit, setUsageLimit] = useState(firstUse);


    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
      
        ws.onopen = () => {
          console.log('WebSocket connection opened');
        };
      
        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
      
        ws.onclose = (event) => {
          console.log('WebSocket connection closed:', event.code, event.reason);
        };
      
        ws.onmessage = (event) => {
          console.log('Received message:', event.data);
          if (event.data === 'usage reset') {
            setUsageLocal(0);
            console.log(usageLocal)
            console.log('Usage was reset!');
            setUsageLimit(uses)
          }
      
        };
      
        return () => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.close();
          }
        };
      }, []);





        const [navRes, setNavRes] = useState('main-page');
      
        const changeNavRes = (newNavRes) => {
          setNavRes(newNavRes);
        };



    return (
        <div className="main-page">
            <LogedNav navRes={navRes} onChangeNavRes={changeNavRes}/>
            {navRes === "main-page" ? (
                <LogedHero id={id} tier={tier} usageLocal={usageLocal} setUsageLocal={setUsageLocal} uses={uses} usageLimit={usageLimit} setUsageLimit={setUsageLimit} usage={usage}  />
            ) : (
                // <ProfilePage tier={tier} usageLimit={usageLimit} />
                <YoutubeUpload />
            )}
        </div>
    );
}
