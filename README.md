# ali_mini_program
阿里巴巴练习生结业项目
## 使用方式

1. 克隆仓库代码 `git clone https://github.com/Konsoue/ali_mini_program.git`

2. 打开本地 vscode 终端

3. 下载依赖包 `npm i `

4. 开发命令 `npm start`

5. 打包命令 `npm run build`

## 协同开发的代码规范

[js 代码规范](https://juejin.cn/post/6844903921412997127#heading-22)

## git 工作流

1. 在本地创建分支：`git checkout -b 你的分支名`

2. 开发完，`git add *` 然后 `git commit -m '你的提交内容说明'`

3. fetch 远程 master 的代码，但此时其实没有真的合并到你的分支。`git fetch origin master`

4. 通过这个命令，真正把远程的 master 合并到自己的分支。如果有冲突，解决冲突。`git merge origin/master`

5. 接着，`git add *` 并且 `git commit -m '你的提交内容说明'`

6. 推送本地开发分支到远程仓库 `git push origin 你的分支名`

7. 在 github 上，pull request 请求合并

8. 等合并完，在本地，切回 master 分支

9. 把远程 master 拉下来到本地的 master  `git pull origin master`

10. 再切新的本地分支，进行开发，以此循环
