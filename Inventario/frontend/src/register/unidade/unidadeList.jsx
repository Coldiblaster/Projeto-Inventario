import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './unidadeActions'

class UnidadeList extends Component {

    componentWillMount() {
        this.props.getList()
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(bc => (
           <tr key={bc.uni_id}>
               <td>{bc.uni_nome}</td>
               <td>{bc.uni_endereco}</td>
               <td>{bc.uni_bairro}</td>
               <td>{bc.uni_cep}</td>
               <td>{bc.uni_cidade}</td>
               <td>{bc.uni_telefone}</td>
               <td>{bc.uni_cnpj}</td>
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
                            <th>Unidade</th>
                            <th>Endereço</th>
                            <th>Bairro</th>
                            <th>Cep</th>
                            <th>Cidade</th>
                            <th>Telefone</th>
                            <th>Cnpj</th>
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

const mapStateToProps = state => ({list: state.unidade.list})
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, showDelete}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(UnidadeList)