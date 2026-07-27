export const aboutPagePreflight = {
  getCSS: () => String.raw`
.fly-about-page { padding-bottom: var(--content-padding-x); }
.fly-about-profile { display: flex; width: min(100%, 700px); align-items: center; gap: 22px; margin: 32px auto 28px; }
.fly-about-profile > img { width: 112px; height: 112px; flex: 0 0 112px; border-radius: 50%; object-fit: cover; }
.fly-about-profile h1 { margin: 0; color: var(--text); font-size: 30px; font-weight: 600; line-height: 1.2; }
.fly-about-profile p { margin: 7px 0 0; color: var(--muted); font-size: 15px; line-height: 22px; }
.fly-about-profile nav { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 15px; }
.fly-about-profile nav a, .fly-about-tech span { border-radius: 999px; background: var(--page-alt); color: var(--text); font-size: 13px; line-height: 20px; }
.fly-about-profile nav a { padding: 5px 10px; }
.fly-about-tech { display: flex; width: min(100%, 700px); flex-wrap: wrap; gap: 8px; margin: 0 auto 48px; }
.fly-about-tech span { padding: 5px 10px; }
.fly-about-content { padding-bottom: 20px; }
.fly-about-credits a { color: var(--text); }
@media (max-width: 539px) { .fly-about-profile { align-items: flex-start; gap: 16px; margin-top: 24px; } .fly-about-profile > img { width: 76px; height: 76px; flex-basis: 76px; } .fly-about-profile h1 { font-size: 25px; } .fly-about-tech { margin-bottom: 40px; } }
`,
};
