// Експорт специфікації Swagger/OpenAPI для документації про API
export const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'API Сайту про Лосів',
        version: '1.0.0',
        description: 'Документація API для Сайту про Лосів',
    },
    servers: [
        {
            url:
                process.env.CODESPACE_NAME !== undefined
                    ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                    : 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    paths: {
        '/api/moose': {
            get: {
                summary: 'Отримати всіх лосів',
                responses: {
                    '200': {
                        description: 'Список всіх лосів',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Moose' },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Створити нового лося',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Moose' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт лося",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Moose' },
                            },
                        },
                    },
                },
            },
        },
        '/api/moose/{id}': {
            get: {
                summary: 'Отримати лося за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID лося',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт лося",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Moose' },
                            },
                        },
                    },
                    '404': { description: 'Лося не знайдено' },
                },
            },
            put: {
                summary: 'Повністю оновити лося',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID лося',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Moose' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт лося",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Moose' },
                            },
                        },
                    },
                    '404': { description: 'Лося не знайдено' },
                },
            },
            patch: {
                summary: 'Частково оновити лося',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID лося',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Moose' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт лося",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Moose' },
                            },
                        },
                    },
                    '404': { description: 'Лося не знайдено' },
                },
            },
            delete: {
                summary: 'Видалити дані про лося',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID лося',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'Лося не знайдено' },
                },
            },
        },
    },
    components: {
        schemas: {
            Moose: {
                type: 'object',
                required: ['name', 'age', 'height', 'weight', 'gender'],
                properties: {
                    name: {
                        type: 'string',
                        description: "Ім'я лося",
                    },
                    age: {
                        type: 'number',
                        description: 'Вік лося у роках',
                    },
                    height: {
                        type: 'number',
                        description: 'Висота лося в сантиметрах',
                    },
                    weight: {
                        type: 'number',
                        description: 'Вага лося в кілограмах',
                    },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                        description: 'Стать лося',
                    },
                    description: {
                        type: 'string',
                        description: "Опис лося (необов'язкове поле)",
                    },
                },
            },
        },
    },
};
