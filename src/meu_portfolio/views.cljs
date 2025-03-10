(ns meu-portfolio.views
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [meu-portfolio.routes :as routes]
            [reagent-mui.material.app-bar :refer [app-bar]]
            [reagent-mui.material.toolbar :refer [toolbar]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.card :refer [card]]
            [reagent-mui.material.card-content :refer [card-content]]
            [reagent-mui.material.card-actions :refer [card-actions]]
            [reagent-mui.material.card-media :refer [card-media]]
            [reagent-mui.material.container :refer [container]]
            [reagent-mui.material.grid :refer [grid]]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.paper :refer [paper]]
            [reagent-mui.material.text-field :refer [text-field]]
            [reagent-mui.material.icon-button :refer [icon-button]]
            [reagent-mui.icons.menu :refer [menu]]
            [reagent-mui.material.drawer :refer [drawer]]
            [reagent-mui.material.list :refer [list]]
            [reagent-mui.material.list-item :refer [list-item]]
            [reagent-mui.material.list-item-text :refer [list-item-text]]
            [reagent-mui.material.divider :refer [divider]]))

;; Dados de exemplo
(def projects
  [{:id 1
    :title "Projeto ClojureScript"
    :description "Um site de portfólio e blog pessoal feito com ClojureScript e Material UI"
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
    :summary "Como usar a biblioteca Material UI através do wrapper reagent-material-ui em seus projetos ClojureScript."
    :content "O reagent-material-ui é um wrapper Reagent para os componentes do Material UI..."}
   {:id 3
    :title "Gerenciamento de Estado com re-frame"
    :date "01/03/2025"
    :summary "Técnicas para gerenciar o estado da aplicação de forma eficiente com re-frame."
    :content "O re-frame é uma biblioteca para gerenciamento de estado em aplicações ClojureScript..."}])

