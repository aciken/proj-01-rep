import './Pricing.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

export function Pricing() {


    

  return (



    <div className="pricing">
        <div className='price-card'>
            <div className="top-part">
                <div className='price-card-header'>
                    <h3>Free</h3>
                </div>
                <div className='price-card-body'>
                    <h2>$0</h2>
                    <p>per month</p>
                </div>
            </div>
            <div className='price-content'>
                <p className='content-text yes'><span>&#10003;</span> Video Title</p>
                <p className='content-text yes'><span>&#10003;</span> Video Description</p>
                <p className='content-text yes'><span>&#10003;</span> Video Relese Sugestions</p>
                <p className='content-text no'><span>&#10005;</span> Video Thumbnail</p>
                <p className='content-text no'><span>&#10005;</span> Audiance Reviue and Sugestions</p>
                <p className='content-text no'><span>&#10005;</span> Auto Video Publish</p>        
                <p className='content-text no'><span>&#10005;</span> Comuity Page Publishing</p>
                <p className='content-text no'><span>&#10005;</span> Video Marketing</p>
            </div>
            <div className='price-card-footer'>
                <button><Link to="/signup">Sign Up</Link></button>
            </div>
        </div>

        <div className='price-card'>
            <div className="top-part">
                <div className='price-card-header'>
                    <h3>Premium</h3>
                </div>
                <div className='price-card-body'>
                    <h2>$9.99</h2>
                    <p>per month</p>
                </div>
            </div>
            <div className='price-content'>
                <p className='content-text yes'><span>&#10003;</span> Video Title</p>
                <p className='content-text yes'><span>&#10003;</span> Video Description</p>
                <p className='content-text yes'><span>&#10003;</span> Video Relese Sugestions</p>
                <p className='content-text yes'><span>&#10003;</span> Video Thumbnail</p>
                <p className='content-text yes'><span>&#10003;</span> Audiance Reviue and Sugestions</p>
                <p className='content-text no'><span>&#10005;</span> Auto Video Publish</p>        
                <p className='content-text no'><span>&#10005;</span> Comuity Page Publishing</p>
                <p className='content-text no'><span>&#10005;</span> Video Marketing</p>
            </div>
            <div className='price-card-footer'>
                <button >Buy</button>
            </div>
        </div>

        <div className='price-card All-in'>
            <div className='top-chosen'>
            <p>Most Chose</p>
            </div  >
            <div className="top-part">
                <div className='price-card-header'>
                    <h3>All-in</h3>
                </div>
                <div className='price-card-body'>
                    <h2>$24.9</h2>
                    <p>per month</p>
                </div>
            </div>
            <div className='price-content'>
                <p className='content-text yes'><span>&#10003;</span> Video Title</p>
                <p className='content-text yes'><span>&#10003;</span> Video Description</p>
                <p className='content-text yes'><span>&#10003;</span> Video Relese Sugestions</p>
                <p className='content-text yes'><span>&#10003;</span> Video Thumbnail</p>
                <p className='content-text yes'><span>&#10003;</span> Audiance Reviue and Sugestions</p>
                <p className='content-text yes'><span>&#10003;</span> Auto Video Publish</p>        
                <p className='content-text yes'><span>&#10003;</span> Comuity Page Publishing</p>
                <p className='content-text yes'><span>&#10003;</span> Video Marketing</p>
            </div>
            <div className='price-card-footer'>
                <button><Link to="logedPage" >Buy</Link></button>
            </div>
        </div>
    </div>  
  );
}