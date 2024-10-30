import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '../../../config';
import Menu, { MenuItem } from './Menu';
import Image from '../../../components/Image';
import avatar from '../../../assets/images/avatar.avif';
import { HomeIcon, UserGroupIcon, LiveIcon, CompassIcon, PlusIcon } from '../../../components/Icons';
import SuggestedAccounts from '../../../components/SuggestedAccounts';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} />
                <MenuItem title="Following" to={config.routes.following} icon={<PlusIcon />} />
                <MenuItem title="Live" to={config.routes.live} icon={<LiveIcon />} />
                <MenuItem title="Friends" to={config.routes.friends} icon={<UserGroupIcon />} />
                <MenuItem title="Explore" to={config.routes.trend} icon={<CompassIcon />} />
                <MenuItem
                    title="Profile"
                    to={config.routes.profile}
                    icon={<Image className={cx('user-avatar')} src={avatar} alt="Hoang Thuy Linh" />}
                />
                <SuggestedAccounts label="Suggested for you" preview />
                <SuggestedAccounts label="Following accounts" />
            </Menu>
        </aside>
    );
}

export default Sidebar;
