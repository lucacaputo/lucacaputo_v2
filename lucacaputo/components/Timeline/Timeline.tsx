import { getPercentages } from "./TimelineHelpers";
import Dot from "./Dot";
import LineDrawer from "./LineDrawer";

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
            <LineDrawer />
            {
                events.map((evt, i) => (
                    <Dot 
                        key={`dot-${i}`} 
                        style={{
                            height: `${percentages[i]}%`,
                        }}
                        event={evt}
                        first={i === 0}
                        last={i === events.length-1}
                    />
                ))
            }
        </div>
    )
}

export default Timeline;