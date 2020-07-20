import HexagonParticle from "./HexagonParticle";
import CircleParticle from "./CircleParticle";
import CubixParticle from "./CubixParticle";
import { useRef, useEffect } from "react";
import { ParticleBluePrint } from "./Particle";

const ParticleCanvas: React.FC = () => {
    const ref = useRef<null | HTMLCanvasElement>(null);
    useEffect(() => {
        const cnv = ref.current;
        const ctx = cnv.getContext("2d");
        cnv.height = cnv.parentElement.clientHeight || cnv.parentElement.offsetHeight;
        cnv.width = cnv.parentElement.clientWidth || cnv.parentElement.offsetWidth;
        const particles: Array<ParticleBluePrint> = [];
        for (let i = 0; i < 102; i++) {
            if (i < 34) {
                particles.push(new HexagonParticle(
                    Math.random() * cnv.width,
                    Math.random() * cnv.height,
                    (Math.random() * 1) - .5,
                    (Math.random() * 1) - .5,
                    10,
                    "#000",
                    Math.PI/3
                ));
            }
            if ( i >= 34 && i < 68) {
                particles.push(new CubixParticle(
                    Math.random() * cnv.width,
                    Math.random() * cnv.height,
                    (Math.random() * 1) - .5,
                    (Math.random() * 1) - .5,
                    10,
                    "#000", 
                ))
            }
            if (i >= 68) {
                particles.push(new CircleParticle(
                    Math.random() * cnv.width,
                    Math.random() * cnv.height,
                    (Math.random() * 1) - .5,
                    (Math.random() * 1) - .5,
                    10,
                    "#000",
                ))
            }
        }
        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, cnv.width, cnv.height);
            particles.forEach(c => {
                c.update(cnv.width, cnv.height, ctx);
            });
        }
        animate();
    }, [ref]);
    return (
        <canvas ref={ref}></canvas>
    );
}

export default ParticleCanvas;