import { useEffect } from 'react';

/**
 * Mobile Keyboard Adaptive Viewport Hook
 * Satisfies Section 1.5 of the Technical Specification:
 * - Dynamic interactive-widget handling
 * - Auto-scroll on focus preventions
 * - Guard iOS browser auto-zooming
 * - Realtime resizing listener
 */
export function useMobileViewport() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;

    // 1. Zoom prevention on iOS Safari for small text input focuses
    const forceInputTextSize = () => {
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach((input) => {
        const style = window.getComputedStyle(input);
        const fontSize = parseFloat(style.fontSize);
        if (fontSize < 16) {
          (input as HTMLElement).style.fontSize = '16px';
        }
      });
    };

    // 2. Smoothly scroll focused form controls into the visual center
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 150);
      }
    };

    // 3. Realtime resizing adapter for floating keyboard height adjustments
    const handleViewportResize = () => {
      const heightDiff = window.innerHeight - (window.visualViewport?.height || window.innerHeight);
      if (heightDiff > 100) {
        document.documentElement.style.setProperty('--keyboard-height', `${heightDiff}px`);
        document.documentElement.classList.add('keyboard-open');
      } else {
        document.documentElement.style.setProperty('--keyboard-height', '0px');
        document.documentElement.classList.remove('keyboard-open');
      }
    };

    // Initial pass and event listeners
    forceInputTextSize();
    window.addEventListener('focusin', handleFocusIn);
    window.visualViewport.addEventListener('resize', handleViewportResize);

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.visualViewport?.removeEventListener('resize', handleViewportResize);
    };
  }, []);
}
export default useMobileViewport;
