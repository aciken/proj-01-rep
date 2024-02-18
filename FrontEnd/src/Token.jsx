import './token.css'
import { useEffect, useState } from 'react'


export function Token(){

const [balance, setBalance] = useState(1000)
const [addNum, setAddNum] = useState(0)

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

const addBalance = () => {

const num = getRandomInt(5, 10);
setAddNum(num)

setTimeout(() => {
    setAddNum(0)
    setBalance(balance + num*100)
}, 1000)
}

    return (
        <div className='token'>
            <h1>How Pricing Works?</h1>
            <p>Our pricing is simple and transparent. You buy tokens that you use to generate Title, Description and Thumbnail.</p>
            <p className='cost'>One call costs 100 tokens.</p>

            <button className='buy-btn' onClick={addBalance}>Purchase Tokens</button>
            <div className="balance-place">
                <p>Balance: {balance}</p>
                { addNum !== 0 ? (
                <p className='plus-balance'>${addNum}</p>
                ) : null
                }
            </div>
        </div>
    )
}