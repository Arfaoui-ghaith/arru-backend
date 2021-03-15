const express = require('express');
const cors = require('cors');
const app = express().use('*', cors());

const AppError = require('./utils/appError');
const utilisateurRouter = require('./routes/utilisateurRoutes');
const roleRouter = require('./routes/roleRoutes');
const fonctionaliteRouter = require('./routes/fonctionaliteRoutes');
const specificationRouter = require('./routes/specificationRoutes');
const role_fonctionaliteRouter = require('./routes/role_fonctionaliteRoutes');
const role_specificationRouter = require('./routes/roles_specificationsRoutes');
const utilisateur_roleRouter = require('./routes/utilisateur_roleRoutes');
const interfaceRouter = require('./routes/interfacesRoutes');

const globalErrorHandler = require('./controllers/errorController.js');
const morgan = require('morgan');

if (process.env.NODE_ENV === 'development') {
    //app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));
app.use(express.static(`${__dirname}/storage`));

app.use('/api/v1/utilisateurs', utilisateurRouter);
app.use('/api/v1/interfaces', interfaceRouter);
app.use('/api/v1/roles', roleRouter);
app.use('/api/v1/fonctionalites', fonctionaliteRouter);
app.use('/api/v1/specifications', specificationRouter);
app.use('/api/v1/roles_fonctionalites', role_fonctionaliteRouter);
app.use('/api/v1/roles_specifications', role_specificationRouter);
app.use('/api/v1/utilisateurs_roles', utilisateur_roleRouter);

/*app.all('/test', (req, res, next) => {
        try{
        const user = await models.Utilisateur.create({id: uuidv4(), cin: "07490408", nom: "ghaith", prenom: "arfaoui", email:"ghaith@gmail.com", password: "admin123", telephone: "51927300"});
        console.log(user);*/

        /*const role = await models.Role.create({ id: uuidv4(), titre: "administrateur" });
        console.log(role);*/

        /*const utilisateur_role = await models.Utilisateures_roles.create({ 
            id: uuidv4(), 
            utilisateur_id: "4a8b367e-becb-4a4c-bc12-8be4cdadcc50",
            role_id: "bd5f4705-5a96-4ff0-aefa-fb04b2f3e1ea" });

        console.log(utilisateur_role);
        const utilisateur_id = '4a8b367e-becb-4a4c-bc12-8be4cdadcc50';
        const roles = await models.sequelize.query("SELECT titre FROM `roles` as r, `utilisateures_roles` as ur WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur",
        { 
            replacements: { utilisateur: utilisateur_id },
            type: models.sequelize.QueryTypes.SELECT 
        });
        console.log(roles);

        res.send("hello");
    }catch(err){
        console.log(err);
    }
    if (req.originalUrl === "/graphql") next();
    next(new AppError(`can't find ${req.originalUrl}`, 404).message);
});*/

app.use(globalErrorHandler);

module.exports = app;