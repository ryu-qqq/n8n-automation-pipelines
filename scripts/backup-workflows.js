#!/usr/bin/env node

/**
 * n8n 워크플로우 백업 스크립트
 * 
 * 사용법: npm run backup
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BACKUP_DIR = './backups';
const WORKFLOWS_DIR = './workflows';

function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(BACKUP_DIR, `workflows_${timestamp}`);
  
  // 백업 디렉토리 생성
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  
  try {
    // 워크플로우 폴더 복사
    execSync(`cp -r ${WORKFLOWS_DIR} ${backupPath}`);
    console.log(`✅ 백업 완료: ${backupPath}`);
    
    // 압축 파일 생성
    execSync(`cd ${BACKUP_DIR} && tar -czf workflows_${timestamp}.tar.gz workflows_${timestamp}`);
    console.log(`📦 압축 완료: workflows_${timestamp}.tar.gz`);
    
  } catch (error) {
    console.error('❌ 백업 실패:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  createBackup();
}

module.exports = { createBackup };
