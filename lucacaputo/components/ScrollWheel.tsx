const ScrollWheel: React.FC = () => {
    return (
        <>
            <svg
                viewBox="0 0 200 200"
                x="0px"
                y="0px"
                width="50px"
                height="100px"
                style={{position: "relative"}}
            >
                <rect 
                    x="50" y="0" 
                    fill="transparent" 
                    stroke="#141414" 
                    strokeWidth={6} 
                    width="100" height="200" 
                    rx="50"
                />
                <circle
                    cx="100"
                    cy="50"
                    r="40"
                    fill="#141414"
                />
            </svg>
            <style jsx>{`
                svg {
                    height: 10vh;
                    left: 50%;
                    transform: translateX(-50%);
                    cursor: pointer;
                    z-index: 2;
                }
                circle {
                    animation-name: upDown;
                    animation-duration: 2s;
                    animation-iteration-count: infinite;
                    animation-timing-function: ease;
                    will-change: transform;
                }
                @keyframes upDown {
                    0% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(100px);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
}

export default ScrollWheel;