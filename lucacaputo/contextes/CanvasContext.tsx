import { createContext } from "react";
import { OpaqueInterpolation, useSpring } from "react-spring";

export type WaveConfig = {
    length: OpaqueInterpolation<number>,
    amplitude: OpaqueInterpolation<number>,
    frequency: OpaqueInterpolation<number>,
}
export type UpdateObject = {
    length: number,
    frequency: number,
    amplitude: number,
}
export interface CanvasContextType {
    config: WaveConfig,
    update: (config: UpdateObject) => void,
}
export const CanvasContext = createContext<null | CanvasContextType>(null);

const Provider: React.FC = ({ children }) => {
    const [initialConfig, set] = useSpring(() => ({
        length: 0.005,
        frequency: 0.002,
        amplitude: 50,
        config: {
            tension: 180,
            friction: 2,
            mass: 1,
        },
    }));
    return (
        <CanvasContext.Provider value={{config: initialConfig, update: set}}>
            { children }
        </CanvasContext.Provider>
    );
}

export default Provider;