# TCP

#### 三次握手

所有TCP连接一开始都要经过三次握手。客户端与服务器在交换应用数据之前，必须就起始分组序列号，以及其他一些连接相关的细节达成一致。出于安全考虑，序列号由两端随机数生成。

[![aaO9pV.png](https://s1.ax1x.com/2020/08/03/aaO9pV.png)](https://imgchr.com/i/aaO9pV)

SYN：客户端选择一个随机序列号，并发送一个SYN分组，其中可能还包括其他TCP标志和选项

SYN ACK：服务器给x加1，并选择自己的一个随机序列号y，追加自己的标志和选项，然后返回响应

ACK：客户端给x和y加1并发送握手期间的最后一个ACK分组。

#### 拥塞预防及控制

##### 流量控制

流量控制是一种预防发送端过多向接收端发送数据的机制。否则，接收端可能因为忙碌、负载重或缓冲区既定而无法处理。为实现流量控制，TCP连接的每一方都要通告自己的接收窗口(rwnd)，rwnd保存数据的缓存区空间大小信息。

##### 慢启动

发送端和接收端在建立之初，谁也不知道可用带宽是多少，因此需要一个估算机制，然后还要根据网络中不断变化的条件动态改变速度。
