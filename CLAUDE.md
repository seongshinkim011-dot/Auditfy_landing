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
섹션 순서: nav → hero(`#top`) → problem(`#problem`) → before/after(`#impact`) → features(`#features`) → modules(`#modules`) → reviews(`#reviews`) → CTA배너 → founder(`#founder`) → FAQ(`#faq`) → apply(`#apply`) → footer.
2026-09-10 재배치: 방문자가 문제 공감 → 해결(Before&After) → 제품 설명 순으로 읽도록 Before&After를 앞으로 승격, 후기는 제품 설명 뒤로 이동.
Pricing 섹션은 삭제됨.

### /free — 감사보고서 무료 변환 퍼널 (2026-10-18)
`free/` 에 컨셉 일곱 장(index 심플이 대표 · fancy · retro · gungseo · newspaper · terminal · receipt — 나머지 여섯은 noindex, canonical 은 /free/)과
디자인 모음 `free/all.html`(noindex · 공유용). 주소는 `vercel.json` cleanUrls 로 `.html` 없이 — /free/retro, /free/all.
신청은 Web3Forms 가 아니라 **Apps Script → 사장님 구글 시트 「감사보고서 변환 신청」**(주소는 `free/config.js` 한 곳), 숨은 `page` 칸으로 컨셉을 구분한다.
스크립트 원본·운영 안내는 `docs/free/`(`.vercelignore` 로 배포 제외).
링크드인 버튼은 익명 원칙 때문에 뺐다. 메뉴 「무료 변환」·배너 「받으실 엑셀 파일 미리 보기」가 /free 로, /free 바닥글이 / 로 잇는다.
⚠ 본 페이지 #apply(Web3Forms)와 /free(Apps Script) 두 곳에서 신청을 받는다 — 하나로 모을지 미정.

## 배포
로컬 작업 사본: `~/Desktop/AIrryn/100. Work/2. Auditfy_project/1. 랜딩페이지/auditfy-site-261018/` — 「1. 랜딩페이지」 세션에서 랜딩(메인·/free)을 모두 관리한다(2026-10-18 사장님 지시).
옆의 `auditfy-site-260726` 은 원격보다 20여 커밋 뒤처진 옛 사본이고 커밋 안 한 수정이 남아 있다 — 손대기 전에 사장님께 확인.
GitHub(`seongshinkim011-dot/Auditfy_landing`) → Vercel 자동배포 → **https://www.auditfy.co.kr** (2026-10-18 연결 · 가비아 DNS: A `@` 216.198.79.1 · CNAME `www` 166c97bc31a85d92.vercel-dns-017.com. · auditfy.co.kr 은 www 로 308 · 예전 주소 auditfy-landing.vercel.app 도 계속 열림)
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
  https://www.auditfy.co.kr/ — 사용자가 바로 눌러서 확인할 수 있도록

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
- **메일: ImprovMX 무료 포워딩** (2026-10-18 설정). hello@auditfy.co.kr →
  seongshinkim011@gmail.com 으로 전달. catch-all(*@auditfy.co.kr)이라 모든 주소가 전달됨.
  **무료 플랜은 수신 전용** — 발신은 여전히 개인 Gmail에서 나간다.
  아웃바운드 시작 전에 발신 주소를 hello@ 로 바꿀 것 (ImprovMX Premium $9/월의 SMTP,
  또는 메일함 서비스 + Gmail "다른 주소에서 메일 보내기").
  가비아 DNS: MX 2개(mx1/mx2.improvmx.com) · SPF · DMARC(p=none) 설정 완료.
  DKIM은 발신을 안 하므로 미설정. 웹용 A(216.198.79.1)·CNAME(www→vercel)은 그대로 유지.
- **Gmail 분류 체계** (2026-10-18 설정, seongshinkim011@gmail.com).
  라벨 4종: `Auditfy` / `Auditfy/01 문의`(초록) / `Auditfy/02 무료진단 신청`(주황) /
  `Auditfy/03 운영·인프라`(회색).
  Gmail 필터 3개 — 모두 소급 적용함:
  1. `to:(hello@auditfy.co.kr)` → 01 문의 라벨 + 중요 표시
  2. `from:(improvmx.com OR vercel.com OR sc-noreply@google.com)` → 03 운영·인프라 라벨
  3. `subject:([감사보고서 변환])` → 02 무료진단 신청 라벨 + 별표
  4. `from:(web3forms.com)` → 02 무료진단 신청 라벨 + 별표 + 중요 표시 +
     **절대 스팸으로 신고하지 않음** + **기본(Primary) 카테고리로 강제 분류**
  3번은 /free 퍼널의 Apps Script 자동응답 제목 접두사에 의존한다 —
  **Apps Script에서 제목 형식을 바꾸면 필터가 깨지므로 같이 수정할 것.**
  MCP로는 필터를 만들 수 없어 브라우저(Chrome)로 직접 설정했다.
  받은편지함은 건너뛰지 않게 뒀다(ImprovMX 장애 알림을 놓치면 hello@가 조용히 죽기 때문).
