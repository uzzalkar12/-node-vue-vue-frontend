import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/tutorials",
            name: "tutorials",
            component: () => import("./components/TutorialsList")
        },
        {
            path: "/tutorials/:id",
            name: "tutorial-details",
            component: () => import("./components/Tutorial")
        },
        {
            path: "/tutorials-add",
            name: "tutorials-add",
            component: () => import("./components/AddTutorial")
        },
        {
            path: "/posts",
            alias: "/posts",
            name: "posts",
            component: () => import("./components/post/PostsList")
        },
        {
            path: "/posts/:id",
            name: "posts-details",
            component: () => import("./components/post/Post")
        },
        {
            path: "/posts-add",
            name: "posts-add",
            component: () => import("./components/post/AddPost")
        }
    ]
});