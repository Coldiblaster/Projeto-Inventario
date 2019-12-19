import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { getListTipoDisp } from '../device/deviceActions'
import { init } from './typeDeviceActions'
import LabelAndInput from '../../common/form/labelAndInput'

class DeviceForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedValue: 0,
        }
        this.handleOptions = this.handleOptions.bind(this);
    }

    handleOptions(event) {
        this.setState({ selectedValue: event.target.value })
    }

    componentWillMount() {
        this.props.getListTipoDisp()
    }

    render() {
        const { handleSubmit, readOnly, submitLabel } = this.props
        const list = this.props.list || []
        const desabilitaSelect = this.props.readOnly === true
        var pos = 0
        var disp = list.length === 0 ? [] : list.map((item, index) => {
            if (item.tipo_disp_id == this.state.selectedValue) {
                pos = index
                return (item.tipo_disp_nome)
            }
        })

        const tipo_disp = disp[pos] || this.props.tipo_nome 
        return (
            <form onSubmit={handleSubmit}>
                <div className='box-body'>
                    <section className='box-body'>
                        <div className='container-fluid'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='form-group'>
                                        <div className='col-md-3'>
                                            <label>Dispositivo</label>
                                            <Field name="disp_tipo_id" component="select" className='form-control' value={this.state.selectedValue} onChange={this.handleOptions} disabled={desabilitaSelect}>
                                                <option>Selecione um Software</option>
                                                {
                                                    list.length === 0 ? [] :
                                                        list.map((item, index) =>
                                                            
                                                            <option value={item.tipo_disp_id} key={"lista-getListTipoDisp" + index}>{item.tipo_disp_nome}</option>
                                                        )
                                                }
                                            </Field>
                                        </div>
                                        <div className='col-md-2'>
                                            <Field name='disp_patrimonio' component={LabelAndInput} readOnly={readOnly}
                                                label='Patrimônio' placeholder='Patrimônio' cols='0' />
                                        </div>
                                        <div className='col-md-2'>
                                            <Field name='disp_marca' component={LabelAndInput} readOnly={readOnly}
                                                label='Marca' placeholder='Insira a Marca' cols='0' />
                                        </div>
                                        <div className='col-md-2'>
                                            <Field name='disp_modelo' component={LabelAndInput} readOnly={readOnly}
                                                label='Modelo' placeholder='Insira o modelo' cols='0' />
                                        </div>
                                        <div className='col-md-3'>
                                            <Field name='disp_nf' component={LabelAndInput} readOnly={readOnly}
                                                label='Nota Fiscal' placeholder='Nenhum Arquivo Selecionado' cols='0' />
                                        </div>
                                        <div className='col-md-12'>
                                            <Field name='disp_descricao' component={LabelAndInput} readOnly={readOnly}
                                                label='Descrição' placeholder='Descrição' cols='0' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            tipo_disp == 'Desktop' || tipo_disp == 'Notebook' ? (
                                <div className='detalhesDevice'>
                                    <h4 className='tituTipoSoft'>Detalhes do Desktop ou Notebook</h4>
                                    <div className='col-md-2'>
                                        <Field name='disp_host' component={LabelAndInput} readOnly={readOnly}
                                            label='HostName' placeholder='Nome Local' cols='0' />
                                    </div>
                                    <div className='col-md-4'>
                                        <Field name='disp_tipolicenca_so' component={LabelAndInput} readOnly={readOnly}
                                            label='Sistema Operacional' placeholder='Insira o modelo do Sistema Operacional' cols='0' />
                                    </div>
                                    <div className='col-md-4'>
                                        <Field name='disp_proc' component={LabelAndInput} readOnly={readOnly}
                                            label='Processador' placeholder='Insira o modelo do Processador' cols='0' />
                                    </div>
                                    <div className='col-md-1'>
                                        <Field name='disp_ram' component={LabelAndInput} readOnly={readOnly}
                                            label='Ram' placeholder='GB' cols='0' />
                                    </div>
                                    <div className='col-md-1'>
                                        <Field name='disp_hd' component={LabelAndInput} readOnly={readOnly}
                                            label='HD' placeholder='GB' cols='0' />
                                    </div>
                                    <div className='col-md-2'>
                                        <Field name='disp_ip' component={LabelAndInput} readOnly={readOnly}
                                            label='IP' placeholder='Insira o IP' cols='0' />
                                    </div>
                                    <div className='col-md-2'>
                                        <Field name='disp_mac' component={LabelAndInput} readOnly={readOnly}
                                            label='MAC' placeholder='Insira o MAC' cols='0' />
                                    </div>
                                </div>
                            ) : tipo_disp === 'Smartphone' ? (
                                <div className='detalhesSoft'>
                                    <h4 className='tituTipoSoft'>Detalhes do Smartphone</h4>
                                    <div className='col-md-2'>
                                        <Field name='disp_imei' component={LabelAndInput} readOnly={readOnly}
                                            label='IMEI' placeholder='Insira o IMEI do aparelho' cols='0' />
                                    </div>
                                    <div className='col-md-1'>
                                        <Field name='disp_ram' component={LabelAndInput} readOnly={readOnly}
                                            label='Ram' placeholder='GB' cols='0' />
                                    </div>
                                    <div className='col-md-1'>
                                        <Field name='disp_hd' component={LabelAndInput} readOnly={readOnly}
                                            label='Armazenamento' placeholder='HD' cols='0' />
                                    </div>
                                </div>
                            ) : (null)
                        }
                    </section>
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`} >
                        {this.props.submitLabel} 
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

DeviceForm = reduxForm({ form: 'deviceForm', destroyOnUnmount: false })(DeviceForm)
const selector = formValueSelector('deviceForm')
const mapStateToProps = state => ({ list: state.device.list, tipo_nome: selector(state, 'tipo_disp_nome') }) // state.software.list para trazer a lista do select
const mapDispatchToProps = dispatch => bindActionCreators({ init, getListTipoDisp }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DeviceForm)


