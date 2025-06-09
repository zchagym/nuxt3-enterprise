module.exports = {
    ci: {
        collect: {
            // 由 LHCI 自己启动/关闭 Nuxt 预览
            startServerCommand: 'npm run preview',
            startServerReadyPattern: 'Listening',  // 日志里出现这个就算就绪
            url: ['http://localhost:3000/'],
            numberOfRuns: 3,
            settings: { preset: 'desktop', output: ['html', 'json'] }
        },
        upload: {
            target: 'filesystem',
            outputDir: 'lhci-report'
        }
    }
};
