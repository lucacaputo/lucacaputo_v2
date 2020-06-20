import Wrapper from "../components/Wrapper";
import "../css/styles.css";

const App = ({ Component, pageProps }) => {
    return (
        <Wrapper>
            <Component {...pageProps} />
        </Wrapper>
    );
}

export default App;