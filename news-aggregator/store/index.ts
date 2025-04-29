import { GetterTree, ActionTree, MutationTree } from 'vuex'

import type { NewsItem } from '~/types/NewsItem'
import type { StateType } from '~/types/State'

import { parseXml } from '~/utils/parseXml'

export const state = (): StateType => ({
  news: [],
  newsPerPage: 4,
  resources: [
    {
      name: 'All',
      resource: 'all',
      link: null
    },
    {
      name: 'Lenta.ru',
      resource: 'lenta.ru',
      link: 'https://lenta.ru/rss/news'
    },
    {
      name: 'Mos.ru',
      resource: 'mos.ru',
      link: 'https://www.mos.ru/rss'
    },
    {
      name: 'ООН',
      resource: 'news.un.org',
      link: 'https://news.un.org/feed/subscribe/ru/news/region/europe/feed/rss.xml'
    }
  ],
  newsDisplayOptions: [
    {
      type: 'list',
      imgName: 'list-type-icon.svg'
    },
    {
      type: 'grid',
      imgName: 'tile-type-icon.svg'
    }
  ],
  filters: {
    search: null,
    resource: null
  },
  activeNewsDisplayOption: 'grid',
  activePage: 1
})

export type RootState = StateType

export const getters: GetterTree<StateType, RootState> = {
  getNewsListOnPage: (state: StateType, getters) => {
    const copyFilteredNewsList: NewsItem[] = getters.getFilteredNews

    const start: number = (state.activePage - 1) * state.newsPerPage
    const end: number = start + state.newsPerPage

    return copyFilteredNewsList.slice(start, end)
  },
  getFilteredNews: (state: StateType) => {
    let copiedNewsList: NewsItem[] = JSON.parse(JSON.stringify(state.news))

    const resource = state.filters.resource
    const search = state.filters.search?.toLowerCase()

    if (!resource && !search) {
      return copiedNewsList
    }

    if (resource && copiedNewsList.length && resource !== 'all') {
      copiedNewsList = copiedNewsList.filter((item: NewsItem) => item.resource.includes(resource))
    }

    if (search && copiedNewsList.length) {
      copiedNewsList = copiedNewsList.filter(
        item =>
          item.title.toLowerCase().includes(search) ||
          item.description?.toLowerCase().includes(search)
      )
    }

    return copiedNewsList
  },
  getActiveNewsDisplayOption: (state: StateType) => state.activeNewsDisplayOption,
  getSearchFilter: (state: StateType) => state.filters.search,
  getResourceFilter: (state: StateType) => state.filters.resource,
  getNewsDisplayOptions: (state: StateType) => state.newsDisplayOptions,
  getResourceArray: (state: StateType) => state.resources,
  getNewsPagination: (state: StateType, getters) => {
    const copyFilteredNewsList: NewsItem[] = getters.getFilteredNews
    const newCountPerPage = state.newsPerPage
    const pageCount = Math.ceil(copyFilteredNewsList.length / newCountPerPage)

    const paginationRange = 2
    const ellipsis = '...'

    const pagination: (number | string)[] = []

    pagination.push(1)

    // Определяем начальную и конечную границы для отображения страниц
    const start = Math.max(2, state.activePage - paginationRange)
    const end = Math.min(pageCount - 1, state.activePage + paginationRange)

    // Если начальная граница находится достаточно далеко от первой страницы, добавляем многоточие
    if (start - 1 > 2) {
      pagination.push(ellipsis)
    }

    // Добавляем страницы в массив результатов
    for (let i = start; i <= end; i++) {
      pagination.push(i)
    }

    // Если конечная граница находится достаточно далеко от последней страницы, добавляем многоточие
    if (end < pageCount - 1) {
      pagination.push(ellipsis)
    }

    // Добавляем последнюю страницу в массив результатов
    pagination.push(pageCount)

    return pagination
  }
}

export const mutations: MutationTree<RootState> = {
  setNews: (state: StateType, payload: NewsItem[]) => (state.news = payload),
  setSearchFilter: (state: StateType, payload: string) => (state.filters.search = payload),
  setResourceFilter: (state: StateType, payload: string | null) =>
    (state.filters.resource = payload),
  clearFilters: (state: StateType) => {
    state.filters.search = null
    state.filters.resource = null
  },
  setNewsDisplayOption: (state: StateType, payload: string) =>
    (state.activeNewsDisplayOption = payload),
  setActivePage: (state: StateType, payload: number) => (state.activePage = payload)
}

export const actions: ActionTree<StateType, RootState> = {
  async nuxtServerInit({ commit }) {
    const responcePromises = this.state.resources
      .filter(resource => resource.link)
      .map(resource => parseXml(`${resource.link}`))

    const newsArray = await Promise.all(responcePromises)

    const news: NewsItem[] = newsArray.flat()

    commit('setNews', news)
  },
  changeNewsDisplayOption: ({ commit }, payload: string) => {
    commit('setNewsDisplayOption', payload)
  },
  handleResourceFilter: ({ commit }, payload: string) => {
    commit('setResourceFilter', payload)
  },
  handleSearchFilter: ({ commit }, payload: string | null) => {
    commit('setSearchFilter', payload)
  },
  handleClearFilter: ({ commit }) => {
    commit('clearFilters')
  },
  handleActivePage: ({ commit }, payload: number) => {
    commit('setActivePage', payload)
  },
  async updateNewsList({ commit }) {
    const responcePromises = this.state.resources
      .filter(resource => resource.link)
      .map(resource => parseXml(`/api/rss?source=${resource.link}`))

    const newsArray = await Promise.all(responcePromises)

    const news: NewsItem[] = newsArray.flat()

    commit('setNews', news)
  }
}
