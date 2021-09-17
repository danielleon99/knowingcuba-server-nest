import * as Joi from '@hapi/joi';

export default {
    cache: true,
    validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("dev", "prod", "test").default("dev"),
        PORT: Joi.number().default(3000)
    }
    )
};