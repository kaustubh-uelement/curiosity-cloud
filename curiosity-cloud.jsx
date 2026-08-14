import React, { useState, useEffect, useRef, useCallback } from "react";

/* =====================================================================
   Curiosity Cloud — single-file React site.
   Same theme as the static build: white + blue, framed layout, hairline
   rules with + markers, mono utility labels, dithered-terrain canvas.
   Hash routed: #/, #/platform, #/platform/<slug>, #/solutions, #/company,
   #/blog, #/blog/<slug>, #/docs, #/contact
   ===================================================================== */

const CSS = `@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
/* Curiosity — shared stylesheet
   Type: Inter Tight (display) · Inter (body) · JetBrains Mono (utility)
   ------------------------------------------------------------------ */

:root{
  --ink:#0C0D0F;
  --ink-soft:#5B616B;
  --ink-mute:#868C96;
  --blue:#2C55DE;
  --blue-deep:#1B39B4;
  --blue-soft:#7C9BF3;
  --blue-pale:#9BB4F7;
  --navy:#0D1A45;
  --line:#E3E5EA;
  --line-soft:#EDEEF2;
  --frame:1392px;
  --pad:40px;
}

*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{
  margin:0;
  font-family:"Inter","Helvetica Neue",Arial,sans-serif;
  color:var(--ink);
  background-color:#fff;
  background-image:repeating-linear-gradient(135deg,#fff 0 6px,#F0F1F4 6px 7px);
  -webkit-font-smoothing:antialiased;
}
a{color:inherit;text-decoration:none}
:focus-visible{outline:2px solid var(--blue);outline-offset:3px}
img,svg{max-width:100%}

.frame{
  max-width:var(--frame);margin:0 auto;background:#fff;
  border-left:1px solid var(--line);border-right:1px solid var(--line);
}
.white-band{background:#fff}
.pad{padding:0 var(--pad)}

/* ---------- rules with plus markers ---------- */
.rule{position:relative;border-top:1px solid var(--line);height:0}
.rule > span{position:absolute;top:-10px;font:400 17px/1 "JetBrains Mono",monospace;color:#A7ADB8}
.rule .l{left:calc(50% - var(--frame)/2 - 8px)}
.rule .r{left:calc(50% + var(--frame)/2 - 9px)}

/* ---------- type ---------- */
h1,h2,h3,h4{font-family:"Inter Tight",sans-serif;font-weight:400;letter-spacing:-.025em;margin:0}
h1{font-size:clamp(42px,7.9vw,108px);line-height:1.02;letter-spacing:-.035em;max-width:1080px}
h1 .b{color:var(--blue-soft)}
h1 .b2{color:var(--blue-pale)}
h2{font-size:clamp(30px,3.2vw,41px);line-height:1.14}
h3{font-size:21px;letter-spacing:-.015em}
p{margin:0}
.lede{margin-top:34px;max-width:340px;font-size:14.5px;line-height:1.55;color:#3E434B}
.muted{color:#6A707A}

.eyebrow{
  display:flex;align-items:center;gap:10px;
  font-family:"JetBrains Mono",monospace;font-size:11.5px;
  letter-spacing:.16em;text-transform:uppercase;color:#4A505A;
}
.eyebrow::before{content:"";width:8px;height:8px;background:var(--blue-soft);flex:0 0 auto}
.eyebrow.on-dark{color:#A9BDF6}
.eyebrow.on-dark::before{background:#6E8FF0}

.mono{font-family:"JetBrains Mono",monospace;font-feature-settings:"zero" 1}

/* ---------- buttons ---------- */
.btn{
  display:inline-flex;align-items:center;gap:11px;
  font-family:"JetBrains Mono",monospace;font-size:11.5px;font-weight:500;
  letter-spacing:.13em;text-transform:uppercase;
  padding:14px 20px;border-radius:3px;border:1px solid transparent;
  cursor:pointer;transition:.18s ease;
}
.btn-primary{color:#fff;background:linear-gradient(180deg,#3A62E8 0%,#1F41C4 100%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.22)}
.btn-primary:hover{background:linear-gradient(180deg,#2E55DF 0%,#16309F 100%)}
.btn-ghost{border-color:#D5D8DE;color:var(--ink);background:#fff}
.btn-ghost:hover{border-color:#9DA4B0}
.btn-light{background:#fff;color:#12224F}
.btn-light:hover{background:#E8EDFB}
.btn-outline-light{border-color:rgba(255,255,255,.38);color:#fff}
.btn-outline-light:hover{border-color:#fff;background:rgba(255,255,255,.08)}

/* ---------- header ---------- */
header.site{background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:30}
.head-in{max-width:calc(var(--frame) + 44px);margin:0 auto;padding:0 22px;height:80px;
  display:flex;align-items:center;gap:40px}
.brand{display:flex;align-items:center;gap:11px;font-family:"Inter Tight",sans-serif;
  font-size:25px;font-weight:500;letter-spacing:-.02em}
nav.main{margin-left:auto;display:flex;gap:34px;font-size:15px;color:#25272B}
nav.main a:hover{color:var(--blue)}
nav.main a.active{color:var(--blue)}
.head-cta{margin-left:8px}
.burger{display:none;margin-left:auto;background:#fff;border:1px solid var(--line);
  border-radius:3px;width:40px;height:36px;align-items:center;justify-content:center;cursor:pointer}
.burger span{display:block;width:16px;height:1.4px;background:var(--ink);position:relative}
.burger span::before,.burger span::after{content:"";position:absolute;left:0;width:16px;height:1.4px;background:var(--ink)}
.burger span::before{top:-5px}.burger span::after{top:5px}

/* ---------- hero (home) ---------- */
.hero{position:relative;overflow:hidden;
  background-image:radial-gradient(circle,#E1E4EA 1px,transparent 1.1px);background-size:9px 9px}
.hero-copy{padding:58px var(--pad) 0}
.hero-actions{display:flex;gap:16px;margin-top:26px;flex-wrap:wrap}
.terrain-wrap{position:relative;margin-top:-70px;pointer-events:none}
canvas.terrain{display:block;width:100%;height:420px}

/* ---------- page head (sub pages) ---------- */
.page-head{position:relative;overflow:hidden;padding:56px var(--pad) 0;
  background-image:radial-gradient(circle,#E1E4EA 1px,transparent 1.1px);background-size:9px 9px}
.page-head h1{font-size:clamp(36px,5.4vw,72px);max-width:16ch}
.page-head .lede{max-width:520px;font-size:16px;padding-bottom:8px}
.page-head .terrain-wrap{margin:-30px calc(var(--pad) * -1) 0}
.page-head canvas.terrain{height:180px}

/* ---------- logos ---------- */
.logos-in{max-width:var(--frame);margin:0 auto;padding:30px var(--pad) 34px}
.logo-row{display:flex;align-items:center;justify-content:space-between;gap:36px;
  margin-top:34px;margin-inline:clamp(-96px,-6vw,0px)}
.logo-row svg{flex:0 0 auto;color:#111316}

/* ---------- generic section ---------- */
.section{padding:44px var(--pad) 96px}
.section-tight{padding:44px var(--pad) 64px}
.split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.32fr);gap:64px;margin-top:56px}
.split h2{max-width:12ch}
.split .note{margin-top:26px;max-width:315px;font-size:14.5px;line-height:1.55;color:#5B616B}

/* numbered / listed rows */
.item{display:grid;grid-template-columns:64px 1fr 46px;align-items:start;padding:26px 0;
  border-bottom:1px dashed #D8DBE1}
.item:first-child{padding-top:0}
.item:last-child{border-bottom:0}
.num{font-family:"JetBrains Mono",monospace;font-size:15px;color:#9AA0AA;
  font-feature-settings:"zero" 1;padding-top:2px}
.item p{margin-top:12px;max-width:44ch;font-size:14px;line-height:1.55;color:#6A707A}
.ico{width:34px;height:34px;border:1px solid var(--line);border-radius:3px;display:grid;
  place-items:center;color:#4A6FE0;background:#FBFCFE;justify-self:end}

/* cards */
.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;margin-top:52px;
  border-top:1px solid var(--line);border-left:1px solid var(--line)}
.cards.two{grid-template-columns:repeat(2,minmax(0,1fr))}
.card{padding:30px 28px 34px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);
  display:flex;flex-direction:column;gap:14px;background:#fff;transition:background .18s ease}
a.card:hover{background:#F7F9FE}
.card .k{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.14em;
  text-transform:uppercase;color:#9AA0AA}
.card p{font-size:14px;line-height:1.55;color:#6A707A}
.card .go{margin-top:auto;padding-top:14px;font-family:"JetBrains Mono",monospace;font-size:11px;
  letter-spacing:.13em;text-transform:uppercase;color:var(--blue)}

/* spec / data table */
.spec{width:100%;border-collapse:collapse;margin-top:36px;font-size:14px}
.spec th,.spec td{text-align:left;padding:15px 16px;border-bottom:1px solid var(--line);vertical-align:top}
.spec th{width:230px;font-weight:500;font-family:"JetBrains Mono",monospace;font-size:11.5px;
  letter-spacing:.12em;text-transform:uppercase;color:#7A808A}
.spec td{color:#4A505A;line-height:1.55}

/* prose */
.prose{max-width:66ch;font-size:16px;line-height:1.7;color:#33373E}
.prose h2{font-size:27px;margin:44px 0 14px}
.prose h3{font-size:19px;margin:32px 0 10px}
.prose p{margin:16px 0}
.prose ul{margin:16px 0;padding-left:20px}
.prose li{margin:8px 0}
.prose a{color:var(--blue);text-decoration:underline;text-underline-offset:3px}
.prose blockquote{margin:26px 0;padding:2px 0 2px 20px;border-left:2px solid var(--blue-soft);
  color:#4A505A;font-size:17px}
pre{background:#0D1117;color:#DCE3F5;border-radius:4px;padding:18px 20px;overflow:auto;
  font-family:"JetBrains Mono",monospace;font-size:12.5px;line-height:1.7;margin:20px 0}
pre .c{color:#7C8AA8}pre .s{color:#9BD2A0}pre .k{color:#8FB0FF}
code{font-family:"JetBrains Mono",monospace;font-size:.88em;background:#F1F3F7;
  border:1px solid var(--line);border-radius:3px;padding:1px 5px}
pre code{background:none;border:0;padding:0;font-size:inherit}

/* ---------- strong CTA band ---------- */
.cta{position:relative;overflow:hidden;background:#0E1C4E;
  background-image:linear-gradient(160deg,#132464 0%,#0B1740 55%,#081029 100%)}
.cta canvas.terrain{position:absolute;inset:auto 0 0 0;height:340px;opacity:.9}
.cta-in{position:relative;z-index:2;padding:88px var(--pad) 96px;max-width:960px}
.cta h2{color:#fff;font-size:clamp(34px,4.6vw,60px);line-height:1.06;letter-spacing:-.032em;max-width:15ch}
.cta h2 em{font-style:normal;color:var(--blue-pale)}
.cta p{margin-top:24px;max-width:430px;font-size:15px;line-height:1.6;color:#B9C4E4}
.cta-actions{display:flex;gap:16px;margin-top:34px;flex-wrap:wrap}
.cta-meta{display:flex;gap:28px;flex-wrap:wrap;margin-top:44px;padding-top:22px;
  border-top:1px solid rgba(255,255,255,.14);font-family:"JetBrains Mono",monospace;
  font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:#8FA0CD}

/* ---------- footer ---------- */
footer.site{background:#fff}
.foot-in{max-width:var(--frame);margin:0 auto;padding:56px var(--pad) 30px;
  display:grid;grid-template-columns:1.5fr repeat(4,1fr);gap:40px}
.foot-brand p{margin-top:18px;max-width:26ch;font-size:13.5px;line-height:1.6;color:#6A707A}
.foot-col h4{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.14em;
  text-transform:uppercase;color:#9AA0AA;font-weight:500;margin-bottom:16px}
.foot-col a{display:block;font-size:14px;color:#3E434B;padding:6px 0}
.foot-col a:hover{color:var(--blue)}
.foot-bar{max-width:var(--frame);margin:0 auto;padding:18px var(--pad) 40px;
  border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;
  font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.1em;color:#9AA0AA}
.dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#3FBF77;margin-right:8px}

/* ---------- docs layout ---------- */
.docs{display:grid;grid-template-columns:236px minmax(0,1fr);gap:0}
.docs-nav{border-right:1px solid var(--line);padding:40px 24px 80px;position:sticky;top:81px;align-self:start}
.docs-nav h4{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.14em;
  text-transform:uppercase;color:#9AA0AA;font-weight:500;margin:26px 0 10px}
.docs-nav h4:first-child{margin-top:0}
.docs-nav a{display:block;font-size:14px;color:#4A505A;padding:6px 0}
.docs-nav a:hover{color:var(--blue)}
.docs-body{padding:40px 44px 90px}

/* ---------- blog ---------- */
.posts{border-top:1px solid var(--line);margin-top:48px}
.post-row{display:grid;grid-template-columns:150px minmax(0,1fr) 120px;gap:28px;align-items:start;
  padding:26px 0;border-bottom:1px solid var(--line);transition:background .18s}
.post-row:hover{background:#F7F9FE}
.post-row p{margin-top:10px;font-size:14px;line-height:1.55;color:#6A707A;max-width:62ch}
.post-row .meta{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.1em;
  text-transform:uppercase;color:#9AA0AA;padding-top:5px}
.post-row .tag{justify-self:end;font-family:"JetBrains Mono",monospace;font-size:10.5px;
  letter-spacing:.12em;text-transform:uppercase;color:var(--blue);border:1px solid #D6DEF8;
  border-radius:2px;padding:4px 8px;background:#F4F7FE}

/* ---------- team ---------- */
.team{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--line);
  border:1px solid var(--line);margin-top:48px}
.member{background:#fff;padding:26px 22px}
.avatar{width:100%;aspect-ratio:1/1;border:1px solid var(--line);border-radius:3px;margin-bottom:18px;
  background:radial-gradient(circle,#E1E4EA 1px,transparent 1.1px) 0 0/7px 7px,#FBFCFE}
.member .role{margin-top:6px;font-family:"JetBrains Mono",monospace;font-size:10.5px;
  letter-spacing:.12em;text-transform:uppercase;color:#9AA0AA}

/* ---------- form ---------- */
.form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:8px}
.field{display:flex;flex-direction:column;gap:8px}
.field.full{grid-column:1/-1}
label{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.13em;
  text-transform:uppercase;color:#7A808A}
input,select,textarea{font-family:inherit;font-size:14.5px;color:var(--ink);background:#fff;
  border:1px solid #D5D8DE;border-radius:3px;padding:12px 13px}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--blue);
  box-shadow:0 0 0 3px rgba(44,85,222,.12)}
textarea{min-height:110px;resize:vertical}
.form-note{margin-top:18px;font-size:12.5px;color:#868C96}
.sent{display:none;border:1px solid #CBD9F6;background:#F4F7FE;border-radius:3px;padding:18px 20px;
  font-size:14.5px;color:#22417F;margin-top:8px}

/* ---------- 404 ---------- */
.err{padding:110px var(--pad) 120px;text-align:left}
.err .code{font-family:"JetBrains Mono",monospace;font-size:13px;letter-spacing:.2em;color:#9AA0AA}

/* ---------- responsive ---------- */
@media (max-width:1100px){
  :root{--pad:36px}
  .rule .l{left:6px}
  .rule .r{right:6px;left:auto}
  .frame{border-left:0;border-right:0}
  .foot-in{grid-template-columns:1fr 1fr 1fr;gap:34px}
  .team{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:860px){
  nav.main{position:absolute;top:80px;left:0;right:0;background:#fff;border-bottom:1px solid var(--line);
    flex-direction:column;gap:0;padding:8px 22px 16px;display:none}
  nav.main.open{display:flex}
  nav.main a{padding:12px 0;border-bottom:1px solid var(--line-soft)}
  .burger{display:flex}
  .head-in{gap:14px;height:80px;position:relative}
  .head-cta{display:none}
  .split{grid-template-columns:1fr;gap:40px;margin-top:40px}
  .cards,.cards.two{grid-template-columns:1fr}
  .terrain-wrap{margin-top:-20px}
  canvas.terrain{height:280px}
  .item{grid-template-columns:44px 1fr}
  .ico{display:none}
  .logo-row{flex-wrap:wrap;justify-content:flex-start;gap:28px 40px;margin-inline:0}
  .docs{grid-template-columns:1fr}
  .docs-nav{position:static;border-right:0;border-bottom:1px solid var(--line);padding:26px var(--pad)}
  .docs-body{padding:32px var(--pad) 70px}
  .post-row{grid-template-columns:1fr;gap:10px}
  .post-row .tag{justify-self:start}
  .form{grid-template-columns:1fr}
  .foot-in{grid-template-columns:1fr 1fr;gap:30px}
  .section{padding-bottom:70px}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto}}

/* ---------- Curiosity Cloud additions ---------- */
.brand-tag{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.18em;
  text-transform:uppercase;color:#8A909A;border:1px solid var(--line);border-radius:2px;
  padding:3px 6px;margin-left:2px;transform:translateY(-1px)}
.stat h3{font-size:44px;letter-spacing:-.04em;line-height:1}
.flow{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--line);
  border:1px solid var(--line);margin-top:48px}
.flow-step{background:#fff;padding:28px 24px 30px}
.flow-step .k{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--blue)}
.flow-step h3{margin:12px 0 10px}
.flow-step p{font-size:14px;line-height:1.55;color:#6A707A}
.flow-step .arrow{display:block;margin-top:16px;font-family:"JetBrains Mono",monospace;
  font-size:15px;color:#C3C8D2}
@media (max-width:860px){.flow{grid-template-columns:1fr}}


/* ---------- header refinements: mark, dropdown nav ---------- */
.brand{gap:10px;font-size:24px}
.brand .mark{color:var(--ink)}
nav.main{gap:30px;align-items:center}
.navitem{position:relative;display:flex;align-items:center}
.navitem > a{display:inline-flex;align-items:center;gap:7px}
.chev{color:#9AA0AA;transition:transform .16s ease}
.navitem:hover .chev{transform:translateY(1px)}
.dropdown{
  position:absolute;top:calc(100% + 22px);left:-14px;min-width:268px;
  background:#fff;border:1px solid var(--line);border-radius:3px;
  box-shadow:0 14px 34px rgba(12,13,15,.09);padding:8px;
  opacity:0;visibility:hidden;transform:translateY(-5px);
  transition:opacity .16s ease,transform .16s ease,visibility .16s;
}
.navitem:hover .dropdown,.navitem:focus-within .dropdown{opacity:1;visibility:visible;transform:none}
.dropdown a{display:block;padding:10px 12px;border-radius:2px;font-size:14.5px;color:var(--ink)}
.dropdown a:hover{background:#F5F8FE;color:var(--blue)}
.dropdown .d-k{display:block;margin-top:3px;font-family:"JetBrains Mono",monospace;
  font-size:10.5px;letter-spacing:.11em;text-transform:uppercase;color:#9AA0AA}
@media (max-width:860px){
  .navitem{display:block;width:100%}
  .navitem > a{width:100%;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--line-soft)}
  .dropdown{position:static;opacity:1;visibility:visible;transform:none;border:0;box-shadow:none;
    padding:4px 0 8px 14px;min-width:0}
  .dropdown a{padding:9px 0}
}


/* ---------- React build additions ---------- */
.cc-root{
  font-family:"Inter","Helvetica Neue",Arial,sans-serif;color:var(--ink);
  background-color:#fff;
  background-image:repeating-linear-gradient(135deg,#fff 0 6px,#F0F1F4 6px 7px);
  -webkit-font-smoothing:antialiased;
}
.cc-root a{color:inherit;text-decoration:none}
.golink{color:var(--blue);font-family:"JetBrains Mono",monospace;font-size:11px;
  letter-spacing:.13em;text-transform:uppercase}
.link{color:var(--blue)}
.docs-nav > div + div h4{margin-top:26px}
.btn[disabled]{opacity:.45;cursor:not-allowed}
button.btn{font-family:"JetBrains Mono",monospace}
`;

