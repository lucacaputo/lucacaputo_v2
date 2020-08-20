import { TimeEvent } from "./Timeline";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { useState } from "react";
import InViewport from "../InViewport";
import Tooltip from "./Tooltip";
import { getDateRange } from "./Helpers";

interface DotProps {
    event: TimeEvent;
}

const Description = styled(animated.div)`
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-left: 15px;
`;

const Dot: React.FC<DotProps> = ({ event }) => {
    const [ref, { width }] = useMeasure({ polyfill: ResizeObserver });
    const [descVisible, setDescVisible] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const { flex } = useSpring({
        from: { flex: 0 },
        flex: descVisible ? 1 : 0,
    });
    return (
        <div className="dotWrapper" ref={ref}>
            <div className="dotAndTooltip">
                <div className="dot" onClick={() => setDescVisible(v => !v)} />
                <InViewport
                    onEnter={() => setTooltipVisible(true)}
                    onExit={() => setTooltipVisible(false)}
                >
                    <Tooltip text={getDateRange(event.from, event.to)} visible={tooltipVisible} />
                </InViewport>
            </div>
            <Description style={{ flex }}>
                <div className="arrow" />
                <div className="descPadding">
                    <p style={{ minWidth: width - 92 }}>
                        <span className="mobileTooltip"> {getDateRange(event.from, event.to)} </span>
                        { event.description }
                        {
                            event.notes &&
                            <>
                                <br />
                                <i style={{ fontSize: 14 }}> {event.notes} </i>
                            </>
                        }
                    </p>
                </div>
            </Description>
            <style jsx>{`
                .dotWrapper {
                    display: flex;
                    width: 100%;
                    position: relative;
                    justify-content: center;
                    align-items: center;
                }
                .dot {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    position: relative;
                    background-color: #1b1b2f;
                    cursor: pointer;
                    will-change: transform;
                    transition: transform .25s ease;
                    box-shadow: 0 0 6px #141414;
                }
                .dot:hover {
                    transform: scale(1.2);
                }
                .descPadding {
                    flex: 1;
                    padding: 6px;
                    border-radius: 3px;
                    background-color: #e5e5e5;
                    position: relative;
                }
                .arrow {
                    border-width: 10px 15px 10px 0;
                    border-color: transparent #e5e5e5 transparent transparent;
                    position: relative;
                    border-style: solid;
                }
                .descPadding > p {
                    display: inline-block;
                    margin-block-end: 0;
                    margin-block-start: 0;
                    font-size: 1rem;
                    text-align: center;
                    pointer-events: painted;
                }
                .dotAndTooltip {
                    position: relative;
                    pointer-events: all;
                }
                .mobileTooltip {
                    font-size: 14px;
                    color: #e43f5a;
                    font-weight: bold;
                    text-align: center;
                    width: 100%;
                    margin-bottom: 10px;
                    display: none;
                }
                @media screen and (max-width: 767px) {
                    .mobileTooltip {
                        display: block;
                    }
                    .dot {
                        width: 35px;
                        height: 35px;
                    }
                }
            `}</style>
        </div>
    );
}

export default Dot;