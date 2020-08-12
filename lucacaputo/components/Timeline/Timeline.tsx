import { getPercentages } from "./TimelineHelpers";
import Dot from "./Dot";

export type TimeEvent = {
    description: string,
    from: Date,
    to: Date,
}
interface TimelineProps {
    events: Array<TimeEvent>;
    height?: number | string;
}

const Timeline: React.FC<TimelineProps> = ({
    events,
    height="100vh",
}) => {
    if (typeof height === "number") height = `${height}px`;
    const percentages = getPercentages(events);
    return (
        <div style={{ height }}>
            {
                events.map((evt, i) => (
                    <Dot 
                        key={`dot-${i}`} 
                        style={{
                            height: `${percentages[i]}%`,
                        }}
                        event={evt}
                    />
                ))
            }
        </div>
    )
}

export default Timeline;