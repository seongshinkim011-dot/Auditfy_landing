# Auditfy 랜딩페이지

## 제품
회계감사 대응을 체계적으로 관리하는 B2B SaaS "Audit Readiness Platform".
제작자는 공인회계사(빅4 외부감사 15년). **겸업금지·감사인 독립성 때문에 공개물에서 익명을 유지한다 — 실명·소속을 노출하는 링크나 문구를 추가하지 말 것.**
(2026-09-08: 이 규칙에 어긋나던 푸터 LinkedIn 링크를 제거함. 문의용 Gmail·개인 휴대폰은 대체 채널이 없어 유지 중 — 법인 도메인 메일 확보 시 교체 권장)

## 유지 규칙
- 응답은 한국어로 간결하게
- 브랜드: 블루 `#2B4DE0` / 네이비 `#0F2044` / 제이드 `#1E6B52` / 연배경 `#F6F8FC` / 폰트 Pretendard
- 제품 화면 캡처는 `shot-*.webp` 별도 파일. **base64 인라인으로 되돌리지 말 것**(캐시 불가 + LCP 악화로 2026-09-08 분리함)
- `<img>`에는 항상 `width`/`height` 속성을 넣어 CLS를 막을 것
- 후기 마퀴는 가상 예시다. `.revs__note` 고지는 표시광고법상 필수 — **삭제 금지**

## 구조
단일 `index.html` (CSS/JS 인라인) + 이미지·아이콘 자산.
섹션 순서: nav → hero(`#top`) → reviews(`#reviews`) → problem(`#problem`) → before/after(`#impact`) → features(`#features`) → CTA배너 → founder(`#founder`) → FAQ(`#faq`) → apply(`#apply`) → footer.
Pricing 섹션은 삭제됨.

## 배포
GitHub(`seongshinkim011-dot/Auditfy_landing`) → Vercel 자동배포 → https://auditfy-landing.vercel.app
폼 전송: Web3Forms (access key는 `index.html` 내 `W3F_ACCESS_KEY`)
2026-09-08 실전송 검증 완료 — 제목 `[Auditfy] 무료 진단 신청`, 발신 `Auditfy 랜딩페이지`,
한글 필드명(회사명/이메일/연락처) 정상 수신 확인.

## 배포 규칙 (2026-09-08 합의)
- **로컬 커밋은 작업 단위로 계속 한다.** 이력과 롤백 지점을 남기기 위함
- **`git push` 는 임의로 하지 않는다.** 푸시 = 즉시 Vercel 배포이므로,
  자잘한 배포가 쌓이지 않도록 **사용자가 배포를 요청할 때만** 푸시한다
- 작업을 마칠 때마다 **배포 대기 커밋 수와 내용을 사용자에게 알린다**
  (`git log --oneline origin/main..HEAD`)
- 되돌리기: Vercel 대시보드 → Deployments → Instant Rollback (커밋 단위로 복구 가능)
- **배포를 마치면 답변 끝에 라이브 링크를 항상 함께 전달한다**
  https://auditfy-landing.vercel.app/ — 사용자가 바로 눌러서 확인할 수 있도록

## 수정 후 검증 체크리스트
1. 태그 균형 / CSS 중괄호 / JS 괄호 균형
2. 중복 id 0, 죽은 앵커 0, `href="#"` 0
3. 가로 오버플로우 0 — **320 / 360 / 375 / 414 / 768 / 1024 / 1440px 전부**
   (320px 헤더는 과거 12px 오버플로우 이력 있음 — 회귀 주의)
4. 콘솔 에러 0 (로컬에서 `_vercel/insights/script.js` 404는 정상)
5. 폼 검증 3단계 · 개인정보 모달 · 버거메뉴 동작
6. 이미지 4장 + 파비콘 + OG 로드

로컬 확인: `.claude/launch.json`의 `auditfy-landing` 설정 또는
`python3 -m http.server 8899` 후 http://127.0.0.1:8899

## 열려있는 항목
- **Vercel 대시보드에서 Web Analytics를 활성화해야 집계가 시작된다.** 스크립트 태그는 이미 넣어둠
- 이용약관: 미작성. 정식 출시 시 별도 페이지 필요(현재는 링크 자체를 제거해 둠)
- 개인정보 처리방침: 현재 모달은 "수집·이용 안내"까지만 커버. 정식 출시 시
  개인정보보호법 제30조 기준(파기절차·정보주체 권리·보호책임자 등) 별도 문서 필요
- 후기: 실제 고객 후기 확보 시 교체 권장
- 제품 화면 캡처의 재무 데이터가 실제 고객 데이터인지 확인 필요(실제면 기밀·독립성 리스크)
- founder 아바타는 자리표시 SVG — 정식 출범 시 사진 교체 지점에 주석 있음
