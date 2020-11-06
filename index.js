
import { isElementOptionHasData, isPlainObject, expression2camelCaseCached } from './util'

const initializerConfigPrcocessor = function (expression, initializerConfig, data) {
  data.data = initializerConfig()
  data.initializer = initializerConfig
  data.init = () => {
    data.data = initializerConfig()
    this.$refs[expression2camelCaseCached(expression)] && this.$refs[expression2camelCaseCached(expression)].clearValidate()
  }
}

const mixinsGeneratorRecursion = function (expression, config, data) {
  Object.entries(config).forEach(
    ([subKey, subConfig]) => {
      if (['ajax', 'initializer'].includes(subKey)) {
        switch (subKey) {
          case 'ajax':
            break
          case 'initializer':
            initializerConfigPrcocessor.call(this, expression, subConfig, data)
            break
        }
      }
      else {
        const subKeyArray = subKey.split('.')
        const elementType = subKeyArray[0]
        subKey = subKeyArray[1] || elementType
        const subData = data[subKey] = data[subKey] || {}
        if (isElementOptionHasData(elementType)) {
          subData.data = []
          subData.loading = false
        }

        switch (elementType) {
          case 'table':
            subData.paging = {
              itemCount: 0,
              pageCount: 0,
              pageIndex: 1,
              pageSize: 20
            }
            subData.currentRow = null
            subData.currentChange = function (currentRow) {
              subData.currentRow = currentRow
            }
            break
          case 'form':
            subData.data = {}
            break
          case 'dialog':
            subData.visible = false
            break
          default:
            if (!isPlainObject(subConfig)) {
              typeof subConfig === 'function' && (data[subKey] = subConfig.bind(this))
              return (data[subKey] = subConfig)
            }
        }

        mixinsGeneratorRecursion.call(this, `${expression}.${subKey}`, subConfig, subData)
      }
    }
  )
}

const mixinsGenerator = function (config) {
  const { prop } = config
  const result = {}
  result.created = function () {
    let generatorConfig = this.$options[prop]
    if (generatorConfig) {
      const _this = this
      mixinsGeneratorRecursion.call(this, '', generatorConfig, _this)
    }
  }

  return result
}

export default {
  install (Vue, config = { prop: 'generator' }) {
    Vue.mixin(mixinsGenerator(config))
  }
}