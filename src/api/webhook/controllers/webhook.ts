/**
 * A set of functions called "actions" for `webhook`
 */

export default {
  updateOrder: async (ctx, next) => {
    try {
      const requiredOrder = await strapi.entityService.findMany(
        "api::order.order",
        {
          filters: {
            order_id: ctx.request.body?.message?.order?.id,
          },
        }
      );
      if (!requiredOrder.length) {
        throw new Error("No Order Found");
      }

      ctx.request.body.message.order.state =
        ctx.request.body?.message?.order?.fulfillments?.[0]?.state?.descriptor?.short_desc;
      const builtOrder = strapi
        .service("api::order.order")
        .buildData({ ...ctx.request.body });
      const updatedResponse = await strapi.entityService.update(
        "api::order.order",
        requiredOrder[0].id,
        {
          data: builtOrder,
        }
      );

      if (Object.keys(updatedResponse).length) {
        return (ctx.body = updatedResponse);
      }
      throw new Error("Request Failed");
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },
};
