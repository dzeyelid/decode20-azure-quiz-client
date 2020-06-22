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
                {{ id }}. {{ choice.description }}
              </v-list-item-content>
            </v-list-item>
          </v-radio-group>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="sendAnswer">
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
import { StartMessage } from '../interfaces/StartMessage';

export default Vue.extend({
  name: 'Start',
  props: {
    uuid: String,
    message: {} as PropType<StartMessage>,
  },
  data: () => ({
    answer: '',
  }),
  methods: {
    sendAnswer(event: Event) {
      if (this.answer !== '') {
        console.log(this.answer);
      }
    },
  },
});
</script>
