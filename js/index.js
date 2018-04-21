
var app = new Vue ({
	el:"#app",
	data:{
		blog_list:[],
		bannerList:[],
		cate:[],
		uId:null,
	},
	mounted: function(){
		this.getData();
		this.picTrun();
	},
	methods:{

	//可选选项，自动滑动

		picTrun:function(){
			var mySwiper = new Swiper('.swiper-container', {
		     	// autoplay: true,
		     	autoplay: {
				    delay: 3000,
				    stopOnLastSlide: false,
				    disableOnInteraction: true,
			    },
		        pagination: {
			   		el: '.swiper-pagination',
			    },
			})
		},
		getData: function(){
			this.uId = window.localStorage.getItem("uid");
			var that = this;
			$.ajax({
				url:"http://egblog.com/api/index/index",
				type:"get",
				dataType:"json",
				data:{},
				success:function(res){
					that.blog_list = res.data.blog_list;
					that.bannerList = res.data.banner;
					that.cate = res.data.Classifylist;
				},
				error: function(error){},
			});
		},
	},
})