export interface PrototypeShot {
  id: string;
  title: string;
  duration: number;
  camera: string;
  action: string;
  subtitle: string;
}

export const prototypeExample = {
  title: 'The lantern path',
  premise: 'A lone traveller carries an unlit lantern into a forgotten valley. Crossing a stone bridge, they discover a light that reveals a hidden path. Through rising wind and darkness, they follow its glow until dawn.',
  character: 'A lone traveller',
  characterDetails: 'Ochre cloak · dark hair · brass lantern. The same silhouette and reference colours across all six shots.',
  music: 'Ambient strings · gradual rise',
};

export const prototypeOptions = {
  genres: ['Romance', 'Sci-fi', 'Fantasy', 'Thriller', 'Wuxia'],
  styles: ['Painterly cinema', 'Soft illustration', 'Graphic silhouette'],
  languages: ['English', 'Mandarin'],
} as const;

export const prototypeDefaults = { genre: 'Fantasy', style: 'Painterly cinema', language: 'English' };

export const prototypeShots: PrototypeShot[] = [
  { id: '01', title: 'Arrival', duration: 8, camera: 'Wide shot · slow push in', action: 'The traveller enters a quiet valley beneath a pale moon. An unlit lantern hangs at their side.', subtitle: 'Beyond the mountains, a path was waiting.' },
  { id: '02', title: 'The stone bridge', duration: 8, camera: 'Wide profile · tracking shot', action: 'A narrow stone bridge crosses the mist. The traveller pauses above the still water.', subtitle: 'The old bridge remembered every crossing.' },
  { id: '03', title: 'A small light', duration: 8, camera: 'Medium close-up · locked camera', action: 'The brass lantern catches a small golden flame, illuminating the traveller’s ochre cloak.', subtitle: 'One small light was enough to begin.' },
  { id: '04', title: 'Rising wind', duration: 8, camera: 'Medium wide · gentle handheld', action: 'Wind moves through the tall trees. The traveller shields the flame and continues forward.', subtitle: 'Even the wind could not take it away.' },
  { id: '05', title: 'The hidden path', duration: 8, camera: 'Rear wide shot · slow follow', action: 'A trail of reflected light appears between the dark hills. The same traveller follows it into the valley.', subtitle: 'Step by step, the valley showed the way.' },
  { id: '06', title: 'Dawn', duration: 8, camera: 'Extreme wide · slow pull back', action: 'Morning breaks over the mountains. The traveller reaches the ridge, lantern still glowing.', subtitle: 'And at the edge of night, morning found them.' },
];

export const prototypeDuration = prototypeShots.reduce((total, shot) => total + shot.duration, 0);
