<script lang="ts">
import Vue, { PropOptions } from 'vue'

import type { NewsDisplayOption } from '~/types/NewsDisplayOption'
import type { ResourceItem } from '~/types/ResourceItem'

export default Vue.extend({
  props: {
    displayOptions: {
      type: Array,
      required: true
    } as PropOptions<Array<NewsDisplayOption>>,
    resourceArray: {
      type: Array,
      required: true
    } as PropOptions<Array<ResourceItem>>
  },
  computed: {
    activeResourceFilter: {
      get() {
        return this.$store.getters.getResourceFilter
      },
      set(value: string) {
        this.$store.dispatch('handleResourceFilter', value)
      }
    }
  },
  methods: {
    handleResourceFilter(resource: string): void {
      this.activeResourceFilter = resource
      this.$router.push({ params: { page: '1' }, query: { ...this.$route.query, resource } })
      this.$store.dispatch('handleResourceFilter', resource)
    },
    handleNewsDisplayOption(optionType: string) {
      this.$store.dispatch('changeNewsDisplayOption', optionType)
      localStorage.setItem('newsDisplayOption', optionType)
    },
    handleResourceActiveClass(resource: string) {
      if (!this.activeResourceFilter && resource === 'all') {
        return 'active'
      }

      if (this.activeResourceFilter === resource) {
        return 'active'
      }

      return 'default'
    }
  }
})
</script>

<template>
  <div class="filters">
    <ul class="list">
      <li
        v-for="resource in resourceArray"
        :key="resource.name"
        :class="handleResourceActiveClass(resource.resource) + ' resource-item'"
        @click="handleResourceFilter(resource.resource)"
      >
        {{ resource.name }}
      </li>
    </ul>
    <ul class="list">
      <li
        v-for="option in displayOptions"
        :key="option.type"
        @click="handleNewsDisplayOption(option.type)"
      >
        <img
          :src="option.imgName"
          :alt="`Изображения типа отображения списка ${option.type}`"
          :class="'active'"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.filters {
  @include flex-h-sb-v-center;
  width: 100%;
}

.list {
  @include flex-h-sb-v-center;
  gap: 10px;

  @include without-select;
}

.resource-item {
  @include resources-font;
}

.active {
  color: $color-blue;
}
</style>
