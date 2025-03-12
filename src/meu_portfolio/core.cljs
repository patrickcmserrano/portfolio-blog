(ns meu-portfolio.core
  (:require [reagent.dom :as rdom]
            [re-frame.core :as rf]
            [meu-portfolio.views :as views]
            [meu-portfolio.routes :refer [match-route]]))

(defn current-page []
  (let [path (.-pathname js/location)
        route (match-route path)
        page-component (case (:handler route)
                         :home views/home-page
                         :projects views/projects-page
                         :blog views/blog-page
                         :contact views/contact-page
                         views/home-page)] ; Fallback para a página inicial
    [:div.app-container
     [views/navigation]
     [:main.main-content
      [page-component]]]))

(defn app []
  [current-page])

(defn ^:export init []
  (rf/dispatch-sync [:initialize])
  (rdom/render [app] (js/document.getElementById "app")))

;; Initialize re-frame
(rf/reg-event-db
 :initialize
 (fn [_ _]
   {:page :home
    :projects views/projects
    :blog-posts views/blog-posts}))

(rf/reg-sub
 :page
 (fn [db _]
   (:page db)))
