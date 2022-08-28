build: build_frontend setup
	mkdir -p build
	cp -r quiz-server/* build
	mkdir -p build/client/build
	cp -r quiz-frontend/build/* build/client/build/
	mv -f build/client/build/static build/public/static

build_frontend: setup_frontend
	cd quiz-frontend; npm run build

setup_frontend:
	cd quiz-frontend; npm install

setup_backend:
	cd quiz-server; npm install

setup: setup_frontend setup_backend

clean:
	rm -r build
	rm -r quiz-server/node_modules
	rm -r quiz-frontend/node_modules
	rm -r quiz-frontend/build
