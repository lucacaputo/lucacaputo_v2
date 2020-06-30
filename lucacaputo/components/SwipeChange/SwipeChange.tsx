import { animated, useSpring } from "react-spring";
import { useGesture, useDrag } from "react-use-gesture";
import styled from "styled-components";
import useMeasure from "react-use-measure";
import { useRef } from "react";
import clamp from "lodash.clamp";

const SwipeContainer = styled(animated.div)`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    max-width:100%;
    background-color: yellow;
`;

const SwipeChange: React.FC = () => {
    const ball = useRef<null | HTMLDivElement>(null);
    const [ref, b] = useMeasure();
    const [{ x }, set] = useSpring(() => ({ x: 0 }));
    const bind = useDrag(({ offset: [ox] }) => {
        set({ x: ox });
    }, {
        bounds: { left: -b.width/2, right: b.width/2 },
        domTarget: ball.current,
        eventOptions: {
            passive: true,
        }
    })
    return (
        <div className="container" ref={ref}>
            <div className="reveal"></div>
            <SwipeContainer style={{ width: x.interpolate(v => `calc(50% + ${v}px)`) }}>
                <div className="dragBall" onClick={e => e.stopPropagation()} ref={ball} {...bind()} />
            </SwipeContainer>
            <style jsx>
                {`
                    .container {
                        width: 100%;
                        position: relative;
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