<template>
  <article v-if="post">
    <h1 class="text-2xl font-bold mb-3">{{ post.title }}</h1>
    <p class="text-sm text-gray-500 mb-8">
      {{ post.author }} · {{ post.createdAt }}
    </p>

    <div class="prose dark:prose-invert mb-12" v-html="html"></div>

    <h2 class="text-lg font-semibold mb-3">Related</h2>
    <ul class="list-disc pl-6">
      <li v-for="r in related" :key="r.id">
        <NuxtLink :to="`/posts/${r.id}`">{{ r.title }}</NuxtLink>
      </li>
    </ul>
  </article>

  <SkeletonPost v-else />
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { onBeforeMount, ref, computed } from 'vue'
import SkeletonPost from '~/components/SkeletonPost.vue'
import { usePosts } from '~/composables/usePosts'

/* --------- ❶ 先声明响应式引用 --------- */
const id      = ref<number>()
const post    = ref<any>()
const related = ref<any[]>([])

/* --------- ❷ 真正在运行时（onBeforeMount）才去调用 useRoute 和拉数据 --------- */
onBeforeMount(async () => {
  const route = useRoute()                               // ← 运行时才执行
  id.value     = Number(route.params.id)

  const { fetchDetail } = usePosts()
  const data            = await fetchDetail(id.value)

  post.value    = data.post
  related.value = data.related
})

/* --------- ❸ 派生 html --------- */
const html = computed(() =>
    post.value ? marked.parse(post.value.content) : ''
)

/* --------- ❹ SEO：写成返回函数，避免编译期求值 --------- */
definePageMeta({
  title       : () => post.value?.title || 'Article',
  description : () => post.value?.excerpt,
})
</script>
