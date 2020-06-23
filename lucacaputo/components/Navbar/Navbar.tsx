import NavLink, { LinkProps } from "./NavLink";
import styled from "styled-components";
import { animated, useSpring, useTrail, useChain, config } from "react-spring";
import { useEffect, useState, useRef } from "react";

const Nav = styled(animated.nav)`
    position: fixed;
    width: 100vw;
    padding: .75rem 1rem;
    left: 0;
    z-index: 10;
`;

interface NavProps {
    links: Array<LinkProps>;
}
const SCROLL_THRESHOLD = 100;

const Navbar: React.FC<NavProps> = ({ links }) => {
    const topRef = useRef(null), backRef = useRef(null);
    const [ scrollPast, setScrollPast ] = useState<boolean | null>(null);
    const { tr, op } = useSpring({
        from: {
            tr: 50,
            op: 0,
        },
        tr: 0,
        op: 1,
    });
    const { top } = useSpring({
        from: {
            top: 45,
        },
        top: scrollPast ? 0 : 45,
        config: config.wobbly,
        ref: topRef,
    });
    const { back } = useSpring({
        from: {
            back: 0,
        },
        back: scrollPast ? .8 : 0,
        ref: backRef,
    });
    useChain(scrollPast ? [topRef, backRef] : [backRef, topRef], [0, 0.3]);
    useEffect(() => {
        if (scrollPast === null) setScrollPast(window.scrollY >= SCROLL_THRESHOLD);
        const onScroll = () => {
            if (!scrollPast && window.scrollY >= SCROLL_THRESHOLD) setScrollPast(true);
            if (scrollPast && window.scrollY < SCROLL_THRESHOLD) setScrollPast(false);
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [scrollPast]);
    const trail = useTrail(links.length, {
        config: config.wobbly,
        from: {
            opacity: 0,
            tr: 25,
        },
        opacity: 1,
        tr: 0,
        delay: 1500,
    })
    return (
        <Nav
            style={{
                opacity: op,
                transform: tr.interpolate(v => `translate3d(0px, ${v}px, 0px)`),
                backgroundColor: back.interpolate(v => `rgba(0,0,0,${v})`),
                top: top.interpolate(v => `${v}vh`),
            }}
        >
            <div className="navLinkContainer">
                {
                    trail.map((props, idx) => (
                        <NavLink style={{
                            opacity: props.opacity,
                            transform: props.tr.interpolate(v => `translate3d(0px, ${v}px, 0px)`),
                        }} to={links[idx].to} text={links[idx].text} key={links[idx].text}  />
                    ))
                }
            </div>
            <style jsx>
                {`
                    .navLinkContainer {
                        display: flex;
                        max-width: 1200px;
                        flex-wrap: wrap;
                        margin: auto;
                        justify-content: space-between;
                        align-items: center;
                        position: relative;
                    }
                `}
            </style>
        </Nav>
    );
}

export default Navbar;