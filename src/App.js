import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Link, useLocation } from 'react-router-dom'; // 필요한 컴포넌트들을 추가로 import
import axios from 'axios';

function PostList() {
  const [postList, setPostList] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page')) || 1;

  useEffect(() => {
    async function fetchPostList() {
      try {
        const response = await axios.get(`https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/community_board/category/free/?page=${currentPage}`);
        setPostList(response.data.results);
        setTotalPosts(response.data.count);
      } catch (error) {
        console.error('Error fetching post list:', error);
      }
    }

    fetchPostList();
  }, [currentPage]);

  const totalPages = Math.ceil(totalPosts / 2); // 페이지당 게시물 수가 2개로 고정되었다고 가정

  return (
    <div>
      <h1>게시물 목록!</h1>
      <ul>
        {postList.map(post => (
          <li key={post.id}>
            <Link to={`/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <Link key={index + 1} to={`/?page=${index + 1}`}>
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}

function PostDetail({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Category: {post.category}</p>
      <p>Created At: {post.created_at}</p>
      {/* 나머지 속성들도 표시하거나 원하는 형태로 표현 가능 */}
    </div>
  );
}

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchSinglePost() {
      try {
        const response = await axios.get(`https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/community_board/category/free/${id}/`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching single post:', error);
      }
    }

    fetchSinglePost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PostDetail post={post} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/:id" element={<SinglePost />} />
      </Routes>
    </Router>
  );
}