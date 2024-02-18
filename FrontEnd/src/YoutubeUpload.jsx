import './YoutubeUpload.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OpenAI from "openai";
import PropTypes from 'prop-types';
import noThumbnail from './assets/noThumbnail.png';
import gif from './assets/Infinity-1.4s-184px (2).gif'



const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY , dangerouslyAllowBrowser: true});

export function YoutubeUpload({id, credits, setCredits}) {

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
            const response = await axios.put('http://localhost:3000/updateCredits', {
                id: id,
                credits: credits - num,
            });
            console.log(response.data)
        }catch(error){
            console.log(error);
        }
    }
 
    const [response, setResponse] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState(noThumbnail);

    const [addedVideo, setAddedVideo] = useState("No Video Added Yet");

  
    const isSendDisabled = addedVideo == "No Video Added Yet" || credits === 0;
    const sendClassName = isSendDisabled ? 'send-video-btn disabled' : 'send-video-btn';

    console.log(isSendDisabled)

    console.log(isSendDisabled, sendClassName)

console.log(url)

    const isButtonDisabled = !response|| !description || url === '/src/assets/NoThumbnail.png' || credits === 0 || response === "loading..." || description === "loading...";
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


    axios.post("http://localhost:3000/upload", videoData)
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

const handleSend = (e) => {
e.preventDefault();


if(addedVideo != "No Video Added Yet"){
setDescription("loading...");
setResponse("loading...");
setUrl(gif)

const videoData = new FormData();

videoData.append("videoFile", form.file);

axios.post("http://localhost:3000/send", videoData)
    .then((res) => { 
        console.log(res.data);
        


main1(res.data);
main2(40, res.data);
imageGen(res.data);
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
        const response = await axios.post('http://localhost:3000/api/purchaseProduct', {
            productId: "249354",
            id: id
        });

        console.log(response.data)

        window.open(response.data.checkoutUrl, '_blank')
    }catch(error){
        console.log(error);
    
    }
  }

    return(
        <div className="youtube-upload">
            <h1>Upload Your Video</h1>

               

            <form onSubmit={handleSubmit} className='youtube-form' >

            <div className="top-btns">
                <label className='video-add-btn'>
                    <input  onChange={handleChange}  accept='video/mp4' type="file" name="file" placeholder="Add Video File"/>
                        <div className="label-upload">
                            Upload File
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>upload</title><path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" /></svg>
                        </div>
                    </label>
                <button onClick={handleSend} className={sendClassName} disabled={isSendDisabled} >Send Video</button>
            </div>
            <p>{addedVideo}</p>
                <div>
                    <input onChange={handleResponseChange} className='title-input' type="text" name="title" placeholder="Title" value={response} />
                </div>
                <div>
                    <textarea onChange={handleDescriptionChange} className='description-input'  name="description" id="" cols="30" rows="10" placeholder="Description" value={description}></textarea>
                </div>

        
                {/* <div>
                    <input onChange={handleThumbnailChange} accept='image/jpeg' type="file" name="thumbnail" placeholder='Add Thumbnail File' />
                </div> */}
            <img className="imageGen" src={url} alt="" />
    <button type="submit" className={buttonClassName} disabled={isButtonDisabled}>Upload Video</button>
            </form>

                <button onClick={buyProduct1} className='buy-btn' >Purchase Credits</button>
                <p>{credits}</p>
            {/* {usageLimit === 0 ? <p>Usage Limit Reached</p> : <p>Usage Limit: {usageLimit}</p>} */}
        </div>
    )
}