import { animated } from "react-spring"
import { CSSProperties, forwardRef } from "react";
import styled from "styled-components";

export type Tech = {
    name: string;
    image: string;
}

interface TechProp {
    tech: Tech;
    style: CSSProperties;
}

const Container = styled(animated.div)`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    width: 20%;
    position: relative;
    justify-content: center;
    @media screen and (max-width: 991px) {
        width: 25%;
    }
    @media screen and (max-width: 767px) {
        width: 33.3%;
    }
    @media screen and (max-width: 560px) {
        width: 50%;
    }
    @media screen and (max-width: 400px) {
        width: 100%;
    }
`;

const Technology = forwardRef<HTMLDivElement, TechProp>(({ tech, style }, ref) => {
    return (
        <Container style={style} ref={ref}>
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
                    color: #162447;
                }
            `}</style>
        </Container>
    );
});

export default Technology;