import HomeHeader from "../components/HomeHeader";
import CanvasContext from "../contextes/CanvasContext";
import ScrollWheel from "../components/ScrollWheel";
import Terminal from "../components/Terminal/Terminal";
import { useRef } from "react";
import TypeWriter from "../components/TypeWriter/TypeWriter";

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
        </>
    );
}

export default Home;