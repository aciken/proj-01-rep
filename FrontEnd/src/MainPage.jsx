
import { Hero } from "./Hero";
import { Pricing } from "./Pricing";
import { Questions } from "./Questions";
import { Tools } from "./Tools";
import { Footer } from "./Footer";
import { AiChat } from "./AiChat";
import { Nav2 } from "./Nav2";
import { Token } from "./Token";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from 'react-helmet';

export function MainPage(){

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('id')) {
          navigate('/logedPage');
        } else{
            return () => {
                if (!localStorage.getItem('usage')) {
                  localStorage.removeItem('usage');
                }
                if (!localStorage.getItem('tier')) {
                  localStorage.removeItem('tier');
                }
                if (!localStorage.getItem('id')) {
                  localStorage.removeItem('id');
                }
              }; 
        }
    

      }, []);

    return(
        <div className="main-page">
          <Helmet>
          <title>Ploady</title>
          <meta name="description" content="Ploady is an AI tool made to improve your youtube video quality." />
          <link rel="icon" href="./assets/ploadyLOGO.png" />
            <Nav2/>
            <Hero />
            {/* <Tools /> */}
            <Questions/>
            <Token />
            {/* <Footer /> */}
            </Helmet>
        </div>
    )
}