// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import VueReource from 'vue-resource'
import  test from './js/test.js'
import Qs from 'qs'
import axios from 'axios'
Vue.prototype.$http = axios

Vue.use(ElementUi)
//Vue.use(VueReource)

Vue.config.productionTip = false//阻止启动生产消息,常用作指令


axios.defaults.baseURL = 'http://192.168.100.194:8090/vue/';
 //axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


//Vue.http.options.root = 'http://192.168.99.54:8090/vue/';
//Vue.http.options.emulateJSON=true;//post
//Vue.http.options.xhr = { credentials: true }
//Vue.http.options.xhrFields = { withCredentials: true }
//Vue.http.options.crossOrigin = true
//Vue.http.options.crossDomain = true
//添加请求拦截器
axios.interceptors.request.use(function(config){
  config.withCredentials=true;
  config.transformRequest=function (data,header) {
   return Qs.stringify(data);

  }
  //在发送请求之前做某事
  return config;
},function(error){
  //请求错误时做些事
  return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function(response){
  //对响应数据做些事
  return response;
},function(error){
  console.log(JSON.stringify(error));
  let res=error.response.data;
  console.log(JSON.stringify(res));
  if(res.code==401){
    console.log('res...'+JSON.stringify(res))
    router.push("/");
  }
  //请求错误时做些事
  return Promise.reject(error);
});

//全局请求拦截器,放在实例前面
// Vue.http.interceptors.push((request, next) => {
//
//  request.credentials = true;//设置返回带cookie
//   // continue to next interceptor
//   next((response) => {
//     let res=response.body;
//     if(res.code==401){
//       console.log('res...'+JSON.stringify(res))
//       router.push("/")
//       return ;
//     }
//     return response;
//
//   });
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})




