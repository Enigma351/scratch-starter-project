export const checkCollision = (sprite1, sprite2) => {
  const dx = sprite1.position.x - sprite2.position.x;
  const dy = sprite1.position.y - sprite2.position.y;

  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < 60;
};

export const findCollisionPairs = (sprites) => {
  const pairs = [];

  for (let i = 0; i < sprites.length; i++) {
    for (let j = i + 1; j < sprites.length; j++) {
      const first = sprites[i];
      const second = sprites[j];

      if (checkCollision(first, second)) {
        pairs.push([i, j]);
      }
    }
  }

  return pairs;
};
