# 포팅 매뉴얼

# 1. 주요 기능

- 서비스 설명: 부모와 아이의 유대감을 키워주는 서비스
- 기능 :
    - 가족 간의 추억을 공유할 수 있는 앨범, 그림일기
    - 자녀의 성장을 기록하는 성장일지
    - 서로를 알아갈 수 있는 webRTC(음성, 화상)을 이용한 퀴즈 게임
    - 가족 간 대화를 할 수 있는 webSocket을 이용한 채팅방
    - 가족 간 못다한 이야기를 전할 수 있는 편지(타임캡슐)
    - 각종 활동을 통해 쌓은 경험치로 성장하는 나무

# 2. 개발 환경

### 1. Back-end

- Intellij
- JAVA 17
- SpringBoot 3.3.2
- SpringSecurity 6.3.1
- webSocket 6.1.11
- Spring Data JPA: 3.3.2
- Querydsl: 5.0.0

### 2. Front-end

- Visual Studio Code
- Node.js 20.15.0
- React: 18.3.1
- TypeScript: 5. 2. 2
- zustand: 4.5.4

### 3. Database

- Redis 7.4.0
- MySql 9.0.0

### 4. Web RTC

- openvidu: 2.25

### 5. 인프라

- AWS EC2
- AWS S3
- Jenkins
- certbot
- docker
- docker-compose
- Nginx

# 3. 프로젝트 초기 설정

## 1) Spring boot

### build.gradle

```
plugins {
	id 'java'
	id 'org.springframework.boot' version '3.3.2'
	id 'io.spring.dependency-management' version '1.1.6'
}

group = 'com.modernfamily'
version = '0.0.1-SNAPSHOT'

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

configurations {
	compileOnly {
		extendsFrom annotationProcessor
	}
}

repositories {
	mavenCentral()
}

dependencies {
	//jpa
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'

	//redis
	implementation 'org.springframework.boot:spring-boot-starter-data-redis'
	implementation group: 'it.ozimov', name: 'embedded-redis', version: '0.7.2'

	//security
	implementation 'org.springframework.boot:spring-boot-starter-security'

	//web
	implementation 'org.springframework.boot:spring-boot-starter-web'

	//websocket
    implementation 'org.springframework.boot:spring-boot-starter-websocket'
    implementation 'org.webjars:sockjs-client:1.1.2'
    implementation 'org.webjars:stomp-websocket:2.3.3-1'

	//lombok
	compileOnly 'org.projectlombok:lombok'
	annotationProcessor 'org.projectlombok:lombok'

	//valid
	implementation 'org.springframework.boot:spring-boot-starter-validation'

	//dev-tools
	 developmentOnly 'org.springframework.boot:spring-boot-devtools'

	//mysql
	runtimeOnly 'com.mysql:mysql-connector-j'

	//test
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testImplementation 'org.springframework.security:spring-security-test'
	testRuntimeOnly 'org.junit.platform:junit-platform-launcher'

	//queryDSL
	implementation 'com.querydsl:querydsl-jpa:5.0.0:jakarta'
	annotationProcessor "com.querydsl:querydsl-apt:5.0.0:jakarta"
	annotationProcessor "jakarta.annotation:jakarta.annotation-api"
	annotationProcessor "jakarta.persistence:jakarta.persistence-api"

	//jwt
	implementation group: 'io.jsonwebtoken', name: 'jjwt-api', version: '0.11.5'
	runtimeOnly group: 'io.jsonwebtoken', name: 'jjwt-impl', version: '0.11.5'
	runtimeOnly group: 'io.jsonwebtoken', name: 'jjwt-jackson', version: '0.11.5'

	// mapstruct
	implementation 'org.mapstruct:mapstruct:1.5.3.Final'
	annotationProcessor 'org.mapstruct:mapstruct-processor:1.5.3.Final'

	// OpenVidu Java Client 의존성
	implementation 'io.openvidu:openvidu-java-client:2.30.0'

	//s3
	implementation 'org.springframework.cloud:spring-cloud-starter-aws:2.2.6.RELEASE'
	implementation "com.amazonaws:aws-java-sdk-s3:1.12.395"

    //jackson
	implementation 'com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.15.2'
}

tasks.named('test') {
	useJUnitPlatform()
}

// Querydsl 빌드 옵션 (옵셔널)
def generated = 'src/main/generated'

// querydsl QClass 파일 생성 위치를 지정
tasks.withType(JavaCompile) {
	options.getGeneratedSourceOutputDirectory().set(file(generated))
}

// java source set 에 querydsl QClass 위치 추가
sourceSets {
	main.java.srcDirs += [ generated ]
}

// gradle clean 시에 QClass 디렉토리 삭제
clean {
	delete file(generated)
}
```

