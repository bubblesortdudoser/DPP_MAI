#---------------- Requirements ----------------
.PHONY freeze:
freeze:
	pip freeze > app/requirements.txt

.PHONY deps:
deps:
	pip install -r app/requirements.txt

#---------------- App [DEV] ----------------

.PHONY create_db:
create_db:
	cd app/ && flask commands create_db

.PHONY parser:
parser:
	cd app/ && python parser.py

#---------------- Docker-Compose ----------------------
.PHONY docker_pgdb_build:
docker_pgdb_build:
	sudo docker-compose -f docker-compose.pgdb.dev.yml build

.PHONY docker_pgdb_up:
docker_pgdb_up:
	sudo docker-compose -f docker-compose.pgdb.dev.yml up

.PHONY docker_pgdb_upd:
docker_pgdb_upd:
	sudo docker-compose -f docker-compose.pgdb.dev.yml up -d

.PHONY grep_ipaddr: # check ip for connect to postgresql
grep_ipaddr:
	docker inspect pgdb | grep IPAddress

#---------------- Clean cache ----------------
.PHONY clean:
clean:
	cd app/ && find . -name __pycache__ -type d -print0|xargs -0 rm -r --

#---------------- Git ----------------
.PHONY gadd:
gadd:
	git add .

.PHONY gcom:
gcom: # git commit -am "{com}" | com=<your comment>
	git commit -am "$(com)"

.PHONY gpush_dev:
gpush_dev:
	git push origin dev

.PHONY gpull:
gpull:
	git pull