import App from './App'


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

// 导入网络请求的包
import {
	$http
} from '@escook/request-miniprogram'
// 把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 配置请求根路径
// $http.baseUrl = 'https://api-hmugo-web.itheima.net'
$http.baseUrl = 'https://www.uinav.com'
//请求拦截器 - 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	// do somethimg...
	// 展示 loading 效果
	uni.showLoading({
		title: '加载中...',
	})
	// 自定义 header 请求头：
	if (options.url.indexOf('/home/catitems') !== -1) {
		options.header = {
			// 'X-Test': 'AAA',
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
	...App
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
