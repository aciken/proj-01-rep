import './tools.css'
import { useState } from 'react'



export function Tools(){

const srcArray = [
    "https://www.youtube.com/embed/S1ZbwHlaYXs?si=rxgIKL7xxZneE0fe",
    "https://www.youtube.com/embed/KcKdqByweCU?si=gYx9-CypoaueNibY",
    "https://www.youtube.com/embed/QbwVSU34OLg?si=jmq5htPDa6oXa6e_",
    "https://www.youtube.com/embed/xPKLILuqx_E?si=rGL84bM_-Mj65NAz",
    "https://www.youtube.com/embed/HSxXSdUUrH8?si=Gs9ym1hL7RlbFlnl",
    "https://www.youtube.com/embed/fDPEUJ2icpA?si=85k8XkNt73f3Z2Dm",
    "https://www.youtube.com/embed/Rqt-KkVJrNo?si=UusZ26gSivM8ysNN",
    "https://www.youtube.com/embed/QZBpIRl5A0I?si=Mk12R1YFm6gJDXrT"
]

    const [embedVidieoSrc, setVideoSrc] = useState("https://www.youtube.com/embed/S1ZbwHlaYXs?si=rxgIKL7xxZneE0fe");


    const toolClick = (event) =>{
        event.preventDefault()
        const tools = document.querySelectorAll('.one-tool')

        tools.forEach(tool => {

            tool.addEventListener('click', () => {
                console.log('asd')
                tools.forEach(tool => tool.classList.remove('clicked'))
                tool.classList.add('clicked');  
                setVideoSrc(srcArray[tool.dataset.index - 1])

            })
        })
    }


    return(
        <div className="tools">
          <div className='chose-tool'>
            <ul>
                <li><a onClick={toolClick} data-index="1" className='one-tool clicked' href="#">Generate video title<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-title</title><path d="M5,4V7H10.5V19H13.5V7H19V4H5Z" /></svg></a></li>
                <li><a onClick={toolClick} data-index="2" className='one-tool' href="#">Generate video description<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>text</title><path d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z" /></svg></a></li>
                <li><a onClick={toolClick} data-index="3" className='one-tool' href="#">Get video relese sugestions<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>video-check</title><path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5M8.93 15L6 11.8L7.24 10.56L8.93 12.26L12.76 8.43L14 9.93L8.93 15Z" /></svg></a></li>
                <li><a onClick={toolClick} data-index="4" className='one-tool' href="#">Generate video thumbnail<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>video-check</title><path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5M8.93 15L6 11.8L7.24 10.56L8.93 12.26L12.76 8.43L14 9.93L8.93 15Z" /></svg></a></li>
                <li><a onClick={toolClick} data-index="5" className='one-tool' href="#">Get Audiance reviue<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account-group</title><path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" /></svg></a></li>
                <li><a onClick={toolClick} data-index="6" className='one-tool'href="#">Schadele video publishing<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>video-wireless</title><path d="M17,14.5V11A1,1 0 0,0 16,10H4A1,1 0 0,0 3,11V21A1,1 0 0,0 4,22H16A1,1 0 0,0 17,21V17.5L21,21.5V10.5M3,3.86L4.4,5.24C7.5,2.19 12.5,2.19 15.6,5.24L17,3.86C13.14,0.05 6.87,0.05 3,3.86M5.8,6.62L7.2,8C8.75,6.5 11.25,6.5 12.8,8L14.2,6.62C11.88,4.34 8.12,4.34 5.8,6.62Z" /></svg></a></li>
                <li><a onClick={toolClick} data-index="7" className='one-tool' href="#">Schadule Comunity Page publishing<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>text-box</title><path d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" /></svg></a></li>
                <li><a onClick={toolClick} data-index="8" className='one-tool' href="#">Market your videos<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>shopping-outline</title><path d="M19 6H17C17 3.2 14.8 1 12 1S7 3.2 7 6H5C3.9 6 3 6.9 3 8V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V8C21 6.9 20.1 6 19 6M12 3C13.7 3 15 4.3 15 6H9C9 4.3 10.3 3 12 3M19 20H5V8H19V20M12 12C10.3 12 9 10.7 9 9H7C7 11.8 9.2 14 12 14S17 11.8 17 9H15C15 10.7 13.7 12 12 12Z" /></svg></a></li>
            </ul>
          </div>
          <iframe className='embedVideo' width="560" height="315" src={embedVidieoSrc} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
    )
}