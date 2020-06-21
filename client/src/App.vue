<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        視聴者参加型クイズ大会
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <Content/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Content from './components/Content.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Content,
  },

  data: () => ({
    //
  }),
});
</script>
