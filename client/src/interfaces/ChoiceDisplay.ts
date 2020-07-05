import { Choice } from './Choice';

export interface ChoiceDisplay extends Choice {
  isDisabled: boolean;
  isStricted: boolean;
}
