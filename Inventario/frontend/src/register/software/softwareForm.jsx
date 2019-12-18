import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { init } from './softwareActions'
import LabelAndInput from '../../common/form/labelAndInput'
import If from '../../common/operator/if'
class SoftwareForm extends Component {
    
    render() {
        const { handleSubmit, readOnly } = this.props
        const visivel = this.props.readOnly === true
        return (
            <form>
                <div className='box-body border-form-soft'>
                    <Field name='soft_nome' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe nome do Software' />
                    <If test={visivel}>
                        <Field name='soft_qtd' component={LabelAndInput} readOnly={readOnly}
                            label='Quantidade' cols='12 4' placeholder='Informe a Quantidade'/>
                    </If>    
                </div>
                <div className='box-footer'>
                    <button onClick={handleSubmit} className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

SoftwareForm = reduxForm({form: 'softwareForm', destroyOnUnmount: false})(SoftwareForm)
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(null, mapDispatchToProps)(SoftwareForm)


