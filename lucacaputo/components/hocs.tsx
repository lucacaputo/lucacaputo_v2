import React from "react";
import ReactDOM from "react-dom";

export function withViewport<T extends object>(
            Component: React.ComponentType<T>, 
            onEnterViewport: () => void, 
            onExitViewport?: () => void) {
    class InViewport extends React.Component<T> {
        node = null;
        state = {
            isInViewport: false,
        }
        adapt = () => {
            const { isInViewport } = this.state;
            const wh = window.innerHeight || document.documentElement.clientHeight;
            const { top, bottom } = this.node.getBoundingClientRect();
            if (top < wh && top > 0 && bottom >= 0) {
                if (!isInViewport) {
                    onEnterViewport();
                    this.setState({ isInViewport: true });
                }
            } else {
                if (isInViewport && onExitViewport) {
                    onExitViewport();
                    this.setState({ isInViewport: false });
                }
            }
        }
        componentDidMount() {
            this.node = ReactDOM.findDOMNode(this);
            if (!this.node) throw new Error("node undefined!");
            window.addEventListener("load", this.adapt);
            window.addEventListener("scroll", this.adapt);
        }
        componentWillUnmount() {
            window.removeEventListener("load", this.adapt);
            window.removeEventListener("scroll", this.adapt);
        }
        render() {
            return (
                <Component {...this.props} />
            );
        }
    }
    return props => <InViewport {...props} />
}