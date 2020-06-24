<template>
  <v-container>
    <v-row
      justify="center"
    >
      <v-col cols="12" lg="6" md="6" sm="12" xs="12">
        <v-card class="mx-auto" max-width="600">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col class="font-weight-bold">
                  ご参加、ありがとうございました！
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  あなたの正答率は {{ percentage }}% です。
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  {{ message }}
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Result from '../classes/Result';

export default Vue.extend({
  name: 'Result',
  props: {
    uuid: String,
    results: [] as PropType<Result[]>,
  },

  computed: {
    percentage() {
      const resultObjects = this.results;
      const correctResults = resultObjects.filter((result) => (result as Result).isCorrect);
      const rate = correctResults.length / resultObjects.length;
      return Math.round(rate * 100);
    },
    message() {
      if (this.percentage === 100) {
        return 'PERFECT!!';
      }
      if (this.percentage >= 80) {
        return 'Awesome!';
      }
      if (this.percentage >= 60) {
        return 'Good job!';
      }
      return 'You\'ll be better than now!';
    },
  },
});
</script>
