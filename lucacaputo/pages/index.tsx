import HomeHeader from "../components/HomeHeader";
import CanvasContext from "../contextes/CanvasContext";
import ScrollWheel from "../components/ScrollWheel";
import Terminal from "../components/Terminal/Terminal";

const Home = () => {
    return (
        <>
            <CanvasContext>
                <HomeHeader />
                <ScrollWheel />
            </CanvasContext>
            <div style={{height: 1000}}>
                <Terminal />
            </div>
        </>
    );
}

export default Home;