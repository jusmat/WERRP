import express      from 'express';
import logger       from 'morgan';
import config       from '../config/app';
import http         from 'http';
import router       from '../config/routes'


const app = express();

app.set('views', config.views_path);
app.set('view engine', config.views_engine);
app.set("view options", config.view_options);
app.set('port', config.port)

app.use(logger(config.logger_level));
app.use(express.static(config.static_files_path));
app.use('/', router)

const server = http.createServer(app);
server.listen(config.port);
