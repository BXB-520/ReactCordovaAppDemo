### Umi and Cordova project 使用说明

## H5

#http://114.132.187.155:8082/

pnpm / npm / yarn

npm start / yarn start

## APP(Android/Ios)

npm run build (生成 www 文件)

cordova platform add android / ios (安卓/ios 编译)

cordova prepare android / ios (安卓/ios 注入插件)

cordova platform ls (检查环境)

cordova requirements (检查打包条件)

cordova build android / ios (开始打包 APK/IPA)

cordova build --release android (用于打包没有签名的 APK)

cordova run android / ios (手机在线调试)

### 常见问题和配置需求

1.允许 Http 网络请求 在 AndroidManifest.xml 文件的 application 中配置 android:usesCleartextTraffic="true"

### 嵌入式第三方插件提供方法

1.找到项目路径 安卓-ReactCordovaAppDemo\platforms\android\platform_www 苹果-ReactCordovaAppDemo\platforms\ios\platform_www 2.选中 plugins,cordova.js,cordova_plugins.js 复制这 3 个文件到 public 文件，并集中放在 webview/android 或是 webview/ios 文件中
3.cordovaIncome.js 修改对应目录和服务器 ip，并吧文件提供给第三方

# **H5 项目规约**

## 1. 目录结构说明

**项目文件需遵循项目目录结构说明进行创建，大致项目目录如图所示（根据项目适当调整）：**

```
config  #umi配置
 |
platforms #安卓项目（需要构建）
 |
plugins #app插件列表
 |
public #静态资源
 |
resources #app logo和启动动画
 │
src
 ├─App #app首页
 │  │
 │  └─index #系统开始
 │
 ├─assets #静态资源
 │  │
 │  ├─fonts #字体
 │  │
 │  ├─icons #图标
 │  │
 │  └─imgs #图片
 │
 ├─components #全局组件
 │  │
 │  ├─business #业务组件
 │  │
 │  ├─common #公共组件
 │  │
 │  └─system #系统组件（一般情况不要动）
 │
 ├─constants #系统常量
 |      enum.ts #全局枚举常量
 │      index.ts #全局常量
 │      system.ts #系统常量（一般情况不要动）
 │
 ├─hooks #自定义hooks
 │      index.ts
 │
 ├─models #全局状态
 │      authModel.ts
 │
 ├─pages #路由组件
 │      tabs #app首页
 │      document.ejs #原始html
 │
 ├──xxx #业务组件
 │      components #私有组件目录(如果组件太多,可选)
 │      index.tsx  # 默认的路由页面文件名
 │      service.ts #业务组件中单独使用的api接口文件(可选)
 │      model.ts #业务组件中单独使用的model文件(可选)
 │      type.d.ts #业务中需要对组件进行类型说明的文件(可选)
 │
 ├─services #请求模块
 │      http.ts 封装请求函数
 │      public.ts 公共请求接口
 │
 ├─utils #工具方法
 │      common.ts #常规方法
 │      cordova.ts #app插件
 │
 ├─app.ts #运行时配置
 │
 ├─common.less #常规或公共less
 │
 ├─global.less #全局less
 │
 └─typings.d.ts #全局ts声明文件

```

## 2. 文件夹以及文件的命名规范

> - 路由页面的文件夹名称以**小写**或者 **kebab-case** 方式进行命名。
> - 路由页面出口的组件名固定为 **index.tsx**。
> - 组件名称（不管是页面的组件还是公共组件或者是业务组件）以 **PascalCase (大驼峰)** 方式进行命名，**固定的 index.tsx(jsx) 除外**。
> - 包含组件的文件夹名称都应 (大驼峰) 方式进行命名 **除开 components business common 这几个固定的名称**。

- 如果页面拆分的组件太多，新建**components**文件夹，把拆分的组件放里面。

- 如果页面拆分组件不多，可不用新建**components**文件夹，直接平层放置（**与 index.tsx 同级 以 S-组件名.tsx**）。

> - 页面中**私有组件名称**或者**私有组件的文件夹名**称以 **S-组件名称\*\*** 方式进行命名。
> - 如果组件含有样式文件，样式文件名称与组件同名。
> - 静态资源以小写或者下划线隔断方式（ **kebab_case** ）进行命名，根据资源类型放在 src 下的 assets 下的不同文件夹中。

## 3. 代码书写规范

> - 优先使用 `const` 其次`let` 不允许使用`var`。
>
> - 优先使用模板字符串拼接，禁止使用 + 号拼接。
>
> - 优先使用解构的方式解构对象，数组。
>
> - 禁止进行嵌套三元表达式的判断。
>
> - 禁止使用 ==，只能使用 === 。
>
> - 禁止使用**数字魔法值**，应当使用枚举或者对象映射。
>
> - 函数的形参个数最多 3 个，大于 3 个的使用对象传参。
>
> - js 类名使用 **PascalCase** 方式进行定义。
>
> - css 类名使用 **kebab-case** 方式进行命名，如果使用了 css 模块 则可以用 **kebab_case** 命名。
>
> - 函数名称，变量名使用 **pascalCase** 命名方式进行命名。
>
> - 常量使用全大写方式进行命名，**PASCAL_CASE**，公共的枚举命名以 **PUBLIC_ENUM_XXXX**。
>
> - 函数名称和变量名称需要进行命名具有含义化，禁止 a , b , c 等随意命名。
>
> - 事件处理函数名称统一以<b style="background:#ff0000;">handle+具体名称</b>方式进行命名。
>
> - 请求统一以 **api + 具体接口** 名称方式进行命名。
>
> - 请求方式统一**使用 ahook 的 useRequest 钩子**，取值以解构的方式进行命名，其中 run 方法以<b style="background:#ff0000;">run+具体名称</b>的方式进行命名。
>
> - 对于复杂，状态多的页面，必须写好注释，尽量选择`/** XXX */` （jsdoc 的规则）进行注释 。
>
> - 复杂页面需要将页面进行拆解为组件的方式进行组装。
>
> - 代码中存在大量的 `type` 或 `interface` 需要将 type 和 interface 单独写在 **type.d.ts** 中。
>
> - ts 文件中**尽量**减少使用 any。
>
> - 其他具体代码规范根据 eslint styleline prettier 等来管理。

## 4. 提交代码规范

- feat：增加新的业务功能
- fix：修复业务问题/BUG
- style： 样式的改动
- docs：文档和注释相关
- refactor：重构代码（即不是新增功能，也不是修改 bug 的代码变动）
- chore：构建过程或辅助工具插件的变动( 依赖包 )
- revert： 回退代码
- perf： 代码优化性能
- test：增加测试
- types：ts 类型定义文件更改

提交时遵循:git commit -m 'type: 功能模块-提交意见

```
git commit -m 'feat: 用户管理-添加用户'
git commit -m 'fix: 用户管理-修复用户无法新增'
git commit -m 'test: 用户管理-测试修改用户接口'
```

## 5. VSCode 配置规范

> - 安装 ESLint 插件
> - 安装 Prettier 插件
> - 安装 Stylelint 插件

## 6. ESLint 和 Prettier 和 Stylelint 规范

> - 遵循项目 umi 项目中的 eslint 和 prettier 配置文件进行校验
> - 具体校验规则可根据团队规范讨论后再细改

### 7. 前端开发流程

1. 理解需求
2. 查看原型
3. 组内讨论
4. 代码实现
5. 功能测试
