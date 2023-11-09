document.addEventListener("DOMContentLoaded", function () {
  const db = firebase.firestore();

  const questions = [
    {
      question: "3시간 전공에 대한 수업 방식",
      options: {
        "2시간 대면, 1시간 비대면 강의": 1,
        "3시간 대면 강의": 2,
        "상관 없음": 3,
      },
    },
    {
      question: "대면 강의시 수업 방식",
      options: {
        "이론 위주의 수업": 1,
        "실습 위주의 수업": 2,
        "이론과 실습의 병행 수업": 3,
        "상관 없음": 4,
      },
    },
    {
      question: "비대면 강의시 수업 방식",
      options: {
        "호서대학교 LMS 동영상 강의": 1,
        "ZOOM 강의": 2,
        "상관 없음": 3,
      },
    },
    {
      question: "강의에 대한 수업 교재",
      options: {
        "전공 책을 활용한 강의": 1,
        "온라인 자료(pdf, md 등)를 활용한 강의": 2,
        "상관 없음": 3,
      },
    },
    {
      question: "전공 수업별 공지사항 전달 방법",
      options: {
        "호서대학교 LMS 공지사항 등록": 1,
        "카카오톡 오픈 채팅방 개설 후 공지": 2,
        "상관 없음": 3,
      },
    },
    {
      question: "선호하는 성적 산출 방법",
      options: {
        "중간고사 및 기말고사 및 팀프로젝트": 1,
        "중간고사 및 기말고사": 2,
        "중간고사 및 팀프로젝트": 3,
        기말고사: 4,
        "상관 없음": 5,
      },
    },
  ];

  let isShown = true;
  const scores = [];
  let questionIndex = 1;

  const contentForm = document.getElementById("content");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  // 내용 설정 함수
  function setContent(index, question) {
    if (isShown) {
      // 만약 기존에 출력된 게 있다면 지우기
      contentForm.innerHTML = "";
    }

    // 옵션들 전처리용 배열
    let optionBuffer = [];
    for (let option in question.options) {
      // 옵션 하나 꺼내오기
      let score = question.options[option];
      // HTML화 해서 배열에 push
      optionBuffer.push(`
        <label>
            <input type="radio" name="option" value="${score}">
            ${option}
        </label><br>
        `);
    }

    // 질문 박스
    contentForm.innerHTML = `<h5>${index}. ${
      question.question
    }</h5>${optionBuffer.join("\n")}`;
    // 만약 첫 질문이라면 "이전" 버튼 숨기기
    if (index === 1) prevButton.style.display = "none";
    else prevButton.style.display = null;
    isShown = true;
  }

  // 내용 업데이트 함수
  function updateView() {
    setContent(questionIndex, questions[questionIndex - 1]);
  }

  // submit
  function submit() {
    var studentId = prompt("학번 입력");

    var formData = {
      studentID: studentId,
      Q1: scores[0],
      Q2: scores[1],
      Q3: scores[2],
      Q4: scores[3],
      Q5: scores[4],
      Q6: scores[5],
    };
    db.collection("result").add({ formData });
    alert("설문이 성공적으로 제출되었습니다.");
  }

  // 이전 버튼
  prevButton.onclick = function () {
    scores.pop();
    --questionIndex;
    updateView();
  };

  // 다음 버튼
  nextButton.onclick = function () {
    // 선택된 거 점수 가져오기
    let score = document.querySelector('input[name="option"]:checked');
    if (!score) {
      alert("선택지를 골라주세요.");
      return;
    }

    score = score.value;
    scores.push(score);
    ++questionIndex;

    // 만약 마지막 질문이면 최종 결과를 보여줌
    if (questionIndex > questions.length) {
      submit();
    } else {
      updateView();
    }
  };
  updateView();
});
