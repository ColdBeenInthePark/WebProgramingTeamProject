import { getResult } from "./gpt.js";

document.addEventListener("DOMContentLoaded", function () {
  let isShown = true;
  // 옵션 객체 생성
  function createOptions() {
    return {
      "아예 모름": 1,
      "들어는 봤음": 2,
      "무엇인지 알고 있음": 3,
      "사용해 봤음": 4,
      "사용해 봤으며 남들에게 설명이 가능함": 5,
    };
  }

  // 질문 목록
  const questions = [
    {
      question: "컴퓨터 공학에 대해 알고있습니까?",
      options: createOptions(),
    },
    {
      question:
        "웹을 개발하기 위해서는 3가지의 언어를 알아야합니다. 무엇인지 알고 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "웹에서 하이퍼링크 텍스트의 색이 3가지가 있습니다.각각 BLUE,PURPLE,RED가 무슨역할을 하는지 알고 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "컴퓨터 공학에서 &quot알고리즘&quot이 무엇을 의미하는지 설명할 수 있습니까?",
      options: createOptions(),
    },
    {
      question: "&quot클라우드 컴퓨팅&quot에 대해 간단한 설명이 가능합니까?",
      options: createOptions(),
    },
    {
      question:
        "객체지향 프로그래밍과 절차지향 프로그래밍의 차이는 무엇인지 알고 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "&quot인공지능&quot과 &quot머신러닝&quot의 차이를 설명할 수 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "&quot웹 개발&quot에서 프론트엔드와 백엔드의 역할에 대해 알고 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "&quot컴퓨터 공학에서의 보안&quot에 대해 어떤 기술들이 사용되고 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "&quot빅데이터&quot는 어떻게 정의되며, 어떻게 활용될 수 있는지 알고 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "정렬 알고리즘 중 &quot퀵 소트(Quick Sort)&quot와 &quot머지 소트(Merge Sort)&quot의 차이점에 대해 알고 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "&quot이진 탐색 알고리즘&quot은 어떻게 동작하며, 어떤 종류의 문제에서 유용하게 활용될 수 있는지 알고 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "&quot동적 프로그래밍&quot이란 무엇이고, 어떤 상황에서 사용되는지 알고 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "&quotHTTP&quot와 &quotHTTPS&quot의 차이점을 설명할 수 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "&quot컴퓨터 보안&quot에서의 &quot퍼징&quot이 무엇인지 알고 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "&quot컴퓨터 공학에서의 윤리&quot에 대한 대표적 고려 사항(3가지 이상)을 알고 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "상용 관용 암호 방식에서  SEED부분의 F힘수와 G힘수에 대해 알고 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "암호학에서 공개키 암호 방식과 대칭키 암호방식에 대해 알고 있습니까?",
      options: createOptions(),
    },
    {
      question:
        "암호방식 중 하나인 RSA암호시스템은 무슨 문제점을 보완하기 위해 개발되었으며,주로 어디에 사용하는지 알고 있습니까?",
      options: createOptions(),
    },
    {
      question: "&quotSQL인젝션 공격&quot을 알고 있습니까?",
      options: createOptions(),
    },
  ];

  // 점수 목록 담을 배열
  const scores = [];
  const request = [];
  // 현재 질문 번호
  let questionIndex = 1;

  // 버튼, Form 객체들
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

    // Form 내용 채우기
    contentForm.innerHTML = `
<h5 id="question">${index}. ${question.question}</h5>
${optionBuffer.join("\n")}`;

    // 만약 첫번째 거면 `이전` 버튼 숨기기
    if (index === 1) prevButton.style.display = "none";
    // 아니라면 `이전` 버튼 되돌리기
    else prevButton.style.display = null;

    // 플래그 업데이트
    isShown = true;
  }

  // 내용 업데이트 함수
  function updateView() {
    setContent(questionIndex, questions[questionIndex - 1]);
  }

  prevButton.onclick = function () {
    // 점수 뒤에서 하나 빼기
    scores.pop();
    // 질문 번호 하나 이전걸로
    --questionIndex;
    // 화면 업데이트
    updateView();
  };
  // 선택이 끝나고 최종 결과를 보여주는 함수
  async function showResult() {
    const originalString = request.join(", ");
    const additionalString =
      "질문 뒤에 1은 아예 모름 2는 들어는 봤음 3은 무엇인지 알고 있음 4는 사용해 봤음 5는 사용해봤으며 남들에게 설명이 가능함을 뜻해 이사람의 강점과 보안점을 한글 100자 이내로 서술";
    const combinedString = originalString + additionalString;
    let message = "";

    try {
      let loading = document.getElementById("loading");
      loading.style.display = "block";

      message = await getResult(combinedString);
    } catch (error) {
      console.error("error : ", error);
    } finally {
      loading.style.display = "none";
    }

    // 배열의 합 계산
    const totalScore = scores.reduce((acc, curr) => acc + parseInt(curr), 0);

    await localStorage.setItem("score", totalScore);
    await localStorage.setItem("result", message);
    window.location.href = "resultCS.html";
  }

  nextButton.onclick = function () {
    // 선택된 버튼 및 제목 가져오기
    let score = document.querySelector('input[name="option"]:checked');
    let req = document.getElementById("question").innerHTML;

    // 선택된 게 없다면
    if (!score) {
      alert("선택지를 골라주세요.");
      return;
    }
    // 선택된 게 있다면 점수 불러오기
    score = score.value;

    request.push(req);
    request.push(score);
    scores.push(score);

    // 질문 번호 하나 뒤에걸로
    ++questionIndex;
    // 만약 마지막 질문이면 최종 결과를 보여줌
    if (questionIndex > questions.length) {
      showResult();
    } else {
      // 아니라면 화면 업데이트
      updateView();
    }
  };
  updateView();
});
