import HexagonParticle from "./HexagonParticle";
import CircleParticle from "./CircleParticle";
import CubixParticle from "./CubixParticle";
import { useRef, useEffect } from "react";
import { ParticleBluePrint } from "./Particle";
import { Tuple } from "react-use-gesture/dist/types";
import { isMobile } from "react-device-detect"

interface ParticleCanvasProps {
    proximity_threshold: number;
    partNum: number;
    mouseArea?: number;
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ proximity_threshold, partNum, mouseArea=240 }) => {
    const ref = useRef<null | HTMLCanvasElement>(null);
    const mouseCoordinates = useRef({
        x: 0,
        y: 0,
        hovering: false,
    });
    const onMouseMove = (evt: React.MouseEvent) => {
        if (!isMobile) {
            const { top } = ref.current.getBoundingClientRect();
            const y = evt.clientY - top;
            const x = evt.clientX;
            mouseCoordinates.current = {
                hovering: true,
                x,
                y,
            }
        }
    }
    const onMouseOut = (evt: React.MouseEvent) => {
        if (!isMobile) {
            mouseCoordinates.current = {
                ...mouseCoordinates.current,
                hovering: false,
            }
        }
    }
    useEffect(() => {
        const cnv = ref.current;
        const ctx = cnv.getContext("2d");
        const onResize = () => {
            cnv.height = cnv.parentElement.clientHeight || cnv.parentElement.offsetHeight;
            cnv.width = cnv.parentElement.clientWidth || cnv.parentElement.offsetWidth;
        }
        onResize();
        window.addEventListener("resize", onResize);
        const particles: Array<ParticleBluePrint> = [];
        for (let i = 0; i < partNum; i++) {
            if (i < Math.floor(partNum/3)) {
                particles.push(new HexagonParticle(
                    Math.random() * cnv.width,
                    Math.random() * cnv.height,
                    (Math.random() * 1) - .5,
                    (Math.random() * 1) - .5,
                    3,
                    "#162447",
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
                    3,
                    "#162447",
                    i
                ))
            }
            if (i >= Math.floor(partNum/3)*2) {
                particles.push(new CircleParticle(
                    Math.random() * cnv.width,
                    Math.random() * cnv.height,
                    (Math.random() * 1) - .5,
                    (Math.random() * 1) - .5,
                    3,
                    "#162447",
                    i
                ))
            }
        }
        const isInArea = (x: number, y: number, coordinates: { x: number, y: number }, area: number): boolean => {
            if (x >= coordinates.x - area/2 && x <= coordinates.x + area/2 && y >= coordinates.y - area/2 && y <= coordinates.y + area/2) {
                return true;
            }
            return false;
        } 
        const animate = () => {
            let proximity: Array<Array<ParticleBluePrint>> = [];
            let mouseProximity: Array<ParticleBluePrint> = [];
            if (mouseCoordinates.current.hovering) {
                mouseProximity = particles.filter(el => isInArea(el.x, el.y, mouseCoordinates.current, mouseArea));
            }
            ctx.clearRect(0, 0, cnv.width, cnv.height);
            particles.forEach((c: ParticleBluePrint, i: number) => {
                proximity[i] = particles.filter(el => Math.hypot(el.x - c.x, el.y - c.y) <= proximity_threshold);
                c.update(cnv.width, cnv.height, ctx);
            });
            proximity.forEach(el => {
                if (el.length >= 2) {
                    ctx.beginPath();
                    ctx.strokeStyle = "#162447";
                    ctx.lineWidth = .3;
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
            if (mouseCoordinates.current.hovering) {
                ctx.beginPath();
                ctx.strokeStyle = "#e43f5a";
                ctx.lineWidth = .5;
                let connections: Array<Tuple<number>> = [];
                mouseProximity.forEach(el => {
                    ctx.moveTo(el.x + el.size/2, el.y + el.size/2);
                    mouseProximity.forEach(el2 => {
                        if (el.id !== el2.id && !connections.find(conn => conn.includes(el.id) && conn.includes(el2.id))) {
                            // ctx.lineTo(el2.x + el2.size/2, el2.y + el2.size/2); //uncomment this line to increase particle connection area instead of mouse connection
                            ctx.lineTo(mouseCoordinates.current.x, mouseCoordinates.current.y); // comment this line to remove mouse connection
                            ctx.closePath();
                            ctx.stroke();
                            connections.push([el.id, el2.id]);
                        }
                    })
                });
            }
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, [ref, mouseCoordinates]);
    return (
        <canvas 
            ref={ref} 
            onMouseMove={onMouseMove} 
            onMouseOut={onMouseOut} 
        />
    );
}

export default ParticleCanvas;