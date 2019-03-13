// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueReource from 'vue-resource'
import  test from './js/test.js'


Vue.use(ElementUi)
Vue.use(VueReource)

Vue.config.productionTip = false//阻止启动生产消息，常用作指令
Vue.http.options.root = 'http://192.168.99.54:8090/vue/';
Vue.http.options.emulateJSON=true;//post


//Vue.http.options.xhr = { credentials: true }
//Vue.http.options.xhrFields = { withCredentials: true }
//Vue.http.options.crossOrigin = true
//Vue.http.options.crossDomain = true


//全局请求拦截器,放在实例前面
Vue.http.interceptors.push((request, next) => {

 request.credentials = true;//设置返回带cookie
  // continue to next interceptor
  next((response) => {
    let res=response.body;
    if(res.code==401){
      console.log('res...'+JSON.stringify(res))
      router.push("/")
      return ;
    }
    return response;

  });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})




