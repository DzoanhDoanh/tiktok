import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';
import Video from './Video';
// import video from '../../assets/videos/video2.mp4';
import IconWrapper from '../IconWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCaretDown, faCaretUp, faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
// import images from '../../assets/images/avatar.avif';
import Image from '../Image';
import { PlusIcon, ArrowRotateBackward, PlaneIcon, FaceBookIcon, WhatsAppIcon, CopyLinkIcon } from '../Icons/Icons';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function VideoPlayer({ data }) {
    const [likeBtnActive, setLikeBtnActive] = useState(false);
    const [saveBtnActive, setSaveBtnActive] = useState(false);
    const [displayShare, setDisplayShare] = useState(5);
    const socialList = [
        {
            icon: <ArrowRotateBackward />,
            title: 'Đăng lại',
        },
        {
            icon: <PlaneIcon />,
            title: 'Gửi đến bạn bè',
        },
        {
            icon: <FaceBookIcon />,
            title: 'Facebook',
        },
        {
            icon: <WhatsAppIcon />,
            title: 'WhatsApp',
        },
        {
            icon: <CopyLinkIcon />,
            title: 'Sao chép liên kết',
        },
        {
            icon: <WhatsAppIcon />,
            title: 'WhatsApp',
        },
        {
            icon: <CopyLinkIcon />,
            title: 'Sao chép liên kết',
        },
    ];

    const handleLikeBtnActive = () => {
        setLikeBtnActive((likeBtnActive) => !likeBtnActive);
    };
    const handleSaveBtnActive = () => {
        setSaveBtnActive((likeBtnActive) => !likeBtnActive);
    };

    const handleSeeMore = () => {
        setDisplayShare(socialList.length);
    };

    const handleHide = () => {
        setDisplayShare(5);
    };

    const renderSocialLink = () => {
        return (
            <ul className={cx('social-list')}>
                {socialList.slice(0, displayShare).map((item, index) => {
                    return (
                        <li className={cx('social-item')} key={index}>
                            <IconWrapper small rounded className={cx('social-wrapper')}>
                                {item.icon}
                                {/* <ArrowRotateBackward className={cx('social-icon')} /> */}
                            </IconWrapper>
                            <p className={cx('social-name')}>{item.title}</p>
                        </li>
                    );
                })}
                {displayShare <= 5 && (
                    <li className={cx('arrow-btn')} onClick={handleSeeMore}>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </li>
                )}
                {displayShare > 5 && (
                    <li className={cx('arrow-btn')} onClick={handleHide}>
                        <FontAwesomeIcon icon={faCaretUp} />
                    </li>
                )}
            </ul>
        );
    };

    const handleDoubleClick = () => {
        setLikeBtnActive((likeBtnActive) => !likeBtnActive);
        console.log(data.popular_video.file_url);
    };
    return (
        <div className={cx('wrapper')}>
            <Video
                src={data.popular_video.file_url}
                // width={data.popular_video.meta.video.resolution_x}
                // height={data.popular_video.meta.video.resolution_y}
                onDoubleClick={handleDoubleClick}
            />
            <div className={cx('action-list')}>
                <div className={cx('action-item')}>
                    <IconWrapper rounded className={cx('icon-wrapper')}>
                        <Image src={data.avatar} alt="Image"></Image>
                    </IconWrapper>
                    <div className={cx('action-icon')}>
                        <PlusIcon className={cx('plus-icon')} />
                    </div>
                </div>
                <div className={cx('action-item', 'marginTop')} onClick={handleLikeBtnActive}>
                    <IconWrapper rounded className={cx('icon-wrapper', { likeBtnActive })}>
                        <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                    </IconWrapper>
                    <strong className={cx('text')}>{data.popular_video.likes_count}</strong>
                </div>
                <div className={cx('action-item')}>
                    <IconWrapper rounded className={cx('icon-wrapper')}>
                        <FontAwesomeIcon icon={faComment} className={cx('icon')} />
                    </IconWrapper>
                    <strong className={cx('text')}>{data.popular_video.comments_count}</strong>
                </div>
                <div className={cx('action-item')} onClick={handleSaveBtnActive}>
                    <IconWrapper rounded className={cx('icon-wrapper', { saveBtnActive })}>
                        <FontAwesomeIcon icon={faBookmark} className={cx('icon')} />
                    </IconWrapper>
                    <strong className={cx('text')}>{data.popular_video.shares_count}</strong>
                </div>
                <Tippy delay={[0, 500]} interactive placement="top-start" offset={[-20, 0]} render={renderSocialLink}>
                    <div className={cx('action-item')}>
                        <IconWrapper rounded className={cx('icon-wrapper')}>
                            <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                        </IconWrapper>
                        <strong className={cx('text')}>{data.popular_video.views_count}</strong>
                    </div>
                </Tippy>
            </div>
        </div>
    );
}

export default VideoPlayer;
