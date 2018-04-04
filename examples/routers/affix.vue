<style>
  .demo-affix {
    width: 300px;
    height: 30px;
    background-color: #1890ff;
    color: #fff;
    border-radius: 5px;
  }
</style>

<template>
  <div>
    <Affix>
      <div class="demo-affix">固定在最顶部</div>
    </Affix>
    <div v-for="(item,index) in arr" :key="index">{{item}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        arr: []
      }
    },
    created(){
      for(let i = 0 ; i < 100 ; i++){
        this.arr.push(i);
      }
    }
  }
</script>
