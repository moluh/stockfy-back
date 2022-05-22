import * as dotenv from 'dotenv'
const result = dotenv.config()
if (result.error) {
    throw result.error
}

import { createConnection, Connection, createConnections } from 'typeorm'
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

export class Config {
    separator: string = '---------------------------\n'
    private readonly env: NodeJS.ProcessEnv = process.env

    constructor() {}

    private getValue(key: string, throwOnMissing = true): string | any {
        const value = this.env[key]

        if (!value && throwOnMissing)
            throw new Error(`${this.separator} Missing .env VALUE: \n${key}\n`)

        return value
    }

    public ensureValues(keys: string[]) {
        keys.forEach((k) => this.getValue(k, true))
        return this
    }

    get nodeEnv(): string {
        return this.env.NODE_ENV
    }

    get pkey() {
        return this.env.PKEY
    }

    get port() {
        return this.env.PORT
    }

    get jwtSecret() {
        return this.env.JWT_SECRET
    }

    get jwtExp(): number {
        return parseInt(this.env.JWT_EXP, 0)
    }

    get jwtInnactivityExp(): number {
        return parseInt(this.env.JWT_INNACTIVITY_EXP, 0)
    }

    get connectNoSql(): boolean {
        return this.env.CONNECT_NO_SQL === 'true' ? true : false
    }

    get sqlDatabase() {
        return <MysqlConnectionOptions>{
            type: this.env.SQL_TYPE,
            host: this.env.SQL_HOST,
            port: parseInt(this.env.SQL_PORT),
            username: this.env.SQL_USERNAME,
            password: this.env.SQL_PASSWORD,
            database: this.env.SQL_DATABASE,
            logging: this.env.SQL_LOGGING,
            entities: [this.env.SQL_ENTITIES],
            migrationsTableName: 'app_migration_table',
            migrations: [this.env.SQL_MIGRATIONS],
            cli: {
                migrationsDir: this.env.SQL_MIGRATIONS_CLI,
            },
        }
    }

    get noSqlDatabase() {
        return <MongoConnectionOptions>{
            type: this.env.NO_SQL_TYPE,
            host: this.env.NO_SQL_HOST,
            port: parseInt(this.env.NO_SQL_PORT),
            database: this.env.NO_SQL_DATABASE,
            // username: this.env.NO_SQL_USERNAME,
            // password: this.env.NO_SQL_PASSWORD
        }
    }

    public async connectDatabases(): Promise<Connection[]> {
        console.log(`${this.separator}Connecting Databases...`)

        try {
            const dbs: any[] = this.connectNoSql
                ? [this.sqlDatabase, this.noSqlDatabase]
                : [this.sqlDatabase]

            const connection = await createConnections(dbs)

            if (connection[0].isConnected)
                console.log(
                    `${this.separator}| (${connection[0].options.type}) SQL connected -> ${connection[0].options.database}`
                )

            if (this.connectNoSql)
                if (connection[1].isConnected)
                    console.log(
                        `${this.separator}| (${connection[1].options.type}) NO SQL connected -> ${connection[1].options.database}`
                    )

            return connection
        } catch (error) {
            console.error(error)
            throw new Error('Error to connect to Database ')
        }
    }

    get databasePrefix(): string {
        return this.env.DB_PREFIX || ''
    }

    get mailApiKey() {
        return this.env.MAIL_API_KEY
    }

    get mailFrom() {
        return this.env.MAIL_FROM
    }
}

new Config().ensureValues([
    'PKEY',
    'PORT',
    'NODE_ENV',
    'BACKUPS_DIR',
    'CONNECT_NO_SQL',

    'JWT_SECRET',
    'JWT_EXP',
    'JWT_INNACTIVITY_EXP',

    'SQL_NAME_CONNECTION',
    'SQL_TYPE',
    'SQL_HOST',
    'SQL_PORT',
    'SQL_USERNAME',
    'SQL_PASSWORD',
    'SQL_DATABASE',
    'SQL_LOGGING',
    'SQL_ENTITIES',
    'SQL_MIGRATIONS',
    'SQL_MIGRATIONS_CLI',

    'MONGO_TYPE',
    'MONGO_HOST',
    'MONGO_PORT',
    'MONGO_DATABASE',
    'MONGO_USERNAME',
    'MONGO_PASSWORD',

    'AWS_BUCKET',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',

    'MAIL_API_KEY',
    'MAIL_FROM',
])
