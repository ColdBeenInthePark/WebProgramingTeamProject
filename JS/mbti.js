import { getResult } from "./gpt.js";

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
    {
      question: "가장 선호하는 개발 환경",
      options: {
        "A. 통합 개발 환경(IDE)을 사용하는 것":
          "통합 개발 환경(IDE)을 사용하는 것",
        "B. 텍스트 에디터와 커맨드 라인 개발 환경을 선호하는 것":
          "텍스트 에디터와 커맨드 라인 개발 환경을 선호하는 것",
      },
    },
    {
      question: "코드 리뷰에 대한 의견",
      options: {
        "A. 코드 리뷰를 통해 품질 향상을 추구하는 것":
          "코드 리뷰를 통해 품질 향상을 추구하는 것",
        "B. 신속한 코드 배포를 위해 코드 리뷰를 최소화하는 것":
          "신속한 코드 배포를 위해 코드 리뷰를 최소화하는 것",
      },
    },
    {
      question: "컴퓨터 공학 분야에서 추구하는 궁극적인 목표",
      options: {
        "A. 새로운 기술과 개념을 발견하고 연구하는 것":
          "새로운 기술과 개념을 발견하고 연구하는 것",
        "B. 실제 문제에 대한 현실적인 솔루션을 개발하는 것":
          "실제 문제에 대한 현실적인 솔루션을 개발하는 것",
      },
    },
    {
      question: "능력을 더욱 향상시킬 수 있다고 생각하는 프로젝트",
      options: {
        "A. 오픈 소스 프로젝트에 참여하는 것":
          "오픈 소스 프로젝트에 참여하는 것",
        "B.스타트업이나 소규모 팀에서 다양한 역할을 수행하는 것 ":
          "스타트업이나 소규모 팀에서 다양한 역할을 수행하는 것",
      },
    },
    {
      question: "개발 과정에서 발생하는 문제에 대한 해결 방법",
      options: {
        "A. 자세한 분석과 조사를 통해 원인을 찾는 것":
          "자세한 분석과 조사를 통해 원인을 찾는 것",
        "B. 빠른 실험과 적극적인 해결 방법을 통해 문제를 해결하는 것":
          "빠른 실험과 적극적인 해결 방법을 통해 문제를 해결하는 것",
      },
    },
    {
      question: "새로운 기술을 학습하는 데 가장 중요하다고 생각하는 자원",
      options: {
        "A. 온라인 강의와 교재를 활용하는 것":
          "온라인 강의와 교재를 활용하는 것",
        "B. 실제 프로젝트에 참여하며 경험을 쌓는 것":
          "실제 프로젝트에 참여하며 경험을 쌓는 것",
      },
    },
    {
      question: "컴퓨터 공학 분야에서 어떤 윤리적인 고려사항",
      options: {
        "A. 개인 정보 보호와 데이터 안전성": "개인 정보 보호와 데이터 안전성",
        "B. 기술의 사회적 영향과 공정한 사용":
          "기술의 사회적 영향과 공정한 사용",
      },
    },
    {
      question: "프로그래밍 스타일에 대한 선호도",
      options: {
        "A. 함수형 프로그래밍과 같은 선언적인 스타일":
          "함수형 프로그래밍과 같은 선언적인 스타일",
        "B. 객체지향 프로그래밍과 같은 명령적인 스타일":
          "객체지향 프로그래밍과 같은 명령적인 스타일",
      },
    },
    {
      question: "프로젝트에서 기술적인 도전에 직면했을 때, 먼저 사용할 자원",
      options: {
        "A. 문서와 관련 기술 스택의 공식 자료":
          "문서와 관련 기술 스택의 공식 자료",
        "B. 온라인 개발 커뮤니티와 토론": "온라인 개발 커뮤니티와 토론",
      },
    },
    {
      question: "소프트웨어 개발 생명주기에서 더 많은 관심을 기울이고 싶은 부",
      options: {
        "A. 초기 계획과 설계 단계": "초기 계획과 설계 단계",
        "B. 구현과 테스트 단계": "구현과 테스트 단계",
      },
    },
    {
      question: "컴퓨터 공학 교육에서 개선이 필요하다고 생각하는 부분",
      options: {
        "A. 이론과 실무 간의 균형 조절": "이론과 실무 간의 균형 조절",
        "B. 현업에서의 실제 경험과 연계된 교육":
          "현업에서의 실제 경험과 연계된 교육",
      },
    },
    {
      question: "개발자로서의 성장을 위해 세우고 싶은 계획",
      options: {
        "A. 새로운 언어나 프레임워크 학습에 집중하는 것":
          "새로운 언어나 프레임워크 학습에 집중하는 것",
        "B. 팀 리더십이나 프로젝트 관리 역량 향상에 집중하는 것":
          "팀 리더십이나 프로젝트 관리 역량 향상에 집중하는 것",
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
    const additionalString2 =
      "의 mbti를 가진 사람은 어떤 분야의 개발자가 어울릴까?";

    const combinedString = originalString + additionalString;

    let message = "";
    let message2 = "";

    try {
      let loading = document.getElementById("loading");
      loading.style.display = "block";

      message = await getResult(combinedString);
      const combinedString2 = message + additionalString2;
      message2 = await getResult(combinedString2);
    } catch (error) {
      console.error("error : ", error);
    } finally {
      loading.style.display = "none";
    }

    localStorage.setItem("mbti", message);
    localStorage.setItem("mbtiResult", message2);
    window.location.href = "resultMBTI.html";
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
