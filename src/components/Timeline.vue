<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Phase } from '../data/bid';

const props = defineProps<{ phases: Phase[] }>();
const selected = ref(0);
const current = computed(() => props.phases[selected.value]);
const months = [
  { label: 'Oct', year: '2026', start: '2026-10-01', end: '2026-10-31' },
  { label: 'Nov', year: '', start: '2026-11-01', end: '2026-11-30' },
  { label: 'Dec', year: '', start: '2026-12-01', end: '2026-12-31' },
  { label: 'Jan', year: '2027', start: '2027-01-01', end: '2027-01-31' },
  { label: 'Feb', year: '', start: '2027-02-01', end: '2027-02-28' },
  { label: 'Mar', year: '', start: '2027-03-01', end: '2027-03-31' },
  { label: 'Apr', year: '', start: '2027-04-01', end: '2027-04-30' },
];
const intersects = (phase: Phase, month: typeof months[number]) => phase.start <= month.end && phase.end >= month.start;
function select(index: number) {
  selected.value = index;
}
function handleKeys(event: KeyboardEvent, index: number) {
  const key = event.key;
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) return;
  event.preventDefault();
  const next = key === 'Home' ? 0 : key === 'End' ? props.phases.length - 1 : (index + (key === 'ArrowDown' ? 1 : -1) + props.phases.length) % props.phases.length;
  select(next);
  document.getElementById(`timeline-tab-${next}`)?.focus({ preventScroll: true });
}
</script>

<template>
  <div class="timeline-widget" data-framework="vue">
    <div class="timeline-key mono"><span><i></i>Concentrated development</span><span><i class="review"></i>Review</span><span><i class="light"></i>Low workload</span></div>
    <div class="timeline-layout">
      <div class="timeline-plan">
        <div class="timeline-table-head" aria-hidden="true">
          <span>Planned phases</span>
          <div class="months"><span v-for="month in months" :key="month.label"><small>{{ month.year || ' ' }}</small>{{ month.label }}</span></div>
        </div>
        <div role="tablist" aria-label="Project phases" aria-orientation="vertical" class="phase-tabs">
          <button v-for="(phase, index) in phases" :id="`timeline-tab-${index}`" :key="phase.id" class="phase-tab" :class="{ selected: index === selected }" role="tab" :aria-selected="index === selected" aria-controls="timeline-detail" :tabindex="index === selected ? 0 : -1" @click="select(index)" @keydown="handleKeys($event, index)">
            <span class="phase-label"><span class="phase-index mono">{{ String(index + 1).padStart(2, '0') }}</span><span>{{ phase.name }}</span></span>
            <span class="month-bars" aria-hidden="true"><span v-for="month in months" :key="month.label" class="month-cell"><i v-if="intersects(phase, month)" :class="phase.kind"></i></span></span>
            <span class="phase-mobile-arrow" aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
      <section id="timeline-detail" role="tabpanel" :aria-labelledby="`timeline-tab-${selected}`" tabindex="0" class="timeline-detail">
        <div class="detail-top mono"><span>Phase {{ String(selected + 1).padStart(2, '0') }} / 09</span><span>{{ current.kind === 'light' ? 'Low workload' : current.kind === 'review' ? 'Review period' : 'Planned' }}</span></div>
        <div :key="current.id" class="phase-content">
          <p class="phase-date">{{ current.date }}</p>
          <h3>{{ current.name }}</h3>
          <ul><li v-for="task in current.tasks" :key="task">{{ task }}</li></ul>
          <p v-if="current.kind === 'light'" class="light-note">At most one small asynchronous task per member per week, adjusted to availability. No critical integration, required training or participant trials.</p>
        </div>
        <div class="phase-pagination"><button type="button" :disabled="selected === 0" aria-label="Previous phase" @click="select(selected - 1)">←</button><span class="mono">{{ String(selected + 1).padStart(2, '0') }} — 09</span><button type="button" :disabled="selected === phases.length - 1" aria-label="Next phase" @click="select(selected + 1)">→</button></div>
      </section>
    </div>
    <p class="timeline-footnote">Course milestones are tentative and subject to formal course notices. University holiday dates remain subject to formal notices.</p>
  </div>
</template>
