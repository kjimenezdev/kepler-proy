SHELL=/bin/bash

.PHONY: help
help: ## Show make help
	@IFS=$$'\n' ; \
		help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/:/'`); \
		printf "%-30s %s\n" "Target" "Help" ; \
		printf "%-30s %s\n" "------" "----" ; \
		for help_line in $${help_lines[@]}; do \
		IFS=$$':' ; \
		help_split=($$help_line) ; \
		help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		printf '\033[36m'; \
		printf "%-30s %s" $$help_command ; \
		printf '\033[0m'; \
		printf "%s\n" $$help_info; \
		done

.PHONY: default
default: ## By default make runs help
	help

.PHONY: mypy
mypy:
	@echo "Running mypy"

.PHONY: pytest
pytest:
	@echo "Running pytest"

.PHONY: pylint
pylint:	## Runs pylint tests
	@echo "Running tests"
	@echo "Running trivia.py"
	pylint trivia.py
	@echo "Done testing trivia.py"
	@echo "Running game.py"
	pylint game.py
	@echo "Done testing game.py"

.PHONY: docker-build
docker-build: ## Builds Docker app
	docker build -t flaskdock .

.PHONY: docker-run
docker-run: ## Runs Docker app
	docker run -p 5000:80 flaskdock

.PHONY: docker-bg-run
docker-bg-run: ## Runs Docker app on background mode
	docker run -d -p 5000:80 flaskdock

.PHONY: docker-stop
docker-stop: ## Ends the docker process
	docker container stop $@

.PHONY: run
run:
	@bash runny.sh

.PHONY: clean
clean: ## Cleans all bynary files generated
	rm *.pyc

.PHONY: hello
hello: ## Simple metho to make sure make it's working
	@echo "Hi it's make. Make me do something haha"
