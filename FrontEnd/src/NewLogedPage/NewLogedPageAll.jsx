import './NewLogedPageAll.css';
import './AllNavs.css';
import ploadyLogo from '../assets/tubeAI.logopsd.png'
import { useLocation, useNavigate,Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OpenAI from "openai";
import loadingGen from '../assets/Dual Ring@1x-3.0s-200px-200px.gif'

import axios from "axios";



export function NewLogedPageAll() {

    const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY , dangerouslyAllowBrowser: true});

    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state?.id;

    console.log(id)

    useEffect(() => {
        if (!id) {
            navigate('/login');
        }
    }, [id, navigate]);

    const [user, setUser] = useState('');

    const [credits, setCredits] = useState(0);

    const [buyCreditsState, setBuyCreditsState] = useState(false);

    const [svgClass, setSvgClass] = useState('chevron-down');
    const [showPopup, setShowPopup] = useState(false);

    const [purchase1, setPurchase1] = useState(false);
    const [purchase2, setPurchase2] = useState(true);
    const [purchase3, setPurchase3] = useState(false);








    useEffect(() => {
        axios.post('http://localhost:3000/getData',{
            id: id    
        })
          .then(res => {
            setUser(res.data)
            setCredits(res.data.credits)
          });
      }, []);

      
      const checkout =  async() => {
        let whatBuy;
        let amount;
        if(purchase1){
            whatBuy = '385391'
            amount = 20;
        }else if(purchase2){
            whatBuy = '385392'
            amount = 50;
        }else{
            whatBuy = '385393'
            amount = 100;
        } 

            try{
                const response = await axios.post('http://localhost:3000/api/purchaseProduct', {
                    productId: whatBuy,
                    id: id,
                    amount: amount
                });
        
        
        
                window.open(response.data.checkoutUrl, '_blank')
            }catch(error){
                console.log(error);
            
            }
          }




        

    







           
    

    return(
        <div className="loged-page-whole">

{buyCreditsState && 
            <>
                <div className="overlay">
                <div className="purchase-pop">
        
                    <div className='head-text'>
                        <h2>Credits</h2>
                        <p>Chose ploady credits package</p>
                        <p className='close-purchase' onClick={() => setBuyCreditsState(false)}>x</p>
                    </div>
                    <div className='chose-plan'>
                        <div className='one-plan' onClick={() => {setPurchase1(true); setPurchase2(false); setPurchase3(false)}}>
                            <div className='left'>
                                <h2>20 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></h2>
                            </div>
                            <div className='right'>
                                <h2><span>$</span>4.99</h2>
                                <input type="radio" checked={purchase1} />
                            </div>
                        </div>
                        <div className='one-plan' onClick={() => {setPurchase2(true); setPurchase1(false); setPurchase3(false)}}>
                            <div className='left'>
                                <h2>50 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></h2>
                                <p className='most-popular'>Most Popular</p>
                            </div>
                            <div className='right'>
                                <h2><span>$</span>9.99</h2>
                                <input type="radio" checked={purchase2} />
                            </div>
                            </div>
                            <div className="one-plan" onClick={() => {setPurchase3(true); setPurchase2(false); setPurchase1(false)}}>
                            <div className='left'>
                                <h2>100 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></h2>
                                </div>
                                <div className='right'>
                                <h2><span>$</span>14.99</h2>
                                <input type="radio" checked={purchase3} />
                                </div>
                                </div>
                    </div>
                    <div className='confirm-plan'>
                        <button className='confirm-btn' onClick={() => checkout()}>Purchase</button>
                    </div>
                </div>
                </div>
            </>
            }
            <div className='logo-nav'>
            <img src={ploadyLogo} alt="ploadyLogo" className="ploady-logo"/>
            <div className="credits-wrap">
                <div className='nav-credits'>
                    {credits}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg>
                </div>
                <button className='credit-buy' onClick={() => setBuyCreditsState(true)}>Buy <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></button>
            </div>
                </div>
                <div className="loged-nav">
                <div className="chose-all-links">
            <a href="#" onClick={(e) => {e.preventDefault();navigate('/logedPage', {state: {id:id}})} }   className='chose-nav'><svg xmlns="http://www.w3.org/2000/svg" className='auto-generate-svg' viewBox="0 0 24 24"><title>creation</title><path d="M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74" /></svg> Thumbnails</a>
            <Link href="#" onClick={(e) => e.preventDefault()}  className='chose-nav selected'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-text</title><path d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" /></svg> Shorts</Link>
                </div>
            
                <div className='wrapper'>
                <div className='profile-down' onClick={() => {setShowPopup(prevState => !prevState); if(svgClass == 'chevron-down'){setSvgClass('chevron-down up')}else if(svgClass == 'chevron-down up'){setSvgClass('chevron-down down')}else{setSvgClass('chevron-down up')}}}>
  <p>{user.firstName}</p>
  <svg className={svgClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
</div>

  {showPopup && (
    <div className='logout'>
        <a href="/">Log Out</a>
    </div>
  )}
</div>
                </div>
            <div className="loged-main">

            </div>
        </div>
    )
}