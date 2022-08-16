<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">bezKoder</div>
      <v-btn to="/tutorials" text>Tutorials</v-btn>
      <v-btn to="/tutorials-add" text>Add Tutorial</v-btn>
      <v-btn to="/posts" text>Posts</v-btn>
      <v-btn to="/posts-add" text>Add Post</v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "app",
};
</script>