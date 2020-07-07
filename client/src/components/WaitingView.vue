<template>
  <v-container>
    <v-row
      justify="center"
    >
      <v-col cols="12" lg="6" md="6" sm="12" xs="12">
        夏まつりクイズへようこそ！
      </v-col>
    </v-row>
    <v-row
      justify="center"
    >
      <v-col cols="12" lg="6" md="6" sm="12" xs="12" class="text-left">
        <v-card class="mx-auto" max-width="600">
          <v-card-title>
            使い方
          </v-card-title>
          <v-card-text>
            <ol>
              <li>司会の操作により質問表示画面、回答画面が自動的に切り替わります。</li>
              <li>回答画面では、正しいと思う答えを選択し、回答を送信してください。</li>
            </ol>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      justify="center"
    >
      <v-col cols="12" lg="6" md="6" sm="12" xs="12">
        あなたの ID は <code>{{ uuid }}</code>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-spacer></v-spacer>
      <v-col cols="12" xl="3" lg="3" md="3" v-if="enableGetQuestion">
        <v-btn @click="$emit('fetch-current-question')">現在の問題に途中参加する</v-btn>
      </v-col>
      <v-col cols="12" xl="3" lg="3" md="3">
        <v-btn @click="$emit('reset-results')">Reset results</v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'WaitingView',
  props: {
    uuid: String,
  },

  computed: {
    enableGetQuestion() {
      return (typeof process.env.VUE_APP_GET_QUESTION_URL === 'string');
    },
  },
});
</script>
