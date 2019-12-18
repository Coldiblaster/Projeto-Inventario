import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getListSoftwares, showUpdate, showDelete } from './softwareActions'

class SoftwareList extends Component {

    componentWillMount() {
        this.props.getListSoftwares()
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(bc => (
           <tr key={bc.soft_id}>
               <td>{bc.soft_nome}</td>
               <td>{bc.soft_qtd}</td>
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
                            <th>Quantidade</th>
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

const mapStateToProps = state => ({list: state.software.list})
const mapDispatchToProps = dispatch => bindActionCreators({getListSoftwares, showUpdate, showDelete}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SoftwareList)