import './problem.css'
import { useState, useEffect } from 'react';
import xPNG from './assets/xPNG.png'
import yesPNG from './assets/yesPNG.png'
import antarcticPNG from './assets/antarctic.png'
import monkModePNG from './assets/MonkMode.pnh.png'
import noThumbnail from './assets/NoThumbnail.png';
import gaming from './assets/gaming.png'
import fasting from './assets/fasting.png'
import testosteron from './assets/testosteron.png'
import arrow from './assets/arrow.png'
import loadingGIF from './assets/spinner3.gif'

const showCaseIMG = '/ploadyVideo.mp4'
const ploadyThumbnailClosed = '/thumbnailclosed.png'
const ploadyThumbnailOpen = '/thumbnailopen.png'
const ploadyTitleClosed = '/titleclosed.png'
const ploadyTitleOpen = '/titleopen.png'
const ploadyDescriptionClosed = '/descriptionclosed.png'
const ploadyDescriptionOpen = '/descriptionopen.png'

export function Problem() {

  const [tryYourself, setTryYourself] = useState(0);


  const [videoIndex, setVideoIndex] = useState(0);

  const [addedVideoClass, setAddedVideoClass] = useState('');

  const [inputValue, setInputValue] = useState('Loading...');
  const [textareaValue, setTextareaValue] = useState('Loading...');
  const [loading, setLoading] = useState(loadingGIF);

  const [showBtn, setShowBtn] = useState(false)




  
  
  const [ploadyThumbnail, setPloadyThumbnail] = useState(ploadyThumbnailOpen);
  const [ploadyTitle, setPloadyTitle] = useState(ploadyTitleClosed);
  const [ploadyDescription, setPloadyDescription] = useState(ploadyDescriptionClosed);

      


  const uploads = [
      ['videoGame.mp4', 'Breaking Free: Conquer Video Game Addiction!', 'In this YouTube video, we delve into the dark side of video games, highlighting the harmful effects they can have on our lives. Additionally, we offer valuable insights on how to overcome video game addiction. Tune in now for must-know tips!', `${gaming}`],
      ['Fasting.mp4', 'Unlock Optimal Health with Time-Restricted Feeding', 'In this informative video, we delve into the advantages and practical application of Time-Restricted Feeding and Fasting. Learn how this method can optimize your health and lifestyle. Join us to uncover the secrets to improved well-being!', `${fasting}`],
      ['monkMode.mp4', 'Master Productivity with Monk Mode!', "Learn how to stay focused and productive with the Monk Mode protocol in this informative YouTube video. Discover practical tips and strategies to enhance your productivity and achieve your goals. Whether you're a student, professional, or entrepreneur, this video is a must-watch for anyone looking to optimize their work ethic and achieve success.", `${monkModePNG}`],
      ['AntarcticChallange.mp4', "Conquering Antarctica's Wrath: 50-Hour Survival!", "Join us on an epic journey as we take on the ultimate challenge of surviving 50 intense hours in the harsh terrain of Antarctica. Brace yourself for blizzards, treacherous conditions, and a battle against nature's harshest elements. Will we conquer or succumb? Find out now!", `${antarcticPNG}`],
      ['testosteron.mp4', 'Unlock Your Hidden Superpowers with Testosterone!', "In this enlightening video, discover the significance of testosterone for men and its profound impact on their lives. Explore its effects, benefits, and methods to optimize testosterone levels. Gain valuable insights into masculinity and vitality. Don't miss out on this essential knowledge!", `${testosteron}`],
  ]

  const changeIndex = () => {

const randomNumber = Math.floor(Math.random() * 4) + 1;
setVideoIndex(randomNumber)

  }

  const sendVideo = () => {
      if(videoIndex != 0){
          setTryYourself(2)
      } else {
          setAddedVideoClass('added-video-animation')
          setTimeout(() => {
              setAddedVideoClass('')
          }, 500)
      }
  }



useEffect(() => {
  if(tryYourself == 2){
const inputTimeout = setTimeout(() => {
  setInputValue(uploads[videoIndex][1]);
}, 2000);

const textareaTimeout = setTimeout(() => {
  setTextareaValue(uploads[videoIndex][2]);
},3000);

const gifTimeout = setTimeout(() => {
  setLoading('not loading');
},4000);

const againTimeout = setTimeout(() => {
  setShowBtn(true)
},6000);

return () => {
  clearTimeout(inputTimeout);
  clearTimeout(textareaTimeout);
  clearTimeout(gifTimeout);
  clearTimeout(againTimeout);
};
}
}, [uploads, videoIndex]);

const again = () =>{
  setTryYourself(1)
  setVideoIndex(0)
  setInputValue('Loading...')
  setTextareaValue('Loading...')
  setLoading(loadingGIF)
  setShowBtn(false)
}


  return (
    <div className='problem'>
      <h1 className='tired-headline'>Tired of spending time doing boring stuff?</h1>
      
      <div className='problem-container'>

        <div className='no-product'>
          <h1>Without Ploady</h1>
          <div className='without-text'>
          <p>&#x2022; Low quality thumbnails</p>
          <p>&#x2022; Expensive thumbnails</p>
          <p>&#x2022; Time consuming thumbnails</p>
          <p>&#x2022; Bad video descriptions</p>
          <p>&#x2022; Bad video titles</p>
          </div>
          <img className='x-image' src={xPNG} alt="" />
        </div>

        <div className="yes-product">
          <h1>With Ploady</h1>
          <div className='with-text'>
          <p>&#x2022; High quality thumbnails</p>
          <p>&#x2022; Quick thumbnails</p>
          <p>&#x2022; Good video descriptions</p>
          <p>&#x2022; Good video titles</p>
          </div>
          <img className='yes-image' src={yesPNG} alt="" />
        </div>

      </div>

      <div className="try">
                    <img onClick={() => {if(ploadyThumbnail == ploadyThumbnailClosed){setPloadyThumbnail(ploadyThumbnailOpen); setPloadyDescription(ploadyDescriptionClosed); setPloadyTitle(ploadyTitleClosed)}else{setPloadyThumbnail(ploadyThumbnailClosed)}}} className='showcase-img' src={ploadyThumbnail} alt="" />
                    <img onClick={() => {if(ploadyTitle == ploadyTitleClosed){setPloadyTitle(ploadyTitleOpen); setPloadyThumbnail(ploadyThumbnailClosed);setPloadyDescription(ploadyDescriptionClosed)}else{setPloadyTitle(ploadyTitleClosed)}}} className='showcase-img' src={ploadyTitle} alt="" />
                    <img onClick={() => {if(ploadyDescription == ploadyDescriptionClosed){setPloadyDescription(ploadyDescriptionOpen);setPloadyThumbnail(ploadyThumbnailClosed); setPloadyTitle(ploadyTitleClosed)}else{setPloadyDescription(ploadyDescriptionClosed)}}} className='showcase-img' src={ploadyDescription} alt="" />

      </div>


    </div>
  );
}