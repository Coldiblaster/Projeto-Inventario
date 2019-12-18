import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getListTiposSoft, showUpdate, showDelete } from './typeSoftwareActions'
import { formatarData } from '../../common/operator/formataData'

class TiposSoftwaresList extends Component {

    componentWillMount() {
        this.props.getListTiposSoft()
    }
       
    renderRows() {
        const list = this.props.list || [] 

        return list.map(bc => (
           <tr key={bc.tipo_id}>
               <td>{bc.soft_nome}</td>
               <td>{bc.tipo_key}</td>
               <td>{bc.tipo_descricao}</td>
               <td>{bc.tipo_nf}</td>
               <td>{formatarData(bc.tipo_data_compra)}</td>
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
                            <th>Versão do Software</th>
                            <th>Serial</th>
                            <th>Descrição</th>
                            <th>Nota Fiscal</th>
                            <th>Data da Compra</th>
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
const mapStateToProps = state => ({list: state.type_software.list})
const mapDispatchToProps = dispatch => bindActionCreators({getListTiposSoft, showUpdate, showDelete}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TiposSoftwaresList)
