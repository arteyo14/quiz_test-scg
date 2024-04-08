import { defineStore } from 'pinia'
import { materialData } from '@/services'
import type { MaterialData } from '@/types/model'
import { nextTick } from 'vue'

interface IState {
  loading: boolean
  data: MaterialData[]
  search: string
}

export const useMaterialStore = defineStore('material', {
  state: (): IState => ({
    loading: false,
    data: [],
    search: ''
  }),
  actions: {
    async getData() {
      this.loading = true

      await nextTick()
      setTimeout(() => {
        this.data = this.filterDataByKeyword(materialData, this.search)
        this.loading = false
      }, 3000)
    },
    filterDataByKeyword(data: MaterialData[], keyword: string) {
      return data.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(keyword.toLowerCase())
        )
      )
    },
    resetSearch() {
      this.search = ''
      this.getData()
    }
  },
  getters: {
    getLocationHeader(state) {
      const { data } = state
      const locations: Set<string> = new Set()

      data.forEach((item) => locations.add(item.Location))

      return [...locations] || []
    },
    getMaterialOptions(state) {
      const { data } = state

      const options = data.map((item) => item.Material)

      return options ?? []
    }
  }
})
