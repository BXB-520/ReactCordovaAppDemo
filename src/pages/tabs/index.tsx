import HomeIcon from '@/assets/imgs/tabs/home.png';
import athomeIcon from '@/assets/imgs/tabs/athome.png';
import mineIcon from '@/assets/imgs/tabs/mine.png';
import atmineIcon from '@/assets/imgs/tabs/atmine.png';
import Homes from '@/pages/tabs/home';
import Mine from '@/pages/tabs/mine';
import AppTabs from '@/components/system/AppTabs';

// tab组件
const tabss = [
  {
    title: '首页',
    key: 'home',
    component: Homes,
    badge: 0,
    icon: HomeIcon,
    selectedIcon: athomeIcon,
  },
  {
    title: '我的',
    key: 'mine',
    component: Mine,
    badge: 0,
    icon: mineIcon,
    selectedIcon: atmineIcon,
  },
];

export default () => <AppTabs tabs={tabss} />;
