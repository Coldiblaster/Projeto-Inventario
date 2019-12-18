import React from 'react'

import mainLogo from '../logos/logo.png'
import smallLogo from '../logos/logo-semfundo.png'

export default props => (
    <header className='main-header teste'>
        <a href='/#/' className='logo'>
            <span className='logo-mini'><img src={smallLogo} alt="logoPequeno"/></span>
            <span className='logo-lg'>
                <img src={mainLogo} alt="logoPadrão" style={{ maxWidth:'98%'}}/>
            </span>
        </a>
        <nav className='navbar navbar-static-top' style={{backgroundColor:'#007bff'}}>
            <span className='sidebar-toggle' data-toggle='offcanvas'/>
        </nav>
    </header>
)