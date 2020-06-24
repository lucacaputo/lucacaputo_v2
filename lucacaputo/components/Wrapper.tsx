import Navbar from "../components/Navbar/Navbar";
import Head from "next/head";

const Wrapper: React.FC = ({ children }) => {
    return (
        <div className="AppWrapper">
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet"></link>
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
                <meta name="charset" content="UTF-8" />
                <title>Luca Caputo</title>
            </Head>
            <Navbar links={[
                { text: "home", to: "/" },
                { text: "about", to: "/about" },
                { text: "projects", to: "#" },
                { text: "contacts", to: "#" },
            ]} />
            { children }
            <style jsx>{`
                .AppWrapper {
                    width: 100%;
                    position: relative;
                }
            `}</style>
        </div>
    );
}

export default Wrapper;