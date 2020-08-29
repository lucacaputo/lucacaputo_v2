import { animated, useSpring, config } from "react-spring";
import styled from "styled-components";
import { forwardRef } from "react";

interface TooltipProps {
    text: string;
    visible: boolean;
}

const AnimatedTooltip = styled(animated.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    left: 50%;
    width: max-content;
    @media screen and (max-width: 767px) {
        display: none;
    }
`;

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({ text, visible }, ref) => {
    const { trans, opacity } = useSpring({
        from: { trans: [150, 0], opacity: 0 },
        trans: visible ? [-120, 1] : [150, 0],
        opacity: visible ? 1 : 0,
        config: config.wobbly,
    })
    return (
        <AnimatedTooltip
            style={{
                //@ts-ignore
                transform: trans.interpolate((tr, sc) => `translate(-50%, ${tr}%) scale(${sc})`),
                opacity
            }}
            ref={ref}
        >
            <p className="tooltipText">
                { text }
            </p>
            <div className="arrow" />
            <style jsx>{`
                .tooltipText {
                    display: block;
                    border-radius: 3px;
                    color: #fff;
                    background-color: #e43f5a;
                    font-weight: bold;
                    padding: 5px 10px;
                    margin-block-end: 0;
                    margin-block-start: 0;
                    font-size: 14px;
                }
                .arrow {
                    border-style: solid;
                    border-width: 15px 10px 0 10px;
                    border-color: #e43f5a transparent transparent transparent;
                    position: relative;
                    top: -2px;
                }
            `}</style>
        </AnimatedTooltip>
    );
})

export default Tooltip;