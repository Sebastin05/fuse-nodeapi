import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { CONF_ENV } from '@config/config';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Demo API',
        description: 'This is an api documentation for Demo application.',
        version: '1.0.0',
    },
    servers: [
        {
            description: 'Server',
            url: 'http://localhost:3000/api',
        },
    ],
    tags: [
        {
            name: 'demo',
            description: 'Demo API',
        },
        {
            name: 'todo',
            description: 'Todo API',
        },
    ],
    components: {
        schemas: {
            Demo: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        example: '589a815f53f1eae555f01424',
                    },
                    field1: {
                        type: 'string',
                        example: 'Fields One',
                    },
                    field2: {
                        type: 'string',
                        example: 'Fields Two',
                    },
                },
            },
            Todo: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        example: '589a815f53f1eae555f01425',
                    },
                    firstname: {
                        type: 'string',
                        example: 'first',
                    },
                    lastname: {
                        type: 'string',
                        example: 'last',
                    },
                    username: {
                        type: 'string',
                        example: 'AbcXyz',
                    },
                    role: {
                        type: 'string',
                        example: 'admin',
                    },
                    email: {
                        type: 'string',
                        example: 'test@gmail.com',
                    },
                },
            },
            '500': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Server Not Responding.',
                    },
                },
            },
            '404': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Record not found.',
                    },
                },
            },
            '401': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'User Unauthenticated.',
                    },
                },
            },
        },
        securitySchemes: {
            jwt_api_auth: {
                type: 'http',
                scheme: 'bearer',
            },
        },
    },
};

const swaggeroptions: ILooseObject = {
    swaggerDefinition,
    apis: ['./app/routes/*.ts'],
};
const openapiSpecification = swaggerJsdoc(swaggeroptions);

const apiDoc = (app: ILooseObject) => {
    if (CONF_ENV !== 'production') {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
    }
};

export default apiDoc;
