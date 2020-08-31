import List from "./SocialIconList";
import socials from "./socials";

const About: React.FC = () => {
    return (
        <div className="aboutContainer">
            <h1>About Me</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Quisque id sagittis nibh, vitae hendrerit risus. Quisque 
                sit amet ligula laoreet, rutrum nulla ut, porta odio. 
                Vestibulum eleifend id enim ut dapibus. Nunc in placerat enim. 
                Curabitur sed lacinia neque. Curabitur mollis ipsum eros, 
                sed congue nisi luctus et. Curabitur lobortis lectus enim, 
                sed ultrices diam aliquam ornare. Aliquam erat volutpat. 
                Praesent porttitor nunc id elit volutpat bibendum. Donec 
                lorem metus, faucibus ac ligula at, auctor bibendum sapien. 
                Phasellus eu urna gravida, volutpat mi sed, suscipit elit. 
                Phasellus posuere felis vel mi pulvinar, ac placerat eros 
                fermentum. Donec rhoncus neque eu mauris molestie, quis 
                vehicula orci vulputate.
            </p>
            <div className="socialLinks">
                <List socials={socials} />
            </div>
            <style jsx>{`
                .aboutContainer {
                    position: relative;
                    width: 100%;
                    padding: 1rem 0;
                }
                h1 {
                    font-size: 50px;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 25px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #e43f5a;
                }
                p {
                    font-size: 18px;
                    font-weight: 400;
                    text-align: left;
                    color: #fff;
                }
                .socialLinks {
                    margin-top: 60px;
                    width: 50%;
                    margin: auto;
                    position: relative;
                }
            `}</style>
        </div>
    );
}

export default About;