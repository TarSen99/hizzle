import axios from 'axios'

import { API_BASE_URL } from './../helpers/constants'

class Api {
    constructor(baseUrl) {
        this.apiService = axios
        this.apiService.defaults.baseURL = baseUrl

        return this.apiService
    }
}

const api = new Api(API_BASE_URL)

export const getProperties = () => {
    return api.get('/properties')
}

export const getOffers = () => {
    return api.get('/offers')
}