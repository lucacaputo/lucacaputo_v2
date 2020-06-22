import NavLink, { LinkProps } from "./NavLink";
import styled from "styled-components";
import { animated, useSpring, useTrail, config } from "react-spring";
import { useEffect } from "react";

const Nav = styled(animated.nav)`
    position: fixed;
    width: 100%;
    padding: .75rem 1rem;
    background-color: rgba(0,0,0,0.7);
    left: 0;
    z-index: 10;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

interface NavProps {
    links: Array<LinkProps>;
}
const SCROLL_THRESHOLD = 100;

const Navbar: React.FC<NavProps> = ({ links }) => {
    const { tr, op } = useSpring({
        from: {
            tr: 50,
            op: 0,
        },
        tr: 0,
        op: 1,
    });
    const [{ top }, set] = useSpring(() => ({
        top: 45,
        config: config.wobbly,
    }));
    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY >= SCROLL_THRESHOLD) {
                set({
                    top: 0,
                })
            } else {
                set({
                    top: 45,
                })
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []);
    const trail = useTrail(links.length, {
        config: config.wobbly,
        from: {
            opacity: 0,
            tr: 25,
        },
        opacity: 1,
        tr: 0,
        delay: 2000,
    })
    return (
        <Nav
            style={{
                opacity: op,
                transform: tr.interpolate(v => `translate3d(0px, ${v}px, 0px)`),
                top: top.interpolate(v => `${v}vh`),
            }}
        >
            {
                trail.map((props, idx) => (
                    <NavLink style={{
                        opacity: props.opacity,
                        transform: props.tr.interpolate(v => `translate3d(0px, ${v}px, 0px)`),
                    }} to={links[idx].to} text={links[idx].text} key={links[idx].text}  />
                ))
            }
        </Nav>
    );
}

export default Navbar;