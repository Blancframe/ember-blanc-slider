export default function fadeSlide(newElement, oldElement, direction) {
  newElement.animate(
    [
      {
        transform: direction ? 'translateX(30px)' : 'translateX(-30px)',
        opacity: 0,
        visibility: 'hidden',
      },
      { transform: 'translateX(0px)', opacity: 1, visibility: 'visible' },
    ],
    {
      easing: 'ease-in-out',
      duration: 400,
      fill: 'forwards',
    }
  );

  oldElement.animate(
    [
      { transform: 'translateX(0)', opacity: 1, visibility: 'visible' },
      {
        transform: direction ? 'translateX(-30px)' : 'translateX(30px)',
        opacity: 0,
        visibility: 'hidden',
      },
    ],
    {
      easing: 'ease-in-out',
      duration: 400,
      fill: 'forwards',
    }
  );
}
