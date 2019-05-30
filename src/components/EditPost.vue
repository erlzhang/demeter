<template>
  <div class="new-post">
    <div v-if="post" class="row">
      <div class="col-md-9">
        <input class="form-control mb-3" v-model="post.title" name="post_title" id="post_title" />
        <editor v-bind:content="post.content" v-on:change="updateContent($event)"></editor>
        <button class="btn btn-success mt-3" v-on:click="save">Save</button>
        <button class="btn btn-danger mt-3" v-on:click="destroy">Delete</button>
        <router-link :to="{name: 'PostsCase'}" class="btn btn-secondary mt-3 float-right">Back</router-link>
      </div>
      <div class="col-md-3">
        <h3>Configs</h3>
        <form-group v-for="(field, index) in fields" v-bind:field="field" v-bind:key="index" v-bind:error="field.error" v-on:change="updateVal($event)" v-model="post[field.name]"></form-group>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import Post from '@/models/Post'
import LocalDb from '@/services/LocalDb'
import FormGroup from '@/components/FormGroup'

export default {
  props: ['initPost'],
  components: {
    Editor,
    FormGroup
  },
  data: () => ({
    post: this.initPost
  }),
  methods: {
    async save () {
      let e
      if ( this.post.isSaved ) {
        e = await this.post.update()
      } else {
        e = await this.post.save()
      }

      if ( e.type == "invalid" ) {
        this.showErrors( this.post.errors )
      }
    },

    async destroy () {
      const e = await this.post.delete()
      if ( e.type == "success" ) {
        this.$router.push({ name: 'PostsCase'})
      }
    },

    updateVal (key, value) {
      this.post[key] = value
    },

    updateContent (content) {
      this.post.content = content
    },

    showErrors (errors) {
      this.clearErrors()

      for ( let f of Object.keys(errors) ) {
        if ( this.fields[f] ) {
          this.fields[f].error = errors[f]
          this.$set(this.fields[f], 'error', errors[f])
        }
      }
    },

    clearErrors () {
      for ( let f of Object.keys( this.fields ) ) {
        this.fields[f].error = false
        this.$set(this.fields[f], 'error', false)
      }
    }
  },
  async mounted () {
    if ( !this.post ) {
      const uid = this.$route.params.uid
      let e = await LocalDb.loadItem('pages', uid)
      let post = e.target.result
      this.post = new Post(post)
    }

    let fields = {}
    for ( let f of Object.keys( this.post.fields ) ) {
      let specs = this.post.fields[f]
      if ( specs["mutable"] && ( f != "title" ) && ( f != "content" ) ) {
        let field = {
          name: f,
          label: specs["label"] || f,
          spec: specs,
          val: this.post[f],
          error: false
        }
        fields[f] = field
      }
    }
    this.fields = fields
  }

}
</script>
