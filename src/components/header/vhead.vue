<template>
  <div class="vhead">
    <div class="content-wrapper">
    	<div class="avatar">
    		<img :src="seller.avatar" alt="" width="64" height="64"/>
    	</div>

    	<div class="content">
    		<div class="title">
    			<div class="brand"></div>
    			<div class="name">{{seller.name}}</div>
    		</div>
    		<div class="description">
    			{{seller.description}}/{{seller.deliveryTime}}分钟必达
    		</div>
			<!-- 这里判断一下是因为，获取数据是异步的，但是复制在页面初始化就进行了，在没获得数据时，可以尝试seller.supports是undefined，不会报错，但是undefined不是数据，取第一个值就会报错 -->
    		<div v-if="seller.supports" class="support">
    			<span class="icon" :class="classMap[seller.supports[0].type]"></span>
    			<span class="text">{{seller.supports[0].description}}</span>
    		</div>

    	</div>

    	<div class="support-count" v-if="seller.supports" @click="detailShowFn">
    		<span class="count">{{seller.supports.length}}个</span>
    		<i class="icon-keyboard_arrow_right"></i>
    	</div>
    </div>
    <div class="bulletin-wrapper" @click="detailShowFn">
		<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
		<i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background"><img :src="seller.avatar" alt="" width="100%" height="100%"></div>
	<div class="detail" v-show="detailShow" transition="fade">
		<div class="detail-wrapper clearfix">
			<div class="detail-main">
				<h1 class=name>{{seller.name}}</h1>
				<div class="star-wrapper"><star :size="48" :score="seller.score"></star></div>
				<div class="title">
					<div class="line"></div>
					<div class="text">优惠信息</div>
					<div class="line"></div>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item" v-for="item in seller.supports">
						<span class="icon" :class="classMap[item.type]"></span>
						<span class="text">{{item.description}}</span>
					</li>
				</ul>

				<div class="title">
					<div class="line"></div>
					<div class="text">商家公告</div>
					<div class="line"></div>
				</div>
				<div class="bulletin">
					<p class="content">{{seller.bulletin}}</p>
				</div>
			</div>
		</div>
		<div class="detail-close"><i class="icon-close" @click="detailCloseFn"></i></div>
	</div>
  </div>
</template>

<script>
import star from '../star/star';


