build-plain:
	docker compose build --no-cache --progress plain

build:
	docker compose build

up:
	docker compose up --build

up-d:
	docker compose up --build -d

stop:
	docker compose stop

down:
	docker compose down