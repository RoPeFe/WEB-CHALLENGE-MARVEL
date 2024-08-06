import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import {join} from 'path';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL),
            'process.env.REACT_APP_PUBLIC_KEY': JSON.stringify(env.REACT_APP_PUBLIC_KEY),
            'process.env.REACT_APP_PRIVATE_KEY': JSON.stringify(env.REACT_APP_PRIVATE_KEY),
        },
        plugins: [react(), svgr()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: join(__dirname, 'src/setupTests.ts'),
        },
    };
});
