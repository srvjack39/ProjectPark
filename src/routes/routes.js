import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
import login from 'src/components/Dashboard/Views/login.vue'
import Admin from 'src/components/Dashboard/Views/Admin.vue'
import Addpark from 'src/components/Dashboard/Views/Addpark.vue'
import Adddeposit from 'src/components/Dashboard/Views/Adddeposit.vue'
import Report from 'src/components/Dashboard/Views/Report.vue'
import Resevation from 'src/components/Dashboard/Views/Resevation.vue'
import Resevpark from 'src/components/Dashboard/Views/Resevpark.vue'
Report
const routes = [
  {
    path: '/',
    component: login,
    component: login
  },
  {
    path: '/Admin',
    component: Admin,
    component: Admin
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'addpark',
        name: 'Addpark',
        component: Addpark
      },
      {
        path: 'adddeposit',
        name: 'Adddeposit',
        component: Adddeposit
      },
      {
        path: 'report',
        name: 'Report',
        component: Report
      },
      {
        path: 'Resevation',
        name: 'Resevation',
        component: Resevation
      },
      {
        path: 'Resevpark',
        name: 'Resevpark',
        component: Resevpark
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
