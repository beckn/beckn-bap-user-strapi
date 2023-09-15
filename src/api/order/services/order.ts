/**
 * order service
 */

import { factories, Strapi } from '@strapi/strapi';

export default factories.createCoreService('api::order.order', ({ strapi: Strapi }) => ({
    buildData(data) {
        const { context, message: { order } } = data;
        return {
            ...data,
            order_id: order.id,
            bpp_id: context.bpp_id,
            bpp_uri: context.bpp_uri,
            currency: order.quote.price.currency,
            delivery_status: order.state,
            descriptor: order.provider.descriptor,
            price: order.quote.price.value,
            billing: order.billing,
            fulfillments: order.fulfillments,
            created_date: order.created_at,
            last_updated_at: order.updated_at,
            quote: order.quote,
            transaction_id: context.transaction_id,
            message_id: context.message_id,
            payments: order.payments,
            items: order.items,
        };
    }
}));
