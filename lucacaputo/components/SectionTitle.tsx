import { CSSProperties } from "react";

interface TitleProps {
    style?: CSSProperties;
}

const Title: React.FC<TitleProps> = ({ children, style }) => {
    return (
        <h1 style={style}>
            { children }
            <style jsx>{`
                font-size: 50px;
                font-weight: 700;
                text-align: center;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: #162447;
                background-color: #e43f5a;
                margin-bottom: 25px;
                display: inline-block;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                padding: 0 10px;
            `}</style>
        </h1>
    );
}

export default Title;