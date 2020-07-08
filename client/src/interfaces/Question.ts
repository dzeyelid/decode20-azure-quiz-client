export interface Question {
  id: string;
  description: string;
  category: string;
  point: number;
  position: {
    current: number,
    tail: number,
  };
}
