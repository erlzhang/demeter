<template>
  <div class="form-group">
    <label>{{ field.label }}</label>
    <input :class="['form-control', { 'is-invalid': field.error }]" v-if="field.spec.type == 'string'" :value="value" v-on:change="$emit('input', $event.target.value)"/>
    <select :class="['custom-select', { 'is-invalid': field.error }]" v-if="field.spec.type == 'range'" :value="value" v-on:change="$emit('input', $event.target.value)">
      <option v-for="option in field.spec.range" :value="option">{{ option }}</option>
    </select>
    <div class="invalid-feedback" v-if="field.error">{{ field.error }}</div>
  </div>
</template>

<script>
export default {
  props: ['value', 'field']
}
</script>
