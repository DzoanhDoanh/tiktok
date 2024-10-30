import classNames from 'classnames/bind';
import styles from './EditProfileForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faClose } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import { update } from '../../redux/userSlice';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function EditProfileForm(props) {
    const { setOpenModal } = props;
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [image, setImage] = useState();
    const [tiktokid, setTiktokid] = useState(userData.tiktokid);
    const [name, setName] = useState(userData.setName);
    const [bio, setBio] = useState(userData.bio);

    const inputRef = useRef(null);

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenModal(false);
        const data = {
            image: image.preview,
            tiktokid: tiktokid,
            name: name,
            bio: bio,
        };
        console.log(typeof image.preview);
        console.log(image.preview);
        dispatch(update(data));
    };
    const handleImageClick = (e) => {
        inputRef.current.click();
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
    };
    return (
        <div className={cx('modal')}>
            <form className={cx('form')}>
                <div className={cx('modal-header')}>
                    <h1 className={cx('modal-title')}>Edit profile</h1>
                    <FontAwesomeIcon icon={faClose} className={cx('close-icon')} onClick={handleCloseModal} />
                </div>
                <div className={cx('form-control')}>
                    <p className={cx('text')}>Profile Image</p>
                    <div className={cx('upload')} onClick={handleImageClick}>
                        {image ? (
                            <img src={image.preview} width="100" height="100" alt="" />
                        ) : (
                            <img src={userData.image} width="100" height="100" alt="" />
                        )}
                        <div className={cx('round')}>
                            <input type="file" onChange={handleImageChange} ref={inputRef} />
                            <FontAwesomeIcon icon={faCamera} />
                        </div>
                    </div>
                </div>
                <div className={cx('form-control')}>
                    <p className={cx('text')}>Tiktok ID</p>
                    <div className={cx('input-group')}>
                        <input
                            type="text"
                            className={cx('input')}
                            placeholder="@userid"
                            onChange={(e) => setTiktokid(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('form-control')}>
                    <p className={cx('text')}>Name</p>
                    <div className={cx('input-group')}>
                        <input
                            type="text"
                            className={cx('input')}
                            placeholder="Doanh"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('form-control')}>
                    <p className={cx('text')}>Description</p>
                    <div className={cx('input-group')}>
                        <textarea
                            type="text"
                            className={cx('input')}
                            placeholder="Description"
                            onChange={(e) => {
                                setBio(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className={cx('form-control', 'group-btn')}>
                    <Button outline className={cx('btn-close')} onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button primary className={cx('btn-save')} onClick={handleSubmit}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
}
export default EditProfileForm;
