const docsLoader = require.resolve('./docs-loader.js')

module.exports = (isDev) => {
    return {
        /*html换行去空格*/
        preserveWhiteSpace: true,
        /*css 直接在组建里加载, 不单独提到文件里面加载
        * vue-style-loader 是有热更新的和 extractcss没有关系
        *  */
        extractcss: !isDev,
        /*他是做什么的?*/
        cssModules: {
            //生产独有的css名字 , 只能在当前文件才能使用的,防止css命名空间冲突
            //有些<style lang="stylus" scoped> 有些是module.看情况而定
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : "[hash:base64:5]",
            //cssName 中横线连字符 . 转为js 中的 正规命名
            camelCase: true
        }
        /*热重载hotReload 根据环境变量来生成*/
        /*postcss直接在全局配置,可以不在这里陪着*/
        // loaders: {
        //     'docs': docsLoader,
        // },
        /*先用preLoader解析 然后用babel解析, 场景:一般我们先解析TS然后在用babel解析*/
        // preLoader:{},
        /*在babel 解析之后在用postLoader 解析*/
        // postLoader:{}
    }
}
