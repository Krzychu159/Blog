import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import Story from "../components/Story";
import Menu from "../components/Menu";
import CommentModal from "../components/CommentModal";
import "./Feed.scss";
import PostModal from "../components/PostModal";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentCounts, setCommentCounts] = useState({});
  const [formShow, setFormShow] = useState(false);

  const [page, setPage] = useState(1);
  const POST_PER_PAGE = 10;

  useEffect(() => {
    const from = (page - 1) * POST_PER_PAGE;
    const to = from + POST_PER_PAGE - 1;

    async function fetchPosts() {
      const { data, error } = await supabase
        .from("postsv2")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, to);
      if (error) console.log("Posts error:", error.message);
      else {
        setPosts((prev) => (page === 1 ? data : [...prev, ...data]));
      }
      setLoading(false);
    }

    async function fetchCommentCounts() {
      const { data, error } = await supabase
        .from("commentsv2")
        .select("post_id");

      if (error) {
        console.error("Comment counts error:", error.message);
        return;
      }

      const map = {};
      data.forEach(({ post_id }) => {
        if (!map[post_id]) map[post_id] = 1;
        else map[post_id]++;
      });

      setCommentCounts(map);
    }

    fetchPosts();
    fetchCommentCounts();
  }, [page]);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from("usersv2").select("*");
      if (error) console.log("Users error:", error.message);
      else {
        setUsers(data);
      }
    }
    fetchUsers();
  }, []);

  const openComments = (postId) => {
    setSelectedPostId(postId);
  };
  const closeComments = () => {
    setSelectedPostId(null);
  };
  const closePostForm = () => {
    setFormShow(false);
  };

  return (
    <div>
      <Menu />
      <div className="container">
        <div className="feed">
          <PostForm onOpenForm={() => setFormShow(true)} />
          <Story />
          <div className="post-list">
            {loading ? "loading" : null}
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                user={users.find((u) => u.id === post.user_id)}
                commentCount={commentCounts[post.id] || 0}
                onOpenComments={openComments}
                onClose={closeComments}
              />
            ))}
            <div className="load-more">
              {!loading && (
                <button onClick={() => setPage((prev) => prev + 1)}>
                  Load more posts
                </button>
              )}
            </div>

            {selectedPostId && (
              <CommentModal
                postId={selectedPostId}
                post={posts.find((p) => p.id === selectedPostId)}
                onClose={closeComments}
                user={users.find(
                  (u) =>
                    u.id === posts.find((p) => p.id === selectedPostId).user_id
                )}
              />
            )}
            {formShow && <PostModal onClose={closePostForm} />}
          </div>
        </div>
      </div>
    </div>
  );
}
