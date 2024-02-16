import './Hero.css'
import statsImg from './assets/3163925[1].png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import noThumbnail from './assets/noThumbnail.png';

export function Hero() {

const [videoName, setVideoName] = useState('No video selected');
const [videoTitle, setVideoTitle] = useState('Title');
const [videoDescription, setVideoDescription] = useState('Description');
const [imageSrc, setImageSrc] = useState(noThumbnail);

const [popUp, setPopUp] = useState(false);


const videoArr = [
['videoGame.mp4', 'Breaking Free: Conquer Video Game Addiction!', 'In this YouTube video, we delve into the dark side of video games, highlighting the harmful effects they can have on our lives. Additionally, we offer valuable insights on how to overcome video game addiction. Tune in now for must-know tips!', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-rMnnakSS6oVkzQNR529RCI80/user-6kWkeBl0VcxQclgxTU4557vX/img-yXfJn1YG43gWazCeguiCEWnB.png?st=2024-02-16T14%3A43%3A26Z&se=2024-02-16T16%3A43%3A26Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-02-16T02%3A32%3A43Z&ske=2024-02-17T02%3A32%3A43Z&sks=b&skv=2021-08-06&sig=Z6sXgcHz%2BsKt0AwDDhIj7/OI0mEhlqURNGHzrkI7cyg%3D'],
['Fasting.mp4', 'Unlock Optimal Health with Time-Restricted Feeding', 'In this informative video, we delve into the advantages and practical application of Time-Restricted Feeding and Fasting. Learn how this method can optimize your health and lifestyle. Join us to uncover the secrets to improved well-being!', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-rMnnakSS6oVkzQNR529RCI80/user-6kWkeBl0VcxQclgxTU4557vX/img-d4E7dIsWGdHPtXbuuMWox3DH.png?st=2024-02-16T14%3A44%3A21Z&se=2024-02-16T16%3A44%3A21Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-02-16T02%3A32%3A42Z&ske=2024-02-17T02%3A32%3A42Z&sks=b&skv=2021-08-06&sig=tbaevi26BkHcCVnUNkD7BtOZOKnw6lfIEGqZOAZ5Ldo%3D'],
['monkMode.mp4', 'Master Productivity with Monk Mode!', "Learn how to stay focused and productive with the Monk Mode protocol in this informative YouTube video. Discover practical tips and strategies to enhance your productivity and achieve your goals. Whether you're a student, professional, or entrepreneur, this video is a must-watch for anyone looking to optimize their work ethic and achieve success.", 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-rMnnakSS6oVkzQNR529RCI80/user-6kWkeBl0VcxQclgxTU4557vX/img-OJUceWoPZM12MaunXClXmygQ.png?st=2024-02-16T14%3A45%3A52Z&se=2024-02-16T16%3A45%3A52Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-02-16T02%3A47%3A36Z&ske=2024-02-17T02%3A47%3A36Z&sks=b&skv=2021-08-06&sig=XlEWBTNH09d8QHd4YdL9464P%2BNC/PSF1inwavJpcdkc%3D'],
['AntarcticChallange.mp4', "Conquering Antarctica's Wrath: 50-Hour Survival!", "Join us on an epic journey as we take on the ultimate challenge of surviving 50 intense hours in the harsh terrain of Antarctica. Brace yourself for blizzards, treacherous conditions, and a battle against nature's harshest elements. Will we conquer or succumb? Find out now!", 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-rMnnakSS6oVkzQNR529RCI80/user-6kWkeBl0VcxQclgxTU4557vX/img-nkbszZnNxQ9u4MoyzNW5t5se.png?st=2024-02-16T14%3A59%3A58Z&se=2024-02-16T16%3A59%3A58Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-02-16T02%3A27%3A29Z&ske=2024-02-17T02%3A27%3A29Z&sks=b&skv=2021-08-06&sig=vCvmUokQalnYKjEWet8DZJFNLd8R7z67S9/0Xmm%2BgD8%3D'],
['testosteron.mp4', 'Unlock Your Hidden Superpowers with Testosterone!', "In this enlightening video, discover the significance of testosterone for men and its profound impact on their lives. Explore its effects, benefits, and methods to optimize testosterone levels. Gain valuable insights into masculinity and vitality. Don't miss out on this essential knowledge!", 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-rMnnakSS6oVkzQNR529RCI80/user-6kWkeBl0VcxQclgxTU4557vX/img-eT8LgcEeHR9DwJiZ5Hvvs9WV.png?st=2024-02-16T15%3A01%3A43Z&se=2024-02-16T17%3A01%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-02-16T02%3A30%3A21Z&ske=2024-02-17T02%3A30%3A21Z&sks=b&skv=2021-08-06&sig=EEf91RCFEoHGiI98jTuP805QpoT57LWKhgWUbWWWlpI%3D']
];

const changeVideo = () => {

    const randomNumber = Math.floor(Math.random() * videoArr.length);
    setVideoName(videoArr[randomNumber][0]);
    setVideoTitle(videoArr[randomNumber][1]);
    setVideoDescription(videoArr[randomNumber][2]);
    setImageSrc(videoArr[randomNumber][3]);
}

const uploadVideo = () => {
    if(videoName !== 'No video selected'){
        setPopUp(true);
  
        setTimeout(() => {
          setPopUp(false);
          setVideoName("No video selected");
          setVideoTitle("Title");
          setVideoDescription("Description");
          setImageSrc(noThumbnail);
        }, 1000); // Set back to false after 2 seconds
      }
    } 









    return(
        <div className="hero">
            <div className="hero-text">
                <h1>Let the AI do the <span className='boring-part'>boring part</span></h1>
                <p>Leverage our AI based tools so you can delever best possible videos, get more views and subscribers and understand your viewers</p>
                <button  className='get-started-btn'><Link to="/signup">Get Started</Link></button>
            </div>   
            <h1 className='how-use'>How To Use:</h1>

<div className='hero-steps'>
                <div className="import-video">
                    <h1>1. Import Video</h1>
                    <button className='import-btn' onClick={changeVideo}>Import Video</button>
                    <p>{videoName}</p>
                </div>
                <div className="get-response">
                    <h1>2. Get Response</h1>
                    <input type="text" value={videoTitle} className='value-input'/>
                    <textarea className='value-input-text' name="" id="" cols="30" rows="10" value={videoDescription}></textarea>   
                    <img src={imageSrc} alt="" className='image' />

                </div>
                <div className="upload">
                    <h1>3. Upload</h1>
                    <button className='upload-youtube' onClick={uploadVideo}>Upload To Youtube</button>
                </div>
            </div>
            {popUp ? (
            <div>
                <div className="popup">
                    <h1>Video Uploaded</h1>
                </div>
            </div>

            ) : null


            }

        </div>
    )
}   