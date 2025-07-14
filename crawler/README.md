# 웹 크롤러

간단한 웹 크롤링 도구입니다.

## 설치

```bash
npm install axios cheerio
```

## 사용법

### 기본 사용법

```bash
node crawler/simple-crawler.js https://example.com
```

### 프로그래밍 방식 사용

```javascript
const SimpleCrawler = require('./simple-crawler');

const crawler = new SimpleCrawler({
  delay: 2000,        // 2초 대기
  outputDir: './data' // 출력 디렉토리
});

const result = await crawler.crawlPage('https://example.com');
crawler.saveResults(result, 'my-crawl.json');
```

## 추출되는 데이터

- **기본 정보**: 제목, 설명, 키워드
- **제목들**: h1, h2, h3 태그의 텍스트
- **링크들**: 모든 링크의 URL과 텍스트
- **이미지들**: 이미지 URL과 alt 텍스트

## 출력 형식

```json
{
  "url": "https://example.com",
  "title": "페이지 제목",
  "description": "페이지 설명",
  "keywords": "키워드들",
  "headings": [
    { "tag": "h1", "text": "메인 제목" },
    { "tag": "h2", "text": "서브 제목" }
  ],
  "links": [
    { "href": "/about", "text": "소개" }
  ],
  "images": [
    { "src": "image.jpg", "alt": "이미지 설명" }
  ],
  "crawledAt": "2025-07-14T05:00:00.000Z"
}
```

## 주의사항

- 로봇 배제 표준(robots.txt)을 확인하세요
- 서버에 과부하를 주지 않도록 적절한 딜레이를 설정하세요
- 저작권과 이용약관을 준수하세요

## 확장 계획

- [ ] 다중 페이지 크롤링
- [ ] 깊이 제한 크롤링
- [ ] CSV 출력 지원
- [ ] 이미지 다운로드
- [ ] 프록시 지원
