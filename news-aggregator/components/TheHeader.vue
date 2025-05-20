<template>
  <header class="header">
    <div class="header__left">
      <h1 class="title">Список новостей</h1>
      <TheResetButton />
    </div>
    <TheSearchInput />
  </header>
</template>

<style lang="scss" scoped>
.header {
  @include flex-h-sb-v-center;
  flex-wrap: wrap;

  width: 100%;
  gap: 20px;

  padding: 36px 0;

  border-bottom: 1px solid $color-light;

  @include desktop-xxl {
    width: 1440px;
  }

  @include desktop-xl {
    min-width: 1280px;
    width: 80%;
  }

  @include desktop {
    min-width: 1000px;
    max-height: 1440px;
    width: 90%;
  }
}

.header__left {
  @include flex-h-sb-v-center;
  gap: 30px;

  @include mobile {
    width: 100%;
  }
}

.title {
  @include h1-font;
}
</style>
