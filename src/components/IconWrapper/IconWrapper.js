import classNames from 'classnames/bind';
import styles from './IconWrapper.module.scss';

const cx = classNames.bind(styles);

function IconWrapper({ small = false, rounded = false, className, children }) {
    const classes = cx('wrapper', { [className]: className, small, rounded });

    return <div className={classes}>{children}</div>;
}

export default IconWrapper;
