PODNAME ?= flashcards-dev
PORT ?= 5173

container_prefix = run -i -t -v ./:/app:Z -v $(PODNAME)_modules:/app/node_modules:Z -w /app -p $(PORT):5173 node:alpine
pod:
	podman $(container_prefix) yarn run dev --host

yarn:
	podman $(container_prefix) yarn
add:
	podman $(container_prefix) yarn add $(PKGS)
sh:
	podman $(container_prefix) sh
