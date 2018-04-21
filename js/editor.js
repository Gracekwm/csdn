var app = new Vue({
	el:"#app",
	data:{
		title:"",
		class_id:1,
		uId:null,
		cate:[],
	},
	mounted: function(){
		var ue = UE.getEditor('editor');
		this.getData();
	},
	methods:{
		getData: function(){
			var that = this;
			$.ajax({
				url:"http://egblog.com/api/index/index",
				type:"get",
				dataType:"json",
				data:{},
				success:function(res){
					that.cate = res.data.Classifylist;
				},
				error: function(error){
					alert("分类接口连接错误")
				},
			});
		},
		getUeditorContent: function(){
    		return UE.getEditor('editor').getContent();
    	},
		isPublish: function(){
			var that = this;
			var cont = that.getUeditorContent();
			var userId = window.localStorage.getItem("uid");
			if(that.title.length==0||cont.length==0){
				alert("标题/内容不能为空");
			}else{
				return false;
			};
			$.ajax({
				url:"http://egblog.com/api/blog/addblog",
				type:"post",
				dataType:"json",
				data:{
					'title':that.title,
					'content':cont,
					'classify_id':that.class_id,
					'user_id':userId,
				},
				success: function(res){
					if(res.error_code == 0){
						alert("发布成功即将跳转。。。。。。");
						// window.history.back(-1);
						window.location.href="./manage.html"
					}else {
						alert(res.message);
					}
    			},
    			error: function(error){
    				alert("连接错误！！！")
    			},
			});
		},
	},
})