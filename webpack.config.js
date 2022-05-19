const path = require('path');
//启动热更新的第二步
const webpack = require('webpack');
const IP = require('./getIP');
const HOST = process.env.HOST;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
//导入html-webpack-plugins
// 只要是插件，都一定要放到plugins节点中去
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 这个配置文件，其实就是一个JS文件，通过Node中的模块操作，向外暴露了一个配置对象
module.exports = {
  entry: path.resolve(__dirname,"./src/js/index.js"), // 入口起点，可以指定多个入口起点，表示要使用webpack打包哪个文件
  output: { // 输出，只可指定一个输出配置
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist') // 输出文件所在的目录
    // __dirname表示本地路径
  },
  devtool: 'inline-source-map',
  devServer:{//这是配置dev-server参数的第二种形式，第一种形式在package.json
    open:true,//自动打开浏览器
    port:8081,//浏览器端口
    contentBase:"src",//指定托管的根目录，比如index在src"中，不在根目录里面，就需要设置此项
    host: HOST  || IP,
    // hot: true,
    // hotOnly: true
  },
  plugins:[//配置插件的节点
    // 这是一个创建在内存中生成html页面的插件
    new htmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),//指定模板页面，将来会根据指定的页面路径，去生成页面中的页面
      filename: "index.html"//指定生成的页面的名称
    }),
    // new CleanWebpackPlugin(),
    // //new 一个热更新的模块对象，这是启用热更新的第三步
    // new webpack.HotModuleReplacementPlugin ()
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  // optimization: { //与entry同级
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       uglifyOptions: {
  //         compress: false,
  //         mangle: true,
  //         output: {
  //           comments: false,
  //         },
  //       },
  //       sourceMap: false,
  //     })
  //   ]
  // },
  // 使用webpack-dev-server -D 把热更新安装到本地
  // 只有安装到全局 -g的工具，才能再终端中直接执行
  // webpack-dev-server帮我们打包生成的bundle.js文件，并没有存放在实际的物理磁盘上，而是直接托管到了电脑的内存中，
  // 所以我们在项目根目录中，找不到打包好的热更新JS文件，虽然看不见它，但是可以认为，此文件与根目录其它文件平级
  // 使用webpack-dev-server的时候本地一定要有webpack包，及时全局安装了webpack本地也要再装一次
  // 在使用webpack时
  // webpack 3.x 要使用 webpack-dev-server 2.x
  // webpack 4.x 要使用 webpack-dev-server 3.x
  // 在使用html-webpack-plugin时
  // webpack 3.x 要使用 webpack-dev-server 3.x
  // webpack 4.x 还未测试
  module:{//这个节点用于配置所有的第三方模块加载器
    rules:[
      // 配置处理.css文件的第三方loader规则
      {test:/\.css$/,use:['style-loader','css-loader']},
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
      {
        test:/\.(jpg|png|gif|bmp|jpeg|svg|woff|woff2|eot|ttf|otf|mp3)/,
        use:'url-loader?limit=8192&name=[hash:8]-[name].[ext]'
        // use: 'url-loader?esModule=false'
        // limit给定的文件大小最小值，是文件资源的大小，单位是byte，如果引用的文件大小或等于给定的limit值
        // 则不会转为base64格式,
        // 注意连接字符为&不是$
      },
      {test:/\.js$/,use:'babel-loader',exclude:/node_module/}
      // exclude的作用是排除node_modules中的JS文件，不然会一起打包编译，非常消耗CPU，而且最终也无法运行



      //webpack处理第三方文件类型的过程：
      // 1.发现这个要处理的文件不是JS文件，然后就去配置文件中，查找有没有对应的第三方loader规则
      // 2.如果能找到对应的规则，就会调用对应的loader去处理这种文件类型
      // 3.在调用loader的时候，是从后往前调用的
      // 4.当最后的一个loader调用完毕，会把处理的结果，直接交给webpack打包合并，最终输出到output规定的目录文件中去
    ]
  },
  // resolve: {
  //   alias: {
  //       'vue': 'vue/dist/vue.js'
  //   }//如果不增加这一步，会报错。具体原因还不太理解，但目前问题已经解决。参考http://www.imooc.com/article/17868
  // }
};




// 重新安装一次，如果还是不可以的话，在把之前装的都清空

// rm -rf node_modules
// rm package-lock.json
// npm cache clear --force
// npm install

// 管理员身份打开cmd

// 输入命令

// npm install - g node - gyp

// 备注：这个是node 的Python的编译；

// npm install--global--production windows - build - tools

// 这个就是添加windows 下的编译环境
