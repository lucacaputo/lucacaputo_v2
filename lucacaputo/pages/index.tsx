import HomeHeader from "../components/HomeHeader";
import CanvasContext from "../contextes/CanvasContext";
import ScrollWheel from "../components/ScrollWheel";
import Navbar from "../components/Navbar/Navbar";

const Home = () => {
    return (
        <>
            <Navbar links={[
                { text: "home", to: "#" },
                { text: "about", to: "#" },
                { text: "projects", to: "#" },
                { text: "contacts", to: "#" },
            ]} />
            <CanvasContext>
                <HomeHeader />
                <ScrollWheel />
            </CanvasContext>
            <div style={{height: 1000}}></div>
        </>
    );
}

export default Home;