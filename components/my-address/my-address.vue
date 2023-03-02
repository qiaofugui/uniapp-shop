<template>
	<view>
		<!-- 选择收货地址的盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
		</view>

		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：
						<text>{{ address.userName }}</text>
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：
						<text>{{ address.telNumber }}</text>
					</view>
					<uni-icons type="right" size="18"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{ addstr }}</view>
			</view>
		</view>

		<!-- 底部的边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
// 按需导入 mapState 和 mapMutations mapGetters 辅助函数
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
	name: 'my-address',
	data() {
		return {}
	},
	methods: {
		// 把 m_user 模块中的 updateAddress 函数映射到当前组件
		...mapMutations('m_user', ['updateAddress']),

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

			// 3. 用户没有授权
			if (res.errMsg === 'chooseAddress:cancel') {
				uni.$showMsg('您没有选择地址')
			}
		}
	},
	computed: {
		// 把 m_user 模块中的 address 对象映射当前组件中使用，代替 data 中 address 对象
		...mapState('m_user', ['address']),
		// 将 m_user 模块中的 addstr 映射到当前组件中使用
		...mapGetters('m_user', ['addstr'])
	}
}
</script>

<style lang="scss">
// 底部边框线的样式
.address-border {
	display: block;
	width: 100%;
	height: 5px;
}

// 选择收货地址的盒子
.address-choose-box {
	height: 90px;
	display: flex;
	align-items: center;
	justify-content: center;
}

// 渲染收货信息的盒子
.address-info-box {
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;

	// 第一行
	.row1 {
		display: flex;
		justify-content: space-between;

		.row1-right {
			display: flex;
			align-items: center;

			.phone {
				margin-right: 5px;
			}
		}
	}

	// 第二行
	.row2 {
		display: flex;
		align-items: center;
		margin-top: 10px;

		.row2-left {
			white-space: nowrap;
		}
	}
}
</style>
