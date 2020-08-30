import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { CSSProperties } from "react";

interface SocialIconProps {
    link: string;
    style: CSSProperties;
    image: string;
}

const Icon = styled(animated.div)`
    position: relative;
    padding: 10px;
    border: 1px solid #e43f5a;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AnimatedBackground = styled(animated.div)`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background-color: #fff;
`;

const SocialIcon: React.FC<SocialIconProps> = ({ style, link, image }) => {
    const [{ height }, setHeight] = useSpring(() => ({
        height: 0
    }));
    return (
        <Icon 
            style={style}
            onMouseEnter={() => setHeight({ height: 100 })}
            onMouseLeave={() => setHeight({ height: 0 })}
        >
            <a href={link} target="_blank">
                <img src={image} alt={`${image} social logo`} />
            </a>
            <AnimatedBackground style={{
                height: height.interpolate(h => `${h}%`),
            }} />
        </Icon>
    );
}

export default SocialIcon;