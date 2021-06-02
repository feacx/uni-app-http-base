<template>
	<view class="content">
		<view>
			测试222222
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
    onLoad() {
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
	}
</script>

<style>
	.content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 60rpx 0;
    box-sizing: border-box;
    overflow-x:hidden;
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
