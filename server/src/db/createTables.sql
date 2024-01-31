CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL, -- Asegúrate de que sea suficiente para almacenar hashes de contraseña.
    registrationCode CHAR(100), -- Código para la activación de la cuenta.
    avatar VARCHAR(100), -- URL o ruta del archivo del avatar del usuario.
    active BOOLEAN DEFAULT FALSE, -- Indica si el usuario ha activado su cuenta.
    role ENUM('admin', 'normal') DEFAULT 'normal', -- Rol del usuario.
    recoverPassCode CHAR(10), -- Código para la recuperación de la contraseña.
    sessionToken VARCHAR(255), -- Token de sesión para el usuario.
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora de creación del registro.
    modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Fecha y hora de la última modificación del registro.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
