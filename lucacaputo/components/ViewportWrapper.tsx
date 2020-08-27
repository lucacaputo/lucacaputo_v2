import { useRef, useState, useEffect } from "react";
import { isInViewport } from "./Helpers";

interface ViewportWrapperProps {
    render: (ref: React.RefObject<HTMLElement>) => React.ReactNode;
    onEnter: () => void;
    onExit?: () => void;
}

const ViewportWrapper: React.FC<ViewportWrapperProps> = ({ render, onEnter, onExit=() => null, children }) => {
    const [inViewport, setInViewport] = useState(false);
    const ref = useRef<HTMLElement>();
    useEffect(() => {
        const trigger = () => {
            if (isInViewport(ref.current)) {
                if (!inViewport) {
                    setInViewport(true);
                    onEnter();
                }
            } else {
                if (inViewport) {
                    setInViewport(false);
                    onExit();
                } 
            }
        }
        trigger();
        window.addEventListener("scroll", trigger);
        return () => {
            window.removeEventListener("scroll", trigger);
        }
    }, [inViewport]);
    return (
        <>
            { render(ref) }
            { children }
        </>
    );
}

export default ViewportWrapper;