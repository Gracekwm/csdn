# csdn
####  项目整体使用的渲染技术是vue。简单的实现了查看文章详情；关注博主（取消关注博主）；收藏文章（取消收藏文章）；发布文章；编辑修改发布的文章；删除发布的文章，管理我的信息（关注的博主，关注的文章等等）等功能。
`1.登录及注册`(可以从主页或者详情页右上的登录接口进入登录页面login.html)<br>
login.html使用`bootstart`框架来写。
##### A.注册时，用户需提供自己的用户名
`2．查看文章详情：（infor.html页面）`<br>
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
`2．关注博主（取消关注博主）`<br>
收藏和取消关注博主都是要在已经登录的情况下
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

`3． 收藏文章（取消收藏文章）`<br>
`4． 发布文章`<br>
`5．编辑修改发布的文章`<br>
`6．删除发布的文章`<br>
`7．管理我的信息`<br>
