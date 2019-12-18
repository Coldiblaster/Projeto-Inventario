import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'

import TiposSoftwaresForm2 from './typeSoftwareForm2'
import { init } from './typeSoftwareActions'

class TiposSoftwaresForm extends Component {
    render() {
        const { handleSubmit, readOnly } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <div className='box-body'>
                    <TiposSoftwaresForm2 readOnly={readOnly}/>
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

TiposSoftwaresForm = reduxForm({form: 'tipoSoftwareForm', destroyOnUnmount: false})(TiposSoftwaresForm)
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(null, mapDispatchToProps)(TiposSoftwaresForm)


