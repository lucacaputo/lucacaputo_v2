import { motion } from "framer-motion";

const About = () => {
    return (
        <motion.div
            exit={{opacity: 0}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
        >
            About
        </motion.div>
    );
}

export default About;