export default function nextArrayIndex(currentIndex, array) {
  if (currentIndex == array.length - 1) {
    return 0;
  } else {
    return +currentIndex + 1;
  }
}
