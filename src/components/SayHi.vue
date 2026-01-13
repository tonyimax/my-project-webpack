<script>
export default {
  name: 'SayHi',
  data () {
    return {
      message: 'Hello Vue2,这个是来自变量的消息!'
    }
  }
}
</script>

<template>
  <div class="hello" >
    {{message}}
  </div>
</template>

<style scoped>
.hello {
  color: red;
  font-size: 32px;
}
</style>
