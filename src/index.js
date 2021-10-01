import * as contributors from "./contributors";
import "./style.css";

const cardGrid = document.createElement("div");

const generateCard = ({ name, username }) => {
  const card = document.createElement("div");
  card.className = "card";

  return fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then(({ avatar_url, bio, public_repos, followers }) => {
      card.innerHTML = `
      <a href="https://github.com/${username}" rel="noopener noreferrer" target="_blank">
        <h3>${name || "Hackerman"}</h3>
        <img src=${avatar_url} alt=${name} />
        <p>${bio || `Repos: ${public_repos} - Followers: ${followers}`}</p>
      </a>
      `;

      return card;
    });
};

Object.keys(contributors).forEach((key) => {
  generateCard(contributors[key]).then((card) => cardGrid.appendChild(card));
});

cardGrid.className = "card-grid";
document.getElementsByTagName("body")[0].appendChild(cardGrid);
