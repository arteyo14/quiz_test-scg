<script setup lang="ts">
import { onUnmounted } from 'vue'
import Label from './Label.vue'
import { ErrorMessage, Field, useField } from 'vee-validate'

const props = defineProps({
  modelValue: {
    type: String || Number,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disablePaste: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  textEnd: {
    type: String,
    default: ''
  },
  change: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: any) => {
  emit('update:modelValue', event.target.value)
}

// Prevent Control + V (paste)
const handlePaste = (event: any) => {
  if (props.disablePaste) {
    event.preventDefault()
  }
}

const { meta, resetField } = useField(props.name)

onUnmounted(() => {
  resetField({ value: '' })
})
</script>
<template>
  <div class="position-relativce">
    <Label v-show="label !== ''" :label="label" :required="required" />
    <Field
      type="text"
      :name="name"
      class="form-control"
      :value="modelValue"
      :placeholder="placeholder"
      :class="{ 'is-invalid': !meta.valid && meta.validated, change: change }"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      @input="updateValue"
      @paste="handlePaste"
    />
    <span v-show="textEnd !== ''" class="btn btn-sm btn-icon position-absolute icon-end">
      {{ textEnd }}
    </span>
    <ErrorMessage v-show="!meta.valid && meta.validated" class="invalid-feedback" :name="name" />
  </div>
</template>
