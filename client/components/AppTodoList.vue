<template>
  <v-card>
    <v-list two-line>
      <div v-for="(todo, i) in todos"
           :key="todo.title">
        <v-list-tile>
          <v-list-tile-action>
            <v-checkbox @click="done(todo)"
                        v-model="todo.isDone"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ todo.title }}</v-list-tile-title>
            <v-list-tile-sub-title>Created by {{ todo.createdBy }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn @click="favorite(todo)"
                   icon
                   ripple>
              <v-icon v-if="todo.isFav"
                      color="red lighten-1">fas fa-heart</v-icon>
              <v-icon v-else
                      color="grey lighten-1">far fa-heart</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider inset
                   v-show="[todos.length - 1] != i" />
      </div>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Component, { Prop, Emit, Vue } from 'nuxtjs-extensions';

@Component
export default class AppTodoList extends Vue {
  @Prop(Array) todos: Todo[];

  @Emit()
  done(todo: Todo) {
    return todo;
  }

  @Emit()
  favorite(todo: Todo) {
    return todo;
  }
}

interface Todo {
  id: number;
  title: string;
  createdBy: string;
  isDone: boolean;
  isFav: boolean;
}
</script>
