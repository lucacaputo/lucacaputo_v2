import { TimeEvent } from "./Timeline";
import { CSSProperties } from "react";
import { animated, useSpring, config } from "react-spring";
import styled from "styled-components";

interface DotProps {
    event: TimeEvent;
    style: CSSProperties;
}

const AnimatedDot = styled(animated.div)`
    height: 50px;
    width: 50px;
    position: relative;
    border-radius: 50%;
    background-color: #1f4068;
    cursor: pointer;
    margin: 5px 0;
`;

const Dot: React.FC<DotProps> = ({ event, style }) => {
    const [{ scale }, setScale] = useSpring(() => ({
        scale: 1,
        config: config.wobbly,
    }));
    return (
        <div style={style} className="DotContainer">
            <style jsx>{`
                .DotContainer {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }
            `}</style>
            <AnimatedDot
                style={{
                    transform: scale.interpolate(s => `scale(${s})`),
                }}
                onMouseEnter={() => setScale({ scale: 1.2 })}
                onMouseLeave={() => setScale({ scale: 1 })}
            />
        </div>
    )
}

export default Dot;