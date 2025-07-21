// src/App.js
import React, { useEffect, useState } from "react";
import { fetchPages } from "./api";
import { buildTree } from "./utils/buildTree";

// ① 새로 만든 헤더·그리드·푸터 컴포넌트 임포트
import Header from "./components/Header";
import CategoryGrid from "./components/CategoryGrid";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [tree, setTree] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPages()
      .then(pages => setTree(buildTree(pages)))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div className="error">Error: {error}</div>;
  if (!tree) return <div className="loading">Loading…</div>;

  return (
    <div className="App">
      {/* ② 헤더 */}
      <Header />

      {/* ③ 카테고리 그리드 */}
      <CategoryGrid tree={tree} />

      {/* ④ 푸터 */}
      <Footer />
    </div>
  );
}

export default App;
