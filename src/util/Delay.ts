
export function Delay() {
    console.log('run 0');
    var k = 999999999;
    while (k > 0) {
        k--;
    }
    console.log('run end');
}