/* ---------------------------------------------------------------- icons */
const Bolt = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"><path d="M9 1.4 3.4 9h4l-.8 5.6L12.6 7h-4l.4-5.6Z" /></svg>
);
const Chip = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="5" y="5" width="8" height="8" rx="1" /><rect x="2.4" y="2.4" width="13.2" height="13.2" rx="1.6" /><path d="M7 .8v1.6M11 .8v1.6M7 15.6v1.6M11 15.6v1.6M.8 7h1.6M.8 11h1.6M15.6 7h1.6M15.6 11h1.6" /></svg>
);
const Cloud = () => (
  <svg width="18" height="16" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"><path d="M5.6 13.4A4.6 4.6 0 0 1 6 4.3a5.4 5.4 0 0 1 10.2 2.3 3.4 3.4 0 0 1-.6 6.8H5.6Z" /></svg>
);
const Grid = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="2" width="6" height="6" /><rect x="10" y="2" width="6" height="6" /><rect x="2" y="10" width="6" height="6" /><rect x="10" y="10" width="6" height="6" /></svg>
);
const Clock = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="9" cy="9" r="7.4" /><path d="M9 4.6V9l3 1.8" strokeLinecap="round" /></svg>
);
const Shield = () => (
  <svg width="16" height="17" viewBox="0 0 16 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"><path d="M8 1.2 14.6 3.6v5.2c0 4-2.7 7-6.6 8.2C4.1 15.8 1.4 12.8 1.4 8.8V3.6L8 1.2Z" /><path d="M5.4 9 7.4 11l3.4-3.6" /></svg>
);
const ICONS = { bolt: Bolt, chip: Chip, cloud: Cloud, grid: Grid, clock: Clock, shield: Shield };

