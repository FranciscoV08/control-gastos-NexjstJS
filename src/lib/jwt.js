import jwt from 'jsonwebtoken'

const generatorToken = (payload) =>{
    console.log(process.env.JWT_SECRET)  
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: "1d"},
    )
}

export default generatorToken
