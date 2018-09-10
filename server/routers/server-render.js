//服务端渲染的操作
const ejs = require('ejs')
/**
 *
 * @param ctx 执行的上下文
 * @param renderer 开发时和上线时,开发的流程不一样, 所以要在外部传入
 * @param template
 * @returns {Promise<void>}
 */
module.exports = async (ctx, renderer, template) => {
  ctx.header['Content-Type'] = 'text/html'
  /*vue-server-render 渲染之后会有很多属性附加到ctx上面 文件路径*/
  const context = {url: ctx.path}

  try {
    const appString = await renderer.renderToString(context)
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderStyles()
    })
    ctx.body = html
  } catch (e) {
    console.log('render error', err)
    throw  err
  }
}
