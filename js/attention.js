var app = new Vue({
	el:"#app",
	data:{
		myatt_Lists:null,
	},
	mounted: function(){
		this.getData();
	},
	methods:{
		getData: function(){
			that = this;
			var userId = window.localStorage.getItem("uid");
			$.ajax({
				url:"http://egblog.com/api/attention/myatt_lists",
				type:"post",
				dataType:"json",
				data:{
					'user_id':userId,
				},
				success:function(res){
					that.myatt_Lists = res.data.myatt_Lists;
				},
				error:function(error){
					alert("连接错误");
				},
			});
		},
		notAttention: function(item){
			that = this;
			var userId = window.localStorage.getItem("uid");
			$.ajax({
				url:"http://egblog.com/api/attention/delAttention",
				type:"get",
				dataType:"json",
				data:{
					'user_id':userId,
					'Attentionuser_id':item.id,
				},
				success:function(res){
					if(res.error_code == 0){
						alert("取消关注成功");
						that.myatt_Lists.forEach(function(i,index){
							if(i.id == item.id){
								that.myatt_Lists.splice(index,1)
							}
						})
					}else {
						alert(res.message);
					}
				},
				error:function(error){
					alert("连接错误");
				},
			});
		},
	},
});