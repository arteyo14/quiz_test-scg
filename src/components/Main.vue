<script setup lang="ts">
import TextInput from './TextInput.vue'
import CreateMaterialModal from './CreateMaterialModal.vue'
import { computed, onMounted, ref, type ComputedRef } from 'vue'
import DataTable from './DataTable.vue'
import type { Header, Item } from 'vue3-easy-data-table'
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
          <DataTable :headers="headers" :loading="store.loading" :items="store.data">
            <template
              v-for="(header, key) in headers"
              #[`item-${header.value}`]="{ item }"
              :key="header.value + key"
            >
              <div v-if="header.value === 'Material'" class="text-center">
                {{ item.Material }}
              </div>
              <div v-else-if="header.value !== 'Sum'" class="text-center p-2">
                {{ header.value + key }}
                <TextInput
                  v-model="item.QTY"
                  :name="header.value + key"
                  class="justify-self-center"
                />
              </div>
              <!-- Optionally handle the 'Sum' column or other special columns if necessary -->
            </template>
          </DataTable>
        </div>
        <div class="col-12 text-end mt-4">
          <button type="button" class="btn btn-success">SAVE</button>
        </div>
      </div>
    </div>
  </div>
  <CreateMaterialModal :options="store.getMaterialOptions" ref="modalCreate" />
</template>
