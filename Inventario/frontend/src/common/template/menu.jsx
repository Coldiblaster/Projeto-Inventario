import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Dashboard' icon='dashboard' />
        <MenuTree label='Cadastro' icon='edit'>
            <MenuItem path='dispositivos'
                label='Dispositivos' icon='desktop' />
            <MenuItem path='tipos_dispositivos'
                label='Tipos de Dispositivos' icon='desktop' />
            <MenuItem path='inventario'
                label='Inventário' icon='archive' />
            <MenuItem path='softwares'
                label='Softwares' icon='th-list' />
            <MenuItem path='tipos_softwares'
                label='Tipo de Software' icon='windows' />
            <MenuItem path='unidades'
                label='Unidade' icon='building' />
        </MenuTree>
        
    </ul>
)