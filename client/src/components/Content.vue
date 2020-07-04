<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <Waiting
          v-if="this.state.isInit()"
          v-bind:uuid="uuid"
          v-on:reset-results="resetResults"
        />
        <Show
          v-if="this.state.isShow()"
          v-bind:uuid="uuid"
          v-bind:message="message"
        />
        <Start
          v-if="this.state.isStart()"
          v-bind:uuid="uuid"
          v-bind:message="message"
          v-on:update-result="this.updateResult"
        />
        <Finish
          v-if="this.state.isFinish()"
          v-bind:uuid="uuid"
          v-bind:message="message"
        />
        <ResultComponent
          v-if="this.state.isResult()"
          v-bind:uuid="uuid"
          v-bind:results="resultRepository.getAll()"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { uuid as uuidLib } from 'vue-uuid';
import Waiting from './Waiting.vue';
import Show from './Show.vue';
import Start from './Start.vue';
import Finish from './Finish.vue';
import ResultComponent from './Result.vue';
import SignalRClient from '../services/SignalRClient';
import ResultRepository from '../services/ResultRepository';
import { Message } from '../interfaces/Message';
import { InitMessage } from '../interfaces/InitMessage';
import { ShowMessage } from '../interfaces/ShowMessage';
import { StartMessage } from '../interfaces/StartMessage';
import { FinishMessage } from '../interfaces/FinishMessage';
import { ResultMessage } from '../interfaces/ResultMessage';
import { Result } from '../interfaces/Result';
import State from '../classes/State';

export default Vue.extend({
  name: 'Content',

  components: {
    Waiting,
    Show,
    Start,
    Finish,
    ResultComponent,
  },

  data: () => ({
    state: {} as State,
    uuid: null as string | null,
    signalRClient: {} as SignalRClient,
    message: {} as
      Message | InitMessage | ShowMessage | StartMessage | FinishMessage | ResultMessage,
    resultRepository: new ResultRepository(),
  }),

  async created() {
    this.uuid = this.getUuid();
    this.state = new State();
    this.signalRClient = await this.getClient();
  },

  methods: {
    getUuid(): string {
      if (!localStorage.uuid) {
        const uuid = uuidLib.v4();
        localStorage.uuid = uuid;
      }
      return localStorage.uuid;
    },

    async getClient(): Promise<SignalRClient> {
      const client = new SignalRClient();
      client.setHandler(this.receiveMessage);
      await client.start();
      return client;
    },

    receiveMessage(message: Message): void {
      this.message = message;
      this.state.setState(message.state);

      if (this.state.isFinish()) {
        this.updateResultWithFinishMessage(this.message as FinishMessage);
      }
    },

    async sendMessage() {
      await this.signalRClient.send({ state: 'init' });
    },

    updateResultWithFinishMessage(message: FinishMessage) {
      this.resultRepository.updateWithCorrectAnswer(message.question.id, message.correct.choice);
    },

    updateResult(result: Result) {
      this.resultRepository.update(result);
    },

    resetResults() {
      this.resultRepository.reset();
    },
  },
});

</script>
