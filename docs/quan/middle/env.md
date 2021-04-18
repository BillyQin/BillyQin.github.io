## 实盘环境搭建
## 阿里云弹性ecs
1. centos 8.3 python 3.6.8
2. 升级pip   pip3 install --upgrade pip
3. 安装差分库 pip3 install fracdiff==0.2.5
4. pip3 install pandas==0.24.0
5. pip3 install numpy==1.19.5
6. pip3 install ccxt
7. 安装talib
  * wget http://prdownloads.sourceforge.net/ta-lib/ta-lib-0.4.0-src.tar.gz
  * tar -xzf ta-lib-0.4.0-src.tar.gz
  * cd ta-lib/
  * ./configure
  * make
  * make install
  * pip3 install ta-lib
  * export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH
  * source /etc/proflie

8. pip3 list
  * ccxt                1.47.72
  * pandas              0.24.0
  * TA-Lib              0.4.10
  * numpy               1.19.5
  * fracdiff            0.2.5
  * python 3.6.8

## 安装nodejs
1. 下载 wget https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz
2. 解压 tar -xvf https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz
3. 环境变量设置
  * vim /etc/profile
  * export PATH=$PATH:/usr/local/node/bin
  * node -v
4. 安装pm2
  * npm install pm2 -g
5. pm2 start select_compound_coin.py --interpreter python3