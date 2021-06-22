const express = require('express');
const cors = require('cors');
const app = express().use('*', cors());

const compression = require('compression');
const AppError = require('./utils/appError');
const utilisateurRouter = require('./routes/access_permissions/utilisateurRoutes');
const roleRouter = require('./routes/access_permissions/roleRoutes');
const fonctionaliteRouter = require('./routes/access_permissions/fonctionaliteRoutes');
const specificationRouter = require('./routes/access_permissions/specificationRoutes');
const role_fonctionaliteRouter = require('./routes/access_permissions/role_fonctionaliteRoutes');
const role_specificationRouter = require('./routes/access_permissions/roles_specificationsRoutes');
const utilisateur_roleRouter = require('./routes/access_permissions/utilisateur_roleRoutes');
const interfaceRouter = require('./routes/access_permissions/interfacesRoutes');
const traceRouter = require('./routes/access_permissions/traceRoutes');

const gouvernoratRouter = require('./routes/iddp/gouvernoratRoutes');
const communeRouter = require('./routes/iddp/communeRoutes');
const quartierRouter = require('./routes/iddp/quartierRoutes');
const projetRouter = require('./routes/iddp/projetRoutes');
const trancheRouter = require('./routes/iddp/trancheRoutes');

const critereRouter = require('./routes/iddp/critereRoutes');
const bailleur_fondRouter = require('./routes/financement/bailleur_fondRoutes');
const memoireRouter = require('./routes/financement/memoireRoutes');
const financementRouter = require('./routes/financement/financementRoutes');
const decompteRouter = require('./routes/financement/decompteRoutes');
const prestataireRouter = require('./routes/financement/prestataireRoutes');
const avancementRouter = require('./routes/travaux/avancementRoutes');

const globalErrorHandler = require('./controllers/errorController.js');

app.use(compression());

app.use(express.json({ limit: '10kb' }));
app.use(express.static(`${__dirname}/storage`));
//permissions
app.use('/api/v1/utilisateurs', utilisateurRouter);
app.use('/api/v1/interfaces', interfaceRouter);
app.use('/api/v1/roles', roleRouter);
app.use('/api/v1/fonctionalites', fonctionaliteRouter);
app.use('/api/v1/specifications', specificationRouter);
app.use('/api/v1/roles_fonctionalites', role_fonctionaliteRouter);
app.use('/api/v1/roles_specifications', role_specificationRouter);
app.use('/api/v1/utilisateurs_roles', utilisateur_roleRouter);
app.use('/api/v1/traces', traceRouter);
//iddp
app.use('/api/v1/gouvernorats', gouvernoratRouter);
app.use('/api/v1/communes', communeRouter);
app.use('/api/v1/quartiers', quartierRouter);
app.use('/api/v1/projets', projetRouter);
app.use('/api/v1/tranches', trancheRouter);
app.use('/api/v1/criteres', critereRouter);
//financement
app.use('/api/v1/bailleurs', bailleur_fondRouter);
app.use('/api/v1/memoires', memoireRouter);
app.use('/api/v1/financements', financementRouter);
app.use('/api/v1/decomptes', decompteRouter);
app.use('/api/v1/prestataires', prestataireRouter);
app.use('/api/v1/avancements', avancementRouter);

app.all('*', (req, res, next) => {
    if (req.originalUrl === "/graphql") return next();
    next(new AppError(`can't find ${req.originalUrl}`, 404).message);
});

app.use(globalErrorHandler);

module.exports = app;