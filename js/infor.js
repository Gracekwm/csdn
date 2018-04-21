var app = new Vue({
	el:"#app",
	data:{
		showAll:true,
		blog_info:{},
		date:"",
		uId: null,
		related_blog:[],
	},
	mounted: function(){
		this.getData();
	},
	methods:{
		getData: function(){
			var that = this;
		    that.uId = window.localStorage.getItem("uid");
			var num = window.location.search.split("=")[1];
			$.ajax({
				url:"http://egblog.com/api/blog/info",
				type:"get",
				dataType:"json",
				data:{
					'id':num,
				},
				success:function(res){
					that.blog_info = res.data.blog_info;
					that.uId = res.data.blog_info.id;
					that.related_blog = res.data.related_blog;
				},
				error: function(error){
					alert("详细信息获取错误")
				},
			});
		},
		clickClose: function(){
			this.showAll=false;
		},
		colleCtion: function(){
			var blogId = this.blog_info.id;
			$.ajax({
				url:"http://egblog.com/api/collect/doadd",
				type:"post",
				dataType:"json",
				data:{
					'user_id':that.uId,
					'blog_id':blogId,
				},
				success:function(res){
					alert("已关注博主")
				},
				error:function(error){
					alert("没有取到数据~~~~(>_<)~~~~");
				},
			});
		}, 
		clickAttention: function(){
			var that = this;
			var userId = window.localStorage.getItem("uid");
			var blogId = this.blog_info.id;
			$.ajax({
				url:"http://egblog.com/api/attention/addAttention",
				type:"post",
				dataType:"json",
				data:{
					user_id:userId,
					blog_id:blogId
				},
				success: function(res){
					alert("关注成功")
				},
				error: function(error){},
			});
		},
		
	},
})