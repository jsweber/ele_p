import Vue from 'vue'
import VueRouter from "vue-router"
import VueResource from "vue-resource"
import App from './App'
import goods from "./components/goods/goods"
import ratings from "./components/ratings/ratings"
import seller from "./components/seller/seller"

import "./common/css/index.scss"

//全局注册插件
Vue.use(VueRouter);
Vue.use(VueResource);

let app = Vue.extend(App);

let router = new VueRouter({
	//配置路由点击时按钮加的class，默认是v-link-active
	linkActiveClass:"active"
});

router.map({
	'/goods':{
		component:goods
	},
	'/ratings':{
		component:ratings
	},
	'/seller':{
		component:seller
	}
});

router.start(app,'#app');

router.go("/goods");