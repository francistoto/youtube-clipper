import { MOMENT_OVERLAP_BUFFER } from "./constants";

export const checkForMomentOverlap = (newMoment, moments) => {
    return moments.reduce((overlap, moment) => {
        // Establish validation for timestamp locations relative to the current moment with a buffer of 1 second
        const startBefore = newMoment.startTime < (moment.startTime - MOMENT_OVERLAP_BUFFER);
        const startDuring = newMoment.startTime > (moment.startTime - MOMENT_OVERLAP_BUFFER) &&
                            newMoment.startTime < (moment.stopTime + MOMENT_OVERLAP_BUFFER);
        const stopAfter = newMoment.stopTime > (moment.stopTime + MOMENT_OVERLAP_BUFFER);
        const stopDuring = newMoment.stopTime > (moment.startTime - MOMENT_OVERLAP_BUFFER) &&
                            newMoment.stopTime < (moment.stopTime + MOMENT_OVERLAP_BUFFER);

        // Set cases for determining moment overlap
        const case1 = startBefore && stopAfter;
        const case2 = startBefore && stopDuring;
        const case3 = startDuring && stopAfter;
        const case4 = startDuring && stopDuring;

        if (case1 || case2 || case3 || case4) {
            return true;
        }

        return overlap;
    }, false);
};

export const getVideoUrl = (currentVideo) => {
    let videoUrl = '';

    if (currentVideo.platform === 'youtube') {
        videoUrl = `https://www.youtube.com/watch?v=${currentVideo.url}`;
    }

    return videoUrl;
};

export const renderTime = (totalSeconds) => {
    if (totalSeconds !== null) {
        let wholeSeconds = Math.round(totalSeconds); // 347

        const hours = Math.floor(totalSeconds / 3600);
        wholeSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = wholeSeconds % 60;

        const displayHours = hours <= 0 ? '' : `${hours}:`;
        const displayMinutes = hours > 0 ? `0${minutes}` : minutes;
        const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${displayHours}${displayMinutes}:${displaySeconds}`;
    }

    return '--:--:--';
};
