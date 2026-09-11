const journalText = `Feeling a Little Lost?
A 7-Day Challenge to Notice What Still Feels Like Home

Return to the journey:
https://cozyreflectiondaily.github.io/

Seven reflections. Seven pauses. Take them at your own pace.

Day 1: Notice
What has become so familiar to me that I forgot it was part of what made this place feel like mine?

My reflection:


Day 2: Listen
Which ordinary sound would I recognize as part of my life even with my eyes closed?

My reflection:


Day 3: Remember
If this object could remember for me, what part of my life would it refuse to let disappear?

My reflection:


Day 4: Comfort
What small ritual has been caring for me so quietly that I stopped recognizing it as comfort?

My reflection:


Day 5: Belonging
Whose presence, including my own, has quietly become part of what home means to me?

My reflection:


Day 6: Change
What have I been trying to return to, even though home itself has already changed?

My reflection:


Day 7: Return
Right now, home feels a little like...

If home is allowed to change as I do, what am I beginning to recognize as home now?

My reflection:


Closing Reflection
What did I notice through this journey that I hope never becomes invisible to me again?

My reflection:


Some reflections need a little longer to become words.

Cozy Reflection Daily`;

const shareData = {
  title: "Feeling a Little Lost? | Cozy Reflection Daily",
  text: "A gentle 7-part reflection journey to notice the objects, sounds, memories, rituals, people, and changes that still make somewhere feel like home.",
  url: "https://cozyreflectiondaily.github.io/"
};

const status = document.getElementById("action-status");
const copyButton = document.getElementById("copy-journal");
const shareButton = document.getElementById("share-journey");

function announce(message) {
  status.textContent = message;
  window.clearTimeout(announce.timeout);
  announce.timeout = window.setTimeout(() => {
    status.textContent = "";
  }, 5000);
}

function temporaryButtonLabel(button, message) {
  const original = button.textContent;
  button.textContent = message;
  window.setTimeout(() => {
    button.textContent = original;
  }, 2200);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

copyButton.addEventListener("click", async () => {
  try {
    await copyText(journalText);
    temporaryButtonLabel(copyButton, "Journal copied");
    announce("The 7-Day Journal was copied. Paste it somewhere that feels like yours.");
  } catch (error) {
    announce("The journal could not be copied automatically. Please try again in another browser.");
  }
});

shareButton.addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      temporaryButtonLabel(shareButton, "Shared");
      announce("Thank you for sharing the journey.");
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  try {
    await copyText(shareData.url);
    temporaryButtonLabel(shareButton, "Link copied");
    announce("Sharing is not available here, so the journey link was copied instead.");
  } catch (error) {
    announce("The journey link could not be copied automatically. Please copy it from your address bar.");
  }
});
