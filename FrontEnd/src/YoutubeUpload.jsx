import './YoutubeUpload.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OpenAI from "openai";
import PropTypes from 'prop-types';
import noThumbnail from './assets/noThumbnail.png';


const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY , dangerouslyAllowBrowser: true});

export function YoutubeUpload({id, tier, usageLocal, setUsageLocal, uses, usageLimit, setUsageLimit, setUsage}) {

    const history = useNavigate()

    console.log(usageLimit)

    const [form, setForm] = useState({
    title:"",
    description:"",
    thumbnail:"",
    file:null,

    })



    YoutubeUpload.propTypes = {
        id: PropTypes.string.isRequired,
        tier: PropTypes.string.isRequired,
        usageLocal: PropTypes.number.isRequired,
        setUsageLocal: PropTypes.func.isRequired,
        uses: PropTypes.number.isRequired,
        usageLimit: PropTypes.number.isRequired,
        setUsageLimit: PropTypes.func.isRequired,
        setUsage: PropTypes.func.isRequired,
    };
 
    const [response, setResponse] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState(noThumbnail);

  

    const isButtonDisabled = !response|| !description || url == '/src/assets/noThumbnail.png' || usageLimit === 0;
    const buttonClassName = isButtonDisabled ? 'upload-video-btn disabled' : 'upload-video-btn';

    async function updateUsage(id, usageLocal) {
        const updatedUsage = ++usageLocal;
        setUsage(updatedUsage);
         localStorage.setItem('usage', updatedUsage);

        setUsageLocal(updatedUsage);
        console.log(`Updated usage to ${updatedUsage}`)
        try {
          usageLocal = updatedUsage;
          console.log(`Usage Local is now ${usageLocal}`)
          const response = await axios.put("http://localhost:3000/updateUsage", { id, usage: updatedUsage });
          console.log("Usage updated successfully!", response.data);
          history("/logedPage",{state: {id: id, tier: tier, usage: updatedUsage}});
      
          console.log(usageLocal)
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
        const image = await openai.images.generate({ model: "dall-e-3", prompt: "Make youtube thumbnail from this video description " + chat, n:1,size: "1792x1024", });
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
    .then((res) => { 
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

if(usageLimit > 0){

const videoData = new FormData();

videoData.append("videoFile", form.file);

axios.post("http://localhost:3000/send", videoData)
    .then((res) => { 
        console.log(res.data);
        updateUsage(id, usageLocal);
        


main1(res.data);
main2(40, res.data);
imageGen(res.data);



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
                <button onClick={handleSend} className='send-video-btn' >Send Video</button>
            </div>
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


            {usageLimit === 0 ? <p>Usage Limit Reached</p> : <p>Usage Limit: {usageLimit}</p>}
        </div>
    )
}