<script setup lang="ts">
import { Modal } from 'bootstrap'
import { ref } from 'vue'
import SearchInput from './SearchInput.vue'
import TextInput from './TextInput.vue'
import TextAreaInput from './TextAreaInput.vue'

const modal = ref()
const showModal = () => {
  const modalElement = modal.value
  const bootstrapModal = new Modal(modalElement)
  bootstrapModal.show()
}

const hideModal = () => {
  const modalElement = modal.value
  const bootstrapModal = Modal.getInstance(modalElement)
  bootstrapModal?.hide()
}

defineExpose({
  showModal,
  hideModal
})
</script>
<template>
  <div
    ref="modal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    class="modal fade"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered" style="max-width: 500px !important">
      <div class="modal-content p-2 d-flex">
        <button
          type="button"
          class="btn-close align-self-end"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
        <div class="modal-body">
          <form class="row">
            <div class="col-12">
              <div class="col-12 d-flex">
                <span class="fs-4 col-5 align-self-end">Material :</span>
                <SearchInput
                  class="col-7"
                  :options="['test1', 'test2']"
                  placeholder="ค้นหา"
                  name="material-value"
                />
              </div>
              <div class="col-12 d-flex mt-3">
                <span class="fs-4 col-5 align-self-end">Product Code :</span>
                <TextInput class="col-7" name="product-code" />
              </div>
              <div class="col-12 mt-2">
                <span class="fs-4 col-5 align-self-end">Description :</span>
                <TextAreaInput min-height="130px" name="material-value" />
              </div>
            </div>
            <div class="col-12 d-flex justify-content-center mt-4 gap-3">
              <button type="button" class="btn btn-success px-4">ADD</button>
              <button
                type="button"
                class="btn btn-light text-dark"
                style="border: 1px solid #e9e9e9"
                @click="hideModal"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
