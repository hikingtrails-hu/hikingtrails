/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    ignoredRouteFiles: ['**/.*'],
    server:
        process.env.NETLIFY || process.env.NETLIFY_LOCAL
            ? './server.js'
            : undefined,
    serverBuildPath: '.netlify/functions-internal/server.js',
    appDirectory: `src/apps/${process.env.REMIX_APP}`,
    // assetsBuildDirectory: "public/build",
    // publicPath: "/build/",
}
