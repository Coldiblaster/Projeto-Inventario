export default props => {
    if(props.test > 0) {
        return props.children
    } else if(props.modo == 'Alterar'){
        return props.children
    }
    else{
        return false
    }
}