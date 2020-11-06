### v-mixin-generator
This is my first npm package

It is just for learning

```javascript
import Vue from 'vue'

Vue.use(VMixinGenerator, { prop: 'generator' })
```

## component

```javascript
export default {
  name: 'App',

  generator: {
    table: {},
    form: {
      initializer () {
        return {
          name: ''
        }
      }
    },
    dialog: {}
  }
}

```