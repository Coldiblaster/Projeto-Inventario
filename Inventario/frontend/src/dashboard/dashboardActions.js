import axios from 'axios'
const BASE_URL = 'http://localhost:3000'

export function getSummary() {
    const request = axios.get(`${BASE_URL}/stats`)
    return {
        type: 'BILLING_SUMMARY_FETCHED',
        payload: request
    }
}