<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Search by Title"></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">Search</v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Posts</v-card-title>
        <v-data-table :headers="headers" :items="posts" disable-pagination :hide-default-footer="true">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <v-card-actions v-if="posts.length > 0">
          <v-btn small color="error" @click="removeAllPosts">Remove All</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import PostDataService from "../../services/PostDataService";

export default {
  name: "posts-list",
  data() {
    return {
      posts: [],
      title: "",
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Description", value: "description", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrievePosts() {
      PostDataService.getAll()
          .then((response) => {
            this.posts = response.data.map(this.getDisplayPost);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    refreshList() {
      this.retrievePosts();
    },
    removeAllPosts() {
      PostDataService.deleteAll()
          .then((response) => {
            console.log(response.data);
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    searchTitle() {
      PostDataService.findByTitle(this.title)
          .then((response) => {
            this.posts = response.data.map(this.getDisplayPost);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    editTutorial(id) {
      this.$router.push({ name: "post-details", params: { id: id } });
    },
    deleteTutorial(id) {
      PostDataService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    getDisplayPost(post) {
      return {
        id: post.id,
        title: post.title.length > 30 ? post.title.substr(0, 30) + "..." : post.title,
        description: post.description.length > 30 ? post.description.substr(0, 30) + "..." : post.description,
      };
    },
  },
  mounted() {
    this.retrievePosts();
  },
};
</script>
<style>
.list {
  max-width: 750px;
}
</style>