<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-title>
      問題 {{ this.message.question.id }}
    </v-card-title>
    <v-card-text>
      {{ this.message.question.description }}
    </v-card-text>
    <v-radio-group
      v-model="answerId"
    >
      <v-list-item
        v-for="(choice, id) in this.choices"
        :key="id"
      >
        <v-list-item-icon>
          <v-radio :value="id" :disabled="choice.isDisabled ? 'disabled' : false"></v-radio>
        </v-list-item-icon>
        <v-list-item-content
          v-bind:class=
            "[choice.isCorrect ? 'font-weight-bold' : disabledChoice]"
        >
          {{ id | uppercase }}. {{ choice.description }}
        </v-list-item-content>
      </v-list-item>
    </v-radio-group>

    <v-container class="pt-0" v-if="this.state.isShow()">
      <v-row class="text-left">
        <v-col class="mx-4">
          Ready?
        </v-col>
      </v-row>
    </v-container>

    <v-card-actions v-if="this.state.isStart()">
      <v-btn color="primary" @click="sendAnswer"
        v-bind:disabled="this.buttonIsDisabled ? 'disabled' : false">
        送信
        <v-icon small class="ml-2">fas fa-paper-plane</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>

    <v-container class="pt-0" v-if="this.state.isFinish()">
      <v-row class="text-left">
        <v-col class="mx-4">
          {{ this.message.correct.description }}
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import axios from 'axios';
import State from '../classes/State';
import Answer from '../classes/Answer';
import { ShowMessage } from '../interfaces/ShowMessage';
import { StartMessage } from '../interfaces/StartMessage';
import { FinishMessage } from '../interfaces/FinishMessage';
import { AnswerId } from '../interfaces/AnswerMessage';
import { ChoiceDisplay } from '../interfaces/ChoiceDisplay';
import { Result } from '../interfaces/Result';

export default Vue.extend({
  name: 'QuestionCard',

  props: {
    uuid: String,
    message: {} as PropType<ShowMessage> | PropType<StartMessage> | PropType<FinishMessage>,
  },

  data: () => ({
    state: {} as State,
    answerId: null as AnswerId | null,
    sent: false,
  }),

  watch: {
    message(message: ShowMessage | StartMessage | FinishMessage) {
      this.state.setState(message.state);
    },
  },

  computed: {
    choicesIsDisabled(): boolean {
      if (this.state.isShow() || this.state.isFinish()) {
        return true;
      }

      if (this.sent) {
        return true;
      }

      return false;
    },

    buttonIsDisabled(): boolean {
      return this.isSent();
    },

    choices(): {} {
      const message = this.message as ShowMessage | StartMessage | FinishMessage;

      const { correct } = this.message as FinishMessage;

      const reassignedChoices = {};
      Object.entries(message.choices).every((entry) => {
        const key = entry[0];
        const choice: ChoiceDisplay = {
          ...entry[1],
          isDisabled: this.choicesIsDisabled,
        };
        if (correct) {
          choice.isCorrect = key.toLowerCase() === correct.choice.toLowerCase();
        }
        Object.assign(reassignedChoices, { [key]: choice });
        return true;
      });
      return reassignedChoices;
    },

    disabledChoice(): string {
      if (this.state.isFinish()) {
        return 'text-decoration-line-through text--disabled';
      }
      return '';
    },
  },

  created() {
    this.state = new State();
    this.state.setState(this.message.state);
  },

  methods: {
    isSent(): boolean {
      return this.answerId === null || this.sent;
    },

    async sendAnswer() {
      if (this.answerId !== null) {
        const answer = Answer.createMessage(this.uuid, this.message.question.id, this.answerId);
        const url = process.env.VUE_APP_SEND_ANSWER_URL;
        if (typeof url === 'string') {
          await axios.post(url, answer);
          const result: Result = {
            questionId: this.message.question.id,
            answerId: this.answerId,
            isCorrect: null,
          };
          this.$emit('update-result', result);
          this.initializeAnswer();
          this.sent = true;
        } else {
          console.log('VUE_APP_SEND_ANSWER_URL is not set.');
        }
      }
    },

    initializeAnswer() {
      this.answerId = null;
    },
  },
});
</script>
