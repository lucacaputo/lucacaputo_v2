import { useRef, useEffect } from "react";

const LineDrawer: React.FC = () => {
    const cnvRef = useRef<null | HTMLCanvasElement>(null);
    useEffect(() => {
        const cnv = cnvRef.current;
        const ctx = cnv.getContext("2d");
        const resize = () => {
            cnv.width = cnv.parentElement.clientWidth;
            cnv.height = cnv.parentElement.clientHeight;
        }
        resize();
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [cnvRef])
    return (
        <div className="lineDrawer">
            <style jsx>{`
                .lineDrawer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    overflow: hidden;
                }
                canvas {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
            `}</style>
            <canvas ref={cnvRef} />
        </div>
    );
}

export default LineDrawer;