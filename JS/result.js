// document.addEventListener("DOMContentLoaded", function () {
//   const db = firebase.firestore();

//   const questions = [
//     {
//       question: "3시간 전공에 대한 수업 방식",
//     },
//     {
//       question: "대면 강의시 수업 방식",
//     },
//     {
//       question: "비대면 강의시 수업 방식",
//     },
//     {
//       question: "강의에 대한 수업 교재",
//     },
//     {
//       question: "전공 수업별 공지사항 전달 방법",
//     },
//     {
//       question: "선호하는 성적 산출 방법",
//     },
//   ];

//   let isShown = true;
//   const scores = [];
//   let questionIndex = 1;

//   const contentForm = document.getElementById("content");
//   const prevButton = document.getElementById("prev");
//   const nextButton = document.getElementById("next");

//   // 내용 설정 함수
//   function setContent(index, question) {
//     if (isShown) {
//       // 만약 기존에 출력된 게 있다면 지우기
//       contentForm.innerHTML = "";
//     }

//     // 옵션들 전처리용 배열
//     let optionBuffer = [];
//     for (let option in question.options) {
//       // 옵션 하나 꺼내오기
//       let score = question.options[option];
//       // HTML화 해서 배열에 push
//       optionBuffer.push(`
//           <label>
//               <input type="radio" name="option" value="${score}">
//               ${option}
//           </label><br>
//           `);
//     }

//     // 질문 박스
//     contentForm.innerHTML = `<h5>${index}. ${
//       question.question
//     }</h5>${optionBuffer.join("\n")}`;
//     // 만약 첫 질문이라면 "이전" 버튼 숨기기
//     if (index === 1) prevButton.style.display = "none";
//     else prevButton.style.display = null;

//     // 마지막 질문이라면 "다음" 버튼 숨기기
//     if (index === 6) nextButton.style.display = "none";
//     else nextButton.style.display = null;
//     isShown = true;
//   }

//   // 내용 업데이트 함수
//   function updateView() {
//     setContent(questionIndex, questions[questionIndex - 1]);
//   }

//   // submit
//   function submit() {
//     var studentId = prompt("학번 입력");

//     var formData = {
//       studentID: studentId,
//       Q1: scores[0],
//       Q2: scores[1],
//       Q3: scores[2],
//       Q4: scores[3],
//       Q5: scores[4],
//       Q6: scores[5],
//     };
//     db.collection("result").add({ formData });
//     alert("설문이 성공적으로 제출되었습니다.");
//   }

//   // 이전 버튼
//   prevButton.onclick = function () {
//     scores.pop();
//     --questionIndex;
//     updateView();
//   };

//   // 다음 버튼
//   nextButton.onclick = function () {
//     ++questionIndex;

//     // 만약 마지막 질문이면 최종 결과를 보여줌
//     if (questionIndex > questions.length) {
//       //   submit();
//     } else {
//       updateView();
//     }
//   };
//   updateView();
// });
