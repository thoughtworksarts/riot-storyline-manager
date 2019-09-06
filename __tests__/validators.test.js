import {isEndLaterThanStart, isSingleTimeValid, validateAllInputs, validateTime} from "../app/utilities/validators";
import json from './data/output';

describe('Output validation', () => {
	it('should validate json output', () => {
		const state = json;
		const frames = 24;
		const isValid = validateAllInputs(state, frames);

		expect(isValid).toEqual(true);
	})
});

describe('Input validation', () => {
	it('should return true for time within the correct minute, second, and frame range', () => {
		const validTime = isSingleTimeValid("00:12.003", 24);
		expect(validTime).toEqual(true)
	});

	it('should return false for time with frames outside frame range', () => {
		const validTime = isSingleTimeValid("00:12.123", 24);
		expect(validTime).toEqual(false)
	});

	it('should return false for time with seconds outside seconds range', () => {
		const validTime = isSingleTimeValid("00:63.001", 24);
		expect(validTime).toEqual(false)
	});

	it('should return true for start time before end time', () => {
		const validTime = isEndLaterThanStart(["00:01.001", "00:05.002"], 24);
		expect(validTime).toEqual(true)
	});

	it('should return false for start time later than end time', () => {
		const validTime = isEndLaterThanStart(["00:05.001", "00:01.002"], 24);
		expect(validTime).toEqual(false)
	});

	it('should return true for valid time range', () => {
		const validTime = validateTime(["00:01.001", "00:05.002"], 24, true);
		expect(validTime).toEqual(true)
	});

	it('should return false for invalid time range', () => {
		const validTime = validateTime(["00:05.001", "00:03.002"], 24, true);
		expect(validTime).toEqual(false)
	});
});


