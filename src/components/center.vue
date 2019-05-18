<template>
  <div >
    <div id="center_head">
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
    </div>
    <div id="center_left">
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div id="center_right">
      <router-view></router-view>
    </div>

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
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
  #center_head .el-menu li{
    float:right;
  }
  #center_head{
    position: fixed;
    top: 0px;
    height: 60px;
    width: 100%;
  }
  #center_left{
    /*border: solid red 1px;*/
    border-top: solid #2888e2 1px;
    position: fixed;
    top: 60px;
    width: 200px;
    bottom: 0px;
    overflow: auto;
  }
  #center_left .el-col-12{
    width: 100%;
    height: 100%;
    background-color: rgb(84, 92, 100);
  }
  #center_left .tac{
    height: 100%;
  }
  #center_right{
    /*border: solid black 1px;*/
    position: fixed;
    top: 60px;
    left: 200px;
    right: 0px;
    bottom: 0px;
    /*height: 1000px;*/
    overflow: auto;
    padding: 10px;
    padding-top: 50px;
  }


</style>
