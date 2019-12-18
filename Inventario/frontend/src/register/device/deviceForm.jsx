import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { init } from './deviceActions'
import LabelAndInput from '../../common/form/labelAndInput'
import If from '../../common/operator/if'

class DeviceForm extends Component {
    
    render() {
        const { handleSubmit, readOnly } = this.props
        return (
            <form>
                <div className='box-body border-form-soft'>
                    <Field name='tipo_disp_nome' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe nome do Dispositivo' />
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

DeviceForm = reduxForm({form: 'deviceForm', destroyOnUnmount: false})(DeviceForm)
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(null, mapDispatchToProps)(DeviceForm)


