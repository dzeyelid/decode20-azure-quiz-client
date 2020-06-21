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
              v-for="(choice, id) in this.message.choices"
              :key=id
            >
              <v-list-item-icon>
                <v-radio :value="id" disabled=true></v-radio>
              </v-list-item-icon>
              <v-list-item-content>
                {{ id }}. {{ choice.description }}
              </v-list-item-content>
            </v-list-item>
          </v-radio-group>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ShowMessage } from '../interfaces/ShowMessage';

export default Vue.extend({
  name: 'Show',
  props: {
    uuid: String,
    message: {} as PropType<ShowMessage>,
  },
});
</script>
