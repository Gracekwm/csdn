var app = new Vue({
	el:"#app",
	data:{
		phone:null,
		password:null,
		userName:null,
	},
	mounted: function(){
		
	},
	methods:{
		clickLogin: function(){
			var dataLogin= {
				'phone':this.phone,
				'password':this.password,
				'uname':this.userName,
			}

			if(this.phone==null){
				alert("邮箱/手机号不能为空哦(⊙o⊙)");
				return false;	
			}
			if(this.password==null){
				alert("密码不能为空哦(⊙o⊙)");
				return false;	
			}
			if(this.uname==null){
				alert("用户名不能为空哦(⊙o⊙)");
				return false;	
			}
			console.log(dataLogin);
			this.getData(dataLogin);
		},
		getData: function(dataObj){
			var that = this;
			$.ajax({
				url:"http://egblog.com/api/user/doreg",
				type:"post",
				dataType:"json",
				data:dataObj,
				success:function(res){
					var a= res;
					console.log(a);
				},
				error:function(error){
					alert("没有取到数据~~~~(>_<)~~~~");
				},
			}); 
		},

	},
})