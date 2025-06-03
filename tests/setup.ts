import { expect, vi } from 'vitest'
import * as matchers  from '@testing-library/jest-dom/matchers'
import { cleanup }    from '@testing-library/vue'
import { config }     from '@vue/test-utils'

/* jest-dom */
expect.extend(matchers)
afterEach(() => cleanup())

/* 全局组件 stub */
config.global.components = {
    NuxtLink: { name: 'NuxtLink', props: ['to'], template: '<a :href="to"><slot /></a>' },
    NuxtImg : { name: 'NuxtImg',  props: ['src','alt'], template: '<img :src="src" :alt="alt" />' }
}

/* —— 关键：统一的 mockApi —— */
export const mockApi = vi.fn()

vi.stubGlobal('useNuxtApp', () => ({ $api: mockApi }))

/* 备用 $fetch stub */
globalThis.$fetch = vi.fn()
