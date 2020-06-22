import { AnswerMessage, AnswerId } from '@/interfaces/AnswerMessage';
import { Question } from '@/interfaces/Question';

export default class Answer {
  static createMessage(
    identifier: string,
    questionId: Question['id'],
    answerId: AnswerId,
  ): AnswerMessage {
    const answerMessage: AnswerMessage = {
      identifier,
      question_id: questionId,
      answer_id: answerId,
    };
    return answerMessage;
  }
}
