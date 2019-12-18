import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import LabelAndInput from '../../common/form/labelAndInput'
import { createTipos } from './softwareActions'

class SoftwareModal extends React.Component {
    render() {
    const { handleSubmit/*, readOnly */} = this.props  
        return (
            <form onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='soft_nome' component={LabelAndInput} 
                    label='Versão do Software' cols='8 10' placeholder='Informe nome do Software' />  
                    <button id='btnModalSoft' type='button' className='btn btn-success' onClick={handleSubmit}>
                        <i className='fa fa-plus'></i>
                    </button> 
                </div>
            </form>
    )}
}

SoftwareModal = reduxForm({form: 'softwareForm', destroyOnUnmount: false})(SoftwareModal)
const mapDispatchToProps = dispatch => bindActionCreators({createTipos}, dispatch)
export default connect(null, mapDispatchToProps)(SoftwareModal)


