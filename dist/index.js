"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_config_1 = __importDefault(require("./config/db.config"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
// import swaggerFile from './swagger-output.json';
const test_route_1 = __importDefault(require("./routes/test.route"));
// import authRouter from "./routes/auth.routes";
// import userRouter from "./routes/user.routes";
// import farmerRouter from "./routes/farmer.routes";
// import prosperityHubRouter from "./routes/prosperity.hub.routes";
// import warehouseRouter from "./routes/warehouse.routes";
// import farmRouter from "./routes/farm.routes";
// import utilsRouter from "./routes/utils.route";
// import rolesAndPermissions from "./routes/role.permission.route";
// validateEnv()
db_config_1.default.sync().then(() => {
    console.log('Database connected');
}).catch(err => {
    console.log(err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '10kb' }));
app.use((0, cookie_parser_1.default)());
// Allow requests from any origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// Forward all other requests to Next.js
app.use((0, cors_1.default)({
    //   origin: [config.get<string>('origin')],
    credentials: true,
}));
if (process.env.NODE_ENV === 'development')
    app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send('Hello World! Novel-AG');
});
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.get('/api/healthchecker', (_, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to NodeJs with Prisma and PostgreSQL',
    });
});
app.use('/api/test', test_route_1.default);
//   app.use('/api/v1/auth', authRouter);
//   app.use('/api/v1/user', userRouter);
//   app.use('/api/v1/farmer', farmerRouter);
//   app.use('/api/v1/prosperity-hub', prosperityHubRouter);
//   app.use('/api/v1/warehouse', warehouseRouter);
//   app.use('/api/v1/farm', farmRouter);
//   app.use('/api/v1/util', utilsRouter);
//   app.use('/api/v1/assign', rolesAndPermissions);
//   app.all('*', (req: Request, res: Response, next: NextFunction) => {
//     next(new AppError(404, `Route ${req.originalUrl} not found`));
//   });
app.use((err, req, res, next) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
const PORT = process.env.PORT;
console.clear();
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});
//# sourceMappingURL=index.js.map