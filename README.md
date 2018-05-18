# csdn
####  项目整体使用的渲染技术是vue。简单的实现了查看文章详情；关注博主（取消关注博主）；收藏文章（取消收藏文章）；发布文章；编辑修改发布的文章；删除发布的文章，管理我的信息（关注的博主，关注的文章等等）等功能。
#### `1.登录及注册`<br>
* 可以从主页或者详情页右上的“登录”接口进入登录页面login.html,如果没有账号，点击界面上“注册账号”，进入注册界面register.html <br>
* login.html和register.html都是使用`bootstart`框架来写。
##### A.注册
* 注册时，用户需提供自己的"邮箱/手机号"，"密码"，"用户名"，然后点击“注册”按钮，触发注册事件。
触发注册事件之后先用clickLogin（）函数判断用户所填信息是否合理，不合理就不调用注册接口，减少服务器访问次数，合理则调用getData（）函数进行注册。
```
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
			this.getData(dataLogin);
		}
```
这里getData（）接受的参数是一个对象的形式，是clickLogin（）里面定义的dataLogin，当getData（）接收到这个参数之后，有把其赋给ajax的data
```
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
		}
```
##### B.登录
登录同注册同理。
#### `2．查看文章详情：（infor.html页面）`<br>
* 查看详情需要知道文章的id和分类的id（后`相关文章`推荐要用分类id）从首页传一个文章的文章id号（id）和分类的id号（classify_id），然后根据文章id号取到文章内容。
  * 这两个id号用是用地址栏传参的方式从首页传过来的，在详情页对地址栏进行
  * 用getSearchData()函数进行解析
  ```
    function getSearchData(){
	var qs=(location.search.length > 0 ? location.search.substring(1) : "");
    var args={};
    itemm = qs.length ? qs.split("&") : [],
    item=null,
    name=null,
    value=null,
    i=0;
    len=itemm.length;
    for(i=0;i<len;i++){
         item = itemm[i].split("=");
         name = decodeURIComponent(item[0]);
         value = decodeURIComponent(item[1]);
         if(name.length){
             args[name] = value;
         }
     }
    return args;
   }
   ```
   
   	* 然后用ajax的方法取到数据详情页所需数据，保存取到的数据就可以进行渲染了<br>
    ```
    	getData: function(){
			var that = this;
		    that.uId = window.localStorage.getItem("uid");
			$.ajax({
				url:"http://egblog.com/api/blog/info",
				type:"get",
				dataType:"json",
				data:{
					'id':getSearchData().id,
					'classify_id':getSearchData().classfy,
				},
				success:function(res){
					that.blog_info = res.data.blog_info;
					that.uId = res.data.blog_info.id;
					that.related_blog = res.data.related_blog;
					that.content = res.data.blog_info.content;
				},
				error: function(error){
					alert("详细信息获取错误")
				},
			});
		},	
    ```
#### `3．关注博主（取消关注博主）`<br>
* 关注 和取消关注博主都是要在已经登录的情况下
#####	Ａ．收藏博客(infor.html)
点击页面上的收藏按钮，触发收藏事件
* 因为博客的id是唯一的，所以收藏用到的博客地就可以了
	* 博客id是进入详情页就可以直接取到的，然后调取收藏借口，收藏成功<br>
```
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
```
#####	B．取消收藏博客（从my.html点击“我的收藏”进入到collection.html页面）

我的收藏页面显示自己收藏过的所有文章<br>
点击页面上想要取消收藏文章相应的取消收藏按钮，取消收藏，原理同收藏博客
#### `4． 收藏文章（取消收藏文章）`<br>
* 同关注博主（取消关注博主）原理类似。
`4． 发布文章`<br>
`5．编辑修改发布的文章`<br>
`6．删除发布的文章`<br>
