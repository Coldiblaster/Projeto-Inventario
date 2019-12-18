import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../../common/tab/tabActions'

const BASE_URL = 'http://localhost:3000'
const INITIAL_VALUES = {}

export function getListSoftwares() {
    const request = axios.get(`${BASE_URL}/software`)
    return {
        type: 'SOFTWARES_OBTAINED',
        payload: request
    }
}

export function create(values) {
    return submit(values, 'post')
}

export function createTipos(values) {
    return submitTipos(values, 'post')
}

export function update(values) {
    return submit(values, 'put') 
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    return dispatch => {
        const id = values.soft_id ? values.soft_id : ''
        console.log(values)
        axios[method](`${BASE_URL}/software/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(resp => {
            toastr.error('Erro', `${resp.response.data}`)
            })
    }
}

function submitTipos(values, method) {
    return dispatch => {
        const id = values.soft_id ? values.soft_id : ''
        console.log(values)
        axios[method](`${BASE_URL}/software/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(initTipos())
            })
            .catch(resp => {
            toastr.error('Erro', `${resp.response.data}`)
            })
    }
}

export function showUpdate(software) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('softwareForm', software)
    ]
}

export function showDelete(software) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('softwareForm', software)
    ]
}
export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getListSoftwares(),
        initialize('softwareForm', INITIAL_VALUES)
    ]
}

export function initTipos() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabCreate'),
        getListSoftwares(),
        initialize('softwareForm', INITIAL_VALUES)
    ]
}







