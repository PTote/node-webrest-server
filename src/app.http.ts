import fs from 'fs';
import http from 'http';


const server = http.createServer((req, res) => {
    
    console.log(req.url);

    const getFile = (path: string) => fs.readFileSync(`${path}`, 'utf-8');

    switch (req.url) {
        case '/texto.css':
            const getCssFile = getFile('./public/css/styles.css');
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(getCssFile);
            break;
        case '/application.js':
            const getJsFile = getFile('./public/js/app.js');
            console.log(getJsFile);
            res.writeHead(200, {'Content-Type': 'application/js'});
            res.end(getJsFile)
            break;
        case '/':
            const getHtmlFile = getFile('./public/index.html');
            console.log(getHtmlFile);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(getHtmlFile);
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();
            break;
    }

});


server.listen(8080, () => {
    console.log('Server running on port 8080');
})