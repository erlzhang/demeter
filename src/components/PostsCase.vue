<template>
  <div class="posts-case">
    <button class="btn btn-primary mb-3" v-on:click="newPost">New Post</button>
    <div class="card-columns">
      <post-card v-for="post in posts" v-bind:key="post.uid" v-bind:post="post"></post-card>
    </div>
  </div>
</template>

<script>
  import Post from '@/models/Post'
  import LocalDb from '@/services/LocalDb'
  import PostCard from '@/components/PostCard'

  export default {
    components: {
      PostCard
    },
    data: () => ({
      posts: []
    }) ,
    methods: {
      async newPost () {
        const post = new Post()
        this.$router.push({ name: 'EditPost', params: { uid: post.uid }, props: (route) => ({ initPost: post })})
      }
    },
    async mounted () {
      const posts = await LocalDb.loadItems("pages")
      for ( let p of posts ) {
        let post = new Post(p)
        this.posts.push(post)
      }
    }
  }
</script>
