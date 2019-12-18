module.exports = middleware => {   // Função que vai retornar uma função middleware
    return (req, res, next) => {
        if(req.user.admin) {
            middleware(req, res, next) // Só vai chamar se o usuario for administrador
        } else {
            res.status(401).send('Usuário não é administrador.')
        }
    }
}