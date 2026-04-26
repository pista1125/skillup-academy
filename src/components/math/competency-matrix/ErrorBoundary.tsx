import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: any;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  componentDidCatch(error: any, info: any) {
    console.warn('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: 12, background: '#fee2e2', color: '#991b1b',
          border: '1px solid #fecaca', borderRadius: 8, fontSize: 13,
        }}>
          <strong>⚠️ Ez a feladat nem jeleníthető meg</strong>
          <div style={{ marginTop: 4, fontSize: 12, opacity: 0.7 }}>
            {String(this.state.error?.message || this.state.error)}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
