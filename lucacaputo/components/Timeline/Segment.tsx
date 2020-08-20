import { TimeEvent } from "./Timeline";
import Dot from "./Dot";

interface SegmentProps {
    event: TimeEvent;
    height: number;
}

const YEAR_HEIGHT = 200;

const Segment: React.FC<SegmentProps> = ({ event, height }) => {
    return (
        <div className="segment" style={{ height: YEAR_HEIGHT * height }}>
            <Dot event={event} />
        </div>
    );
}

export default Segment;