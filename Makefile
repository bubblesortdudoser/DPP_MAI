#---------------- Clean cache ----------------
.PHONY clean:
clean:
	cd app/ && find . -name __pycache__ -type d -print0|xargs -0 rm -r --

#---------------- Requirements ----------------
.PHONY freeze:
freeze:
	pip freeze > app/requirements.txt
	pip freeze > client/requirements.txt

.PHONY deps:
deps:
	pip install -r app/requirements.txt
	pip install -r client/requirements.txt

#---------------- App [DEV] ----------------

.PHONY server_dev:
server:
	gunicorn --bind 0.0.0.0:5000 app.app:app

.PHONY db_dev:
db_dev:
	cd app/ && flask commands create_db

#---------------- App [PROD] ----------------
.PHONY master_db:
master_db:
	sudo docker exec stattron_master flask commands create_db

#---------------- Docker-Compose: PostgreSQL + PGAdmin4 ----------------
.PHONY docker_pgdb_build:
docker_pgdb_build:
	sudo docker-compose -f docker-compose.postgres.dev.yml build

.PHONY docker_pgdb_up:
docker_pgdb_up:
	sudo docker-compose -f docker-compose.postgres.dev.yml up

.PHONY grep_ipaddr: # for connect to dev db in docker container
grep_ipaddr:
	docker inspect pgdb | grep IPAddress

.PHONY docker_pgdb_upd:
docker_pgdb_upd:
	sudo docker-compose -f docker-compose.postgres.dev.yml up -d




