/**
 * order controller
 */

import { factories, Strapi } from '@strapi/strapi';

export default factories.createCoreController('api::order.order', ({ strapi: Strapi }) => ({
    async find(ctx) {
        ctx.query.filters = { ...ctx.query.filters, user_id: parseInt(ctx.state.user.id) }
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },

    async create(ctx) {
        ctx.request.body.data = { ...ctx.request.body.data, user_id: ctx.state.user.id, publishedAt: new Date() }
        console.log({ ...ctx.request.body, user_id: ctx.state.user.id, publishedAt: new Date() })
        return await super.create(ctx);
    }
}));
