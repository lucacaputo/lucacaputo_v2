import { animated, useTransition, useChain } from "react-spring";
import styled from "styled-components";
import { useState, useRef } from "react";
import Icon from "./Icon";

const AnimatedContainer = styled(animated.div)`
    height: 400px;
    width: 500px;
    margin: auto;
    background-color: #141414;
    border-radius: 5px;
    border: 1px solid #B7B7B8;
    position: relative;
`;

const AnimatedIcon = styled(animated.div)`
    margin: auto;
    width: 65px;
    box-shadow: 0 0 5px #141414;
    position: relative;
`;

const Terminal = () => {
    const [isOpen, setOpen] = useState(false);
    const close = () => setOpen(false);
    const open = () => setOpen(true);
    return (
        <>
            <AnimatedContainer>
                <div className="iconBar">
                    <Icon type="close" bg="#FF6158" />
                    <Icon type="minimize" bg="#FFBD2D" />
                </div>
                <textarea name="commands"></textarea>
            </AnimatedContainer>
            <AnimatedIcon onClick={open}>
                <img src="/terminal.png" alt="terminal macos image" className="terminalIcon" />
            </AnimatedIcon>
            <style jsx>
                {`
                    .terminalIcon {
                        width: 100%;
                        display: block;
                        height: auto;
                    }
                    .iconBar {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justfy-content: flex-start;
                        background-color: #D5D6D6;
                        padding: 4px;
                    }
                    textarea {
                        background: transparent;
                        font-family: Consolas;
                        color: #fff;
                        font-size: 16px;
                        font-weight: 500;
                        width: 100%;
                        height: 35px;
                        border: none;
                        outline: none;
                        resize: none;
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform: translate(-50%, -100%);
                        margin: 0;
                    }
                    textarea:focus {
                        outline: none;
                    }
                `}
            </style>
        </>
    );
}

export default Terminal;