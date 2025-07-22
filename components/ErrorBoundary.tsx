import React from 'react';

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export default class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// You can log error info here if needed
		// console.error(error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			return (
				<div style={{ padding: 32, textAlign: 'center' }}>
					<h2>Something went wrong.</h2>
					<pre style={{ color: 'red', margin: '16px 0' }}>
						{this.state.error?.message}
					</pre>
					<button
						onClick={this.handleReset}
						style={{ padding: '8px 16px', fontSize: 16 }}
					>
						Try Again
					</button>
				</div>
			);
		}
		return this.props.children;
	}
}
