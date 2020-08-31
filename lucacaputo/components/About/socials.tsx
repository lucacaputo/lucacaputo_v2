import { SocialObject } from "./SocialIconList";
import Insta from "../../svgs/InstaWhite";
import Github from "../../svgs/GithubLogo";
import Facebook from "../../svgs/Facebook";
import Linkedin from "../../svgs/Linkedin";

const t: Array<SocialObject> = [
    {
        image: props => (<Insta {...props} />),
        link: "#",
    },
    {
        image: props => (<Github {...props} />),
        link: "#",
    },
    {
        image: props => (<Facebook {...props} />),
        link: "#",
    },
    {
        image: props => (<Linkedin {...props} />),
        link: "#",
    },
];

export default t;