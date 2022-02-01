<template>
  <transition :name="name">
    <div
      class="modal-background"
      :class="{ centered, popup, nopadding }"
      v-bind="$attrs"
    >
      <div class="modal-wrapper">
        <button
          v-if="closeable"
          class="absolute top-0 right-0 mt-4 mr-4 z-10"
          @click="$emit('close')"
        >
          <XIcon size="2x" />
        </button>
        <div :class="'modal-container' + (scroll ? ' overflow-y-auto' : '')">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { XIcon } from 'vue-feather-icons'

export default {
  components: {
    XIcon
  },
  inheritAttrs: false,
  props: {
    centered: {
      type: Boolean,
      default: false
    },
    popup: {
      type: Boolean,
      default: false
    },
    nopadding: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'modal'
    },
    scroll: {
      type: Boolean,
      default: false
    },
    closeable: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style scoped lang="postcss">
.modal-wrapper {
  @apply fixed z-20 left-0 h-screen w-full flex bg-white;
  transition: opacity 0.2s ease;
}

.popup .modal-wrapper {
  @apply fixed h-auto w-auto rounded-md;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s ease;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 30;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-container {
  @apply w-full py-12 px-8 relative;
  max-height: 100vh;
}

.nopadding .modal-container {
  @apply py-0;
}

.centered .modal-wrapper {
  @apply flex items-center justify-center;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: transform 0.5s ease;
}

.up-enter,
.up-leave-to {
  transform: translateY(100%);
  transition: all 0.5s;
}

/* MOBILE */
@media all and (max-width: 767px) {
  .modal-wrapper {
    top: 50px;
    overflow: scroll;
  }

  .popup .modal-wrapper {
    @apply fixed z-50 top-0 left-0 h-screen w-full;
    transform: translate(0, 0);
  }
}
</style>
