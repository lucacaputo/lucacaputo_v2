import Technology, { Tech } from "./Technology";
import { useTrail, OpaqueInterpolation } from "react-spring";
import InViewport from "../InViewport";

interface TechSectionProps {
    title: string;
    techs: Array<Tech>;
}

const TechSection: React.FC<TechSectionProps> = ({ title, techs }) => {
    const [trail, setTrail] = useTrail(techs.length, () => ({
        trans: 120,
        opacity: 0,
    }));
    return (
        <div className="techSection">
            <h2> {title} </h2>
            <div className="techWrapper">
                {
                    trail.map(({trans, opacity}, i) => (
                        <InViewport
                            key={`tech-${i}`}
                            onEnter={() => setTrail({ trans: 0, opacity: 1 as 0 })}
                            style={{
                                width: "20%",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                            responsive={[
                                {
                                    breakpoint: 767,
                                    props: {
                                        width: "33.3%",
                                    }
                                },
                                {
                                    breakpoint: 991,
                                    props: {
                                        width: "25%",
                                    }
                                },
                                {
                                    breakpoint: 560,
                                    props: {
                                        width: "50%",
                                    }
                                },
                                {
                                    breakpoint: 400,
                                    props: {
                                        width: "100%",
                                    }
                                },
                            ]}
                        >
                            <Technology 
                                tech={techs[i]} 
                                style={{
                                    transform: (trans as OpaqueInterpolation<number>).interpolate(v => `translateY(${v}%)`),
                                    opacity
                                }} 
                            />
                        </InViewport>
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