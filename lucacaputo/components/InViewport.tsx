import { useRef, useState, useEffect, CSSProperties } from "react";

type CSSMediaObject = Array<{
    breakpoint: number,
    props: CSSProperties,
}>;

interface InViewportProps {
    onEnter: () => void;
    onExit?: () => void;
    style?: CSSProperties;
    responsive?: CSSMediaObject;
}

const InViewport: React.FC<InViewportProps> = ({
    onEnter,
    onExit,
    style,
    responsive,
    children
}) => {
    const divRef = useRef<null | HTMLDivElement>(null);
    const isInViewport = useRef(false);
    const [media, setMedia] = useState<CSSProperties>({});
    useEffect(() => {
        const div = divRef.current;
        const scrollFunction = () => {
            const { top, bottom } = div.getBoundingClientRect();
            const wh = window.innerHeight || document.documentElement.clientHeight;
            if (top < wh && top > 0 && bottom >= 0) {
                if (!isInViewport.current) {
                    onEnter();
                    isInViewport.current = true;
                }
            } else {
                if (isInViewport.current && onExit) {
                    onExit();
                    isInViewport.current = false;
                }
            }
        }
        const resizeObs = () => {
            let w = window.innerWidth || document.documentElement.clientWidth;
            let sortedMedias = responsive?.sort((f, s) => f.breakpoint > s.breakpoint ? 1 : -1);
            let activeBreakpoint = Math.min.apply(
                null, 
                sortedMedias
                ?.filter(el => el.breakpoint >= w)
                .map(el => el.breakpoint)
            );
            if (activeBreakpoint && Math.abs(activeBreakpoint) !== Infinity) {
                setMedia({...sortedMedias.filter(el => el.breakpoint === activeBreakpoint)[0].props})
            } else {
                setMedia({});
            }
        }
        resizeObs();
        window.addEventListener("scroll", scrollFunction);
        window.addEventListener("load", scrollFunction);
        window.addEventListener("resize", resizeObs);
        return () => {
            window.removeEventListener("load", scrollFunction);
            window.removeEventListener("scroll", scrollFunction);
            window.removeEventListener("resize", resizeObs);
        }
    }, [divRef, isInViewport]);
    return (
        <div ref={divRef} style={{
            ...style,
            ...media,
        }}>
            { children }
        </div>
    );
}

export default InViewport;