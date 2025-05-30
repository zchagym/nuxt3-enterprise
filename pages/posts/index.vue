<template>
  <div>
    <h1 class="text-xl font-semibold mb-4">{{ $t('articles') }}</h1>

    <!-- 搜索框 -->
    <div class="mb-6 flex">
      <input
          v-model="keyword"
          :placeholder="$t('searchHint')"
          class="border p-2 flex-1 rounded-l"
      />
      <button v-if="keyword" class="border-l px-3" @click="clear">✕</button>
    </div>

    <!-- 列表 / 骨架 -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SkeletonPost v-if="pending" v-for="i in 6" :key="i" />
      <template v-else-if="list.length">
        <PostCard v-for="p in list" :key="p.id" :post="p" />
      </template>
      <p v-else class="text-gray-500 italic">
        {{ $t('noResult', { keyword: keyword }) }}
      </p>
    </div>

    <!-- 分页 -->
    <div v-if="totalPage > 1" class="flex justify-center my-6">
      <button class="pager" :disabled="page === 1"      @click="go(page - 1)">‹</button>
      <button
          v-for="i in totalPage"
          :key="i"
          class="pager"
          :class="i === page && 'bg-green-600 text-white'"
          @click="go(i)"
      >{{ i }}</button>
      <button class="pager" :disabled="page === totalPage" @click="go(page + 1)">›</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from '#imports'
import PostCard     from '~/components/PostCard.vue'
import SkeletonPost from '~/components/SkeletonPost.vue'
import { usePosts } from '~/composables/usePosts'
import { watchDebounced } from '@vueuse/core'

/* ---------------- 路由、状态 ---------------- */
const route  = useRoute()
const router = useRouter()

const page     = ref(1)
const keyword  = ref('')

onBeforeMount(() => {
  page.value    = Number(route.query.page || 1)
  keyword.value = String(route.query.q || '')
  fetch()
})

/* ---------------- 数据请求 ------------------ */
const list      = ref<any[]>([])
const total     = ref(0)
const pageSize  = ref(6)
const pending   = ref(false)

const { fetchList } = usePosts()

async function fetch () {
  pending.value = true
  const res = await fetchList(page.value, keyword.value)
  list.value     = res.data
  total.value    = res.total
  pageSize.value = res.pageSize
  pending.value  = false

  /* 每次取到数据后，更新 <title> */
  useHead({
    title: keyword.value
        ? `${$t('searchHint')} ${keyword.value}`
        : $t('articles')
  })
}

/* ---------------- 交互逻辑 ------------------ */
function go (p: number) {
  page.value = p
  router.push({ query: { ...router.currentRoute.value.query, page: p } })
  fetch()
}

function clear () {
  keyword.value = ''
  router.push({ query: { ...router.currentRoute.value.query, q: undefined, page: 1 } })
  page.value = 1
  fetch()
}

watchDebounced(keyword, v => {
  router.push({ query: { ...router.currentRoute.value.query, q: v || undefined, page: 1 } })
  page.value = 1
  fetch()
}, { debounce: 400 })

/* ---------------- 计算属性 ------------------ */
const totalPage = computed(() =>
    Math.max(1, Math.ceil(total.value / pageSize.value))
)
</script>

<style scoped>
.pager { @apply px-3 py-1 border; }
</style>
