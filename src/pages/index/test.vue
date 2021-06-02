<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
    <button @click="jump">跳转2</button>
		<view>
			测试页面
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
    onLaunch() {
      wx.enableAlertBeforeUnload({
        message: "返回上页时弹出对话框1212",
        success: function (res) {
          console.log("方法注册成功：", res);
        },
        fail: function (errMsg) {
          console.log("方法注册失败：", errMsg);
        },
      });
    },
		methods: {
      jump() {
        console.log(123);
        uni.navigateTo({
          url: "/pages/index/test2",
        });
      },
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
