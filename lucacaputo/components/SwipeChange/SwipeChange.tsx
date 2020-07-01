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
    background-color: yellow;
`;

const SwipeChange: React.FC = () => {
    const [ref, { width }] = useMeasure({ polyfill: ResizeObserver });
    const [{ x }, set] = useSpring(() => ({ x: 0 }));
    const bind = useDrag(({ offset: [ox] }) => {
        return set({ x: ox });
    }, {
        bounds: { left: -width/2, right: width/2 },
        eventOptions: {
            pointer: true,
            capture: true,
        }
    })
    return (
        <div className="container" ref={ref}>
            <div className="reveal"></div>
            <SwipeContainer style={{ width: x.interpolate(v => `calc(50% + ${v}px)`) }}>
                <div className="dragBall" {...bind()} />
            </SwipeContainer>
            <style jsx>
                {`
                    .container {
                        width: 100%;
                        position: relative;
                        touch-action: none;
                    }
                    .reveal {
                        position: relative;
                        width: 100%;
                        height: 500px;
                        background-color: blue;
                        z-index: -1;
                    }
                    .dragBall {
                        width: 50px;
                        height: 50px;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translate(50%, -50%);
                        background-color: red;
                        border-radius: 50%;
                    }
                `}
            </style>
        </div>
    );
}

export default SwipeChange;