import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { Button, Modal } from 'react-bootstrap'

import { getListSoftwares } from '../software/softwareActions'
import { getList } from '../unidade/unidadeActions'
import { getListDispositivo} from '../type_device/typeDeviceActions'
import { getListTiposSoft } from '../type_software/typeSoftwareActions'
import { getListInv } from '../inventory/inventoryActions'
import { init } from '../inventory/inventoryActions'
import LabelAndInput from '../../common/form/labelAndInput'
import If from '../../common/operator/ifInventario'
import { formatarData } from '../../common/operator/formataData'

class InventoryForm extends React.Component {
  
    constructor(props) {
        super(props);
          this.state = {
            selectedValue: 0,
            selectedTipo: 0,
            showModal: false,
            verifica: 0
        }
        this.handleOptions = this.handleOptions.bind(this);
        this.recebeTipoSoft = this.recebeTipoSoft.bind(this);
    }
    
    handleOptions(event){
        this.setState({selectedValue: event.target.value})
    }

    recebeTipoSoft(event){
        this.setState({selectedTipo:  event.target.value})
    }

    setShowModal = () => {
        this.setState({ showModal: true })      
    }

    setCloseModal = () => {
        this.setState({ showModal: false })

    }

    componentWillMount() {
        this.props.getList()
        this.props.getListSoftwares()
        this.props.getListDispositivo()
        this.props.getListTiposSoft()
        this.props.getListInv()
    }



    renderRows() {
        const listTipoS = this.props.listTipoS || []
        const listInv = this.props.listInv || []
        
        return(
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
                                                    ):(null)
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
            </div>
        )
    }
    render() {
        const listSoft = this.props.listSoft || []
        const listUni = this.props.listUni || []
        const listDisp = this.props.listDisp || []
        const listTipoS = this.props.listTipoS || []
        const listInv = this.props.listInv || []
        const desabilitaSelect = this.props.readOnly === true
        const { handleSubmit, readOnly} = this.props
        console.log(this.state.selectedValue)
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
                                        <Field id='dispositivo' name="inv_disp_id" component="select" className='form-control' disabled={desabilitaSelect}>
                                            <option>Selecione um Dispositivo</option>
                                            {
                                                listDisp.length === 0 ? [] : listDisp.map((item, index) =>
                                                <option value={item.disp_id} key={"lista-getListDispositivo" + index}>{item.disp_tipo}</option> )
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
                                            <Field  name='inv_setor' component={LabelAndInput} readOnly={readOnly}
                                            label='Setor' cols='0' placeholder='Informe o Setor' maxLength='25'/>     
                                        </div>
                                </div>

                                <div className='col-md-4'>
                                        <div className='form-group'>
                                            <Field  name='inv_descricao' component={LabelAndInput} readOnly={readOnly}
                                            label='Descrição' cols='0' placeholder='Descrição' maxLength='250'/>     
                                        </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label>Software</label>
                                        <Field id='software' name="soft_id" component="select" className='form-control' onChange={this.handleOptions} value={this.state.selectedValue} disabled={desabilitaSelect}>
                                            <option >Selecione um Software</option>
                                            {
                                                listSoft.length === 0 ? [] : listSoft.map((item, index) =>
                                                <option value={item.soft_id} key={"lista-getListSoftwares" + index} >{item.soft_nome}</option>
                                                )
                                            }
                                        </Field> 
                                    </div>
                                </div>     
   
                                {/* {   this.props.submitLabel == 'Alterar' ? (                                      
                                        console.log('Tem que sair aqui',this.teste)
                                    ): (null)
                                } */}
                                <If test={this.state.selectedValue} modo={this.props.submitLabel}>
                                    <h4 className='tituTipoSoft'>Descrições do Software</h4>
                                    <div className='detalhesSoft'>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label>Serial</label>
                                                <Field name="inv_tipo_id" component='select' className='form-control' onChange={this.recebeTipoSoft} value={this.state.selectedTipo} disabled={desabilitaSelect}>
                                                    <option>Selecione uma Chave</option>
                                                    {
                                                        listTipoS.length === 0 ? [] : listTipoS.map((item, index) =>
                                                            item.tipo_soft_id == this.state.selectedValue ? (
                                                            <option value={item.tipo_id} key={"lista-getListTiposSoft" + index}>{item.soft_nome} - {item.tipo_key}</option>
                                                            ):(null)
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


InventoryForm = reduxForm({form: 'inventoryForm', destroyOnUnmount: false})(InventoryForm)
const mapStateToProps = state => ({ listUni: state.unidade.list, listSoft: state.software.list, listDisp: state.type_device.list, listTipoS: state.type_software.list, listInv: state.inventory.list })
const mapDispatchToProps = dispatch => bindActionCreators({ init, getList, getListSoftwares, getListDispositivo, getListTiposSoft, getListInv }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(InventoryForm)






