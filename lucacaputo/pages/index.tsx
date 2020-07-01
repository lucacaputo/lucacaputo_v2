import HomeHeader from "../components/HomeHeader";
import CanvasContext from "../contextes/CanvasContext";
import ScrollWheel from "../components/ScrollWheel";
import Terminal from "../components/Terminal/Terminal";
import SwipeChange from "../components/SwipeChange/SwipeChange";
import { useRef } from "react";

const Home = () => {
    const scrollHere = useRef<null | HTMLDivElement>(null);
    return (
        <>
            <CanvasContext>
                <HomeHeader />
                <ScrollWheel onClick={() => {
                    scrollHere.current.scrollIntoView({
                        behavior: "smooth",
                    })
                }} />
            </CanvasContext>
            <div className="mainContainer" ref={scrollHere}>
                <Terminal />
            </div>
            <div style={{overflowX:"hidden"}}>
                <div className="mainContainer">
                    <SwipeChange />
                </div>
            </div>
        </>
    );
}

export default Home;