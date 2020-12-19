# 📒 Dayline 한줄한줄 📒
한줄한줄은 자신의 생각을 기록하는 웹사이트에요.

메모를 하든 일기를 쓰든 생각을 정리하든 자신이 원하는대로 쓰면 되요.

한줄한줄을 공간만을 제공할 뿐, 그것을 채워나가는 것을 당신입니다.

## 🤖 기술적 안내 🤖
한줄한줄에는 XSS 방어가 적용되어 있어요. 조금을 안심할 수 있겠네요.

## 설치 준비하기
서버 컴퓨터에서 `node.js`와 `git`이 설치되어 있어야해요
또한 `mysql` 또는 `mariadb`가 있어야 해요

## 설치하기
### 데이터베이스 세팅하기
원하는 데이터베이스 서버에 로그인하고 새로운 데이터베이스를 생성해주세요. 그안에 `lines`라는 이름을 가진 테이블을 생성할 것이에요. 

|Name|Datatype|Other|
|---|---|---|
|id|INT(11)|PK, Not Null|
|line|VARCHAR(300)|Not Null|
|author|VARCHAR(25)|Not Null|
|created|VARCHAR(256)|Not Null|

### 서버 설치하기
원하는 디렉토리에 이동하고 아래 명령을 차레대로 입력해주세요. 만약 중간에 확인을 묻는다면 수락(y) 해주세요.

윈도우 기준으로 cmd를 열고 cd를 통해 원하는 폴더로 이동하고 아래 명령을 입력해서 소스코드를 받아주세요.

    git clone https://github.com/HyunsDev/dayline

그 다음 폴더를 열고 config 폴더 안에 있는 `db_config.js` 파일의 내용을 적절히 수정해주세요. 그 다음 다시 cmd를 열고 아래 명령을 입력하면 서버가 실행됩니다.

    npm install
    npm start

이제 브라우저에서 `localhost:3000`을 방문하면 한줄한줄을 확인 할 수 있어요!

# Contact
* mail : hyuns@hyuns.me
* discoard : 혀느현스#3891



