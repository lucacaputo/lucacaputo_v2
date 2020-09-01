import { animated, useSpring, useChain } from "react-spring";
import { useRef, forwardRef, useState } from "react";
import styled from "styled-components";

interface ButtonProps {
    type: "button" | "submit";
    text: string;
    disabled?: boolean;
}

const Btn = styled(animated.button)`
    display: block;
    flex: 1;
    padding: 1rem 2.5rem;
    font-size: 18px;
    font-weight: 200;
    letter-spacing: 1.5px;
    background-color: transparent;
    border: 1px solid #fff;
    cursor: pointer;
    position: relative;
    z-index: 2;
    &:focus {
        outline: none;
    }
`;

const SubmitButton = forwardRef<HTMLButtonElement, ButtonProps>(({
    type,
    disabled=false,
    text,
}, ref) => {
    const firstAnimation = useRef();
    const secondAnimation = useRef();
    const [hover, setHover] = useState(false);
    const spring_one = useSpring({
        from: {
            bottom: 0,
            height: 0,
        },
        bottom: hover ? 100 : 0,
        height: hover ? 100 : 0, 
        ref: firstAnimation,
    });
    const spring_two = useSpring({
        from: {
            width: 0,
        },
        width: hover ? 100 : 0,
        ref: secondAnimation,
    });
    const { color } = useSpring({
        from: {
            color: "#1b1b2f",
        },
        color: hover ? "#ffffff" : "#1b1b2f",
        delay: hover ? 200 : 600,
    })
    useChain(hover ? [firstAnimation, secondAnimation] : [secondAnimation, firstAnimation], [0, 0.4]);
    return (
        <div className="buttonWrap">
            <Btn
                ref={ref}
                type={type}
                disabled={disabled}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ color }}
            >
                {text}
            </Btn>
            <animated.div style={{
                width: "100%",
                position: "absolute",
                left: 0,
                backgroundColor: "#1b1b2f",
                height: spring_one.height.interpolate({
                    range: [0, 65, 100],
                    output: [0, 100, 0]
                }).interpolate(h => `${h}%`),
                bottom: spring_one.bottom.interpolate({
                    range: [0, 65, 100],
                    output: [0, 0, 100]
                }).interpolate(t => `${t}%`),
                zIndex: 1,
            }} />
            <animated.div style={{
                position: "absolute",
                height: "100%",
                backgroundColor: "#e43f5a",
                top: 0,
                left: 0,
                width: spring_two.width.interpolate(w => `${w}%`),
                zIndex: 1,
            }} />
            <style jsx>{`
                .buttonWrap {
                    position: relative;
                    padding: 0;
                    display: inline-flex;
                    background-color: #fff;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
});

export default SubmitButton;