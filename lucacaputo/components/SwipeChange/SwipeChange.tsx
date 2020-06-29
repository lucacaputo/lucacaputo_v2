import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";
import { useRef } from "react";

const SwipeContainer = styled(animated.div)`
    position: absolute;
    z-index:2;
    top: 0;
    left: 0;
    height: 100%;
    max-width:100%;
    background-color: yellow;
`;

const toPerc = (tot: number, movement: number) => {
    return Math.floor((Math.abs(movement)*100)/tot);
}

const SwipeChange: React.FC = () => {
    const contRef = useRef<null | HTMLDivElement>(null);
    const [{ x }, set] = useSpring(() => ({ x: 0 }));
    const bind = useDrag(({ offset: [x] }) => {
        set({ x });
    });
    return (
        <div className="container" ref={contRef}>
            <div className="reveal"></div>
            <SwipeContainer style={{ width: x.interpolate(v => `calc(50% + ${v}px)`) }}>
                <div className="dragBall" {...bind()} />
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
                        z-index: 1;
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