<template>
  <div v-if="currentPost" class="edit-form py-3">
    <p class="headline">Edit Tutorial</p>
    <v-form ref="form" lazy-validation>
      <v-text-field v-model="currentPost.title" :rules="[(v) => !!v || 'Title is required']" label="Title" required></v-text-field>
      <v-text-field v-model="currentPost.description" :rules="[(v) => !!v || 'Description is required']" label="Description" required></v-text-field>
      <v-btn color="error" small class="mr-2" @click="deletePost">Delete</v-btn>
      <v-btn color="success" small @click="updatePost">Update</v-btn>
    </v-form>
    <p class="mt-3">{{ message }}</p>
  </div>
  <div v-else>
    <p>Please click on a Post...</p>
  </div>
</template>
<script>
import PostDataService from "../../services/PostDataService";
export default {
  name: "tutorial",
  data() {
    return {
      currentPost: null,
      message: "",
    };
  },
  methods: {
    getPost(id) {
      PostDataService.get(id)
          .then((response) => {
            this.currentPost = response.data;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    updatePost() {
      PostDataService.update(this.currentPost.id, this.currentPost)
          .then((response) => {
            console.log(response.data);
            this.message = "The post was updated successfully!";
          })
          .catch((e) => {
            console.log(e);
          });
    },
    deletePost() {
      PostDataService.delete(this.currentPost.id)
          .then((response) => {
            console.log(response.data);
            this.$router.push({ name: "posts" });
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.message = "";
    this.getPost(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>