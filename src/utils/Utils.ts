export function shuffle<T>(array: T[]): T[] {
    const from = [...array]
    const to: T[] = []
    while (from.length) {
        const element = from.splice(Math.floor(Math.random() * from.length), 1)
        to.push(...element)
    }
    return to
}


export function test1(){
    console.log("test1")
}

export default function test2(){
    console.log("test2")
}
