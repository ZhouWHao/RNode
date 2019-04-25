// Copyright (c) 2019 by zhouwh. All Rights Reserved.
import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import Reply from './reply.js';
import {connect} from 'react-redux';
import './index.less';
import './post.less';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // postId: '',
      // postInfo: {},
      // highlight: [],
    };
  }

  componentWillMount() {
    const postId = this.props.match.params.postId;
    const { dispatch } = this.props;
    dispatch({
        type: 'POSTDATA',
        params:postId,
    });
    this.postSort();
    // this.setState({ postId });
    // this.getPostInfo().then(res => {
    //   if (res.status === 200) {
    //     const postInfo = res.data.data;
    //     this.setState({ postInfo });
    //     this.postSort();
    //   } else {
    //     console.error(res.statusText);
    //   }
    // }).catch(e => {
    //   console.error(e);
    // });
  }

  postSort() {
    const {post} = this.props.post;
    const postCopy = post.replies.slice();
    postCopy.sort((a,b) => {
      return b.ups.length - a.ups.length;
    });
    let highlight = [];
    if (postCopy.length > 3) {
      for (let i = 0; i < 3; i++) {
        highlight.push(postCopy[i].id);
      }
    }
    this.setState({
      highlight
    });
  }
  // getPostInfo() {
  //   return axios.get(`https://cnodejs.org/api/v1/topic/${this.props.match.params.postId}`);
  // }

  getPostType() {
    const {post} = this.props.post;
    const tab = post.tab;
    const map = {
      'share': '分享',
      'good': '精华',
      'ask': '问答',
      'job': '招聘',
    };
    return map[tab];
  }


  render() {
    const {post} = this.props.post;
    console.log("render",post);
    // const postInfo = this.state.postInfo;
    const author = postInfo&&postInfo.author&&postInfo.author.loginname;
    // const tabType = this.getPostType();
    return (
      <div>
        <div className="panel" >
          <div className="topic-header">
            <span className="topic-title">
              <span className="topic-tab-type">置顶</span>
                {post.title}
            </span>
            <div className="topic-title-info">
              <span>发布于{moment(post.create_at).fromNow()}</span>
              <span>作者 {author}</span>
              <span>{post.visit_count} 次浏览</span>
              <span>最后一次编辑是{moment(post.create_at).fromNow()}</span>
              <span>来自 {tabType}</span>
            </div>
          </div>
          <div
            className="topic-content"
            dangerouslySetInnerHTML={{__html: post.content}}
          />
        </div>
        <div className="panel">
          <div className="header">
            <span className="col-code">{postInfo && post.reply_count} 回复</span>
          </div>
          <div className="reply-wrapper">
            {
              postInfo && post.replies && post.replies.map((el,index) => {
                return (
                  <Reply
                    {...el}
                    highlight={this.state.highlight}
                    key={el.id}
                    loginname={postInfo && post.author.loginname}
                    index={index+1}
                  >
                </Reply>
                );
              })
            }
          </div>
        </div>
      </div>

    )
  }
};
const mapStateToProps = (state) => {
  console.log("post的",state);
  return{
    post:state.post,
    //这里的home对应的就是我们的reducers返回的home
  };
};
export default connect(mapStateToProps)(Post);
