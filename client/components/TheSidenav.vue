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
                       :key="title"
                       :to="path">
            <v-list-tile-action style="padding-left: 12px;">
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

<script lang="ts">
import Component, { Getter, State, Vue, namespace } from '@vue/ts';

const AuthState = namespace('auth', State);
const AuthGetter = namespace('auth', Getter);

@Component
export default class TheSidenav extends Vue {
  links: NavLink[] = [
    { icon: 'fa-home', title: 'Home', path: '/', level: 'any' },
    { icon: 'fa-user-plus', title: 'Register', path: '/register', level: 'guest' },
    { icon: 'fa-sign-in-alt', title: 'Log In', path: '/login', level: 'guest' },
    {
      icon: 'fa-wrench',
      title: 'Todos CRUD',
      path: '#',
      level: 'auth',
      sub: [
        { icon: 'fa-list-ol', title: 'List', path: '/todos', level: 'auth' },
        { icon: 'fa-save', title: 'Add', path: '/todos/add', level: 'auth' },
        { icon: 'fa-trash-alt', title: 'Remove', path: '/todos/remove', level: 'auth' }
      ]
    },
    { icon: 'fa-sign-out-alt', title: 'Log Out', path: '/logout', level: 'auth' }
  ];

  @AuthState authUser;
  @AuthGetter isLoggedIn: boolean;

  get activeLinks() {
    return this.links.filter(({ level }) => level === 'any' || level === (this.isLoggedIn ? 'auth' : 'guest'));
  }
}

interface NavLink {
  title: string;
  path: string;
  level: 'any' | 'auth' | 'guest';
  icon?: string;
  sub?: NavLink[];
}
</script>
