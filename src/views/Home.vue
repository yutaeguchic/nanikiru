<template>
  <div class="content-home">

    <breadcrumb/>

    <h2 class="m-ttl--page">NANIKIRU 新着</h2>

    <div v-if="$_maxPage" class="pagination">
      <div class="pagination__label">{{$_currentPage}}/{{$_maxPage}} page</div>
      <pagination
        :currentPage="$_currentPage"
        :maxPage="$_maxPage"
      />
    </div>

    <div class="query">
      <transition-group name="fadeInArchve">
        <template v-for="i of $_postsPerPage">
          <template v-if="$_postKeys[$_start + (i-1)]">
            <Cassette
              :key="$_postKeys[$_start + (i-1)]"
              :post="posts[$_postKeys[$_start + (i-1)]]"
              :postId="$_postKeys[$_start + (i-1)]"
              :users="users"
              :uid="uid"
              :answers="answers"
            />
          </template>
        </template>
      </transition-group>
    </div>

    <div class="pagination">
      <pagination
        :currentPage="$_currentPage"
        :maxPage="$_maxPage"
      />
    </div>

  </div>
</template>

<script>
import Query from '@/components/mixin/HomeQuery.js'
import Cassette from '@/components/cassette/Archive.vue'
import Pagination from '@/components/Pagination.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

export default {
  name: 'Home',
  components: {
    Cassette,
    Pagination,
    Breadcrumb
  },
  props: [
    'users',
    'uid',
    'posts',
    'answers'
  ],
  mixins: [Query]
}
</script>