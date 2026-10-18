# UTM 규칙 — 유입 경로를 신청 한 건까지 추적하기

링크에 UTM 을 붙이지 않으면 `/track.js` 는 referrer 도메인까지만 알 수 있다.
**어떤 글에서 왔는지**를 알려면 링크를 아래 규칙대로 만들어야 한다.

결과는 구글 시트「신청」의 **'유입 경로'** 칸에 한 줄로 쌓인다.
예: `naver_blog / post / leadschedule → /free/`

---

## 규칙

| 파라미터 | 뜻 | 쓸 값 |
|---|---|---|
| `utm_source` | **어디서** | `naver_blog` · `linkedin` · `brunch` · `email` |
| `utm_medium` | **어떤 형태로** | `post`(본문 글) · `profile`(프로필·소개란) · `comment`(댓글) · `social` |
| `utm_campaign` | **어떤 글/주제** | 영문 소문자+밑줄. 예: `leadschedule` · `pbc_list` · `cashflow` |

- 전부 **소문자, 공백 없이**. 대소문자가 다르면 다른 값으로 집계된다.
- `utm_campaign` 은 **글 하나당 하나**. 그래야 어느 글이 신청을 만들었는지 보인다.
- 한글은 쓰지 않는다 (인코딩되어 읽기 어려워진다).

## 바로 쓰는 링크

**네이버 블로그 — 글 하단 서명**
```
https://www.auditfy.co.kr/?utm_source=naver_blog&utm_medium=post&utm_campaign=<글주제>
```

**네이버 블로그 — 감사보고서 글의 무료 변환 안내**
```
https://www.auditfy.co.kr/free/?utm_source=naver_blog&utm_medium=post&utm_campaign=<글주제>
```

**네이버 블로그 — 프로필·소개란 고정 링크**
```
https://www.auditfy.co.kr/?utm_source=naver_blog&utm_medium=profile&utm_campaign=bio
```

**링크드인 — 첫 댓글에 다는 링크** (본문에 링크를 달면 도달이 줄어든다)
```
https://www.auditfy.co.kr/?utm_source=linkedin&utm_medium=comment&utm_campaign=<글주제>
```

## 주의

- **검색·AI 유입에는 UTM 을 붙이지 않는다.** 구글·네이버에서 들어온 사람은 referrer 로 자동 구분된다.
  검색 결과 링크에 UTM 을 심을 방법도 없고, 심으면 안 된다.
- 사이트 안에서의 이동(메인 → /free)은 유입으로 세지 않는다. `/track.js` 가 걸러낸다.
- 한 세션 안에서는 **첫 유입**을 유지한다. 단, 새 UTM 을 달고 다시 들어오면 그쪽으로 갱신된다.
- UTM 이 붙은 주소는 사람이 보기에 지저분하다. **블로그 본문에 그대로 노출하지 말고 하이퍼링크로** 걸 것.

## 기록 습관 — 매주 같은 요일에 다섯 줄

도구보다 이게 중요하다. 지금 규모에서는 대시보드보다 이 다섯 숫자가 더 많은 걸 알려준다.

```
2026-10-25  방문 __  검색노출 __  검색클릭 __  신청 __  전환율 __%
```

- 방문·유입 경로 → Vercel Analytics (또는 GA4)
- 검색 노출·클릭 → Google Search Console · 네이버 서치어드바이저
- 신청 수 → 구글 시트「신청」행 수
- 전환율 = 신청 ÷ 방문
