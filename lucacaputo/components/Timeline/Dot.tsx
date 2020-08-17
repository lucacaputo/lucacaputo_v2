import { TimeEvent } from "./Timeline";
import { CSSProperties } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import { useState } from "react";
import { getStringDate } from "./TimelineHelpers";
import { isMobile } from "react-device-detect";
import InViewport from "../InViewport";

interface DotProps {
    event: TimeEvent;
    style: CSSProperties;
}

const AnimatedDot = styled(animated.div)`
    
`;
const AnimatedTextBox = styled(animated.div)`
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    left: 25px;
    text-align: center;
`;

const Dot: React.FC<DotProps> = ({ event, style }) => {
    const [ tooltipVisible, setTooltipVisible ] = useState(false);
    const { width } = useSpring({
        from: {
            width: 0,
        },
        width: tooltipVisible ? 430 : 0,
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
                }
                .descCont {
                    overflow: hidden;
                    padding: 6px;
                    background-color: #eee;
                    border-radius: 3px;
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
                @media screen and (max-width: 767px) {
                    .animDesc {
                        max-width: 185px;
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
                onEnter={() => setTooltipVisible(true)}
                onExit={() => setTooltipVisible(false)}
            >
                <AnimatedTextBox style={{ width }}>
                    <div className="arrow" />
                    <div className="desc_padding">
                        { event.description }
                    </div>
                </AnimatedTextBox>
            </InViewport>
        </div>
    )
}

export default Dot;