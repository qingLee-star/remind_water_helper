# Manifest Comments

## 本 markdown 的 readme

1. 具体字段参考文档：见[官方文档](https://developer.chrome.com/docs/extensions/reference/manifest?hl=zh-cn#minimal-manifest)。
2. 参考了 StackOverflow 的这个回答: [Can comments be used in JSON?](https://stackoverflow.com/questions/244777/can-comments-be-used-in-json)。不建议在`json`中写注释。于是把同名的`manifest.json`中的注释，挪到这个 markdown 文件中。

## 字段注释

### manifest_version

定义 manifest 文件的版本，这个值是固定值。

### name

扩展的名称。

### version

扩展的版本号。

### description

扩展的描述。

### icons

不同尺寸的图标文件。

- `16`: 16x16 图标
- `48`: 48x48 图标
- `128`: 128x128 图标

### browser_action

定义扩展在浏览器中的行为。

- `default_icon`: 默认图标
- `default_popup`: 弹出页面
- `default_title`: 弹出页面的标题

### permissions

扩展所需要的权限。

- `contextMenus`: 右键菜单
- `tabs`: 标签页
- `notifications`: 通知
- `webRequest`: 网络请求
- `webRequestBlocking`: 网络请求拦截
- `storage`: 本地存储
- `http://*/`: 所有 HTTP 网址
- `https://*/`: 所有 HTTPS 网址
