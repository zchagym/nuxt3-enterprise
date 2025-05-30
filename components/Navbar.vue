<template>
  <header class="flex items-center gap-4 p-4 border-b">
    <NuxtLink to="/" class="font-bold">{{ $t('siteName') }}</NuxtLink>
    <NuxtLink to="/posts" class="ml-4">{{ $t('posts') }}</NuxtLink>

    <div class="ml-auto flex items-center gap-3">
      <!-- 语言切换 -->
      <select
          :value="locale"
          @change="changeLocale(($event.target as HTMLSelectElement).value)"
          class="border rounded px-1 py-0.5 text-sm"
      >
        <option
            v-for="l in localeOptions"
            :key="l.code"
            :value="l.code"
        >
          {{ l.code.toUpperCase() }}
        </option>
      </select>

      <!-- 主题 -->
      <ThemeToggle />

      <!-- 登录 / 登出 -->
      <NuxtLink v-if="!isLoggedIn" to="/login">{{ $t('login') }}</NuxtLink>
      <button v-else @click="logout" class="text-red-500">{{ $t('logout') }}</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n, useSwitchLocalePath } from '#imports'
import ThemeToggle from '~/components/ThemeToggle.vue'

/* i18n */
const { locales, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const localeOptions = computed(() =>
    locales.value.map(l => (typeof l === 'string' ? { code: l } : l))
)

function changeLocale(code: string) {
  if (code === locale.value) return
  /* 跳转到带前缀的同一路径，例如 /posts -> /zh/posts */
  navigateTo(switchLocalePath(code))
}

/* auth */
const auth       = useAuth()
const isLoggedIn = computed(() => auth.isLoggedIn)
const logout     = () => auth.logout()
</script>
