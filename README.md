# dev-sync

## 프로젝트 소개


현재 이 프로젝트는 구글 로그인, 사용자 정보 변경, gitHub API를 이용한 사용자 경력 불러오기, GPT3.5 Turbo API를 이용한 텍스트 생성을 구현한 상태입니다. **NestJS**와 **React**로 구성된 풀스택 애플리케이션으로, **back-end**에서는 **NestJS**를 사용하고, **front-end**에서는 **React**와 **Vite**를 사용하고 있습니다.


### 기능
- **구글 로그인**: 구글 OAuth 2.0을 이용해 사용자가 로그인할 수 있습니다.

## 설치 및 실행 방법

### 1. 백엔드 설정

  #### 사전 요구 사항:
  - Node.js 16 이상
  - SQLite3

  #### 백엔드 설치 및 실행:
  1. 백엔드 디렉토리로 이동합니다:
     ```bash
     cd back-end
     npm install
   
  2. .env 파일 설정:
  백엔드 디렉토리(back-end)에 .env.example 파일을 참고하여 필요로 하는 api 키를 입력합니다  
  (키가 없을 경우 아무런 값이나 입력해도 됩니다. 하지만 api동작은 하    지 않습니다.):
     ```bash
     OPENAI_API_KEY=your_openai_api_key_here
     GOOGLE_CLIENT_ID=your_google_client_id_here
     GOOGLE_CLIENT_SECRET=your_google_client_secret_here
     GITHUB_TOKEN=your_github_api_key_here

  4. 개발 모드로 서버를 시작합니다:
     ```bash
     npm run start:dev

  서버는 기본적으로 http://localhost:3000에서 실행됩니다.





### 2. 프론트엔드 설정
사전 요구 사항:
  Node.js 16 이상

####프론트엔드 설치 및 실행:

  1. 프론트엔드 디렉토리로 이동합니다
     ```bash
     cd front-end
     npm install
   
  2. 개발 모드로 프론트엔드를 실행합니다:
     ```bash
     npm run dev

  ####기술 스택

  백엔드: NestJS, TypeORM, Passport (Google OAuth), GitHub API, Open AI API
  프론트엔드: React, Vite
