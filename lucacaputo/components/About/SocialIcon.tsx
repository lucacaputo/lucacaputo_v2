import { animated, useSpring, AnimatedValue } from "react-spring";
import styled from "styled-components";
import Insta from "../../svgs/InstaWhite";

interface SocialIconProps<T extends object> {
    link: string;
    style: AnimatedValue<T>;
    image: (props: object) => React.ReactNode;
}

const Icon = styled(animated.div)`
    position: relative;
    padding: 10px;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AnimatedBackground = styled(animated.div)`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    z-index: -1;
`;

const SocialIcon: React.FC<SocialIconProps<any>> = ({ style, link, image }) => {
    const [{ height, fill }, setHeight] = useSpring(() => ({
        height: 0,
        fill: "#e43f5a",
    }));
    return (
        <Icon 
            style={{
                ...style,
                borderColor: fill,
            }}
            onMouseEnter={() => setHeight({ height: 100, fill: "#000000" })}
            onMouseLeave={() => setHeight({ height: 0, fill: "#e43f5a" })}
        >
            <a href={link} target="_blank">
                { image({ style: { fill } }) }
            </a>
            <AnimatedBackground style={{
                height: height.interpolate(h => `${h}%`),
            }} />
            <style jsx>{`
                a {
                    display: block;
                    line-height: 0;
                }
            `}</style>
        </Icon>
    );
}

export default SocialIcon;