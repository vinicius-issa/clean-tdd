export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb+srv://clean-user:myCleanUs1V@cluster0.v8ggt.mongodb.net/clean-code-api?retryWrites=true&w=majority',
  port: process.env.PORT ?? 5000,
  jwtSecret: process.env.JWT_SECRET ?? 'tj607+=d'
}
