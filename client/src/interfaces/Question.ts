export interface Question {
  id: string;
  description: string;
  position: {
    current: number,
    tail: number,
  };
}
