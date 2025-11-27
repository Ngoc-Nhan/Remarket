/* eslint-disable no-undef */

let apiRoot = 'http://localhost:8017/v1'
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017/v1'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'http://yourlinkProduction'
}
export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12
