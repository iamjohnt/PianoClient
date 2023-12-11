import exp from "constants";
import {Countdown} from "../../src/game/countdown.js";
import { describe, expect, it } from "vitest";

describe("test vitest", () => {
    it("0 == 0", () => {
        let ct = new Countdown();
        expect(0).toBe(0);
    })
});