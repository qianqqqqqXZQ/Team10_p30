import { useState } from 'react';
import { prototypeDefaults, prototypeDuration, prototypeExample, prototypeOptions, prototypeShots } from '../data/prototype';
import { PrototypeFrame } from './PrototypeFrame';
import './prototype.css';

type View = 'Story' | 'Storyboard' | 'Export';

export function PrototypeStudio() {
  const [view, setView] = useState<View>('Storyboard');
  const [selected, setSelected] = useState(0);
  const [premise, setPremise] = useState(prototypeExample.premise);
  const [settings, setSettings] = useState({ ...prototypeDefaults });
  const shot = prototypeShots[selected];
  const reset = () => { setView('Storyboard'); setSelected(0); setPremise(prototypeExample.premise); setSettings({ ...prototypeDefaults }); };
  return <div className="prototype-shell reveal">
    <header className="studio-header">
      <div className="studio-identity"><span className="studio-symbol" aria-hidden="true">✳</span><div><h3>From Prompt to Film</h3><p className="mono">Proposed UI concept</p></div></div>
      <div className="studio-views" role="group" aria-label="Prototype views">{(['Story', 'Storyboard', 'Export'] as const).map((item, index) => <button key={item} type="button" aria-pressed={view === item} onClick={() => setView(item)}><span className="mono">0{index + 1}</span>{item}</button>)}</div>
      <span className="studio-demo mono"><i />Interactive concept</span>
    </header>
    <div className="studio-body">
      <aside className="studio-inputs" aria-label="Story settings">
        <div className="studio-panel-heading"><h4>Your story</h4><span className="mono">01 / Input</span></div>
        <div className="studio-field studio-premise"><label htmlFor="prototype-premise">Story premise</label><textarea id="prototype-premise" value={premise} onChange={(event) => setPremise(event.target.value)} /></div>
        <p className="studio-hint">Explore a prewritten example. Editing the story or settings will not generate new scenes.</p>
        {(['genre', 'style', 'language'] as const).map((key) => <div className="studio-field" key={key}><label htmlFor={`prototype-${key}`}>{({ genre: 'Genre', style: 'Visual style', language: 'Voiceover language' })[key]}</label><select id={`prototype-${key}`} value={settings[key]} onChange={(event) => setSettings((current) => ({ ...current, [key]: event.target.value }))}>{prototypeOptions[({ genre: 'genres', style: 'styles', language: 'languages' } as const)[key]].map((value) => <option key={value}>{value}</option>)}</select></div>)}
        <div className="studio-scope"><span className="mono">Example scope</span><p><strong>01</strong> character <span> / </span><strong>06</strong> shots</p><p><strong>{prototypeDuration}s</strong> storyboard duration</p></div>
        <button type="button" className="studio-reset" onClick={reset}><span aria-hidden="true">↺</span> Reset example</button>
      </aside>
      <div className="studio-workspace">
        <div className="studio-workspace-heading"><div><span className="mono">Sample project / Fantasy</span><h4>{prototypeExample.title}</h4></div><span className="studio-outline-badge mono">{prototypeDuration}s · 6 shots</span></div>
        {view === 'Storyboard' && <div className="studio-storyboard">
          <figure className="studio-preview"><PrototypeFrame scene={selected} /><div className="studio-preview-top mono"><span>Shot {shot.id} / 06</span><span>Illustrative storyboard</span></div><figcaption><span className="studio-subtitle">“{shot.subtitle}”</span><span className="studio-frame-footer mono"><span>Original vector illustration</span><span>{shot.duration}s / concept frame</span></span></figcaption></figure>
          <div className="studio-shot-detail" aria-live="polite" aria-atomic="true"><div><span className="mono">Scene {shot.id}</span><h4>{shot.title}</h4></div><div><p className="studio-camera">{shot.camera}</p><p>{shot.action}</p></div></div>
          <div className="studio-strip-heading mono"><span>Storyboard / select a shot</span><span>6 × 8 seconds</span></div>
          <div className="studio-shot-strip" role="group" aria-label="Storyboard shots">{prototypeShots.map((item, index) => <button key={item.id} type="button" aria-label={`Shot ${item.id}: ${item.title}`} aria-pressed={selected === index} onClick={() => setSelected(index)}><div className="studio-thumb"><PrototypeFrame scene={index} decorative /><span className="mono">{item.id}</span></div><span className="studio-thumb-name">{item.title}</span><span className="studio-thumb-duration mono">{item.duration}s</span></button>)}</div>
        </div>}
        {view === 'Story' && <div className="studio-story-view"><span className="studio-outline-badge mono">Prewritten example</span><h4>A light through the valley.</h4><p>{prototypeExample.premise}</p><p className="studio-hint">This outline belongs to the sample story. Your edited premise remains in the input panel.</p><ol>{prototypeShots.map((item) => <li key={item.id}><span className="mono">{item.id}</span><div><h4>{item.title}</h4><p>{item.action}</p></div><span className="mono">{item.duration}s</span></li>)}</ol></div>}
        {view === 'Export' && <div className="studio-export-view"><div className="studio-export-art"><PrototypeFrame scene={5} decorative /><span className="mono">Proposed output / MP4</span></div><h4>Export your micro-film</h4><p>Planned output settings for this {prototypeDuration}-second example. The preview is an illustration; no video has been generated.</p><dl>{[['Format', 'MP4'], ['Duration', `${prototypeDuration} seconds`], ['Shots', `${prototypeShots.length} × 8 seconds`], ['Genre', settings.genre], ['Visual style', settings.style], ['Voiceover', settings.language], ['Subtitles', 'Embedded · English'], ['AI content mark', 'Always on · AI-generated']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><button type="button" disabled className="studio-download">Download MP4 <span aria-hidden="true">↓</span></button><p className="studio-hint">Available in the proposed application</p></div>}
      </div>
      <aside className="studio-production" aria-label="Production settings">
        <div className="studio-panel-heading"><h4>Production</h4><span className="mono">02 / Setup</span></div>
        <div className="studio-character"><div className="studio-character-art"><PrototypeFrame scene={2} decorative /></div><span className="mono">Character reference / illustrated</span><h4>{prototypeExample.character}</h4><p>{prototypeExample.characterDetails}</p><span className="studio-reference-mark"><i />Same reference across shots</span></div>
        <div className="studio-audio"><span className="mono">Sound & finishing</span><dl><div><dt>Voiceover</dt><dd>{settings.language}<small>Planned language</small></dd></div><div><dt>Music direction</dt><dd>{prototypeExample.music}</dd></div><div><dt>Subtitles</dt><dd>English<span className="studio-enabled">Always on</span></dd></div><div><dt>AI content mark</dt><dd>AI-generated<span className="studio-enabled">Always on</span></dd></div></dl></div>
      </aside>
    </div>
    <footer className="studio-status"><span><i />Interface exploration · prewritten sample</span><span>No video or audio generation</span></footer>
  </div>;
}
