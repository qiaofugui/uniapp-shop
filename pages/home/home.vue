<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<!-- 循环轮播图的 item -->
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<view class="swiper-item">
					<!-- 动态绑定图片 src 属性 -->
					<image :src="item.image_src"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 轮播图数据列表
			swiperList: []
		};
	},
	// 生命周期 页面刚加载
	onLoad() {
		this.getSwiperList();
	},
	// 方法
	methods: {
		// 获取轮播图数据方法
		async getSwiperList() {
			// 发起请求
			const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
			// 请求失败
			if (res.meta.status !== 200) {
				return uni.showToast({
					title: '请求失败',
					duration: 1500,
					icon: 'noen'
				});
			}
			// 请求成功，为 data 中的数据赋值
			this.swiperList = res.message;
		}
	}
};
</script>

<style lang="scss">
swiper {
	height: 350rpx;

	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}
}
</style>
