const names = ['Nessia', 'Noham', 'Adam n°1', 'Sophia', 'Louisa', 'Evann', 'Roman', 'Nathan', 'Adam n°2', 'Elya', 'Eléa', 'Grace', 'Allya', 'Tina', 'Jade', 'Emilie', 'Lenny', 'Emma', 'Aden', 'Christophe', 'Nicolas', 'Arthur', 'Hadjara', 'Anaïs'];
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const resultDisplay = document.getElementById('result');

const radius = canvas.width / 2;
let angle = 0;
let spinning = false;

function drawWheel() {
  const step = (2 * Math.PI) / names.length;

  for (let i = 0; i < names.length; i++) {
    const startAngle = i * step;
    const endAngle = startAngle + step;

    // Colorier chaque section
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, startAngle, endAngle);
    ctx.fillStyle = `hsl(${(i * 360) / names.length}, 70%, 60%)`;
    ctx.fill();
    ctx.stroke();

    // Texte dans les sections
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(startAngle + step / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.fillText(names[i], radius - 10, 5);
    ctx.restore();
  }
}

function spinWheel() {
  if (spinning) return; // Empêche le double clic si la roue est en train de tourner
  spinning = true;
  spinButton.disabled = true; // Désactive le bouton pendant la rotation

  let spinAngle = Math.random() * 360 + 720; // entre 2 et 3 tours
  let current = 0;

  // Réinitialiser l'angle pour un tour aléatoire
  angle = Math.random() * 360 + 360; // Ajouter une rotation plus importante pour chaque tour

  const spin = () => {
    current += 10;
    angle = (angle + 10) % 360; // Normalisation de l'angle à 360

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-radius, -radius);
    drawWheel();
    ctx.restore();

    if (current < spinAngle) {
      requestAnimationFrame(spin);
    } else {
      // Calcul de l'index basé sur l'angle
      const segmentAngle = 360 / names.length;
      let normalizedAngle = angle % 360;

      if (normalizedAngle < 0) normalizedAngle += 360;

      // Calcul de l'index du segment sélectionné
      const index = Math.floor((normalizedAngle + segmentAngle / 2) / segmentAngle);
      
      // S'assurer que l'index ne dépasse pas le tableau
      const selected = names[index % names.length];

      // Affichage du nom choisi
      resultDisplay.textContent = `🎉${selected}`;
      spinning = false;
      spinButton.disabled = false; // Réactive le bouton une fois le tirage terminé
    }
  };

  spin();
}

// Initialisation
drawWheel();
spinButton.addEventListener('click', spinWheel);