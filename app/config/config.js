exports.cors = {
    origin: "*"
};

exports.environment = "local"; //local, product

exports.port = process.env.PORT || 8888;

exports.configDB = {
    mysql: {
        client: 'mysql',
        connection: {
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'blogApp',
            password: process.env.MYSQL_PASS || 'nodejsblog',
            database: process.env.MYSQL_DB || 'blog_nodejs',
            charset: 'utf8mb4',
            port: process.env.MYSQL_PORT || '3306',
            options: {
                cryptoCredentialsDetails: {
                    minVersion: 'TLSv1'
                },
                "enableArithAbort": true
            }
        },
        migrations: {
            directory: './migrations',
            tableName: 'migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
};

exports.config_mail = {
    mail: 'sciencepost95@gmail.com',
    pass: '********'
}
