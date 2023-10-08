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
db_config_1.default.sync().then(() => {
    console.log('Database connected');
}).catch(err => {
    console.log(err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '10kb' }));
app.use((0, cookie_parser_1.default)());
// app.use((req: Request, res: Response, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use((0, cors_1.default)({
    credentials: true,
}));
if (process.env.NODE_ENV === 'development')
    app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
// app.get('/', (req, res) => {
//   res.send('Hello World! Novel-AG');
// });
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// app.get('/api/healthchecker', (_, res: Response) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'Welcome to NodeJs with Prisma and PostgreSQL',
//   });
// });
// app.use('/api/test', testRouter);
//   app.use('/api/v1/auth', authRouter);
//   app.use('/api/v1/user', userRouter);
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