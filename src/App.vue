<template>
  <div id="app" class="container-fluid p-0">
    <nav-bar></nav-bar>
    <div class="container p-4">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import LocalDb from '@/services/LocalDb'

LocalDb.init();

export default {
  name: 'App',
  data: () => ({
  }),
  components: {
    NavBar
  }
}
</script>

<style>
</style>
