This is a TTS AI program to synthesize the text-to-speech \
I will gradually improve to add other features such as adding emotion (e.g., sad angry, excited), voice type (e.g., male, female, boy, girl)


### 1. Build base image (only needed once) 
#### since this torch python package is too big, we just create it one time
```
docker build -t my-torch-base -f docker/torch-base/Dockerfile .
```

###  2. Build application (fast rebuilds)
```
docker-compose build
```

###  3. Run
```
docker-compose up
```

###  Development Docker - runs the backend code (python with the AI TTS)
```
docker-compose down
docker-compose up --build -d
```

###  Frontend
```
npm install
```

###  Frontend development
```
npm run dev
```

Visit to test frontend: 
http://localhost:5173/