const express = require("express");
const router = express.Router();

// id로 글 조회 함수
async function getbyId(_id) {
  try {
    const { rows } = await database.query(`
      select _posts.id, name, title, content, created_on
      from _posts
      inner join _users
      on _posts.user_id = _users.id
      where _posts.id = '${_id}'
    `);
    return rows[0];
  } catch (error) {
    return null;
  }
}

// 글 생성 함수
async function create({ user_id, title, content }) {
  try {
    await database.query(`
		insert into _posts (id, user_id, title, content, created_on) 
		values ('${uuid.v1()}', '${user_id}', '${title}', '${content}', 
				'${new Date().toISOString()}')`);
    return true;
  } catch (error) {
    return null;
  }
}

// 글 수정 함수
async function update({ user_id, id, title, content }) {
  const post = await getById(id);
  if (!post) return null;
  try {
    await database.query(`
    update _posts
    set title ='${title}', content='${content}'
    where id=='${id}'`);
    return true;
  } catch (error) {
    return null;
  }
}

// 글 삭제
async function remove({ user_id, _id }) {
  const post = await getById(_id);
  if (!post) return null;
  try {
    await database.query(`delete from _posts where id='${_id}'`);
    return true;
  } catch (error) {
    return null;
  }
}

// 글 전체 조회
router.get("/", async (req, res) => {
  try {
    const { rows } = await database.query(`
      select _posts.id, name, title, created_on 
      from _posts inner join _users on _posts.user_id = _users.id
    `);
    res.send(rows);
  } catch (error) {
    res.status(400).send({ message: "글 조회중 오류가 발생했습니다." });
  }
});

// 글 단일 조회
router.get("/:id", async (req, res) => {
  const post = await getById(req.params.id);
  // TODO 글이 존재하는지 체크
  if (!post) {
    res.status(400).send({ message: "존재하지 않는 글입니다." });
    return;
  }
  res.send(post);
});

// 글 등록
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).send({ message: "제목과 내용은 필수 입력 사항입니다." });
    return;
  }

  const result = await create({ title, content });
  if (!result) {
    res.status(400).send({ message: "글 등록 실패" });
    return;
  }

  res.send({ messsage: "글 등록 완료" });
});

// 글 수정
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;

  if (!req.params.id || !title || !content) {
    res.status(400).send({ message: "id, 제목, 내용은 필수 입력 사항입니다." });
    return;
  }

  const result = await update({
    id: req.params.id,
    user_id: req.user.id,
    title,
    content,
  });
  if (!result) {
    res.status(400).send({ message: "글 수정 실패" });
    return;
  }
  res.send({ message: "글 수정 완료" });
});

// 글 삭제
router.delete("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: "id는 필수 입력 사항입니다." });
    return;
  }
  const result = await remove({ id: req.params.id, user_id: req.user.id });

  if (!result) {
    res.status(400).send({ message: "존재하지 않는 글입니다." });
    return;
  }

  res.send({ message: "글을 삭제했습니다." });
});

module.exports = router;
