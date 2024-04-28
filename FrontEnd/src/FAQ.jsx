import { useState } from 'react';
import './FAQ.css';

export function FAQ() {
    const [clickedItem, setClickedItem] = useState('');

    const handleClick = (item) => {
        setClickedItem(prevItem => prevItem === item ? '' : item);
    }

    return (
<div className="faq">
    <h1 className='faq-headline'>Frequently Asked Questions</h1>
    <div className='faq-container'>
        <div className='faq-item' onClick={() => handleClick('work')}>
            <div className="left-part">
                <h3>What does Ploady do?</h3>
                <p className={clickedItem === 'work' ? 'clicked' : ''}>Ploady is a powerful tool designed to enhance your video content. It analyzes your videos, extracting key information, and then generates optimized titles, descriptions, and thumbnails to maximize their impact and reach.</p>
            </div>
            <div className="right-part">
                {clickedItem === 'work' ? <p>-</p>: <p>+</p>}
            </div>  
        </div>
        <div className='faq-item' onClick={() => handleClick('cost')}>
            <div className="left-part">
                <h3>What languages does Ploady support?</h3>
                <p className={clickedItem === 'cost' ? 'clicked' : ''}>Currently, Ploady exclusively supports English for its output. If you upload a video in any other language, Ploady will provide accurate results, but they will be translated into English.</p>
            </div>
            <div className="right-part">
                {clickedItem === 'cost' ? <p>-</p>: <p>+</p>}
            </div>  
        </div>
        <div className='faq-item' onClick={() => handleClick('quality')}>
            <div className="left-part">
                <h3>What video formats does Ploady support?</h3>
                <p className={clickedItem === 'quality' ? 'clicked' : ''}>Ploady exclusively supports the MP4 video format at this time.</p>
            </div>
            <div className="right-part">
                {clickedItem === 'quality' ? <p>-</p>: <p>+</p>}
            </div>  
        </div>
        <div className='faq-item' onClick={() => handleClick('use')}>
            <div className="left-part">
                <h3>What is the maximum length of imported videos?</h3>
                <p className={clickedItem === 'use' ? 'clicked' : ''}>Imported videos must not exceed a duration of 25 minutes.</p>
            </div>
            <div className="right-part">
                {clickedItem === 'use' ? <p>-</p>: <p>+</p>}
            </div>  
        </div>
        <div className='faq-item' onClick={() => handleClick('start')}>
            <div className="left-part">
                <h3>How long does it take to generate a response?</h3>
                <p className={clickedItem === 'start' ? 'clicked' : ''}>Response generation times typically range from 30 seconds to a few minutes.</p>
            </div>
            <div className="right-part">
                {clickedItem === 'start' ? <p>-</p>: <p>+</p>}
            </div>  
        </div>
    </div>
</div>
    )
}