import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import PropTypes from 'prop-types';
import AccountItem from './AccountItem';
import * as suggestService from '../../services/suggestedService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, preview }) {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [visibleUsers, setVisibleUsers] = useState(2);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await suggestService.suggest();
            setSuggestedUsers(result);
        };
        fetchApi();
    }, []);
    const handleSeeAll = () => {
        setVisibleUsers((prev) => prev + suggestedUsers.length);
    };
    const handleHide = () => {
        setVisibleUsers(2);
    };
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {suggestedUsers.slice(0, visibleUsers).map((data) => {
                return <AccountItem key={data.id} data={data} preview={preview} />;
            })}

            {visibleUsers < suggestedUsers.length && (
                <p className={cx('more-btn')} onClick={handleSeeAll}>
                    See all
                </p>
            )}
            {visibleUsers > 2 && (
                <p className={cx('more-btn')} onClick={handleHide}>
                    Close
                </p>
            )}
        </div>
    );
}
SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};
export default SuggestedAccounts;
