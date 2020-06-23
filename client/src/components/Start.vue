<template>
  <v-container>
    <v-row
      justify="center"
    >
      <v-col cols="12" lg="6" md="6" sm="12" xs="12">
        <v-card class="mx-auto" max-width="600">
          <v-card-title>
            問題 {{ this.message.question.id }}
          </v-card-title>
          <v-card-text>
            {{ this.message.question.description }}
          </v-card-text>
          <v-radio-group
            v-model="answer"
          >
            <v-list-item
              v-for="(choice, id) in this.message.choices"
              :key=id
            >
              <v-list-item-icon>
                <v-radio :value="id"></v-radio>
              </v-list-item-icon>
              <v-list-item-content>
                {{ id | uppercase }}. {{ choice.description }}
              </v-list-item-content>
            </v-list-item>
          </v-radio-group>
          <v-card-actions>
            <v-btn color="primary" @click="sendAnswer" v-bind:disabled="this.buttonIsDisabled">
              送信
              <v-icon small class="ml-2">fas fa-paper-plane</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import axios from 'axios';
import { StartMessage } from '../interfaces/StartMessage';
import Answer from '../classes/Answer';
import { AnswerId } from '../interfaces/AnswerMessage';

export default Vue.extend({
  name: 'Start',
  props: {
    uuid: String,
    message: {} as PropType<StartMessage>,
  },
  data: () => ({
    answer: null as AnswerId | null,
    sent: false,
  }),
  watch: {
    message() {
      this.initializeAnswer();
      this.sent = false;
    },
  },
  computed: {
    buttonIsDisabled(): 'disabled' | false {
      if (this.answer === null || this.sent) {
        return 'disabled';
      }
      return false;
    },
  },
  methods: {
    async sendAnswer() {
      if (this.answer !== null) {
        const answer = Answer.createMessage(this.uuid, this.message.question.id, this.answer);
        const url = process.env.VUE_APP_SEND_ANSWER_URL;
        if (typeof url === 'string') {
          await axios.post(url, answer);
          this.initializeAnswer();
          this.sent = true;
        } else {
          console.log('VUE_APP_SEND_ANSWER_URL is not set.');
        }
      }
    },

    initializeAnswer() {
      this.answer = null;
    },
  },
});
</script>
