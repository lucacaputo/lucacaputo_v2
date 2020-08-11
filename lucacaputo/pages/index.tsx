import HomeHeader from "../components/HomeHeader";
import CanvasContext from "../contextes/CanvasContext";
import ScrollWheel from "../components/ScrollWheel";
// import Terminal from "../components/Terminal/Terminal";
// import SwipeChange from "../components/SwipeChange/SwipeChange";
import { useRef } from "react";
import { motion } from "framer-motion";
import ParticlesCanvas from "../components/ParticlesCanvas/ParticlesCanvas";
import { isMobile } from "react-device-detect";

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
        </motion.div>
    );
}

export default Home;