- **[중요] 랜딩페이지 폼 리드는 web3forms.com에서 온다.** index.html의 폼은
  `api.web3forms.com/submit`으로 전송되고(W3F_ACCESS_KEY), 알림은
  `notify+<랜덤>@web3forms.com` 발신으로 도착한다. 발신 주소가 매번 달라서
  주소 단위 필터로는 못 잡고 도메인으로 잡아야 한다.
  **2026-09-08 신청 건이 실제로 '프로모션' 카테고리로 분류돼 있었다** —
  진짜 리드가 묻힐 수 있는 경로였다. 위 4번 필터가 이걸 막는다.
  Web3Forms 계정이나 Access Key를 바꾸면 필터도 같이 점검할 것.
  (현재까지 들어온 폼 제출 6건은 전부 제작자 본인 테스트: 회사명 '테스트/가나다/오딧파이')
- **받은편지함 대청소** (2026-10-18). 소셜 490개 + 프로모션 245개 대화를 보관 처리.
  대화 1,159개·미읽음 637 → 대화 424개·미읽음 1. **삭제가 아니라 보관**이므로
  전체보관함에 그대로 있고 검색도 된다. 남은 424개는 대부분 '업데이트' 카테고리(381개).
- **발신 표시 이름은 아직 안 바꿨다** (2026-10-18 제작자가 보류). Gmail 표시 이름은
  계정 전체에 적용되므로 개인 메일 발신자명까지 바뀐다. 다만 현재는 실명이 노출되는 상태라
  겸업금지·독립성 때문에 익명 유지가 필요한 원칙과 어긋난다. 표시 이름만 바꿔도
  주소는 개인 Gmail이라 `Auditfy <seongshinkim011@gmail.com>` 불일치가 남는다 —
  아웃바운드 전에 발신 주소까지 함께 해결할 것
- **Vercel 커스텀 이벤트는 Pro 플랜에서만 기록된다.** 2026-09-10 이벤트 6종(cta_click,
  section_view, demo_play, faq_open, form_submit, form_error) 삽입 완료. Hobby 플랜이면
  전송은 되나 대시보드에 안 쌓이므로 플랜 확인 필요. 이벤트에는 개인정보(회사명·이메일·연락처)를
  절대 넣지 않는다 — form_submit은 선택한 신청 항목명만 보낸다
- **후기 고지 문구가 현재 페이지에 하나도 없다** (2026-09-09 제작자 요청으로 2건 모두 삭제).
  삭제한 문구: 푸터 "* 후기는 실제 사용 기업의 피드백이며, 회사명은 익명 처리했습니다",
  후기 섹션 "* 기업 요청에 따라 회사명은 익명으로 표기했으며, 일부 표현은 읽기 쉽게 다듬었습니다".
  후기는 실제 고객 피드백이라 고지 자체가 법상 의무는 아니지만, 문구를 다듬은 사실을
  알리는 표시가 사라졌으므로 정식 출시 전 재검토 권장
- FAQ 답변을 2026-09-09 전면 축약(각 1~2문장). 외감법 금액·인원 기준 목록은 이때 삭제되어
  '외감 기준 회계사 검토' 항목은 해소됨. Q3 보안 답변에서도 미검증 문구
  ('회사별로 분리된 작업 공간')를 제거했고, 남은 문구는 '접근 통제와 암호화를 전제로 처리·저장'.
  실제 인프라와 맞는지 제작자 확인 필요
- **[확인 필요] 03번 블록 문구** — 2026-09-09 제작자 요청으로
  '전기 감사보고서 기반 당기 양식 제시'로 변경(제목도 '초안 제시'로 완화).
  D 섹션과 「감사보고서 변환」의 연결 여부는 여전히 미확인이므로,
  현재 문구가 실제 동작과 맞는지 제작자 확인 필요.
  연결이 완료되면 '자동 완성' 수준으로 표현을 올릴 수 있음
- **Vercel 대시보드에서 Web Analytics를 활성화해야 집계가 시작된다.** 스크립트 태그는 이미 넣어둠
- 이용약관: 미작성. 정식 출시 시 별도 페이지 필요(현재는 링크 자체를 제거해 둠)
- 개인정보 처리방침: 현재 모달은 "수집·이용 안내"까지만 커버. 정식 출시 시
  개인정보보호법 제30조 기준(파기절차·정보주체 권리·보호책임자 등) 별도 문서 필요
- 후기: 실제 고객 후기 확보 시 교체 권장
- 제품 화면 캡처의 재무 데이터가 실제 고객 데이터인지 확인 필요(실제면 기밀·독립성 리스크)
- founder 아바타는 자리표시 SVG — 정식 출범 시 사진 교체 지점에 주석 있음
