const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/swagger.json';
const endpointsFiles = [ './*ts', './routes/*.ts'];

const config = {
    info: {
        title: 'Blog API Documentation',
        description: '',
    },
    tags: [ ],
    host: 'localhost:3000/api',
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);