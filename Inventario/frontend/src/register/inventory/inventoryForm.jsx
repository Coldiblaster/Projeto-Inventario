import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { Button, Modal, ModalDialog } from 'react-bootstrap'

import { getListSoftwares } from '../software/softwareActions'
import { getList } from '../unidade/unidadeActions'
import { getListDispositivo } from '../type_device/typeDeviceActions'
import { getListTiposSoft } from '../type_software/typeSoftwareActions'
import { getListInv } from '../inventory/inventoryActions'
import { getListTipoDisp } from '../device/deviceActions'
import DeviceTypeModal from '../type_device/typeDeviceModal'
import { init } from '../inventory/inventoryActions'
import LabelAndInput from '../../common/form/labelAndInput'
import If from '../../common/operator/ifInventario'
import { formatarData } from '../../common/operator/formataData'

/**
 * @class que representa o cadastro de Inventario
 */
class InventoryForm extends React.Component {
    /**
     * 
     * @param {*} props o state recebe os códigos dos select e das modal
     */
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: 0,
            selectedTipo: 0,
            selectedDisp: 0,
            showModal: false,
            showDisp: false,
            verifica: 0,
            disp: 0
        }
        this.setSoftware = this.setSoftware.bind(this);
        this.setTipoSoft = this.setTipoSoft.bind(this);
        this.setDevice = this.setDevice.bind(this);
    }

    /**
     * Recebe o select do software
     * @param {*} event código do Software
     */
    setSoftware(event) {
        this.setState({ selectedValue: event.target.value })
    }
    /**
     * Recebe o select do Tipo de Software
     * @param {*} event código do Tipo de Software
     */
    setTipoSoft(event) {
        this.setState({ selectedTipo: event.target.value })
    }
    /**
     * Recebe o select do Dispositivo
     * @param {*} event código do Dispositivo
     */
    setDevice(event) {
        this.setState({ selectedDisp: event.target.value })
    }
    /**
     * Abre a Modal
     */
    setShowModal = () => {
        this.setState({ showModal: true })
    }

    setShowModalDisp = () => {
        this.setState({ showDisp: true })
    }
    /**
     * Fecha o Modal
     */
    setCloseModal = () => {
        this.setState({ showModal: false })
        this.setState({ showDisp: false })
    }

    componentWillMount() {
        this.props.getList()
        this.props.getListSoftwares()
        this.props.getListDispositivo()
        this.props.getListTiposSoft()
        this.props.getListInv()
        this.props.getListTipoDisp()
    }

    /* notificarSaida = (lugar) => {
        alert(lugar)
    } */

    renderRows() {
        const listTipoS = this.props.listTipoS || []
        return (
            <div>
                <Modal show={this.state.showModal} backdrop={false} animation={false} size='lg'>
                    <Modal.Header>
                        <Modal.Title><h3><b>Descrição do Software</b></h3></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modalBodyKeySoft'>
                        <div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Versão do Software</th>
                                        <th>Serial</th>
                                        <th>Data da Compra</th>
                                        <th>Descrição</th>
                                        <th className='table-actions'>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listTipoS.map(bc => (
                                            <tr key={bc.tipo_id}>
                                                {bc.tipo_id == this.state.selectedTipo ? (
                                                    [
                                                        <td>{bc.soft_nome}</td>,
                                                        <td>{bc.tipo_key}</td>,
                                                        <td>{formatarData(bc.tipo_data_compra)}</td>,
                                                        <td>{bc.tipo_descricao}</td>
                                                    ]
                                                ) : (null)
                                                }
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='modalFooterKeySoft'>
                        <Button type='submit' onClick={this.setCloseModal}>
                            Sair
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal className='modalDisp' size='lg' show={this.state.showDisp} backdrop={false} animation={false} aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header>
                        <Modal.Title>Inclusão de Dispositivo</Modal.Title>
                        {
                            this.tipo_disp > 0 ? this.state.showDisp = false : this.state.showDisp = false
                        }
                    </Modal.Header>
                    <Modal.Body>
                        <DeviceTypeModal submitLabel='Incluir' submitClass='primary' />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit' onClick={this.setCloseModal}>
                            Sair
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
    render() {
        const listSoft = this.props.listSoft || []
        const listUni = this.props.listUni || []
        const listTipoS = this.props.listTipoS || []
        const listTipoD = this.props.listDispTipo || []
        const desabilitaSelect = this.props.readOnly === true
        const { handleSubmit, readOnly } = this.props
        const tipo_disp = this.props.tipo_disp
        console.log(tipo_disp)
        return (
            // TELA INVENTARIO
            <form onSubmit={handleSubmit}>
                <section className='box-body'>
                    <div className='container-fluid'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label>Dispositivo</label>
                                        <Field id='dispositivo' name="inv_disp_id" component="select" className='form-control' onChange={this.setDevice} value={this.state.selectedDisp} disabled={desabilitaSelect}>
                                            <option>Selecione um Dispositivo</option>
                                            {
                                                listTipoD.length === 0 ? [] : listTipoD.map((item, index) =>
                                                    <option value={item.tipo_disp_id} key={"lista-getListDispositivo" + index}>{item.tipo_disp_nome}</option>)
                                            }
                                        </Field>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label>Unidade</label>
                                        <Field id='unidade' name="inv_uni_id" component='select' className='form-control' disabled={desabilitaSelect}>
                                            <option>Selecione uma Unidade</option>
                                            {
                                                listUni.length === 0 ? [] : listUni.map((item, index) =>
                                                    <option value={item.uni_id} key={"lista-getList" + index}>{item.uni_nome}</option>)
                                            }
                                        </Field>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <Field name='inv_user' component={LabelAndInput} readOnly={readOnly}
                                            label='Usuario' placeholder='Informe o usuario' cols='0' />
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <Field name='inv_setor' component={LabelAndInput} readOnly={readOnly}
                                            label='Setor' cols='0' placeholder='Informe o Setor' maxLength='25' />
                                    </div>
                                </div>

                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <Field name='inv_descricao' component={LabelAndInput} readOnly={readOnly}
                                            label='Descrição' cols='0' placeholder='Descrição' maxLength='250' />
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label>Software</label>
                                        <Field id='software' name="soft_id" component="select" className='form-control' onChange={this.setSoftware} value={this.state.selectedValue} disabled={desabilitaSelect}>
                                            <option >Selecione um Software</option>
                                            {
                                                listSoft.length === 0 ? [] : listSoft.map((item, index) =>
                                                    <option value={item.soft_id} key={"lista-getListSoftwares" + index} >{item.soft_nome}</option>
                                                )
                                            }
                                        </Field>
                                    </div>
                                </div>

                                <If test={this.state.selectedDisp} modo={this.props.submitLabel}>
                                    <h4 className='tituTipoSoft'>Descrições do Dispositivo</h4>
                                    <div className='detalhesSoft'>
                                        <div className='col-md-2'>
                                            <Field name='disp_patrimonio' component={LabelAndInput} readOnly={readOnly}
                                                label='Patrimonio' cols='0' placeholder='Patrimonio' maxLength='250' disabled />
                                        </div>
                                        <div className='col-md-2'>
                                            <Field name='disp_marca' component={LabelAndInput} readOnly={readOnly}
                                                label='Marca' cols='0' placeholder='Marca' maxLength='250' disabled />
                                        </div>
                                        <div className='col-md-2'>
                                            <Field name='disp_host' component={LabelAndInput} readOnly={readOnly}
                                                label='Host' cols='0' placeholder='Host' maxLength='250' disabled />
                                        </div>
                                        <div className='col-md-2'>
                                            <Field name='disp_ip' component={LabelAndInput} readOnly={readOnly}
                                                label='IP' cols='0' placeholder='IP' maxLength='250' disabled />
                                        </div>
                                        <button type='button' className='btn btn btn-success btn-buscaTipo'
                                            onClick={this.setShowModalDisp}>Detalhes do Dispositivo</button>
                                        {this.renderRows()}
                                    </div>
                                </If>

                                <If test={this.state.selectedValue} modo={this.props.submitLabel}>
                                    <h4 className='tituTipoSoft'>Descrições do Software</h4>
                                    <div className='detalhesSoft'>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label>Serial</label>
                                                <Field name="inv_tipo_id" component='select' className='form-control' onChange={this.setTipoSoft} value={this.state.selectedTipo} disabled={desabilitaSelect}>
                                                    <option>Selecione uma Chave</option>
                                                    {
                                                        listTipoS.length === 0 ? [] : listTipoS.map((item, index) =>
                                                            item.tipo_soft_id == this.state.selectedValue ? (
                                                                <option value={item.tipo_id} key={"lista-getListTiposSoft" + index}>{item.soft_nome} - {item.tipo_key}</option>
                                                            ) : (null)
                                                        )
                                                    }
                                                </Field>
                                            </div>
                                        </div>
                                        <button type='button' className='btn btn btn-success btn-buscaTipo'
                                            onClick={this.setShowModal}>Detalhes do Software</button>
                                        {this.renderRows()}

                                    </div>
                                </If>

                            </div>
                            <div className='box-footer'>
                                <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                                    {this.props.submitLabel}
                                </button>
                                <button type='button' className='btn btn-default'
                                    onClick={this.props.init}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        )
    }
}


InventoryForm = reduxForm({ form: 'inventoryForm', destroyOnUnmount: false })(InventoryForm)
const selector = formValueSelector('inventoryForm')
const mapStateToProps = state => ({
    listUni: state.unidade.list, listSoft: state.software.list, listDisp: state.type_device.list,
    listTipoS: state.type_software.list, listInv: state.inventory.list, listDispTipo: state.device.list,
    tipo_disp: selector(state, 'disp_id')
})
const mapDispatchToProps = dispatch => bindActionCreators({
    init, getList, getListSoftwares, getListDispositivo, getListTiposSoft,
    getListInv, getListTipoDisp
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(InventoryForm)






