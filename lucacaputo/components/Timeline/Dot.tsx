import { TimeEvent } from "./Timeline";
import { CSSProperties, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import { getStringDate } from "./TimelineHelpers";
import { isMobile } from "react-device-detect";
import InViewport from "../InViewport";

interface DotProps {
    event: TimeEvent;
    style: CSSProperties;
}

const AnimatedTextBox = styled(animated.div)`
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    left: 25px;
    text-align: center;
    @media (max-width: 767px) {
        left: 5px;
    }
    @media (max-width: 600px) {
        max-width: 320px
    }
    @media (max-width: 480px) {
        max-width: 300px;
    }
`;

const Dot: React.FC<DotProps> = ({ event, style }) => {
    const [ tooltipVisible, setTooltipVisible ] = useState(false);
    const [{ width }, setWidth] = useSpring(() => ({
        width: 0,
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
                .dotAndTooltip {
                    position: relative;
                }
                .dot {
                    height: 50px;
                    width: 50px;
                    position: relative;
                    border-radius: 50%;
                    background-color: #1f4068;
                    margin: 5px 0;
                }
                .desc_padding {
                    padding: 7px;
                    border-radius: 3px;
                    background-color: #e5e5e5;
                    min-width: 400px;
                    max-width: 400px;
                }
                .arrow {
                    width: 0; 
                    height: 0; 
                    border-top: 10px solid transparent;
                    border-bottom: 10px solid transparent; 
                    border-right:15px solid #e5e5e5;
                }
                .mobileDate {
                    display: none;
                    position: relative;
                    color: #e43f5a;
                    font-weight: bold;
                }
                @media screen and (max-width: 767px) {
                    .desc_padding {
                        display: flex;
                        flex-direction: column;
                        flex-wrap: wrap;
                    }
                    .mobileDate {
                        display: block;
                    }
                }
                @media screen and (max-width: 600px) {
                    .desc_padding {
                        max-width: 300px;
                        min-width: 300px;
                    }
                }
                @media screen and (max-width: 480px) {
                    .desc_padding {
                        max-width: 280px;
                        min-width: 280px;
                        font-size: 14px;
                        padding: 4px;
                    }
                    .dot {
                        width: 25px;
                        height: 25px;
                    }
                }
            `}</style>
            <div className="dotAndTooltip">
                <div className="dot" />
                {
                    !isMobile &&
                    <InViewport 
                        onEnter={() => setTooltipVisible(true)}
                        onExit={() => setTooltipVisible(false)}
                    >
                        <Tooltip visible={tooltipVisible} text={getStringDate(event.from, event.to)} />
                    </InViewport>
                }
            </div>
            <InViewport
                onEnter={() => setWidth({ width: window.innerWidth <= 600 ? 300 : 430 })}
                onExit={() => setWidth({ width: 0 })}
            >
                <AnimatedTextBox style={{ width }}>
                    <div className="arrow" />
                    <div className="desc_padding">
                        <div className="mobileDate">
                            { getStringDate(event.from, event.to) }
                        </div>
                        { event.description }
                    </div>
                </AnimatedTextBox>
            </InViewport>
        </div>
    )
}

export default Dot;