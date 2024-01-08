import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";
import Queue from "../../src/data_structure/Queue";

describe('size', () => {

    it('correct size after enqueue', () => {
        let q: Queue<number> = new Queue<number>(5);
        q.enqueue(1)
        expect(q.getSize()).toBe(1);
    })

    it('correct size after dequeue', () => {
        let q: Queue<number> = new Queue<number>(5);
        q.enqueue(1)
        q.dequeue()
        expect(q.getSize()).toBe(0);
    })
})

describe('dequeue', () => {

    it('enqueue then dequeue success', () => {
        let q: Queue<number> = new Queue<number>(5);
        q.enqueue(1)
        let num = q.dequeue()
        expect(num).toBe(1);
    })
})


describe('copy', () => {

    it('correct size after copy', () => {
        let q: Queue<number> = new Queue<number>(5);
        q.enqueue(2)
        q.enqueue(22)

        let copy: Queue<number> = q.copy();
        expect(copy.getSize()).toBe(2)
    })

    it('correct elements after copy', () => {
        let q: Queue<number> = new Queue<number>(5);
        q.enqueue(2)
        q.enqueue(22)
        let copy: Queue<number> = q.copy()
        expect(copy.dequeue()).toBe(2);
        expect(copy.dequeue()).toBe(22);
    })
})