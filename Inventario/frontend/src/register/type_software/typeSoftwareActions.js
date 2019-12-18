import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../../common/tab/tabActions'
import { formatarCampoData } from '../../common/operator/formataData'

const BASE_URL = 'http://localhost:3000'
const INITIAL_VALUES = {}

export function getListTiposSoft() {
    const request = axios.get(`${BASE_URL}/software_type`)
    return {
        type: 'TYPE_SOFTWARES_OBTAINED',
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
        delete(values.soft_nome)
        const id = values.tipo_id ? values.tipo_id : ''
        axios[method](`${BASE_URL}/software_type/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(resp => {
            toastr.error('Erro', `${resp.response.data}`)
            })  
    }
}


export function showUpdate(type_software) {
    const data = formatarCampoData(type_software.tipo_data_compra)
    type_software.tipo_data_compra = data
    return [     
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('tipoSoftwareForm', type_software)
    ]
}

export function showDelete(type_software) {
    const data = formatarCampoData(type_software.tipo_data_compra)
    type_software.tipo_data_compra = data
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('tipoSoftwareForm', type_software)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getListTiposSoft(),
        initialize('tipoSoftwareForm', INITIAL_VALUES)
    ]
}