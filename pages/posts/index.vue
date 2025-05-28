<template>
  <div>
    <h1 class="text-xl font-semibold mb-4">Articles</h1>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <template v-if="pending">
        <SkeletonPost v-for="i in 6" :key="i" />
      </template>
      <template v-else>
        <PostCard v-for="p in list?.data" :key="p.id" :post="p" />
      </template>
    </div>

    <div class="flex justify-center my-6" v-if="totalPage > 1">
      <button
          class="px-3 py-1 border"
          :disabled="page === 1"
          @click="change(page - 1)"
      >
        ‹
      </button>
      <button
          v-for="i in totalPage"
          :key="i"
          class="px-3 py-1 border-t border-b"
          :class="i === page && 'bg-green-600 text-white'"
          @click="change(i)"
      >
        {{ i }}
      </button>
      <button
          class="px-3 py-1 border"
          :disabled="page === totalPage"
          @click="change(page + 1)"
      >
        ›
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostCard from '~/components/PostCard.vue'
import SkeletonPost from '~/components/SkeletonPost.vue'
import { usePosts } from '~/composables/usePosts'

const route = useRoute()
const router = useRouter()
const page = ref(Number(route.query.page || 1))
const { fetchList } = usePosts()

const { data: list, pending } = useAsyncData(
    () => fetchList(page.value),
    { watch: [page] }
)

const totalPage = computed(() =>
    list.value ? Math.ceil(list.value.total / list.value.pageSize) : 1
)

function change(p: number) {
  router.push({ query: { page: p } })
  page.value = p
}

definePageMeta({ title: 'Articles' })
</script>
