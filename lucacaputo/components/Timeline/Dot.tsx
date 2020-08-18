import { useState, CSSProperties, useEffect } from "react";
import { TimeEvent } from "./Timeline";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import InViewport from "../InViewport";
import { getStringDate } from "./TimelineHelpers";

interface DotProps {
    first: boolean;
    event: TimeEvent;
    style?: CSSProperties;
}

const Description = styled(animated.div)`
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
`;

const Dot: React.FC<DotProps> = ({ first, event, style }) => {
    const [eventVisible, setEventVisible] = useState<boolean>(false);
    const [vport, setViewport] = useState<number>(85);
    const { width } = useSpring({
        from: {
            width: 0,
        },
        width: eventVisible ? vport : 0,
    });
    useEffect(() => {
        const resize = () => {
            let w = window.innerWidth || document.documentElement.clientWidth;
            if (w <= 560) setViewport(90);
            else if (vport === 90) setViewport(85);
        }
        resize();
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [vport]);
    return (
        <>
            <div className="dotWrapper" style={style}>
                <div className="dotAndTooltip">
                    <div className="dot" />
                    <InViewport
                        onEnter={() => setEventVisible(true)}
                        onExit={() => setEventVisible(false)}
                    >
                        <Tooltip 
                            visible={eventVisible}
                            text={getStringDate(event.from, event.to)}
                        />
                    </InViewport>
                </div>
                <Description
                    style={{
                        width: width.interpolate(w => `${w}%`)
                    }}
                >
                    <div className="arrow" />
                    <div className="withPadding">
                        <p>
                            { event.description }
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
                }
                .dotAndTooltip {
                    position: relative;
                    width: 15%;
                    display: flex;
                    justify-content: center;
                }
                .withPadding {
                    padding: 6px;
                    background-color: #e5e5e5;
                    border-radius: 3px;
                }
                .withPadding > p {
                    margin-block-end: 0;
                    margin-block-start: 0;
                    font-size: 1rem;
                    display: inline-block;
                    width: 100%;
                    min-width: 400px;
                    white-space: pre-wrap;
                    text-align: center;
                }
                .arrow {
                    border-style: solid;
                    border-width: 10px 15px 10px 0;
                    border-color: transparent #e5e5e5 transparent transparent;
                }
                @media screen and (max-width: 560px) {
                    .dot {
                        width: 25px;
                        height: 25px;
                    }
                    .dotAndTooltip {
                        width: 10%;
                    }

                }
            `}</style>
        </>
    );
}

export default Dot;