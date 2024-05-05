import { Pricing } from "./Pricing";
import { Nav2 } from "./Nav2";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from 'react-helmet';
import { NewHero } from "./NewHero";
import {Problem} from './Problem';
import {FAQ} from './FAQ';

const structuredData = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  "name": "Ploady - AI YouTube Companion",
  "url": "https://www.ploady.com/",
  "description": "Effortlessly create awesome looking AI-generated thumbnails, titles, and descriptions for your YouTube videos."
};

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
          <meta name="description" content="Effortlessly create awesome looking AI-generated thumbnails, titles, and descriptions for your YouTube videos." />
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
          </Helmet>
            <Nav2/>
            <NewHero/>
            <Problem/>
            <Pricing/>
            <FAQ/>
        </div>
    )
}