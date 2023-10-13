/**
 * profile controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::profile.profile', ({ strapi: any }) => ({
    async find(ctx: any) {
        const profile = await strapi.db.query('api::profile.profile').findOne({ where: { 'user': ctx.state.user.id } });
        ctx.params.id = null;
        if (profile)
            ctx.params.id = profile.id;

        return super.findOne(ctx);
    },

    async create(ctx: any) {
        const extProfile = await strapi.db.query('api::profile.profile').findOne({ where: { 'user': ctx.state.user.id } });

        const data = JSON.parse(ctx.request.body.data);
        data.user = ctx.state.user.id;
        ctx.request.body.data = JSON.stringify(data);

        if (!extProfile) {
            return super.create(ctx);
        }

        ctx.params.id = extProfile.id;
        return super.update(ctx);
    }
}));
