var fs = require('fs');
var ncp = require('ncp').ncp;
var mkdirp = require('mkdirp');

const source = './build/static';
const destination = './app/www/';

['css', 'js'].forEach(type => {
    const basePath = `./build/static/${type}`;
    fs.readdir(basePath, 'utf-8', (err, files) => {
        files.filter(file => file !== null && file.endsWith(`.${type}`)).forEach(file => {
            var filePath = `${basePath}/${file}`;
            fs.readFile(filePath, 'utf-8', (err, data) => {
                var destinationBasePath = `${destination}${type}`

                mkdirp(destinationBasePath, err => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    fs.writeFile(`${destinationBasePath}/index.${type}`, data, 'utf-8', (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("Copied: " + filePath);
                    });
                });
            });
        });
    });
});