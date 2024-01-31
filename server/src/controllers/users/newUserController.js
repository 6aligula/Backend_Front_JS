import Joi from 'joi';
import insertUserModel from '../../models/users/insertUserModel.js';

// Define el esquema de validación
const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const newUserController = async (req, res, next) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { username, email, password } = req.body;
        console.log(username, email, password);
        // Valida los datos contra el esquema
        const { error, value } = userSchema.validate({ username, email, password });
        console.log("1", value);
        if (error) {
            // Si hay un error de validación, envía una respuesta de error
            return res.status(400).send({
                status: 'error',
                message: `Error en los datos de entrada: ${error.details.map(x => x.message).join(', ')}`,
            });
            
        }

        // Si la validación es exitosa, procede con la lógica de negocio
        const registrationCode = randomstring.generate(30);
        await insertUserModel(username, email, password, registrationCode);
        console.log("ok");
        res.send({
            status: 'ok',
            message: 'Usuario registrado. Verifique su cuenta mediante el email recibido',
        });
        
    } catch (error) {
        next(error);
    }
};

export default newUserController;