const Mark = () => (
  <svg className="mark" width="23" height="25" viewBox="0 0 23 25" fill="none" aria-hidden="true">
    <path d="M11.5 1.2 21.1 6.6v11.8l-9.6 5.4-9.6-5.4V6.6l9.6-5.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M11.5 7.4 16.3 10v5.2l-4.8 2.6-4.8-2.6V10l4.8-2.6Z" fill="currentColor" />
  </svg>
);
const Chev = () => (
  <svg className="chev" width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true"><path d="M1 1.2 4.5 4.6 8 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
);
const DocIcon = () => (
  <svg width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden="true"><rect x=".6" y=".6" width="11.8" height="12.8" rx="1.4" stroke="currentColor" strokeWidth="1.2" /><path d="M3.4 4.3h6.2M3.4 7h6.2M3.4 9.7h3.6" stroke="currentColor" strokeWidth="1.2" /></svg>
);

/* ---------------------------------------------------------------- terrain */
const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21]
];
const PRESET = {
  hero: {
    ramp: [[0.13, 1.0], [0.4, 0.9], [0.58, 0.76], [0.78, 0.52], [0.9, 0.24], [0.97, 0.03], [1.0, 0.02]],
    peak: [[0.4, 1.0], [0.63, 0.06], [0.83, 1.0]], low: [200, 207, 221], high: [47, 100, 240]
  },
  band: {
    ramp: [[0.05, 1.0], [0.34, 0.86], [0.62, 0.62], [0.84, 0.34], [0.96, 0.08], [1.0, 0.06]],
    peak: [[0.22, 1.0], [0.42, 0.22], [0.62, 1.0]], low: [208, 214, 226], high: [58, 108, 240]
  },
  cta: {
    ramp: [[0.0, 1.0], [0.22, 0.82], [0.46, 0.58], [0.7, 0.72], [0.88, 0.3], [1.0, 0.1]],
    peak: [[0.52, 1.0], [0.74, 0.16], [0.95, 1.0]], low: [26, 44, 104], high: [176, 200, 255]
  }
};
const rnd = (i, j) => {
  const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const polyY = (pts, u) => {
  if (u <= pts[0][0] || u >= pts[pts.length - 1][0]) return 1;
  for (let i = 0; i < pts.length - 1; i++) {
    if (u >= pts[i][0] && u <= pts[i + 1][0]) {
      const t = (u - pts[i][0]) / (pts[i + 1][0] - pts[i][0]);
      return pts[i][1] + t * (pts[i + 1][1] - pts[i][1]);
    }
  }
  return 1;
};

function Terrain({ variant = "hero", className = "terrain", style }) {
  const ref = useRef(null);
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const cfg = PRESET[variant] || PRESET.hero;
    const ctx = canvas.getContext("2d");
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const cell = 4, dot = 3;
    const paint = (px, py, u, v, size) => {
      const t = Math.min(1, u * 0.75 + v * 0.45);
      const r = Math.round(cfg.low[0] + (cfg.high[0] - cfg.low[0]) * t);
      const g = Math.round(cfg.low[1] + (cfg.high[1] - cfg.low[1]) * t);
      const b = Math.round(cfg.low[2] + (cfg.high[2] - cfg.low[2]) * t);
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(px, py, size, size);
    };
    for (let i = 0; i * cell < w; i++) {
      const x = i * cell, u = x / w;
      const rampY = polyY(cfg.ramp, u) * h;
      const peakY = polyY(cfg.peak, u) * h;
      const topY = Math.min(rampY, peakY);
      const xf = 0.16 + 1.25 * Math.pow(u, 1.45);
      for (let j = 0; j * cell < h; j++) {
        const y = j * cell;
        if (y < topY) {
          if (u > 0.62 && rampY > y && rampY - y < h * 0.16 && rnd(i, j) > 0.982) paint(x, y, u, 0.5 + 0.5 * u, dot + 2);
          continue;
        }
        let v = 0;
        if (y >= rampY) v = Math.pow(Math.min((y - rampY) / (h * 0.85), 1), 0.72) * xf;
        if (y >= peakY) {
          const vp = Math.pow(Math.min((y - peakY) / (h * 0.95), 1), 0.8) * (0.14 + 0.5 * u) * 0.75;
          if (vp > v) v = vp;
        }
        v *= 0.9 + 0.2 * rnd(i, j);
        if (v <= 0) continue;
        if (v > (BAYER[j & 7][i & 7] + 0.5) / 64) paint(x, y, u, Math.min(v, 1), dot);
      }
    }
  }, [variant]);

  useEffect(() => {
    draw();
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(draw, 120); };
    window.addEventListener("resize", onResize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw).catch(() => {});
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, [draw]);

  return <canvas ref={ref} className={className} style={style} aria-hidden="true" />;
}

