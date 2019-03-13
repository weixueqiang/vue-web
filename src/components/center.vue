<template>
  <div >

    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <el-submenu index="7">
        <template slot="title">{{msg}}</template>
        <el-menu-item index="2-1"><span @click.stop="logout" >退出</span></el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>

      <el-menu-item index="6" keyPath="7"><router-link tag="div" to="/center/pageUser"  >分页用户</router-link></el-menu-item>
      <el-menu-item index="5"><router-link tag="div" to="/center/form" >表单测试</router-link></el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank" >订单管理</a></el-menu-item>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="2"><router-link tag="div" to="/center/user"  >用户中心</router-link></el-menu-item>
      <el-menu-item index="1"  ><router-link tag="div" to="/center/hello" >处理中心</router-link></el-menu-item>
    </el-menu>
    <router-view></router-view>

  </div>
</template>

<script>
  //  import test from './js/test.js'

  export default {
    data() {
      return {
        activeIndex: '1',
        msg:'我的信息'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        if(key.startsWith('2-')){
            return ;
        }
        let item = sessionStorage.getItem('activeIndex');
        if(item && item==key){
          alert(key);
          window.location.reload();
        }else{
          sessionStorage.setItem('activeIndex',key);
        }
      },
      logout(){
        this.$http.get('user/logout').then(res=>{
          alert('aa2');
          this.$router.push('/');
        });

      }
    },
    created(){

      let item =sessionStorage.getItem('activeIndex');
      if(!item){
        sessionStorage.setItem('activeIndex',this.activeIndex);
      }else {
        this.activeIndex=item;

      }
    }
  }
</script>

<style scoped>
  #hand .router-link-active{
    height: 60px;
  }
  .el-menu-item{
    padding: 0px;
    width: 80px;
    text-align: center;
  }
  .el-menu li{
    float:right;
  }

</style>
