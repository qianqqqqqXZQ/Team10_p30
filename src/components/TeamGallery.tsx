import { useState } from 'react';
import { members } from '../data/bid';
import type { Member } from '../data/bid';

export function TeamGallery({ onSelect }: { onSelect: (member: Member) => void }) {
  const [active, setActive] = useState(0);
  return <div className="team-gallery">
    <div className="team-gallery-top"><p className="mono">07 members · UNNC GRP Team202610</p><div className="gallery-controls"><button type="button" aria-label="Previous teammate" disabled={active === 0} onClick={() => setActive(active - 1)}>←</button><span className="mono">{String(active + 1).padStart(2, '0')} / 07</span><button type="button" aria-label="Next teammate" disabled={active === members.length - 1} onClick={() => setActive(active + 1)}>→</button></div></div>
    <div className="team-stage" onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); setActive(Math.max(0, Math.min(6, active + (event.key === 'ArrowRight' ? 1 : -1)))); } }}>
      {members.map((member, index) => {
        const offset = index - active;
        const [first, ...rest] = member.name.split(' ');
        return <button key={member.name} type="button" className={`member-card ${offset === 0 ? 'is-active' : ''}`} style={{ '--offset': offset, '--curve': Math.abs(offset) ** 2, '--card-index': index } as React.CSSProperties} onClick={() => { if (index !== active) setActive(index); else onSelect(member); }} tabIndex={offset === 0 ? 0 : -1} aria-label={`${member.name}, ${member.role}. ${offset === 0 ? 'Read full profile' : 'Select teammate'}`} aria-hidden={Math.abs(offset) > 2}>
          <div className="member-card-top mono"><span>Team202610</span><span>{member.role}</span></div>
          <span className="member-card-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div className="member-card-name"><span>{first}{rest.length > 1 ? ` ${rest.shift()}` : ''}</span><strong>{rest.join(' ')}</strong></div>
          <div className="member-tags mono">{member.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <p className="member-summary">{member.intro.split('. ')[0]}.</p>
          <span className="member-card-link">View profile <span aria-hidden="true">↗</span></span>
        </button>;
      })}
    </div>
    <div className="member-index" aria-label="Choose a teammate">{members.map((member, index) => <button key={member.name} type="button" className={index === active ? 'selected' : ''} aria-pressed={index === active} onClick={() => setActive(index)}><span className="mono">{String(index + 1).padStart(2, '0')}</span><span>{member.name}</span></button>)}</div>
  </div>;
}
