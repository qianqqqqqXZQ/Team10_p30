import { useState } from 'react';

export function CinemaImage({ src, className = '', eager = false }: { src: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  return <div className={`cinema-image ${className} ${failed ? 'image-unavailable' : ''}`}>
    {failed ? <span className="mono">Cinematic reference</span> : <img src={src} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />}
  </div>;
}
