import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../../common/tab/tabActions'

const BASE_URL = 'http://localhost:3000'
const INITIAL_VALUES = {}

export function getListDispositivo() {
    const request = axios.get(`${BASE_URL}/device`)
    return {
        type: 'TYPE_DEVICES_OBTAINED',
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
        const id = values.disp_id ? values.disp_id : ''
        axios[method](`${BASE_URL}/device/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(resp => {
            toastr.error('Erro', `${resp.response.data}`)
            })
    }
}

export function showUpdate(device) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('deviceForm', device)
    ]
}

export function showDelete(device) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('deviceForm', device)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getListDispositivo(),
        initialize('deviceForm', INITIAL_VALUES)
    ]
}