### application.properties

```
spring.application.name=UKIDS

# mysql
spring.datasource.url=jdbc:mysql://mysql:3306/ukids?autoReconnect=true
spring.datasource.username=root
spring.datasource.password=****
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=none
spring.jpa.properties.hibernate.format_sql=true

#port
server.servlet.context-path=/api
server.port=8080

#jwt
spring.jwt.secret=****

#Openvidu
webrtc.openvidu.url=https://i11b306.p.ssafy.io:8443
webrtc.openvidu.secret=MODERN_FAMILY

#S3
aws.s3.accessKey=****
aws.s3.access.secreteKey=****
aws.s3.access.region.static=ap-southeast-2
aws.s3.bucket.name=ukids-photo

#MultiPartFile
spring.servlet.multipart.enabled=true
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

#redis
spring.data.redis.host=redis
spring.data.redis.port=6379

#Chatgpt
chatgpt.open-api-key=***
chatgpt.open-api.model=gpt-3.5-turbo-instruct

logging.level.org.springframework.web.socket=DEBUG
logging.level.org.springframework.messaging=DEBUG
```

# 4. 포트 매핑

- Nginx: 80/443
- Front: 3000
- Back: 8080
- Mysql: 3306
- Redis: 6379
- openvidu: 8443

# 5. CI/CD 구축

### 1. AWS내 docker 설치

```
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable dockerㅣ
```

### 2. jenkins 설치

