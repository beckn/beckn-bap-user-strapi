export default ({ strapi }) => ({
  async resetUserAccount(userId, categoryId) {
    try {
      // First find all orders for the user in the specified category
      const orders = await strapi.entityService.findMany('api::order.order', {
        filters: {
          user: userId,
          category: categoryId,
        },
        fields: ['id'],
      });
      //console all the order id to be deleted with a proper message with all order ids
      console.log(`Found ${orders.length} orders to delete`, orders.map((order) => order.id));
      let deletedCount = 0;

      // Delete each order one by one
      for (const order of orders) {
        await strapi.entityService.delete('api::order.order', order.id);
        deletedCount++;
      }

      return {
        success: true,
        deletedCount,
      };
    } catch (error) {
      throw new Error(`Failed to reset account: ${error.message}`);
    }
  },
}); 