import usersRouter from './usersR.js';

export default function configRoutes(app) {
    app.use('/users', usersRouter); 
};

