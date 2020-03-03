import { axios } from '@/utils/request'

const api = {
  articleCreate: '/articleCreate'
}

/**
 * create func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function createArt (parameter) {
  return axios({
    url: api.articleCreate,
    method: 'post',
    data: parameter
  })
}
