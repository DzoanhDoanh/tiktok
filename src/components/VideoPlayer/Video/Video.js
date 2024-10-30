import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpShortWide, faHeartCrack, faMusic } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { MoreIcon } from '../../Icons/Icons';
import Tippy from '@tippyjs/react/headless';
import {
    faPlay,
    faPause,
    // faStop,
    // faExpand,
    // faCompress,
    faVolumeUp,
    faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import SwitchButton from '../../SwitchButton';

const cx = classNames.bind(styles);

function Video(props, { thumbnail }) {
    const videoRef = useRef(null);
    const intervalRef = useRef(null);
    var timeOutRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // const [isFullScreen, setIsFullScreen] = useState(false);
    const [showPlayButton, setShowPlayButton] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [useNativeControls, setUseNativeControls] = useState(window.innerWidth < 767);

    useEffect(() => {
        const handleResize = () => {
            setUseNativeControls(window.innerWidth < 767);
        };
        window.addEventListener('resize', handleResize);

        const video = videoRef.current;

        const handleVideoEnd = () => {
            setIsPlaying(false);
            setProgress(0);
            stopProgressLoop();
        };

        if (video) {
            video.addEventListener('ended', handleVideoEnd);
        }
        return () => {
            if (video) {
                video.removeEventListener('ended', handleVideoEnd);
            }
            if (timeOutRef.current) {
                clearTimeout(timeOutRef.current);
            }
            stopProgressLoop();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const updateProgress = () => {
        if (videoRef.current) {
            const value = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(value);
        }
    };

    const startProgressLoop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            updateProgress();
        }, 1000);
    };

    const stopProgressLoop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
                startProgressLoop();
                setShowPlayButton(true);
                timeOutRef.current = setTimeout(() => {
                    setShowPlayButton(false);
                }, 2000);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
                stopProgressLoop();
                setShowPlayButton(true);
                timeOutRef.current = setTimeout(() => {
                    setShowPlayButton(false);
                }, 2000);
            }
        }
    };
    // const stopVideo = () => {
    //     if (videoRef.current) {
    //         videoRef.current.pause();
    //         videoRef.current.currentTime = 0;
    //         setIsPlaying(false);
    //     }
    // };

    const handleSeek = (event) => {
        const seekTo = (event.target.value / 100) * videoRef.current.duration;
        videoRef.current.currentTime = seekTo;
        setProgress(event.target.value);
    };

    const toggleMute = () => {
        const currentVolume = videoRef.current.volume;
        if (currentVolume > 0) {
            videoRef.current.volume = 0;
            setVolume(0);
            setIsMuted(true);
        } else {
            videoRef.current.volume = 1;
            setVolume(1);
            setIsMuted(false);
        }
    };
    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    // const toggleFullScreen = () => {
    //     if (!isFullScreen) {
    //         if (videoRef.current.requestFullscreen) {
    //             videoRef.current.requestFullscreen();
    //         } else if (videoRef.current.mozRequestFullScreen) {
    //             /* Firefox */
    //             videoRef.current.mozRequestFullScreen();
    //         } else if (videoRef.current.webkitRequestFullscreen) {
    //             /* Chrome, Safari & Opera */
    //             videoRef.current.webkitRequestFullscreen();
    //         } else if (videoRef.current.msRequestFullscreen) {
    //             /* IE/Edge */
    //             videoRef.current.msRequestFullscreen();
    //         }
    //     } else {
    //         if (document.exitFullscreen) {
    //             document.exitFullscreen();
    //         } else if (document.mozCancelFullScreen) {
    //             /* Firefox */
    //             document.mozCancelFullScreen();
    //         } else if (document.webkitExitFullscreen) {
    //             /* Chrome, Safari and Opera */
    //             document.webkitExitFullscreen();
    //         } else if (document.msExitFullscreen) {
    //             /* IE/Edge */
    //             document.msExitFullscreen();
    //         }
    //     }
    //     setIsFullScreen(!isFullScreen);
    // };
    // document.addEventListener('fullscreenchange', () => {
    //     setIsFullScreen(!!document.fullscreenElement);
    // });
    // useEffect(() => {
    //     const handleFullScreenChange = () => {
    //         setIsFullScreen(!!document.fullscreenElement);
    //         document.addEventListener('fullscreenchange', handleFullScreenChange);
    //     };
    //     return () => {
    //         document.removeEventListener('fullscreenchange', handleFullScreenChange);
    //     };
    // }, []);
    const renderCustomControls = () => {
        return (
            <div className={cx('custom-controls')}>
                {showPlayButton && (
                    <button onClick={togglePlayPause} className={cx('play-btn')}>
                        {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                    </button>
                )}
                {/* <button onClick={stopVideo}>
                    <FontAwesomeIcon icon={faStop}></FontAwesomeIcon>{' '}
                </button> */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className={cx('progress-bar')}
                />
                <div className={cx('volume-range')}>
                    <button onClick={toggleMute} className={cx('volume-btn')}>
                        {isMuted ? <FontAwesomeIcon icon={faVolumeMute} /> : <FontAwesomeIcon icon={faVolumeUp} />}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={handleVolumeChange}
                        className={cx('volume-bar')}
                    />
                </div>
                {/* <button onClick={toggleFullScreen}>
                    {isFullScreen ? <FontAwesomeIcon icon={faCompress} /> : <FontAwesomeIcon icon={faExpand} />}
                </button> */}
            </div>
        );
    };
    const optionRender = () => {
        return (
            <ul className={cx('video-option')}>
                <li className={cx('option-item')}>
                    <FontAwesomeIcon icon={faArrowUpShortWide} className={cx('option-icon')} />
                    <p className={cx('text')}>Cuộn tự động</p>
                    <SwitchButton rounded={true} />
                </li>
                <li className={cx('option-item')}>
                    <FontAwesomeIcon icon={faHeartCrack} className={cx('option-icon')} />
                    <p className={cx('text')}>Không quan tâm</p>
                </li>
                <li className={cx('option-item')}>
                    <FontAwesomeIcon icon={faFlag} className={cx('option-icon')} />
                    <p className={cx('text')}>Báo cáo</p>
                </li>
            </ul>
        );
    };
    return (
        <div className={cx('wrapper')}>
            <video
                {...props}
                autoPlay={false}
                className={cx('video')}
                ref={videoRef}
                poster={thumbnail}
                onClick={togglePlayPause}
                onPlay={startProgressLoop}
                onPause={stopProgressLoop}
                controls={useNativeControls}
            />
            {!useNativeControls && renderCustomControls()}
            <div className={cx('info')}>
                <Link to={`/@abc`} className={cx('username')}>
                    the25comfit
                </Link>
                <p className={cx('desc')}>Thời gian thay đổi tôi như thế nào</p>
                <p className={cx('music')}>
                    <FontAwesomeIcon icon={faMusic} className={cx('music-icon')} />
                    Nhạc nền - Nờ tê 01
                </p>
            </div>
            <Tippy interactive delay={[0, 200]} offset={[-6, 40]} placement="right-end" render={optionRender}>
                <div className={cx('more')}>
                    <MoreIcon />
                </div>
            </Tippy>
        </div>
    );
}

export default Video;
// fullcreen is ready
