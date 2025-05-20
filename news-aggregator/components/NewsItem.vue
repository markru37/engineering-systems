<template>
  <div v-if="displayType === 'grid'" class="news-card tile">
    <div class="information-tiles">
      <a :href="newsItem.link" target="_blank" rel="noopener">
        <h3 class="title text-overflow">{{ newsItem.title }}</h3>
      </a>
      <p class="description text-overflow">
        {{
          newsItem.description ||
          'СМИ не предоставило никакого описания к своей новости - перейдите на сайт СМИ, чтобы посмотреть детальную информацию'
        }}
      </p>
      <a :href="newsItem.link" target="_blank" rel="noopener" class="link text-underline"
        >Подробнее</a
      >
    </div>
    <div class="details">
      <h4 class="resource text-underline">
        {{ newsItem.resource }}
      </h4>
      <p class="posted">{{ newsItem.posted }}</p>
    </div>
  </div>
  <div v-else-if="displayType === 'list'" class="news-card list">
    <div class="content">
      <img
        :src="newsItem.image"
        class="image"
        width="220"
        height="100"
        loading="lazy"
        :alt="`Изображение для новости ${newsItem.title}`"
      />
      <div class="information-list">
        <a :href="newsItem.link" target="_blank" rel="noopener">
          <h3 class="title text-overflow">{{ newsItem.title }}</h3>
        </a>
        <p class="description text-overflow">
          {{
            newsItem.description ||
            'СМИ не предоставило никакого описания к своей новости - перейдите на сайт СМИ, чтобы посмотреть детальную информацию'
          }}
        </p>
      </div>
    </div>
    <div class="details">
      <h4 class="resource text-underline">
        {{ newsItem.resource }}
      </h4>
      <p class="posted">{{ newsItem.posted }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import type { NewsItem } from '~/types/NewsItem'

export default Vue.extend({
  props: {
    newsItem: {
      type: Object,
      required: true
    } as PropOptions<NewsItem>,
    displayType: {
      type: String,
      required: true
    } as PropOptions<string>
  }
})
</script>

<style lang="scss" scoped>
.news-card {
  @include flex-column-v-sb;
  width: 100%;
  padding: 30px 30px 15px;

  box-shadow: $default-box-shadow;
}

.tile {
  height: 260px;
}

.list {
  height: 200px;

  @include mobile {
    height: 500px;
  }
}

.text-overflow {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis ' [..]';

  @include mobile {
    line-clamp: 4;
    -webkit-line-clamp: 4;
  }
}

.link,
.resource,
.posted,
.description {
  @include text-font;

  @include tablet {
    font-size: 12px;
  }
}

.content {
  display: flex;
  flex-direction: row;
  gap: 20px;

  @include mobile {
    flex-direction: column;
  }
}

.image {
  aspect-ratio: 2 / 1;
  width: 240px;
  height: auto;
  object-fit: cover;

  @include mobile {
    aspect-ratio: 2 / 1;
    width: 100%;
    height: auto;
  }
}

.information-list {
  @include flex-column-v-sb;
  max-width: 1050px;
  height: 120px;
}

.information-tiles {
  @include flex-column-v-sb;
  height: 170px;
}

.title {
  @include h3-font;
  color: $color-blue;

  max-height: 70px;

  @include tablet {
    font-size: 16px;
  }
}

.description {
  max-height: 40px;
}

.text-underline {
  text-decoration: underline;
}

.link {
  color: $color-blue;
}

.details {
  @include flex-h-sb-v-center;
  color: $color-light-gray;
}
</style>
