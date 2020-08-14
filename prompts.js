module.exports = pkg => {
    const prompts = []

    // 添加插件选择询问
    prompts.push({
        type: 'list',
        name: 'ui',
        message: '选择使用的ui库',
        choices: [
            { name: 'element-ui', value: 'element-ui&2.13.2' },
            { name: 'vant', value: 'vant&2.8.5' },
            { name: 'antd-vue', value: 'ant-design-vue&1.6.3' }
        ]
    })

    return prompts
}