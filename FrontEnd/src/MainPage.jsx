import { Nav } from "./nav";
import { Hero } from "./Hero";
import { Pricing } from "./Pricing";
import { Questions } from "./Questions";
import { Tools } from "./Tools";
import { Footer } from "./Footer";
import { AiChat } from "./AiChat";
import { Nav2 } from "./Nav2";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
            <Nav2/>
            <Hero />
            {/* <Tools /> */}
            <Questions/>
            <Pricing />
            <Footer />
        </div>
    )
}