var webpack=require("webpack");
var OpenBrowserPlugin=require("open-browser-webpack-plugin");
//[name].[chunkhash]生成文件名
var WebpackMd5Hash=require("webpack-md5-hash");
//独立出css样式在ExtractTextPlugin的extract方法有两个参数，第一个参数是经过编译后通过style-loader单独提取出文件来，而第二个参数就是用来编译代码的loader
var ExtractTextPlugin=require("extract-text-webpack-plugin");
var path=require("path");

//开发环境
var isDev=function(){
    return process.env.NODE_ENV.trim()==='development';
};
//生产环境
var isProd=function(){
    return process.env.NODE_ENV.trim()==='production';
};

module.exports={
    devServer:{
        port:9191,
        //后退无刷新
        historyApiFallback:true,
        hot:true,
        inline:true,
        //进度展示
        progress:true,
        contentBase:"./src",//最好写上，否则报错，难道这里是一个坑？
        proxy:{
            //联调中跨域问题解决
        }
    },
    devtool: isProd() ? false:'inline-source-map',
    entry:[
        path.resolve(__dirname,'src/js/index.js')
    ],
    output:{
            path:'./dist',
            filename:isProd()?'[name].[chunkhash:4].js':'[name].js',
            chunkFilename:isProd()?'[name].chunk.[chunkhash:4].js':'[name].chunk.js',//分割js配置
            publicPath:isProd()?'./dist/':'/dist/'//配置各个模块的公共路径
    },
    module:{
        loaders:[{
            test:/\.js$/,
            exclude:/node_modules/,
            loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']

        },{
            test:/\.less$/,
            exclude:/node_modules/,
            loader:ExtractTextPlugin.extract('style-loader','css-loader',{
                publicPath:'.'
            })
        },
            {
                test: /\.css$/, loader: "style!css"
            },
            {
            test:/\.(png|jpg)$/,
            loader:'file-loader?name=/[name].[hash:8].[ext]'
        }]
    },
    //省略扩展名
    resolve:{
        extensions:['','.js','.jsx'],
    },
    //就是webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。
    externals:{
        "React":'React',
        "ReactDOM":'ReactDOM',
        "zepto":'Zepto'
    }, 
    plugins:getPlugins()

};
// 获取配置
function getPlugins(){
    var plugins=[
        new webpack.DefinePlugin({
            __DEV__:isDev(),
            __PROD__:isProd(),
            'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV.trim())
        }),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new ExtractTextPlugin('style.css'),
    ];
    if(isDev()){
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    if(isProd()){
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                minimize:true,
                output: {
                    comments: false,
                },
                compress: {
                    warnings: false
                }
            })
        );
    }
    plugins.push(
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    );
    return plugins
}