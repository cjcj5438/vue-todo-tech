/*这时用于自定义模块的时候使用*/
module.exports = function (source, map) {
    this.callback(
        null,
        `export default function (Component) {
      Component.options.__docs = ${
            JSON.stringify(source)
            }
    }`,
        map
    )
}