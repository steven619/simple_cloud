<template name="basics" >
	<view>
		<scroll-view scroll-y class="page">
			<view class="nav-list">
				<navigator hover-class="none" :url="'/pages/dashboard/' + item.name" class="nav-li"  navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index" >
<!--          @="openPage"-->
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
<!--        <view hover-class="none" class="nav-li"  navigateTo :class="'bg-'+item.color" :data-name="item.name"-->
<!--              :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index" @tap="openPage">-->
<!--          <view class="nav-title">{{item.title}}</view>-->
<!--          <view class="nav-name">{{item.name}}</view>-->
<!--          <text :class="'cuIcon-' + item.cuIcon"></text>-->
<!--        </view>
                                不加  navigator
-->
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
            name: 'mingxi',
            color: 'olive',
            cuIcon: 'copy'
          },
          {
            title: '在线论坛',
            name: 'chat',
            color: 'green',
            cuIcon: 'messagefill'
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
    methods:{
      onShow() {
        console.log("success")
      },
      openPage(e){
        console.log(e,9999)
        // var newsid = e.currentTarget.dataset.newsid;
        uni.navigateTo({
          url: '/pages/dashboard/'+e.target.dataset.name
        });
      }
    }


  }

</script>

<style>
	.page {
		height: 100vh;
	}
</style>
