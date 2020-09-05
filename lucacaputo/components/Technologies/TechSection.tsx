import Technology, { Tech } from "./Technology";
import { useTrail, OpaqueInterpolation } from "react-spring";
import { useRef, useEffect } from "react";
import { isInViewport } from "../Helpers";
import Title from "../SectionTitle";

interface TechSectionProps {
    title: string;
    techs: Array<Tech>;
}

const TechSection: React.FC<TechSectionProps> = ({ title, techs }) => {
    const [trail, setTrail] = useTrail(techs.length, () => ({
        trans: 120,
        opacity: 0,
    }));
    const ref = useRef<HTMLDivElement>();
    useEffect(() => {
        const trigger = () => isInViewport(ref.current) ? setTrail({ trans: 0, opacity: 1 as 0 }) : null;
        trigger();
        window.addEventListener("scroll", trigger);
        return () => {
            window.removeEventListener("scroll", trigger);
        }
    }, []);
    return (
        <div className="techSection">
            <Title style={{
                left: "auto",
                transform: "none",
                margin: "40px 0",
            }}> {title} </Title>
            <div className="techWrapper">
                {
                    trail.map(({trans, opacity}, i) => (
                        <Technology 
                            tech={techs[i]} 
                            style={{
                                transform: (trans as OpaqueInterpolation<number>).interpolate(v => `translateY(${v}%)`),
                                opacity
                            }}
                            key={`tech-${i}`}
                            ref={ref}
                        />
                    ))
                }
            </div>
            <style jsx>{`
                .techSection {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                h2 {
                    font-size: 40px;
                    letter-spacing: 1.5px;
                    font-weight: 300;
                    color: #1b1b2f;
                }
                .techWrapper {
                    display: flex;
                    width: 100%;
                    flex-wrap: wrap;
                }
            `}</style>
        </div>
    );
}

export default TechSection;