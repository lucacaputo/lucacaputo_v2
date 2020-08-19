import { useState, CSSProperties, Fragment } from "react";
import { TimeEvent } from "./Timeline";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import InViewport from "../InViewport";
import { getStringDate } from "./TimelineHelpers";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";

interface DotProps {
    first: boolean;
    last: boolean;
    event: TimeEvent;
    style?: CSSProperties;
}

const Description = styled(animated.div)`
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
`;

const Dot: React.FC<DotProps> = ({ first, event, style, last }) => {
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
    const [descVisible, setDescVisible] = useState<boolean>(false);
    const [ref, { width: fullWidth }] = useMeasure({ polyfill: ResizeObserver });
    const { width } = useSpring({
        from: { width: 0 },
        width: descVisible ? 85 : 0,
    });
    return (
        <>
            <div className="dotWrapper" style={style} ref={ref}>
                <div className="dotAndTooltip">
                    <div className="dot" onClick={() => setDescVisible(v => !v)} />
                    <InViewport
                        onEnter={() => setTooltipVisible(true)}
                        onExit={() => setTooltipVisible(false)}
                    >
                        <Tooltip
                            visible={tooltipVisible}
                            text={getStringDate(event.from, event.to)}
                        />
                    </InViewport>
                </div>
                <Description
                   style={{
                       width: width.interpolate(v => `${v}%`),
                   }}
                >
                    <div className="arrow" />
                    <div className="withPadding">
                        <p style={{ minWidth: Math.floor((fullWidth/100)*85) - 29 }}>
                            <span className="mobileTooltip"> { getStringDate(event.from, event.to) } </span>
                            {
                                event.description.split("\n").map(el => (
                                    <Fragment key={el}>
                                        { el } <br />
                                    </Fragment>
                                ))
                            }
                        </p>
                    </div>
                </Description>
            </div>
            <style jsx>{`
                .dotWrapper {
                    display: flex;
                    position: relative;
                    justify-content: center;
                    align-items: center;
                }
                .dot {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #1f4068;
                    position: relative;
                    cursor: pointer;
                    transition: transform .25s ease;
                    will-change: transform;
                }
                .dot:hover {
                    transform: scale(1.2);
                }
                .dotAndTooltip {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    width: 15%;
                }
                .withPadding {
                    padding: 6px;
                    border-radius: 3px;
                    width: 100%;
                    position: relative;
                    border-radius: 3px;
                    background-color: #e5e5e5;
                }
                .withPadding > p {
                    margin-block-end: 0;
                    margin-block-start: 0;
                    font-size: 1rem;
                    text-align: center;
                    display: block;
                    position: relative;
                    overflow: hidden;
                }
                .arrow {
                    border-style: solid;
                    border-width: 10px 15px 10px 0;
                    border-color: transparent #e5e5e5 transparent transparent;
                }
                .mobileTooltip {
                    display: none;
                    color: #e43f5a;
                    font-weight: bold;
                    text-align: center;
                    font-size: 16px;
                    width: 100%;
                }
                @media screen and (max-width: 767px) {
                    .dot {
                        width: 25px;
                        height: 25px;
                    }
                    .mobileTooltip {
                        display: block;
                    }
                }
            `}</style>
        </>
    );
}

export default Dot;