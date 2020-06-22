import { animated, useSpring, config } from "react-spring";

const ScrollWheel: React.FC = () => {
    // @ts-ignore
    const { transform } = useSpring({
        from: {
            transform: 0,
        },
        to: async next => {
            while(1) {
                await next({ transform: 100 });
                await next({ transform: 0 });
            }
        },
        config: config.gentle,
    })
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
                <animated.circle
                    cx="100"
                    cy="50"
                    r="40"
                    fill="#141414"
                    style={{
                        transform: transform.interpolate(v => `translateY(${v}px)`)
                    }}
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
            `}</style>
        </>
    );
}

export default ScrollWheel;