export default {
	data(){
		return {
			detailShow:false,
		}
	},
	props:{
	    seller:{
	    	type:Object
	    }
	},
	methods:{
		detailShowFn:function(){
			this.detailShow = true;
		},
		detailCloseFn:function(){
			this.detailShow = false;
		}
	},
	components:{
		star
	},
	created(){
		this.classMap=['decrease','discount','guarantee','invoice','specail']
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import '../../common/css/mixin.scss';

	.vhead{
		position:relative;
		color:#fff;
		background:rgba(7,17,27,0.5);
		overflow:hidden;
		
	}

	.content-wrapper{
		padding:24px 12px 28px 24px;
		font-size:0px;
		position:relative;
	}

	.bulletin-wrapper{
		height:28px;
		line-height:28px;
		padding:0 22px 0 12px;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
		position:relative;
		background:rgba(7,17,27,0.2);

		.bulletin-title{
			display:inline-block;
			vertical-align:top;
			width:22px;
			height:12px;
			margin-top:8px;
			@include bg-img(bulletin);
			background-size:22px 12px;
			background-repeat:no-repeat;
		}
		.bulletin-text{
			margin:0 4px;
			vertical-align:top;
			font-size:10px;
		}
		.icon-keyboard_arrow_right{
			position:absolute;
			font-size:10px;
			right:12px;
			top:9px;
		}
	}

	.avatar{
		display:inline-block;
		vertical-align:top;

		img{
			border-radius:2px;
		}
	}

	.content{
		display:inline-block;
		margin-left:16px;
		font-size:14px;

		.title{
			margin:2px 0 8px 0;

			.brand{
				vertical-align:top;
				display:inline-block;
				width:30px;
				height:18px;
				@include bg-img(brand);
				background-size:30px 18px;
				background-repeat:no-repeat;
			}

			.name{
				display:inline-block;
				margin-left:6px;
				font-size:16px;
				line-height:18px;
				font-weight:bold;
			}
		}

		.description{
			margin-bottom:10px;
			font-size:12px;
			line-height:1;
		}
		
		.support{
			.icon{
				display:inline-block;
				width:12px;
				height:12px;
				margin-right:4px;
				vertical-align:middle;
				background-size:12px 12px;
				background-repeat:no-repeat;

				&.decrease{
					@include bg-img(decrease_1);
				}
				&.discount{
					@include bg-img(discount_1);
				}
				&.guarantee{
					@include bg-img(guarantee_1);
				}
				&.invoice{
					@include bg-img(invoice_1);
				}
				&.specail{
					@include bg-img(special_1);
				}
			}

			.text{
				line-height:12px;
				font-size:10px;
			}
		}
	}
	
	.support-count{
		position:absolute;
		right:12px;
		bottom:14px;
		padding:0 8px;
		height:24px;
		line-height:24px;
		border-radius:14px;
		background:rgba(0,0,0,0.2);
		text-align:center;

		.count{
			font-size:10px;

		}

		.icon-keyboard_arrow_right{
			line-height:24px;
			margin-left:2px;
			font-size:10px;
		}
	}

	.background{
		position:absolute;
		top:-90%;
		left:0;
		width:100%;
		z-index:-1;
		filter:blur(10px);
	}

	.detail{
		position:fixed;
		z-index:100;
		left:0;
		top:0;
		width:100%;
		height:100%;
		overflow:auto;
		//只有在iphone上有效的模糊效果
		backdrop:blur(10px);
		//过度效果
		transition:all 0.5s;
		//最终态的样子
		&.fade-transition{
			opacity:1;
			background:rgba(7,17,27,0.8);
		}
		//出现和结束状态的样子
		&.fade-enter,&.fade-leave{
			opacity:0;
			background:rgba(7,17,27,0);
		}

		.detail-wrapper{
			min-height:100%;
		}
		.detail-main{
			padding-top:64px;
			padding-bottom:64px;

			.name{
				line-height:16px;
				text-align:center;
				font-size:16px;
				font-weight:700;

			}
			.star-wrapper{
				margin-top:18px;
				padding:2px 0;
				text-align:center;
			}
			.title{
				display:flex;
				width:80%;
				margin:28px auto 24px;
				
				.line{
					flex:1;
					position:relative;
					top:-6px;
					border-bottom:1px solid rgba(255,255,255,0.2);
				}

				.text{
					padding:0 12px;
					font-size:14px;
					font-weight:bold;
				}
			}
			.supports{
				width:80%;
				margin:0 auto;

				.support-item{
					padding:0 12px;
					margin-bottom:12px;
					font-size:0;
					&:last-child{
						margin-bottom:0;
					}
				}

				.icon{
					display:inline-block;
					width:16px;
					height:16px;
					margin-right:6px;
					vertical-align:top;
					background-size:16px 16px;
					background-repeat:no-repeat;

					&.decrease{
						@include bg-img(decrease_2);
					}
					&.discount{
						@include bg-img(discount_2);
					}
					&.guarantee{
						@include bg-img(guarantee_2);
					}
					&.invoice{
						@include bg-img(invoice_2);
					}
					&.specail{
						@include bg-img(special_2);
					}
				}

				.text{
					line-height:16px;
					font-size:12px;
				}
			}
			.bulletin{
				width:80%;
				margin:0 auto;

				.content{
					padding:0 12px;
					line-height:24px;
					font-size:12px;
				}
			}

		}
		.detail-close{
			position:relative;
			width:32px;
			height:32px;
			margin:-64px auto 0;
			clear:both;
			font-size:32px;
		}
	}
</style>