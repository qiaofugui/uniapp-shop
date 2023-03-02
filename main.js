import App from './App'



// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

// 导入 store 的实例对象
import store from '@/store/store.js'

// 导入网络请求的包
import {
	$http
} from '@escook/request-miniprogram'
// 把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 配置请求根路径
// $http.baseUrl = 'https://api-hmugo-web.itheima.net'
// $http.baseUrl = 'https://api-ugo-web.itheima.net'
$http.baseUrl = 'https://www.uinav.com'
//请求拦截器 - 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	// do somethimg...
	// 展示 loading 效果
	uni.showLoading({
		title: '加载中...',
	})
	// 判断请求的是否为有权限的 API 接口
	if (options.url.indexOf('/my/') !== -1) {
		// 为请求头添加身份认证字段
		options.header = {
			// 字段的值可以直接从 vuex 中进行获取
			Authorization: 'Beare eyJhbGci0iJIUzcQiaofugui',
		}
	}
}
//响应拦截器 - 请求完成之后做一些事情
$http.afterRequest = function() {
	// do something...
	// 隐藏 loading 效果：
	uni.hideLoading()
}

// 封装消息提示 uni.showToast() 方法，挂载到 uni 顶级对象之上
uni.$showMsg = function(title = '数据加载失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

try {
	function isPromise(obj) {
		return (
			!!obj &&
			(typeof obj === "object" || typeof obj === "function") &&
			typeof obj.then === "function"
		);
	}

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) {}


const app = new Vue({
	...App,
	// 将 store 挂载到 Vue 实例上
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
