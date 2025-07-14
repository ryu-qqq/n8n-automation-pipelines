# Custom Nodes

n8n 커스텀 노드 개발 폴더입니다.

## 개발 가이드

1. 새 노드 생성 시 `nodes/` 폴더에 생성
2. 노드 타입별로 하위 폴더 구분
3. 테스트 파일은 `__tests__/` 폴더에 작성

## 구조

```
custom-nodes/
├── nodes/
│   ├── triggers/
│   ├── regular/
│   └── credentials/
└── __tests__/
```
