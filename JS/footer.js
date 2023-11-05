document.addEventListener("DOMContentLoaded", function () {
  const footer = document.createElement("footer");
  footer.className = "footer";

  const footerUpContent = document.createElement("div");
  footerUpContent.className = "footerUpContent";

  const footerUpContentLeft = document.createElement("div");
  footerUpContentLeft.className = "footerUpContentLeft";

  const leftParagraph = document.createElement("p");
  leftParagraph.innerHTML = `H<span>oseo</span>S<span>urvey</span>W<span>eb</span>A<span>pplication</span>`;

  const telSpan = document.createElement("span");
  telSpan.textContent = "010-8954-1199";
  leftParagraph.appendChild(document.createElement("br"));
  leftParagraph.appendChild(document.createTextNode("Tel : "));
  leftParagraph.appendChild(telSpan);

  const emailSpan = document.createElement("span");
  emailSpan.textContent = "20191163@vision.hoseo.edu";
  leftParagraph.appendChild(document.createElement("br"));
  leftParagraph.appendChild(document.createTextNode("E-mail : "));
  leftParagraph.appendChild(emailSpan);

  const locationSpan = document.createElement("span");
  locationSpan.textContent = '제2공학관 419호 "디지털융합연구실"';
  leftParagraph.appendChild(document.createElement("br"));
  leftParagraph.appendChild(document.createTextNode("Location : "));
  leftParagraph.appendChild(locationSpan);

  const footerUpContentRight = document.createElement("div");
  footerUpContentRight.className = "footerUpContentRight";

  const footerUpContentRightLink = document.createElement("div");
  footerUpContentRightLink.className = "footerUpContentRightLink";

  const links = [
    { text: "HSWA", href: "/" },
    {
      text: "컴퓨터 공학에 대해 얼마나 알고 계시나요?",
      href: "/formData/computerScience.html",
    },
    { text: "컴퓨터 공학부 'MBTI'", href: "/formData/mbti.html" },
    {
      text: "수업 방식 및 시험 방법에 대한 선호도 조사",
      href: "/formData/preferenceResearch.html",
    },
  ];

  links.forEach((linkData) => {
    const link = document.createElement("a");
    link.href = linkData.href;
    link.textContent = linkData.text;
    footerUpContentRightLink.appendChild(link);
  });

  const footerDownContent = document.createElement("div");
  footerDownContent.className = "footerDownContent";

  const copyrightParagraph = document.createElement("p");
  copyrightParagraph.textContent = "Copyright Ⓒ HSWA All Rights Reserved.";

  footerUpContentLeft.appendChild(leftParagraph);
  footerUpContentRight.appendChild(footerUpContentRightLink);
  footerUpContent.appendChild(footerUpContentLeft);
  footerUpContent.appendChild(footerUpContentRight);
  footerDownContent.appendChild(copyrightParagraph);

  footer.appendChild(footerUpContent);
  footer.appendChild(footerDownContent);

  const footerContainer = document.getElementById("footerContainer");
  footerContainer.appendChild(footer);
});
