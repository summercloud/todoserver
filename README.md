## step1: 安装mongodb
- 进入/usr/local目录，下载安装包sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.4.2.tgz
- 解压安装包，sudo tar -zxvf mongodb-osx-x86_64-3.4.2.tgz
- 将解压出的二进制文件转存入/usr/local/mongodb目录
- 将二进制文件添加到/etc/bashrc中，export PATH=/usr/local/mongodb/bin:$PATH
- 创建数据库存储目录 sudo mkdir -p /data/db,若数据库路径不是/data/db需要通过--dbpath 来指定。
- 进入到数据库存储目录/usr/local/mongodb/bin中运行mongod命令:sudo mongod

## step2
npm install 安装相关依赖 

## step3
npm run app运行
