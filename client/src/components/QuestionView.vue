<template>
  <v-container>
    <v-row
      justify="center"
    >
      <v-col cols="12" lg="6" md="6" sm="12" xs="12">
        <QuestionCard
          v-bind:uuid="uuid"
          v-bind:nickname="nickname"
          v-bind:isFirst="isFirst"
          v-bind:message="message"
          v-on:update-result="this.updateResult"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import QuestionCard from './QuestionCard.vue';
import { ShowMessage } from '../interfaces/ShowMessage';
import { StartMessage } from '../interfaces/StartMessage';
import { Result } from '../interfaces/Result';

export default Vue.extend({
  name: 'QuestionView',

  components: {
    QuestionCard,
  },

  props: {
    uuid: String,
    nickname: String,
    isFirst: Boolean,
    message: {} as PropType<ShowMessage> | PropType<StartMessage>,
  },

  methods: {
    updateResult(result: Result) {
      this.$emit('update-result', result);
    },

  },
});
</script>
