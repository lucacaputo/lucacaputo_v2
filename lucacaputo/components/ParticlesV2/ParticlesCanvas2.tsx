import { useRef, useEffect } from "react";
import Particle from "./Particle2";

const ParticlesCanvas2: React.FC = () => {
    const ref = useRef<null | HTMLCanvasElement>(null);
    useEffect(() => {
        const cnv = ref.current;
        const ctx = cnv.getContext("2d");
        cnv.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        cnv.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const onResize = () => {
            cnv.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            cnv.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        }
        const particles: Array<Particle> = [];
        for(let i = 0; i < 50; i++) {
            particles.push(
                new Particle(
                    Math.random() * cnv.width,
                    Math.random() * cnv.height,
                    Math.random() - .5,
                    Math.random() - .5,
                    Math.floor(Math.random() * 9) + 6,
                    "#000"
                )
            )
        }
        // particles.forEach(el => el.draw(ctx));
        window.addEventListener("resize", onResize);
        return () => {
            document.removeEventListener("resize", onResize);
        }
    }, [ref])
    return (
        <canvas ref={ref} />
    );
}

export default ParticlesCanvas2;