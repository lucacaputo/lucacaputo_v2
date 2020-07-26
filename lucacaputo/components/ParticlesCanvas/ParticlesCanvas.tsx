import HexagonParticle from "./HexagonParticle";
import CircleParticle from "./CircleParticle";
import CubixParticle from "./CubixParticle";
import { useRef, useEffect } from "react";
import { ParticleBluePrint } from "./Particle";

interface ParticleCanvasProps {
    proximity_threshold: number;
    partNum: number;
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ proximity_threshold, partNum }) => {
    const ref = useRef<null | HTMLCanvasElement>(null);
    useEffect(() => {
        const cnv = ref.current;
        const ctx = cnv.getContext("2d");
        cnv.height = cnv.parentElement.clientHeight || cnv.parentElement.offsetHeight;
        cnv.width = cnv.parentElement.clientWidth || cnv.parentElement.offsetWidth;
        const particles: Array<ParticleBluePrint> = [];
        for (let i = 0; i < partNum; i++) {
            if (i < Math.floor(partNum/3)) {
                particles.push(new HexagonParticle(
                    Math.random() * cnv.width,
                    Math.random() * cnv.height,
                    (Math.random() * 1) - .5,
                    (Math.random() * 1) - .5,
                    5,
                    "#000",
                    Math.PI/3,
                    i
                ));
            }
            if ( i >= Math.floor(partNum/3) && i < Math.floor(partNum/3)*2) {
                particles.push(new CubixParticle(
                    Math.random() * cnv.width,
                    Math.random() * cnv.height,
                    (Math.random() * 1) - .5,
                    (Math.random() * 1) - .5,
                    5,
                    "#000",
                    i
                ))
            }
            if (i >= Math.floor(partNum/3)*2) {
                particles.push(new CircleParticle(
                    Math.random() * cnv.width,
                    Math.random() * cnv.height,
                    (Math.random() * 1) - .5,
                    (Math.random() * 1) - .5,
                    5,
                    "#000",
                    i
                ))
            }
        }
        const animate = () => {
            ctx.clearRect(0, 0, cnv.width, cnv.height);
            let proximity: Array<Array<ParticleBluePrint>> = [];
            particles.forEach((c: ParticleBluePrint, i: number) => {
                proximity[i] = particles.filter(el => Math.abs(Math.hypot(el.x - c.x, el.y - c.y)) <= proximity_threshold);
                c.update(cnv.width, cnv.height, ctx);
            });
            proximity.forEach(el => {
                if (el.length >= 2) {
                    ctx.beginPath();
                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = .1;
                    el.forEach((part, partIdx) => {
                        ctx.moveTo(part.x + part.size/2, part.y + part.size/2);
                        for (let p = partIdx + 1; p < el.length; p++) {
                            ctx.lineTo(el[p].x + el[p].size/2, el[p].y + el[p].size/2);
                            ctx.closePath();
                            ctx.stroke();
                        }
                    });
                }
            });
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }, [ref]);
    return (
        <canvas ref={ref}></canvas>
    );
}

export default ParticleCanvas;