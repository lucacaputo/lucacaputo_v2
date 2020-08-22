import { techs } from "./techs";
import TechSection from "./TechSection";

const Technologies: React.FC = () => {
    return (
        <div className="technologiesOuter">
            <div className="mainContainer">
                <TechSection title="Front End" techs={techs.frontend} />
                <TechSection title="Back End" techs={techs.backend} />
                <TechSection title="Mobile Apps" techs={techs.mobile} />
                <TechSection title="Tools" techs={techs.tools} />
            </div>
            <style jsx>{`
                .technologiesOuter {
                    width: 100%;
                    position: relative;
                    background-color: #fff;
                    padding: 2rem 0;
                    box-shadow: 0 0 7px #141414;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}

export default Technologies;