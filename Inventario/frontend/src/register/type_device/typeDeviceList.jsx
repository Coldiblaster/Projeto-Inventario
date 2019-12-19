import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getListDispositivo, showUpdate, showDelete } from './typeDeviceActions'

class DeviceList extends Component {

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
                <td>{bc.disp_host}</td>
                <td>{bc.disp_tipolicenca_so}</td>
                <td>{bc.disp_proc}</td>
                <td>{bc.disp_ram}</td>
                <td>{bc.disp_hd}</td>
                <td>{bc.disp_ip}</td>
                <td>{bc.disp_mac}</td>
                <td>{bc.disp_imei}</td>
               <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(bc)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showDelete(bc)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
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
                            <th>Host</th>
                            <th>Sistema Operacional</th>
                            <th>Processador</th>
                            <th>Ram</th>
                            <th>Hd</th>
                            <th>Ip</th>
                            <th>Mac</th>
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

const mapStateToProps = state => ({ list: state.type_device.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getListDispositivo, showUpdate, showDelete }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DeviceList)