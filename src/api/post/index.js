const express = require("express");
const router = express.Router();

// 글 정보를 담을 배열과 id
const posts = {
  data: [],
  id: 1,
};

// 글 전체 조회
router.get("/", (req, res) => {
  // TODO 글 전체 반환해주기
});

// 글 단일 조회
router.get("/:id", (req, res) => {
  // TODO 글이 존재하는지 체크
  // TODO 글이 존재하면 응답 객체에 넣어서 보내기
});

// 글 등록
router.post("/", (req, res) => {
  // TODO title, content가 있는지 체크
  // TODO 글 추가
});

// 글 수정
router.put("/:id", (req, res) => {
  // TODO id, title, content가 있는지 체크
  // TODO 글이 존재하는지 체크
  // TODO 글 수정
});

// 글 삭제
router.delete("/:id", (req, res) => {
  // id가 있는지 체크
  // TODO 글이 존재하는지 체크
  // TODO 글 삭제
});

module.exports = router;
