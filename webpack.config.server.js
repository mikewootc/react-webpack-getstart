let UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const nodeExternals = require('webpack-node-externals');

//let externals = _externals();

let config = {
    mode: 'development',
    entry: {
        'server'  : __dirname + "/servert.ts",
    },
    output: {                               // 输出
        path: __dirname,                    // 打包后的js文件存放的地方
        filename: "./[name]_bundle.js"      // 打包后输出的js的文件名
    },
 
    module: {
        rules: [ //loaders加载器
            {
                test: /\.(js|jsx)$/,        // 一个匹配loaders所处理的文件的拓展名的正则表达式, 这里用来匹配js和jsx文件(必须)
                exclude: /node_modules/,    // 屏蔽不需要处理的文件(文件夹)(可选)
                loader: 'babel-loader',     // loader的名称(必须)
                query: {
                    presets: [
                        'es2015',
                        'react',
                        'stage-1',          // stage-1 for static properties in class.
                        'stage-3',          // stage-3 for '...' operator
                    ],
                    plugins: ["transform-runtime", "babel-plugin-transform-regenerator", "babel-plugin-transform-es2015-modules-commonjs"], // for async/await
                }
            },
            {
                test: /\.tsx?$/,
                use: ['awesome-typescript-loader']
            },

        ]
    },

    target: 'node',
    //externals: externals,
    externals: [nodeExternals()],
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true
    },
};


function _externals() {
    let manifest = require('./package.json');
    let dependencies = manifest.dependencies;
    let externals = {};
    for (let p in dependencies) {
        externals[p] = 'commonjs ' + p;
    }
    return externals;
}


module.exports = (env, argv) => {
    //console.log(`mode: ${argv.dev}`);

    if (argv.dev) { // 开发模式
        console.log('[01;33mmode: development[0m');
        config.devtool = 'inline-source-map';
    } else {        // 生产模式
        console.log('[34mmode: production[0m');
//        config.devtool = 'none';
        config.devtool = 'source-map';
        config.plugins =  [
//            new UglifyJSPlugin()
        ]
    }
    return config;
}
