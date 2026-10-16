import source from './bid.generated.json';

export interface Member {
  name: string;
  role: string;
  studentId: string;
  email: string;
  intro: string;
  tags: string[];
  responsibility: string;
  html: string;
}

export interface Phase {
  id: string;
  name: string;
  date: string;
  start: string;
  end: string;
  kind: string;
  tasks: string[];
}

export const bid = source;
export const members: Member[] = source.members;
export const phases: Phase[] = source.phases;
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const filmImages = [
  '01', '02', '03', '04', '05', '06',
  '07', '08', '09', '10', '11', '17',
].map((id) => asset(`images/cinema-${id}.jpg`));

export const workflowImages = ['13', '14', '15', '16'].map((id) => asset(`images/cinema-${id}.jpg`));
export const fitImage = asset('images/cinema-12.jpg');
