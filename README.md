## step 1  
### docker를 활용한 app start  
- dockerfile 생성 및 build, start
- docker build -t app_name 명령을 통한 local 도커 이미지 생성
- docker images 명령을 통해 정상적으로 생성됐는지 확인
- docker run -d app_name 명령을 통해 도커이미지 실행 -> 문제 발생 도커 이미지 포트와 로컬 컴퓨터의 포트 연결을 하지 않음
- dockerfile EXPOSE 명령으로 3000번 포트로 실행
- docker run -d -p 3000:3000/tcp app_name 명령을 통해 도커 이미지 포트와 로컬 포트를 연결
- docker ps 명령으로 실행중인 도커 이미지 정보 확인
- docker stop imageId 명령을 통한 도커 이미지 실행 중지

## step 2
- git actions 연결

## step 3
- aws elastic beanstalk 배포

## step 4
- 도커 이미지 + git actions + elastic beanstalk 을 이용한 ci/cd 구현