/* ---------------------------------------------------------------- data */
const PRODUCTS = [
  {
    slug: "cloud", key: "Cloud", name: "GPU Cloud", tagline: "clusters you can actually get",
    blurb: "On-demand and reserved accelerator clusters with InfiniBand fabric, managed Slurm and Kubernetes, and high-throughput parallel storage.",
    lede: "Reserved and on-demand accelerator capacity in Indian regions, with the fabric, storage and scheduling large training runs need — and a power position behind every rack.",
    kicker: "Product / Cloud",
    caps: [
      ["Reserved pools", "Contract capacity for six to thirty-six months, then carve clusters out of it yourself as projects start and finish.", "chip"],
      ["Bare metal or managed", "Take nodes raw, or take managed Slurm and Kubernetes with images, drivers and health checks maintained by us.", "grid"],
      ["Fabric built for collectives", "Non-blocking 400G InfiniBand within a hall, rail-optimised, with topology exposed to your scheduler.", "cloud"],
      ["Energy attribution per job", "The usage API returns kWh, carbon-free share and cost for any job id, so efficiency work has a number to chase.", "bolt"]
    ],
    spec: [
      ["Accelerators", "Current-generation NVIDIA HGX nodes, eight accelerators per node, NVLink within the node"],
      ["Regions", "Maharashtra and Western India at launch; further regions follow energisation"],
      ["Storage", "Parallel NVMe scratch, S3-compatible object storage, dataset cache at the fabric edge"],
      ["Access", "SSO, per-project RBAC, private link into your VPC, no public control-plane requirement"]
    ],
    related: ["inference", "energy"]
  },
  {
    slug: "inference", key: "Inference", name: "Managed Inference", tagline: "tokens without a cluster",
    blurb: "Token endpoints for open-weight models on dedicated Indian capacity. Autoscaled, priced per million tokens, no cluster to run.",
    lede: "Open-weight models served on dedicated Indian capacity, priced per million tokens and autoscaled by us. Bring your own weights when the catalogue is not enough.",
    kicker: "Product / Inference",
    caps: [
      ["Catalogue endpoints", "Popular open-weight text, vision and embedding models kept current, with a stable API surface across versions.", "cloud"],
      ["Bring your own weights", "Upload a checkpoint or an adapter and get a private endpoint on the same autoscaling path.", "chip"],
      ["Latency you can promise", "Regional routing, prefix caching and continuous batching, with p95 published per model and region.", "clock"],
      ["Residency by default", "Prompts, completions and logs stay inside Indian regions and are never used to train anything.", "shield"]
    ],
    spec: [
      ["Interface", "OpenAI-compatible REST and streaming, plus native batch"],
      ["Pricing", "Per million input and output tokens; committed throughput available"],
      ["Scaling", "Zero to burst in seconds on shared pools; dedicated replicas for steady load"],
      ["Controls", "Rate limits, spend caps, per-key routing, full request audit"]
    ],
    related: ["cloud", "ai-factories"]
  },
  {
    slug: "ai-factories", key: "Sites", name: "AI Factories", tagline: "halls built for the load, not retrofitted",
    blurb: "Liquid-cooled halls, managed racks and colocation built for high-density AI load, sited where power can actually be delivered.",
    lede: "Colocation, managed racks and private halls designed around high-density AI load — liquid cooling, heavy power per rack, and a build sequence tied to the energisation date.",
    kicker: "Product / Sites",
    caps: [
      ["High-density halls", "Direct-to-chip liquid cooling with rear-door heat exchange, engineered well beyond conventional enterprise rack density.", "grid"],
      ["Managed racks", "We rack, cable, burn in and monitor. You get IPMI, a fabric port and an SLA instead of a shipping crate.", "chip"],
      ["Sited on power", "Locations are chosen for interconnection position and renewable proximity first, real-estate economics second.", "bolt"],
      ["Bring your own hardware", "Own the accelerators, rent the hall. Same monitoring, same power profile, same attribution.", "cloud"]
    ],
    spec: [
      ["Cooling", "Direct-to-chip liquid loop, rear-door exchange, air for network and storage rows"],
      ["Resilience", "Concurrently maintainable electrical topology; storage and firm supply behind the meter"],
      ["Connectivity", "Carrier-neutral, diverse fibre paths, private interconnect to major clouds"],
      ["Assurance", "Independent commissioning; ISO 27001 and SOC 2 programmes in progress"]
    ],
    related: ["energy", "cloud"]
  },
  {
    slug: "energy", key: "Energy", name: "Energy", tagline: "a flat load deserves a firm supply",
    blurb: "Captive and group-captive renewables, storage and behind-the-meter supply contracted for a flat, always-on AI load.",
    lede: "Clean generation, storage and contracting arranged around AI's always-on demand curve: captive and group-captive renewables, behind-the-meter supply, and matching measured hour by hour.",
    kicker: "Product / Energy",
    caps: [
      ["Captive and group captive", "Structures that give a data centre a long-run cost of power instead of a tariff that reprices every year.", "bolt"],
      ["Storage that shapes the curve", "Battery storage sized to carry the load through evening ramps and low-wind nights, not to flatter an annual average.", "clock"],
      ["24×7 carbon-free matching", "Supply matched to demand hour by hour, reported per site and per customer, with residual grid draw shown honestly.", "grid"],
      ["Dispatch as software", "Forecasting and scheduling across generation, storage and grid import, run in the platform rather than in spreadsheets.", "cloud"]
    ],
    spec: [
      ["Sources", "Solar, wind and hybrid parks, plus battery storage co-located or contracted"],
      ["Structures", "Captive, group captive, open access and behind-the-meter supply"],
      ["Reporting", "Hourly matched share, residual import, and emissions factors per site"],
      ["Disclosure", "Measured figures are footnoted; modelled numbers are labelled as modelled"]
    ],
    related: ["ai-factories", "cloud"]
  }
];
const bySlug = (s) => PRODUCTS.find((p) => p.slug === s);

const PROBLEMS = [
  ["Interconnection Queues", "Grid connection, not GPU lead time, sets the date a cluster goes live. A site without a power position is years from useful.", "bolt"],
  ["A Flat Load On A Variable Grid", "AI training draws a near-constant 24×7 load. Renewables do not supply one. Closing that gap takes storage and contracts, not annual averages.", "clock"],
  ["Four Vendors, No Owner", "Power, land, hardware and cloud usually sit with different parties, so nobody owns the number that matters: delivered compute per rupee.", "grid"],
  ["Capital Sitting Idle", "Accelerators bought ahead of a power and cooling plan wait unracked while depreciation runs against them.", "chip"]
];

const COMMITMENTS = [
  ["A date, not a queue position", "Capacity offers name a site, an energisation schedule and a handover date.", "clock"],
  ["Energy shown per job", "Every cluster and endpoint reports kWh, carbon-free share and cost against the workload that caused it.", "bolt"],
  ["Data stays in India", "Regions, storage, backups and support operate inside Indian jurisdiction, with per-tenant key control.", "shield"],
  ["Exit without a rebuild", "Standard schedulers, S3-compatible storage, open-weight inference. Nothing in the stack exists to trap you.", "grid"]
];

const PLANES = [
  ["Experience", "Console, CLI, API and quotas — what your team touches every day."],
  ["Cloud management", "Tenancy, catalogue, entitlements, metering and multi-sided billing."],
  ["Federation control", "Placement and scheduling across sites and providers as one pool."],
  ["Energy intelligence", "Forecasting, dispatch, carbon-free matching and per-job attribution."],
  ["Site control", "Hall, rack, cooling and hardware lifecycle at each facility."],
  ["Resource & energy", "The physical layer: generation, storage, grid interface, accelerators, fabric."]
];

const SOLUTIONS = [
  {
    id: "training", eyebrow: "Frontier training", h: "Long Runs, Fixed Cost, No Surprises",
    note: "Reserved pools with a named site and a fixed power profile, so a ninety-day run has a known cost on day one.",
    items: [
      ["Capacity", "Reserved nodes for six to thirty-six months, expandable in blocks as the run scales.", "chip"],
      ["Resilience", "Checkpoint-aware scheduling, spare-node pools and automatic drain on hardware faults.", "shield"],
      ["Reporting", "Throughput, utilisation and energy per run, so efficiency work pays for itself.", "bolt"]
    ]
  },
  {
    id: "inference", eyebrow: "Production inference", h: "Spiky Demand, Predictable Latency",
    note: "Dedicated replicas for the baseline, shared pools for the peaks, both inside Indian regions.",
    items: [
      ["Shape", "Committed throughput for steady traffic, burst capacity billed per token above it.", "cloud"],
      ["Placement", "Regional routing with private interconnect to wherever your application already runs.", "grid"],
      ["Controls", "Spend caps, per-key rate limits and a full audit trail for every request.", "shield"]
    ]
  },
  {
    id: "sovereign", eyebrow: "Sovereign & regulated", h: "Jurisdiction You Can Point At",
    note: "For government, BFSI, healthcare and public research: single-tenant halls, Indian operations, and an audit trail that survives a regulator's questions.",
    items: [
      ["Isolation", "Single-tenant halls or private cages with dedicated fabric and storage.", "grid"],
      ["Key control", "Customer-managed keys, hardware security modules, and no offshore support path.", "shield"],
      ["Evidence", "Access logs, change records and energy disclosures exportable on demand.", "clock"]
    ]
  },
  {
    id: "wholesale", eyebrow: "Wholesale capacity", h: "For Cloud Providers And Aggregators",
    note: "Take halls, racks or whole pools and resell them under your own brand, with the platform's metering underneath.",
    items: [
      ["Offtake", "Multi-year commitments on power and space, priced against a known supply position.", "bolt"],
      ["Multi-sided billing", "Meter your customers through the same plane that meters you, with your margin intact.", "grid"],
      ["White label", "Your console, our control plane, one operations rota that answers the phone.", "cloud"]
    ]
  }
];

