import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PersonalInfo.module.scss';
import * as userService from '../../services/userService';
import Image from '../Image';
import Button from '../Button';
import { ArrowRightIcon } from '../Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateBackward, faEllipsis, faFilm, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import EditProfileForm from '../EditProfileForm';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function PersonalInfo(props) {
    const { currentUser } = props;
    const [openModal, setOpenModal] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const userData = useSelector((state) => state.user);
    const username = useParams();

    useEffect(() => {
        if (username.nickname.charAt(0) !== '@') {
            return;
        }
        const fetchApi = async () => {
            const result = await userService.user(username.nickname);
            setUserInfo(result);
        };
        fetchApi();
    }, [username.nickname]);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <Image
                    className={cx('avatar')}
                    src={currentUser ? userData.image : userInfo.avatar}
                    alt={currentUser ? '' : userInfo.nickname}
                />
                <div className={cx('info-text')}>
                    <div className={cx('fullname')}>
                        <strong className={cx('username')}>{`${currentUser ? userData.name : userInfo.first_name} ${
                            currentUser ? '' : userInfo.last_name
                        }`}</strong>
                        <p className={cx('nickname')}>{currentUser ? '@' + userData.tiktokid : userInfo.nickname}</p>
                    </div>
                    <div className={cx('action')}>
                        {currentUser ? (
                            <div>
                                <Button primary onClick={handleOpenModal}>
                                    Edit profile
                                </Button>
                                <Button outline>Promote post</Button>
                                <Button outline className={cx('btn-arrow')}>
                                    {' '}
                                    <ArrowRightIcon width="2rem" height="1.5rem" />{' '}
                                </Button>
                                <Button outline className={cx('btn-elipsis')}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Button primary>Follow</Button>
                                <Button outline>Message</Button>
                                <Button outline className={cx('btn-arrow')}>
                                    {' '}
                                    <ArrowRightIcon width="2rem" height="1.5rem" />{' '}
                                </Button>
                                <Button outline className={cx('btn-elipsis')}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className={cx('subscribe')}>
                        <div className={cx('status')}>
                            <strong className={cx('quantity')}>{currentUser ? '0' : userInfo.followings_count}</strong>
                            <p className={cx('follow')}>Following</p>
                        </div>
                        <div className={cx('status')}>
                            <strong className={cx('quantity')}>{currentUser ? '0' : userInfo.followers_count}</strong>
                            <p className={cx('follow')}>Followers</p>
                        </div>
                        <div className={cx('status')}>
                            <strong className={cx('quantity')}>{currentUser ? '0' : userInfo.likes_count}</strong>
                            <p className={cx('follow')}>Likes</p>
                        </div>
                    </div>
                    <p className={cx('bio')}>{currentUser ? userData.bio : userInfo.bio}</p>
                </div>
            </div>
            <div className={cx('storage')}>
                <nav className={cx('navbar')}>
                    <ul className={cx('nav-list')}>
                        <li className={cx('nav-item')}>
                            <FontAwesomeIcon icon={faFilm} className={cx('nav-icon', 'active')} />
                            <span className={cx('nav-text', 'active')}>Videos</span>
                        </li>
                        <li className={cx('nav-item')}>
                            <FontAwesomeIcon icon={faArrowRotateBackward} className={cx('nav-icon')} />
                            <span className={cx('nav-text')}>Reposts</span>
                        </li>
                        <li className={cx('nav-item')}>
                            <FontAwesomeIcon icon={faThumbsUp} className={cx('nav-icon')} />
                            <span className={cx('nav-text')}>Liked</span>
                        </li>
                    </ul>
                </nav>

                {/* start list video */}
                <ul className={cx('list-video')}>
                    <li className={cx('video-item')}></li>
                </ul>
            </div>
            {openModal && <EditProfileForm openModal={openModal} setOpenModal={setOpenModal} />}
        </div>
    );
}

export default PersonalInfo;
