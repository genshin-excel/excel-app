export function formatFloatNumber(number: number): string {
  const roundedNumber = number.toFixed(2);
  return roundedNumber.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}
