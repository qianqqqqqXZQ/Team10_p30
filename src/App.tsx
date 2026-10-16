import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { bid, filmImages, workflowImages, fitImage, members } from './data/bid';
import type { Member } from './data/bid';
import { CinemaImage } from './components/CinemaImage';
import { ReadingDialog } from './components/ReadingDialog';
import { TeamGallery } from './components/TeamGallery';
import { VueTimeline } from './components/VueTimeline';

gsap.registerPlugin(ScrollTrigger);

type Panel = 'full' | 'proposal' | 'technology' | 'credits' | Member | null;
const chapters = [
  { id: 'team', label: 'Teammates', number: '01' },
  { id: 'design', label: 'Ideas & design', number: '02' },
  { id: 'timeline', label: 'Timeline', number: '03' },
  { id: 'why-us', label: 'Why our team', number: '04' },
];
const workflow = [
  { title: 'Script & storyboard', tech: 'Transformers · Structured JSON', copy: 'A story premise, genre, language and visual style will become a structured screenplay and storyboard.', image: 0 },
  { title: 'Video & characters', tech: 'Diffusers · PyTorch · OpenCV', copy: 'Character references and video shots will connect visual generation with character-consistency checks.', image: 1 },
  { title: 'Voice & music', tech: 'Speech synthesis · Subtitles', copy: 'Mandarin/English voiceover, background music and embedded subtitles will support the narrative.', image: 2 },
  { title: 'Editing & export', tech: 'FFmpeg · MP4', copy: 'Approved clips, transitions and mixed audio will be assembled, checked and exported as a marked MP4.', image: 3 },
];

function Html({ content, className = '' }: { content: string; className?: string }) {
  return <div className={`prose ${className}`} dangerouslySetInnerHTML={{ __html: content }} />;
}

