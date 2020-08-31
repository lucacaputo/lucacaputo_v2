import SocialIcon from "./SocialIcon";
import { useTrail } from "react-spring";
import { CSSProperties } from "react";
import Viewport from "../ViewportWrapperRenderProps";

export type SocialObject = {
    link: string;
    image: (props: object) => React.ReactNode;
}

interface SocialIconListProps {
    socials: Array<SocialObject>;
}

const SocialIconList: React.FC<SocialIconListProps> = ({ socials }) => {
    const [trail, setTrail] = useTrail(socials.length, () => ({
        transform: 120,
        opacity: 0,
    }));
    return (
        <Viewport
            onEnterViewport={() => setTrail({ transform: 0, opacity: 1 as 0 })}
            once
        >
            {
                ref => (
                    <div 
                        ref={ref as React.RefObject<HTMLDivElement>}
                    >
                        {
                            trail.map(({ transform, opacity }, i) => <SocialIcon 
                                link={socials[i].link} 
                                image={socials[i].image}
                                style={{
                                    transform: transform.interpolate(t => `translateY(${t}%)`),
                                    opacity,
                                }}
                                key={`social-icon-${i}`}
                            />)
                        }
                        <style jsx>{`
                            div {
                                display: flex;
                                width: 100%;
                                position: relative;
                                align-items: center;
                                justify-content: space-between;
                            }
                        `}</style>
                    </div>
                )
            }
        </Viewport>
    );
}

export default SocialIconList;