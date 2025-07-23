// Script para limpar cache e service workers problemáticos
(function() {
    'use strict';
    
    console.log('🧹 Iniciando limpeza de cache...');
    
    // Limpar cache do navegador
    if ('caches' in window) {
        caches.keys().then(function(cacheNames) {
            const deletePromises = cacheNames.map(function(cacheName) {
                console.log('🗑️ Removendo cache:', cacheName);
                return caches.delete(cacheName);
            });
            return Promise.all(deletePromises);
        }).then(function() {
            console.log('✅ Todos os caches removidos');
        }).catch(function(error) {
            console.warn('Erro ao limpar caches:', error);
        });
    }
    
    // Desregistrar service workers
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            const unregisterPromises = registrations.map(function(registration) {
                console.log('🚫 Desregistrando service worker:', registration.scope);
                return registration.unregister();
            });
            return Promise.all(unregisterPromises);
        }).then(function() {
            console.log('✅ Todos os service workers desregistrados');
        }).catch(function(error) {
            console.warn('Erro ao desregistrar service workers:', error);
        });
    }
    
    // Limpar localStorage e sessionStorage
    try {
        if (window.localStorage) {
            console.log('🧹 Limpando localStorage...');
            window.localStorage.clear();
        }
        if (window.sessionStorage) {
            console.log('🧹 Limpando sessionStorage...');
            window.sessionStorage.clear();
        }
    } catch (error) {
        console.warn('Erro ao limpar storage:', error);
    }
    
    // Limpar IndexedDB se disponível
    if ('indexedDB' in window) {
        try {
            console.log('🧹 Tentando limpar IndexedDB...');
            // Note: Não podemos limpar todas as bases facilmente, mas podemos reportar
            console.log('⚠️ IndexedDB pode precisar ser limpo manualmente no DevTools');
        } catch (error) {
            console.warn('Erro ao verificar IndexedDB:', error);
        }
    }
    
    // Forçar recarregamento sem cache
    setTimeout(function() {
        console.log('✅ Limpeza concluída! Recarregando página...');
        if (window.location.search.includes('clear-cache=true')) {
            // Remove o parâmetro da URL e recarrega
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
        window.location.reload(true); // true força recarregamento sem cache
    }, 1000);
})();
