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
          <v-radio-group>
            <v-list-item
              v-for="(choice, id) in this.choices"
              :key=id
            >
              <v-list-item-icon>
                <v-radio :value="id" disabled="disabled"></v-radio>
              </v-list-item-icon>
              <v-list-item-content
                v-bind:class=
                  "[choice.isCorrect ? 'font-weight-bold' : disabledChoice]"
              >
                  {{ id }}. {{ choice.description }}
              </v-list-item-content>
            </v-list-item>
          </v-radio-group>
          <v-container class="pt-0">
            <v-row>
              <v-col class="mx-4">
                {{ this.message.correct.description }}
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { FinishMessage } from '../interfaces/FinishMessage';
import { Choice } from '../interfaces/Choice';

export default Vue.extend({
  name: 'Finish',
  props: {
    uuid: String,
    message: {} as PropType<FinishMessage>,
  },
  data: () => ({
    disabledChoice: 'text-decoration-line-through text--disabled',
  }),
  computed: {
    choices() {
      const { choices, correct } = this.message;
      const reassignedChoices = {};
      Object.entries(choices).every((entry) => {
        const key = entry[0];
        const choice: Choice = {
          description: entry[1].description,
          isCorrect: key === correct.choice,
        };
        Object.assign(reassignedChoices, { [key]: choice });
        return true;
      });
      return reassignedChoices;
    },
  },
});
</script>
