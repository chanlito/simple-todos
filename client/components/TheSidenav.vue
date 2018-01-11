<template>
  <div>
    <v-toolbar v-if="isLoggedIn"
               flat
               class="transparent">
      <v-list class="pa-0"
              two-lines>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ authUser.firstName }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list dense>
      <template v-for="{ icon, title, path, sub } in activeLinks">
        <v-list-group v-if="sub && sub.length"
                      :key="title"
                      :prepend-icon="icon">

          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-for="{ icon, title, path } in sub"
                       style="padding-left: 20px;"
                       :key="title"
                       :to="path">
            <v-list-tile-action>
              <v-icon>{{ icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list-group>

        <v-list-tile v-else
                     :key="title"
                     :to="path">
          <v-list-tile-action>
            <v-icon>{{ icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
import Component, { Getter, State, Vue, namespace } from 'vue-class';

const AuthState = namespace('auth', State);
const AuthGetter = namespace('auth', Getter);

@Component
export default class TheSidenav extends Vue {
  links = [
    { icon: 'fa-home', title: 'Home', path: '/', level: 'any' },
    { icon: 'fa-user-plus', title: 'Register', path: '/register', level: 'guest' },
    { icon: 'fa-sign-in-alt', title: 'Log In', path: '/login', level: 'guest' },
    {
      icon: 'fa-list',
      title: 'Todos',
      path: '/todos',
      level: 'auth',
      sub: [
        { icon: 'fa-save', title: 'Add Todos', path: '/todos/add', level: 'auth' },
        { icon: 'fa-trash', title: 'Remove Todos', path: '/todos/remove', level: 'auth' }
      ]
    },
    { icon: 'fa-sign-out-alt', title: 'Log Out', path: '/logout', level: 'auth' }
  ];

  @AuthGetter isLoggedIn;
  @AuthState authUser;

  get activeLinks() {
    return this.links.filter(({ level }) => level === 'any' || level === (this.isLoggedIn ? 'auth' : 'guest'));
  }
}
</script>
