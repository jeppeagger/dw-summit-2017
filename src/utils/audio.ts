export const getAudio = (path: string): HTMLAudioElement => {
    const audio = new Audio(path);
    return audio;
};