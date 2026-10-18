/**
 * 감사보고서 변환 — 신청 받기
 * 구글 시트에 붙인 Apps Script. 랜딩 페이지 신청 폼이 여기로 보낸다.
 *   ① 시트「신청」에 한 줄 쌓는다
 *   ② 신청자에게 접수 확인 메일을 보낸다 (스크립트 주인의 Gmail 로 발송)
 *   ③ 스크립트 주인에게 새 신청 알림을 보낸다
 * DART 는 여기서 조회하지 않는다 — 변환은 시트를 보고 한 건씩 돌린다.
 */

const SHEET_NAME = '신청';
const SENDER_NAME = '감사보고서 변환';
const REPLY_DAYS = 3;
const HEADER = ['신청일시', '회사명', '담당자', '직책', '이메일', '연락처', '유입 페이지', '상태', '발송일', '메모'];

// 메인 랜딩페이지(auditfy.co.kr)에서 들어온 신청은 page 값이 '메인 · …' 으로 시작한다.
// /free 컨셉 페이지들은 '01 심플' 처럼 들어오므로 아래 분기에 걸리지 않는다.
const MAIN_PREFIX = '메인';
const MAIN_ITEM_LABEL = {
  '롤포워드': '감사보고서 양식 롤포워드',
  '진단': '감사 준비 상태 진단',
};

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return json_({ ok: true });                 // 스팸 봇이 채우는 숨은 칸

  const company = clean_(p.company, 100);
  const name = clean_(p.name, 50);
  const title = clean_(p.title, 50);
  const email = clean_(p.email, 120).toLowerCase();
  const phone = clean_(p.phone, 30);
  const page = clean_(p.page, 30);           // 어느 컨셉 페이지에서 신청했는지
  if (!company || !name || !title || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      (phone.match(/\d/g) || []).length < 9 || p.agree !== 'yes') {
    return json_({ ok: false, error: 'invalid' });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet_().appendRow([new Date(), safe_(company), safe_(name), safe_(title), safe_(email), safe_(phone), safe_(page), '접수', '', '']);
  } finally {
    lock.releaseLock();
  }

  try {
    sendReceipt_(company, name, email, page);
    notifyOwner_(company, name, title, email, phone, page);
  } catch (err) {
    console.error(err);                                      // 메일이 실패해도 신청은 시트에 남았다
  }
  return json_({ ok: true });
}

function sendReceipt_(company, name, email, page) {
  const isMain = String(page || '').indexOf(MAIN_PREFIX) === 0;
  const subject = isMain
    ? `[Auditfy] ${company} 무료 신청이 접수되었습니다`
    : `[감사보고서 변환] ${company} 신청이 접수되었습니다`;
  const body = (isMain ? mainBody_(company, name, page) : convertBody_(company, name)).join('\n');
  MailApp.sendEmail({ to: email, subject: subject, body: body, name: isMain ? 'Auditfy' : SENDER_NAME });
}

// 메인 랜딩페이지 — 신청한 항목을 그대로 되읽어 준다
function mainBody_(company, name, page) {
  const items = String(page).replace(/^[^·]*·\s*/, '').split('+')
    .map(function (k) { return MAIN_ITEM_LABEL[k.trim()] || k.trim(); })
    .filter(function (s) { return s; });
  const lines = [
    `${name}님, 안녕하십니까.`,
    '',
    `${company}의 무료 신청이 접수되었습니다.`,
  ];
  if (items.length) lines.push(`신청 항목: ${items.join(' / ')}`);
  lines.push(
    `${REPLY_DAYS}영업일 안에 이 메일 주소로 결과를 보내 드리겠습니다.`,
    '',
    '확인이 필요한 사항이 있으면 별도로 연락드리겠습니다.',
    '',
    '감사합니다.',
    'Auditfy'
  );
  return lines;
}

// /free 감사보고서 변환 퍼널 — 기존 문구 그대로
function convertBody_(company, name) {
  return [
    `${name}님, 안녕하십니까.`,
    '',
    `${company}의 감사보고서 변환 신청이 접수되었습니다.`,
    `${REPLY_DAYS}영업일 안에 아래 두 파일을 이 메일 주소로 보내 드리겠습니다.`,
    '',
    '  1. 2025년 감사보고서 검증 엑셀',
    '  2. 2026년 재무제표 및 주석 엑셀 초안',
    '',
    'DART에 공시된 감사보고서를 기준으로 작업합니다.',
    '공시된 보고서가 확인되지 않으면 별도로 연락드리겠습니다.',
    '',
    '감사합니다.',
    SENDER_NAME,
  ];
}

function notifyOwner_(company, name, title, email, phone, page) {
  const owner = Session.getEffectiveUser().getEmail();
  const url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  MailApp.sendEmail({
    to: owner,
    subject: `[새 신청] ${company}`,
    body: `회사명: ${company}\n담당자: ${name} (${title})\n이메일: ${email}\n연락처: ${phone}\n유입 페이지: ${page || '-'}\n\n${url}`,
    replyTo: email,
  });
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADER);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADER.length).setFontWeight('bold');
  }
  return sh;
}

function clean_(v, max) {
  return String(v || '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
}

// 시트에서 수식으로 읽히지 않게 한다 (=, +, -, @ 로 시작하는 값)
function safe_(v) {
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** 설치 때 한 번 실행 — 시트 머리줄을 만들고 메일 권한을 승인받는다. */
function setup() {
  const sh = sheet_();
  sh.getRange(1, 1, 1, HEADER.length).setValues([HEADER]).setFontWeight('bold');   // 머리줄을 지금 열 구성으로 맞춘다
  MailApp.getRemainingDailyQuota();
  console.log('준비 완료. 오늘 남은 메일 발송 수: ' + MailApp.getRemainingDailyQuota());
}
