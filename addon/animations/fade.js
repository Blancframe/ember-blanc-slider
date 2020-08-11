export default function fade(newElement, oldElement) {
  newElement.animate(
    [
      {
        opacity: 0,
      },
      { opacity: 1 },
    ],
    {
      easing: 'ease-in-out',
      duration: 400,
      fill: 'forwards',
    }
  );

  oldElement.animate(
    [
      { opacity: 1 },
      {
        opacity: 0,
      },
    ],
    {
      easing: 'ease-in-out',
      duration: 400,
      fill: 'forwards',
    }
  );
}
