export default (config, { strapi }) => {
  return async (ctx, next) => {
    try {
      
      const authHeader = ctx.request.header.authorization;
      console.log('Auth Header:', authHeader);
      
      if (!authHeader) {
        console.log('No Authorization header found');
        return ctx.unauthorized('No token provided');
      }

      const token = authHeader.split(' ')[1];
      console.log('Extracted Token:', token);
      
      if (!token) {
        console.log('No token found in Authorization header');
        return ctx.unauthorized('No token provided');
      }

      const { id } = await strapi.plugins['users-permissions'].services.jwt.verify(token);
      console.log('Verified User ID:', id);
      
      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: { id },
        populate: ['role'],
      });

      if (!user) {
        console.log('User not found for ID:', id);
        return ctx.unauthorized('User not found');
      }

      ctx.state.user = user;
      console.log('User authenticated successfully:', user.id);
      
      await next();
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      return ctx.unauthorized('Invalid token');
    }
  };
}; 