#!/usr/bin/env node

/**
 * 간단한 웹 크롤러
 * 
 * 사용법:
 * node crawler/simple-crawler.js [URL]
 * 
 * 예시:
 * node crawler/simple-crawler.js https://example.com
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

class SimpleCrawler {
  constructor(options = {}) {
    this.baseURL = options.baseURL || '';
    this.delay = options.delay || 1000; // 1초 대기
    this.maxRetries = options.maxRetries || 3;
    this.outputDir = options.outputDir || './crawler/output';
    
    // 출력 디렉토리 생성
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * 단일 페이지 크롤링
   */
  async crawlPage(url) {
    try {
      console.log(`🕷️  크롤링 시작: ${url}`);
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      
      // 기본 정보 추출
      const pageData = {
        url: url,
        title: $('title').text().trim(),
        description: $('meta[name="description"]').attr('content') || '',
        keywords: $('meta[name="keywords"]').attr('content') || '',
        headings: [],
        links: [],
        images: [],
        crawledAt: new Date().toISOString()
      };

      // 제목들 추출 (h1, h2, h3)
      $('h1, h2, h3').each((i, el) => {
        const tag = el.tagName;
        const text = $(el).text().trim();
        if (text) {
          pageData.headings.push({ tag, text });
        }
      });

      // 링크들 추출
      $('a[href]').each((i, el) => {
        const href = $(el).attr('href');
        const text = $(el).text().trim();
        if (href && text) {
          pageData.links.push({ href, text });
        }
      });

      // 이미지들 추출
      $('img[src]').each((i, el) => {
        const src = $(el).attr('src');
        const alt = $(el).attr('alt') || '';
        if (src) {
          pageData.images.push({ src, alt });
        }
      });

      console.log(`✅ 크롤링 완료: ${pageData.title}`);
      console.log(`   - 제목: ${pageData.headings.length}개`);
      console.log(`   - 링크: ${pageData.links.length}개`);
      console.log(`   - 이미지: ${pageData.images.length}개`);

      return pageData;

    } catch (error) {
      console.error(`❌ 크롤링 실패 (${url}):`, error.message);
      throw error;
    }
  }

  /**
   * 결과를 JSON 파일로 저장
   */
  saveResults(data, filename) {
    const filepath = path.join(this.outputDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`💾 결과 저장: ${filepath}`);
    return filepath;
  }

  /**
   * 딜레이 추가
   */
  async wait(ms = this.delay) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * 메인 실행 함수
 */
async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.log('사용법: node simple-crawler.js [URL]');
    console.log('예시: node simple-crawler.js https://example.com');
    process.exit(1);
  }

  try {
    const crawler = new SimpleCrawler();
    const result = await crawler.crawlPage(url);
    
    // 결과 저장
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `crawl_result_${timestamp}.json`;
    crawler.saveResults(result, filename);
    
    console.log('\n🎉 크롤링 완료!');
    
  } catch (error) {
    console.error('💥 에러 발생:', error.message);
    process.exit(1);
  }
}

// 스크립트로 직접 실행될 때만 main 함수 실행
if (require.main === module) {
  main();
}

module.exports = SimpleCrawler;
