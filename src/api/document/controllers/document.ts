/**
 * document controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::document.document', ({ strapi: Strapi }) => ({
    async find(ctx) {
        ctx.query.filters = { ...ctx.query.filters, user: parseInt(ctx.state.user.id) }
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },

    async create(ctx) {
        const data = JSON.parse(ctx.request.body.data);
        data.user = ctx.state.user.id;
        ctx.request.body.data = JSON.stringify(data);

        console.log(ctx.request.body.data);
        return super.create(ctx);
    },

    async update(ctx) {
        const document = await strapi.db.query('api::document.document').findOne({ where: { user: ctx.state.user, id: ctx.params.id }, });
        if (!document) {
            ctx.response.status = 404;
            return;
        }

        const data = JSON.parse(ctx.request.body.data);
        data.user = ctx.state.user.id;
        ctx.request.body.data = JSON.stringify(data);

        return super.update(ctx);
    }
}));
