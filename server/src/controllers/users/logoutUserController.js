import removeSessionByUserId from '../../models/users/removeSessionByUserId.js';
import { successResponse, serverError } from '../../services/errorService.js';

const logoutUserController = async (req, res) => {
  try {
    const userId = req.user.id; 

    // Realizar la lógica para cerrar la sesión en el modelo
    await removeSessionByUserId(userId);

    // Enviar una respuesta exitosa al cliente
    successResponse(res, 'Sesión cerrada con éxito');
  } catch (error) {
    // Manejar errores
    console.error('Error al cerrar sesión:', error);
    serverError(res, 'Error al cerrar sesión');
  }
};

export default logoutUserController;
