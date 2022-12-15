import Puzzle from '../../types/AbstractPuzzle';

interface Monkie {
    items: number[];
    operation: "+" | "*";
    operationValue: number | "old";
    test: number;
    ifTrueGoTo: number;
    ifFalseGoTo: number;
    itemsInspected: number;
}   
 // great-common divisor of 2 numbers
const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);

// least-common multiple of 2 numbers
export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

export default class ConcretePuzzle extends Puzzle {

    private getMonkies(): Monkie[] {
        return this.input.split("\n\n").map((monkie) => {
            const monkieItems = monkie.split("\n")
            // gets the starting items of the monkies and converts them to numbers
            const items = monkieItems[1].slice(monkieItems[1].indexOf(": ") + 2).split(", ").map((item) => Number(item))
            const operation = monkieItems[2].includes("+") ? "+" : "*"
            // get the string at the 22 index and beyond
            const opValuePreSanative = monkieItems[2].slice(25)
            const operationValue = opValuePreSanative === "old" ? "old" : Number(opValuePreSanative)
            const test = Number(monkieItems[3].slice(monkieItems[3].indexOf("by ") + 3).slice(0, 2))
            const ifTrueCondition = Number(monkieItems[4].slice(monkieItems[4].indexOf("y ") + 2).slice(0, 2))
            const ifFalseCondition = Number(monkieItems[5].slice(monkieItems[5].indexOf("y ") + 2).slice(0, 2))
            return {items: items, operation: operation, operationValue: operationValue, test: test, ifTrueGoTo: ifTrueCondition, ifFalseGoTo: ifFalseCondition, itemsInspected: 0}
        })
    }

  public solveFirst(): string {
    const monkies = this.getMonkies()
    // loop 20 times
    for (let i = 0; i < 20; i++) {
        monkies.forEach((monkie) => {
            // lop through the items of the monkie
            for (let j = 0; j < monkie.items.length; j++) {
                let item = monkie.items[j]
                // inspect item and adds the correct values
                if (monkie.operation === "+") {
                    item = item + (monkie.operationValue === "old" ? item : monkie.operationValue)
                } else if (monkie.operation === "*") {
                    item = item * (monkie.operationValue === "old" ? item : monkie.operationValue)
                } 
                // item inspected
                monkie.itemsInspected++
                item  = Math.floor(item / 3)

                // do the checks
                if (item % monkie.test === 0) {
                    // if true send value to
                    monkies[monkie.ifTrueGoTo].items.push(item)
                } else {
                    // if false send value to
                    monkies[monkie.ifFalseGoTo].items.push(item)
                }
            }
            monkie.items = []
        })
       
    }
     // make a array of the monkies itemsInspected
    const itemsInspected = monkies.map((monkie) => monkie.itemsInspected).sort((a, b) => b - a)
    return (itemsInspected[0] * itemsInspected[1]).toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return '72884';
  }

  public solveSecond(): string {
    const monkies = this.getMonkies()
    const divisors: number[] = [];
    monkies.forEach((m) => divisors.push(m.test));
    const manageableLvl = divisors.reduce(lcm);

    // loop 10000 times
    for (let i = 0; i < 10000; i++) {
        monkies.forEach((monkie) => {
            // lop through the items of the monkie
            for (let j = 0; j < monkie.items.length; j++) {

                if (monkie.items.length === 0) continue
                let item = monkie.items[j]
                // inspect item and adds the correct values
                if (monkie.operation === "+") {
                    item = item + (monkie.operationValue === "old" ? item : monkie.operationValue)
                } else if (monkie.operation === "*") {
                    item = item * (monkie.operationValue === "old" ? item : monkie.operationValue)
                } 
                // item inspected
                monkie.itemsInspected++
                item %= manageableLvl

                // do the checks
                if (item % monkie.test === 0) {
                    // if true send value to
                    monkies[monkie.ifTrueGoTo].items.push(item)
                } else {
                    // if false send value to
                    monkies[monkie.ifFalseGoTo].items.push(item)
                }
            }
            monkie.items = [];
        })
       
    }
     // make a array of the monkies itemsInspected
    const itemsInspected = monkies.map((monkie) => monkie.itemsInspected).sort((a, b) => b - a)
    return (itemsInspected[0] * itemsInspected[1]).toString();
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return '15310845153';
  }
}
