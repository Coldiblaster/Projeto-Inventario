import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../../common/tab/tabActions'

const BASE_URL = 'http://localhost:3000'
const INITIAL_VALUES = {}

export function getList() {
    const request = axios.get(`${BASE_URL}/unidade`)
    return {
        type: 'UNIDADE_OBTAINED',
        payload: request
    }
}
export function getList1() {
    const request = axios.get(`${BASE_URL}/unidade`)
    return {
        type: 'UNIDADE_OBTAINED',
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
    const id = values.uni_id ? values.uni_id : ''
    return dispatch => {
        axios[method](`${BASE_URL}/unidade/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(resp => {
            toastr.error('Erro', `${resp.response.data}`)
            })
    }
}

export function showUpdate(unidade) {
    return [     
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('unidadeForm', unidade)
    ]
}

export function showDelete(unidade) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('unidadeForm', unidade)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('unidadeForm', INITIAL_VALUES)
    ]
}