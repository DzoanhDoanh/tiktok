//Layouts
import { HeaderOnly } from '../layouts/';

import Home from '../pages/Home';
import Following from '../pages/Following';
import Profile from '../pages/Profile';
import Upload from '../pages/Upload';
import Search from '../pages/Search';
import config from '../config';
import Live from '../pages/Live';
import Explore from '../pages/Explore';
import Friends from '../pages/Friends';
import Trend from '../pages/Trend';

//Public routes

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.live, component: Live },
    { path: config.routes.friends, component: Friends },
    { path: config.routes.explore, component: Explore },
    { path: config.routes.trend, component: Trend },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
