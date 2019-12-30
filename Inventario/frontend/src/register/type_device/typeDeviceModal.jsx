import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { getListDispositivo } from './typeDeviceActions'
import { showDisp } from '../inventory/inventoryActions'

class TypeDeviceModal extends React.Component {

    componentWillMount() {
        this.props.getListDispositivo()
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(bc => (
            <tr key={bc.disp_id}>
                <td>{bc.tipo_disp_nome}</td>
                <td>{bc.disp_patrimonio}</td>
                <td>{bc.disp_marca}</td>
                <td>{bc.disp_modelo}</td>
                <td>{bc.disp_imei}</td>
                <button className='btn btn-success disptipo' onClick={() => this.props.showDisp(bc)}>
                        <i className='fa fa-plus'></i>
                </button> 
            </tr>
        ))
    }
    // Verificar depois na aula de todoapp algo sobre utilizar o button só uma vez
    render() {
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Dispositivo</th>
                            <th>Patrimônio</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Imei</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

TypeDeviceModal = reduxForm({form: 'typeDeviceModal', destroyOnUnmount: false})(TypeDeviceModal)
const mapStateToProps = state => ({ list: state.type_device.list})
const mapDispatchToProps = dispatch => bindActionCreators({getListDispositivo, showDisp}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TypeDeviceModal)
 

