/**
 * saved-item controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::saved-item.saved-item', ({ strapi: any }) => ({
    async find(ctx: any) {
        ctx.query.filters = { ...ctx.query.filters, user: ctx.state.user.id }
        return super.find(ctx);
    },

    async findOne(ctx: any) {
        const savedItem = await strapi.db.query('api::saved-item.saved-item').findOne({ where: { user: ctx.state.user.id, id: ctx.params.id } });
        if (!savedItem)
            ctx.params.id = null;

        return super.findOne(ctx);
    },

    async create(ctx: any) {
        ctx.request.body.data = { ...ctx.request.body.data, user: ctx.state.user.id };
        return super.create(ctx);
    },

    async delete(ctx: any) {
        const savedItem = await strapi.db.query('api::saved-item.saved-item').findOne({ where: { user: ctx.state.user.id, id: ctx.params.id } });
        if (!savedItem)
            ctx.params.id = null;

        return super.delete(ctx);
    }
}));
