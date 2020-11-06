### v-mixin-generator
This is my first npm package

It is just for learning

import Vue from 'vue'

Vue.use(VMixinGenerator, { prop: 'generator' })

## component

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