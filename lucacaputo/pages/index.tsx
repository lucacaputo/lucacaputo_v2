import HomeHeader from "../components/HomeHeader";
import CanvasContext from "../contextes/CanvasContext";
import ScrollWheel from "../components/ScrollWheel";

const Home = () => {
    return (
        <CanvasContext>
            <HomeHeader />
            <ScrollWheel />
        </CanvasContext>
    );
}

export default Home;