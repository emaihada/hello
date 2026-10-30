import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

declare global {
  interface Window {
    __ONGEUL_BOOTED__?: boolean;
    __ONGEUL_ROOT_MOUNTED__?: boolean;
  }
}

if (typeof window !== 'undefined') {
  window.__ONGEUL_BOOTED__ = true;
}

class RootErrorBoundary extends React.Component<
  {children: React.ReactNode},
  {hasError: boolean; retried: boolean}
> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = {hasError: false, retried: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: unknown) {
    console.error('Root render error:', error);
    if (!this.state.retried && typeof window !== 'undefined') {
      try {
        const raw = window.localStorage?.getItem('ongeul_crossword_save_v5');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') {
            parsed.activePuzzle = null;
            window.localStorage?.setItem(
              'ongeul_crossword_save_v5',
              JSON.stringify(parsed)
            );
          }
        }
      } catch {
        try {
          window.localStorage?.removeItem('ongeul_crossword_save_v5');
        } catch {
          // Ignore storage errors
        }
      }
      this.setState({hasError: false, retried: true});
    }
  }

  render() {
    if (this.state.hasError) {
      return <App />;
    }
    return this.props.children;
  }
}

function mountApplication() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.__ONGEUL_ROOT_MOUNTED__) return;

  let rootEl = document.getElementById('root');
  if (!rootEl) {
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', mountApplication, {once: true});
      return;
    }
    if (document.body) {
      rootEl = document.createElement('div');
      rootEl.id = 'root';
      document.body.appendChild(rootEl);
    } else {
      return;
    }
  }

  window.__ONGEUL_ROOT_MOUNTED__ = true;
  createRoot(rootEl).render(
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  );
}

mountApplication();

