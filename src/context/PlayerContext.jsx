import { createContext, useContext, useEffect, useRef, useState } from "react";

const PlayerContext = createContext();

const NEXT_SONG_DELAY = 2000;

export function PlayerProvider({ children }) {

  const audioRef = useRef(new Audio());

  const currentSongRef = useRef(null);
  const playlistSongsRef = useRef([]);

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);

  const [repeatCount, setRepeatCount] = useState(0);
  const [repeatLeft, setRepeatLeft] = useState(0);

  const [loopStart, setLoopStart] = useState(null);

  const [loopEnd, setLoopEnd] = useState(null);

  const [partLoopEnabled, setPartLoopEnabled] = useState(false);

  const [partLoopCount, setPartLoopCount] = useState(0);

  const [partLoopLeft, setPartLoopLeft] = useState(0);

  const [playlistSongs, setPlaylistSongs] = useState([]);

  const [repeatPlaylist, setRepeatPlaylist] = useState(false);

  const repeatPlaylistRef = useRef(false);

  const partLoopLeftRef = useRef(0);

  async function playSong(song, songs = playlistSongsRef.current) {

    stopPartLoop();

    setPlaylistSongs(songs);
    playlistSongsRef.current = songs;

    if (currentSongRef.current?.id !== song.id) {

      audioRef.current.src = song.url;

      setCurrentSong(song);
      currentSongRef.current = song;

    }

    await audioRef.current.play();

    setIsPlaying(true);

  }

  function pauseSong() {

    audioRef.current.pause();

    setIsPlaying(false);

  }

  async function toggleSong(song, songs = playlistSongsRef.current) {

    if (currentSongRef.current?.id === song.id && isPlaying) {

      pauseSong();

    } else {

      await playSong(song, songs);

    }

  }

  async function nextSong() {

    const songs = playlistSongsRef.current;
    const current = currentSongRef.current;

    if (!current) return;

    const index = songs.findIndex(
      song => song.id === current.id
    );

    if (songs.length === 0) return;

  if (index === songs.length - 1) {

    if (repeatPlaylistRef.current) {

      await playSong(songs[0], songs);

    }

    return;

  }

    await playSong(songs[index + 1], songs);
}

  async function previousSong() {

    const songs = playlistSongsRef.current;
    const current = currentSongRef.current;

    if (!current) return;

    const index = songs.findIndex(
      song => song.id === current.id
    );

    if (index <= 0) return;

    await playSong(songs[index - 1], songs);

  }

  function seek(value) {

    audioRef.current.currentTime = Number(value);

    setCurrentTime(Number(value));

  }

  function changeVolume(value) {

    const vol = Number(value);

    audioRef.current.volume = vol;

    setVolume(vol);

  }

  function startRepeat(times) {

    stopPartLoop();

    setRepeatCount(times);
    setRepeatLeft(times);

  }

  function stopRepeat() {

    setRepeatCount(0);
    setRepeatLeft(0);

  }

  function startPartLoop(start, end, count) {

    stopRepeat();

  setLoopStart(start);

  setLoopEnd(end);

  setPartLoopCount(count);

  setPartLoopLeft(count);

  partLoopLeftRef.current = count; 

  setPartLoopEnabled(true);

  audioRef.current.currentTime = start;

  audioRef.current.play();

}

function stopPartLoop() {

    partLoopLeftRef.current = 0;

  setPartLoopLeft(0);

  setPartLoopCount(0);

  setPartLoopEnabled(false);

  setLoopStart(null);

  setLoopEnd(null);

}

  function toggleRepeatPlaylist() {

    const value = !repeatPlaylistRef.current;

    repeatPlaylistRef.current = value;

   setRepeatPlaylist(value);

  }


  function formatTime(seconds) {

    if (!seconds || isNaN(seconds)) return "0:00";

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);

    return `${min}:${sec.toString().padStart(2, "0")}`;

  }

  useEffect(() => {

    const audio = audioRef.current;

    function updateTime() {

      setCurrentTime(audio.currentTime);

      if (
    partLoopEnabled &&
    loopEnd !== null &&
    audio.currentTime >= loopEnd
  ) {

    if (partLoopLeftRef.current > 1) {

        partLoopLeftRef.current--;

    setPartLoopLeft(partLoopLeftRef.current);

    audio.currentTime = loopStart;

    audio.play();

  }
  else{

    partLoopLeftRef.current = 0;

    setPartLoopLeft(0);

    stopPartLoop();

    audio.currentTime = loopEnd;

    return;
  }
}
}

    function updateDuration() {

      setDuration(audio.duration || 0);

    }

    async function songEnded() {

      if (repeatLeft > 1) {

        setRepeatLeft(prev => prev - 1);

        audio.currentTime = 0;

        await audio.play();

        setIsPlaying(true);

        return;

      }

      if (repeatLeft === 1) {

        setRepeatLeft(0);

      }

      const songs = playlistSongsRef.current;
      const current = currentSongRef.current;

      const index = songs.findIndex(
        song => song.id === current?.id
      );

      if (index !== -1 && index < songs.length - 1) {

        await new Promise(resolve =>
          setTimeout(resolve, NEXT_SONG_DELAY)
        );

await playSong(
  songs[index + 1],
  songs 
);

      } else if(repeatPlaylistRef.current && songs.length > 0 ){

        await new Promise(resolve =>
            setTimeout(resolve,NEXT_SONG_DELAY)
        );

        await playSong(
            songs[0],
            songs
        );
    }
      else {

        setIsPlaying(false);

      }

    }

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", songEnded);

    return () => {

      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", songEnded);

    };

  }, [repeatLeft, repeatPlaylist, partLoopEnabled, loopStart, loopEnd]);

  return (

    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        toggleSong,
        playSong,
        pauseSong,
        nextSong,
        previousSong,
        seek,
        changeVolume,
        repeatCount,
        repeatLeft,
        startRepeat,
        stopRepeat,
        repeatPlaylist,
        toggleRepeatPlaylist,
        startPartLoop,
        stopPartLoop,
        partLoopEnabled,
        formatTime,
        audioRef
      }}
    >

      {children}

    </PlayerContext.Provider>

  );

}

export function usePlayer() {

  return useContext(PlayerContext);

}