const POSTS = [
  { slug: "interconnection-queue", date: "11 Aug 2026", read: "8 min read", tag: "Energy", title: "The interconnection queue is the real GPU shortage", excerpt: "Accelerator lead times are measured in months. The queue to energise the site that would hold them is measured in years." },
  { slug: "hourly-matching", date: "30 Jul 2026", read: "7 min read", tag: "Energy", title: "Matching a flat AI load hour by hour", excerpt: "Annual averages make any renewable portfolio look carbon-free. Hourly matching is where the storage bill shows up." },
  { slug: "rack-density", date: "18 Jul 2026", read: "6 min read", tag: "Sites", title: "What changes at very high rack density", excerpt: "Liquid cooling is the easy part. Floor loading, loop chemistry and the service model are where builds go wrong." },
  { slug: "group-captive", date: "02 Jul 2026", read: "5 min read", tag: "Energy", title: "Group captive, explained for AI teams", excerpt: "Why the structure behind your power contract determines your cost of compute for the next decade." },
  { slug: "six-planes", date: "14 Jun 2026", read: "9 min read", tag: "Platform", title: "Six planes: running energy and cloud as one system", excerpt: "The control-plane design that lets a training job report the kilowatt-hours it consumed." },
  { slug: "evening-ramp", date: "29 May 2026", read: "6 min read", tag: "Platform", title: "Scheduling around the evening ramp", excerpt: "Flexible batch work can move. Inference cannot. Splitting the two is worth more than any tariff negotiation." }
];

const DOC_NAV = [
  ["Start", [["quickstart", "Quickstart"], ["concepts", "Core concepts"]]],
  ["Guides", [["clusters", "Launch a cluster"], ["storage", "Storage and data"], ["inference", "Serve a model"], ["energy", "Energy attribution"]]],
  ["Reference", [["regions", "Regions"], ["api", "API"], ["changelog", "Changelog"]]]
];

/* ---------------------------------------------------------------- bits */
const Rule = () => (
  <div className="rule"><span className="l">+</span><span className="r">+</span></div>
);

const Item = ({ n, title, body, icon }) => {
  const I = ICONS[icon] || Grid;
  return (
    <article className="item">
      <div className="num">{String(n).padStart(2, "0")}</div>
      <div><h3>{title}</h3><p>{body}</p></div>
      <div className="ico"><I /></div>
    </article>
  );
};

const Card = ({ k, title, body, href, go = "Explore" }) => (
  <a className="card" href={href}>
    <span className="k">{k}</span>
    <h3>{title}</h3>
    <p>{body}</p>
    <span className="go">{go} →</span>
  </a>
);

const Eyebrow = ({ children, dark }) => (
  <p className={dark ? "eyebrow on-dark" : "eyebrow"}>{children}</p>
);

const Spec = ({ rows, style }) => (
  <table className="spec" style={style}>
    <tbody>{rows.map(([k, v], i) => (<tr key={i}><th>{k}</th><td>{v}</td></tr>))}</tbody>
  </table>
);

const PageHead = ({ eyebrow, title, lede, variant = "band" }) => (
  <section>
    <div className="frame page-head">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 style={{ marginTop: 26 }}>{title}</h1>
      <p className="lede">{lede}</p>
      <div className="terrain-wrap"><Terrain variant={variant} /></div>
    </div>
  </section>
);

const Split = ({ left, children }) => (
  <div className="split"><div>{left}</div><div>{children}</div></div>
);

/* ---------------------------------------------------------------- chrome */
function Header({ route }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [route]);
  const active = (k) => (route[0] === k ? "active" : undefined);
  return (
    <header className="site">
      <div className="head-in">
        <a className="brand" href="#/"><Mark /> Curiosity <span className="brand-tag">Cloud</span></a>
        <button className="burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /></button>
        <nav className={open ? "main open" : "main"}>
          <div className="navitem">
            <a href="#/platform" className={active("platform")}>Platform <Chev /></a>
            <div className="dropdown">
              {PRODUCTS.map((p) => (
                <a key={p.slug} href={"#/platform/" + p.slug}>{p.name}<span className="d-k">{p.tagline}</span></a>
              ))}
            </div>
          </div>
          <a href="#/solutions" className={active("solutions")}>Solutions</a>
          <a href="#/company" className={active("company")}>Company</a>
          <a href="#/blog" className={active("blog")}>Blog</a>
          <a href="#/docs" className={active("docs")}>Docs</a>
        </nav>
        <a className="btn btn-primary head-cta" href="#/contact">Request capacity <span aria-hidden="true">→</span></a>
      </div>
    </header>
  );
}

const CTA = () => (
  <>
    <Rule />
    <section>
      <div className="frame cta">
        <Terrain variant="cta" />
        <div className="cta-in">
          <Eyebrow dark>Capacity planning starts upstream</Eyebrow>
          <h2>Reserve the power <em>before you reserve the GPUs.</em></h2>
          <p>Tell us the shape of the workload and the date you need it live. We come back with a site, a power profile and a delivery schedule — not a waitlist position.</p>
          <div className="cta-actions">
            <a className="btn btn-light" href="#/contact">Request capacity <span aria-hidden="true">→</span></a>
            <a className="btn btn-outline-light" href="#/docs">Read the docs</a>
          </div>
          <div className="cta-meta">
            <span>Reserved and on-demand</span><span>24×7 carbon-free matching</span><span>Data resident in India</span>
          </div>
        </div>
      </div>
    </section>
  </>
);

const Footer = () => (
  <>
    <Rule />
    <footer className="site">
      <div className="frame">
        <div className="foot-in">
          <div className="foot-brand">
            <a className="brand" href="#/"><Mark /> Curiosity <span className="brand-tag">Cloud</span></a>
            <p>The infrastructure layer for India's AI economy. Energy, data centres and cloud built as one system.</p>
          </div>
          <div className="foot-col">
            <h4>Platform</h4>
            {PRODUCTS.map((p) => (<a key={p.slug} href={"#/platform/" + p.slug}>{p.name}</a>))}
          </div>
          <div className="foot-col">
            <h4>Solutions</h4>
            {SOLUTIONS.map((s) => (<a key={s.id} href={"#/solutions/" + s.id}>{s.eyebrow}</a>))}
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <a href="#/company">About</a>
            <a href="#/company/founders">Founders</a>
            <a href="#/company/careers">Careers</a>
            <a href="#/contact">Contact</a>
          </div>
          <div className="foot-col">
            <h4>Resources</h4>
            <a href="#/docs">Documentation</a>
            <a href="#/docs/api">API reference</a>
            <a href="#/blog">Blog</a>
            <a href="#/docs/changelog">Changelog</a>
          </div>
        </div>
        <div className="foot-bar">
          <span>© {new Date().getFullYear()} Curiosity · Vaswani Chambers, Worli, Mumbai</span>
          <span><span className="dot" />All regions operational</span>
        </div>
      </div>
    </footer>
  </>
);