function SectionHeading({ number, eyebrow, children, description }: { number: string; eyebrow: string; children: ReactNode; description?: ReactNode }) {
  return <div className="section-heading reveal"><div className="section-eyebrow mono"><span>({number})</span><span>{eyebrow}</span></div><div className="section-heading-grid"><h2>{children}</h2>{description && <div className="section-description">{description}</div>}</div></div>;
}

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useRef<Lenis | null>(null);
  const [panel, setPanel] = useState<Panel>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState('');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const scroll = new Lenis({ duration: 1.05, smoothWheel: true, anchors: { offset: -90 } });
        lenis.current = scroll;
        scroll.on('scroll', ScrollTrigger.update);
        const tick = (time: number) => scroll.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.fromTo('.hero-line > span', { yPercent: 110 }, { yPercent: 0, duration: 1.15, stagger: 0.14, ease: 'power4.out', delay: 0.15 });
        gsap.fromTo('.hero-meta, .hero-kicker', { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.55 });
        gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
          gsap.fromTo(element, { y: 42, opacity: 0.15 }, { y: 0, opacity: 1, duration: 0.95, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 95%', once: true } });
        });
        return () => {
          gsap.ticker.remove(tick);
          scroll.destroy();
          lenis.current = null;
        };
      });
      media.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
        const track = document.querySelector<HTMLElement>('.reel-track')!;
        gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth + 48), ease: 'none', scrollTrigger: { trigger: '.reel-viewport', start: 'top 8%', end: () => `+=${Math.max(500, track.scrollWidth - window.innerWidth)}`, pin: true, scrub: 0.8, invalidateOnRefresh: true } });
        gsap.fromTo('.design-card', { y: (index) => [100, 35, 65, 125][index], rotation: (index) => [-7, -3, 3, 7][index] }, { y: 0, rotation: 0, ease: 'none', stagger: 0.035, scrollTrigger: { trigger: '.design-deck', start: 'top 92%', end: 'center 45%', scrub: 1 } });
        gsap.fromTo('.team-stage', { x: 100, y: 45 }, { x: 0, y: 0, ease: 'none', scrollTrigger: { trigger: '.team-gallery', start: 'top 90%', end: 'top 30%', scrub: 0.8 } });
      });
    }, root);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveChapter(entry.target.id); });
    }, { rootMargin: '-20% 0px -55% 0px' });
    chapters.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    let alive = true;
    void document.fonts.ready.then(() => { if (alive && !reduced.matches) ScrollTrigger.refresh(); });
    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
    const timeline = document.querySelector('.vue-timeline-host');
    if (timeline) resizeObserver.observe(timeline);
    return () => { alive = false; resizeObserver.disconnect(); observer.disconnect(); media.revert(); context.revert(); };
  }, []);

  useEffect(() => {
    if (panel || menuOpen) lenis.current?.stop();
    else lenis.current?.start();
  }, [panel, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [menuOpen]);

  const closePanel = () => setPanel(null);
  let dialogContent: ReactNode = null;
  if (panel && typeof panel === 'object') {
    dialogContent = <ReadingDialog title={panel.name} label={`Team202610 / ${panel.role}`} onClose={closePanel}>
      <Html content={panel.html} />
      <section className="profile-responsibility"><p className="mono">Proposed P30 responsibilities</p><p>{panel.responsibility}</p></section>
    </ReadingDialog>;
  } else if (panel === 'full') {
    dialogContent = <ReadingDialog title="Bid for [P30]" label="The full bid / October 15, 2026" onClose={closePanel} wide>
      <p className="reading-subtitle">{bid.title}</p>
      <p className="reading-team">{bid.team}</p>
      <div className="reading-toc mono">{['Introduction', 'Teammates', 'Ideas & Design', 'Timeline & Workflow', 'Conclusion'].map((label, index) => <button key={label} onClick={() => { const heading = document.querySelectorAll('.full-bid h2')[index]; heading?.scrollIntoView({ block: 'start', behavior: 'instant' }); }}><span>0{index + 1}</span>{label} ↗</button>)}</div>
      <Html content={bid.fullHtml} className="full-bid" />
    </ReadingDialog>;
  } else if (panel === 'proposal' || panel === 'technology') {
    dialogContent = <ReadingDialog title={panel === 'proposal' ? 'Project Proposal' : 'Technology Stack & System Design'} label="Ideas & design / P30" onClose={closePanel} wide><Html content={panel === 'proposal' ? bid.proposalHtml : bid.technicalHtml} /></ReadingDialog>;
  } else if (panel === 'credits') {
    dialogContent = <ReadingDialog title="Image & type credits" label="Visual references" onClose={closePanel}>
      <div className="prose"><p>The film stills used on this website are cinematic references selected from <a href="https://www.theartofcinema.xyz/" target="_blank" rel="noopener noreferrer">The Art of Cinema by @KrnDsgn</a>, the visual reference for this project. They are not team-generated work, member portraits or evidence of the proposed system’s output.</p><p>Film images remain the property of their respective rights holders. Local file sources are recorded in the project’s ASSETS.md and asset-sources.json.</p><h3>Typography</h3><p>Satoshi by Indian Type Foundry, distributed through <a href="https://www.fontshare.com/fonts/satoshi" target="_blank" rel="noopener noreferrer">Fontshare</a> under the <a href="https://www.fontshare.com/licenses/itf-free-font-license" target="_blank" rel="noopener noreferrer">ITF Free Font License</a>. Font files are hosted locally.</p><h3>Content</h3><p>All team and proposal content is based on the P30 bid dated October 15, 2026, archived in P30-materials. Proposed capabilities and milestones describe the team’s implementation plan.</p></div>
    </ReadingDialog>;
  }

  return <div ref={root} className="site-root">
    <a href="#main" className="skip-link">Skip to content</a>
    <header className={`site-header ${menuOpen ? 'menu-is-open' : ''}`}>
      <a className="brand" href="#top" aria-label="P30 home"><span className="brand-mark">P<span>30</span><i /></span><span className="brand-team">UNNC GRP <strong>Team202610</strong></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{chapters.map((chapter) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={activeChapter === chapter.id ? 'location' : undefined}>{chapter.label}</a>)}</nav>
      <button type="button" className="header-bid" onClick={() => setPanel('full')}>Read full bid <span aria-hidden="true">↗</span></button>
      <button type="button" className="mobile-menu-toggle mono" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close −' : 'Menu +'}</button>
      {menuOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">{chapters.map((chapter) => <a key={chapter.id} href={`#${chapter.id}`} onClick={() => setMenuOpen(false)}><span className="mono">{chapter.number}</span>{chapter.label}<span>↗</span></a>)}<button onClick={() => { setMenuOpen(false); setPanel('full'); }}>Read full bid ↗</button></nav>}
    </header>

    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-kicker mono"><span>Project bid — P30</span><span>University of Nottingham Ningbo China</span></div>
        <h1 id="hero-title"><span className="hero-line"><span>FROM PROMPT</span></span><span className="hero-line hero-line-second"><span>TO FILM<span className="title-period">.</span></span></span></h1>
        <div className="hero-meta"><p className="hero-subtitle">An AI-Empowered<br />Micro-Film Studio</p><a href="#cinema" className="scroll-cue"><span className="mono">Scroll to explore</span><span className="scroll-arrow" aria-hidden="true">↓</span></a><div className="hero-edition mono"><span>UNNC GRP Team202610</span><span>October 15, 2026</span></div></div>
      </section>

      <section id="cinema" className="cinema-reel" aria-label="Cinematic reference gallery">
        <div className="reel-viewport">
          <div className="reel-top mono"><span>Cinematic references</span><span>Not team-generated work</span></div>
          <div className="reel-track">{filmImages.map((src, index) => <figure key={src} className={`reel-frame reel-frame-${index % 6}`}><CinemaImage src={src} eager={index < 6} /><figcaption className="mono"><span>REF. {String(index + 1).padStart(2, '0')}</span><span>FILM STILL</span></figcaption></figure>)}</div>
          <div className="reel-bottom mono"><span>(The visual reference)</span></div>
        </div>
      </section>

      <section className="intro-section section-pad" aria-labelledby="intro-title">
        <div className="intro-label mono reveal"><span>(Introduction)</span><span>P30 / AI-Empowered Micro-Film Studio</span></div>
        <div className="intro-grid"><h2 id="intro-title" className="intro-statement reveal">We want to build a studio that turns a story premise into a watchable film.</h2><div className="intro-aside reveal"><p>With consistent characters, voiceover, music and subtitles. Our first demonstration will use one character and four to eight shots in a 30–60-second film.</p><button className="text-link" onClick={() => setPanel('proposal')}>Read the project proposal <span>↗</span></button></div></div>
        <details className="editorial-details"><summary>Introduction from the bid <span className="details-icon" /></summary><Html content={bid.introHtml} /></details>
      </section>

      <section className="team-section section-pad" id="team">
        <SectionHeading number="01" eyebrow="The people behind the proposal" description={<><p>Our seven-member team combines visual-model research, data preparation, application development and video-editing experience relevant to P30.</p><span className="small-note">Select a teammate to read their full profile.</span></>}>TEAMMATES<span className="heading-period">.</span></SectionHeading>
        <TeamGallery onSelect={setPanel} />
        <details className="editorial-details"><summary>Teamwork & proposed work distribution <span className="details-icon" /></summary><Html content={bid.teamIntroHtml} /><Html content={bid.workHtml} /></details>
      </section>

      <section className="design-section section-pad" id="design">
        <SectionHeading number="02" eyebrow="The proposed studio" description={<p>From a story premise to a downloadable MP4. Users will review storyboards, follow progress, preview clips and regenerate individual shots.</p>}>IDEAS &<br />DESIGN<span className="heading-period">.</span></SectionHeading>
        <div className="scope-row reveal"><div><strong>01</strong><span>Character in the first film</span></div><div><strong>04–08</strong><span>Shots in the first milestone</span></div><div><strong>30–60<span>s</span></strong><span>Initial demonstration</span></div><p>The delivery target is a coherent <strong>1–2-minute film</strong>, subject to measured GPU capacity and output quality.</p></div>
        <div className="design-deck">{workflow.map((item, index) => <article className="design-card" key={item.title}><div className="design-card-label mono"><span>0{index + 1} / Workflow</span><span>↗</span></div><CinemaImage src={workflowImages[item.image]} /><p className="reference-caption mono">Cinematic reference</p><div className="design-card-body"><h3>{item.title}</h3><p>{item.copy}</p><span className="card-technology mono">{item.tech}</span></div></article>)}</div>
        <div className="data-flow reveal"><span className="mono">Core data flow</span><p>Story & style <i>→</i> Storyboard JSON <i>→</i> Character references & shots <i>→</i> Voice, music & subtitles <i>→</i> FFmpeg <i>→</i> Quality checks <i>→</i> Marked MP4</p></div>
        <div className="design-details-grid"><details className="editorial-details"><summary>Project proposal & deliverables <span className="details-icon" /></summary><Html content={bid.proposalHtml} /></details><details className="editorial-details"><summary>Technology stack, evaluation & delivery <span className="details-icon" /></summary><Html content={bid.technicalHtml} /></details></div>
        <div className="stack-footer mono"><span>Proposed technology</span><p>Python / FastAPI / PyTorch / Transformers / Diffusers / Celery / Redis / SQLite / React / TypeScript / OpenCV / FFmpeg</p></div>
      </section>

      <section className="timeline-section section-pad" id="timeline">
        <SectionHeading number="03" eyebrow="The project schedule" description={<><p>21 October 2026 — 1 April 2027.<br />Early pilots in December, concentrated integration and evaluation in March.</p><span className="small-note">Select a phase to explore the planned work.</span></>}>TIMELINE &<br />WORKFLOW<span className="heading-period">.</span></SectionHeading>
        <VueTimeline />
        <details className="editorial-details"><summary>Workflow & collaboration from the bid <span className="details-icon" /></summary><Html content={bid.timelineIntroHtml} /></details>
      </section>

      <section className="fit-section section-pad" id="why-us">
        <SectionHeading number="04" eyebrow="Relevant preparation" description={<p>Research related to computer vision and LLMs, combined with dataset preparation, application development and delivery automation.</p>}>WHY OUR TEAM<br />FITS THIS<br />PROJECT<span className="heading-period">.</span></SectionHeading>
        <div className="fit-layout"><figure className="fit-image reveal"><CinemaImage src={fitImage} /><figcaption className="mono">Cinematic reference / Not team-generated work</figcaption></figure><div className="fit-evidence">{bid.fit.map((item, index) => <details key={item.title} className="fit-item" open={index === 0}><summary><span className="mono">0{index + 1}</span><h3>{item.title}</h3><span className="details-icon" /></summary><p>{item.body}</p>{index === 0 && <button className="text-link" onClick={() => setPanel(members[0])}>Ziqian XIONG — profile & projects ↗</button>}{index === 1 && <button className="text-link" onClick={() => setPanel(members[1])}>Yun Xin NG — profile & experience ↗</button>}</details>)}</div></div>
        <div className="conclusion-block reveal"><span className="mono">Conclusion / from the bid</span><Html content={bid.conclusionHtml} /></div>
      </section>

      <footer className="site-footer section-pad"><div className="footer-top mono"><span>P30 / Bid report</span><span>October 15, 2026</span></div><p className="footer-title">FROM PROMPT<br />TO FILM<span>.</span></p><div className="footer-actions"><p>{bid.team}<br /><span>An AI-Empowered Micro-Film Studio</span></p><button className="footer-read" onClick={() => setPanel('full')}>Read full bid <span>↗</span></button></div><div className="footer-bottom mono"><button onClick={() => setPanel('credits')}>Image & type credits ↗</button><a href="https://www.theartofcinema.xyz/" target="_blank" rel="noopener noreferrer">Visual reference: The Art of Cinema ↗</a><a href="#top">Back to top ↑</a></div></footer>
    </main>
    {dialogContent}
  </div>;
}
