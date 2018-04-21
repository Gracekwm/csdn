var app = new Vue({
	el:"#app",
	data:{
		blog_list:null,
	},
	mounted: function(){
		this.getData();
	},
	methods:{
		getData: function(){
			that = this;
			var userId = window.localStorage.getItem("uid");
			var a= $(".alll").val();
			$.ajax({
				url:"http://egblog.com/api/collect/mylists",
				type:"post",
				dataType:"json",
				data:{
					'user_id':userId,
				},
				success:function(res){
					that.blog_list=res.data.myLists;
				},
				error:function(error){
					alert("连接错误");
				},
			});
		},
		cancetCollection: function(item){
			$.ajax({
				url:"http://egblog.com/api/Collect/delcollect",
				type:"get",
				dataType:"json",
				data:{
					'user_id':window.localStorage.getItem("uid"),
					'blog_id':item.id,
				},
				success: function(res){
					if(res.error_code == 0){
						alert("取消收藏成功");
						that.blog_list.forEach(function(i,index){
							if(i.id == item.id){
								that.blog_list.splice(index,1)
							}
						})
					}else {
						alert(res.message);
					}
    			},
    			error:function(error){
    				alert("连接错误！！！")
    			},
			});	
		},
	},
})