const LogoRow = () => (
  <div className="logo-row">
    <svg width="150" height="26" viewBox="0 0 150 26" fill="currentColor" aria-label="Logoipsum">
      <path d="M2 4h7l5 8-5 8H2l5-8-5-8Zm11 0h7l5 8-5 8h-7l5-8-5-8Z" />
      <text x="32" y="19" fontFamily="Inter Tight, sans-serif" fontSize="17" fontWeight="600">Logoipsum</text>
    </svg>
    <svg width="176" height="30" viewBox="0 0 176 30" fill="currentColor" aria-label="Logoipsum">
      <path d="M14 1 27 5v9c0 6.6-5.2 12-13 15C6.2 26 1 20.6 1 14V5L14 1Z" />
      <path d="M9 13.5 12.6 17 20 9.8" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <text x="32" y="22" fontFamily="Inter Tight, sans-serif" fontSize="21" fontWeight="700">Logoipsum</text>
    </svg>
    <svg width="168" height="28" viewBox="0 0 168 28" fill="currentColor" aria-label="Logoipsum">
      <path d="M14 1a13 13 0 1 0 0 26 13 13 0 0 0 0-26Zm0 6.5A6.5 6.5 0 1 1 7.5 14 6.5 6.5 0 0 1 14 7.5Z" />
      <path d="M14 7.5 20.6 4 24 10.5l-6.6 3.5L14 7.5Z" />
      <text x="32" y="21" fontFamily="Inter Tight, sans-serif" fontSize="20" fontWeight="600">Logoipsum</text>
    </svg>
    <svg width="148" height="26" viewBox="0 0 148 26" fill="currentColor" aria-label="Logoipsum">
      <rect x="0" y="3" width="118" height="19" rx="2" />
      <text x="7" y="18" fontFamily="Inter Tight, sans-serif" fontSize="15" fontWeight="700" fill="#fff" fontStyle="italic">logoipsum</text>
      <path d="M124 3h7l-4 7h5l-9 13 3-9h-5l3-11Z" />
    </svg>
    <svg width="158" height="28" viewBox="0 0 158 28" fill="currentColor" aria-label="Logoipsum">
      <circle cx="14" cy="14" r="12.6" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="14" cy="14" r="7.4" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="14" cy="14" r="2.6" />
      <text x="32" y="18" fontFamily="Inter Tight, sans-serif" fontSize="17" fontWeight="500">logoipsum</text>
      <text x="32" y="26" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing=".08em">.com</text>
    </svg>
    <svg width="150" height="28" viewBox="0 0 150 28" fill="currentColor" aria-label="Logoipsum">
      <text x="0" y="21" fontFamily="Inter Tight, sans-serif" fontSize="21" fontWeight="500">logo</text>
      <path d="M46 6h20a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H46a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4Z" />
      <path d="M48 5l3 4M64 5l-3 4" stroke="currentColor" strokeWidth="2" />
      <circle cx="51" cy="14" r="2" fill="#fff" /><circle cx="61" cy="14" r="2" fill="#fff" />
      <text x="76" y="21" fontFamily="Inter Tight, sans-serif" fontSize="21" fontWeight="500">ipsum</text>
    </svg>
  </div>
);

