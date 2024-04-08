import { defineStore } from 'pinia'
import { materialData } from '@/services'
import type { MaterialData } from '@/types/model'
import { nextTick } from 'vue'
import type { Header } from 'vue3-easy-data-table'

interface DataTable {
  Material: string
  ProductCode: string
  [key: string]: string | number
  description: string
}

interface IState {
  loading: boolean
  data: MaterialData[]
  search: string
  items: DataTable[]
}

interface SummarizedMaterialData {
  Material: string
  ProductCode: string
  [location: string]: string | number
  description: string
}

export const useMaterialStore = defineStore('material', {
  state: (): IState => ({
    loading: false,
    data: [],
    search: '',
    items: []
  }),
  actions: {
    async getData() {
      this.loading = true

      await nextTick()
      setTimeout(() => {
        this.data = materialData
        this.generateItems()
        this.items = this.filterDataByKeyword(this.items, this.search)
        this.loading = false
      }, 3000)
    },
    filterDataByKeyword(data: DataTable[], keyword: string) {
      return data.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(keyword.toLowerCase())
        )
      )
    },
    resetSearch() {
      this.search = ''
      this.getData()
    },
    generateItems() {
      const summarizedMaterials: SummarizedMaterialData[] = this.data.reduce(
        (acc: SummarizedMaterialData[], { Material, ProductCode, Location, QTY }) => {
          const materialEntry = acc.find((entry) => entry.Material === Material)

          if (materialEntry) {
            materialEntry[Location] = Number(materialEntry[Location] || 0) + QTY
          } else {
            const newMaterialEntry: SummarizedMaterialData = {
              Material,
              ProductCode,
              [Location]: QTY,
              description: ''
            }
            acc.push(newMaterialEntry)
          }

          return acc
        },
        []
      )

      const allLocations = [...new Set(this.data.map((item) => item.Location))]

      const normalizedMaterials: SummarizedMaterialData[] = summarizedMaterials.map((material) => {
        allLocations.forEach((location) => {
          if (!(location in material)) {
            material[location] = 0
          }
        })
        return material
      })

      this.items = normalizedMaterials
    },
    calculateSum(headers: Header[], item: DataTable): number {
      return headers.reduce((sum: number, header: Header) => {
        if (header.value !== 'Material' && header.value !== 'Sum') {
          return sum + (Number(item[header.value]) || 0)
        }
        return sum
      }, 0)
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
