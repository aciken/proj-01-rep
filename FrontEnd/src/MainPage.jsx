import { Nav } from "./nav";
import { Hero } from "./Hero";
import { Pricing } from "./Pricing";
import { Questions } from "./Questions";
import { Tools } from "./Tools";
import { Footer } from "./Footer";
import { AiChat } from "./AiChat";
import { Nav2 } from "./Nav2";

export function MainPage(){

    localStorage.removeItem('usage');
    localStorage.removeItem('tier');
    localStorage.removeItem('id');
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