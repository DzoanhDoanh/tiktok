import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './SuggestedAccounts.module.scss';
import { Wrapper as PopperWrapper } from '../Popper';
import AccountPreview from './AccountPreview';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function AccountItem({ data, preview }) {
    const renderPreview = (props) => {
        if (preview) {
            return (
                <div tabIndex="-1" {...props}>
                    <PopperWrapper>
                        <AccountPreview data={data} preview={preview} />
                    </PopperWrapper>
                </div>
            );
        }
    };
    return (
        <Link to={`/@${data.nickname}`}>
            <Tippy offset={[-20, 5]} interactive delay={[800, 600]} render={renderPreview} placement="bottom">
                <div className={cx('account-item')}>
                    <img className={cx('avatar')} src={data.avatar} alt={`${data.first_name} ${data.last_name}`} />
                    <div className={cx('item-info')}>
                        <p className={cx('nick-name')}>
                            <strong>{`${data.first_name} ${data.last_name}`}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>{data.nickname}</p>
                    </div>
                </div>
            </Tippy>
        </Link>
    );
}
AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default AccountItem;
