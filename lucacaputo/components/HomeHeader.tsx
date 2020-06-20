import { animated, useSpring, useChain } from "react-spring";
import styled from "styled-components";
import { useRef, useState } from "react";

const H1 = styled(animated.h1)`
    font-size: 65px;
    text-align: center;
    font-weight: 700;
    letter-spacing: 1.5px;
    margin-block-start: 0;
    margin-block-end: 0;
    color: #141414;
`;
const H2 = styled(animated.h2)`
    font-size: 45px;
    font-weight: 400;
    color: #141414;
    text-align: center;
    margin-block-start: 0;
    margin-block-end: 0;
`;
const HomeHeader = () => {
    const [h1, h2] = [useRef(null), useRef(null)];
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
    useChain([h1, h2], [0, 0.15]);
    let [p, setp] = useState({
        height: 20,
        amplitude: 20,
        speed: 0.15,
        points: 3
    });
    return (
        <>
            <header
                onMouseMove={evt => {
                    setp({
                        ...p,
                        height: Math.random() * 50,
                    })
                }}
            >
                <div>
                    <H1 style={{
                        // @ts-ignore
                        transform: morphs.interpolate((trans, scale) => `translate3d(0px, ${trans}px, 0px) scale(${scale})`),
                        opacity,
                    }}>
                        Hi!
                    </H1>
                    <H2 style={{
                        // @ts-ignore
                        transform: morphs_2.interpolate((trans, scale) => `translate3d(0px, ${trans}px, 0px) scale(${scale})`),
                        opacity: opacity_2,
                    }}>
                        Welcome to my website!
                    </H2>
                </div>
            </header>
            <style jsx>{`
                header {
                    height: 800px;
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