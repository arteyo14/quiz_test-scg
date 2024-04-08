<script setup lang="ts">
import TextInput from './TextInput.vue'
import CreateMaterialModal from './CreateMaterialModal.vue'
import { computed, onMounted, ref, type ComputedRef } from 'vue'
import type { Header } from 'vue3-easy-data-table'
import { useMaterialStore } from '@/stores/mainStore'

const store = useMaterialStore()

const modalCreate = ref()

onMounted(() => {
  store.getData()
})

const showModal = () => {
  modalCreate.value?.showModal()
}

const headers: ComputedRef<Header[]> = computed(() => {
  const sortedLocationHeaders = store.getLocationHeader
    .slice()
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

  return store.data.length === 0
    ? []
    : [
        { text: 'Material', value: 'Material' },
        ...sortedLocationHeaders.map((location) => ({
          text: location,
          value: location,
          width: 200
        })),
        { text: 'Sum', value: 'Sum' }
      ]
})
</script>
<template>
  <div class="row my-4">
    <div class="col-12">
      <h1 class="text-center">QUIZ TEST</h1>
    </div>
    <div class="col-12">
      <div class="row">
        <div class="col-6">
          <div class="row">
            <div class="col-8 px-0">
              <TextInput v-model="store.search" label="Material" name="material" />
            </div>
            <div class="col-4 px-0 align-items-end mt-1 d-flex">
              <button type="button" class="ms-4 btn btn-success py-1 mt-4" @click="store.getData">
                <span class="fs-6">SEARCH</span>
              </button>
              <button
                type="button"
                class="ms-2 btn btn-danger py-1 mt-4"
                @click="store.resetSearch"
              >
                <span class="fs-6">RESET</span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-6 text-end px-0">
          <button
            type="button"
            data-bs-target="#modal-form"
            class="btn btn-success mt-4 px-4"
            @click="showModal"
          >
            <span class="fs-6">+</span>
          </button>
        </div>
        <div class="col-12 mt-4 px-0">
          <table class="table">
            <!-- Table Head -->
            <thead>
              <tr>
                <th class="text-center" v-for="header in headers" :key="header.value">
                  {{ header.text }}
                </th>
              </tr>
            </thead>
            <!-- Table Body -->
            <tbody>
              <tr v-if="!store.loading" v-for="item in store.items" :key="item.Material">
                <td class="text-center">{{ item.Material }}</td>
                <!-- Dynamically create a cell for each location header -->
                <td
                  v-for="header in headers.filter(
                    (h) => h.value !== 'Material' && h.value !== 'Sum'
                  )"
                  :key="header.value"
                  class="text-center"
                >
                  <input
                    type="text"
                    v-model="item[header.value]"
                    class="form-control text-center"
                    :name="`${header.value}-${item.Material}`"
                  />
                </td>
                <td class="text-center">{{ store.calculateSum(headers, item) }}</td>
              </tr>
              <tr v-else="store.loading">
                <td :colspan="headers.length" class="text-center py-4">
                  <span class="spinner-border spinner-border-md align-middle ms-2"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-12 text-end mt-4">
          <button type="button" class="btn btn-success">SAVE</button>
        </div>
      </div>
    </div>
  </div>
  <CreateMaterialModal :options="store.getMaterialOptions" ref="modalCreate" />
</template>
