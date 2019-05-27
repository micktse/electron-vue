# electron-vue 开发框架

## 版本信息 
```
electron 5.0.2 
vue 2.6.10 
vue-cli 3.8.0
```
## 简介 
```
利用vue-cli3的webpack整合优点，把electron和vue进行解藕，可各自更新版本互不影响
项目使用yarn进行安装和管理，使用前务必先安装好yarn
```
## 项目安装
```
yarn run setup
```

## 项目开发
```
yarn run dev
```

## 构建程序
```
yarn run build
```
## 项目结构简介
### 主进程文件目录
```
electron                主程序文件夹
electron/vue-devtools   vue开发插件，开发模式时加载
electron/icons          程序图标目录
electron/index.dev.js   开发模式时启动入口文件
electron/index.js       生产模式时启动入口文件
electron/renderer.js    预加载渲染进程文件
electron/app            vue-cli构建的app（构建程序时出现）
electron/dist           二进制及安装程序输出目录（构建程序时出现）
```
### 渲染进程文件目录
```
src                     vue源程序文件夹
public                  vue模版及静态文件夹
```
##  进程间通信
### 主进程
```
let { ipcMain } = require('electron')
ipcMain.on('ipc-main', (event, message) =>{
  event.sender.send('ipc-renderer', message + 'bar')
})
```
### 渲染进程
*ipc无需进行引入或声明可全局使用*
```
ipc.send('ipc-main', 'foo')
ipc.on('ipc-renderer', (...arg) =>{
  console.log('message', arg[1])
})
```
__主进程建议使用require/module.exports进行模块引用和输出，如需使用import/export在主进程目录增加babel模块即可__