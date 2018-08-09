

```
npm i eslint-loader babel-eslint -D
当我们用eslint 检测代码的时候.有时候babel 和webpack会有些不支持. 所有我们使用这个来辅助

    "lint": "eslint --ext .js --ext .jsx --ext .vue client/", 代码检测
    "lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/" 代码修复

//.eslintrc
{
  "extends": "standard",
  "plugins": ["html"],
  "parser":"babe-eslint"
}
然后在wepbpack里面配置 //webpack.config.base.js
  {
     est: /\.(vue|js|jsx)$/,
     loader: 'babel-loader',
     exclude:/node_modules/,
     enforce:'pre'
 },

```

```$xslt
npm i husky -D 在提交git的时候进行代码检测
    "precommit":"npm run lint-fix"
```

# About


# 使用方法
```
git clone https://github.com/Jokcy/vue-todo-tech.git
```
进入项目目录，运行
```
npm install
```
然后执行
```
npm run dev
```
开始开发项目
