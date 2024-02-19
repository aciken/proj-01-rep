import './Hero.css'
import statsImg from './assets/3163925[1].png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import antarcticPNG from './assets/antarctic.png'
import monkModePNG from './assets/MonkMode.pnh.png'
import noThumbnail from './assets/noThumbnail.png';
import gaming from './assets/gaming.png'
import fasting from './assets/fasting.png'
import testosteron from './assets/testosteron.png'
import gif from './assets/Infinity-1.4s-184px (2).gif'



export function Hero() {

const [videoName, setVideoName] = useState('No video selected');
const [videoTitle, setVideoTitle] = useState('Title');
const [videoDescription, setVideoDescription] = useState('Description');
const [imageSrc, setImageSrc] = useState(noThumbnail);

const [randomNumber, setRandomNumber] = useState(0);

const [popUp, setPopUp] = useState(false);

const [balance, setBalance] = useState(0);

const addBalance = () => {

    setBalance(100)
    
    setTimeout(() => {
        setBalance(0)
    }, 1000)
    }


const videoArr = [
['videoGame.mp4', 'Breaking Free: Conquer Video Game Addiction!', 'In this YouTube video, we delve into the dark side of video games, highlighting the harmful effects they can have on our lives. Additionally, we offer valuable insights on how to overcome video game addiction. Tune in now for must-know tips!', `${gaming}`],
['Fasting.mp4', 'Unlock Optimal Health with Time-Restricted Feeding', 'In this informative video, we delve into the advantages and practical application of Time-Restricted Feeding and Fasting. Learn how this method can optimize your health and lifestyle. Join us to uncover the secrets to improved well-being!', `${fasting}`],
['monkMode.mp4', 'Master Productivity with Monk Mode!', "Learn how to stay focused and productive with the Monk Mode protocol in this informative YouTube video. Discover practical tips and strategies to enhance your productivity and achieve your goals. Whether you're a student, professional, or entrepreneur, this video is a must-watch for anyone looking to optimize their work ethic and achieve success.", `${monkModePNG}`],
['AntarcticChallange.mp4', "Conquering Antarctica's Wrath: 50-Hour Survival!", "Join us on an epic journey as we take on the ultimate challenge of surviving 50 intense hours in the harsh terrain of Antarctica. Brace yourself for blizzards, treacherous conditions, and a battle against nature's harshest elements. Will we conquer or succumb? Find out now!", `${antarcticPNG}`],
['testosteron.mp4', 'Unlock Your Hidden Superpowers with Testosterone!', "In this enlightening video, discover the significance of testosterone for men and its profound impact on their lives. Explore its effects, benefits, and methods to optimize testosterone levels. Gain valuable insights into masculinity and vitality. Don't miss out on this essential knowledge!", `${testosteron}`]
];

const changeVideo = () => {
addBalance();
if(randomNumber !== 4) setRandomNumber(randomNumber + 1);
else setRandomNumber(0);

setVideoTitle("Loading...");
setVideoDescription("Loading...");
setImageSrc(gif);

setTimeout(() => {
setVideoTitle(videoArr[randomNumber][1]);
}, 2000)

setTimeout(() => {
    setVideoDescription(videoArr[randomNumber][2]);
},4000);

setTimeout(() => {
 setImageSrc(videoArr[randomNumber][3]);
}, 6000)

    setVideoName(videoArr[randomNumber][0]);
}

const uploadVideo = () => {
    if(videoName !== 'No video selected' && videoTitle !== 'Loading...' && videoDescription !== 'Loading...' && imageSrc !== gif){
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
                <h1>Let the AI do the <span className='boring-part'>boring stuff</span></h1>
                <p>It's never been this easy. Just import your <span className='bold-text'>Youtube Video</span> and in a few secounds you will receve the best title, description and of corse <span className="bold-text">THUMBNAIL</span>.</p>
                <button  className='get-started-btn'><Link to="/signup">Get Started</Link></button>
            </div>   
            <h1 className='how-use'>How To Use:</h1>

<div className='hero-steps'>
                <div className="import-video">
                    <h1>1. Import Video</h1>
                    <button className='import-btn' onClick={changeVideo}>Import Video</button>
                    <p>{videoName}</p>
                    {balance != 0 ? <p className='balance'>-{balance} Tokens</p> : <div className='space'></div>}
                </div>
                <div className="get-response">
                    <h1>2. Wait For Response</h1>
                    <input type="text" value={videoTitle} className='value-input'/>
                    <textarea className='value-input-text' name="" id="" cols="30" rows="10" value={videoDescription}></textarea>   
                    <img src={imageSrc} alt="" className='image' />

                </div>
                <div className="upload">
                    <h1>3. Download and Copy</h1>
                    <button className='upload-youtube' onClick={uploadVideo}>Download and Copy</button>
                </div>
            </div>
            {popUp ? (
            <div>
                <div className="popup">
                    <h1>Downloaded and Copied</h1>
                </div>
            </div>

            ) : null


            }

        </div>
    )
}   