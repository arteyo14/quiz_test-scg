<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <label class="form-text">
    {{ label }}
    <span v-show="required" class="required"></span>
  </label>
</template>

<style scoped>
label {
  color: #3f4254;
  font-weight: 400;
}
</style>
