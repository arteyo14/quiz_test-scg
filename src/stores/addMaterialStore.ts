import type { MaterialData } from '@/types/model'
import { defineStore } from 'pinia'
import { nextTick } from 'vue'
// import Swal from 'sweetalert2'

interface IState {
  loading: boolean
  material: string
  productCode: string
  description: string
}

export const useAddMaterialStore = defineStore('add-material', {
  state: (): IState => ({
    loading: false,
    material: '',
    productCode: '',
    description: ''
  }),
  actions: {
    async onSubmit(data: MaterialData[], callback: Function) {
      const locationNumber = Math.floor(Math.random() * 6) + 1

      await nextTick()
      data.push({
        Material: this.material,
        ProductCode: this.productCode,
        Location: `A${locationNumber}`,
        QTY: 0
      })

      callback()

      //   Swal.fire({
      //     title: 'Success!',
      //     text: 'Your operation was successful.',
      //     icon: 'success',
      //     confirmButtonText: 'Great!'
      //   }).then(() => {
      //     callback()
      //   })
    }
  }
})
