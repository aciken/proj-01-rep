import './YoutubeUpload.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OpenAI from "openai";
import PropTypes from 'prop-types';
import noThumbnail from './assets/NoThumbnail.png';
import gif from './assets/Infinity-1.4s-184px (2).gif'
import app from './firebase';
import { getStorage, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { ref } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";




const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY , dangerouslyAllowBrowser: true});

export function YoutubeUpload({id, credits, setCredits}) {

    localStorage.setItem('credits', credits);

    const history = useNavigate()


    const [form, setForm] = useState({
    title:"",
    description:"",
    thumbnail:"",
    file:null,

    })



    YoutubeUpload.propTypes = {
        id: PropTypes.string.isRequired,
        credits: PropTypes.number.isRequired,
        setCredits: PropTypes.func.isRequired
    };

    async function updateCredits(num){

        setCredits(credits - num);
        try{
            const response = await axios.put('https://proj-01-rep-backend1.onrender.com/updateCredits', {
                id: id,
                credits: credits - num,
            });
            localStorage.setItem('credits', credits - num);
            console.log(localStorage.getItem('credits'));
            console.log(response.data)
        }catch(error){
            console.log(error);
        }
    }


    const [inputs , setInputs] = useState({});
    const [videoPercentage, setVideoPercentage] = useState(0);
    const [response, setResponse] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState(noThumbnail);

    const [addedVideo, setAddedVideo] = useState("No Video Added Yet");

    const [showPopup, setShowPopup] = useState(false);

    const [downloadUrl, setDownloadUrl] = useState("");

  
    const isSendDisabled = addedVideo == "No Video Added Yet" || credits === 0;
    const sendClassName = isSendDisabled ? 'send-video-btn disabled' : 'send-video-btn';

    console.log(isSendDisabled)

    console.log(isSendDisabled, sendClassName)

console.log(url)

    const isButtonDisabled = !response|| !description || url === '/src/assets/NoThumbnail.png' || credits === 0 || response === "loading..." || description === "loading..." || url === gif;
    const buttonClassName = isButtonDisabled ? 'upload-video-btn disabled' : 'upload-video-btn';






    async function main1(chat) {

        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Make one short 4 to 7 word and attention grabbing YouTube title for video with this description" + chat},
            ],
            model: "gpt-3.5-turbo",
        });

        const title = completion.choices[0].message.content.split(`"`)
        console.log(title);
        setResponse(title[1]);



    }




    
    async function main2(wordNum, chat) {

        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Make youtube video description with"+ wordNum+ " words from this short description" + chat},
            ],
            model: "gpt-3.5-turbo",
        });

        if(completion.choices[0].message.content[1] === `"`){
            console.log('true');
        } else {
            console.log('false');
        }

        // finalDesc = completion.choices[0].message.content.split(`"`);
        

        setDescription(completion.choices[0].message.content);

 
        console.log(completion.choices[0].message.content);



    }
    
      async function imageGen(chat){
        console.log('imageGen called')
        const image = await openai.images.generate({ model: "dall-e-3", prompt: "Make eye catching thumbnail from this video description " + chat, n:1,size: "1792x1024", });
        setUrl(image.data[0].url);



      }



      useEffect(() => {
        console.log(url)
        if (url.includes("https://")) {
          axios.post("https://proj-01-rep-backend1.onrender.com/convertUrl", {
              url: url
          })
          .then(res => {
              console.log(`${res.data.key}.jpg`)
            setDownloadUrl(`${res.data.key}.jpg`);
          })
          .catch((err) => {
              console.log(err);
          })
        }
      }, [url]);

