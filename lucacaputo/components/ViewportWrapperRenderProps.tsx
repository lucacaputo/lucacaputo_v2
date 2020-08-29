import { useRef, useEffect, useState } from "react";
import { isInViewport } from "./Helpers";

interface WrapperProps {
    children: (ref: React.RefObject<any>) => React.ReactNode;
    onEnterViewport: () => void;
    once?: boolean;
    onExitViewport?: () => void;
}

const ViewportWrapper: React.FC<WrapperProps> = ({
    onEnterViewport,
    onExitViewport = () => null,
    once = false,
    children,
}) => {
    const ref = useRef<HTMLElement>();
    const [inViewport, setInViewport] = useState(false);
    const [enterCount, setCount] = useState(0);
    useEffect(() => {
        const trigger = () => {
            if (isInViewport(ref.current)) {
                if (!inViewport) {
                    setInViewport(true);
                    setCount(c => c + 1);
                    if ((once && enterCount <= 1) || !once) onEnterViewport();
                }
            } else {
                if (inViewport) {
                    setInViewport(false);
                    if ((once && enterCount <= 1) || !once) onExitViewport();
                }
            }
        }
        trigger();
        window.addEventListener("scroll", trigger);
        return () => {
            window.removeEventListener("scroll", trigger);
        }
    }, [inViewport, ref]);
    return (
        <>
            { children(ref) }
        </>
    );
}

export default ViewportWrapper;