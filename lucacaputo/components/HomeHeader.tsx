import { animated, useSpring, useChain } from "react-spring";
import styled from "styled-components";
import { useRef, useState, useContext } from "react";
import HomeCanvas from "./HomeCanvas";
import { CanvasContext } from "../contextes/CanvasContext";
import TypeWriter from "./TypeWriter/TypeWriter";

const H1 = styled(animated.h1)`
    font-size: 65px;
    text-align: center;
    font-weight: 700;
    letter-spacing: 1.5px;
    margin-block-start: 0;
    margin-block-end: 0;
    font-family: "Roboto Mono";
    color: #162447;
    background-color: #e43f5a;
    display: block;
    width: max-content;
    margin: auto;
    padding: 0 10px;
`;
const D2 = styled(animated.div)`
    font-size: 45px;
    font-weight: 400;
    color: #eee;
    text-align: center;
    margin-block-start: 0;
    margin-block-end: 0;
`;
const MAX_AMP = 50;
const MAX_SPEED = 0.03;
const HomeHeader: React.FC = () => {
    const { config, update } = useContext(CanvasContext);
    const [h1, h2, div] = [useRef(null), useRef(null), useRef(null)];
    const { morphs, opacity } = useSpring({
        morphs: [0, 1],
        opacity: 1,
        from: {
            morphs: [-60, 2.5],
            opacity: 0,
        },
        ref: h1,
    });
    const { morphs_2, opacity_2 } = useSpring({
        morphs_2: [0, 1],
        opacity_2: 1,
        from: {
            morphs_2: [60, 2],
            opacity_2: 0,
        },
        ref: h2,
    });
    const { tr } = useSpring({
        from: {
            tr: 0,
        },
        tr: -60,
        ref: div,
    })
    useChain([h1, h2, div], [0, 0.5, 1]);
    const [{ lastX, lastY, lastTime }, updateMouse] = useState({
        lastX: 0,
        lastY: 0,
        lastTime: 0,
    });
    const onMouseMove = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
        let time = Date.now();
        const [x, y] = [evt.clientX, evt.clientY];
        const direction = x >= lastX ? "right" : "left";
        let pixelsTravelled = Math.sqrt((Math.pow(Math.abs(x - lastX), 2) + Math.pow(Math.abs(y - lastY), 2)));
        let velocity = Math.abs(pixelsTravelled / (time - lastTime));
        updateMouse({
            lastX: x,
            lastY: y,
            lastTime: time,
        });
        //update wave
        const nums = {
            frequency: config.frequency.getValue(),
            amplitude: config.amplitude.getValue(),
            length: config.length.getValue(),
        }
        update({
            ...nums,
            frequency: direction === "left" 
                ? velocity/100 > MAX_SPEED 
                    ? MAX_SPEED : velocity/100
                : velocity/100 > MAX_SPEED
                    ? -MAX_SPEED : -velocity/100,
            amplitude: velocity * 10 <= MAX_AMP ? velocity*10 : MAX_AMP,
        });
    }
    const onTouchMove = (evt: React.TouchEvent) => {
        const touch = evt.touches[0];
        let time = Date.now();
        const x = touch.clientX, y = touch.clientY;
        const direction = x >= lastX ? "right" : "left";
        let pixelsTravelled = Math.sqrt((Math.pow(Math.abs(x - lastX), 2) + Math.pow(Math.abs(y - lastY), 2)));
        let velocity = Math.abs(pixelsTravelled / (time - lastTime));
        updateMouse({
            lastX: x,
            lastY: y,
            lastTime: time,
        });
        //update wave
        const nums = {
            frequency: config.frequency.getValue(),
            amplitude: config.amplitude.getValue(),
            length: config.length.getValue(),
        }
        update({
            ...nums,
            frequency: direction === "left" 
                ? velocity/100 > MAX_SPEED 
                    ? MAX_SPEED : velocity/100 + Math.random()/100
                : velocity/100 > MAX_SPEED
                    ? -MAX_SPEED : -velocity/100 - Math.random()/100,
            amplitude: velocity * 10 <= MAX_AMP ? velocity*10 : MAX_AMP,
        });
    }
    return (
        <>
            <header
                onMouseMove={onMouseMove}
                onTouchMove={onTouchMove}
            >
                <animated.div
                    style={{
                        transform: tr.interpolate(v => `translate3d(0, ${v}%, 0)`),
                    }}
                >
                    <H1 style={{
                        // @ts-ignore
                        transform: morphs.interpolate((trans, scale) => `translate3d(0px, ${trans}px, 0px) scale(${scale})`),
                        opacity,
                    }}>
                        Hi!
                    </H1>
                    <D2 style={{
                        // @ts-ignore
                        transform: morphs_2.interpolate((trans, scale) => `translate3d(0px, ${trans}px, 0px) scale(${scale})`),
                        opacity: opacity_2,
                    }}>
                        <TypeWriter 
                            wordSequence={["front end", "back end", "mobile", "awesome"]}
                            beforeSentence="I'm a"
                            afterSentence="developer"
                            fontSize={45}
                            bg="#e43f5a"
                            textColor="#162447"
                            timing={200}
                        />
                    </D2>
                </animated.div>
                <HomeCanvas color="rgba(23, 36, 71, 0.8)" offset={0} z={-1} />
                <HomeCanvas color="#204068" offset={30} z={-2} />
            </header>
            <style jsx>{`
                header {
                    height: 90vh;
                    width: 100%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
            `}</style>
        </>
    );
}

export default HomeHeader