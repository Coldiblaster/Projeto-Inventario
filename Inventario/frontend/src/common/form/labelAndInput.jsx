import React from 'react'
import Grid from '../layout/grid'

export default props => (
    <Grid cols={props.cols}>
        <div className='form-group'>
            <label htmlFor={props.name}>{props.label}</label>
            
            <input {...props.input} className='form-control'
                    id={props.id}
                    placeholder={props.placeholder} 
                    readOnly={props.readOnly} type={props.type} 
                    maxLength={props.maxLength} disabled={props.disabled} 
                    />
        </div>
    </Grid>
)





