<template>
  <div>
    <h1 class="text-xl font-semibold mb-4">Articles</h1>

    <!-- 搜索 -->
    <div class="mb-6 flex">
      <input
          v-model="keyword"
          placeholder="Search title..."
          class="border p-2 flex-1 rounded-l"
      />
      <button v-if="keyword" class="border-l px-3" @click="clear">✕</button>
    </div>

    <!-- 列表 -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SkeletonPost v-if="pending" v-for="i in 6" :key="i" />
      <template v-else-if="list.length">
        <PostCard v-for="p in list" :key="p.id" :post="p" />
      </template>
      <p v-else class="text-gray-500 italic">No result for “{{ keyword }}”</p>
    </div>

    <!-- 分页 -->
    <div v-if="totalPage > 1" class="flex justify-center my-6">
      <button class="pager" :disabled="page===1" @click="go(page-1)">‹</button>
      <button
          v-for="i in totalPage"
          :key="i"
          class="pager"
          :class="i===page && 'bg-green-600 text-white'"
          @click="go(i)"
      >{{ i }}</button>
      <button class="pager" :disabled="page===totalPage" @click="go(page+1)">›</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onBeforeMount, ref, computed } from 'vue'
import PostCard from '~/components/PostCard.vue'
import SkeletonPost from '~/components/SkeletonPost.vue'
import { usePosts } from '~/composables/usePosts'

/* ---------- 响应式状态先声明 ---------- */
const page     = ref(1)
const keyword  = ref('')

/* ---------- 真正运行时才取 route/query ---------- */
onBeforeMount(() => {
  const route = useRoute()                 // ← 运行时才执行
  page.value    = Number(route.query.page || 1)
  keyword.value = String(route.query.q || '')
  fetch()                                   // 首屏拉数据
})

/* ---------- 数据 ---------------------------------- */
const list     = ref<any[]>([])
const total    = ref(0)
const pageSize = ref(6)
const pending  = ref(false)

const { fetchList } = usePosts()

async function fetch () {
  pending.value = true
  const res = await fetchList(page.value, keyword.value)
  list.value     = res.data
  total.value    = res.total
  pageSize.value = res.pageSize
  pending.value  = false
}

/* ---------- UI 交互 -------------------------------- */
const router    = useRouter()

function go(p:number){
  page.value = p
  router.push({ query: { ...router.currentRoute.value.query, page:p } })
  fetch()
}

function clear(){
  keyword.value = ''
  router.push({ query: { ...router.currentRoute.value.query, q:undefined, page:1 } })
  page.value = 1
  fetch()
}

/* 搜索框输入防抖 */
watchDebounced(keyword, (v)=>{
  router.push({ query:{ ...router.currentRoute.value.query, page:1, q:v||undefined } })
  page.value = 1
  fetch()
}, { debounce:400 })

/* ---------- 计算值 & SEO --------------------------- */
const totalPage = computed(()=> Math.max(1, Math.ceil(total.value / pageSize.value)))

definePageMeta({
  title: () => keyword.value ? `Search ${keyword.value}` : 'Articles'
})
</script>

<style scoped>
.pager{ @apply px-3 py-1 border; }
</style>
