import React, { Component } from "react";
import {
	ErrorImageContainer,
	ErrorImageOverlay,
	ErrorImageText,
} from "./error-boundary.styles";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<ErrorImageOverlay>
					<ErrorImageContainer imageUrl="https://i.imgur.com/g3hgqe8.png" />
					<ErrorImageText>Sorry this page is broken</ErrorImageText>
				</ErrorImageOverlay>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
