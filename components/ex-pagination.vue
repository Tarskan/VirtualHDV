<template>
  <div class="flex m-auto">
    <a
      :class="isFirstPage ? 'disabled' : ''"
      :href="!isFirstPage && pageLink ? pageLink(currentPage - 1) : undefined"
      @click="!isFirstPage && !pageLink ? goToPage(currentPage - 1) : undefined"
    >
      <ArrowLeftCircleIcon size="2x" class="arrow"
    /></a>
    <div class="flex items-center">
      <a
        v-for="p in visiblePages"
        :key="p"
        :class="
          currentPage === p ? 'currentPage' : p === '...' ? 'pageOff' : 'page'
        "
        :href="
          p !== currentPage && p !== '...' && pageLink ? pageLink(p) : undefined
        "
        @click="
          p !== currentPage && p !== '...' && !pageLink
            ? goToPage(p)
            : undefined
        "
      >
        {{ p }}
      </a>
    </div>
    <a
      :class="isLastPage ? 'disabled' : ''"
      :href="!isLastPage && pageLink ? pageLink(currentPage + 1) : undefined"
      @click="!isLastPage && !pageLink ? goToPage(currentPage + 1) : undefined"
    >
      <ArrowRightCircleIcon size="2x" class="arrow"
    /></a>
  </div>
</template>

<script>
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'vue-feather-icons'
export default {
  components: {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon
  },
  props: {
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: undefined
    },
    pageLink: {
      type: Function,
      default: undefined
    },
    items: {
      type: Number,
      default: 3
    }
  },
  data: () => ({
    currentPage: 1
  }),
  computed: {
    isFirstPage() {
      return this.currentPage < 2
    },
    lastPage() {
      return this.total === undefined
        ? undefined
        : Math.floor(this.total / this.size) + (this.total % this.size ? 1 : 0)
    },
    isLastPage() {
      return this.currentPage >= this.lastPage
    },
    visiblePages() {
      const a = []
      const from = Math.max(1, this.currentPage - this.items)
      if (from > 1) {
        a.push(1)
        if (from === 3) {
          a.push(2)
        } else if (from > 3) {
          a.push('...')
        }
      }
      const to = Math.min(this.lastPage, this.currentPage + this.items)
      for (let p = from; p <= to; p++) {
        a.push(p + 0)
      }
      if (to < this.lastPage) {
        if (to === this.lastPage - 2) {
          a.push(this.lastPage - 1)
        } else if (to < this.lastPage - 2) {
          a.push('...')
        }
        a.push(this.lastPage)
      }
      return a
    }
  },
  watch: {
    page(p) {
      this.currentPage = p
    }
  },
  mounted() {
    this.currentPage = this.page || 1
  },
  methods: {
    goToPage(p) {
      this.$emit('page', p)
    }
  }
}
</script>

<style lang="postcss" scoped>
.arrow {
  @apply text-blue-600 cursor-pointer;
}
.disabled {
  opacity: 0;
}
.page,
.pageOff,
.currentPage {
  @apply mx-2 flex-none;
}
.page {
  @apply cursor-pointer;
  transition: font-size 0.5s;
}
.currentPage {
  @apply font-bold;
}
.page:hover {
  @apply text-blue-600;
}
</style>
