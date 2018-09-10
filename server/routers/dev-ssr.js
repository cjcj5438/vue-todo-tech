// 处理正式环境的ssr  服务端 使用require 直接可以运行的
const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
// 它不把文件写入内存里面. 不写入磁盘里面 其他和node fs 的API都是一样的.还有一些扩展
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const VueServerRenderer = require('vue-server-renderer');
const fs = require('fs ')

const serverConfig = require('../../build/webpack.config.server')
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs; //一般我们是通过cmd 在硬盘上指定输出文件, 这里mfs 可以直接在内存上跑

let bundle
// 每次文件改变都会执行一个打包

/*这部份的知识是webpack 是可以直接用nodejs 调用的 基本上就知道这些用法了*/
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  // eslint错误
  stats.errors.forEach(err => console.log(err))
  // eslint warings提示
  stats.hasWarnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  // 找到文件路径之后开始读文件
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
})

const handleSSR = async (ctx) => {
  if (bundle) {
    ctx.body = 'loading....'
    return
  }

  const clientManfestPesp = await axios.get('http://127.0.0.1:8000/vue-ssr-client-manifest.json')
  const clientManifest = clientManfestPesp.data;
  /*ejs 的template 渲染完整的html*/
  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'))

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest //会生产有<script>标签的js 字符串
  })
}
