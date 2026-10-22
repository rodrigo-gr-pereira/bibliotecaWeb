import { getAuthUser } from './auth.js';




document.addEventListener('DOMContentLoaded', () => {
    if (getAuthUser()) {
        window.location.href = './dashboard/dashboard.html';
        return;
    }

    window.location.href = './login/login.html';
});