;; Componentes de navegação
(defn navigation []
  (let [drawer-open (r/atom false)
        toggle-drawer #(swap! drawer-open not)
        menu-items [{:title "Home" :route :home}
                    {:title "Projetos" :route :projects}
                    {:title "Blog" :route :blog}
                    {:title "Contato" :route :contact}]
        navigate-to (fn [route]
                      (set! js/window.location.pathname (routes/path-for route))
                      (reset! drawer-open false))]
    (fn []
      [:<>
       [app-bar {:position "static" :color "primary"}
        [toolbar
         [icon-button
          {:edge "start"
           :color "inherit"
           :aria-label "menu"
           :on-click toggle-drawer}
          [menu]]
         [typography {:variant "h6"
                      :component "div"
                      :sx {:flexGrow 1}}
          "Meu Portfólio"]
         (for [item menu-items]
           ^{:key (:title item)}
           [button {:color "inherit"
                    :on-click #(navigate-to (:route item))}
            (:title item)])]]
       
       [drawer {:anchor "left"
                :open @drawer-open
                :on-close toggle-drawer}
        [box {:sx {:width 250} :role "presentation"}
         [list
          (for [item menu-items]
            ^{:key (:title item)}
            [:<>
             [list-item {:button true :on-click #(navigate-to (:route item))}
              [list-item-text {:primary (:title item)}]]
             [divider]])]]]
       
       ])))

;; Componentes das páginas
(defn home-page []
  [container {:maxWidth "md" :sx {:mt 4 :mb 4}}
   [box {:sx {:display "flex" :flexDirection "column" :alignItems "center" :mb 4}}
    [typography {:variant "h3" :component "h1" :gutterBottom true}
     "Bem-vindo ao Meu Portfólio"]
    [typography {:variant "h5" :component "h2" :color "text.secondary" :align "center"}
     "Um site desenvolvido com ClojureScript, Reagent e Material UI"]]
   
   [paper {:sx {:p 4 :mb 4}}
    [typography {:variant "body1" :paragraph true}
     "Olá! Sou um desenvolvedor demonstrando as capacidades do ClojureScript em conjunto com a biblioteca Material UI através do wrapper reagent-material-ui."]
    [typography {:variant "body1" :paragraph true}
     "Este site é completamente estático e pode ser hospedado no GitHub Pages. Explore os projetos, artigos de blog e entre em contato através do formulário."]
    [box {:sx {:display "flex" :justifyContent "center" :mt 2}}
     [button {:variant "contained" :color "primary" :on-click #(set! js/window.location.pathname (routes/path-for :projects))}
      "Ver Projetos"]]]
   
   [grid {:container true :spacing 4 :sx {:mb 4}}
    [grid {:item true :xs 12}
     [typography {:variant "h4" :component "h2" :gutterBottom true}
      "Posts Recentes"]]
    (for [post (take 2 blog-posts)]
      ^{:key (:id post)}
      [grid {:item true :xs 12 :md 6}
       [card {:sx {:height "100%"}}
        [card-content
         [typography {:variant "h6" :component "h3" :gutterBottom true}
          (:title post)]
         [typography {:variant "body2" :color "text.secondary"}
          (:date post)]
         [typography {:variant "body1" :sx {:mt 2}}
          (:summary post)]]
        [card-actions
         [button {:size "small" :color "primary" :on-click #(set! js/window.location.pathname (routes/path-for :blog))}
          "Ler Mais"]]]])]])

(defn projects-page []
  [container {:maxWidth "md" :sx {:mt 4 :mb 4}}
   [typography {:variant "h4" :component "h1" :gutterBottom true}
    "Projetos"]
   [typography {:variant "body1" :paragraph true :sx {:mb 4}}
    "Confira alguns dos meus projetos recentes:"]
   
   [grid {:container true :spacing 4}
    (for [project projects]
      ^{:key (:id project)}
      [grid {:item true :xs 12 :md 6}
       [card {:sx {:height "100%"}}
        [card-media
         {:component "img"
          :height 140
          :image (:image project)
          :alt (:title project)}]
        [card-content
         [typography {:variant "h6" :component "h2" :gutterBottom true}
          (:title project)]
         [typography {:variant "body2" :color "text.secondary"}
          (:description project)]]
        [card-actions
         [button {:size "small" :color "primary"}
          "Ver Detalhes"]]]])]])

(defn blog-page []
  [container {:maxWidth "md" :sx {:mt 4 :mb 4}}
   [typography {:variant "h4" :component "h1" :gutterBottom true}
    "Blog"]
   [typography {:variant "body1" :paragraph true :sx {:mb 4}}
    "Artigos e tutoriais sobre desenvolvimento:"]
   
   [grid {:container true :spacing 4}
    (for [post blog-posts]
      ^{:key (:id post)}
      [grid {:item true :xs 12}
       [card {:sx {:mb 3}}
        [card-content
         [typography {:variant "h5" :component "h2" :gutterBottom true}
          (:title post)]
         [typography {:variant "body2" :color "text.secondary" :sx {:mb 2}}
          (:date post)]
         [typography {:variant "body1"}
          (:summary post)]]
        [card-actions
         [button {:size "small" :color "primary"}
          "Ler Artigo Completo"]]]])]])

(defn contact-page []
  (let [name (r/atom "")
        email (r/atom "")
        message (r/atom "")]
    (fn []
      [container {:maxWidth "md" :sx {:mt 4 :mb 4}}
       [typography {:variant "h4" :component "h1" :gutterBottom true}
        "Contato"]
       [typography {:variant "body1" :paragraph true :sx {:mb 4}}
        "Envie uma mensagem para entrar em contato:"]
       
       [paper {:sx {:p 4}}
        [:form {:on-submit (fn [e]
                             (.preventDefault e)
                             (js/alert (str "Formulário enviado!\nNome: " @name "\nEmail: " @email "\nMensagem: " @message)))}
         [grid {:container true :spacing 3}
          [grid {:item true :xs 12 :sm 6}
           [text-field {:label "Nome"
                        :fullWidth true
                        :required true
                        :value @name
                        :on-change #(reset! name (-> % .-target .-value))}]]
          [grid {:item true :xs 12 :sm 6}
           [text-field {:label "Email"
                        :type "email"
                        :fullWidth true
                        :required true
                        :value @email
                        :on-change #(reset! email (-> % .-target .-value))}]]
          [grid {:item true :xs 12}
           [text-field {:label "Mensagem"
                        :multiline true
                        :rows 4
                        :fullWidth true
                        :required true
                        :value @message
                        :on-change #(reset! message (-> % .-target .-value))}]]
          [grid {:item true :xs 12}
           [box {:sx {:display "flex" :justifyContent "flex-end"}}
            [button {:variant "contained"
                     :color "primary"
                     :type "submit"}
             "Enviar Mensagem"]]]]]]])))
