import Wrapper from "../components/Wrapper";
import "../css/styles.css";

const App = ({ Component, pageProps, router }) => {
    return (
        <Wrapper>
            <Component {...pageProps} key={router.route} />
        </Wrapper>
    );
}

export default App;