<template>
	<div class="food" v-show="showFlag" transition="move" v-el:food>
		<div class="food-content">
			<div class="image-header">
				<img :src="food.image">
				<div class="back" @click="hide">
					<i class="icon-arrow_lift"></i>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月售{{food.sellCount}}</span>
					<span class="rating">好评率{{food.rating}}</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
				</div>
				<div class="cartcontrol-wrapper">
					<cartcontrol :food="food"></cartcontrol>
				</div>
				<div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst" transition="fade">加入购物车</div>
			</div>
			<split v-show="food.info"></split>
			<div class="info" v-show="food.info">
				<div class="title">商品介绍</div>
				<div class="text">{{food.info}}</div>
			</div>
			<split></split>
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
			</div>
		</div>

	</div>
</template>
<script>
import BScroll from "better-scroll";
import Vue from "vue";
import cartcontrol from "../cartcontrol/cartcontrol";
import split from "../split/split";
import ratingselect from "../ratingselect/ratingselect";

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

	export default{
		data(){
			return {
				showFlag:false,
				selectType:ALL,
				onlyContent:true,
				desc:{
					all:"全部",
					positive:"推荐",
					negative:"吐槽"
				}
			}
		},
		props:{
			food:{
				default:{},
				type:Object
			}
		},
		methods:{
			show(){
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll = new BScroll(this.$els.food,{
							click:true
						});
					}else{
						this.scroll.refresh();
					}

				});
			},
			hide(){
				this.showFlag = false;
			},
			addFirst(event){
				if(!event._constructed) return;
				this.$dispatch("cart.add",event.target);
				Vue.set(this.food,"count",1);
			}
		},
		components:{
			cartcontrol,
			split,
			ratingselect
		}

	}
</script>
<style scoped lang="scss">
	.food{
		position:fixed;
		top:0;
		left:0;
		bottom:48px;
		width:100%;
		z-index:30;
		background:#fff;

		&.move-transition{
			transition:all 0.4s;
			transform:translate3d(0,0,0);

		}

		&.move-enter,&.move-leave{
			transform:translate3d(100%,0,0);
		}

		.image-header{
			position:relative;
			width:100%;
			height:0;
			padding-bottom:100%;

			img{
				width:100%;
				height:100%;
				position:absolute;
				top:0;
				left:0;
			}

			.back{
				position:absolute;
				top:10px;
				left:0;

				.icon-arrow_lift{
					display:block;
					padding:10px;
					font-size:20px;
					color:#fff;
				}
			}
		}
		.content{
			padding:18px;
			position:relative;

			.title{
				line-height:14px;
				margin-bottom:8px;
				font-size:14px;
				font-weight:700;
				color:rgb(7,17,27);
			}

			.detail{
				margin-bottom:18px;
				line-height:10px;
				font-size:0;
				.sell-count,.rating{
					font-size:10px;
					color:rgb(147,153,159);
				}
				.sell-count{
					margin-right:12px;
				}
			}
			.price{

				font-weight:700;

				.now{
					margin-right:8px;
					font-size:14px;
					color:rgb(240,20,20);
				}
				.old{
					text-decoration:line-through;
					font-size:10px;
					color:rgb(147,153,159);
				}
			}

		}

		.cartcontrol-wrapper{
			position:absolute;
			right:12px;
			bottom:12px;

		}

		.buy{
			position:absolute;
			right:18px;
			bottom:18px;
			z-index:10;
			height:24px;
			line-height:24px;
			padding:0 12px;
			text-align:center;
			box-sizing:border-box;
			font-size:10px;
			border-radius:12px;
			color:#fff;
			background:rgb(0,160,220);

			&.fade-transition{
				transition:all 0.3s;
				opacity:1;
			}
			&.fade-enter,&.fade-leave{
				opacity:0;
			}
		}
		.info{
			padding:18px;

			.title{
				font-size:14px;
				line-height:14px;
				text-align:left;
			}

			.text{
				font-size:12px;
				line-height:24px;
				padding:6px 8px 0;
				color:rgb(77,85,93);
				font-weight:200;
				text-align:justify;
			}

		}
	}

	.rating{
		padding-top:18px;

		.title{
			font-size:14px;
			line-height:14px;
			text-align:left;
			margin-left:18px;
		}
	}


</style>