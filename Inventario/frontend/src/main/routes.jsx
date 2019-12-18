import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Dashboard from '../dashboard/dashboard'
import Device from '../register/device/device'
import Device_Type from '../register/type_device/typeDevice'
import Inventory from '../register/inventory/inventory'
import Software from '../register/software/software'
import Software_Type from '../register/type_software/typeSoftware'
import Unidade from '../register/unidade/unidade'

export default props => (
    <div className='content-wrapper'>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/dispositivos' component={Device} />
            <Route path='/tipos_dispositivos' component={Device_Type} />
            <Route path='/inventario' component={Inventory} />
            <Route path='/softwares' component={Software} />
            <Route path='/tipos_softwares' component={Software_Type} />
            <Route path='/unidades' component={Unidade} />
            <Redirect from='*' to='/' />
        </Switch>
    </div>
)
