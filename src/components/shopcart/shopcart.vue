<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo">
						<span class="icon-shopping_cart"></span>
					</div>
					<div class="num">{{totalCount}}</div>
				</div>
				<div class="prize">￥{{totalPrice}}</div>

				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay">
					￥{{minPrice}}元起送
				</div>
			</div>
		</div>
	</div>
</template>>
<script>
	export default{
		props:{
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			},
			selectFoods:{
				type:Array,
				default(){
					/*
					{
						price:0,
						count:0
					}
					*/
					return []
				}
			}
		},
		computed:{
			totalPrice(){
				let total=0;
				this.selectFoods.forEach((food)=>{
					total += food.price * food.count;
				});
				return total;
			},
			totalCount(){
				let count = 0;
				this.selectFoods.forEach((food)=>{
					count+=food.count;
				});
				return count;
			}
		}

	}

</script>

<style lang="scss" scoped>
	
	.shopcart{
		position:fixed;
		left:0;
		bottom:0;
		z-index:50;
		width:100%;
		height:48px;
	}

	.content{
		display:flex;
		height:100%;
		background:#141d27;
	}

	.content-left{
		flex:1;
		font-size:0;

		.logo-wrapper{
			display:inline-block;
			box-sizing:border-box;
			position:relative;
			top:-10px;
			margin:0 12px;
			padding:6px;
			width:56px;
			height:56px;
			border-radius:50%;
			vertical-align:top;
			background:#141d27;

			.logo{
				width:100%;
				height:100%;
				border-radius:50%;
				background:#2b343c;
				text-align:center;
				.icon-shopping_cart{
					line-height:44px;
					font-size:24px;
					color:#80858a;
				}
			}
		}

		.prize{
			display:inline-block;
			vertical-align:top;
			margin-top:12px;
			line-height:24px;
			padding-right:12px;
			border-right:1px solid rgba(255,255,255,0.1);
			font-size:16px;
			font-weight:bold;
			color:#80858a;
		}
		.desc{
			display:inline-block;
			vertical-align:top;
			margin-top:12px;
			margin-left:12px;
			line-height:24px;
			font-size:12px;
			color:#80858a;
		}
	}
	.content-right{
		flex:0 0 105px;
		width:105px;

		.pay{
			line-height:48px;
			height:48px;
			color:#80858a;
			font-size:12px;
			font-weight:bold;
			background:#2b343c;
			text-align:center;
		}
	}


</style>
