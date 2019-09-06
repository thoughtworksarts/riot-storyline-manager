export const isSingleTimeValid = (value, numberOfFrames) => {
	return (
		isTimeFormatValid(value)
		&& areFramesValid(value, numberOfFrames)
		&& areSecondsValid(value));
};

// Formatting also ensures minutes are only 2 digits
const isTimeFormatValid = (value) => {
	const regex = /^[0-9]{2,2}:[0-9]{2,2}\.[0-9]{2,2}/;
	return regex.test(value);
};

const areFramesValid = (value, numberOfFrames) => {
	let [,,frames] = value.split(/[:.]/);
	return (frames >=1  && frames <= numberOfFrames);
};

const areSecondsValid = (value) => {
	let [,seconds,] = value.split(/[:.]/);
	return (seconds >=0  && seconds < 60);
};

export const isRangeValid = (range, numberOfFrames) => {
	return isSingleTimeValid(range[0], numberOfFrames) && isSingleTimeValid(range[1], numberOfFrames)
};

export const isEndLaterThanStart = (range) => {
	const [startMins, startSeconds, startFrames] = range[0].split(/[:.]/).map((el) => Number(el));
	const [endMins, endSeconds, endFrames] = range[1].split(/[:.]/).map((el) => Number(el));

	return (startMins === endMins
			? (startSeconds === endSeconds
				? (startFrames === endFrames
					? true
					: endFrames > startFrames)
				: endSeconds > startSeconds)
			: endMins > startMins);
};

export function validateTime(range, numberOfFrames, valid) {
	const startTime = range[0];
	const endTime = range[1];

	if (!isSingleTimeValid(startTime, numberOfFrames)
		|| !isSingleTimeValid(endTime, numberOfFrames)
		|| !isEndLaterThanStart([startTime, endTime])) {
		valid = false;
	}
	return valid;
}

function validateStartAndStopTimes(key, valid, obj, numberOfFrames) {
	if (key === "start") {
		valid = validateTime([obj.start, obj.end], numberOfFrames, valid);
	}
	return valid;
}

export const validateAllInputs = (state, numFrames) => {
	let valid = true;

	let traverser = (obj) => {
	  if (typeof obj == "object") {
        Object.entries(obj).forEach(([key, value]) => {
            valid = validateStartAndStopTimes(key, valid, obj, numFrames);
            if (key === "outcome" && typeof value != "number") {
            	valid = false
			}
            traverser(value);
        });
	  }
	};

	traverser(state);
	return valid;
};
