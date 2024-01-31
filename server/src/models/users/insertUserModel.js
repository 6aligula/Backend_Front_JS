import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { getPool } from '../../db/getPool.js';
import sendMailUtil from '../../util/sendMailUtil.js';

import {
    emailAlreadyRegisteredError,
    userAlreadyRegisteredError
} from '../../services/errorService.js';

async function sendActivationEmail(email, username, registrationCode) {
    const emailSubject = 'Activa tu usuario de INSTAHAB';
    const emailBody = `
    👋 ¡Bienvenid@ ${username}!

    Gracias por registrarte en 📷 INSTAHAB. Para activar tu cuenta, haz click en el siguiente enlace:

    <a href="http://localhost:3001/users/auth/activate/${registrationCode}">❤️ Activar mi cuenta ❤️</a>
    `;

    try {
        await sendMailUtil(email, emailSubject, emailBody);
        console.log("Correo de activación enviado con éxito a:", email);
    } catch (error) {
        console.error('Error al enviar el correo de activación:', error);
        throw error; // Puedes decidir si lanzar el error o manejarlo de otra manera
    }
}

const insertUserModel = async (username, email, password, registrationCode) => {
    const userUuid = uuidv4();

    try {
        console.log("insert", username, email, password, registrationCode);
        const pool = await getPool();
        
        let [users] = await pool.query(
            `
                SELECT id FROM users WHERE username = ?
            `,
            [username]
        );

        if(users.length > 0) {
            userAlreadyRegisteredError();
        }

        [users] = await pool.query(
            `
                SELECT id FROM users WHERE email = ?
            `,
            [email]
        );

        if(users.length > 0) {
            emailAlreadyRegisteredError();
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            `
                INSERT INTO users ( uuid, email, username, password, registrationCode)
                VALUES (?, ?, ?, ?, ?)
            `,
            [userUuid, email, username, hashedPassword, registrationCode]
        );

        console.log("Usuario registrado con éxito");

        // Enviar el correo electrónico de activación
        await sendActivationEmail(email, username, registrationCode);

    } catch (error) {
        console.error('Error en insertUserModel:', error);
        throw error; // Lanza el error para que pueda ser manejado más arriba en la cadena
    }
};

export default insertUserModel;
