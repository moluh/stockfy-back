export class Config {
  constructor() {}

  // Puertos
  public port(): any {
    return process.env.PORT;
  }

  // Entornos
  public getEnv() {
    return process.env.NODE_ENV;
  }

  // Vencimiento token
  public expirationToken() {
    return process.env.TOKEN_EXPIRATION;
    //     process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30; // seg, min, dia mes
  }
  

}
