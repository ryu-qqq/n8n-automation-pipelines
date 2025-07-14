# n8n Automation Pipelines Project

## 📋 프로젝트 개요

n8n을 활용한 자동화 파이프라인 구축 프로젝트입니다. Notion과 연동되어 체계적인 워크플로우 관리를 제공합니다.

## 🎯 목표

- n8n 서버 설치 및 구성
- 효율적인 자동화 워크플로우 구축
- 체계적인 프로젝트 관리 (Notion ↔ GitHub 연동)

## 🛠️ 기술 스택

- **n8n**: 워크플로우 자동화 플랫폼
- **JavaScript**: 커스텀 노드 및 로직 구현
- **API**: 다양한 서비스 연동
- **Git**: 버전 관리

## 📁 프로젝트 구조

```
n8n-automation-pipelines/
├── README.md
├── package.json
├── docker-compose.yml
├── workflows/          # n8n 워크플로우 파일들
├── custom-nodes/       # 커스텀 노드 개발
├── docs/              # 문서 및 가이드
├── scripts/           # 유틸리티 스크립트
└── .env.example       # 환경변수 템플릿
```

## 🚀 시작하기

### 1. 환경 설정

```bash
git clone https://github.com/ryu-qqq/n8n-automation-pipelines.git
cd n8n-automation-pipelines
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

```bash
cp .env.example .env
# .env 파일을 편집하여 필요한 설정값 입력
```

### 4. Docker로 n8n 실행

```bash
docker-compose up -d
```

## 📊 진행 상황

- [ ] n8n 서버 설치 및 초기 설정
- [ ] 기본 워크플로우 구성
- [ ] 테스트 및 최적화
- [ ] 문서화

## 🔗 관련 링크

- [n8n 공식 문서](https://docs.n8n.io/)
- [Notion 프로젝트 페이지](https://www.notion.so/)

---

**Last Updated**: 2025-07-14  
**Status**: 🚀 개발 시작
