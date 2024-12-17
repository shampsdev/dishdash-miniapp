export interface VoteOption {
  id: number;
  description: string;
}

export interface Vote {
  id: number;
  options: VoteOption[];
  type: 'match' | 'finish';
}
