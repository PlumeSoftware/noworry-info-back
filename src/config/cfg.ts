import { env } from 'node:process'

export default () => {
  return ({
    server: {
      port: Number.parseInt(env.SERVER_PORT, 10) || 3000,
      host: env.SERVER_HOST || 'localhost',
    },
    database: {
      host: env.DB_HOST,
      port: Number.parseInt(env.DB_PORT, 10) || 3306,
      userName: env.DB_USER_NAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
    },
    wx: {
      appId: env.WE_APPID,
      appSecret: env.WE_APPSECRET,
      mchId: env.WE_MCHID,
    },
    secret: {
      sysUserPswSalt: env.SECRET_SYS_USER_PSW_SLAT,
      decryptFeKey: env.SECRET_DECRYPT_FE_KEY,
      jwtKey: env.SECRET_JWT_KEY,
    },
    jwt: {
      expiresIn: env.JWT_EXPIRES_IN,
    },
    superAdmin: {
      name: env.SUPERADMIN_NAME || 'superAdmin',
      email: env.SUPERADMIN_EMAIL || 'admin@noworry.com',
      psw: env.SUPERADMIN_PSW || '_Noworry123',
    },
  })
}
