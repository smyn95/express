const express = require("express");
const router = express.Router();
const { connection } = require("../../db/index");
const { v1: uuidv1 } = require("uuid");

// 글 전체 조회
router.get("/api/posts", async (req, res) => {
  try {
    const query = `
      SELECT _posts.id, name, title, created_on 
      FROM _posts 
      INNER JOIN _users ON _posts.user_id = _users.id
    `;

    const [rows] = await connection.promise().query(query);

    if (rows.length === 0) {
      return res.status(404).json({ message: "글이 없습니다." });
    }

    return res.json(rows);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    return res.status(500).json({ message: "글 조회 중 오류가 발생했습니다." });
  }
});

// 글 단일 조회
router.get("/api/posts/:id", async (req, res) => {
  try {
    const [rows] = await connection.promise().query(
      `
      SELECT _posts.id, name, title, content, created_on 
      FROM _posts 
      INNER JOIN _users ON _posts.user_id = _users.id
      WHERE _posts.id = ?
    `,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(400).send({ message: "존재하지 않는 글입니다." });
    }

    return res.send(rows[0]);
  } catch (error) {
    console.error("Error retrieving post:", error);
    return res.status(400).send({ message: "글 조회 중 오류가 발생했습니다." });
  }
});
// 글 등록
router.post("/api/posts", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .send({ message: "Title과 content는 필수 입력 사항입니다." });
  }

  try {
    const id = uuidv1();
    const created_on = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", "");

    await connection
      .promise()
      .query(
        `INSERT INTO _posts (id, title, content, created_on) VALUES (?, ?, ?, ?)`,
        [id, title, content, created_on]
      );

    console.log(res.send(data), "res");
    return res.status(200).send({ message: "글을 등록했습니다." });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(400).send({ message: "글 등록에 실패했습니다." });
  }
});

// 글 수정
router.put("/api/posts/:id", async (req, res) => {
  const { title, content } = req.body;

  if (!req.params.id || !title || !content) {
    return res
      .status(400)
      .send({ message: "id, title, content는 필수 입력 사항입니다." });
  }

  try {
    await connection
      .promise()
      .query(`UPDATE _posts SET title = ?, content = ? WHERE id = ?`, [
        title,
        content,
        req.params.id,
      ]);

    return res.status(200).send({ message: "글을 수정했습니다." });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(400).send({ message: "글 수정에 실패했습니다." });
  }
});

// 글 삭제
router.delete("/api/posts/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ message: "id는 필수 입력 사항입니다." });
  }

  try {
    await connection
      .promise()
      .query(`DELETE FROM _posts WHERE id = ?`, [req.params.id]);

    return res.status(200).send({ message: "글을 삭제했습니다." });
  } catch (error) {
    console.error("Error removing post:", error);
    return res.status(400).send({ message: "글 삭제에 실패했습니다." });
  }
});

module.exports = router;
