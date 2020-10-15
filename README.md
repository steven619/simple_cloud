# simple_cloud_mp
https://wuyun.com/

工业互联网
AppID: wx15f872db3077bad2
AppSecret: b0a4f758ff3219e39bc7997b23b8fdaf


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### API
http://127.0.0.1:5002/api/v1/driver/


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
