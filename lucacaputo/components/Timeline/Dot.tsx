import { TimeEvent } from "./Timeline";
import { CSSProperties } from "react";
import { animated, useSpring, config } from "react-spring";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import { useState } from "react";

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
    const [ tooltipVisible, setTooltipVisible ] = useState(false);
    return (
        <div style={style} className="DotContainer">
            <style jsx>{`
                .DotContainer {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }
                .tooltipDotAndDesc {
                    position: relative;
                    display: flex;
                    justify-content: center;
                }
                .dotAndTooltip {
                    position: relative;
                }
            `}</style>
            <div className="tooltipDotAndDesc">
                <div className="dotAndTooltip">
                    <AnimatedDot
                        style={{
                            transform: scale.interpolate(s => `scale(${s})`),
                        }}
                        onMouseEnter={() => setScale({ scale: 1.2 })}
                        onMouseLeave={() => setScale({ scale: 1 })}
                        onClick={() => setTooltipVisible(!tooltipVisible)}
                    />
                    <Tooltip
                        visible={tooltipVisible}
                        text={event.title}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dot;