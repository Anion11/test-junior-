import gulp from 'gulp';
import fs from 'node:fs';
import path from 'node:path';
import through from 'through2';

const doNotEditMessage =
  '//- ВНИМАНИЕ! Этот файл генерируется автоматически.\n//- Любые изменения будут потеряны при следующей компиляции.\n\n';

const generatePugMixins = () => {
  const source = path.resolve('./src/blocks/');
  const files = [];
  return through.obj((file, enc, callback) => {
    file = file.path.replace(source, '');
    let mixinsList = doNotEditMessage.replace(/\n /gm, '\n  ');
    files.push(file);
    files.sort();
    for (const blockName of files) {
      mixinsList += `include ${blockName}\n`;
    }
    fs.writeFileSync('src/blocks/mixins.pug', mixinsList);
    callback(undefined, file);
  });
};

function pugMixins() {
  return gulp
    .src([
      'src/blocks/**/*.pug',
      '!src/blocks/mixins.pug',
      '!src/blocks/header/*',
      '!src/blocks/footer/*',
    ])
    .pipe(generatePugMixins());
}

function copyFiles() {
  const source = path.resolve('./src/copyFolder/');
  const destination = path.resolve('./dist/');
  return gulp.src(`${source}/**/*`).pipe(gulp.dest(destination));
}

export { pugMixins, copyFiles };
