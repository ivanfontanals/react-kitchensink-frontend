# Define variables
IMAGE_NAME=kitchensink-frontend


.PHONY: install 
install:
	npm install

.PHONY: run
run:
	npm start

# Build the application
build:
	npm run build

# Run tests
test:
	npm test

# Docker build
docker-build:
	docker build -t $(IMAGE_NAME) .

# Docker run
docker-run: docker-build
	docker run -p 3000:3000 $(IMAGE_NAME)

update-deps:
	brew update && brew upgrade nvm
	nvm install node
	npm install -g npm@latest

clean:
	rm -rf node_modules package-lock.json
	npm cache clean --force

