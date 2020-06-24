<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <Waiting
          v-if="this.state.isInit()"
          v-bind:uuid=uuid
        />
        <Show
          v-if="this.state.isShow()"
          v-bind:uuid=uuid
          v-bind:message=message
        />
        <Start
          v-if="this.state.isStart()"
          v-bind:uuid=uuid
          v-bind:message=message
          v-on:update-result="this.updateResult"
        />
        <Finish
          v-if="this.state.isFinish()"
          v-bind:uuid=uuid
          v-bind:message=message
        />
        <ResultComponent
          v-if="this.state.isResult()"
          v-bind:uuid=uuid
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
import { Message } from '../interfaces/Message';
import { InitMessage } from '../interfaces/InitMessage';
import { ShowMessage } from '../interfaces/ShowMessage';
import { StartMessage } from '../interfaces/StartMessage';
import { FinishMessage } from '../interfaces/FinishMessage';
import { ResultMessage } from '../interfaces/ResultMessage';
import State from '../classes/State';
import Result from '../classes/Result';

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
    results: [] as Result[],
  }),

  async created() {
    this.uuid = this.getUuid();
    this.results = this.getResultsFromStorage();
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

    getResultsFromStorage(): Result[] {
      if (!localStorage.results) {
        localStorage.results = JSON.stringify([] as Result[]);
      }
      return JSON.parse(localStorage.results);
    },

    updateResultsInStorage(): void {
      localStorage.results = JSON.stringify(this.results);
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
    },

    async sendMessage() {
      await this.signalRClient.send({ state: 'init' });
    },

    updateResult(result: Result) {
      if (!(result instanceof Result)) {
        console.log('The result\'s type is wrong.');
        return;
      }

      const index = this.results.findIndex((element) => element.question.id === result.question.id);

      if (index < 0) {
        this.results.push(result);
      } else {
        this.results[index] = result;
      }

      this.updateResultsInStorage();
    },
  },
});

</script>
