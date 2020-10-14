<template>
  <div class="my-select">
    <input type="text" v-model="val" />
    <ul>
      <li v-for="o in cpList" :key="o.id" @click="handleClick(o)">
        {{ o.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MySelect',
  data () {
    return {
      val: '',
      list: []
    }
  },
  computed: {
    cpList () {
      if (this.val.trim()) {
        return this.list.filter(o => o.name.includes(this.val.trim()))
      }
      return this.list
    }
  },
  created () {
    const str = 'abcdefghijklmnopqrstuvwxyz'
    setTimeout(() => {
      this.list = Array.from({ length: 10 }, (o, i) => ({
        id: i + 1,
        name: Array.from(
          { length: 4 },
          () => str[~~(Math.random() * str.length)]
        ).join(''),
        value: ~~(Math.random() * 10 ** 4)
      }))
      console.log(this.list)
    }, 0)
  },
  methods: {
    handleClick (o) {
      console.log(o)
    }
  }
}
</script>
