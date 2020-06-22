import Link from "next/link";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

export interface LinkProps {
    text: string;
    to: string;
}

interface AnimatedLinkProps extends LinkProps {
    style: any;
}

const AnLink = styled(animated.div)`
    padding: .5rem 1rem;
    background-color: transparent;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NavLink: React.FC<AnimatedLinkProps> = ({ text, to, style }) => {
    const [{ x }, set] = useSpring(() => ({
        x: 2000,
    }))
    return (
        <>
            <AnLink 
                style={style}
                onMouseEnter={() => {
                    set({
                        x: 0,
                    })
                }}
                onMouseLeave={() => {
                    set({
                        x: 2000,
                    })
                }}
            >
                <svg
                    viewBox="0 0 500 500"
                    preserveAspectRatio="none"
                    x="0px" y="0px"
                    width="100%" height="100%"
                >
                    <animated.rect 
                        x="0" y="0"
                        width="500"
                        height="500"
                        stroke="#fff"
                        strokeWidth={15}
                        fill="transparent"
                        strokeDasharray={2000}
                        strokeDashoffset={x.interpolate(v => v)}
                    />
                </svg>
                <Link href={to}>
                    <a>{text}</a>
                </Link>
            </AnLink>
            <style jsx>
                {`
                    svg {
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: -1;
                    }
                    a {
                        color: #fff;
                        text-transform: uppercase;
                        fon-size: 30px;
                        font-weight: 300;
                        text-decoration: none;
                    }
                `}
            </style>
        </>
    );
}

export default NavLink;