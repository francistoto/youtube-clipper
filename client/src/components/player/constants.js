export const YOUTUBE_CONFIG = {
    playerVars: {
        iv_load_policy: 3,
        disablekb: true,
        rel: 0
    }
};

export const BASE_NOTIFICATION_OPTIONS = {
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
        duration: 5000,
        onScreen: false
    }
};

export const MOMENT_OVERLAP_BUFFER = 1;
