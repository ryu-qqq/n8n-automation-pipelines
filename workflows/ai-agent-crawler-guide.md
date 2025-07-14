# 🤖 AI Agent Advanced Crawler

AI 에이전트의 툴로 사용할 수 있는 고도화된 크롤러입니다. JSON 설정으로 동적 크롤링과 청킹을 지원합니다.

## 🚀 빠른 임포트

```
https://raw.githubusercontent.com/ryu-qqq/n8n-automation-pipelines/main/workflows/ai-agent-advanced-crawler.json
```

## 📋 JSON 설정 형식

### 🔌 API 크롤링 설정

```json
{
  "type": "api",
  "url": "https://jsonplaceholder.typicode.com/posts",
  "extractors": {
    "posts": {
      "path": "$",
      "fields": {
        "title": "$.title",
        "body": "$.body",
        "userId": "$.userId",
        "id": "$.id"
      }
    }
  },
  "options": {
    "maxResults": 50,
    "chunkSize": 10,
    "timeout": 10000
  }
}
```

### 🌐 HTML 크롤링 설정

```json
{
  "type": "html",
  "url": "https://quotes.toscrape.com",
  "extractors": {
    "quotes": {
      "selector": ".quote",
      "fields": {
        "text": ".text::text",
        "author": ".author::text",
        "tags": ".tag::text[]"
      }
    }
  },
  "options": {
    "maxResults": 100,
    "chunkSize": 20,
    "timeout": 10000
  }
}
```

### 📰 뉴스 사이트 크롤링 설정

```json
{
  "type": "html",
  "url": "https://news.ycombinator.com",
  "extractors": {
    "stories": {
      "selector": ".athing",
      "fields": {
        "title": ".titleline > a::text",
        "url": ".titleline > a::attr(href)",
        "score": ".score::text",
        "comments": ".subtext a:last-child::text"
      }
    }
  },
  "options": {
    "maxResults": 30,
    "chunkSize": 10,
    "timeout": 15000
  }
}
```

## 🔧 설정 옵션 상세

### 필수 필드

- **`type`**: 크롤러 타입 (`"api"` 또는 `"html"`)
- **`url`**: 크롤링할 URL
- **`extractors`**: 데이터 추출 설정

### API 타입 필드

- **`path`**: JSON 경로 (JSONPath 형식)
  - `"$"`: 루트 객체
  - `"$.data"`: data 필드
  - `"$.items[0]"`: items 배열의 첫 번째 요소

- **`fields`**: 추출할 필드 매핑
  - `"$.fieldName"`: JSON 필드 추출
  - 중첩 객체: `"$.user.name"`

### HTML 타입 필드

- **`selector`**: CSS 셀렉터 (반복 요소)
- **`fields`**: 필드별 CSS 셀렉터
  - `"::text"`: 텍스트 추출
  - `"::attr(href)"`: 속성 추출
  - `"::text[]"`: 배열로 추출

### 옵션 설정

- **`maxResults`**: 최대 결과 수 (기본: 1000)
- **`chunkSize`**: 청크 크기 (기본: 50)
- **`timeout`**: 타임아웃 (기본: 10000ms)

## 📦 출력 형식

### 청크 단위 출력

```json
{
  "chunk_id": "posts_chunk_0",
  "extractor": "posts",
  "chunk_info": {
    "index": 0,
    "total_chunks": 5,
    "items_in_chunk": 10,
    "total_items": 50
  },
  "data": [
    {
      "title": "게시글 제목",
      "body": "게시글 내용",
      "userId": 1,
      "id": 1
    }
  ],
  "metadata": {
    "source_url": "https://jsonplaceholder.typicode.com/posts",
    "crawler_type": "api",
    "extracted_at": "2025-07-14T05:00:00.000Z"
  }
}
```

### 전체 요약 (첫 번째 청크에 포함)

```json
{
  "crawl_summary": {
    "total_chunks": 5,
    "total_items": 50,
    "extractors": {
      "posts": {
        "chunks": 5,
        "items": 50
      }
    },
    "processing_time": "2025-07-14T05:00:00.000Z"
  }
}
```

## 🎯 AI 에이전트 연동

### 1. 웹훅 설정

AI 에이전트에서 HTTP 요청으로 크롤링 실행:

```javascript
// AI 에이전트에서 호출
const crawlConfig = {
  type: "api",
  url: "https://api.example.com/data",
  extractors: {
    items: {
      path: "$.results",
      fields: {
        name: "$.name",
        value: "$.value"
      }
    }
  },
  options: {
    maxResults: 100,
    chunkSize: 25
  }
};

// n8n 웹훅으로 전송
const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(crawlConfig)
});
```

### 2. 툴 함수 정의

AI 에이전트에서 사용할 툴 함수:

```typescript
function crawlWebsite(config: CrawlConfig): Promise<CrawlResult[]> {
  // n8n 워크플로우 호출
  // 청크 단위로 결과 반환
}
```

