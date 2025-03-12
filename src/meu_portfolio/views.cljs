(ns meu-portfolio.views
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [meu-portfolio.routes :as routes]))

;; Dados de exemplo
(def projects
  [{:id 1
    :title "Projeto ClojureScript"
    :description "Um site de portfólio e blog pessoal feito com ClojureScript"
    :image "https://picsum.photos/seed/cljs/400/200"}
   {:id 2
    :title "Aplicativo React Native"
    :description "Um aplicativo móvel desenvolvido com React Native para iOS e Android"
    :image "https://picsum.photos/seed/react/400/200"}
   {:id 3
    :title "API REST em Node.js"
    :description "Uma API RESTful construída com Node.js, Express e MongoDB"
    :image "https://picsum.photos/seed/node/400/200"}])

(def blog-posts
  [{:id 1
    :title "Introdução ao ClojureScript"
    :date "10/03/2025"
    :summary "Aprenda os fundamentos do ClojureScript e como começar a desenvolver aplicações web com ele."
    :content "ClojureScript é uma implementação de Clojure que compila para JavaScript..."}
   {:id 2
    :title "Material UI com Reagent"
    :date "05/03/2025"
    :summary "Como usar bibliotecas de UI em seus projetos ClojureScript."
    :content "Existem várias bibliotecas de UI que podem ser usadas com ClojureScript..."}
   {:id 3
    :title "Gerenciamento de Estado com re-frame"
    :date "01/03/2025"
    :summary "Técnicas para gerenciar o estado da aplicação de forma eficiente com re-frame."
    :content "O re-frame é uma biblioteca para gerenciamento de estado em aplicações ClojureScript..."}])

;; Componentes de navegação
(defn navigation []
  (let [menu-items [{:title "Home" :route :home}
                    {:title "Projetos" :route :projects}
                    {:title "Blog" :route :blog}
                    {:title "Contato" :route :contact}]
        navigate-to (fn [route]
                      (set! js/window.location.pathname (routes/path-for route)))]
    (fn []
      [:nav.main-nav
       [:div.logo
        [:h1 "Meu Portfólio"]]
       [:ul.nav-links
        (for [item menu-items]
          ^{:key (:title item)}
          [:li
           [:a {:href "#" 
                :on-click #(do (.preventDefault %) 
                                (navigate-to (:route item)))}
            (:title item)]])]])))

;; Páginas
(defn home-page []
  [:div.home-page
   [:div.hero-section
    [:h1 "Bem-vindo ao Meu Portfólio"]
    [:p "Desenvolvedor de software especializado em aplicações web modernas."]
    [:div.cta-buttons
     [:a.button.primary {:href (routes/path-for :projects)} "Ver Projetos"]
     [:a.button.secondary {:href (routes/path-for :contact)} "Entre em Contato"]]]])

(defn project-card [project]
  [:div.card.project-card {:key (:id project)}
   [:div.card-img
    [:img {:src (:image project) :alt (:title project)}]]
   [:div.card-content
    [:h3 (:title project)]
    [:p (:description project)]
    [:div.card-actions
     [:a.button {:href "#"} "Ver Detalhes"]]]])

(defn projects-page []
  [:div.projects-page
   [:h2 "Meus Projetos"]
   [:div.projects-grid
    (for [project projects]
      [project-card project])]])

(defn blog-post-card [post]
  [:div.card.blog-card {:key (:id post)}
   [:div.card-content
    [:h3 (:title post)]
    [:div.post-date (:date post)]
    [:p (:summary post)]
    [:div.card-actions
     [:a.button {:href "#"} "Ler mais"]]]])

(defn blog-page []
  [:div.blog-page
   [:h2 "Blog"]
   [:div.blog-grid
    (for [post blog-posts]
      [blog-post-card post])]])

(defn contact-page []
  (let [name (r/atom "")
        email (r/atom "")
        message (r/atom "")]
    (fn []
      [:div.contact-page
       [:h2 "Entre em Contato"]
       [:div.contact-form
        [:div.form-group
         [:label {:for "name"} "Nome"]
         [:input#name {:type "text"
                      :value @name
                      :placeholder "Seu nome"
                      :on-change #(reset! name (-> % .-target .-value))}]]
        [:div.form-group
         [:label {:for "email"} "Email"]
         [:input#email {:type "email"
                       :value @email
                       :placeholder "seu.email@exemplo.com"
                       :on-change #(reset! email (-> % .-target .-value))}]]
        [:div.form-group
         [:label {:for "message"} "Mensagem"]
         [:textarea#message {:rows 4
                            :value @message
                            :placeholder "Sua mensagem"
                            :on-change #(reset! message (-> % .-target .-value))}]]
        [:button.button.primary 
         {:on-click #(js/alert (str "Mensagem enviada!\nNome: " @name "\nEmail: " @email "\nMensagem: " @message))}
         "Enviar Mensagem"]]]])))