const downloadFile = (e) => {
e.preventDefault();

const url = `https://www.ploady.com/thumbnails/${downloadUrl}`;
const fileName = url.split('/').pop();
const aTag = document.createElement('a');
aTag.href = url;
aTag.setAttribute('download', fileName);
document.body.appendChild(aTag);
aTag.click();
aTag.remove();

}



      



    const handleResponseChange = (e) => {
        console.log(`Change event on ${e.target.name}`);
        const inputValue = e.target.value;
        console.log(`Input value:`, inputValue);
        
        setResponse(inputValue);
    }

    const handleDescriptionChange = (e) => {
        console.log(`Change event on ${e.target.name}`);
        const inputValue = e.target.value;
        console.log(`Input value:`, inputValue);
        
        setDescription(inputValue);
    }

    const handleChange = (e) => {
        console.log(`Change event on ${e.target.name}`);
        const inputValue = e.target.name === "file" ? e.target.files[0] : e.target.value;
        console.log(`Input value:`, inputValue);
        
if(e.target.name === "file"){
    setAddedVideo(e.target.files[0].name);
}
        setForm({
            ...form,
            [e.target.name]: inputValue
        });
    }

    const handleThumbnailChange = (e) => {
        console.log(`Change event on thumbnail`);
        const thumbnailFile = e.target.files[0];
        console.log(`Thumbnail file:`, thumbnailFile);
        
        setForm({
            ...form,
            thumbnail: thumbnailFile
        });
    }



const handleSubmit = (e) => {
    e.preventDefault();

    const videoData = new FormData();

    console.log(`Title: ${response} || Description: ${description} || File: ${form.file} || Thumbnail: ${url}`)

    videoData.append("videoFile", form.file);
    videoData.append("title", response);
    videoData.append("description", description);
    videoData.append("thumbnail", url);

    console.log(`${videoData}`)


    axios.post("https://proj-01-rep-backend1.onrender.com/upload", videoData)
    .then(res => { 
        console.log('uploaddeDDD')
        updateCredits(100);
        console.log(res.data);

    })
    .catch((err) => {
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("Error Response Data:", err.response.data);
            console.log("Error Response Status:", err.response.status);
            console.log("Error Response Headers:", err.response.headers);
        } else if (err.request) {
            // The request was made but no response was received
            // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in Node.js
            console.log("Error Request:", err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message);
        }
        console.log("Error Config:", err.config);
    })
}


setInterval(function() {
    var storedCredits = Number(localStorage.getItem('credits'));
    if(storedCredits < credits){
      setCredits(storedCredits);
    }
  }, 5000);


useEffect(() => {
    form.file && uploadFile(form.file, 'videoUrl');
}, [form.file])

const uploadFile = (file, fileType) =>{
    const storage = getStorage(app);
    const folder = 'videos/';
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setVideoPercentage(Math.round(progress));
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
        switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
      
            // ...
      
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
        }
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setInputs((prev) =>{
            return {
            ...prev,
             [fileType]: downloadURL,
            }}
            );
      });
    }
  );
  

}
 
const videoSendStorage = async (e) =>{
    e.preventDefault();
    try{
        await axios.post('https://proj-01-rep-backend1.onrender.com/api/sendVideoToStorage', {...inputs});
    } catch(error){
        console.log(error);
    }



}


const handleSend = (e) => {
e.preventDefault();

console.log(`${localStorage.getItem('credits')} CRedits`);
if(localStorage.getItem('credits') < credits){
    setCredits(localStorage.getItem('credits'));
}

if(addedVideo != "No Video Added Yet"){
setDescription("loading...");
setResponse("loading...");
setUrl(gif)
setDownloadUrl("")

console.log(url);

const videoData = new FormData();

videoData.append("videoFile", form.file);

// axios.post("https://proj-01-rep-backend.vercel.app/send", videoData)
axios.post("https://proj-01-rep-backend1.onrender.com/sendFileToStorage", videoData)
    .then((res) => { 
        console.log(res.data);
        


main1(res.data);
main2(40, res.data);
imageGen(res.data);
console.log(url)


updateCredits(100);




    })
    .catch((err) => {
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("Error Response Data:", err.response.data);
            console.log("Error Response Status:", err.response.status);
            console.log("Error Response Headers:", err.response.headers);
        } else if (err.request) {
            // The request was made but no response was received
            // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in Node.js
            console.log("Error Request:", err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message);
        }
        console.log("Error Config:", err.config);
    })

} else {
    console.log('Usage Limit Reached')

}
}

