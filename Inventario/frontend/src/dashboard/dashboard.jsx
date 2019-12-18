import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSummary } from './dashboardActions'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'
import { Link } from 'react-router-dom'
class Dashboard extends Component {

    componentWillMount() {
        this.props.getSummary()
    }
    render() {

        const { tipos_softwares, dispositivos, inventario} = this.props.summary
        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 2.0' />
                <Content>
                    <Row>
                        <ValueBox cols='12 3' color='red' icon='sitemap'
                            value={`${inventario}`} text='Total de Softwares em uso' />
                        <ValueBox cols='12 3' color='green' icon='windows'
                            value={`${tipos_softwares-inventario}`} text='Total de Softwares sem uso' />
                        <Link to='/tipos_softwares'>
                        <ValueBox cols='12 3' color='yellow' icon='windows'
                            value={`${tipos_softwares}`} text='Total de Softwares' />
                        </Link>
                        <Link to='/dispositivos'>
                        <ValueBox cols='12 3' color='aqua' icon='desktop'
                            value={`${dispositivos}`} text='Total de Dispositivos' />;
                        </Link>
                    </Row>
                </Content>                              
            </div>
        )
    }
}

const mapStateToProps = state => ({summary: state.dashboard.summary})
const mapDispatchToProps = dispatch => bindActionCreators({getSummary}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

