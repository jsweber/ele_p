<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
    	<ul>
    		<li v-for="item in goods" class="menu-item menu-item-hook" :class="{'current':currentIndex === $index}" @click="selectMenu($index,$event)">
    			<span class="text border-1px"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
    		</li>
    	</ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
    	<ul>
    		<li v-for="item in goods" class="food-list food-list-hook">
    			<h1 class="title">{{item.name}}</h1>
    			<ul>
    				<li v-for="food in item.foods" class="food-item">
    					<div class="icon">
    						<img :src="food.icon" width="57">
    					</div>
    					<div class="content">
    						<h2 class="name">{{food.name}}</h2>
    						<p class="desc">{{food.description}}</p>
    						<div class="extra">
    							<span class="count">月售{{food.sellCount}}</span>
    							<span>好评率{{food.rating}}%</span>
    						</div>
    						<div class="price">
    							<span class="new">￥{{food.price}}</span>
    							<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
    						</div>
    						<div class="cartcontrol-wrapper">
    							<cartcontrol :food="food"></cartcontrol>
    						</div>
    					</div>
    				</li>
    			</ul>
    		</li>

    	</ul>
    </div>
    <!-- v-ref 子组件定位 -->
    <shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import shopcart from "../shopcart/shopcart";
import cartcontrol from "../cartcontrol/cartcontrol";

const ERRO_OK = 0;

export default {
	data () {
		return {
			goods:[],
			heightArr:[],
			scrollY:0
		}
	},
	props:{
		seller:{
			type:Object
		}
	},
	components:{
		shopcart,
		cartcontrol
	},
	events:{
		'cart.add'(target){
			this._drop(target);
		}
	},
	computed:{
		currentIndex:function(){
			for(let i=0;i<this.heightArr.length;i++){
				let minY = this.heightArr[i];
				let maxY = this.heightArr[i+1];

				if(!maxY || (this.scrollY >= minY && this.scrollY < maxY)){
					return i;
				}

			}
			return this.scrollY;
		},
		selectFoods(){
			let foods = [];
			this.goods.forEach((good)=>{
				good.foods.forEach((food)=>{
					if(food.count){
						foods.push(food);
					}
				})
			});

			return foods;
		}
	},
	created(){
		this.classMap=['decrease','discount','guarantee','invoice','specail']
		this.$http.get('/api/goods').then((res)=>{
			res = res.body;
			if(res.code == ERRO_OK){
				this.goods = res.data;
				this.$nextTick(function(){
					this._initScroll();
					this.getSectionHeight();
				});
			}
		})
	},
	methods:{
		_drop(target){
			//异步执行小球丢出去的动画，不要和水平滚动的小球一起执行，优化
			this.$nextTick(()=>{
				this.$refs.shopcart.drop(target);
			});
		},
		selectMenu:function(index,event){
			//原生的事件对象是没有_constructed属性的，避免pc上点击触发两次
			if(!event._constructed){
				return;
			}

			let foodLists = this.$els.foodsWrapper.getElementsByClassName("food-list-hook");

			this.foodsScroll.scrollToElement(foodLists[index],300);

		},
		_initScroll(){
			var self = this;
			this.menuScroll = new BScroll(this.$els.menuWrapper,{
				click:true  //默认是不能点击的
			});
			this.foodsScroll = new BScroll(this.$els.foodsWrapper,{
				click:true,
				probeType:3  //加了这个参数就能返回坐标，详情看下面的代码返回的pos
			});

			this.foodsScroll.on("scroll",function(pos){
				self.scrollY = Math.abs(Math.round(pos.y));
			});

		},
		getSectionHeight(){
			let foodLists = this.$els.foodsWrapper.getElementsByClassName("food-list-hook");

			let height = 0;
			this.heightArr.push(height);
			for(let i=0;i<foodLists.length;i++){
				let foodList = foodLists[i];
				height+= foodList.clientHeight;
				this.heightArr.push(height);
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../common/css/mixin.scss';

.goods{
	display:flex;
	position:absolute;
	top:185px;
	bottom:46px;
	width:100%;
	overflow:hidden;
}
.menu-wrapper{
	flex:0 0 80px;
	width:80px;
	background:#f3f5f7;
}
.menu-item{
	display:table;
	position:relative;
	height:54px;
	width:56px;
	padding-left:12px;
	line-height:14px;

	&.current{
		margin-top:-1px;
		z-index:10;
		background:#fff;
		font-weight:700;
	}

	.icon{
		display:inline-block;
		width:12px;
		height:12px;
		margin-right:2px;
		vertical-align:top;
		background-size:100% 100%;
		background-repeat:no-repeat;
		&.decrease{
			@include bg-img(decrease_3);
		}
		&.discount{
			@include bg-img(discount_3);
		}
		&.guarantee{
			@include bg-img(guarantee_3);
		}
		&.invoice{
			@include bg-img(invoice_3);
		}
		&.specail{
			@include bg-img(special_3);
		}
	}

	.text{
		display:table-cell;
		width:56px;
		vertical-align:middle;
		font-size:12px;
	}
}

.foods-wrapper{
	flex:1;

	.title{
		padding-left:14px;
		height:26px;
		line-height:26px;
		border-left:2px solid #d9dde1;
		font-size:12px;
		color:rgb(147,153,159);
		background:#f3f5f7;
	}

	.food-item{
		display:flex;
		margin:18px;
		padding-bottom:18px;

		&:last-child{
			margin-bottom:0;
		}

		.icon{
			flex:0 0 57px;
			margin-right:10px;
			overflow:hidden;
		}
		.content{
			flex:1;
			position:relative;

			.name{
				margin:2px 0 8px 0;
				height:14px;
				line-height:14px;
				font-size:14px;
				color:rgb(7,17,27);
			}
			.desc{
				margin-bottom:8px;
				line-height:12px;
				font-size:10px;
				color:rgb(147,153,159);

			}
			.extra{
				margin-bottom:8px;
				line-height:10px;
				font-size:10px;
				color:rgb(147,153,159);

				.count{
					margin-right:12px;
				}
			}
			.prize{

				font-weight:700;

				.new{
					margin-left:8px;
					font-size:14px;
					color:rgb(240,20,20);
				}
				.old{
					text-decoration:line-through;
					font-size:10px;
					color:rgb(147,153,159);
				}
			}

			.cartcontrol-wrapper{
				position:absolute;
				right:0;
				bottom:12px;
			}
		}
	}

}



</style>