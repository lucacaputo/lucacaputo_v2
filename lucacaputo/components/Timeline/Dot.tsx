import { TimeEvent } from "./Timeline";
import { CSSProperties } from "react";
import { animated, useSpring, config } from "react-spring";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import { useState } from "react";
import { getStringDate } from "./TimelineHelpers";
import { isMobile } from "react-device-detect";

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
const AnimatedTextBox = styled(animated.div)`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 20px;
    border-radius: 3px;
    overflow: hidden;
`;

const Dot: React.FC<DotProps> = ({ event, style }) => {
    const [{ scale }, setScale] = useSpring(() => ({
        scale: 1,
        config: config.wobbly,
    }));
    const [ tooltipVisible, setTooltipVisible ] = useState(false);
    const { flex } = useSpring({
        from: {
            flex: 0,
        },
        flex:  tooltipVisible ? 1 : 0,
    });
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
                    display: flex;
                    align-items: center;
                }
                .descCont {
                    overflow: hidden;
                    padding: 6px;
                    background-color: #eee;
                    border-radius: 3px;
                }
                .arrow {
                    border-style: solid;
                    border-width: 10px 15px 10px 0;
                    border-color: transparent #eee transparent transparent;
                }
                .animDesc {
                    margin-block-end: 0;
                    font-size: 16px;
                    width: max-content;
                    display: block;
                    max-width: 400px;
                }
                @media screen and (max-width: 767px) {
                    .animDesc {
                        max-width: 185px;
                    }
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
                        onClick={() => setTooltipVisible(tooltip => !tooltip)}
                    />
                    {
                        !isMobile &&
                        <Tooltip
                            visible={tooltipVisible}
                            text={getStringDate(event.from, event.to)}
                        />
                    }
                </div>
                <AnimatedTextBox style={{
                    flex,
                }}>
                    <div className="arrow" />
                    <div className="descCont">
                        <span className="animDesc">
                            {
                                isMobile &&
                                <><span style={{ display: "block", color: "#e43f5a", fontSize: 14, fontWeight: "bold" }}>{getStringDate(event.from, event.to)}</span> <br /></>
                            }
                            { event.description }
                        </span>
                    </div>
                </AnimatedTextBox>
            </div>
        </div>
    )
}

export default Dot;