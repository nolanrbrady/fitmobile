<template>
  <v-ons-navigator :page-stack="pageStack">
    <component :is="page" v-for="page in pageStack" :page-stack="pageStack"></component>
  </v-ons-navigator>
</template>

<script>
  import login from './login';
  import home from './home';

  export default {
    data() {
      return {
        pageStack: [login]
      }
    }
  }
</script>
