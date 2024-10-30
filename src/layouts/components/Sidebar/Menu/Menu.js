import PropTypes from 'prop-types';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import Image from '../../../../components/Image';

const cx = classNames.bind(styles);
function Menu({ children }) {
    return (
        <nav>
            {children}
            <div className={cx('copyright')}>
                <div href="fullstack.edu.vn" className={cx('reward')}>
                    <Image
                        src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png"
                        alt="Get reward"
                        className={cx('reward-image')}
                    />
                    <p className={cx('reward-text')}>Create TikTok effects, get a reward</p>
                </div>
                <div className={cx('copyright-menu')}>
                    <p className={cx('copyright-link')}>Company</p>
                    <p className={cx('copyright-link')}>Program</p>
                    <p className={cx('copyright-link')}>Terms & Policies</p>
                </div>
                <p className={cx('copyright-year')}>© 2024 TikTok</p>
            </div>
        </nav>
    );
}
Menu.propTypes = {
    children: PropTypes.node.isRequired,
};
export default Menu;
