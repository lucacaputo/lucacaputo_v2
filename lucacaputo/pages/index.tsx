import HomeHeader from "../components/HomeHeader";
import CanvasContext from "../contextes/CanvasContext";

const Home = () => {
  return (
    <CanvasContext>
      <div>
          <HomeHeader />
      </div>   
    </CanvasContext> 
  );
}

export default Home;