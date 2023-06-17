.PHONY = default deps build test clean start-database

# Shell to use for running scripts
SHELL := $(shell which bash)
IMAGE_NAME := daily-trends
SERVICE_NAME := app

# Test if the dependencies we need to run this Makefile are installed
DOCKER := $(shell command -v docker)
DOCKER_COMPOSE := $(shell command -v docker-compose)
deps:
ifndef DOCKER
	@echo "Docker is not available. Please install docker"
	@exit 1
endif
ifndef DOCKER_COMPOSE
	@echo "docker-compose is not available. Please install docker-compose"
	@exit 1
endif

# Clean container
clean:
	docker-compose down --rmi local --volumes

# Start database container in background
start_database:
	docker-compose up -d mongo

# Start
start: deps start_database
	npm run dev

# Run tests
test: deps start_database
	npm run test
