import { useId } from 'react';

/** Original vector storyboard artwork; never presented as a generated video frame. */
export function PrototypeFrame({ scene, decorative = false }: { scene: number; decorative?: boolean }) {
  const id = useId().replace(/:/g, '');
  const dawn = scene === 5;
  const close = scene === 2;
  const lit = scene >= 2;
  const position = [505, 480, 440, 535, 430, 570][scene];
  return <svg viewBox="0 0 960 540" className="prototype-art" role={decorative ? undefined : 'img'} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : ['A cloaked traveller arrives in a moonlit mountain valley', 'The traveller crosses a stone bridge above misty water', 'A golden lantern illuminates the traveller’s cloak', 'The traveller shelters a lantern from the wind', 'The traveller follows a glowing trail between mountains', 'The traveller reaches a ridge at sunrise'][scene]}>
    <defs>
      <linearGradient id={`${id}-sky`} x2="0.2" y2="1"><stop stopColor={dawn ? '#93725c' : '#283c40'} /><stop offset=".56" stopColor={dawn ? '#dbb17b' : '#61766e'} /><stop offset="1" stopColor={dawn ? '#e7cf9c' : '#b3b18b'} /></linearGradient>
      <linearGradient id={`${id}-water`} x2="0" y2="1"><stop stopColor="#7e9c8b" /><stop offset="1" stopColor="#172f34" /></linearGradient>
      <radialGradient id={`${id}-glow`}><stop stopColor="#ffe4a0" stopOpacity=".7" /><stop offset=".25" stopColor="#e6ae56" stopOpacity=".32" /><stop offset="1" stopColor="#e5ac54" stopOpacity="0" /></radialGradient>
      <linearGradient id={`${id}-cloak`} x2="1" y2=".5"><stop stopColor="#4d4533" /><stop offset=".45" stopColor="#9f8051" /><stop offset="1" stopColor="#cfaa67" /></linearGradient>
      <filter id={`${id}-grain`}><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncA type="linear" slope=".13" /></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light" /></filter>
    </defs>
    <g filter={`url(#${id}-grain)`}>
      <path fill={`url(#${id}-sky)`} d="M0 0h960v540H0z" />
      <circle cx={dawn ? 660 : 685} cy={dawn ? 230 : 128} r={dawn ? 51 : 27} fill="#f3e6bf" opacity=".8" />
      <path d="M0 225 117 118 185 179 292 66 411 222 504 147 616 267 757 102 960 239V540H0Z" fill={dawn ? '#8a8973' : '#48605d'} opacity=".65" />
      <path d="M0 310 100 255 224 287 366 204 453 282 583 237 690 320 832 240 960 291V540H0Z" fill={dawn ? '#626e5d' : '#344e4c'} />
      <path d="M0 363Q220 298 418 352T960 338V540H0Z" fill="#a8b5a0" opacity=".16" />
      <path d="M0 399Q172 353 348 401T960 381V540H0Z" fill="#c6c8ab" opacity=".12" />
      {scene === 1 ? <>
        <path d="M0 413h960v127H0z" fill={`url(#${id}-water)`} />
        <path d="M-30 359Q480 255 990 359L990 425Q480 300-30 425Z" fill="#283a36" />
        <path d="M-30 359Q480 255 990 359" fill="none" stroke="#839080" strokeWidth="8" />
        <path d="M120 466h200m160 26h270M560 448h300" stroke="#b7b998" opacity=".2" />
      </> : <>
        <path d="M0 402Q150 346 318 416T650 399L960 366V540H0Z" fill="#213c3a" />
        <path d={scene === 4 ? 'M432 540Q560 454 517 419T573 366Q604 347 650 343' : 'M375 540Q648 446 566 408T618 350'} stroke={lit ? '#a89b64' : '#6f7e65'} strokeWidth={scene === 4 ? 19 : 28} opacity=".5" fill="none" />
      </>}
      {(scene === 0 || scene === 3 || scene === 4) && <g fill="#193331">
        {[30, 115, 835, 917].map((x, i) => <g key={x} transform={`translate(${x} ${[0, 38, 22, -18][i]})`}><path d="M-8 450 0 110 9 450Z" /><path d="M0 116-62 283-21 274-86 359H75L24 276 57 284Z" /></g>)}
      </g>}
      {scene === 3 && <g stroke="#d3cfab" fill="none" opacity=".35"><path d="M160 213Q340 169 469 212M206 243Q380 204 570 248M620 192l104-24" /><path d="m330 188 15-7-9 14m380 99 16-7-9 15" stroke="#c7ae76" strokeWidth="3" /></g>}
      <g transform={`translate(${position} ${scene === 1 ? 303 : close ? 430 : 410}) scale(${close ? 2.5 : scene === 5 ? .7 : 1})`}>
        {lit && <circle cx="38" cy="-9" r="95" fill={`url(#${id}-glow)`} />}
        <ellipse cx="5" cy="65" rx="38" ry="8" fill="#102a29" opacity=".7" />
        <path d="m-12 28-6 35h12L2 27m12-1 8 37h12L23 22" stroke="#182a29" strokeWidth="9" fill="none" />
        <path d={scene === 3 ? 'M-13-46Q-39-10-63 38L23 42 32-6 14-48Z' : 'M-13-46Q-26-16-29 42L30 43 23-19 14-48Z'} fill={`url(#${id}-cloak)`} />
        <path d="M-5-44Q-8-7 4 32" fill="none" stroke="#dcc392" opacity=".35" strokeWidth="2" />
        <ellipse cx="2" cy="-57" rx="12" ry="16" fill="#9b8360" />
        <path d="M-10-53Q-17-80 5-76 20-75 15-53L7-62-4-57Z" fill="#182d2b" />
        <path d="m15-32 16 16 9-1" fill="none" stroke="#bda06c" strokeWidth="8" strokeLinecap="round" />
        <path d="M35-11v-7q5-8 10 0v7" fill="none" stroke="#c1a26b" strokeWidth="2" />
        <path d="M33-10h15l-1 23H34Z" fill={lit ? '#ffd88a' : '#52645a'} stroke="#ccac70" strokeWidth="2" />
        <path d="M32-12h17M32 15h17m-9-25v24" stroke="#ae8e54" strokeWidth="2" />
      </g>
      <path d="M0 502q95-28 170 4t157 7m427 6q116-32 206-3v24H0v-27Z" fill="#152e2c" />
      <g stroke="#688272" opacity=".6"><path d="m52 526-9-30m9 30 14-22m823 22 9-35m-9 35-15-20m-680 26-8-19" /></g>
    </g>
  </svg>;
}
