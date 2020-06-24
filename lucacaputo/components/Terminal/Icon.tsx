import XSymbol from "./XSymbol";
import UnderscoreSymbol from "./UnderscoreSymbol";

interface IconProps {
    bg: string;
    type: "close" | "minimize" | "maximize";
}

const Icon: React.FC<IconProps> = ({ bg, type }) => {
    const symbol = type === "close"
        ? <XSymbol />
        : type === "minimize"
            ? <UnderscoreSymbol />
            : <span>M</span>;
    return (
        <div>
            { symbol }
            <style jsx>
                {`
                    div {
                        background-color: ${bg};
                        width: 20px;
                        height: 20px;
                        padding: 6px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        border-radius: 50%;
                        margin-right: .5rem;
                    }
                `}
            </style>
        </div>
    )
}

export default Icon;