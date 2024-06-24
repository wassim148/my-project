const ROUTES = {
    MAIN: { path: '/', name: 'main' },
    NOT_FOUND: { path: '/:catchAll(.*)', name: 'NotFound' },
    HOME: { name: 'home', path: '/' },
    SIGN_IN: { name: 'sign-in', path: '/sign-in' },
    SIGN_UP: { name: 'sign-up', path: '/sign-up' },
    CONTACT_US: { name: 'contact-us', path: '/contactus' },
    RESET_PASSWORD: { name: 'reset-password', path: '/resetpassword' },
    UPDATE_PASSWORD: { name: 'update-password', path: '/updatepassword' },
}
export default ROUTES
