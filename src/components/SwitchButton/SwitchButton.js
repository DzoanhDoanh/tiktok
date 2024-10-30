import classNames from 'classnames/bind';
import styles from './SwitchButton.module.scss';

const cx = classNames.bind(styles);

function SwitchButton({ rounded = false }) {
    const classes = cx('slider', {
        rounded,
    });
    return (
        <label className={cx('switch')}>
            <input className={cx('input')} type="checkbox" />
            <span className={classes}></span>
        </label>
    );
}

export default SwitchButton;
