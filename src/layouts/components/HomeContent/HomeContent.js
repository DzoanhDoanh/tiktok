import classNames from 'classnames/bind';
import styles from './HomeContent.module.scss';
import VideoPlayer from '../../../components/VideoPlayer/VideoPlayer';
import * as videoService from '../../../services/suggestedService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function HomeContent() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const result = await videoService.suggest();
            setVideos(result);
        };
        fetchApi();
    }, [videos]);
    return (
        <div className={cx('wrapper')}>
            {loading && videos.map((video, index) => <VideoPlayer key={index} data={video} />)}
        </div>
    );
}

export default HomeContent;
