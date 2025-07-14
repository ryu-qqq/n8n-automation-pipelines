# n8n Workflows

이 폴더에는 n8n 워크플로우 파일들이 저장됩니다.

## 📁 구조

- `basic/` - 기본 워크플로우
- `advanced/` - 고급 워크플로우  
- `templates/` - 재사용 가능한 템플릿

## 🕷️ 현재 워크플로우

### [Simple Web Crawler](./simple-web-crawler.json)
웹사이트에서 데이터를 추출하는 기본 크롤링 워크플로우

**기능:**
- 페이지 메타데이터 추출 (제목, 설명, 키워드)
- 모든 링크와 텍스트 수집
- 이미지 URL과 ALT 텍스트 추출
- H1, H2 제목 태그 수집
- 구조화된 JSON 결과 생성

**사용법:**
1. n8n에서 [이 링크](https://raw.githubusercontent.com/ryu-qqq/n8n-automation-pipelines/main/workflows/simple-web-crawler.json)로 임포트
2. "Set Target URL" 노드에서 크롤링할 URL 설정
3. 워크플로우 실행

## 📋 워크플로우 명명 규칙

- `[카테고리]_[기능]_[버전].json`
- 예시: `simple-web-crawler.json`, `email_automation_v1.json`

## 🚀 빠른 임포트

### URL로 직접 임포트:
```
https://raw.githubusercontent.com/ryu-qqq/n8n-automation-pipelines/main/workflows/simple-web-crawler.json
```

### 파일 다운로드:
각 워크플로우 파일을 클릭하여 다운로드 후 n8n에 임포트

---

**저장소**: [n8n-automation-pipelines](https://github.com/ryu-qqq/n8n-automation-pipelines)
