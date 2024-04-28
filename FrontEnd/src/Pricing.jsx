import './Pricing.css'
import { useState } from 'react';

export function Pricing() {
    
    const [credits, setCredits] = useState(100);
    const [addCreditsAnimation, setAddCreditsAnimation] = useState(false)
    const [creditAdd, setCreditAdd] = useState(0)


    function generateRandomNumber() {
        return Math.floor(Math.random() * 5) + 5;
    }



        const addCredits = () => {
            const newCredits = generateRandomNumber() ;
            setCredits( credits + newCredits * 100);
            setCreditAdd(newCredits);
            console.log(newCredits);
        
            setAddCreditsAnimation(true);
            setTimeout(() => setAddCreditsAnimation(false), 1000);
        }

    



    return(
        <div className="pricing">
            <h1 className='pricing-headline'>How ploady pricing works</h1>
            <p className='pricing-desc'>Buy credits, use them to generate title, description and thumbnail for your video. Each video costs 100 credits, equivalent to $1. No hidden fees, just simple <span>pay-as-you-go</span> pricing.</p>
            <div className='pricing-container'>
                <button className='purchase-btn' onClick={() => addCredits()}>Purchase credits</button>
                <p className='credits-show'><span>{credits}</span> credits</p>      
                {addCreditsAnimation ? <p className='credit-add'>${creditAdd}</p> : null} 
            </div>

        </div>
    )
}