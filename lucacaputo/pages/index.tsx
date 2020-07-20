import HomeHeader from "../components/HomeHeader";
import CanvasContext from "../contextes/CanvasContext";
import ScrollWheel from "../components/ScrollWheel";
import Terminal from "../components/Terminal/Terminal";
import SwipeChange from "../components/SwipeChange/SwipeChange";
import { useRef } from "react";
import { motion } from "framer-motion";
import ParticlesCanvas from "../components/ParticlesCanvas/ParticlesCanvas";

const Home = () => {
    const scrollHere = useRef<null | HTMLDivElement>(null);
    return (
        <motion.div 
            exit={{ opacity: 0, x: 120, }} 
            initial={{ opacity: 0, x: -120 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: .6,
            }}
        >
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
            <div style={{height:"100vh", marginTop: 40}}>
                <ParticlesCanvas />
            </div>
        </motion.div>
    );
}

export default Home;