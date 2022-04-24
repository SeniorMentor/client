export const roles = {
    COLLEGE_ADMIN: 'college_admin',
    ADMIN: 'admin',
    STUDENT: 'student',
    GUEST: 'guest', // logged out user
    ALL: 'all' // all user
}

export const routes = [
    {
        route: '/',
        name: 'Home',
        roles: [roles.ALL]
    },
    {
        route: '/login',
        name: 'Login',
        roles: [roles.GUEST]
    },
    {
        route: '/register',
        name: 'Register',
        roles: [roles.GUEST]
    },
    {
        route: '/community',
        name: 'Community',
        roles: [roles.ALL]
    },
    {   
        route: '/notifications',
        name: 'Notifications',
        roles: [roles.COLLEGE_ADMIN, roles.STUDENT]
    },
    {
        route: '/events/add',
        name: 'Add Events',
        roles: [roles.COLLEGE_ADMIN]
    },
    {
        route: '/analytics',
        name: 'Analytics',
        roles: [roles.COLLEGE_ADMIN]
    }
]
