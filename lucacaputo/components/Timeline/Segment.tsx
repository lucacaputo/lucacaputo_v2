import { TimeEvent } from "./Timeline";
import Dot from "./Dot";

interface SegmentProps {
    event: TimeEvent;
    height: number;
    last: boolean;
}

const YEAR_HEIGHT = 200;

const Segment: React.FC<SegmentProps> = ({ event, height, last }) => {
    return (
        <div className="segment" style={{ height: YEAR_HEIGHT * height }}>
            <Dot event={event} last={last} />
            <style jsx>{`
                .segment {
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
        </div>
    );
}

export default Segment;