import styled from "styled-components";
import { animated, useSpring, config } from "react-spring";

const AnimatedTooltip = styled(animated.div)`
    border-radius: 3px;
    padding: 5px;
    position: absolute;
    top: 0;
    left: 50%;
    background-color: #e43f5a;
    z-index: -1;
    width: max-content;
    max-width: 300px;
    box-shadow: 0 3px 7px #141414;
    &:before {
        content: "";
        border-style: solid;
        border-width: 20px 10px 0 10px;
        position: absolute;
        bottom: -15px;
        left: 50%;
        border-color: #e43f5a transparent transparent transparent;
        transform: translateX(-50%);
    }
    @media (max-width: 767px) {
        display: none;
    }
`;

interface TooltipProps {
    visible: boolean;
    text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ visible, text }) => {
    const { trans, opacity } = useSpring({ 
        from: {
            trans: [50, .3],
            opacity: 0, 
        },
        trans: visible ? [-200, 1] : [50, .3],
        opacity: visible ? 1 : 0,
        config: config.wobbly,
    });
    return (
        <AnimatedTooltip 
            style={{
                //@ts-ignore
                transform: trans.interpolate((tr, sc) => `translate(-50%, ${tr}%) scale(${sc})`),
                opacity,
            }}
        >
            <span style={{ marginBlockEnd: 0, fontSize: 14, color: "#fff" }}>{text}</span>
        </AnimatedTooltip>
    );
}

export default Tooltip;