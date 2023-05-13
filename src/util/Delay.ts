
export function Delay() {
    console.log('run 0');
    var k = 999999999;
    var k2 = 6;
    while (k > 0 && k2 > 0) {
        k--;
        if (k === 0){
            k = 999999999;
            k2--;
        }
    }
    console.log('run end');
}