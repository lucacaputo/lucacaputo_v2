import { useRef, useEffect, useState, useContext } from "react";
import { CanvasContext } from "../contextes/CanvasContext";

interface HomeCanvasProps {
    color: string;
}

const HomeCanvas: React.FC<HomeCanvasProps> = ({ color }) => {
    const context = useContext(CanvasContext);
    const { config } = context;
    const ref = useRef<null | HTMLCanvasElement>(null);
    useEffect(() => {
        const cnv = ref.current;
        const ctx = cnv.getContext("2d");
        cnv.width = window.innerWidth;
        cnv.height = cnv.parentElement.clientHeight || cnv.parentElement.offsetHeight;
        const [h, w] = [cnv.height, cnv.width];
        let increment = config.frequency.getValue();
        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0,0,w,h);
            ctx.beginPath();
            ctx.moveTo(0, h-50);
            for (let i = 0; i < w; i++) {
                let p = config.amplitude.interpolate(v => v);
                ctx.lineTo(i, h-150 + Math.sin((i * config.length.getValue()) + increment) * p.getValue());
                ctx.lineTo(i, -(h-150));
            }
            ctx.strokeStyle = color;
            ctx.stroke();
            increment += config.frequency.getValue();
        }
        animate();
    }, [ref, config])
    return (
        <>
            <canvas ref={ref}></canvas>
            <style jsx>
                {`
                    canvas {
                        position: absolute;
                        z-index: -1;
                    }
                `}
            </style>
        </>
    );
}

export default HomeCanvas;