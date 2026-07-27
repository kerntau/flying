export const searchWidgetPreflight = {
  getCSS: () => String.raw`
.fly-search-dialog { width: min(680px, calc(100vw - 32px)); max-height: min(720px, calc(100vh - 32px)); border: 1px solid var(--line); border-radius: 8px; background: var(--page); color: var(--text); padding: 0; box-shadow: 0 20px 56px rgba(0, 0, 0, 0.26); }
.fly-search-dialog::backdrop { background: rgba(17, 19, 23, 0.58); }
.fly-search-dialog-panel { display: grid; gap: 14px; padding: 20px; }
.fly-search-dialog-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.fly-search-dialog-header h2 { margin: 0; font-size: 18px; line-height: 1.3; }
.fly-search-input { width: 100%; border: 1px solid var(--line); border-radius: 6px; background: var(--page-alt); color: var(--text); padding: 11px 12px; font: inherit; }
.fly-search-input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.fly-search-status { min-height: 20px; margin: -4px 0 0; color: var(--muted); font-size: 13px; }
.fly-search-results { display: grid; max-height: 440px; margin: 0; padding: 0; overflow: auto; list-style: none; }
.fly-search-results li { border-top: 1px solid var(--line); }
.fly-search-results a { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; color: var(--text); padding: 12px 0; text-decoration: none; }
.fly-search-results a:hover, .fly-search-results a:focus-visible { color: var(--accent-strong); }
.fly-search-results small { color: var(--faint); white-space: nowrap; }
`,
};
