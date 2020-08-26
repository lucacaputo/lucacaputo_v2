import React from "react";
import ReactDOM from "react-dom";

interface WithVpProps {
    onEnter: () => void;
    onExit?: () => void;
}

export function withViewport<T extends object>(
            Component: React.ComponentType<T>, 
            onEnterViewport: () => void, 
            onExitViewport?: () => void) {
    class InViewport extends React.Component<T & WithVpProps> {
        node = null;
        state = {
            isInViewport: false,
        }
        adapt = () => {
            const { isInViewport } = this.state;
            const { onEnter, onExit } = this.props;
            const wh = window.innerHeight || document.documentElement.clientHeight;
            const { top, bottom } = this.node.getBoundingClientRect();
            if (top < wh && top > 0 && bottom >= 0) {
                if (!isInViewport) {
                    this.setState({ isInViewport: true }, onEnter);
                }
            } else {
                if (isInViewport) {
                    this.setState({ isInViewport: false }, onExit);
                }
            }
        }
        componentDidMount() {
            this.node = ReactDOM.findDOMNode(this);
            if (!this.node) throw new Error("node undefined!");
            this.adapt();
            window.addEventListener("scroll", this.adapt);
        }
        componentWillUnmount() {
            window.removeEventListener("scroll", this.adapt);
        }
        render() {
            return (
                <Component {...this.props} />
            );
        }
    }
    return (props: T) => <InViewport onEnter={onEnterViewport} onExit={onExitViewport} {...props} />
}