## 🔄 확장 예시

### 인증이 필요한 API

```json
{
  "type": "api",
  "url": "https://api.example.com/protected",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN",
    "X-API-Key": "your-api-key"
  },
  "extractors": {
    "data": {
      "path": "$.results",
      "fields": {
        "id": "$.id",
        "name": "$.name",
        "created_at": "$.created_at"
      }
    }
  },
  "options": {
    "maxResults": 200,
    "chunkSize": 50
  }
}
```

### 복잡한 HTML 구조

```json
{
  "type": "html",
  "url": "https://example-shop.com/products",
  "extractors": {
    "products": {
      "selector": ".product-card",
      "fields": {
        "name": ".product-title::text",
        "price": ".price::text",
        "image": ".product-image img::attr(src)",
        "rating": ".rating-stars::attr(data-rating)",
        "reviews": ".review-count::text",
        "availability": ".stock-status::text"
      }
    },
    "categories": {
      "selector": ".category-nav a",
      "fields": {
        "name": "::text",
        "url": "::attr(href)"
      }
    }
  },
  "options": {
    "maxResults": 500,
    "chunkSize": 25
  }
}
```

### 페이지네이션 처리

```json
{
  "type": "html",
  "url": "https://example.com/articles?page=1",
  "extractors": {
    "articles": {
      "selector": ".article-item",
      "fields": {
        "title": ".article-title::text",
        "summary": ".article-summary::text",
        "author": ".author-name::text",
        "date": ".publish-date::text",
        "url": ".article-link::attr(href)"
      }
    },
    "pagination": {
      "selector": ".pagination",
      "fields": {
        "next_page": ".next-page::attr(href)",
        "total_pages": ".page-info::text"
      }
    }
  },
  "options": {
    "maxResults": 100,
    "chunkSize": 20,
    "followPagination": true,
    "maxPages": 5
  }
}
```

## 🛠️ 실전 사용 예시

### 1. 실시간 뉴스 모니터링

```json
{
  "type": "html",
  "url": "https://news.example.com/latest",
  "extractors": {
    "breaking_news": {
      "selector": ".breaking-news .news-item",
      "fields": {
        "headline": ".headline::text",
        "summary": ".summary::text",
        "timestamp": ".timestamp::text",
        "category": ".category::text",
        "url": ".read-more::attr(href)"
      }
    }
  },
  "options": {
    "maxResults": 50,
    "chunkSize": 10,
    "priority": "high"
  }
}
```

### 2. 소셜 미디어 트렌드 분석

```json
{
  "type": "api",
  "url": "https://api.social-platform.com/trending",
  "headers": {
    "Authorization": "Bearer YOUR_SOCIAL_API_TOKEN"
  },
  "extractors": {
    "trending_topics": {
      "path": "$.trends",
      "fields": {
        "hashtag": "$.name",
        "volume": "$.tweet_volume",
        "location": "$.location",
        "trend_type": "$.promoted"
      }
    }
  },
  "options": {
    "maxResults": 100,
    "chunkSize": 20
  }
}
```

### 3. 경쟁사 가격 모니터링

```json
{
  "type": "html",
  "url": "https://competitor.com/products",
  "extractors": {
    "products": {
      "selector": ".product-grid .product",
      "fields": {
        "name": ".product-name::text",
        "current_price": ".current-price::text",
        "original_price": ".original-price::text",
        "discount": ".discount-percent::text",
        "stock_status": ".stock-indicator::text",
        "sku": "::attr(data-sku)"
      }
    }
  },
  "options": {
    "maxResults": 300,
    "chunkSize": 30,
    "schedule": "hourly"
  }
}
```

## ⚠️ 주의사항 및 베스트 프랙티스

### 1. 성능 최적화

- **청크 크기**: 메모리 사용량을 고려하여 적절한 크기 설정
- **최대 결과 수**: 불필요한 데이터 수집 방지
- **타임아웃**: 응답 시간이 긴 사이트는 충분한 타임아웃 설정

### 2. 에러 처리

- **재시도 로직**: 네트워크 오류 대비
- **폴백 URL**: 주 URL 실패 시 대체 URL
- **유효성 검사**: 추출된 데이터의 형식 검증

### 3. 윤리적 크롤링

- **robots.txt 준수**: 사이트의 크롤링 정책 확인
- **요청 간격**: 서버 부하 방지를 위한 적절한 딜레이
- **사용자 에이전트**: 명확한 봇 식별자 사용

### 4. 법적 고려사항

- **저작권**: 저작권이 있는 콘텐츠 사용 주의
- **개인정보**: 개인정보 수집 시 관련 법규 준수
- **이용약관**: 각 사이트의 이용약관 확인

---

**버전**: 2.0.0  
**최종 업데이트**: 2025-07-14  
**제작자**: ryu-qqq
