export default function nextArrayIndex(currentIndex, array) {
  return ++currentIndex % array.length;
}
