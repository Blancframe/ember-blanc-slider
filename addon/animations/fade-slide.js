export default function fadeSlide(newElement, oldElement, direction) {
  newElement.animate(
    [
      {
        transform: direction ? 'translateX(30px)' : 'translateX(-30px)',
        opacity: 0,
      },
      { transform: 'translateX(0px)', opacity: 1 },
    ],
    {
      easing: 'ease-in-out',
      duration: 400,
      fill: 'forwards',
    }
  );

  oldElement.animate(
    [
      { transform: 'translateX(0)', opacity: 1 },
      {
        transform: direction ? 'translateX(-30px)' : 'translateX(30px)',
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
