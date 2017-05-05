  <div class="pin ui grid post" >
    <div class="one column wide">
      <div class="ui segment">
      <a class="item" href="/posts?author='+msg.author._id+'"><img class="personal_img" src="/img/'+msg.author.avator+'">
      <p style="text-align:right;"><%= post.author.nick %></p></a>
        <p style="display: block;font-weight: bolder;padding-top: 10px; ">'+msg.title+'</p>
          <div class="summary p_all">'+msg.content+'</div>
          <div class="summary p_short"><a href="/posts/'+msg._id+'">'+msg.content+'</a></div>
         if (msg.pic!='') 
          <div >
            <a href="/posts/'+msg.author._id+'"><img style="width:100%;" src="/img/'+msg.pic+'" /></a>
          </div>
         }
        <div>
          <span class="tag">'+msg.created_at+'</span>
          <span class="tag right">
            <span>浏览('+msg.pv+')</span>
            <span>留言('+msg.commentsCount+')</span>
          </span>
        </div>
      </div>
    </div>
  </div>

  <
  div class = "pin ui grid post" >
  	<div class="one column wide">
      <div class="ui segment">
      <a class="item" href="/posts?author=<%= post.author._id %>"><img class="personal_img" src="/img/<%= post.author.avatar %>">
      <p style="text-align:right;"><%= post.author.nick %></p></a>
        <p style="display: block;font-weight: bolder;padding-top: 10px; "><%= post.title %></p>
          <div class="summary p_all"><%- post.content %></div>
          <div class="summary p_short"><a href="/posts/<%= post._id %>"><%- post.content %></a></div>
          <% if (post.pic) {%>
          <div >
            <a href="/posts/<%= post._id %>"><img style="width:100%;" src="/img/<%- post.pic%>" /></a>
          </div>
          <% } %>
        <div>
          <span class="tag"><%= post.created_at %></span>
          <span class="tag right">
            <span>浏览(<%= post.pv %>)</span>
            <span>留言(<%= post.commentsCount %>)</span>

            <% if (user && post.author._id && user._id.toString() === post.author._id.toString()) { %>
              <div class="ui inline dropdown">
                <div class="text"></div>
                <i class="dropdown icon"></i>
                <div class="menu">
                  <div class="item"><a href="/posts/<%= post._id %>/edit">编辑</a></div>
                  <div class="item"><a href="/posts/<%= post._id %>/remove">删除</a></div>
                </div>
              </div>
            <% } %>
            <% if (user&&user.permission==='3') { %>
              <div class="ui inline dropdown">
                <div class="text"></div>
                <i class="dropdown icon"></i>
                <div class="menu">
                  <div class="item"><a href="/posts/<%= post._id %>/remove">删除</a></div>
                </div>
              </div>
            <% } %>
          </span>
        </div>
      </div>
    </div> <
  	/div>