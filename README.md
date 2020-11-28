
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```
### 模拟后台数据
```
yarn run mock
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


```
        onLaunch() {
        },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
```
## 模板
```
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
  import Cloud from '../../utils/driver'
  @Component({
    name: 'PersonalCenter',
    components: {
    }
  })
  export default class extends Vue {
    private driver = new Cloud()
    }
</script>
```
## 参赛数据
```
一.APP介绍
1.APP名称：仓储管理APP
2.解决的工业场景：面向工业企业提供出库、入库、盘点，定位自动化、配置性强、策略丰富、管理立体的仓储管理APP。
3.团队组成：宁夏大学软件工程学生（大四）（1人）
4.演示视频已上传，
5.产品技术架构：uni-app,ts,vue.js,mock,swagger.ColorUI组件。
6.功能描述：面向工业企业提供出库、入库、盘点，定位自动化、配置性强、策略丰富、管理立体，新闻，广告服务等接口。
7.市场分析：大多工厂都是人力资源，这样多样转型自动化，前锦特别好。
8.财务分析：只需要1台云服务器。

```
