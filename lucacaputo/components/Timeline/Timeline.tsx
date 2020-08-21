import Segment from "./Segment";

export type TimeEvent = {
    from: Date,
    to?: Date,
    description: string,
    notes?: string,
}

interface TimelineProps {
    events: Array<TimeEvent>;
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
    return (
        <div className="timelineOuterWrapper">
            {
                events.map((evt, i) => (
                    <Segment 
                        key={`segment-${i}`} 
                        height={2} 
                        event={evt} 
                        last={i === events.length-1} 
                    />
                ))
            }
            <style jsx>{`
                .timelineOuterWrapper {
                    position: relative;
                }
            `}</style>
        </div>
    );
}

export default Timeline;