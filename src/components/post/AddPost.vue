<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Post</p>
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="post.title" :rules="[(v) => !!v || 'Title is required']" label="Title" required></v-text-field>
        <v-text-field v-model="post.description" :rules="[(v) => !!v || 'Description is required']" label="Description" required></v-text-field>
      </v-form>
      <v-btn color="primary" class="mt-3" @click="saveTutorial">Submit</v-btn>
    </div>
    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>Submitted successfully!</v-card-title>
        <v-card-subtitle>Click the button to add new Post.</v-card-subtitle>
        <v-card-actions>
          <v-btn color="success" @click="newTutorial">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import PostDataService from "../../services/PostDataService";
export default {
  name: "add-post",
  data() {
    return {
      post: {
        id: null,
        title: "",
        description: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        title: this.post.title,
        description: this.post.description,
      };
      PostDataService.create(data)
          .then((response) => {
            this.post.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch((e) => {
            console.log(e);
          });
    },
    newTutorial() {
      this.submitted = false;
      this.post = {};
    },
  },
};
</script>
<style>
.submit-form {
  max-width: 300px;
}
</style>