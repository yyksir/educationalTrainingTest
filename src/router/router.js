import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/resourcelibrary/index.vue')},
        { path: 'addVideoAndppt', title: '添加视频ppt', name: 'addvideo', component: () => import('@/views/resourcelibrary/addVideoAndppt.vue') },
        { path: 'addTopic', title: '个人中心', name: 'addItem', component: () => import('@/views/resourcelibrary/addTopic.vue') },
        { path: 'testList', title: '考试列表', name: 'testList', component: () => import('@/views/test/goTest.vue') }, 
        { path: 'testCertification', title: '考试认证', name: 'testCertification', component: () => import('@/views/test/testCertification.vue') }, 
//      { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
//      { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'component',
        title: '考试及认证',
        component: Main,
        children: [
            {
                path: 'resourcelibrary',
                icon: 'compose',
                name: 'resourcelibrary',
                title: '资源库',
                keepalive: false,
                component: () => import('@/views/resourcelibrary/index.vue')
            },
        ]
    },
    {
        path: '/form',
        icon: 'android-checkbox',
        name: 'form',
        title: '培训',
        component: Main,
        children: [
            { path: 'artical-publish', title: '培训', name: 'artical-publish', icon: 'compose', component: () => import('@/views/form/article-publish/article-publish.vue') },
        ]
    },
    {
        path: '/tables',
        icon: 'ios-grid-view',
        name: 'tables',
        title: '考试',
        component: Main,
        children: [
            { path: 'dragableTable', title: '考试', name: 'dragable-table', icon: 'arrow-move', component: () => import('@/views/test/list.vue') },
        ]
    },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
