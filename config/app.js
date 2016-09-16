const config = {};

config.views_path = './app/views/'
config.views_engine = 'pug'

config.logger_level = 'dev'
config.static_files_path = './public/'
config.view_options = { layout: "layouts/application.pug" }

config.port = 3000

export default config;
