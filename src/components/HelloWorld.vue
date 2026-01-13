<template>
  <div class="hello">
    <h1 v-bind:style="'color: '+customColor">{{ msg }}</h1>
    <BeautifiedButton type="primary"  v-on:click="showMsg">显示变量值</BeautifiedButton>
    <div class="center-container">
      <BeautifiedInput type="success" v-model="inputValue"  />
      <BeautifiedButton type="warning" @click="showMsgByParam(inputValue)" >显示输入的值</BeautifiedButton>
    </div>

    <h2 v-if="isShow">{{ inputValue }}</h2>
    <h2 v-bind:class="{'myclass': true}" >{{ inputValue }}</h2>
    <h2 v-bind:class="{'myclass': isShow}" >{{ inputValue }}</h2>
    <h2 :class="{ 'myclass': true }">{{ inputValue }}</h2>
    <h2 :class="{ 'myclass': isShow }">{{ inputValue }}</h2>
    <ListModern :items="technologies" @item-toggle="alert" />
  </div>
</template>

<script>
import BeautifiedButton from '@component/input/BeautifiedButton.vue'
import BeautifiedInput from '@component/input/BeautifiedInput.vue'
import ListModern from '@component/list/ListModern.vue'

export default {
  name: 'HelloWorld',
  components: {ListModern, BeautifiedInput, BeautifiedButton},
  data () {
    return {
      msg: '欢迎使用Vue2开发应用',
      inputValue: '宏权实验室 http://106.52.84.138/',
      isShow: false,
      customColor: '#10b981',
      technologies: [
        {
          id: 1,
          title: 'C++',
          description: 'C++ Language',
          completed: true
        }, {
          id: 2,
          title: 'C',
          description: 'C Language',
          completed: true
        }, {
          id: 3,
          title: 'C#',
          description: 'C# Language',
          completed: true
        }, {
          id: 4,
          title: 'ASM',
          description: 'ASM Language',
          completed: true
        }
      ]
    }
  },
  methods: {
    showMsg: function () {
      this.toggleClass()
      alert(this.msg)
    },
    showMsgByParam: function (message) {
      alert(message)
    },
    toggleClass: function () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  color: #42b983;
  font-size: 24px;
}
a {
  color: #42b983;
}

.v-button--medium {
  min-width: 150px !important;
}

.beautified-input {
  margin-bottom: 0 !important;
  margin-right: 20px !important;
}

.myclass{
  color: #42b983;
}

.center-container {
  display: flex;
  width: 400px;
  align-items: center;
  margin: 20px auto;
}
</style>
