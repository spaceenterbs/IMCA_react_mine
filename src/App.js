import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function PaginationExample() {
  const [data, setData] = useState([]); // 서버에서 받아온 게시글 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [pageCount, setPageCount] = useState(1); // 총 페이지 수

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/community_board/category/free/?page=${currentPage}`);
        setData(response.data.results); // 게시글 데이터
        setPageCount(response.data.page_count); // 총 페이지 수
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {/* 게시글 목록 */}
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {/* 게시글 타이틀을 클릭하면 상세 페이지로 이동 */}
            <Link to={`/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          이전
        </button>
        <span>
          {currentPage} / {pageCount}
        </span>
        <button
          disabled={currentPage === pageCount}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
}

function DetailPage({ match }) {
  const postId = match?.params?.id; // URL 파라미터에서 게시글 ID 추출
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        if (postId) {
          const response = await axios.get(`https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/community_board/category/free/${postId}/`);
          setPost(response.data); // 게시글 상세 정보
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }

    fetchPost();
  }, [postId]);

  return (
    <div>
      {/* 게시글 상세 정보 렌더링 */}
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginationExample />} />
        <Route path="/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function PaginationExample() {
//   const [data, setData] = useState([]); // 서버에서 받아온 게시글 데이터
//   const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
//   const [pageCount, setPageCount] = useState(1); // 총 페이지 수

//   useEffect(() => {
  //     // 서버로부터 데이터와 페이지네이션 정보를 받아와 상태를 업데이트합니다.
  //     async function fetchData() {
    //       try {
      //         console.log('Fetching data...'); // 추가된 부분
//         const response = await axios.get(`https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/community_board/category/free/?page=${currentPage}`);
//         setData(response.data.results); // 게시글 데이터
//         setPageCount(response.data.page_count); // 총 페이지 수
//         console.log('Data fetched successfully:', response.data); // 추가된 부분
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }

//     fetchData();
//   }, [currentPage]);

//   const handlePageChange = (newPage) => {
  //     // 페이지 변경 시 실행되는 함수
  //     setCurrentPage(newPage);
  //   };
  
  //   return (
    //     <div>
    //       {/* 게시글 목록 */}
    //       <ul>
    //         {data.map((item) => (
      //           <li key={item.id}>{item.title}</li>
      //         ))}
      //       </ul>
      
      //       {/* 페이지네이션 */}
      //       <div>
      //         <button
      //           disabled={currentPage === 1}
      //           onClick={() => handlePageChange(currentPage - 1)}
      //         >
      //           이전
      //         </button>
      //         {Array.from({ length: pageCount }, (_, index) => (
        //           <button
        //             key={index + 1}
        //             onClick={() => handlePageChange(index + 1)}
        //             style={{
          //               fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
          //             }}
          //           >
//             {index + 1}
//             </button>
//             ))}
//         <button
//           disabled={currentPage === pageCount}
//           onClick={() => handlePageChange(currentPage + 1)}
//         >
//           다음
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PaginationExample;

// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   // Pagination data
//   const paginationData = {
//     count: 3,
//     page_count: 2,
//     next: 'http://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/community_board/category/free/?page=2',
//     previous: null,
//   };

//   const [currentPage, setCurrentPage] = useState(1);

//   // Generate an array of page numbers based on page_count
//   const pageNumbers = [];
//   for (let i = 1; i <= paginationData.page_count; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="App">
//       {/* Render pagination buttons */}
//       <div className="pagination">
//         {pageNumbers.map((pageNum) => (
//           <button
//             key={pageNum}
//             className={`pagination-button ${pageNum === currentPage ? 'active' : ''}`}
//             onClick={() => setCurrentPage(pageNum)}
//           >
//             {pageNum}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function PaginationExample() {
  //   const [data, setData] = useState([]); // 서버에서 받아온 게시글 데이터
  //   const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  //   const [pageCount, setPageCount] = useState(1); // 총 페이지 수
  
  //   useEffect(() => {
    //     // 서버로부터 데이터와 페이지네이션 정보를 받아와 상태를 업데이트합니다.
//     async function fetchData() {
//       try {
//         const response = await axios.get(`서버 API 주소`);
//         setData(response.data.results); // 게시글 데이터
//         setPageCount(response.data.page_count); // 총 페이지 수
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }

//     fetchData();
//   }, [currentPage]);

//   const handlePageChange = (newPage) => {
//     // 페이지 변경 시 실행되는 함수
//     setCurrentPage(newPage);
//   };

//   return (
//     <div>
//       {/* 게시글 목록 */}
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>{item.title}</li>
//         ))}
//       </ul>

//       {/* 페이지네이션 */}
//       <div>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(currentPage - 1)}
//         >
//           이전
//         </button>
//         <span>
//           {currentPage} / {pageCount}
//         </span>
//         <button
//           disabled={currentPage === pageCount}
//           onClick={() => handlePageChange(currentPage + 1)}
//         >
//           다음
//         </button>
//       </div>
//     </div>
//   );
// }




// export default PaginationExample;