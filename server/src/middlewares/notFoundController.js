import { notFoundError } from '../services/errorService.js';

const notFoundController = (req,res,next) => {
        next(notFoundError(req.originalUrl));
};

export default notFoundController;
// const notFoundController = (req, res, next) => {
//         res.status(404).send({
//                 status: 'error',
//                 message: `El recurso requerido '${req.originalUrl}' no existe.`
//         });
// };
// export default notFoundController;