const buyProduct1 = async () =>{
    try{
        const response = await axios.post('https://proj-01-rep-backend1.onrender.com/api/purchaseProduct', {
            productId: "249354",
            id: id
        });

        console.log(response.data)

        window.open(response.data.checkoutUrl, '_blank')
    }catch(error){
        console.log(error);
    
    }
  }


  function handlePopup() {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  }

    return(
        <div className="youtube-upload">
            <h1>Upload Your Video</h1>

               

            <form  className='youtube-form' >

            <div className="top-btns">
                {videoPercentage > 0 ? (<p>{videoPercentage}%</p> ): null}
                <label className='video-add-btn'>
                    <input  onChange={handleChange}  accept='video/mp4' type="file" name="file" placeholder="Add Video File"/>
                        <div className="label-upload">
                            Upload File
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>upload</title><path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" /></svg>
                        </div>
                    </label>
                <button onClick={videoSendStorage} className={sendClassName} disabled={isSendDisabled} >Send Video</button>
                <p><span className='cost'>Cost:</span> 100 Tokens</p>
            </div>
            <p>{addedVideo}</p>
                <div className='response-wrap'>
                    <input onChange={handleResponseChange} className='title-input' type="text" name="title" placeholder="Title" value={response} />
                    <a className='copy-btn' href="#" onClick={(e) => {e.preventDefault(); if(response != '' && response != 'loading...'){navigator.clipboard.writeText(response); handlePopup()} }}><svg className='copy-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-copy</title><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg></a>
                </div>
                <div className='response-wrap'>
                    <textarea onChange={handleDescriptionChange} className='description-input'  name="description" id="" cols="30" rows="10" placeholder="Description" value={description}></textarea>
                    <a className='copy-btn' href="#" onClick={(e) => {e.preventDefault(); if(description != '' && description != 'loading...'){navigator.clipboard.writeText(description); handlePopup()}}}><svg className='copy-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-copy</title><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg></a>
                </div>

        
                {/* <div>
                    <input onChange={handleThumbnailChange} accept='image/jpeg' type="file" name="thumbnail" placeholder='Add Thumbnail File' />
                </div> */}
            <div className="download-img-wrapper">
                <img className="imageGen" src={url} alt="" />
                {downloadUrl != "" ?(
                    <button onClick={downloadFile} className='download-btn' disabled={false}>Download <svg className='download-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>download</title><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" /></svg></button>
                ) : <button onClick={downloadFile} className='download-btn disabled' disabled={true}>Download <svg className='download-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>download-lock</title><path d="M5 20H14V18H5M19 9H15V3H9V9H5L12 16M22 16A1.08 1.08 0 0 1 23 17V21A1.08 1.08 0 0 1 22 22H17A1.08 1.08 0 0 1 16 21V17A1.08 1.08 0 0 1 17 16V14.5A2.5 2.5 0 0 1 22 14.5V16M21 16V14.5A1.5 1.5 0 0 0 18 14.5V16H21" /></svg></button>
                }
            </div>
    {/* <button type="submit" className={buttonClassName} disabled={isButtonDisabled}>Upload Video</button> */}
            </form>

                <button onClick={buyProduct1} className='buy-btn' >Purchase Credits</button>
                <p>{credits} Tokens</p>

                {showPopup ? <p className='show-popUp'>Copied to Clipboard</p> : null}
            {/* {usageLimit === 0 ? <p>Usage Limit Reached</p> : <p>Usage Limit: {usageLimit}</p>} */}
        </div>
    )
}