import { animated } from "react-spring"
import { CSSProperties } from "react";

export type Tech = {
    name: string;
    image: string;
}

interface TechProp {
    tech: Tech;
    style: CSSProperties;
}

const Technology: React.FC<TechProp> = ({ tech, style }) => {
    return (
        <animated.div style={{...style, marginBottom: 15, flex: 1, display: "flex", flexDirection: "column"}}>
            <img src={tech.image} alt={`${tech.name} logo image`}/>
            <i> {tech.name} </i>
            <style jsx>{`
                img {
                    max-width: 100%;
                    position: relative;
                    display: block;
                    height: auto;
                    margin: auto;
                    max-height: 128px;
                }
                i {
                    font-size: 14px;
                    font-weight: 400;
                    display: block;
                    width: 100%;
                    text-align: center;
                    margin-top: 15px;
                }
            `}</style>
        </animated.div>
    );
}

export default Technology;