import CountdownV2 from "../src/game/CountdownTimeout";
import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";


const mock = vi.fn(() => console.log('executed'))

beforeEach(() => {
    vi.useFakeTimers();
})

afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
})

describe('when countdown is done', () => {

    it('mock should execute when timer done', () => {
        let ctdn = new CountdownV2(mock, 100);
        ctdn.startOrRestartCountdown();
        vi.runAllTimers()
        expect(mock).toHaveBeenCalledTimes(1)
    })

    it('mock should execute when timer exactly 100', () => {
        let ctdn = new CountdownV2(mock, 100);
        ctdn.startOrRestartCountdown();
        vi.advanceTimersByTime(100);
        expect(mock).toHaveBeenCalled();``
    })

})

describe('when countdown is NOT done', () => {

    it('mock should NOT execute when timer at 50', () => {
        let ctdn = new CountdownV2(mock, 100);
        ctdn.startOrRestartCountdown();
        vi.advanceTimersByTime(50);
        expect(mock).not.toHaveBeenCalled();
    })

    it('mock should NOT execute when timer at 99', () => {
        let ctdn = new CountdownV2(mock, 100);
        ctdn.startOrRestartCountdown();
        vi.advanceTimersByTime(99);
        expect(mock).not.toHaveBeenCalled();
    })

});


describe('when countdown is refreshed midway, and then finishes', () => {

    it('mock should execute once when restarted then done', () => {
        let ctdn = new CountdownV2(mock, 100);
        ctdn.startOrRestartCountdown();
        vi.advanceTimersByTime(75);

        ctdn.startOrRestartCountdown();
        vi.runAllTimers();

        expect(mock).toHaveBeenCalledTimes(1);
    })

    it('mock should execute once when restarted then advance timer by 100', () => {
        let ctdn = new CountdownV2(mock, 100);
        ctdn.startOrRestartCountdown();
        vi.advanceTimersByTime(75);

        ctdn.startOrRestartCountdown();
        vi.advanceTimersByTime(100);

        expect(mock).toHaveBeenCalledTimes(1);
    })
    
});

describe('when countdown is refreshed midway, but isnt finished yet', () => {

    it('mock should NOT execute, when refreshed at 90, and advance 90 ms more', () => {
        let ctdn = new CountdownV2(mock, 100);
        ctdn.startOrRestartCountdown();
        vi.advanceTimersByTime(90);

        ctdn.startOrRestartCountdown();
        vi.advanceTimersByTime(90);

        expect(mock).toHaveBeenCalledTimes(0);
    })

    it('mock should NOT execute, when refreshed at 99, and advance 99 ms more', () => {
        let ctdn = new CountdownV2(mock, 100);
        ctdn.startOrRestartCountdown();
        vi.advanceTimersByTime(99);

        ctdn.startOrRestartCountdown();
        vi.advanceTimersByTime(99);

        expect(mock).toHaveBeenCalledTimes(0);
    })
    
});

describe('when countdown is finished, then restarted again, then finishes again', () => {

    it('mock should execute 2 times', () => {
        let ctdn = new CountdownV2(mock, 100);
        ctdn.startOrRestartCountdown();
        vi.runAllTimers();

        ctdn.startOrRestartCountdown();
        vi.runAllTimers();

        expect(mock).toHaveBeenCalledTimes(2);
    })

    it('mock should execute 2 times, when timer advanced to 100, time restarted, then timer advanced to 100 again', () => {
        let ctdn = new CountdownV2(mock, 100);
        ctdn.startOrRestartCountdown();
        vi.advanceTimersByTime(100);

        ctdn.startOrRestartCountdown();
        vi.advanceTimersByTime(100);

        expect(mock).toHaveBeenCalledTimes(2);
    })
    
});