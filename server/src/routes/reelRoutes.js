import express from 'express';

// Creación de un enrutador Express
const router = express.Router();

// Importacón de controladores y middlewares necesarios para manejar las solicitudes de ruta 
import authUserController from '../middlewares/authUserController.js';

import {
    reelExistsController,
    userExistsController,
    cantEditController
} from '../middlewares/index.js';

import {
    newReelController,
    listReelsController,
    getReelController,
    likeReelController, 
    addReelPhotoController,
    commentReelController,
    deleteCommentController,
    deleteLikeController
} from '../controllers/reels/index.js';

// Configuración de las rutas
router.post('/reel', authUserController, userExistsController, newReelController);

router.get('/reel', listReelsController);

router.get('/reel/:reelId', reelExistsController, getReelController);

router.post('/reel/:reelId/likes',
            authUserController,
            userExistsController,
            reelExistsController,
            likeReelController  
);

router.post('/reel/:reelId/photos',
            authUserController,
            userExistsController,
            reelExistsController,
            cantEditController,
            addReelPhotoController
);

router.post('/reel/:reelId/comments',
            authUserController,
            userExistsController,
            reelExistsController,
            commentReelController.addComment
);

router.delete('/deleteComment/:reelId/:commentId',
            authUserController,
            userExistsController,
            reelExistsController,
            deleteCommentController
)

router.delete('/deleteLike/:reelId/:likeId',
            authUserController,
            userExistsController,
            reelExistsController,
            deleteLikeController
)

export default router;