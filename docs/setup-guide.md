# n8n 설치 및 설정 가이드

## 🚀 빠른 시작

### 1. 리포지토리 클론

```bash
git clone https://github.com/ryu-qqq/n8n-automation-pipelines.git
cd n8n-automation-pipelines
```

### 2. 환경 설정

```bash
cp .env.example .env
# .env 파일을 편집하여 필요한 설정 입력
```

### 3. Docker로 실행

```bash
npm run start
```

### 4. 웹 인터페이스 접속

브라우저에서 `http://localhost:5678` 접속

## 📋 상세 설정

### 인증 설정

기본 인증 정보:
- Username: admin
- Password: admin123 (보안을 위해 변경 필요)

### 데이터베이스 설정

기본적으로 SQLite를 사용하며, PostgreSQL로 변경 가능합니다.

### 워크플로우 백업

```bash
npm run backup
```

### 문제 해결

- 포트 5678이 사용 중인 경우: `.env` 파일에서 N8N_PORT 변경
- 권한 문제: `sudo` 사용 또는 Docker 그룹에 사용자 추가
