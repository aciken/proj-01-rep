import { useState, useEffect} from "react"
import OpenAI from "openai";
import './AiChat.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import cron from "node-cron";





const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY , dangerouslyAllowBrowser: true});

export function AiChat({id, tier, usageLocal, setUsageLocal, uses, usageLimit, setUsageLimit, usage}){

  const [chatInput, setChatInput] = useState("chat-input");
  const history = useNavigate()


  // Rest of your code...


// useEffect(() => {
//   const ws = new WebSocket('ws://localhost:8080');

//   ws.onopen = () => {
//     console.log('WebSocket connection opened');
//   };

//   ws.onerror = (error) => {
//     console.error('WebSocket error:', error);
//   };

//   ws.onclose = (event) => {
//     console.log('WebSocket connection closed:', event.code, event.reason);
//   };

//   ws.onmessage = (event) => {
//     console.log('Received message:', event.data);
//     if (event.data === 'usage reset') {
//       setUsageLocal(0);
//       console.log(usageLocal)
//       console.log('Usage was reset!');
//       setUsageLimit(uses)
//     }

//   };

//   return () => {
//     if (ws.readyState === WebSocket.OPEN) {
//       ws.close();
//     }
//   };
// }, []);



async function updateUsage(id, usageLocal) {
  const updatedUsage = ++usageLocal;
  console.log(`Updated usage to ${updatedUsage}`)
  try {
    usageLocal = updatedUsage;
    console.log(`Usage Local is now ${usageLocal}`)
    const response = await axios.put("http://localhost:3000/updateUsage", { id, usage: updatedUsage });
    console.log("Usage updated successfully!", response.data);
    history("/logedPage",{state: {id: id, tier: tier, usage: updatedUsage}});

    if(usageLocal <= uses){
      setUsageLimit(uses - usageLocal);
      console.log(`${uses} ${usageLocal}`)
      console.log(usageLimit)
    } else{
      setUsageLimit(0);
    
    }
  } catch (error) {
    console.error("Failed to update usage:", error);
  }
}







  const [showResult, setShowResult] = useState(false); 
  const [chat, setChat] = useState("");
  const [response, setResponse] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false); // Add state for the pop-up




  async function main1() {
    setResponse("Loading...")
    const completion = await openai.chat.completions.create({
      messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Make youtube title for video with this description" + chat},
      ],
      model: "gpt-3.5-turbo",
    });

    setResponse(completion.choices[0].message.content);
    console.log(completion.choices[0].message.content);
  }

  async function main2(wordNum) {
    setDescription("Loading...")
    const completion = await openai.chat.completions.create({
      messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Make youtube video description with"+ wordNum+ " words from this short description" + chat},
      ],
      model: "gpt-3.5-turbo",
    });

    setDescription(completion.choices[0].message.content);
    console.log(completion.choices[0].message.content);
  }

  async function imageGen(){
    console.log('imageGen called')
    const image = await openai.images.generate({ model: "dall-e-3", prompt: "Make youtube thumbnail from this video description " + chat, n:1,size: "1792x1024", });
    setUrl(image.data[0].url);
  }

  async function callOpenAIAPI() {

    if(chat !== ""){
    if(tier == 1){
      if(usageLocal < 5){
        main1();
        main2(40);
        // imageGen();
        console.log('imageGen called2')
        setShowResult(true);
        console.log(url);
      updateUsage(id, usageLocal)
      } else{
       setChatInput("chat-input disabled");
       updateUsage(id, usageLocal)
      }
    } else if(tier == 2){
      if(usageLocal < 10){
        main1();
        main2(40);
        imageGen();
        console.log('imageGen called2')
        setShowResult(true);
        console.log(url);
      updateUsage(id, usageLocal)
      } else{
        setChatInput("chat-input disabled");
        updateUsage(id, usageLocal)
      }
      }else {
        if(usageLocal < 15){
          main1();
          main2(40);
          imageGen();
          console.log('imageGen called2')
          setShowResult(true);
          console.log(url);
        updateUsage(id, usageLocal)
        } else{
          setChatInput("chat-input disabled");
          updateUsage(id, usageLocal)
        }
    }

    console.log(`${usageLocal} ${uses}`)


setChat("");
  }
  }

  function handlePopup() {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  }

  return(

    <div className="whole">
          {tier === "1" ? (
            <div>

              {usageLocal < 6 && showResult ? (
        <div className="result-grid">

        <div className="image-wrap">
          <p>Thumbnail:  </p>
          <img className="AIimg" src={url} alt="" />
          <div className="downIcon-wrap">
            <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>download</title><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" /></svg>
          </div>
          </div>
        <p onClick={() => {navigator.clipboard.writeText(description); handlePopup();}} className="youtube-desc">Description: {description}</p>
<p onClick={() => {navigator.clipboard.writeText(response); handlePopup();}} className="youtube-title">Title: {response}</p>


</div>
    ) : usageLocal >= 5 ? (
    <div>
    <p className="usage-alert">Usage Limit Reached</p>

  </div> ) : null}
            </div>
          ) : tier === "2" ? (
            <div>
              {usageLocal < 11 && showResult ? (
        <div className="result-grid">

        <div className="image-wrap">
          <p>Thumbnail:  </p>
          <img className="AIimg" src={url} alt="" />
          <div className="downIcon-wrap">
            <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>download</title><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" /></svg>
          </div>
          </div>
        <p onClick={() => {navigator.clipboard.writeText(description); handlePopup();}} className="youtube-desc">Description: {description}</p>
<p onClick={() => {navigator.clipboard.writeText(response); handlePopup();}} className="youtube-title">Title: {response}</p>


</div>
    ) : usage >= 10 ? (<div>
    <p className="usage-alert">Usage Limit Reached</p>

  </div>) : null}
            </div>
          ) : tier === "3" ? (
            <div>
              {/* Render this if `tier` is 3 */}

              {usageLocal < 30 && showResult ? (
        <div className="result-grid">

        <div className="image-wrap">
          <p>Thumbnail:  </p>
          <img className="AIimg" src={url} alt="" />
          <div className="downIcon-wrap">
            <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>download</title><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" /></svg>
          </div>
          </div>
        <p onClick={() => {navigator.clipboard.writeText(description); handlePopup();}} className="youtube-desc">Description: {description}</p>
<p onClick={() => {navigator.clipboard.writeText(response); handlePopup();}} className="youtube-title">Title: {response}</p>


</div>
    ) : usage >= 15 ? (<div>
      <p className="usage-alert">Usage Limit Reached</p>
    </div>) : null
      }
            </div>
          ) : (
            <div>
              {/* Render this if `tier` is not 1, 2, or 3 */}
              <p>Tier is not defined!</p>
            </div>
          )}
      <div>
        {/* <textarea
          className="chat-place"
          onChange={(event)=>setChat(event.target.value)} 
          placeholder="What is your video about?"
          cols="50"
          rows="10" /> */}
      </div>

 
      {showPopup && (
        <div className="popup">
          <p className="copy-popup">Copied to Clipboard</p>
        </div>
      )}
        <div className="down-part">
        <input type="text"
        className={`${chatInput}`}
        value={chat}
        onChange={(e) => setChat(e.target.value)}
        placeholder="What is your video aboout" />
        <button className="sub-chat" onClick={callOpenAIAPI}>Submit</button>
        <p className="usage-left">Uses Left: {usageLimit}</p>
      </div>
    </div>
  )

}