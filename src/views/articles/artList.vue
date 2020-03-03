<template>
  <page-view>
    <a-card :bordered="false">
      <TableList />
    </a-card>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import TableList from '@/views/list/TableList'
export default {
  name: 'CreateArt',
  components: {
    PageView,
    TableList
  },
  data () {
    return {

    }
  },
  methods: {

  }

}
</script>

<style lang="less" scoped>

</style>
