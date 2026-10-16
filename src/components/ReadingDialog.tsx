import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  label: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}

export function ReadingDialog({ title, label, onClose, children, wide = false }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const active = document.activeElement as HTMLElement | null;
    const node = dialog.current;
    node?.showModal();
    const focusFrame = requestAnimationFrame(() => node?.querySelector<HTMLButtonElement>('.dialog-close')?.focus());
    document.body.classList.add('reading-open');
    return () => {
      cancelAnimationFrame(focusFrame);
      node?.close();
      document.body.classList.remove('reading-open');
      active?.focus({ preventScroll: true });
    };
  }, []);

  return <dialog ref={dialog} className={`reading-dialog ${wide ? 'reading-dialog-wide' : ''}`} aria-labelledby="reading-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onKeyDown={(event) => {
    if (event.key !== 'Tab') return;
    const targets = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]')).filter((element) => element.getClientRects().length > 0);
    const first = targets[0];
    const last = targets[targets.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="reading-shell" data-lenis-prevent>
      <header className="reading-header"><span className="mono">{label}</span><button type="button" className="dialog-close" onClick={onClose} aria-label="Close reading panel" autoFocus><span>Close</span><span aria-hidden="true">×</span></button></header>
      <div className="reading-body"><h2 id="reading-title">{title}</h2>{children}</div>
      <footer className="reading-footer mono"><span>UNNC GRP Team202610</span><span>Bid for [P30] · October 15, 2026</span></footer>
    </div>
  </dialog>;
}
