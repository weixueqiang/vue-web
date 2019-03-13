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

Vue.config.productionTip = false
Vue.http.options.root = 'http://192.168.99.54:8090/vue/';
Vue.http.options.xhr = { credentials: true }
Vue.http.options.xhrFields = { withCredentials: true }
Vue.http.options.crossOrigin = true
Vue.http.options.crossDomain = true
Vue.http.options.emulateJSON=true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


Vue.http.interceptors.push((request, next) => {
  console.log(1);//此处this为请求所在页面的Vue实例
  // modify request
 // request.method = 'POST';//在请求之前可以进行一些预处理和配置

  // continue to next interceptor
  request.credentials = true;
  next((response) => {

    console.log("res--->>>"+JSON.stringify(response));
    let res=response.body;

    if(res.code==401){
      console.log('res...'+JSON.stringify(res))
      router.push("/")
      return ;
    }
    return response;

  });
});