/* ---------------------------------------------------------------- pages */
function Home() {
  return (
    <>
      <section>
        <div className="frame hero">
          <div className="hero-copy">
            <h1>AI is <span className="b">power</span> before it is <span className="b2">compute.</span></h1>
            <p className="lede">Curiosity builds the energy, the data centres and the cloud as one system — so capacity lands on your timeline, not the grid's.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#/contact">Request capacity <span aria-hidden="true">→</span></a>
              <a className="btn btn-ghost" href="#/docs">View docs <DocIcon /></a>
            </div>
          </div>
          <div className="terrain-wrap"><Terrain variant="hero" /></div>
        </div>
      </section>

      <Rule />
      <section className="white-band">
        <div className="logos-in">
          <Eyebrow>Built with model teams, enterprises and research institutions</Eyebrow>
          <LogoRow />
        </div>
      </section>

      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>The problem</Eyebrow>
          <Split left={<>
            <h2>Chips Are Not The Bottleneck Anymore</h2>
            <p className="note">Accelerators ship in months. Power, land and interconnection take years — and they decide when a cluster actually turns on.</p>
          </>}>
            {PROBLEMS.map(([t, b, i], n) => (<Item key={t} n={n + 1} title={t} body={b} icon={i} />))}
          </Split>
        </div>
      </section>

      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>The thesis</Eyebrow>
          <h2>Current To Chip To Cloud, Under One Roof</h2>
          <p className="note" style={{ maxWidth: 520, marginTop: 26 }}>Most providers rent one layer of this and buy the rest. We hold all three, which is why we can commit to a date — and to what the power behind it costs.</p>
          <div className="flow">
            <div className="flow-step"><span className="k">01 · Current</span><h3>Contracted electrons</h3><p>Captive and group-captive renewables, storage and firm supply arranged around the site before a rack is ordered.</p><span className="arrow">↓</span></div>
            <div className="flow-step"><span className="k">02 · Chip</span><h3>Dense halls</h3><p>Direct-to-chip liquid cooling, high-density racks, and a build sequence that follows the energisation schedule.</p><span className="arrow">↓</span></div>
            <div className="flow-step"><span className="k">03 · Cloud</span><h3>Usable capacity</h3><p>Clusters, endpoints and quotas provisioned in minutes, with energy attribution carried all the way to the job.</p><span className="arrow">✓</span></div>
          </div>
        </div>
      </section>

      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>The platform</Eyebrow>
          <Split left={<>
            <h2>Four Products, One Control Plane</h2>
            <p className="note">Energy, sites, clusters and endpoints share a single management plane — so a quota change, a rack build and a power schedule are the same conversation.</p>
          </>}>
            <div className="cards two" style={{ marginTop: 0 }}>
              {PRODUCTS.map((p) => (<Card key={p.slug} k={p.key} title={p.name} body={p.blurb} href={"#/platform/" + p.slug} />))}
            </div>
          </Split>
        </div>
      </section>

      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Getting started</Eyebrow>
          <Split left={<>
            <h2>A Cluster In One Command</h2>
            <p className="note">Reserved capacity shows up as a pool in your account. Carve clusters out of it, hand them to Slurm or Kubernetes, and read back what each job cost in rupees and in kilowatt-hours.</p>
            <p className="note"><a className="golink" href="#/docs">Read the quickstart →</a></p>
          </>}>
            <pre><code>{"# reserved pool -> running cluster\ncuriosity clusters create \\\n  --region in-mh-1 \\\n  --accelerator h200 --nodes 64 \\\n  --fabric ib-400g \\\n  --power-profile 24x7-cfe\n\n# what did that run actually consume?\ncuriosity usage energy --job train-7b-0812"}</code></pre>
            <Spec rows={[
              ["Orchestration", "Managed Slurm, managed Kubernetes, or bare metal with your own scheduler"],
              ["Fabric", "Non-blocking 400G InfiniBand within a hall, rail-optimised for collectives"],
              ["Storage", "Parallel NVMe scratch, object storage, and dataset caching close to the fabric"],
              ["Attribution", "Per-job kWh, carbon-free share and cost, exposed through the usage API"]
            ]} />
          </Split>
        </div>
      </section>

      <Rule />
      <section className="white-band">
        <div className="logos-in">
          <Eyebrow>Why India, why now</Eyebrow>
          <div className="cards" style={{ marginTop: 34 }}>
            <div className="card stat"><span className="k">Peak demand</span><h3>257 GW</h3><p>Crossed in 2026, heading towards roughly 425 GW by 2035. AI load arrives on top of that curve, not instead of it.</p></div>
            <div className="card stat"><span className="k">Clean build-out</span><h3>50 GW+</h3><p>Annual clean capacity now being added — the raw material for behind-the-meter AI supply.</p></div>
            <div className="card stat"><span className="k">Ten-year need</span><h3>1.5 TW</h3><p>Clean generation required over the next ten to twelve years. Whoever contracts it early builds the cheapest compute.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}

function Platform() {
  return (
    <>
      <PageHead eyebrow="Platform" title="One stack, from the substation to the token."
        lede="Four products that share a control plane, a commercial model, and a single owner of uptime." />
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Products</Eyebrow>
          <div className="cards two">
            {PRODUCTS.map((p) => (<Card key={p.slug} k={p.key} title={p.name} body={p.blurb} href={"#/platform/" + p.slug} />))}
          </div>
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Architecture</Eyebrow>
          <Split left={<>
            <h2>Six Planes, One System</h2>
            <p className="note">Energy is a first-class domain in the platform, not an input to a placement decision. That is what lets a training run be attributed back to the electrons that powered it.</p>
          </>}>
            <Spec rows={PLANES} style={{ marginTop: 0 }} />
          </Split>
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Commitments</Eyebrow>
          <Split left={<h2>What You Can Hold Us To</h2>}>
            {COMMITMENTS.map(([t, b, i], n) => (<Item key={t} n={n + 1} title={t} body={b} icon={i} />))}
          </Split>
        </div>
      </section>
    </>
  );
}

function ProductPage({ slug }) {
  const p = bySlug(slug);
  if (!p) return <NotFound />;
  return (
    <>
      <PageHead eyebrow={p.kicker} lede={p.lede}
        title={<>{p.name} <span className="b">— {p.tagline}</span></>} />
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Capabilities</Eyebrow>
          <Split left={<h2>{p.name}</h2>}>
            {p.caps.map(([t, b, i], n) => (<Item key={t} n={n + 1} title={t} body={b} icon={i} />))}
          </Split>
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Specification</Eyebrow>
          <Spec rows={p.spec} />
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Pairs with</Eyebrow>
          <div className="cards two">
            {p.related.map((s) => {
              const r = bySlug(s);
              return <Card key={s} k={r.key} title={r.name} body={r.blurb} href={"#/platform/" + s} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function Solutions() {
  return (
    <>
      <PageHead eyebrow="Solutions" title="Different workloads want different power."
        lede="A thirty-day training run and a spiky consumer endpoint are not the same customer. Here is how each one is usually put together." />
      {SOLUTIONS.map((s) => (
        <React.Fragment key={s.id}>
          <Rule />
          <section id={s.id}>
            <div className="frame section">
              <Eyebrow>{s.eyebrow}</Eyebrow>
              <Split left={<><h2>{s.h}</h2><p className="note">{s.note}</p></>}>
                {s.items.map(([t, b, i], n) => (<Item key={t} n={n + 1} title={t} body={b} icon={i} />))}
              </Split>
            </div>
          </section>
        </React.Fragment>
      ))}
    </>
  );
}

function Company() {
  return (
    <>
      <PageHead eyebrow="Company" title="The infrastructure layer for India's AI economy."
        lede="Founded by operators who have built energy assets and scaled physical businesses in India — and who think the AI build-out will be decided by power, not procurement." />
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Why we exist</Eyebrow>
          <Split left={<h2>Energy Is The Defining Constraint</h2>}>
            <div className="prose" style={{ marginTop: 0 }}>
              <p>India will add AI load to a grid already growing faster than almost any other on earth. Peak demand crossed 257 GW in 2026 and is expected to approach 425 GW by the middle of the next decade. Against that backdrop, a gigawatt-class AI campus is not a real-estate project. It is an energy project with servers in it.</p>
              <p>The usual approach is to build the data centre and buy power later. That works until the interconnection queue, the evening ramp or a tariff revision arrives — and then the most expensive assets in the building sit idle waiting for electrons.</p>
              <p>Curiosity runs the stack the other way round. We contract the supply, build the hall around it, and expose the result as a cloud. Three layers, one owner, and one number to answer for: what delivered compute costs, and what it cost the grid.</p>
            </div>
          </Split>
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>How we work</Eyebrow>
          <Split left={<><h2>Four Commitments</h2><p className="note">Each one has cost us a deal at some point. They stay.</p></>}>
            {[
              ["Dates over hype", "We quote what the energisation schedule supports. A slower honest date beats a fast one nobody can hold.", "clock"],
              ["Measured, then published", "Carbon-free matching is reported hourly and footnoted. Modelled numbers are labelled as modelled.", "bolt"],
              ["Open at the edges", "Standard schedulers, S3-compatible storage, open-weight inference. Switching away should be boring.", "grid"],
              ["Built in India, for India", "Operations, support and data stay in country. Sovereignty is an architecture decision, not a marketing line.", "shield"]
            ].map(([t, b, i], n) => (<Item key={t} n={n + 1} title={t} body={b} icon={i} />))}
          </Split>
        </div>
      </section>
      <Rule />
      <section id="founders">
        <div className="frame section">
          <Eyebrow>Founders</Eyebrow>
          <div className="split" style={{ marginTop: 40 }}>
            <div>
              <h2>Operators, Not Landlords</h2>
              <p className="note">Between them: gigawatt-scale solar development, national EV fleet operations, and two decades of building physical infrastructure in Indian markets.</p>
            </div>
            <div className="team" style={{ marginTop: 0, gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
              <div className="member">
                <div className="avatar" /><h3>Punit K Goyal</h3><p className="role">Founder &amp; CEO</p>
                <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.55, marginTop: 12 }}>Co-founder of BluSmart; earlier PLG Power and PLG Photovoltaic. Two decades building renewable and mobility infrastructure at national scale.</p>
              </div>
              <div className="member">
                <div className="avatar" /><h3>Raman Ladda</h3><p className="role">Co-founder &amp; CBO</p>
                <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.55, marginTop: 12 }}>Co-founder of Infisol Energy. Runs the commercial side: offtake, structuring, and the relationships behind long-dated capacity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Rule />
      <section id="careers">
        <div className="frame section">
          <Eyebrow>Careers</Eyebrow>
          <div className="cards">
            <Card k="Energy · Mumbai" title="Head of Power Contracting" body="Structure captive and group-captive supply for gigawatt-scale AI load across states." href="#/contact" go="Apply" />
            <Card k="Platform · Pune" title="Staff Engineer, Control Plane" body="Own scheduling and metering across sites: one pool, many halls, honest numbers." href="#/contact" go="Apply" />
            <Card k="Sites · Field" title="Commissioning Lead, Data Centres" body="Take liquid-cooled halls from energisation to first customer job without drama." href="#/contact" go="Apply" />
          </div>
        </div>
      </section>
    </>
  );
}

function Blog() {
  return (
    <>
      <PageHead eyebrow="Blog" title="Notes from building the layer under the models."
        lede="Power markets, cooling, scheduling, and the unglamorous engineering that decides when capacity actually arrives." />
      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Latest</Eyebrow>
          <div className="posts">
            {POSTS.map((p) => (
              <a className="post-row" key={p.slug} href={"#/blog/" + p.slug}>
                <div className="meta">{p.date} · {p.read}</div>
                <div><h3>{p.title}</h3><p>{p.excerpt}</p></div>
                <span className="tag">{p.tag}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Post({ slug }) {
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const full = slug === "interconnection-queue";
  return (
    <>
      <section>
        <div className="frame page-head" style={{ paddingBottom: 0 }}>
          <Eyebrow>{p.tag} · {p.date} · {p.read}</Eyebrow>
          <h1 style={{ marginTop: 26, fontSize: "clamp(32px,4.4vw,58px)", maxWidth: "20ch" }}>{p.title}</h1>
          <p className="lede">{p.excerpt}</p>
          <div className="terrain-wrap" style={{ marginTop: 20 }}><Terrain variant="band" /></div>
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame section">
          <div className="prose">
            {full ? (
              <>
                <p>Ask a team why their cluster is late and the answer is usually “allocation”. Ask the people building the hall it was going into and you get a different answer: the connection agreement, the transformer lead time, and evacuation capacity at the nearest substation.</p>
                <h2>Two clocks, wildly different speeds</h2>
                <p>Accelerator procurement runs on a commercial clock — contracts, allocations, shipping. Grid connection runs on a regulatory and physical one: studies, approvals, long-lead equipment, and construction that cannot be compressed by paying more.</p>
                <ul>
                  <li>Hardware: order to rack, measured in months.</li>
                  <li>Power: application to energisation, frequently measured in years.</li>
                  <li>Everything else — land, cooling, fibre — sits between the two and is rarely the binding constraint.</li>
                </ul>
                <blockquote>If your site does not already hold a power position, your GPU order is a depreciation schedule with a delivery date attached.</blockquote>
                <h2>What a power position actually means</h2>
                <p>It is not a signed tariff. It is a specific combination: a connection agreement at a known capacity, generation contracted close enough to matter, storage sized for the shape of the load, and a schedule where energisation leads the rack build rather than trailing it.</p>
                <pre><code>{"# the only build sequence that holds a date\nconnection agreement  ->  generation + storage contracted\n                      ->  hall construction\n                      ->  racks, fabric, burn-in\n                      ->  first customer job"}</code></pre>
                <h2>How we sequence it</h2>
                <p>We take sites where the queue position exists before design work starts, contract supply around the load curve rather than the annual average, and publish the energisation date we are underwriting. Customers get a handover date tied to that schedule, and a price tied to contracted power rather than a spot tariff.</p>
                <p>It is also why energy sits inside our control plane instead of beside it: the same forecast that decides dispatch decides what we can promise you next quarter. More on that in <a href="#/platform">the platform architecture</a>.</p>
              </>
            ) : (
              <p>This post is queued for publication. In the meantime, <a href="#/blog/interconnection-queue">the piece on interconnection queues</a> covers the same ground from the power side.</p>
            )}
            <p><a href="#/blog">← All posts</a></p>
          </div>
        </div>
      </section>
    </>
  );
}

function Docs() {
  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.history.replaceState) window.history.replaceState(null, "", "#/docs/" + id);
  };
  return (
    <>
      <section>
        <div className="frame page-head" style={{ paddingBottom: 30 }}>
          <Eyebrow>Documentation</Eyebrow>
          <h1 style={{ marginTop: 26, fontSize: "clamp(34px,4.6vw,56px)" }}>From account to first job in about fifteen minutes.</h1>
          <p className="lede">Install the CLI, launch a cluster out of your pool, run a job, and read back what it consumed.</p>
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame">
          <div className="docs">
            <aside className="docs-nav">
              {DOC_NAV.map(([group, links]) => (
                <div key={group}>
                  <h4>{group}</h4>
                  {links.map(([id, label]) => (
                    <a key={id} href={"#/docs/" + id} onClick={go(id)}>{label}</a>
                  ))}
                </div>
              ))}
            </aside>
            <div className="docs-body prose">
              <h2 id="quickstart" style={{ marginTop: 0 }}>Quickstart</h2>
              <p>You need an API key from <strong>Console → Keys</strong> and either an active reservation or an on-demand entitlement.</p>
              <pre><code>{'curl -fsSL https://get.curiosity.cloud | sh\ncuriosity auth login --key "ck_live_..."\ncuriosity pools list'}</code></pre>

              <h2 id="concepts">Core concepts</h2>
              <Spec rows={[
                ["Pool", "Capacity you hold — reserved for a term, or drawn on demand."],
                ["Cluster", "Nodes carved out of a pool, with a fabric, an image and a scheduler."],
                ["Region", "A site with its own power profile, fabric domain and storage."],
                ["Power profile", "The supply arrangement behind a workload, e.g. 24x7-cfe or grid-firm."],
                ["Attribution", "Energy, carbon-free share and cost, resolved down to a job id."]
              ]} />

              <h2 id="clusters">Launch a cluster</h2>
              <pre><code>{"curiosity clusters create \\\n  --region in-mh-1 \\\n  --accelerator h200 --nodes 64 \\\n  --fabric ib-400g \\\n  --scheduler slurm \\\n  --power-profile 24x7-cfe\n\ncuriosity clusters ssh my-cluster\nsrun --nodes=64 --gpus-per-node=8 train.sh"}</code></pre>
              <p>Clusters keep their identity across restarts, so checkpoints, mounts and host keys survive a drain.</p>

              <h2 id="storage">Storage and data</h2>
              <Spec rows={[
                ["Scratch", "Parallel NVMe attached to the fabric; sized per cluster, wiped on teardown."],
                ["Object", "S3-compatible, region-local, versioned, with lifecycle rules."],
                ["Cache", "Dataset cache close to the accelerators for repeated epochs."],
                ["Transfer", "Private link, direct connect, or physical seeding for first loads."]
              ]} />

              <h2 id="inference">Serve a model</h2>
              <pre><code>{'curiosity endpoints create \\\n  --model catalogue/open-70b-instruct \\\n  --region in-mh-1 --min-replicas 1 --max-replicas 12\n\ncurl https://api.curiosity.cloud/v1/chat/completions \\\n  -H "Authorization: Bearer $CURIOSITY_API_KEY" \\\n  -d \'{"model":"open-70b-instruct","messages":[...]}\''}</code></pre>
              <p>The endpoint is OpenAI-compatible, so most SDKs work by changing the base URL.</p>

              <h2 id="energy">Energy attribution</h2>
              <pre><code>{'curiosity usage energy --job train-7b-0812 --format json\n\n{\n  "job": "train-7b-0812",\n  "kwh": 41820.6,\n  "carbon_free_pct": 82.4,\n  "region": "in-mh-1",\n  "power_profile": "24x7-cfe"\n}'}</code></pre>
              <p>Hourly matched percentages come from metered generation, storage discharge and grid import at the site. Modelled values are flagged in the response.</p>

              <h2 id="regions">Regions</h2>
              <Spec rows={[
                ["in-mh-1", "Maharashtra · liquid-cooled · IB 400G · general availability"],
                ["in-mh-2", "Maharashtra · expansion hall · accepting reservations"],
                ["in-gj-1", "Gujarat · renewable-adjacent · in build"]
              ]} />

              <h2 id="api">API</h2>
              <Spec rows={[
                ["GET /v1/pools", "Reservations, entitlements and remaining capacity."],
                ["POST /v1/clusters", "Create a cluster from a pool. Returns a cluster id."],
                ["GET /v1/clusters/:id", "State, node health, fabric topology, scheduler endpoint."],
                ["POST /v1/endpoints", "Create or update an inference endpoint."],
                ["GET /v1/usage/energy", "kWh, carbon-free share and cost by job, cluster or project."]
              ]} />
              <p>Bearer auth, cursor pagination, 600 requests per minute per key.</p>

              <h2 id="changelog">Changelog</h2>
              <ul>
                <li><strong>2026.08</strong> — Per-job energy attribution in the usage API; <code>in-mh-2</code> open for reservations.</li>
                <li><strong>2026.07</strong> — Managed Kubernetes on reserved pools; dataset cache at the fabric edge.</li>
                <li><strong>2026.06</strong> — Bring-your-own-weights endpoints; private link into customer VPCs.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", need: "Reserved GPU cluster", size: "", when: "", detail: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const ready = form.name.trim() && form.email.trim();
  return (
    <>
      <PageHead eyebrow="Request capacity" title="Tell us the shape and the date."
        lede="An engineer and a power lead read every request. You get a site, a profile and a delivery schedule — or an honest reason we are not the right fit." />
      <Rule />
      <section>
        <div className="frame section">
          <div className="split">
            <div>
              <h2>What Happens Next</h2>
              <p className="note">Usually one call, then numbers.</p>
              <div style={{ marginTop: 34 }}>
                <Item n={1} title="A sizing call" body="Thirty minutes on the workload, the growth curve and the date that actually matters." icon="clock" />
                <Item n={2} title="A site and a profile" body="We come back with a region, a power profile, and what it costs at your shape." icon="bolt" />
                <Item n={3} title="A schedule you can plan against" body="Energisation, rack build and handover dates, with the commercial terms attached." icon="grid" />
              </div>
              <p className="note" style={{ marginTop: 34 }}>
                Prefer email? <a className="link" href="#/contact">hello@curiosity.cloud</a><br />Vaswani Chambers, Worli, Mumbai
              </p>
            </div>
            <div>
              <Eyebrow>Capacity request</Eyebrow>
              {sent ? (
                <div className="sent" style={{ display: "block" }}>Request received. Someone from the capacity team replies within one business day.</div>
              ) : (
                <div className="form" style={{ marginTop: 26 }}>
                  <div className="field"><label htmlFor="name">Name</label><input id="name" value={form.name} onChange={set("name")} /></div>
                  <div className="field"><label htmlFor="email">Work email</label><input id="email" type="email" value={form.email} onChange={set("email")} /></div>
                  <div className="field"><label htmlFor="company">Organisation</label><input id="company" value={form.company} onChange={set("company")} /></div>
                  <div className="field"><label htmlFor="need">What you need</label>
                    <select id="need" value={form.need} onChange={set("need")}>
                      <option>Reserved GPU cluster</option>
                      <option>On-demand capacity</option>
                      <option>Managed inference</option>
                      <option>Colocation or managed racks</option>
                      <option>Power / offtake conversation</option>
                    </select>
                  </div>
                  <div className="field"><label htmlFor="size">Approximate size</label><input id="size" placeholder="e.g. 64 nodes, or 3 MW" value={form.size} onChange={set("size")} /></div>
                  <div className="field"><label htmlFor="when">Needed by</label><input id="when" placeholder="e.g. Q1 2027" value={form.when} onChange={set("when")} /></div>
                  <div className="field full"><label htmlFor="detail">Workload</label>
                    <textarea id="detail" placeholder="Training or inference, framework, storage and networking needs, residency or compliance constraints." value={form.detail} onChange={set("detail")} />
                  </div>
                  <div className="field full">
                    <button className="btn btn-primary" type="button" disabled={!ready} onClick={() => setSent(true)}>
                      Send request <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              )}
              <p className="form-note">This does not go into a nurture sequence. A human reads it.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function NotFound() {
  return (
    <section>
      <div className="frame err">
        <p className="code">HTTP 404 · NOT FOUND</p>
        <h1 style={{ marginTop: 24, fontSize: "clamp(40px,6vw,86px)" }}>This route has <span className="b">no power.</span></h1>
        <p className="lede">Nothing is energised at this address. Try the platform, the docs, or start from home.</p>
        <div className="hero-actions" style={{ marginTop: 30 }}>
          <a className="btn btn-primary" href="#/">Back to home <span aria-hidden="true">→</span></a>
          <a className="btn btn-ghost" href="#/docs">View docs</a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- app */
const parse = () => {
  const raw = (window.location.hash || "#/").replace(/^#\/?/, "");
  return raw.split("/").filter(Boolean);
};

export default function CuriosityCloud() {
  const [route, setRoute] = useState(parse);

  useEffect(() => {
    const onHash = () => setRoute(parse());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const anchor = route[1];
    const needsAnchor = ["solutions", "company", "docs"].indexOf(route[0]) > -1 && anchor;
    if (needsAnchor) {
      const el = document.getElementById(anchor);
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  let page, showCta = true;
  switch (route[0]) {
    case undefined: page = <Home />; break;
    case "platform": page = route[1] ? <ProductPage slug={route[1]} /> : <Platform />; break;
    case "solutions": page = <Solutions />; break;
    case "company": page = <Company />; break;
    case "blog": page = route[1] ? <Post slug={route[1]} /> : <Blog />; break;
    case "docs": page = <Docs />; break;
    case "contact": page = <Contact />; showCta = false; break;
    default: page = <NotFound />;
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="cc-root">
        <Header route={route} />
        {page}
        {showCta && <CTA />}
        <Footer />
      </div>
    </>
  );
}
