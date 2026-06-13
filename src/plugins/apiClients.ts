import type {Plugin} from 'vue';

import StandardClient from '@/application/api/StandardClient';

export const apiClientKey = Symbol('apiClient')

export default function (): Plugin {
    return {
        install(app) {
            const client = new StandardClient({
                baseURL: import.meta.env.VITE_SERVER_URL,
            })
            app.provide(apiClientKey, client)
        },
    }
}
