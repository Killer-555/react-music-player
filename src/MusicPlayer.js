import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

const tracks = [
  { title: 'Track 1', artist: 'Artist 1', src: '/music/I Am The Danger.mp3' },
  { title: 'Track 2', artist: 'Artist 2', src: '/music/Nakkal-Pudichavan-MassTamilan.mp3' },
  { title: 'Track 3', artist: 'Artist 3', src: '/music/Tappasu.mp3' },
];

const MusicPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex, isPlaying]);

  const loadTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const playPauseTrack = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(nextIndex);
  };

  const playPrevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(prevIndex);
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} src={tracks[currentTrackIndex].src} onEnded={playNextTrack} autoPlay />
      <div className="now-playing">
        <h2>{tracks[currentTrackIndex].title}</h2>
        <h3>{tracks[currentTrackIndex].artist}</h3>
      </div>
      <div className="controls">
        <button className="button" onClick={playPrevTrack} data-tooltip="Previous">
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button className="button button--play" onClick={playPauseTrack} data-tooltip="Play/Pause">
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button className="button" onClick={playNextTrack} data-tooltip="Next">
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
      <div className="track-list">
        <ul>
          {tracks.map((track, index) => (
            <li key={index} className={index === currentTrackIndex ? 'active' : ''} onClick={() => loadTrack(index)}>
              {track.title} - {track.artist}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MusicPlayer;
