import Wrapper from "../components/Wrapper";
import "../css/styles.css";
import { AnimatePresence } from "framer-motion";

const App = ({ Component, pageProps, router }) => {
    return (
        <Wrapper>
            <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.route} />
            </AnimatePresence>
        </Wrapper>
    );
}

export default App;