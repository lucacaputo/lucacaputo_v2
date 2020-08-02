import { useRef, useEffect, useContext } from "react";
import { CanvasContext } from "../contextes/CanvasContext";

interface HomeCanvasProps {
    color: string;
    offset: number;
    z: number;
}

const HomeCanvas: React.FC<HomeCanvasProps> = ({ color, offset, z }) => {
    const { config } = useContext(CanvasContext);
    const ref = useRef<null | HTMLCanvasElement>(null);
    useEffect(() => {
        const cnv = ref.current;
        const ctx = cnv.getContext("2d");
        let increment = config.frequency.getValue();
        const animate = () => {
            requestAnimationFrame(animate);
            cnv.width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
            cnv.height = cnv.parentElement.clientHeight || cnv.parentElement.offsetHeight;
            const [h, w] = [cnv.height, cnv.width];
            ctx.clearRect(0,0,w,h);
            ctx.beginPath();
            ctx.moveTo(0, h-50);
            for (let i = 0; i < w; i++) {
                let p = config.amplitude.interpolate(v => v);
                ctx.lineTo(i, h-150 + Math.sin((i * config.length.getValue()) + increment + offset) * p.getValue());
            }
            ctx.lineTo(w, -(h-50));
            ctx.lineTo(-w, 0);
            ctx.lineTo(0, h-50);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.stroke();
            increment += config.frequency.getValue();
        }
        animate();
        const resize = () => {
            cnv.width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
            cnv.height = cnv.parentElement.clientHeight;
        }
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [ref, config])
    return (
        <>
            <canvas ref={ref}></canvas>
            <style jsx>
                {`
                    canvas {
                        position: absolute;
                        z-index: ${z};
                    }
                `}
            </style>
        </>
    );
}

export default HomeCanvas;