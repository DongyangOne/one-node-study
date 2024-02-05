// routes/user.js

const express = require("express");
const User = require("../models/user");

const router = express.Router();

// ** 회원가입
// POST /user/register
router.post("/register", async (req, res) => {
  try {
    // ** Http Body에 담겨온 정보들을 통해
    const user = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    });
    user.save();
    res.status(200).json({ code: 200, message: "회원가입에 성공했습니다." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, message: "Internal Server Error", error });
  }
});

// ** 로그인
// POST /user/login
router.post("/login", async (req, res) => {
  try {
    // ** 입력된 id(username)로 회원정보 검색
    const findUserByUsername = await User.findOne({
      where: { username: req.body.username },
    });

    // ** 회원정보가 존재하지 않는 경우
    if (!findUserByUsername) {
      res
        .status(404)
        .json({ code: 404, message: "회원정보을 찾을 수 없습니다." });
      return;
    }

    // ** 비밀번호가 잘못된 경우
    if (findUserByUsername.password != req.body.password) {
      res.status(404).json({ code: 400, message: "비밀번호가 다릅니다." });
      return;
    }

    // ** 로그인 성공
    res.status(200).json({ code: 200, message: "로그인에 성공했습니다." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, message: "Internal Server Error", error });
  }
});

// ** 전체 회원 정보 조회
// GET /user
router.get("/", async (req, res) => {
  try {
    // ** 전체 유저 조회
    const user = await User.findAll();

    // ** 조회 데이터 response
    res
      .status(200)
      .json({ code: 200, message: "전체 유저 정보를 조회합니다.", data: user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, message: "Internal Server Error", error });
  }
});

// ** 단일 회원 정보 조회
// GET /user/:id
router.get("/:id", async (req, res) => {
  try {
    // ** URL에서 id
    const id = req.params.id;

    // ** id로 user 조회
    const findUser = await User.findOne({ where: { id } });

    // ** user 정보가 존재하지 않는 경우 예외처리
    if (!findUser) {
      res
        .status(404)
        .json({ code: 404, message: "회원 정보를 찾을 수 없습니다." });
      return;
    }

    // ** user 정보 응답
    res
      .status(200)
      .json({ code: 200, message: "회원 정보를 조회합니다.", data: findUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, message: "Internal Server Error", error });
  }
});

// ** 회원 수정
// PUT /user/:id
router.put("/:id", async (req, res) => {
  try {
    // ** 회원 정보 확인
    const id = req.params.id;

    const findUser = await User.findOne({ where: { id } });

    if (!findUser) {
      res
        .status(404)
        .json({ code: 404, message: "회원 정보를 찾을 수 없습니다." });
      return;
    }

    // ** 회원 정보가 존재하는 경우 수정 진행
    await User.update(
      // 수정하고자 하는 부분
      {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
      },
      // where 절
      { where: { id } }
    );

    res.status(200).json({ code: 200, message: "회원 정보를 수정합니다." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, message: "Internal Server Error", error });
  }
});

// ** 회원 삭제
// DELETE /user/:id
router.delete("/:id", async (req, res) => {
  try {
    // ** 회원 정보 확인
    const id = req.params.id;

    const findUser = await User.findOne({ where: { id } });

    if (!findUser) {
      res
        .status(404)
        .json({ code: 404, message: "회원 정보를 찾을 수 없습니다." });
      return;
    }

    // ** 회원 정보가 존재하는 경우 삭제 진행
    await User.destroy({ where: { id } });

    res.status(200).json({ code: 200, message: "회원 정보를 삭제합니다." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, message: "Internal Server Error", error });
  }
});

module.exports = router;
