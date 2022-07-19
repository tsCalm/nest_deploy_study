## step 1

### docker를 활용한 app start

- dockerfile 생성 및 build, start
- docker build . -t app_name 명령을 통한 local 도커 이미지 생성
- docker images 명령을 통해 정상적으로 생성됐는지 확인
- docker run -d app_name 명령을 통해 도커이미지 실행 -> 문제 발생 도커 이미지 포트와 로컬 컴퓨터의 포트 연결을 하지 않음
- dockerfile EXPOSE 명령으로 3000번 포트로 실행
- docker run -d -p 3000:3000/tcp app_name 명령을 통해 도커 이미지 포트와 로컬 포트를 연결
- docker ps 명령으로 실행중인 도커 이미지 정보 확인
- docker stop imageId 명령을 통한 도커 이미지 실행 중지

## step 2

### git actions 연결

- .github/workflows 디렉토리에 .yml 파일을 생성하여 git actions 사용
- git actions의 스텝을 build, deploy로 나눔
- build의 결과물을 aws elastic beanstalk에 deploy하던 중 에러 발생

```
Error: Deployment failed: No deployment package given but version 0031fc12e5ac8d8a3b3e24c34ecb9b6f314189b1 doesn't exist, so nothing to deploy!
```

- version_label의 값을 1로 고정 시키고 다시 시도했으나 아래와 같은 에러가 발생

```
Error: Deployment failed: No deployment package given but version 1 doesn't exist, so nothing to deploy!
```

- version_label 의 값을 되돌리고 새로운 옵션을 추가( deployment_package: deploy.zip )하여 에러 해결

- 또 다른 에러 발생

```
Error: Deployment failed: Error: Status: 400. Code: InvalidParameterValue, Message: No Application named '***' found.
```

- 예상: aws의 elastic beanstalk을 생성하지 않아서 발생하는 오류
- 환경 및 애플리케이션 생성 후 다시 시도
- 또 다른 에러 발생 elastic beanstalk 연결은 확인

```
Error: Deployment failed: Error: Environment still has health Red 30 seconds after update finished!
```

- eb deploy 옵션에 아래와 같은 코드를 추가하여 git actions까지 성공

```
wait_for_deployment: false
wait_for_environment_recovery: 100
```

## step 3

### aws elastic beanstalk 배포

- 배포는 되었으나 502 에러 발생
- 배포까지는 연결이 잘 됐으나 elastic beanstalk의 nginx의 연결 기본 포트가 8080으로 잡혀있는걸 log 체크 후 확인
- app의 port를 8080으로 변경하여 재배포 후 정상 작동 확인

## step 4

- git actions + elastic beanstalk 을 이용한 ci/cd 구현
- 완료

## docker 없이 aws elastic beanstalk 배포

```
name: Backend CI/CD

on:
  push:
    branches: [main]

jobs:
  build:
    name: Build and Test
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x]

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      # Download AWS CLI 2
      - name: Install AWS CLI 2
        run: |
          curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
          unzip awscliv2.zip
          which aws
          sudo ./aws/install --bin-dir /usr/local/bin --install-dir /usr/local/aws-cli --update

      # Configure AWS credentials
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      # npm install for ci
      - run: npm ci

      # Build
      - run: npm run build

      # Unit test
      # - run: npm run test:unit

  deploy:
    name: BeanStalk Deploy
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: ['16.x']
    needs: build
    steps:
      - uses: actions/checkout@v2

      # Initialize Node.js
      - name: Install Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}

      # Install project dependencies
      - name: Install dependencies
        run: npm install

      # Download AWS CLI 2
      - name: Install AWS CLI 2
        run: |
          curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
          unzip awscliv2.zip
          which aws
          sudo ./aws/install --bin-dir /usr/local/bin --install-dir /usr/local/aws-cli --update
      # Configure AWS credentials
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
      # Create .env file
      - name: Create env file
        run: |
          touch .env.prod
          echo DB_HOST=${{ secrets.DB_HOST }} >> .env.prod
          echo DB_PORT=${{ secrets.DB_PORT }} >> .env.prod
          echo DB_USERNAME=${{ secrets.DB_USERNAME }} >> .env.prod
          echo DB_PASSWORD=${{ secrets.DB_PASSWORD }} >> .env.prod
          echo DB_NAME=${{ secrets.DB_NAME }} >> .env.prod
          echo JWT_ACCESS_TOKEN_SECRET=${{ secrets.JWT_ACCESS_TOKEN_SECRET }} >> .env.prod
          cat .env.prod

      # Build
      - name: Run build
        run: npm run build

      # Make upload zip file
      - name: Generate deployment package
        run: zip -r deploy.zip . -x '*.git*' './src/*' './aws/*' awscliv2.zip

      # Deploy to Elastic Beanstalk
      - name: Deploy to EB
        uses: einaregilsson/beanstalk-deploy@v18
        with:
          aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          application_name: ${{ secrets.APPLICATION_NAME }}
          environment_name: ${{ secrets.ENVIRONMENT_NAME }}
          region: ${{ secrets.AWS_REGION }}
          version_label: ${{github.SHA}}
          deployment_package: deploy.zip
          wait_for_deployment: false
          wait_for_environment_recovery: 100

```

## docker 로 eb 배포 하기 전 ECR 권한 추가

- AmazonEC2ContainerRegistryFullAccess
