import * as contributors from "./contributors";
import "./style.css";

const body = document.getElementsByTagName("body")[0];
body.setAttribute("light-mode", localStorage.lightMode || "light");

const generateCard = ({
  avatar_url,
  bio,
  public_repos,
  followers,
  name,
  login
}) => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
      <a href="https://github.com/${login}" rel="noopener noreferrer" target="_blank">
        <h3>${name || "Hacker"}</h3>
        <img src=${avatar_url} alt=${name} />
        <p>${`${bio || ""}`} </p> <br/>
        <p>${`📦 ${public_repos} • 👥 ${followers}`}</p>
      </a>
      `;

  return card;
};

const generateCardGrid = (contributors) => {
  if (document.contains(document.querySelector(".card-grid")))
    document.querySelector(".card-grid").remove();

  const cardGrid = document.createElement("div");
  cardGrid.className = "card-grid";

  contributors.forEach((contributor) =>
    cardGrid.appendChild(generateCard(contributor))
  );

  body.appendChild(cardGrid);
};

const cachedContributors =
  JSON.parse(localStorage.getItem("contributors")) || [];
const allContributors = cachedContributors;

const loading = document.createElement("div");
loading.className = "loading";
body.appendChild(loading);

Promise.all(
  Object.values(contributors)
    .filter(
      (contributor) =>
        !cachedContributors.find(
          (cached) => cached.login === contributor.username
        )
    )
    .map(({ username }) =>
      fetch(`https://api.github.com/users/${username}`).then((response) =>
        response.json().then((contributor) => {
          allContributors.push(contributor);
        })
      )
    )
).then(() => {
  body.removeChild(loading);
  localStorage.setItem("contributors", JSON.stringify(allContributors));
  generateCardGrid(allContributors);
});
