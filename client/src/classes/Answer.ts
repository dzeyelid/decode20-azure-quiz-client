import { AnswerMessage, AnswerId } from '@/interfaces/AnswerMessage';
import { Question } from '@/interfaces/Question';

export default class Answer {
  static createMessage(
    identifier: string,
    nickname: string,
    questionId: Question['id'],
    answerId: AnswerId,
    isFirst: boolean,
  ): AnswerMessage {
    const answerMessage: AnswerMessage = {
      identifier,
      nickname,
      question_id: questionId,
      answer_id: answerId,
      isFirst,
    };
    return answerMessage;
  }
}
