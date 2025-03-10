(ns meu-portfolio.routes
  (:require [bidi.bidi :as bidi]))

(def routes
  ["/" {"" :home
        "projects" :projects
        "blog" :blog
        "contact" :contact}])

(defn match-route [path]
  (bidi/match-route routes path))

(defn path-for [handler]
  (bidi/path-for routes handler))
