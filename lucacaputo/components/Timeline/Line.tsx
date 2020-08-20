import { animated, useSpring } from "react-spring";
import styled from "styled-components";

interface LineProps {
    visible: boolean;
    spcerVisible: boolean;
}

const AnimatedLine = styled(animated.line)`

`;

const Line: React.FC<LineProps> = ({ visible, spcerVisible }) => {
    const { flex } = useSpring({
        from: { flex: 0 },
        flex: spcerVisible ? 1 : 0,
    });
    const { strokeDashoffset } = useSpring({
        from: { strokeDashoffset: 0 },
        strokeDashoffset: visible && !spcerVisible ? 0 : 100,
        delay: 600,
    });
    return (
        <div className="lineWrapper">
            <div className="lineCont">
                <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    x="0px"
                    y="0px"
                    height="100%"
                    width="100%"
                >
                    <AnimatedLine 
                        x1="50"
                        y1="0"
                        x2="50"
                        y2="100"
                        style={{
                            strokeWidth: 10,
                            stroke: "#1b1b2f",
                            strokeDasharray: 100,
                            strokeDashoffset,
                        }}
                    />
                </svg>
            </div>
            <animated.div style={{ flex }} />
            <style jsx>{`
                .lineCont {
                    width: 50px;
                }
                .lineWrapper {
                    flex: 1;
                    align-items: stretch;
                    display: flex;
                    justify-content: center;
                }
                @media screen and (max-width: 767px) {
                    .lineCont {
                        width: 35px;
                    }
                }
            `}</style>
        </div>       
    );
}

export default Line;