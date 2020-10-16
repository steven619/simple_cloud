<template >
	<view>
		<scroll-view scroll-y class="page">
			<view class="nav-list">
				<navigator hover-class="none" :url="'/pages/basics/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "Home",
		data() {
			return {
				elements: [{
						title: '入库明细',
						name: 'ruku',
          color: 'blue',
          cuIcon: 'formfill'
					},
					{
						title: '出库明细',
						name: 'chuku',
            color: 'mauve',
            cuIcon: 'formfill'
					},
					{
						title: '调拨明细',
						name: 'diaobo',
            color: 'olive',
            cuIcon: 'copy'
					},
          {
            title: '更多功能',
            name: 'gengduo',
            color: 'red',
            cuIcon: 'copy'
          }
				],
			};
		},
		onShow() {
			console.log("success")
		},
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
