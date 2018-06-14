'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello, woaaarld!';
    }
});


  

server.route({
    method: 'GET',
    path: '/user/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});


    server.route({
        method: 'GET',
        path: '/hello',
        handler: (request, h) => {
            request.logger.info('In handler %s', request.path);
            return h.file('./public/about.html');
        }
    });



const init = async () => {
    await server.register(require('inert'));
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: false,
            logEvents: ['response']
        }
    });
    
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();