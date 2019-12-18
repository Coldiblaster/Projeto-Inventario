import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { init } from './unidadeActions'
import LabelAndInput from '../../common/form/labelAndInput'

class UnidadeForm extends Component {
    
    render() {
        const { handleSubmit, readOnly } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='uni_nome' component={LabelAndInput} readOnly={readOnly}
                        label='Unidade' cols='12 4' placeholder='Informe a Unidade' />
                    <Field id='cep' name='uni_cep'  component={LabelAndInput} readOnly={readOnly} 
                        label='Cep' cols='12 4' placeholder='Informe o Cep' maxLength='9'/>
                    <Field id='endereco' name='uni_endereco' component={LabelAndInput} readOnly={readOnly} 
                        label='Endereço' cols='12 4' placeholder='Informe o Endereço' />
                    <Field id='bairro' name='uni_bairro' component={LabelAndInput} readOnly={readOnly} 
                        label='Bairro' cols='12 4' placeholder='Informe o Bairro' />
                    <Field id='cidade' name='uni_cidade' component={LabelAndInput} readOnly={readOnly} 
                        label='Cidade' cols='12 4' placeholder='Informe a Cidade' />
                    <Field name='uni_telefone' component={LabelAndInput} readOnly={readOnly} 
                        label='Telefone' cols='12 4' placeholder='Informe o Telefone' maxLength='11' />
                    <Field name='uni_cnpj' component={LabelAndInput} readOnly={readOnly} 
                        label='Cnpj' cols='12 4' placeholder='Informe o Cnpj' maxLength='18' />

                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}



UnidadeForm = reduxForm({form: 'unidadeForm', destroyOnUnmount: false})(UnidadeForm)
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(null, mapDispatchToProps)(UnidadeForm)
