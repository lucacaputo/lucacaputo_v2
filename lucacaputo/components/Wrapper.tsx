import Link from "next/link";
import Head from "next/head";

const Wrapper: React.FC = ({ children }) => {
    return (
        <div className="AppWrapper">
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
            </Head>
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