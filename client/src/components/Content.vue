<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <Waiting
          v-bind:uuid=uuid
        />
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn v-on:click="sendMessage">Send</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { uuid } from 'vue-uuid';
import Waiting from './Waiting.vue';
import SignalRClient from '../services/SignalRClient';

export default Vue.extend({
  name: 'Content',

  components: {
    Waiting,
  },

  data: () => ({
    state: 'init',
    uuid: '',
    signalRClient: {} as SignalRClient,
  }),

  async created() {
    this.uuid = this.getUuid();
    this.signalRClient = await this.getClient();
  },

  methods: {
    getUuid(): string {
      return uuid.v4();
    },
    async getClient(): Promise<SignalRClient> {
      const client = new SignalRClient();
      client.setHandler('RecieveMessage', this.receiveMessage);
      await client.start();
      return client;
    },
    receiveMessage(user: string, message: string): void {
      console.log(message);
    },
    async sendMessage() {
      await this.signalRClient.send('messages', 'user', 'Hooray!');
    },
  },
});

</script>
