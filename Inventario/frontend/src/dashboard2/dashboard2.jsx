import React, { Component } from 'react'
import axios from 'axios'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'

const BASE_URL = 'http://localhost:3000'

export default class Dashboard2 extends Component {
    
    constructor(props) {
        super(props)
        this.state = { users: 0, softwares: 0 }
    }

    componentWillMount() {
        axios.get(`${BASE_URL}/stats`)
            .then(resp => this.setState(resp.data))
    }

    render() {
        const { users,  softwares} = this.state
        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 2.0' />
                <Content>
                    <Row>
                        <ValueBox cols='12 4' color='green' icon='desktop'
                            value={`${users}`} text='Total de Dispositivos' />
                        <ValueBox cols='12 4' color='red' icon='windows'
                            value={`${softwares }`} text='Total de Softwares' />
                    </Row>
                </Content>
            </div>
        )
    }
}
