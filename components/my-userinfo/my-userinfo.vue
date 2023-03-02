<template>
	<view class="my-userinfo-container">
		<!-- 头像昵称区域 -->
		<view class="top-box">
			<image :src="userinfo.avatarUrl" class="avatar"></image>
			<view class="nickname">{{ userinfo.nickName }}</view>
		</view>

		<!-- 面板的列表区域 -->
		<view class="panel-list">
			<!-- 第一个面板 -->
			<view class="panel">
				<!-- panel 的主体区域 -->
				<view class="panel-body">
					<!-- panel 的 item 项 -->
					<view class="panel-item">
						<text>0</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>6</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>1</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>0</text>
						<text>足迹</text>
					</view>
				</view>
			</view>

			<!-- 第二个面板 -->
			<view class="panel">
				<!-- 面板的标题 -->
				<view class="panel-title">我的订单</view>
				<!-- 面板的主体 -->
				<view class="panel-body">
					<!-- 面板主体中的 item 项 -->
					<view class="panel-item">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>

			<!-- 第三个面板 -->
			<view class="panel">
				<view class="panel-list-item" @click="chooseAddress">
					<text>收货地址</text>
					<uni-icons type="right" size="18"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="right" size="18"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="right" size="18"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
// 按需导入辅助函数
import { mapState, mapMutations } from 'vuex'
export default {
	name: 'my-userinfo',
	computed: {
		// 将 m_user 模块中的 userinfo 映射到当前页面中使用
		...mapState('m_user', ['userinfo'])
	},
	data() {
		return {}
	},
	methods: {
		...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateAddress']),
		// 退出登录
		async logout() {
			// 询问用户是否退出登录
			const res = await uni
				.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				})
				.catch(err => err)

			if (res.confirm) {
				// 用户确认了退出登录的操作
				// 需要清空 vuex 中的 userinfo、token 和 address
				this.updateUserInfo({})
				this.updateToken('')
				this.updateAddress({})
				uni.$showMsg('已退出')
			}
		},
		// 选择收货地址
		async chooseAddress() {
			// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
			//    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
			const res = await uni.chooseAddress().catch(err => err)

			// 2. 用户成功的选择了收货地址
			if (res.errMsg === 'chooseAddress:ok') {
				// 调用 Store 中提供的 updateAddress 方法，将 address 保存到 Store 里面
				this.updateAddress(res)
			}
		}
	}
}
</script>

<style lang="scss">
.my-userinfo-container {
	height: 100%;
	// 为整个组件的结构添加浅灰色的背景
	background-color: #f4f4f4;

	.top-box {
		height: 400rpx;
		background-color: #c00000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.avatar {
			display: block;
			width: 90px;
			height: 90px;
			border-radius: 45px;
			border: 2px solid white;
			box-shadow: 0 1px 5px black;
		}

		.nickname {
			color: white;
			font-weight: bold;
			font-size: 16px;
			margin-top: 10px;
		}
	}
}

.panel-list {
	padding: 0 10px;
	position: relative;
	top: -10px;

	.panel {
		background-color: white;
		border-radius: 3px;
		margin-bottom: 8px;

		.panel-title {
			line-height: 45px;
			padding-left: 10px;
			font-size: 15px;
			border-bottom: 1px solid #f4f4f4;
		}
		.panel-body {
			display: flex;
			justify-content: space-around;

			.panel-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				font-size: 13px;
				padding: 10px 0;

				.icon {
					width: 35px;
					height: 35px;
				}
			}
		}
	}
}

.panel-list-item {
	height: 45px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 15px;
	padding: 0 10px;
}
</style>
