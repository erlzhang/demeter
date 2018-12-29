<template>
  <div class="new-post">
    <div v-if="post">
      <input class="form-control mb-3" v-model="post.title" />
      <editor v-bind:content="post.content" v-on:change="updateContent($event)"></editor>
      <button class="btn btn-success mt-3" v-on:click="save">Save</button>
      <button class="btn btn-danger mt-3" v-on:click="destroy">Delete</button>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import Post from '@/models/Post'
import LocalDb from '@/services/LocalDb'

export default {
  props: ['initPost'],
  components: {
    Editor
  },
  data: () => ({
    post: this.initPost
  }),
  methods: {
    async save () {
      if ( this.post.isSaved ) {
        const e = await this.post.update()
      } else {
        const e = await this.post.save()
      }
    },
    async destroy () {
      const e = await this.post.delete()
      if ( e.type == "success" ) {
        this.$router.push({ name: 'PostsCase'})
      }
    },
    updateContent (content) {
      this.post.content = content
    }
  },
  async mounted () {
    if ( !this.post ) {
      const uid = this.$route.params.uid
      let e = await LocalDb.loadItem('pages', uid)
      let post = e.target.result
      this.post = new Post(post)
    }
  }

}
</script>
