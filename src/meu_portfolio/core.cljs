(ns meu-portfolio.core
  (:require [reagent.dom :as rdom]
            [re-frame.core :as rf]
            [meu-portfolio.views :as views]
            [meu-portfolio.routes :refer [match-route]]
            [reagent-mui.styles :as styles]
            [reagent-mui.colors :as colors]
            [reagent-mui.material.css-baseline :refer [css-baseline]]
            [reagent-mui.material.theme-provider :refer [theme-provider]]
            [reagent-mui.material.container :refer [container]]
            [reagent-mui.material.box :refer [box]]))

;; Tema customizado para o Material UI
(def theme
  (styles/create-theme
   {:palette {:primary {:main (colors/blue 700)}
              :secondary {:main (colors/teal 500)}}
    :typography {:fontFamily "Roboto, Arial, sans-serif"}}))

(defn current-page []
  (let [path (.-pathname js/location)
        route (match-route path)
        page-component (case (:handler route)
                         :home views/home-page
                         :projects views/projects-page
                         :blog views/blog-page
                         :contact views/contact-page
                         views/home-page)] ; Fallback para a página inicial
    [:<>
     [views/navigation]
     [box {:component "main" :sx {:min-height "100vh" :pb 6}}
      [page-component]]]))

(defn app []
  [:<>
   [css-baseline]
   [theme-provider {:theme theme}
    [current-page]]])

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
