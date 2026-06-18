import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'

// const hash: number = Math.floor(Math.random() * 90000) + 10000

export default defineConfig(({ command, mode, isSsrBuild }) => {
    const env = loadEnv(mode, process.cwd())

    return {
        plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
        resolve: {
            alias: {
                '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
                '~bootstrap-icons': path.resolve(
                    __dirname,
                    'node_modules/bootstrap-icons',
                ),
                '@': path.resolve(__dirname, './src'),
            },
            extensions: ['.js', '.ts', '.tsx', '.jsx'],
        },
        define: {
            __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
        },
        build: {
            modulePreload: true,
            target: 'esnext',
            cssCodeSplit: false,
            minify: true,
            chunkSizeWarningLimit: 1000,
            assetsInlineLimit: 0,
        },
        force: true,
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                    additionalData: '@use "sass:math";',
                    quietDeps: true,
                },
            },
        },
    }
})
