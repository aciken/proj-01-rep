import "./ProfilePage.css";
import { useState } from "react";
import { Link } from "react-router-dom";



export function ProfilePage({ tier, usageLimit }) {

let timeReset = 0;
    const date = new Date();
    const currentTime = date.getHours();
    const time = 24 - currentTime;
    console.log(time)
    timeReset = time;


let tierName = "";

    if (tier == 1) {
        tierName = "Free"
    } else if (tier == 2) {
       tierName = "Basic"
    } else {
        tierName = "Premium"
    }

    return (
        <div className="profile-page">
            <div className="profile-part">
                <h1>Profile</h1>
                <div className="tier-part">
                    <p>Current Tier: <span>{tierName}</span></p>
                    <a href="#" className="upgrade-btn" onClick={(e) => e.preventDefault()}>Upgrade</a>
                </div>
                <h1>Usage</h1>
                <div className="usage-part">

                    <p>Uses Left: <span>{usageLimit}</span></p>
                    <p>Usage Resets In: <span>{timeReset}</span> Hours</p>
                </div>
                <div className="logOut-part">
                <Link className="logOut-btn" to="/">Log Out</Link>
            </div>
            </div>

        </div>
    );
}