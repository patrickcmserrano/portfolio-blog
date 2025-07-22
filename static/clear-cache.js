// Script para limpar cache e service workers problemáticos
(function() {
    'use strict';
    
    console.log('🧹 Iniciando limpeza de cache...');
    
    // Limpar cache do navegador
    if ('caches' in window) {
        caches.keys().then(function(cacheNames) {
            cacheNames.forEach(function(cacheName) {
                console.log('🗑️ Removendo cache:', cacheName);
                caches.delete(cacheName);
            });
        }).catch(function(error) {
            console.warn('Erro ao limpar caches:', error);
        });
    }
    
    // Desregistrar service workers
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            registrations.forEach(function(registration) {
                console.log('🚫 Desregistrando service worker:', registration.scope);
                registration.unregister();
            });
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
    
    console.log('✅ Limpeza concluída! Recarregue a página.');
})();
