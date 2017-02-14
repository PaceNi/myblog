var React = require('react');
var Signup = require('./layout');
class Index extends React.Component {
  render() {
    return (
      <Signup title={this.props.title}>
         <div className="ui grid">
          <div className="four wide column"></div>
          <div className="eight wide column">
            <form className="ui form segment" method="post" enctype="multipart/form-data">
              <div className="field required">
                <label>用户名</label>
                <input placeholder="用户名" type="text" name="name"/>
              </div>
              <div className="field required">
                <label>密码</label>
                <input placeholder="密码" type="password" name="password"/>
              </div>
              <div className="field required">
                <label>重复密码</label>
                <input placeholder="重复密码" type="password" name="repassword"/>
              </div>
              <div className="field required">
                <label>头像</label>
                <input type="file" name="avatar"/>
              </div>
              <div className="field required">
                <label>个人简介</label>
                <textarea name="bio" rows="5" v-model="user.bio"></textarea>
              </div>
              <input type="submit" className="ui button fluid" value="注册"/>
            </form>
          </div>
        </div>
      </Signup>
    );
  }
}

Index.propTypes = {
  title: React.PropTypes.string
};

module.exports = Index;
