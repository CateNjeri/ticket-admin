import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Dashboard from './views/dashboard/Dashboard.vue'
import Events from './views/catalog/Events.vue'
import EventForm from './views/catalog/EventForm.vue'
import Bookings from './views/sales/Bookings.vue'
import BookingForm from './views/sales/BookingForm.vue'
import EventTickets from './views/catalog/EventForm.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: 'Home',
        leaf: true,
        iconCls: 'fa fa-dashboard',
        children: [{
            path: '/',
            component: Dashboard,
            name: 'Home'
        }, ]
    },
    {
        path: '/',
        component: Home,
        name: 'Events',
        leaf: true,
        iconCls: 'fa fa-tag',
        children: [{
            path: '/events',
            component: Events,
            name: 'Events'
        },{
                path: '/events',
                component: EventTickets,
                name: 'EventTickets'
            },{

        
                path: '/events/add',
                component: EventForm,
                name: 'Add Event'
            },
            {
                path: '/events/edit/:id',
                component: EventForm,
                name: 'Edit Event'
            }
        ]
    },
    {
        path: '/sales',
        component: Home,
        name: 'Sales',
        iconCls: 'fa fa-shopping-cart',
         children: [{
                 path: '/bookings',
                component: Bookings,
                name: 'booking'
             },
             {
                path: '/bookings/form',
                component: BookingForm,
                 hidden: true,
                 name: 'Booking'
             },
             {
                 path: '/returns',
                 component: Page6,
                 name: 'Returns'
             },

         ]
     },

    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

export default routes;
