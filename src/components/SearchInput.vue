<script setup lang="ts">
import { useField } from 'vee-validate'
import { onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
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
    default: 'ระบุข้อมูล'
  },
  options: {
    type: Array<string> || Array<number>,
    default: []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disablePaste: {
    type: Boolean,
    dafault: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: any) => {
  emit('update:modelValue', event.target.value)
}

// // Prevent Control + V (paste)
// const handlePaste = (event: any) => {
//   if (props.disablePaste) {
//     event.preventDefault()
//   }
// }

const { resetField } = useField(props.name)

onUnmounted(() => {
  resetField({ value: '' })
})
</script>
<template>
  <div class="position-relative">
    <Label :label="label" :required="required" />
    <input
      type="text"
      :value="modelValue"
      class="form-control"
      @input="updateValue"
      :disabled="disabled"
      :placeholder="placeholder"
      list="datalistOptions"
    />
    <datalist id="datalistOptions">
      <option v-for="(value, key) of options" :key="key" :value="value" />
    </datalist>
  </div>
</template>
