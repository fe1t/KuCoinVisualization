// import * as httpStatus from 'http-status'

import _ from 'lodash'
import axios from 'axios'
import https from 'https'
import snakeize from 'snakeize'

const camelcaseKeys = require('camelcase-keys')

const api = axios.create({
  baseURL: '',
  transformRequest: axios.defaults.transformRequest.concat((data, headers) => {
    // TODO: make localStorage singleton with Autocheck Storage Exists
    try {
      const token = localStorage.getItem(process.env.tokenName)
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    } catch (e) {} // eslint-disable-line no-empty
    return data
  }),
  transformResponse: axios.defaults.transformResponse.concat(data => {
    //return camelcaseKeys(data || {}, { deep: true })
    return data
  }),
  httpsAgent: new https.Agent({ rejectUnauthorized: false })
})

const verbs = ['get', 'post', 'put', 'patch', 'delete']

class ApiManager {}

function handleSuccess(res) {
  return res
}

function handleFailed(res) {
  return res.response
}

/* handle each verb here */
for (let verb of verbs) {
  if (!_.includes(['get', 'delete'], verb)) {
    ApiManager.prototype[verb] = function(url, data, config) {
      return api[verb](url, snakeize(data), config).then(handleSuccess, handleFailed)
    }
  } else {
    ApiManager.prototype[verb] = function(url, config) {
      return api[verb](url, config).then(handleSuccess, handleFailed)
    }
  }
}

export default new ApiManager()
