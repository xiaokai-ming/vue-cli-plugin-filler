const PluginHelper = require('../helper/index')

module.exports = (api, options) => {
    new PluginHelper(api, options)

        .case(options.ui, helper => {
            const [uiName, uiVersion] = options.ui.split('&')
            helper
                .case(
                    !helper.hasPlugin(uiName) && uiName === 'element-ui',
                    h => {
                        h.extendPackage({
                            dependencies: {
                                [uiName]: `^${uiVersion}`
                            }
                        }, {})
                            .addImport('src/main', 'ElementUI', 'element-ui')
                            .addImport('src/main', undefined, 'element-ui/lib/theme-chalk/index.css')
                    })
                .case(
                    !helper.hasPlugin(uiName) && uiName === 'antd-vue',
                    h => {
                        h.extendPackage({
                            dependencies: {
                                [uiName]: `^${uiVersion}`
                            }
                        }, {})
                            .addImport('src/main', 'Antd', 'ant-design-vue')
                            .addImport('src/main', undefined, 'ant-design-vue/dist/antd.css')
                    })
                .case(
                    !helper.hasPlugin(uiName) && uiName === 'vant',
                    h => {
                        h.extendPackage({
                            dependencies: {
                                [uiName]: `^${uiVersion}`
                            }
                        }, {})
                    })
        })
}
