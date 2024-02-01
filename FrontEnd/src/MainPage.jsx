import { Nav } from "./nav";
import { Hero } from "./Hero";
import { Pricing } from "./Pricing";
import { Questions } from "./Questions";
import { Tools } from "./Tools";
import { Footer } from "./Footer";
import { AiChat } from "./AiChat";

export function MainPage(){
    return(
        <div className="main-page">
            <Nav/>
            <Hero />
            <Tools />
            <Questions/>
            <Pricing />
            <Footer />
        </div>
    )
}