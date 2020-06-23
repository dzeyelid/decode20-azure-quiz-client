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
import { uuid } from 'vue-uuid';
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
    uuid: '',
    signalRClient: {} as SignalRClient,
    message: {} as
      Message | InitMessage | ShowMessage | StartMessage | FinishMessage | ResultMessage,
    results: [] as Result[],
  }),

  async created() {
    this.state = new State();
    this.uuid = this.getUuid();
    this.signalRClient = await this.getClient();
  },

  methods: {
    getUuid(): string {
      return uuid.v4();
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

    addResult(result: Result) {
      this.results.push(result);
    },
  },
});

</script>
