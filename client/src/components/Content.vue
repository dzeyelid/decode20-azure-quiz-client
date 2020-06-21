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
        />
        <Start
          v-if="this.state.isStart()"
          v-bind:uuid=uuid
        />
        <Finish
          v-if="this.state.isFinish()"
          v-bind:uuid=uuid
        />
        <Result
          v-if="this.state.isResult()"
          v-bind:uuid=uuid
        />
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn v-on:click="sendMessage">Initialize</v-btn>
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
import Result from './Result.vue';
import SignalRClient from '../services/SignalRClient';
import { Message } from '../interfaces/Message';
import State from '../classes/State';

export default Vue.extend({
  name: 'Content',

  components: {
    Waiting,
    Show,
    Start,
    Finish,
    Result,
  },

  data: () => ({
    state: {} as State,
    uuid: '',
    signalRClient: {} as SignalRClient,
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
      this.state.setState(message.state);
    },
    async sendMessage() {
      await this.signalRClient.send({ state: 'init' });
    },
  },
});

</script>
