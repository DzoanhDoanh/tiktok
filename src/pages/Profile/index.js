import PersonalInfo from '../../components/PersonalInfo';
import { useParams } from 'react-router-dom';
import MyProfile from './MyProfile';

function Profile() {
    const user = useParams();
    const currentUser = false;
    return <div>{user.nickname === ':nickname' ? <MyProfile /> : <PersonalInfo currentUser={currentUser} />}</div>;
}

export default Profile;
