import HomeHeader from "../components/HomeHeader";
import CanvasContext from "../contextes/CanvasContext";
import ScrollWheel from "../components/ScrollWheel";
// import Terminal from "../components/Terminal/Terminal";
// import SwipeChange from "../components/SwipeChange/SwipeChange";
import { useRef } from "react";
import { motion } from "framer-motion";
import ParticlesCanvas from "../components/ParticlesCanvas/ParticlesCanvas";
import { isMobile } from "react-device-detect";
import Timeline from "../components/Timeline/Timeline";

const Home = () => {
    const scrollHere = useRef<null | HTMLDivElement>(null);
    return (
            <motion.div 
                exit={{ opacity: 0, y: -120, }} 
                initial={{ opacity: 0, y: 120 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: .6,
                }}
            >
                <CanvasContext>
                    <HomeHeader />
                </CanvasContext>
                <ScrollWheel onClick={() => {
                    scrollHere.current.scrollIntoView({
                        behavior: "smooth",
                    })
                }} />
                <div style={{overflowX:"hidden"}} ref={scrollHere}>
                    <div style={{height:"100vh", marginTop: 40}}>
                        <ParticlesCanvas partNum={isMobile ? 40 : 100} proximity_threshold={isMobile ? 50 : 100} />
                    </div>
                </div>
                <div className="mainContainer">
                    <Timeline
                        events={[
                            {
                                from: new Date("2020-08-01"),
                                to: new Date("2020-08-31"),
                                description: "Front end and Back end developer at D@M Damsol\nStack: HTML5, CSS3, JS (ECMAScript 5+), PHP, MYSQL",
                            },
                            {
                                from: new Date("2019-12-16"),
                                to: new Date("2019-12-31"),
                                description: "being awesome before",
                            },
                        ]}
                    />
                </div>
        </motion.div>
    );
}

export default Home;