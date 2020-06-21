<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <Waiting
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

export default Vue.extend({
  name: 'Content',

  components: {
    Waiting,
  },

  data: () => ({
    state: 'init',
    uuid: '',
  }),

  created() {
    this.uuid = this.getUuid();
  },

  methods: {
    getUuid(): string {
      return uuid.v4();
    },
  },
});
</script>
