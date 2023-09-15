/**
 * order controller
 */

import { factories, Strapi } from '@strapi/strapi';

export default factories.createCoreController('api::order.order', ({ strapi: Strapi }) => ({
    async find(ctx) {
        ctx.query.filters = { ...ctx.query.filters, user: parseInt(ctx.state.user.id) }
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },

    async create(ctx) {
        ctx.request.body.data = strapi.service('api::order.order').buildData({ ...ctx.request.body, user: ctx.state.user.id });
        return super.create(ctx);
    },

    async update(ctx) {
        const order = await strapi.db.query('api::order.order').findOne({ where: { user: ctx.state.user, id: ctx.params.id, order_id: ctx.request.body.message.order.id }, });
        if (!order) {
            ctx.response.status = 404;
            return;
        }

        ctx.request.body.data = strapi.service('api::order.order').buildData({ ...ctx.request.body, user: ctx.state.user.id });
        return super.update(ctx);
    }
}));