```
sudo mkdir /home/opendocs/jenkins
sudo docker run --name jenkins -d -p 9090:8080 \
-v /home/opendocs/jenkins:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
-u root jenkins/jenkins

# jenkins container 접속
docker exec -it jenkins /bin/bash
 
# linux 버전 확인
cat /etc/issue
# --------------- OS --------------------------------
# root@DESKTOP-R4P59B3:/home/opendocs# cat /etc/issue
# Ubuntu 20.04.4 LTS \n \l
# --------------- jenkins Container OS --------------------------------
# root@DESKTOP-R4P59B3:/home/opendocs# docker exec -it jenkins /bin/bash
# root@8fc963af71bb:/# cat /etc/issue
# Debian GNU/Linux 11 \n \l
 
# Docker 설치
## - Old Version Remove
apt-get remove docker docker-engine docker.io containerd runc
## - Setup Repo
apt-get update
apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
## - Install Docker Engine
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 3. jenkins와 gitlab 연동

- Front Webhook 연결
    
    ![image.png](https://file.notion.so/f/f/d20edc91-68da-4aea-886c-5070ee092079/6e87c2e0-2097-4620-9f04-9ce70719930c/image.png?table=block&id=a2c5427b-b93d-4b1e-bac5-bc5aee44f0ae&spaceId=d20edc91-68da-4aea-886c-5070ee092079&expirationTimestamp=1723838400000&signature=n_X5meMislvHZVPqU7k4ZWZlWo-cHp8C0hOM_C6N2EE&downloadName=image.png)
    

- Back Webhook
    
    ![image.png](https://file.notion.so/f/f/d20edc91-68da-4aea-886c-5070ee092079/4c3f2786-e2b5-4ed3-b572-1754b25e3cc3/image.png?table=block&id=90f8eb07-b27d-40e5-afec-275c22e773c4&spaceId=d20edc91-68da-4aea-886c-5070ee092079&expirationTimestamp=1723838400000&signature=ST-8gGBBVgzOLP26CsrcZjGuqw5ntMoMKgnGRfGvmm8&downloadName=image.png)
    

### 5. dockerfile 및 jenkins pipeline 작성

1. dockerfile 작성
- back-end
    
    ```
    FROM openjdk:17-jdk-slim
    
    # gradle 빌드를 하면 build/libs 하위에 *.jar 생성됨. 해당 '*.jar'를 'app.jar'로 cpoy
    ARG JAR_FILE_PATH=build/libs/*.jar
    COPY ${JAR_FILE_PATH} app.jar
    
    # .yaml local/prod 프로필 분리 구조일때 실행할 프로필 지정 prod(=운영)
    ENV USE_PROFILE prod
    
    # 이미지 빌드 명령
    ENTRYPOINT ["java", "-Dspring.profiles.active=${USE_PROFILE}", "-jar", "app.jar"]
    
    EXPOSE 8080
    ```
    
- front-end
    
    ```
    FROM node:20.15.0-alpine as builder
    WORKDIR /app
    COPY package.json package-lock.json .
    
    RUN npm install
    COPY . .
    RUN npm run build
    
    FROM nginx:latest
    VOLUME ./nginx
    RUN rm -rf /etc/nginx/conf.d
    COPY ./nginx/conf /etc/nginx
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    EXPOSE 3000
    CMD ["nginx", "-g", "daemon off;"]
    ```
    

1. pipeline 작성
- front-end
    
    ```
    pipeline {
        agent any
    
        environment {
            DOCKER_CREDENTIALS_ID = 'DockerHub'
        }
        
        tools {
            nodejs '20.15.0'
        }
        
        
        stages {
            stage('nodejs install') {
                steps {
                    echo "========== nodejs =========="
                    sh 'node --version'
                    sh 'npm --version'
                }
            }
            stage('Git Clone') {
                steps {
                    git branch: 'develop/front', credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s11-webmobile1-sub2/S11P12B306.git'
                }
            }
            stage('Prepare Directories') {
                steps {
                    script {
                        // Create directories if they do not exist
                        sh '''
                        mkdir -p ukids/nginx/conf/conf.d
                        '''
                    }
                }
            }
    
            stage('Set Permissions') {
                steps {
                    script {
                        sh 'chmod +w ukids/nginx/conf/conf.d || true' 
                        sh 'touch ukids/nginx/conf/conf.d/default.conf'
                        sh 'chmod +w ukids/nginx/conf/conf.d/default.conf || true'
                    }
                }
            }
            
            stage('nginx conf download') {
                steps {
                    withCredentials([file(credentialsId: 'NginxConf', variable: 'nginx')]) {
                        script {
                            sh 'cp $nginx ukids/nginx/conf/conf.d/default.conf'
                        }
                    }
                }
            }
            
            stage('FE-Build') {
                steps {
                    dir('ukids') {
                        sh 'rm -rf node_modules package-lock.json'
                        sh 'npm install @rollup/rollup-linux-x64-gnu'
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
            
            stage('Build Docker Images') {
                steps {
                    script {
                        dir('./ukids') {
                            sh 'docker login -u wogml5890 -p *******'
                            sh 'docker build -t wogml5890/ukids:ukids_fe .'
                            sh 'docker push wogml5890/ukids:ukids_fe'
                        }
                    }
                }
            }
            
            
            stage('Deploy') {
                steps {
                    script {
                        sh 'docker stop ukids_fe || true'
                        sh 'docker rm ukids_fe || true'
                        sh 'docker pull wogml5890/ukids:ukids_fe'
                        sh 'docker rmi $(docker images -f "dangling=true" -q) || true'
                        sh 'docker run -d --name ukids_fe --network ukids wogml5890/ukids:ukids_fe'
                    }
                }
            }
        }
    }
    ```
    
- back-end
    
    ```
    pipeline {
        agent any
    
        environment {
            DOCKER_CREDENTIALS_ID = 'DockerHub'
        }
        
        stages {
            stage('Git Clone') {
                steps {
                    git branch: 'develop/back', credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s11-webmobile1-sub2/S11P12B306.git'
                }
            }
            
            stage('Prepare Directories') {
                steps {
                    script {
                        // Create directories if they do not exist
                        sh '''
                        mkdir -p UKIDS/src/main/resources
                        '''
                    }
                }
            }
    
            stage('Set Permissions') {
                steps {
                    script {
                        // Grant execute permissions to the gradlew file
                        sh 'chmod +x ./UKIDS/gradlew'
                        
                        // Ensure the resources directory and application.properties file exist and set permissions
                        sh 'chmod +w UKIDS/src/main/resources || true' 
                        sh 'touch UKIDS/src/main/resources/application.properties'
                        sh 'chmod +w UKIDS/src/main/resources/application.properties || true'
                    }
                }
            }
            
            stage('application.properties download') {
                steps {
                    withCredentials([file(credentialsId: 'applicationproperties', variable: 'applicationproperties')]) {
                        script {
                            sh 'cp $applicationproperties UKIDS/src/main/resources/application.properties'
                        }
                    }
                }
            }
            
            stage('BE-Build') {
                steps {
                    dir("./UKIDS") {
                        sh "./gradlew clean build -x test"
                    }
                }
            }
            
            stage('Build Docker Images') {
                steps {
                    script {
                        dir("./UKIDS") {
                            sh 'docker login -u wogml5890 -p *******'
                            sh 'docker build -t wogml5890/ukids:ukids_be .'
                            sh 'docker push wogml5890/ukids:ukids_be'
                        }
                    }
                }
            }
            
            stage('Deploy') {
                steps {
                    script {
                        sh 'docker stop ukids_be || true'
                        sh 'docker rm ukids_be || true'
                        
                        sh 'docker pull wogml5890/ukids:ukids_be'
                        sh 'docker rmi $(docker images -f "dangling=true" -q) || true'
                        sh 'docker run -d --name ukids_be --network ukids wogml5890/ukids:ukids_be'
                    }
                }
            }
        }
    }
    ```
    

1. Webserver Nginx 설정
    
    ```json
    server {
        listen 3000;
        
        client_max_body_size 10M;
    
        location / {
            root /usr/share/nginx/html;
            index index.html;
            try_files $uri $uri/ /index.html;
        }
    }
    ```
    

### 6. docker-compose

- docker-compose.yml 작성
    
    ```
    version: "3"
    
    services:
      mysql:
        image: mysql
        container_name: mysql
        environment:
          MYSQL_DATABASE: ukids
          MYSQL_ROOT_PASSWORD: ssafy
          TZ: Asia/Seoul
       expose:
                - "3306"
        networks:
          - ukids
    
      redis:
        container_name: redis
        image: redis
        expose:
                - "6379"
        volumes:
          - ./redis.conf:/usr/local/etc/redis/redis.conf
        networks:
          - ukids
    
    	 proxy:
        image: "nginx:latest"
        container_name: reverse_proxy
        ports:
          - "80:80"
          - "443:443"
        restart: always
        volumes:
          - ./nginx/conf/nginx.conf:/etc/nginx/nginx.conf
          - ./nginx/data/certbot/conf:/etc/letsencrypt
          - ./nginx/data/certbot/www:/var/www/certbot
        networks:
          - ukids
          
    networks:
      ukids:
        external: true
    ```
    

### 7. Nginx 프록시 설정

- certbot ssl 다운로드
    
    ```json
    sudo apt install certbot
    sudo certbot certonly -standalone -d {도메인}
    sudo certbot certificates
    ```
    
- Nginx 설정
    
    ```
    events {
    }
    
    http {
        client_max_body_size 10M;
    
        server {
                listen 80;
                server_name i11b306.p.ssafy.io;
    
                # location /.well-known/acme-challenge/ {
                #        root /var/www/certbot;
                # }
    
                # location / {
                #    try_files $uri $uri/ /index.html
                return 301 https://i11b306.p.ssafy.io$request_uri;
                # }
    
        }
        server {
                listen 443 ssl;
                server_name i11b306.p.ssafy.io;
                # server_tokens off;
    
                ssl_certificate /etc/letsencrypt/live/i11b306.p.ssafy.io/fullchain.pem;
                ssl_certificate_key /etc/letsencrypt/live/i11b306.p.ssafy.io/privkey.pem;
                include /etc/letsencrypt/options-ssl-nginx.conf;
                ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
                location / {
    
                    proxy_pass http://ukids_fe:3000;
                    add_header 'Cross-Origin-Embedder-Policy' 'require-corp';
                    add_header 'Cross-Origin-Opender-Policy' 'same-origin';
    
                    charset utf-8;
                }
    
                location /api {
    
                    proxy_pass http://ukids_be:8080;
                    add_header 'Cross-Origin-Embedder-Policy' 'require-corp';
                    add_header 'Cross-Origin-Opender-Policy' 'same-origin';
    
                    charset utf-8;
                    proxy_set_header Host $http_host;
                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header X-Forwarded-Proto $scheme;
                }
    
                location /ws {
                    proxy_pass http://ukids_be:8080/api;
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection "Upgrade";
                    proxy_set_header Host $host;
                }
        }
    }
    
    ```
    

### 8. openvidu 설치

1. root계정 전환
    
    ```
    sudo su
    ```
    
2. 설치 스크립트 다운 및 실행
    
    ```
    curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
    ```
    
3. openvidu 실행
    
    ```
    $ cd openvidu
    
    $ nano .env
    
    $ ./openvidu start
    ```
    
4. .env 파일 수정
    
    ```
    
    $ cd /opt/openvidu/
    $ vi .env
    ```
    
    ```
    # OpenVidu configuration
    # ----------------------
    # Documentation: https://docs.openvidu.io/en/stable/reference-docs/openvidu-config/
    
    # NOTE: This file doesn't need to quote assignment values, like most shells do.
    # All values are stored as-is, even if they contain spaces, so don't quote them.
    
    # Domain name. If you do not have one, the public IP of the machine.
    # For example: 198.51.100.1, or openvidu.example.com
    DOMAIN_OR_PUBLIC_IP=i11b306.p.ssafy.io
    
    # OpenVidu SECRET used for apps to connect to OpenVidu server and users to access to OpenVidu Dashboard
    OPENVIDU_SECRET=MODERN_FAMILY
    
    # Certificate type:
    # - selfsigned:  Self signed certificate. Not recommended for production use.
    #                Users will see an ERROR when connected to web page.
    # - owncert:     Valid certificate purchased in a Internet services company.
    #                Please put the certificates files inside folder ./owncert
    #                with names certificate.key and certificate.cert
    # - letsencrypt: Generate a new certificate using letsencrypt. Please set the
    #                required contact email for Let's Encrypt in LETSENCRYPT_EMAIL
    #                variable.
    CERTIFICATE_TYPE=letsencrypt
    
    # If CERTIFICATE_TYPE=letsencrypt, you need to configure a valid email for notifications
    LETSENCRYPT_EMAIL=jaeheej5890@gmail.com
    ...
    ```
    
5. 실행
    
    ```
     ./openvidu start
    ```
    

# 6. ERD

![image.png](https://file.notion.so/f/f/d20edc91-68da-4aea-886c-5070ee092079/29eb2e5a-32e8-4a25-8437-8530fe9d18d2/image.png?table=block&id=6d161d64-43a0-47fa-a2f6-559dbeaf4867&spaceId=d20edc91-68da-4aea-886c-5070ee092079&expirationTimestamp=1723838400000&signature=zekSQ4cddz1BrFhKOLd2gyhuk37JEOJ9rxzJGFdhViQ&downloadName=image.png)

## 외부 서비스

### Chat GPT

- https://platform.openai.com/account/api-keys
- 인증키 발급
- [application.properties](http://application.properties)의 chatgpt.open-api-key=인증키
