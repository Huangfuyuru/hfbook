# git使用

1. 创建新分支（本地和远程）

```
git branch dev_bg
git checkout dev_bg
// 推送到远程分支
git push origin dev_bg   
```

2. 删除分支

```
// 删除本地dev_bg分支
git branch -d dev_bg
// 删除远程dev_bg分支
git push origin -d dev_bg
```

3. 查看分支

```
// 查看所有分支
git branch -a
// 查看本地分支
git branch -l
// 查看远程分支
git branch -r
```

4. 合并代码

```
//1. 切换到合并的分支，比如在dev分支上开发，需要合并到master分支，则先 切换到master
git checkout master
//2. 合并代码
git merge dev
//3. 查看是否冲突
git status
//4. 再次拉一次远程代码
git pull origin master
//5. 推送到远程
git push origin master
```

5. 拉取分支

```
// 比如拉取远程 dev 分支到本地
//1. 先在本地新建dev分支
git checkout -b dev 
//2. 拉取远程分支
git pull origin dev 
```

6. 回退

```
// 1.查看版本号
git log 
// 2.根据版本号，将版本回退
git reset --hard 版本号
// 3.将远程仓库覆盖
git push origin 仓库名 -f
```

