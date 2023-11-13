document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question: "프로그래밍 언어 학습 방식",
      options: {
        "A.구조적이고 체계적인 강의와 교과서를 활용하여 학습":
          "구조적이고 체계적인 강의와 교과서를 활용하여 학습",
        "B. 직접 프로젝트를 만들어보며 학습하고 실험을 통해 개선":
          "직접 프로젝트를 만들어보며 학습하고 실험을 통해 개선",
      },
    },
    {
      question: "가장 큰 만족감을 느끼는 프로젝트",
      options: {
        "A. 복잡한 데이터베이스 시스템을 구축하는 프로젝트":
          "복잡한 데이터베이스 시스템을 구축하는 프로젝트",
        "B. 사용자 경험(UX)을 개선하는 웹 애플리케이션을 디자인하는 프로젝트":
          "사용자 경험(UX)을 개선하는 웹 애플리케이션을 디자인하는 프로젝트",
      },
    },
    {
      question: "효과적인 작업 환경",
      options: {
        "A. 조용하고 체계적인 개인 작업 공간":
          "조용하고 체계적인 개인 작업 공간",
        "B. 열려 있는 협업 공간에서 동료와 팀으로 일하는 것":
          "열려 있는 협업 공간에서 동료와 팀으로 일하는 것",
      },
    },
    {
      question: "가장 열정적으로 일하는 분야",
      options: {
        "A. 시스템 보안 및 네트워크 관리와 같은 기술적인 문제 해결":
          "시스템 보안 및 네트워크 관리와 같은 기술적인 문제 해결",
        "B. 사용자 요구사항을 이해하고 사용자 중심의 소프트웨어 개발":
          "사용자 요구사항을 이해하고 사용자 중심의 소프트웨어 개발",
      },
    },
    {
      question: "가장 가까운 관심사",
      options: {
        "A. 하드웨어 구성 및 최적화": "하드웨어 구성 및 최적화",
        "B. 소프트웨어 개발과 알고리즘 설계": "소프트웨어 개발과 알고리즘 설계",
      },
    },
    {
      question: "프로그래밍 환경 선호도",
      options: {
        "A. 저수준 프로그래밍 언어(C/C++)와 하드웨어 제어":
          "저수준 프로그래밍 언어(C/C++)와 하드웨어 제어",
        "B. 고수준 프로그래밍 언어(Java, Python)와 응용 프로그래밍":
          "고수준 프로그래밍 언어(Java, Python)와 응용 프로그래밍",
      },
    },
    {
      question: "프로젝트 관리 방식 선호도",
      options: {
        "A. 엄격한 일정과 계획을 중요시하는 프로젝트 관리 방식":
          "엄격한 일정과 계획을 중요시하는 프로젝트 관리 방식",
        "B. 유연하고 반응적인 프로젝트 관리 방식":
          "유연하고 반응적인 프로젝트 관리 방식",
      },
    },
    {
      question: "가장 흥미로운 활동",
      options: {
        "A. 컴퓨터 그래픽스 및 렌더링과 같은 기술적 도전":
          "컴퓨터 그래픽스 및 렌더링과 같은 기술적 도전",
        "B. 소셜 미디어 알고리즘 및 인공 지능(AI)과 같은 혁신적인 분야":
          "소셜 미디어 알고리즘 및 인공 지능(AI)과 같은 혁신적인 분야",
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
  async function showResult() {
    const originalString = scores.join(", ");
    const additionalString =
      "성격을 가진 사람의 가장 적절한 하나의 MBTI는 뭘까? ISTP 처럼 딱 영어 4글자로만 답변";
    const combinedString = originalString + additionalString;

    const message = await getResult(combinedString);

    alert("chat-GPT의 답변을 기다리고 있습니다. 소요시간: 약 5초");
    alert(message);
  }

  function showMBTI(result) {
    alert(result);
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
    console.log(scores);
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

async function getResult(request) {
  const apiKey = "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";
  const endpoint = "https://api.openai.com/v1/chat/completions";

  var message;

  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: request,
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      message = data.choices[0].message.content;
      console.log("Response:", message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return message;
}
