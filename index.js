import Class from './class'
const carlo = require('carlo');
const path = require('path');
const obj = new Class()

const run = async () => {
    console.log('run?')
    let app;
    try {
        app = await carlo.launch(
            {
                bgcolor: '#2b2e3b',
                title: 'Systeminfo App',
                width: 1000,
                height: 500,
                channel: ['canary', 'stable'],
                icon: path.join(__dirname, '/app_icon.png'),
                args: process.env.DEV === 'true' ? ['--auto-open-devtools-for-tabs'] : [],
                localDataDir: path.join(os.homedir(), '.carlosysteminfo'),
            });
    } catch(e) {
        console.log(e)
        console.log('Reusing the running instance');
        return;
    }
    app.on('exit', () => process.exit());
    app.on('window', window => window.load('index.html'));
    app.serveFolder(path.join(__dirname, 'html'));
    await app.exposeFunction('print', print);
    await app.load('index.html');
    return app;
}

const print = async () => {
    const message = { text: 'in a bottle'};
    return message;
}

run().then(() => {
    console.log(`i'm ready`)
})