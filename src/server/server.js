'use strict'

const express    = require('express');
const fs         = require('fs');
const app        = express();
const http       = require('http')
//const https      = require('https')
//const proxy      = require('http-proxy-middleware')
const yargs      = require('yargs');
const Logger     = require('cpclog');
const compression = require('compression')

const logger = Logger.createWrapper('server', Logger.LEVEL_DEBUG);


const serverHttp = http.createServer(app);
//var options = {
//    key:  fs.readFileSync('./ssl/privatekey.pem'),
//    cert: fs.readFileSync('./ssl/certificate.pem')
//};
//const serverHttps = https.createServer(options, app);

async function __main__() {
    //let argv = yargs
    //    .option('c', { alias : 'config_file', demand: false, default: 'config.json', describe: 'specify the config file', type: 'string' })
    //    .argv;
    //
    //logger.debug('Config file:', argv.c);

    app.use(compression());

    app.get('/', function (req, res) {
        res.send('It works! ^_^');
    });

    //app.use('/admin', express.static('admin/dist/'));

    app.use('/client', express.static('public/client/'));

    const portHttp = 3003;
    logger.info(`Listening on ${portHttp}`);
    serverHttp.listen(portHttp);
}

if (require.main === module) {
    try {
        //process.on('uncaughtException', function(err) {
        //    logger.error('Error__ caught in uncaughtException:', err);
        //});
        //process.on('unhandledRejection', function(err, promise) {
        //    logger.error('Error__ caught in unhandledRejection:', err);
        //});

        __main__();
    } catch(err) {
        logger.error(err);
    }
}

// vim:set tw=0:
