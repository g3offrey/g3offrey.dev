import "./style.css";

const $cmdForm = document.querySelector("#cmd-form");
const $cmdInput = document.querySelector("#cmd-form__input");
const $cmdResults = document.querySelector("#cmd-results");

async function gpg() {
  const response = await fetch("/gpg.public.asc");
  const gpgKey = await response.text();
  return `<pre>${gpgKey}</pre>`;
}

function whoAmI() {
  const infos = {
    name: "Geoffrey",
    nickname: "g3offrey",
    interests: ["Hiking", "Record Digging", "Video games", "Tech", "Sciences"],
    stack: [
      "HTML / CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Vue",
      "Node.js",
      "Go",
      "MongoDB",
      "PostgreSQL",
      "Nats",
      "Docker",
      "Kubernetes",
      "Linux",
    ],
    agile: true,
    craftman: true,
    mainPreviousProjects: [
      "AcySMS",
      "AcyMailing",
      "LinkValue",
      "Gutenberg Technology",
      "Club Med",
      "Euronews",
      "Bedrock Streaming (M6 web)",
      "Adeo",
      "mon-marché.fr",
      "eSNCF"
    ],
    openSourceContributions: [
      "Visual Studio Code",
      "Netdata",
      "Danger JS",
      "Tailwind CSS",
      "Blitz.js",
      "Appwrite",
      "React Admin",
      "Joomla",
    ],
  };

  return `<pre>${JSON.stringify(infos, null, 4)}</pre>`;
}

async function executeCmd(cmd) {
  switch (cmd) {
    case "rm -rf /":
      location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      return "bye bye";
    case "clear":
      location.reload();
      return "";
    case "whoami":
      return whoAmI();
    case "contact":
      return `<a href="mailto:contact@g3offrey.dev">contact@g3offrey.dev</a>`;
    case "git":
      return `<a target="__blank" href="https://github.com/g3offrey">https://github.com/g3offrey</a>`;
    case "pgp":
    case "gpg":
      return gpg();
    default:
      return `Command "${cmd}" not found`;
  }
}

function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

function displayResult(cmd, result) {
  const resultHTMLTag = document.createElement("li");
  resultHTMLTag.innerHTML = `
        <p class="cmd-results__prompt">${cmd}</p>
        <p class="cmd-results__result">${result}</p>
    `;

  $cmdResults.appendChild(resultHTMLTag);
  scrollToBottom();
}

$cmdForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const cmd = formData.get("cmd");

  if (!cmd) {
    return;
  }

  const commandResult = await executeCmd(cmd);
  displayResult(cmd, commandResult);

  e.target.reset();
});

document.addEventListener("click", () => {
  const selection = window.getSelection();

  if (selection.type === "Range") {
    return;
  }

  $cmdInput.focus();
});

document.addEventListener("keyup", () => {
  $cmdInput.focus();
});
