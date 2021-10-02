import * as contributors from "./contributors";
import "./style.css";

const body = document.getElementsByTagName("body")[0];
const cardGrid = document.createElement("div");

const generateCard = ({ name, username }) => {
  const card = document.createElement("div");
  card.className = "card";

  return fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then(({ avatar_url, bio, public_repos, followers }) => {
      card.innerHTML = `
      <a href="https://github.com/${username}" rel="noopener noreferrer" target="_blank">
        <h3>${name || "Hacker"}</h3>
        <img src=${avatar_url} alt=${name} />
        <p>${`${bio || ""}`} </p> <br/>
        <p>${`📦 ${public_repos} • 👥 ${followers}`}</p>
      </a>
      `;

      return card;
    });
};

Object.keys(contributors).forEach((key) => {
  generateCard(contributors[key]).then((card) => cardGrid.appendChild(card));
});

cardGrid.className = "card-grid";
body.setAttribute("light-mode", localStorage.lightMode || "light");
body.appendChild(cardGrid);
