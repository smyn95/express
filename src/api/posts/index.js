const express = require("express");
const router = express.Router();

// 글 정보를 담을 배열과 id
const posts = {
  data: [],
};

// 글 전체 조회
router.get("/", (req, res) => {
  res.send(posts.data);
});

// 글 단일 조회
router.get("/:id", (req, res) => {
  const postId = req.params.id;
  const post = posts.data.find((p) => p.id === postId);

  if (!post) {
    res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    return;
  }
  res.send(post);
});

// 글 등록
router.post("/", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).send({ message: "Title, content는 필수 입력 사항입니다." });
    return;
  }
  posts.data.push({
    ...req.body,
    id: posts.id,
  });
  posts.id++;
  res.send({ message: "글을 등록했습니다." });
});

// 글 수정
router.put("/:id", (req, res) => {
  const { title, content } = req.body;

  if (!req.params.id || !title || !content) {
    res
      .status(400)
      .send({ message: "id, title, content는 필수 입력 사항입니다." });
    return;
  }
  const post = posts.data.find((post) => post.id === parseInt(req.params.id));

  if (!post) {
    res.status(400).send({ message: "존재하지 않는 글입니다." });
    return;
  }

  post.title = title;
  post.content = content;
  res.send({ message: "글을 수정했습니다." });
});

// 글 삭제
router.delete("/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: "id는 필수 입력 사항입니다." });
    return;
  }
  const post = posts.data.find((post) => post.id === parseInt(req.params.id));

  if (!post) {
    res.status(400).send({ message: "존재하지 않는 글입니다." });
    return;
  }

  posts.data = posts.data.filter((_post) => _post.id !== post.id);
  res.send({ message: "글을 삭제했습니다." });
});

module.exports = router;
