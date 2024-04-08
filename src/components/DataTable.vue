<script setup lang="ts">
import type { Header, Item } from 'vue3-easy-data-table'
import Vue3EasyDataTable from 'vue3-easy-data-table'

defineProps({
  headers: {
    type: Array<Header>,
    default: []
  },
  items: {
    type: Array<Item>,
    default: []
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <Vue3EasyDataTable
    :headers="headers"
    :items="items"
    :loading="loading"
    empty-message="ไม่พบข้อมูล"
    hide-footer
  >
    <template v-if="$slots['customize-headers']" #customize-headers>
      <slot name="customize-headers" />
    </template>

    <template v-else-if="$slots['empty-message']" #empty-message>
      <slot name="empty-message" />
    </template>
    <template v-for="(header, key) of headers" #[`header-${header.value}`]="item" :key="key">
      <div
        class="w-100"
        :class="[
          !item.align ? 'text-center' : `text-${item.align}`,
          { 'fixed-start': item.fixed, 'fixed-end': item.fixedEnd }
        ]"
      >
        {{ item.text }}
      </div>
    </template>

    <template v-for="(header, key) in headers" #[`item-${header.value}`]="item" :key="key">
      <div :class="{ 'fixed-start': header.fixed, 'fixed-end': !header.fixed }">
        <slot :name="`item-${header.value}`" :item="item" />
      </div>
    </template>
  </Vue3EasyDataTable>
</template>
<style scss scoped></style>
