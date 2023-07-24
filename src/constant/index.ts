export const LIST_SEARCH_PARAM_KEY = 'keyword'

export const LIST_PAGE_PARAM_KEY = 'page'
export const LIST_PAGE_SIZE_PARAM_KEY = 'pageSize'
export const LIST_PAGE_SIZE = 10

export const HOME_PATH = '/'
export const LOGIN_PATH = '/login'
export const REGISTER_PATH = '/register'

export const MANAGE_INDEX_PATH = '/manage/list'

export function isNoNeedUserInfo(pathname: string) {
  return [HOME_PATH, LOGIN_PATH, REGISTER_PATH].includes(pathname)
}

export const STAT_COLORS = ['#f6bd60', '#f7ede2', '#f5cac3', '#84a59d', '#f28482', '#ff99c8']
