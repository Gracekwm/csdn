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
			$.ajax({
				url:"http://egblog.com/api/blog/my_bloglists",
				type:"get",
				dataType:"json",
				data:{
					'user_id':userId,
				},
				success:function(res){
					that.blog_list=res.data.blog_lists;
				},
				error:function(error){
					alert("连接错误");
				},
			});
		},
		delBlog: function(item){
			var that = this;
			var userId = window.localStorage.getItem("uid");
			$.ajax({
				url:"http://egblog.com/api/blog/delblog",
				type:"get",
				dataType:"json",
				data:{
					id: item.id,
				},
				success: function(res){
					if(res.error_code == 0){
						alert("删除成功");
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