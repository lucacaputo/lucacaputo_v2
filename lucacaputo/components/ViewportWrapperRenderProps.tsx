import { useRef, useEffect, useState } from "react";
import { isInViewport } from "./Helpers";

interface WrapperProps {
    children: (ref: React.RefObject<any>) => React.ReactNode;
    onEnterViewport: () => void;
    onExitViewport?: () => void;
}

const ViewportWrapper: React.FC<WrapperProps> = ({
    onEnterViewport,
    onExitViewport = () => null,
    children,
}) => {
    const ref = useRef<HTMLElement>();
    const [inViewport, setInViewport] = useState(false);
    useEffect(() => {
        const trigger = () => {
            if (isInViewport(ref.current)) {
                if (!inViewport) {
                    setInViewport(true);
                    onEnterViewport();
                }
            } else {
                if (inViewport) {
                    setInViewport(false);
                    onExitViewport();
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