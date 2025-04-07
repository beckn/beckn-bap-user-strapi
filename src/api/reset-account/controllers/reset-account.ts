export default ({ strapi }) => ({
  async resetAccount(ctx) {
    try {
      const user = ctx.state.user;
      console.log(user, 'user');
      const { categoryId } = ctx.request.body;
      
      if (!categoryId) {
        return ctx.badRequest('Category is required');
      }

      const result = await strapi.service('api::reset-account.reset-account').resetUserAccount(user.id, categoryId);

      return {
        success: true,
        message: `Successfully deleted ${result.deletedCount} orders for category ${categoryId}`,
        deletedCount: result.deletedCount,
      };
    } catch (error) {
      return ctx.internalServerError('Error resetting account: ' + error.message);
    }
  },
}); 