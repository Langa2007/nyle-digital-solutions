module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/nyle-digital solutions/nyle-digital-admin/src/lib/store/authStore.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store,
    "useAuthStore",
    ()=>useAuthStore
]);
// src/lib/store/authStore.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/node_modules/zustand/esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        user: null,
        token: null,
        isAuthenticated: false,
        login: (user, token)=>set({
                user,
                token,
                isAuthenticated: true
            }),
        logout: ()=>set({
                user: null,
                token: null,
                isAuthenticated: false
            }),
        updateUser: (updatedUser)=>set((state)=>({
                    user: state.user ? {
                        ...state.user,
                        ...updatedUser
                    } : null
                }))
    }), {
    name: 'auth-storage'
}));
const store = useAuthStore;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/nyle-digital solutions/nyle-digital-admin/src/lib/api/adminClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminApi",
    ()=>adminApi,
    "default",
    ()=>__TURBOPACK__default__export__
]);
// src/lib/api/adminClient.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$src$2f$lib$2f$store$2f$authStore$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/src/lib/store/authStore.tsx [app-ssr] (ecmascript)");
;
;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const adminClient = __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
// Request interceptor
adminClient.interceptors.request.use((config)=>{
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$src$2f$lib$2f$store$2f$authStore$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"].getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error)=>{
    return Promise.reject(error);
});
// Response interceptor
adminClient.interceptors.response.use((response)=>response, async (error)=>{
    if (error.response?.status === 401) {
        __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$src$2f$lib$2f$store$2f$authStore$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"].getState().logout();
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    return Promise.reject(error);
});
const adminApi = {
    // Auth
    login: (data)=>adminClient.post('/auth/login', data),
    getProfile: ()=>adminClient.get('/auth/me'),
    updateProfile: (data)=>adminClient.put('/auth/update-details', data),
    // Dashboard
    getDashboardStats: ()=>adminClient.get('/admin/dashboard/stats'),
    getRecentActivity: ()=>adminClient.get('/admin/activity/recent'),
    // Contacts
    getContacts: (params)=>adminClient.get('/contacts', {
            params
        }),
    updateContactStatus: (id, data)=>adminClient.patch(`/contacts/${id}/status`, data),
    getContactStats: ()=>adminClient.get('/contacts/stats'),
    bulkContactAction: (data)=>adminClient.post('/admin/contacts/bulk-action', data),
    // Job Applications
    getApplications: (params)=>adminClient.get('/jobs', {
            params
        }),
    updateApplicationStatus: (id, data)=>adminClient.patch(`/jobs/${id}/status`, data),
    getApplicationStats: ()=>adminClient.get('/jobs/stats'),
    // Blog
    getBlogPosts: (params)=>adminClient.get('/blog', {
            params
        }),
    getBlogPost: (id)=>adminClient.get(`/blog/${id}`),
    createBlogPost: (data)=>adminClient.post('/blog', data),
    updateBlogPost: (id, data)=>adminClient.put(`/blog/${id}`, data),
    deleteBlogPost: (id)=>adminClient.delete(`/blog/${id}`),
    getBlogCategories: ()=>adminClient.get('/blog/categories'),
    // Portfolio
    getPortfolioItems: (params)=>adminClient.get('/portfolio', {
            params
        }),
    getPortfolioItem: (id)=>adminClient.get(`/portfolio/${id}`),
    createPortfolioItem: (data)=>adminClient.post('/portfolio', data),
    updatePortfolioItem: (id, data)=>adminClient.put(`/portfolio/${id}`, data),
    deletePortfolioItem: (id)=>adminClient.delete(`/portfolio/${id}`),
    getPortfolioCategories: ()=>adminClient.get('/portfolio/categories'),
    // Services
    getServices: (params)=>adminClient.get('/services', {
            params
        }),
    getService: (id)=>adminClient.get(`/services/${id}`),
    createService: (data)=>adminClient.post('/services', data),
    updateService: (id, data)=>adminClient.put(`/services/${id}`, data),
    deleteService: (id)=>adminClient.delete(`/services/${id}`),
    getServiceCategories: ()=>adminClient.get('/services/categories'),
    // Upload
    uploadImage: (data)=>adminClient.post('/admin/upload/image', data),
    uploadFile: (data)=>adminClient.post('/admin/upload/file', data),
    // Generic
    get: (url, config)=>adminClient.get(url, config),
    post: (url, data, config)=>adminClient.post(url, data, config),
    put: (url, data, config)=>adminClient.put(url, data, config),
    delete: (url, config)=>adminClient.delete(url, config)
};
const __TURBOPACK__default__export__ = adminClient;
}),
"[project]/nyle-digital solutions/nyle-digital-admin/src/hooks/useAuth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
// src/hooks/useAuth.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$src$2f$lib$2f$store$2f$authStore$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/src/lib/store/authStore.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$src$2f$lib$2f$api$2f$adminClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/src/lib/api/adminClient.ts [app-ssr] (ecmascript)");
;
;
;
;
const useAuth = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, token, isAuthenticated, login, logout, updateUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$src$2f$lib$2f$store$2f$authStore$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const checkAuth = async ()=>{
        if (token && !user) {
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$src$2f$lib$2f$api$2f$adminClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminApi"].get('/auth/me');
                login(response.data, token);
            } catch (error) {
                logout();
            }
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        checkAuth();
    }, [
        token
    ]);
    const handleLogin = async (email, password)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$src$2f$lib$2f$api$2f$adminClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminApi"].post('/auth/login', {
            email,
            password
        });
        const { token, user } = response.data;
        login(user, token);
    };
    const handleLogout = ()=>{
        logout();
        router.push('/login');
    };
    return {
        user,
        token,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        updateUser,
        loading: token && !user
    };
};
}),
"[project]/nyle-digital solutions/nyle-digital-admin/src/components/providers/AuthProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/src/hooks/useAuth.ts [app-ssr] (ecmascript)");
// src/components/providers/AuthProvider.tsx
'use client';
;
;
function AuthProvider({ children }) {
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[project]/nyle-digital solutions/nyle-digital-admin/src/components/providers/ReactQueryProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReactQueryProvider",
    ()=>ReactQueryProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/node_modules/@tanstack/react-query-devtools/build/modern/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nyle-digital solutions/nyle-digital-admin/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// src/components/providers/ReactQueryProvider.tsx
'use client';
;
;
;
;
function ReactQueryProvider({ children }) {
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClient"]({
            defaultOptions: {
                queries: {
                    staleTime: 60 * 1000,
                    retry: 1,
                    refetchOnWindowFocus: false
                }
            }
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$nyle$2d$digital__solutions$2f$nyle$2d$digital$2d$admin$2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReactQueryDevtools"], {
                initialIsOpen: false
            }, void 0, false, {
                fileName: "[project]/nyle-digital solutions/nyle-digital-admin/src/components/providers/ReactQueryProvider.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/nyle-digital solutions/nyle-digital-admin/src/components/providers/ReactQueryProvider.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__634701d3._.js.map