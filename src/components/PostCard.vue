<template>
  <div class="card">
    <router-link :to="{ name: 'EditPost', params: { uid: post.uid } }" v-bind:initPost="post">
      <div class="card-body">
        <h4 class="card-title">{{ post.title }}</h4>
        <p class="card-text">{{ excerpt }}</p>
        <p class="card-text">
          <small class="text-muted">{{ datetimeString }}</small>
          <span v-bind:class="statusClass">{{ status }}</span>
        </p>
      </div>
    </router-link>
  </div>
</template>

<style>
a .card-title {
  color: var(--gray-dark);
}
a .card-text {
  color: var(--gray);
}
a:hover {
  text-decoration: none;
}
</style>

<script>
  import DateTime from '@/utils/DateTime'

  export default {
    props: ['post'],
    computed: {
      datetimeString () {
        const dt = new DateTime(this.post.datetime)
        return dt.parse("yy-mm-dd HH:MM:SS")
      },
      status () {
        if ( this.published ) {
          return "published"
        } else {
          return "draft"
        }
      },
      statusClass () {
        let cla = "badge float-right "
        if ( this.published ) {
          cla += "badge-success"
        } else {
          cla += "badge-light"
        }
        return cla
      },
      excerpt () {
        return this.post.content.trim().slice(0, 100)
      }
    }
  }
</script>
