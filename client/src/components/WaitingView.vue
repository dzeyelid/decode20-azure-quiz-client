<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="12" xs="12">
        夏まつりクイズへようこそ！
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="12" xs="12" class="text-left">
        <v-card class="mx-auto" max-width="600">
          <v-card-title>
            使い方
          </v-card-title>
          <v-card-text>
            <ol>
              <li>司会の操作により質問表示画面、回答画面が自動的に切り替わります。</li>
              <li>回答画面では、正しいと思う答えを選択し、回答を送信してください。</li>
              <li>上位3位を達成した方はランキングに表示されます。その際のニックネームを設定することができます。（下記フォームより）</li>
            </ol>
            <div class="text-center mb-2 mt-4">
              あなたの ID は <code>{{ uuid }}</code>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-spacer></v-spacer>
      <v-col cols="8" lg="4" md="4" sm="6">
        <v-text-field
          v-model="dataNickname"
          :rules="nicknameRules"
          :counter="10"
          label="ニックネームを設定する（任意）"
          :placeholder="dataNickname"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="2" lg="1" align-self="center">
        <v-btn @click="$emit('set-nickname', dataNickname)">変更する</v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row justify="center" class="text-center">
      <v-col cols="12" xl="3" lg="3" md="3" v-if="enableGetQuestion">
        <v-btn @click="$emit('fetch-current-question')">現在の問題に途中参加する</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" class="text-center">
      <v-col cols="12" xl="3" lg="3" md="3">
        <v-btn @click="$emit('reset-results')">Reset results</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

function validateNicknameMaxLength(v = ''): boolean | string {
  if (typeof process.env.VUE_APP_NICKNAME_MAX_LENGTH !== 'string') {
    return 'VUE_APP_NICKNAME_MAX_LENGTH が設定されていません';
  }
  const maxLength = parseInt(process.env.VUE_APP_NICKNAME_MAX_LENGTH, 10);
  return v.length <= maxLength || `${maxLength}文字以下で設定してください`;
}

export default Vue.extend({
  name: 'WaitingView',
  props: {
    uuid: String,
    nickname: String,
  },

  data: () => ({
    dataNickname: '',
    nicknameRules: [
      validateNicknameMaxLength,
    ],
  }),

  watch: {
    nickname(nickname: string) {
      console.log(nickname);
      this.dataNickname = nickname;
    },
  },

  computed: {
    enableGetQuestion(): boolean {
      return (typeof process.env.VUE_APP_GET_QUESTION_URL === 'string');
    },
  },

  created() {
    this.dataNickname = this.nickname;
  },
});
</script>
