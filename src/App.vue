<template>
  <div>
    <vhead :seller="seller"></vhead>
    <ul class="tab border-1px">
      <li class="tab-item"><a v-link="{path:'/goods'}">商品</a></li>
      <li class="tab-item"><a v-link="{path:'/ratings'}">评论</a></li>
      <li class="tab-item"><a v-link="{path:'/seller'}">商家</a></li>
    </ul>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import vhead from './components/header/vhead'

const ERR_OK = 0;

export default {
  data(){
    return {
        seller:{}
    }
  },
  created(){
    this.$http.get('/api/seller').then((res) => {
      res = res.body;
      if(ERR_OK === res.code){
          this.seller = res.data;
      }
    });

  },
  components: {
    vhead
  }
}
</script>

<style lang="scss">
  .tab{
    width:100%;
    height:40px;
    line-height: 40px;
    display: -webkit-flex;
    display: flex;
  }
  .tab-item{
    flex:1;
    text-align:center;
  }
  .border-1px::after{
    border-bottom:1px solid rgba(7,17,27,0.1);
  }
  .tab-item > a{
    display:block;
    height:100%;
    font-size:14px;
    color:rgb(77,85,93);

  }
  .tab-item > a.active{
    color:rgb(240,20,20);
  }
</style>
