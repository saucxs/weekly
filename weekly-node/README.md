# weekly-node
weekly-node是基于vue+nodejs的周报企业管理系统，使用的vuex状态管理，后端框架。
周报系统主要是node+vue+redis+mysql+es6，一个企业管理系统，企业员工汇报每周工作情况，以及完成情况，各级负责人可以查看和提醒相应未写周报人员。
，后端完全使用`nodeJS`，数据库使用`mysql`，基于`nodejs的thinkjs框架搭建的`，如果喜欢`nodeJS`写的后端，支持大前端，支持全栈开发，请请`star`并`fork`项目。

> + 系统演示地址为：[周报线上地址](http://weekly.mwcxs.top)。
> + （公司负责人）账号：testadmin，密码：123456
> + （部门经理）账号：test，密码：123456
> + （成员）账号：teststaff，密码：123456

如有使用问题请留言。

支持：
> + 1、所有人周报提交修改；
> + 2、所有人周报自身周报历史查看；
> + 3、部门经理查看部门周报填写情况，增改部门人员；
> + 4、总监（或公司拥有者）查看和修改所有人的周报填写情况，增删改公司人员，增改公司部门；
> + 5、管理员权限，增删改公司总监，增删改部门人员，增删改公司部门，查看和编辑所有所有的周报，以及所有所有周报填写情况；

### 一、技术栈
> + ThinkJS（ Node端框架） [官方网站](https://thinkjs.org/)
> + Vue.js（客户端双向数据绑定框架）  [官方网站](https://cn.vuejs.org/)

### 二、版本功能
- [x] Element UI
- [x] 登录/注销
- [x] 个人中心
- [x] 修改用户信息
- [x] 修改密码
- [x] mysql
- [x] 写周报
- [x] 个人历史周报
- [x] 部门人员管理
- [x] 部门周报情况
- [x] 公司的部门新建，修改，删除

+ 2018.09.18
   - 完成基本版本的功能
+ 2018.09.20
    - 部门经理权限优化
    - 左侧增加首页
    - 部门人员管理增加查询，可根据用户名，工号，公司名，部门名称，查询部门成员
+ 2018.10.12   
    - 优化权限管理

### 三、系统截图
![image](./shot_pic_1.png)
#### 3.2 成员页面
![image](./shot_pic_staff.png)
#### 3.3 部门经理页面
![image](./shot_pic_2_manger.png)
#### 3.4 总监页面
![image](./shot_pic_2_big_manger.png)
#### 3.5 管理员页面
![image](./shot_pic_admin.png)

### 四、前端本地运行程序
1、首先你的环境是nodejs，不会安装配置参考：[nodejs安装和环境配置（Windows）](http://www.mwcxs.top/page/420.html)

2、clone下来项目
````
git clone https://github.com/saucxs/weekly.git
````
3、打开前端vue的weekly-node的文件夹，安装相应依赖
````
npm install
````
4、接着启动项目
````
npm start
 ````


