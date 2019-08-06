该项目是一个多用户博客管理后台系统。采用vue+express开发
这部分是后端代码。<br>
该项目主要包括用户的登录注册以及用户对自己博客增删改查的一些基本功能。

### 后端技术栈
后端主要采用了：

- 1.express
- 2.express-session
- 3.redis
- 4.mysql

### 项目使用
1. 克隆该项目以及blog项目至本地
2. 找到blogserver.sql导入到数据库
3. 启动redis 数据库服务
4. 修改数据库的配置文件
4. 启动服务端blogServer
> npm run dev
