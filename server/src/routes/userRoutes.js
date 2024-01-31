import express from 'express';
import { 
    newUserController,
    loginUserController,
    logoutUserController,
    validateUserController,
    getUserProfileController,
    getOwnUserController,
    sendRecoverPasswordController,
    editUserPasswordController,
    editUserAvatarController,
    changeUserRoleController
} from '../controllers/users/index.js';
import{
    authUserController,
    userExistsController
}  from '../middlewares/index.js';

const router = express.Router();
//router.get('/test', (req, res) => res.send('Test route works!'));
//Crear usuario pendiente de activar 
router.post('/register', newUserController);

//Validar un usuario
router.get('/auth/activate/:registrationCode', validateUserController)

//Login de usuario
router.post('/login', loginUserController);

//Logout de usuario
router.post('/logout', authUserController, logoutUserController);

//obtener el perfil publico del usuario
router.get('/user/:userId',userExistsController, getUserProfileController);

//obtener el perfil privado del usuario
router.get('',authUserController, getOwnUserController);

//recuperar contraseña --> blanqueo --> envío de mail
router.post('/password/recover', sendRecoverPasswordController);

//toma el codigo de recuperación enviado en el endpoint anterior y
//actualiza la contraseña en la base de datos
router.put('/password', editUserPasswordController);

// Editar el avatar de un usuario.
router.put('/avatar', authUserController, userExistsController, editUserAvatarController);
  
// Cambiar el rol de un usuario
router.put('/:userId/role', authUserController, changeUserRoleController);
  
export default router;