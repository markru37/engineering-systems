<template>
  <div class="page-content">
    <TheHeader />
    <Nuxt />
  </div>
</template>

<style lang="scss" scoped>
.page-content {
  @include flex-v-center;
  flex-direction: column;
  padding: 0 15px;
}
</style>
