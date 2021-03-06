import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../../common/tab/tabActions'

const BASE_URL = 'http://localhost:3000'
const INITIAL_VALUES = {}

export function getListInv() {
    const request = axios.get(`${BASE_URL}/inventory`)
    return {
        type: 'INVENTORY_OBTAINED',
        payload: request
    }
}

export function create(values) {
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put') 
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    return dispatch => {
        const id = values.inv_id ? values.inv_id : ''
        axios[method](`${BASE_URL}/inventory/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(resp => {
            toastr.error('Erro', `${resp.response.data}`)
            })
    }
}

export function showUpdate(inventory) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('inventoryForm', inventory)
    ]
}

export function showDelete(inventory) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('inventoryForm', inventory)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getListInv(),
        initialize('inventoryForm', INITIAL_VALUES)
    ]
}

export function showDisp(device) {
    return [
        initialize('inventoryForm', device, true)
    ]
}
