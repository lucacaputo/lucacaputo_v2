import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";

const SwipeContainer = styled(animated.div)`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    max-width:100%;
    background: url("https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80") no-repeat;
    background-size: cover;
    background-position: center;
    box-shadow: 2px 0 8px #1b1b2f;
`;

const Reveal = styled(animated.div)`
    position: relative;
    width: 100%;
    height: 500px;
    background: url("https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80") no-repeat;
    background-size: cover;
    z-index: -1;
`;

const clamp = (num: number, lower: number, upper: number): number => {
    if (num >= upper) return upper;
    if (num <= lower) return lower;
    if (num > lower && num < upper) return num;
}

const SwipeChange: React.FC = () => {
    const [ref, { width }] = useMeasure({ polyfill: ResizeObserver });
    const [{ x }, set] = useSpring(() => ({ x: 200 }));
    const bind = useDrag(({ movement: [mx], memo = x.getValue() }) => {
        set({ x: clamp(mx + memo, -width/2, width/2) });
        return memo;
    }, {
        eventOptions: {
            pointer: true,
            capture: true,
        }
    })
    return (
        <div className="container" ref={ref}>
            <Reveal className="reveal" style={{
                backgroundPosition: x.interpolate(v => `calc(${width/2-1}px + ${v}px) 50%`)
            }}>
                <h2>
                    I <strong>build</strong> it!
                </h2>
            </Reveal>
            <SwipeContainer style={{ width: x.interpolate(v => `calc(50% + ${v}px)`) }}>
                <div style={{overflow:"hidden"}}>
                    <h2>
                        <strong>We</strong> think it...
                    </h2>
                </div>
                <div className="dragBall" {...bind()}>
                    <img src="/grab.svg" alt="grab icon"/>
                </div>
            </SwipeContainer>
            <style jsx>
                {`
                    .container {
                        width: 100%;
                        position: relative;
                        touch-action: pan-y;
                    }
                    .dragBall {
                        width: 40px;
                        height: 40px;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translate(50%, -50%);
                        background-color: #eee;
                        border-radius: 50%;
                        cursor: grab;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 5px;
                        box-shadow: 2px 0 8px #1b1b2f;
                        user-select: none;
                    }
                    h2 {
                        color: #1b1b2f;
                        font-size: 40px;
                        text-align: center;
                        letter-spacing: 1.2px;
                        margin: auto;
                        width max-content;
                        font-weight: 300;
                        user-select: none;
                    }
                    img {
                        width: 80%;
                        height: auto;
                        display: block;
                        pointer-events: none;
                        user-select: none;
                    }
                `}
            </style>
        </div>
    );
}

export default SwipeChange;