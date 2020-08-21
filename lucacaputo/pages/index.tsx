import HomeHeader from "../components/HomeHeader";
import CanvasContext from "../contextes/CanvasContext";
import ScrollWheel from "../components/ScrollWheel";
// import Terminal from "../components/Terminal/Terminal";
// import SwipeChange from "../components/SwipeChange/SwipeChange";
import { useRef } from "react";
import ParticlesCanvas from "../components/ParticlesCanvas/ParticlesCanvas";
import { isMobile } from "react-device-detect";
import Timeline from "../components/Timeline/Timeline";
import { events } from "../components/Timeline/Events";

const Home = () => {
    const scrollHere = useRef<null | HTMLDivElement>(null);
    return (
        <div className="index">
            <div className="head">
                <CanvasContext>
                    <HomeHeader />
                </CanvasContext>
                <ScrollWheel onClick={() => {
                    scrollHere.current.scrollIntoView({
                        behavior: "smooth",
                    })
                }} />
            </div>
            <div className="particlesCont">
                <ParticlesCanvas partNum={isMobile ? 40 : 100} proximity_threshold={isMobile ? 50 : 100} />
            </div>
            <div className="mainContainer noEvts" style={{ zIndex: 1, marginTop: 150 }} ref={scrollHere}>
                <Timeline events={events} />
            </div>
            <style jsx>{`
                .head {
                    position: relative;
                    z-index: 2;
                    background-color: #fff;
                    box-shadow: 0 2px 7px #141414;
                }
                .particlesCont {
                    position: fixed;
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                    top: 0;
                    left: 0;
                }
            `}</style>
        </div>
    );
}

export default Home;