
const status = document.getElementById("action-status");

function announce(message) {
  status.textContent = message;
  window.clearTimeout(announce.timeout);
  announce.timeout = window.setTimeout(() => {
    status.textContent = "";
  }, 5000);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
}

const starters = `Dear younger me...

I know you were afraid of...

I wish you could see...

I am sorry you had to...

Thank you for...

You do not know this yet, but...

A Letter I Wish You Could Read
Cozy Reflection Daily
https://cozyreflectiondaily.github.io/letter-to-younger-self/`;

document.getElementById("copy-starters").addEventListener("click", async () => {
  try {
    await copyText(starters);
    announce("The letter starters were copied. Paste them somewhere that feels private enough for you.");
  } catch {
    announce("The letter starters could not be copied automatically. Please try again in another browser.");
  }
});

document.getElementById("share-reflection").addEventListener("click", async () => {
  const publicUrl = "https://cozyreflectiondaily.github.io/letter-to-younger-self/";
  const pageUrl =
    location.protocol === "http:" || location.protocol === "https:"
      ? location.href
      : publicUrl;

  const shareData = {
    title: "A Letter I Wish You Could Read | Cozy Reflection Daily",
    text: "A quiet reflection journey for the person you used to be.",
    url: pageUrl
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      announce("Thank you for sharing the reflection.");
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  try {
    await copyText(pageUrl);
    announce("Sharing is not available here, so the page link was copied instead.");
  } catch {
    announce("The page link could not be copied automatically. Please copy it from your address bar.");
  }
});
