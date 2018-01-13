<template>
  <div>
    <v-toolbar v-if="isSignedIn"
               color="primary"
               flat>
      <v-list class="pa-0"
              two-lines>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title class="black--text">{{ firstName }} {{ lastName }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon class="black--text">settings</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider />
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
import Component, { Getter, Vue, namespace } from 'nuxtjs-extensions';

const AuthGetter = namespace('auth', Getter);

@Component
export default class TheSidenav extends Vue {
  links: NavLink[] = [
    { icon: 'fa-home', title: 'Home', path: '/', level: 'any' },
    { icon: 'fa-user-plus', title: 'Sign Up', path: '/sign-up', level: 'guest' },
    { icon: 'fa-sign-in-alt', title: 'Sign In', path: '/sign-in', level: 'guest' },
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
    { icon: 'fa-sign-out-alt', title: 'Sign Out', path: '/sign-out', level: 'auth' }
  ];

  @AuthGetter isSignedIn: boolean;
  @AuthGetter firstName: string;
  @AuthGetter lastName: string;

  get activeLinks() {
    return this.links.filter(({ level }) => level === 'any' || level === (this.isSignedIn ? 'auth' : 'guest'));
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
