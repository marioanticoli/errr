import server from './server';
import http from 'http';
import socketServer from './server/socket-server';

var config = {};

if (process.env.NODE_ENV === 'development') {
  config.port = 3001;
  config.host = 'localhost';
  server.locals.assetPath = 'http://localhost:8080/';
  server.locals.isDevelopment = true;
} else if (process.env.NODE_ENV === 'production') {
  config.port = 3001;
  config.host = 'localhost';
  server.locals.assetPath = 'http://localhost:3001/';
  server.locals.isDevelopment = false;
}

const webServer = server.listen(config.port, config.host, (err) => {
  if (err) throw err;
  console.log('Web server listening at http://%s:%d', config.host, config.port);
});

socketServer(webServer);
