document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question: "프로그래밍 언어 학습 방식",
      options: {
        "A.구조적이고 체계적인 강의와 교과서를 활용하여 학습": "A",
        "B. 직접 프로젝트를 만들어보며 학습하고 실험을 통해 개선": "B",
      },
    },
    {
      question: "가장 큰 만족감을 느끼는 프로젝트",
      options: {
        "A. 복잡한 데이터베이스 시스템을 구축하는 프로젝트": "A",
        "B. 사용자 경험(UX)을 개선하는 웹 애플리케이션을 디자인하는 프로젝트":
          "B",
      },
    },
    {
      question: "효과적인 작업 환경",
      options: {
        "A. 조용하고 체계적인 개인 작업 공간": "A",
        "B. 열려 있는 협업 공간에서 동료와 팀으로 일하는 것": "B",
      },
    },
    {
      question: "가장 열정적으로 일하는 분야",
      options: {
        "A. 시스템 보안 및 네트워크 관리와 같은 기술적인 문제 해결": "A",
        "B. 사용자 요구사항을 이해하고 사용자 중심의 소프트웨어 개발": "B",
      },
    },
    {
      question: "가장 가까운 관심사",
      options: {
        "A. 하드웨어 구성 및 최적화": "A",
        "B. 소프트웨어 개발과 알고리즘 설계": "B",
      },
    },
    {
      question: "프로그래밍 환경 선호도",
      options: {
        "A. 저수준 프로그래밍 언어(C/C++)와 하드웨어 제어": "A",
        "B. 고수준 프로그래밍 언어(Java, Python)와 응용 프로그래밍": "B",
      },
    },
    {
      question: "프로젝트 관리 방식 선호도",
      options: {
        "A. 엄격한 일정과 계획을 중요시하는 프로젝트 관리 방식": "A",
        "B. 유연하고 반응적인 프로젝트 관리 방식": "B",
      },
    },
    {
      question: "가장 흥미로운 활동",
      options: {
        "A. 컴퓨터 그래픽스 및 렌더링과 같은 기술적 도전": "A",
        "B. 소셜 미디어 알고리즘 및 인공 지능(AI)과 같은 혁신적인 분야": "B",
      },
    },
  ];
  let isShown = true;

  const scores = [];
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
  <h5>${index}. ${question.question}</h5>
  ${optionBuffer.join("\n")}
  `;
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
  function showResult() {
    // 배열의 합 계산
    const totalScore = scores.reduce((acc, curr) => acc + parseInt(curr), 0);
    alert(`최종 점수: ${totalScore}`);
  }

  nextButton.onclick = function () {
    // 선택된 거 점수 가져오기
    let score = document.querySelector('input[name="option"]:checked');
    // 선택된 게 없다면
    if (!score) {
      // 경고 표시
      alert("선택지를 골라주세요.");
      return;
    }
    // 선택된 게 있다면 점수 불러오기
    score = score.value;

    // 점수 목록에 push
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
