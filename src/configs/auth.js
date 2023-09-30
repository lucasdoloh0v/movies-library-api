module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || 'defult',
    expiresIn: '1d'
  }
}