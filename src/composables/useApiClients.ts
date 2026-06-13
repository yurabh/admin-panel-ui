
import { isUndefined } from "lodash-es";
import { inject } from 'vue';

import { apiClientKey } from '@/plugins/apiClients';

import type StandardClient from '@/application/api/StandardClient';

export function useApiClient() {
    const client = inject(apiClientKey)

    if (isUndefined(client)) {
        throw new Error('Api client not provided')
    }

    return client as StandardClient
}