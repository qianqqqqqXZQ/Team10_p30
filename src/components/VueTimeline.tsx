import { useEffect, useRef } from 'react';
import { createApp } from 'vue';
import Timeline from './Timeline.vue';
import { phases } from '../data/bid';

export function VueTimeline() {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!element.current) return;
    const app = createApp(Timeline, { phases });
    app.mount(element.current);
    return () => app.unmount();
  }, []);
  return <div ref={element} className="vue-timeline-host" />;
}
