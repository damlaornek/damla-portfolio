const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const assistantOverlay = document.querySelector("#assistantOverlay");
const openAssistantButtons = [
  document.querySelector("#openAssistant"),
  document.querySelector("#openAssistantBand")
].filter(Boolean);
const closeAssistantButton = document.querySelector("#closeAssistant");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatMessages = document.querySelector("#chatMessages");

document.querySelector("#year").textContent = new Date().getFullYear();

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

function openAssistant() {
  assistantOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  window.setTimeout(() => chatInput?.focus(), 50);
}
function closeAssistant() {
  assistantOverlay.hidden = true;
  document.body.style.overflow = "";
}
openAssistantButtons.forEach((button) => button.addEventListener("click", openAssistant));
closeAssistantButton?.addEventListener("click", closeAssistant);
assistantOverlay?.addEventListener("click", (event) => {
  if (event.target === assistantOverlay) closeAssistant();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !assistantOverlay.hidden) closeAssistant();
});

function addMessage(text, role) {
  const bubble = document.createElement("div");
  bubble.className = `chat-message ${role === "user" ? "user-message" : "assistant-message"}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}

async function sendMessage(message) {
  addMessage(message, "user");
  const loading = addMessage("Yanıt hazırlanıyor…", "assistant-message typing");
  const sendButton = chatForm.querySelector("button[type='submit']");
  sendButton.disabled = true;
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await response.json().catch(() => ({}));
    loading.remove();
    if (!response.ok) {
      addMessage(data.error || "Bir sorun oluştu. Lütfen daha sonra tekrar dene.", "assistant");
      return;
    }
    addMessage(data.answer || "Yanıt alınamadı. Lütfen tekrar dene.", "assistant");
  } catch {
    loading.remove();
    addMessage("Sunucuya ulaşılamadı. Projeyi Node.js sunucusu üzerinden çalıştırdığından emin ol.", "assistant");
  } finally {
    sendButton.disabled = false;
    chatInput.focus();
  }
}

chatForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  chatInput.value = "";
  await sendMessage(message);
});
chatInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});
document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    const prompt = button.getAttribute("data-prompt");
    if (prompt) sendMessage(prompt);
  });
});

// Progressive reveal: content remains visible if IntersectionObserver is unavailable.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}