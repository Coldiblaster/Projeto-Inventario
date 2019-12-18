import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getListInv, showUpdate, showDelete } from './inventoryActions'

class InventoryList extends Component {

    componentWillMount() {
        this.props.getListInv()
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(bc => (
           <tr key={bc.inv_id}>
               <td>{bc.disp_id}</td>
               <td>{bc.soft_id}</td>
               <td>{bc.tipo_key}</td>
               <td>{bc.inv_descricao}</td>
               <td>{bc.inv_user}</td>
               <td>{bc.inv_setor}</td>
               <td>{bc.uni_nome}</td>
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
                            <th>Versão do Software</th>
                            <th>Chave</th>
                            <th>Descrição</th>
                            <th>Usuário</th>
                            <th>Setor</th>
                            <th>Unidade</th>
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

const mapStateToProps = state => ({list: state.inventory.list})
const mapDispatchToProps = dispatch => bindActionCreators({getListInv, showUpdate, showDelete}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(InventoryList)