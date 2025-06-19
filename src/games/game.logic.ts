export function getRandom4DigitNumber(): number {
    const digits: number[] = [];
    while (digits.length < 4) {
        const digit = Math.floor(Math.random() * 9) + 1; 
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    return Number(digits.join(''));
}
