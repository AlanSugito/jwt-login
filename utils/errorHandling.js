export const errorHandler = err => {
    const errors = {username: '', email: '', password: ''}

    if (err.message === 'Email has not registered yet') {
        errors.email = err.message
    }

    if (err.message === "Password is not valid") {
        errors.password = err.message
    }
    
    if (err.code === 11000) {
        let key = Object.keys(err.keyValue)[0]
        errors[key] = `That ${key === "email"? 'email' : 'username'} is already used!`
    }
    
    if (err.message.includes("pengguna validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })

        return errors
    }

    return errors
}