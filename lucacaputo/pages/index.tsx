import HomeHeader from "../components/HomeHeader";
import CanvasContext from "../contextes/CanvasContext";
import ScrollWheel from "../components/ScrollWheel";
// import Terminal from "../components/Terminal/Terminal";
import SwipeChange from "../components/SwipeChange/SwipeChange";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
<<<<<<< Updated upstream
import ParticlesCanvas from "../components/ParticlesCanvas/ParticlesCanvas";
import { isMobile } from "react-device-detect";
=======
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { Sticky, StickyContainer } from "react-sticky";
>>>>>>> Stashed changes

const Home = () => {
    const colors = ["red", "yellow", "blue"];
    const scrollHere = useRef<null | HTMLDivElement>(null);
    return (
        <ParallaxProvider>
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
                </CanvasContext>
                <ScrollWheel onClick={() => {
                    scrollHere.current.scrollIntoView({
                        behavior: "smooth",
                    })
                }} />
                {/* <div className="mainContainer" ref={scrollHere}>
                    <Terminal />
                </div> */}
                <div style={{overflowX:"hidden"}} ref={scrollHere}>
                    <div className="mainContainer">
                        <SwipeChange />
                    </div>
                </div>
<<<<<<< Updated upstream
            </div>
            <div style={{height:"100vh", marginTop: 40}}>
                <ParticlesCanvas partNum={isMobile ? 40 : 100} proximity_threshold={isMobile ? 50 : 100} />
            </div>
        </motion.div>
=======
            </motion.div>
            <StickyContainer>
                <Sticky>
                    {
                        ({ style }) => (
                            <div style={{...style, height: "100vh"}} className="parallaxContainer">
                                
                            </div>
                        )
                    }
                </Sticky>
                <div style={{height:"100vh"}}></div>
            </StickyContainer>
            <style jsx>
                {`
                    .parallaxContainer {
                        overflow-x: hidden;
                    }
                    .mock {
                        width: 100%;
                        heigth: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>
        </ParallaxProvider>
>>>>>>> Stashed changes
    );
}

export default Home;