import SocialIcon from "./SocialIcon";
import { useTrail } from "react-spring";
import { CSSProperties } from "react";

type SocialObject = {
    link: string;
    style: CSSProperties;
    image: string;
}

interface SocialIconListProps {
    socials: Array<SocialObject>;
}

const SocialIconList: React.FC<SocialIconListProps> = ({ socials }) => {
    const [trail, setTrail] = useTrail(socials.length, () => ({
        transform: 120,
    }));
    return (
        <div>
            {
                
            }
        </div>
    );
}

export default SocialIconList;