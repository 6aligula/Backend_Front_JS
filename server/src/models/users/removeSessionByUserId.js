import getPool from '../../db/getPool.js';

const removeSessionByUserId = async (userId) => {
  try {
    const pool = await getPool();

    // Realiza la lógica para eliminar la sesión de la base de datos
    const result = await pool.query(
      `
      UPDATE users
      SET sessionToken = NULL
      WHERE id = ?
      `,
      [userId]
    );

    if (result.affectedRows === 0) {
      throw new Error(`No se encontró ninguna sesión para el usuario con ID ${userId}`);
    }

    return { message: 'Sesión eliminada con éxito' };
  } catch (error) {
    console.error('Error al eliminar la sesión:', error);
    throw error;
  }
};

export default removeSessionByUserId;
