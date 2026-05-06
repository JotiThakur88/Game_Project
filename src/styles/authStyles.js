const style = document.createElement("style");

style.innerHTML = `
.auth-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  /* 🎮 YOUR IMAGE */
  background-image: url("/images/girl-gaming.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  position: relative;
  overflow: hidden;
}

/* DARK GAMING OVERLAY */
.auth-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0,0,0,0.7),
    rgba(0,0,30,0.6),
    rgba(0,0,0,0.8)
  );
  z-index: 1;
}

/* LOGIN BOX */
.auth-box {
  position: relative;
  z-index: 2;

  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(15px);

  padding: 30px;
  width: 340px;
  border-radius: 14px;

  box-shadow: 0 0 30px rgba(0,255,255,0.2);
  color: white;

  animation: fadeUp 0.8s ease;
}

/* INPUT */
input {
  width: 100%;
  margin: 8px 0;
  padding: 10px;

  border: none;
  border-radius: 8px;
  outline: none;
}

/* BUTTON */
button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;

  background: cyan;
  color: black;
  font-weight: bold;

  border: none;
  border-radius: 8px;
  cursor: pointer;

  transition: 0.3s;
}

button:hover {
  transform: scale(1.05);
}

/* TEXT */
.toggle-text span {
  color: cyan;
  cursor: pointer;
}

/* 🎬 MODERN MOVING BACKGROUND */
@keyframes bgMove {
  0% {
    transform: scale(1) translateY(0px);
  }
  50% {
    transform: scale(1.1) translateY(-10px);
  }
  100% {
    transform: scale(1) translateY(0px);
  }
}

/* apply animation via pseudo layer */
.auth-container {
  animation: bgMove 12s ease-in-out infinite;
}

/* LOGIN BOX ANIMATION */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

document.head.appendChild(style);