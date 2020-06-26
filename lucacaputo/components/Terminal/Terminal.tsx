import { animated, useTransition, useSpring } from "react-spring";
import styled from "styled-components";
import { useState, useRef } from "react";
import Icon from "./Icon";
import { useRouter } from "next/router";

const AnimatedContainer = styled(animated.div)`
    height: 400px;
    width: 500px;
    margin: auto;
    background-color: #141414;
    border-radius: 5px;
    border: 1px solid #B7B7B8;
    position: relative;
    overflow: hidden;
`;

const AnimatedIcon = styled(animated.div)`
    margin: auto;
    width: 65px;
    position: absolute;
    top: calc(50% - 27px);
    left: calc(50% - 32.5px);
    cursor: pointer;
`;

const Cons = styled.span`
    font-size: 14px;
    color: #fff;
    font-family: "Roboto Mono";
    display: block;
    width: 100%;
`;

const AVAILABLE_COMMANDS = [
    { name: "help", exp: "displays available commands" },
    { name: "clear", exp: "clears the terminal" },
    { name: "hist", exp: "shows commands history" },
    { name: "goto <page>", exp: "navigates to /<page>" },
    { name: "contact -field", exp: "shows the contact. (name, email, tel)" },
]

const AVAILABLE_PAGES = [
    "about",
    "home",
    "projects",
    "contacts",
];

const Terminal = () => {
    const router = useRouter();
    const [isOpen, setOpen] = useState(true);
    const [content, setContent] = useState([]);
    const [commands, setCommands] = useState<Array<string>>([]);
    const [area, setArea] = useState("");
    const textarea = useRef(null);
    const close = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
    }
    const open = () => setOpen(true);

    const transition = useTransition(isOpen, null, {
        from: { transform: "translateY(100px)", opacity: 0 },
        enter: { transform: "translateY(0px)", opacity: 1 },
        leave: { transform: "translateY(100px)", opacity: 0 }
    });

    const { height } = useSpring({
        from: {
            height: 400,
        },
        height: isOpen ? 400 : 53,
    });

    const parseCommand = (command: Array<string>) => {
        switch(command[0].toLowerCase()) {
            case "help":
                setContent([
                    ...content,
                    AVAILABLE_COMMANDS.map((el, i) => (
                        <Cons key={`${Date.now()}-${i}`}>{ `${el.name} --> ${el.exp}` }</Cons>
                    ))
                ])
                break;
            case "clear":
                setContent([]);
                break;
            case "hist":
                setContent([
                    ...content,
                    commands.map((el, i) => <Cons key={`hist-${Date.now()}-${i}`}>{el}</Cons>)
                ]);
                break;
            case "goto":
                const page = command[1];
                if (!page) {
                    setContent([
                        ...content,
                        <Cons key={`missing-${Date.now()}`}>page parameter missing</Cons>
                    ]);
                    break;
                } else {
                    if (AVAILABLE_PAGES.indexOf(page) >= 0) {
                        router.push(`/${page}`);
                    } else {
                        setContent([
                            ...content,
                            <Cons key={`wrong-${Date.now()}`}>page not existing</Cons>
                        ]);
                    }
                    break;
                }
            case "contact":
                const field = command[1]?.substring(1).toLowerCase();
                if (!field) {
                    setContent([
                        ...content,
                        <Cons key={`missing-${Date.now()}`}>field parameter missing</Cons>
                    ]);
                    break;
                } else {
                    switch(field) {
                        case "name":
                            setContent([
                                ...content,
                                <Cons key={`contact-${Date.now()}`}>Hi, I'm Luca :)</Cons>,
                            ]);
                            break;
                        case "email":
                            setContent([
                                ...content,
                                <Cons key={`contact-${Date.now()}`}>caputo.luca@outlook.com</Cons>,
                            ]);
                            break;
                        case "tel":
                            setContent([
                                ...content,
                                <Cons key={`contact-${Date.now()}`}>+39 329 1256889</Cons>,
                            ]);
                            break;
                        default:
                            setContent([
                                ...content,
                                <Cons key={`wrong-cont-${Date.now()}`}>Field not available</Cons>,
                            ]);
                    }
                    break;
                }
            default:
                setContent([
                    ...content,
                    <Cons key={`unrec-${Date.now()}`}>unrecognized command "{command}"</Cons>
                ]);
        }
        setCommands([
            ...commands,
            command[0].toLowerCase(),
        ])
    }

    const onKeyDown = (evt: React.KeyboardEvent) => {
        if (evt.keyCode === 13) {
            evt.preventDefault();
            parseCommand(area.split(/\s+/gm));
            setArea("");
        }
    } 

    return (
        <>
            <animated.div
                style={{
                    height,
                    position: "relative",
                    margin: "20px 0",
                }}
            >
                {
                    transition.map(({ item, props, key }) => item ? 
                        <AnimatedContainer style={props} key={key} onClick={() => textarea.current.focus()}>
                            <div className="iconBar">
                                <Icon onClick={close} type="close" bg="#FF6158" />
                                <Icon type="minimize" bg="#FFBD2D" />
                            </div>
                            <div className="help">Type 'help' for the available commands.</div>
                            <div className="fader"></div>
                            <div className="terminal_content">
                                { content }
                            </div>
                            <textarea onKeyDown={onKeyDown} value={area} onChange={e => setArea(e.target.value)} name="commands" ref={textarea}></textarea>
                        </AnimatedContainer> 
                        : <AnimatedIcon style={props} key={key} onClick={open}>
                            <img src="/terminal.svg" alt="terminal macos image" className="terminalIcon" />
                        </AnimatedIcon>
                    )
                }
            </animated.div>
            <style jsx>
                {`
                    .terminalIcon {
                        width: 100%;
                        display: block;
                        height: auto;
                        box-shadow: 0 0 5px #141414;
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
                        padding: 5px;
                        font-family: "Roboto Mono";
                        color: #fff;
                        font-size: 14px;
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
                    .help {
                        position: relative;
                        top: 0;
                        left: 0;
                        padding-top: 5px;
                        padding-left: 5px;
                        color: #fff;
                        font-family: "Roboto Mono";
                        font-size: 14px;
                        width: 100%;
                        background-color: #141414;
                    }
                    .fader {
                        height: 10px;
                        background: rgb(20,20,20);
                        background: linear-gradient(180deg, rgba(20,20,20,1) 0%, rgba(255,255,255,0) 100%);
                        position: relative;
                        z-index: 5;
                    }
                    .terminal_content {
                        position: absolute;
                        z-index: -1;
                        bottom: 0;
                        width: 100%;
                        overflow-x: hidden;
                        padding: 0 5px 40px 5px;
                    }
                `}
            </style>
        </>
    );
}

export default Terminal;