import { useRef, useState, useEffect } from "react";

interface InViewportProps {
    onEnter: () => void;
    onExit?: () => void;
}

const InViewport: React.FC<InViewportProps> = ({
    onEnter,
    onExit,
    children
}) => {
    const divRef = useRef<null | HTMLDivElement>(null);
    const [isInViewport, setInViewport] = useState(false);
    useEffect(() => {
        const div = divRef.current;
        const scrollFunction = () => {
            const { top, bottom } = div.getBoundingClientRect();
            const wh = window.innerHeight || document.documentElement.clientHeight;
            if (top < wh && top > 0 && bottom >= 0) {
                if (!isInViewport) onEnter();
                setInViewport(true);
            } else {
                if (isInViewport && onExit) onExit();
                setInViewport(false);
            }
        }
        window.addEventListener("scroll", scrollFunction);
        window.addEventListener("load", scrollFunction);
        return () => {
            window.removeEventListener("load", scrollFunction);
            window.removeEventListener("scroll", scrollFunction);
        }
    }, [isInViewport, divRef]);
    return (
        <div ref={divRef}>
            { children }
        </div>
    );
}

export default InViewport;