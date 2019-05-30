<template>
  <textarea class="form-control" contenteditable="true" v-on:input="editChange($event)" required>{{content}}</textarea>
</template>

<style scoped>
  .form-control {
    height: 400px;
  }
</style>

<script>
export default {
  props: ['content'],
  methods: {
    editChange (event) {
      let content = event.target.value
      this.$emit('change', content)
    }
  }
}
</script>
