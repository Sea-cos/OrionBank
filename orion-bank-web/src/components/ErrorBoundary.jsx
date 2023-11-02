import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = { hasError: false };
    
    componentDidCatch(error, errorInfo) {
      console.error(error, errorInfo);
      this.setState({ hasError: true });
    }

    render() {
        return (
            <div>
                <p> 404 </p>
                Algo deu errado.
            </div>
        );
    }
}

export default ErrorBoundary;
