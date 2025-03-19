import { useCookies } from 'vue3-cookies';
import { ROUTES } from '@constants';
import { useUserStore } from '@/core/stores/user.store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AUTH_ROUTES: string[] = [
    ROUTES.SIGN_IN.name,
    ROUTES.CONTACT_US.name,
    ROUTES.RESET_PASSWORD.name,
    ROUTES.UPDATE_PASSWORD.name,
];

const ROLE_BASED_ROUTES: Record<string, string[]> = {
    admin: ['ADMIN_DASHBOARD', 'EMPLOYE', 'TABLEAU_SUIVI', 'HISTORY'],
    employee: ['DEMANDES_CONGE', 'PROFILE', 'CALENDRIER_INTERACTIF', 'HISTORY', 'SETTINGS'],
};

export default async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const { cookies } = useCookies();
    const userStore = useUserStore();
    
    const isAuthenticated = !!cookies.get('user-token');
    const userRole: string | undefined = userStore.user?.role;
    console.log('Authenticated:', isAuthenticated, 'Role:', userRole);

    console.log('Navigation Guard:', { to: to.name, from: from.name, isAuthenticated, userRole });

    if (!AUTH_ROUTES.includes(to.name as string) && !isAuthenticated) {
        console.warn('Redirection vers SIGN_IN : utilisateur non authentifié');
        return next({ path: ROUTES.SIGN_IN.path });
    }

    if (AUTH_ROUTES.includes(to.name as string) && isAuthenticated) {
        console.warn('Redirection vers MAIN : utilisateur déjà authentifié');
        return next({ path: ROUTES.MAIN.path });
    }

    if (to.name === ROUTES.UPDATE_PASSWORD.name && !to.query.code) {
        console.warn('Redirection vers SIGN_IN : mise à jour du mot de passe sans code');
        return next({ path: ROUTES.SIGN_IN.path });
    }

    if (userRole) {
        const allowedRoutes = ROLE_BASED_ROUTES[userRole] ?? [];
        if (to.name && !allowedRoutes.includes(to.name as string)) {
            console.warn(`Redirection vers MAIN : accès interdit à ${to.name}`);
            return next({ path: ROUTES.MAIN.path });
        }
    }

    if (to.name === from.name) {
        console.warn('Annulation de la navigation pour éviter une boucle infinie');
        return;
    }

    next();
};





// import { useCookies } from 'vue3-cookies'
// import { ROUTES } from '@constants'

// const AUTH_ROUTES = [
//     ROUTES.SIGN_IN.name,
//     ROUTES.CONTACT_US.name,
//     ROUTES.RESET_PASSWORD.name,
//     ROUTES.UPDATE_PASSWORD.name,
// ]

// export default async (to: any, from: any, next: any) => {
//     const { cookies } = useCookies()
//     const authentificated = !!cookies.get('user-token')
//     console.log('authentificated', authentificated)

//     if (!AUTH_ROUTES.includes(to.name) && !authentificated) {
//         next({ path: ROUTES.SIGN_IN.path })
//         return
//     }

//     if (AUTH_ROUTES.includes(to.name) && authentificated) {
//         next({ path: ROUTES.MAIN.path })
//         return
//     }

//     if (to.name == ROUTES.UPDATE_PASSWORD.name && !to.query.code) {
//         next({ path: ROUTES.SIGN_IN.path })
//         return
//     }
//     next()
// }
