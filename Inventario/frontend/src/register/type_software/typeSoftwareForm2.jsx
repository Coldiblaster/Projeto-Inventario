import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { Button, Modal } from 'react-bootstrap'
import Grid from '../../common/layout/grid'
import { init, getListSoftwares, createTipos } from '../software/softwareActions'
import Input from '../../common/form/labelAndInput'
import SoftModal from '../software/softwareModal'

class TiposSoftwaresForm2 extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedValue: 0,
        showModal: false,
    }
    this.handleOptions = this.handleOptions.bind(this);
  }
  setShowModal = () => {
    this.setState({ showModal: true })
    
  }

  handleOptions(event){
    this.setState({selectedValue: event.target.value})
  }

  setCloseModal = () => this.setState({ showModal: false })

  componentWillMount() {
    this.props.getListSoftwares()
  }

  renderRows() {
    return (
      <div className='box-body'>
        <div className='soft_vinculados'>
            <h4 className='tituloTipoSoft'><b>Detalhes do Software</b></h4>
            <Field name='tipo_key' cols='12, 3' component={Input}
              label='Key' placeholder='Informe a Key' readOnly={this.props.readOnly} />

            <Field name='tipo_data_compra' cols='12, 2' component={Input}
              label='Data de Compra' readOnly={this.props.readOnly} type={"Date"} />

            <Field name='tipo_nf' cols= '12, 3' component={Input} 
                        label='Nota Fiscal' placeholder='Nota Fiscal' readOnly={this.props.readOnly}/> 
                        
            <Field name='tipo_descricao' cols='12, 4' component={Input}
              label='Descrição' placeholder='Informe a Descrição' readOnly={this.props.readOnly} />
        </div>
        <Modal show={this.state.showModal} backdrop={false} animation={false}  > 
          <Modal.Header>
            <Modal.Title>Inclusão de Software</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modalBodySoft'>
              <SoftModal onSubmit={this.props.createTipos} submitLabel='Incluir' submitClass='primary'/>
          </Modal.Body>
          <Modal.Footer className='modalFooterSoft'>
            <Button type='submit' onClick={this.setCloseModal}>
              Sair
            </Button>
          </Modal.Footer>
        </Modal>

      </div>

    )
  }

  render() {

    const list = this.props.list || []
    const desabilitaSelect = this.props.readOnly === true
    return (
      <Grid>
        <div className='box-body'>
          <div className='selectSoft'>
            <p className='tituSelect'><b>Versão do Software</b></p>
            <Field name="tipo_soft_id" component="select" className='combo col-md-4' value={this.state.selectedValue} onChange={this.handleOptions} disabled={desabilitaSelect}>
              <option>Selecione um Software</option>
              {
                list.length === 0 ? [] :
                  list.map((item, index) =>
                    <option value={item.soft_id} key={"lista-getListSoftwares" + index}>{item.soft_nome}</option>
                  )
              }
            </Field>
            <button id='btnInclur' type='button' className='btn btn-success add' onClick={this.setShowModal} >
                <i className='fa fa-plus'></i>
            </button>
          </div>
        </div>
          {this.renderRows()}
      </Grid>
     
    )
  }
}


TiposSoftwaresForm2 = reduxForm({ form: 'tipoSoftwareForm', destroyOnUnmount: false })(TiposSoftwaresForm2)
const mapStateToProps = state => ({ list: state.software.list }) // state.software.list para trazer a lista do select
const mapDispatchToProps = dispatch => bindActionCreators({ init, getListSoftwares, createTipos}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TiposSoftwaresForm2)









