import NavLink, { LinkProps } from "./NavLink";
import styled from "styled-components";
import { animated, useSpring, useTrail, useChain, config } from "react-spring";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { HamburgerSpring } from "react-animated-burgers";

const Nav = styled(animated.nav)`
    position: fixed;
    width: 100vw;
    padding: .75rem 1rem;
    left: 0;
    z-index: 10;
    @media (max-width: 767px) {
        display: none;
    }
`;
const MobNav = styled(animated.nav)`
    display: none;
    width: 100vw;
    padding: 1rem 1rem 0 1rem;
    overflow: hidden;
    align-items: flex-end;
    position: fixed;
    top: 0;
    left:0;
    z-index: 10;
    flex-direction: column;
    background-color: #000;
    @media (max-width: 767px) {
        display: flex;
    }
`;
const MobNavBody = styled(animated.div)`
    padding: 1rem 0 0 0;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

interface NavProps {
    links: Array<LinkProps>;
}
const SCROLL_THRESHOLD = 100;

const Navbar: React.FC<NavProps> = ({ links }) => {
    const router = useRouter();
    const { pathname } = router;
    const [isNavActive, setNavActive] = useState(false);
    const topRef = useRef(null), backRef = useRef(null);
    const [ scrollPast, setScrollPast ] = useState<boolean | null>(null);
    const mobSpring = useSpring({
        from: {
            height: 0,
        },
        height: isNavActive ? 232 : 0,
    })
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
    const trail = (mob: boolean) => {
        let confObj: {tr: any, opacity: any, delay: number};
        if (mob) {
            confObj = {
                opacity: isNavActive ? 1 : 0,
                tr: isNavActive ? 0 : 25,
                delay: 0,
            }
        } else {
            confObj = { opacity: 1, tr: 0, delay: pathname === "/" ? 1500 : 0 };
        }
        return useTrail(links.length, {
            config: config.wobbly,
            from: {
                opacity: 0,
                tr: 25,
            },
            ...confObj,
        });
    }
    return (
        <>
            <Nav
                style={{
                    opacity: pathname === "/" ? op : 1,
                    transform: pathname === "/" ? tr.interpolate(v => `translate3d(0px, ${v}px, 0px)`) : "none",
                    backgroundColor: pathname === "/" ? back.interpolate(v => `rgba(0,0,0,${v})`) : "rgba(0,0,0,0.8)",
                    top: pathname === "/" ? top.interpolate(v => `${v}vh`) : 0,
                }}
            >
                <div className="navLinkContainer">
                    {
                        trail(false).map((props, idx) => (
                            <NavLink style={{
                                opacity: props.opacity,
                                transform: props.tr.interpolate(v => `translate3d(0px, ${v}px, 0px)`),
                            }} to={links[idx].to} text={links[idx].text} key={links[idx].text}  />
                        ))
                    }
                </div>
            </Nav>
            <MobNav>
                <HamburgerSpring 
                    color="white" 
                    buttonStyle={{ backgroundColor: "transparent", outline: "none", }} 
                    barColor="#fff"
                    isActive={isNavActive}
                    toggleButton={() => setNavActive(!isNavActive)}
                />
                <MobNavBody style={mobSpring}>
                    {
                        trail(true).map((props, idx) => (
                            <span key={links[idx].text+"_mob"} onClick={() => setNavActive(!isNavActive)}>
                                <NavLink style={{
                                    opacity: props.opacity,
                                    transform: props.tr.interpolate(v => `translate3d(0px, ${v}px, 0px)`),
                                    width: "max-content",
                                    marginBottom: idx === links.length-1 ? 0 : "1rem",
                                }} to={links[idx].to} text={links[idx].text}  />
                            </span>
                        ))
                    }
                </MobNavBody>
            </MobNav>
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
        </>
    );
}

export default Navbar;