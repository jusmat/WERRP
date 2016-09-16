import gulp       from 'gulp'
import tasks      from './src/building/tasks'

const environment = process.env.NODE_ENV == 'PRODUCTION' ? tasks.production : tasks.development;

gulp.task('start', ['backend', 'frontend'], environment.server)
gulp.task('backend', environment.backend)
gulp.task('frontend', environment.frontend)
