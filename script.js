// ===================================================
// 1. 프로필 데이터 (이 부분만 수정하면 사이트 전체가 바뀝니다)
// ===================================================
const profile = {
  name: '홍길동',
  role: '프론트엔드 개발자',
  intro: '사용자가 편하게 쓸 수 있는 웹 경험을 만드는 것을 좋아합니다. 깔끔한 UI와 빠른 성능을 목표로 합니다.',
  about: [
    '안녕하세요. 웹 인터페이스를 설계하고 구현하는 프론트엔드 개발자입니다.',
    '작은 디테일이 사용자 경험을 바꾼다고 믿으며, 접근성과 유지보수성을 함께 고려합니다.',
    '새로운 기술을 배우고 직접 적용해 보는 것을 즐깁니다.'
  ],
  skills: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'React', 'Git'],
  projects: [
    {
      title: '포트폴리오 블로그',
      description: '마크다운으로 글을 작성하면 정적 페이지로 변환되는 개인 블로그입니다.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://github.com/username/blog'
    },
    {
      title: '할 일 관리 앱',
      description: '드래그 앤 드롭으로 할 일을 정리하고 로컬 저장소에 보관하는 앱입니다.',
      tags: ['React', 'Tailwind CSS'],
      link: 'https://github.com/username/todo-app'
    },
    {
      title: '날씨 대시보드',
      description: '공개 날씨 API를 호출해 도시별 기온과 예보를 카드 형태로 보여줍니다.',
      tags: ['JavaScript', 'REST API'],
      link: 'https://github.com/username/weather-dashboard'
    }
  ],
  email: 'hello@example.com',
  github: 'https://github.com/username'
};

// ===================================================
// 2. 데이터를 화면에 렌더링
// ===================================================
function renderProfile() {
  // data-bind 속성이 있는 요소에 텍스트 채우기
  document.querySelectorAll('[data-bind]').forEach((el) => {
    const key = el.dataset.bind;
    if (profile[key] !== undefined && typeof profile[key] === 'string') {
      el.textContent = profile[key];
    }
  });

  // 아바타 이니셜 (이름의 첫 글자)
  const initial = document.querySelector('[data-bind="initial"]');
  if (initial) initial.textContent = profile.name.charAt(0);

  // 소개 문단
  const aboutText = document.getElementById('about-text');
  aboutText.innerHTML = profile.about
    .map((text) => `<p>${escapeHTML(text)}</p>`)
    .join('');

  // 기술 스택
  const skillsList = document.getElementById('skills-list');
  skillsList.innerHTML = profile.skills
    .map(
      (skill) =>
        `<li class="rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-300">${escapeHTML(skill)}</li>`
    )
    .join('');

  // 프로젝트 카드
  const projectsList = document.getElementById('projects-list');
  projectsList.innerHTML = profile.projects
    .map(
      (project) => `
        <article class="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-xl hover:shadow-brand-500/10">
          <div class="mb-4 h-1 w-12 rounded-full bg-brand-500 transition-all duration-300 group-hover:w-20"></div>
          <h3 class="text-xl font-semibold text-white">${escapeHTML(project.title)}</h3>
          <p class="mt-3 flex-1 leading-relaxed text-slate-400">${escapeHTML(project.description)}</p>
          <div class="mt-5 flex flex-wrap gap-2">
            ${project.tags
              .map(
                (tag) =>
                  `<span class="rounded-md bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-300">${escapeHTML(tag)}</span>`
              )
              .join('')}
          </div>
          <a href="${escapeHTML(project.link)}" target="_blank" rel="noopener noreferrer"
             class="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-400 transition hover:text-brand-300">
            자세히 보기
            <span aria-hidden="true" class="transition group-hover:translate-x-1">→</span>
          </a>
        </article>`
    )
    .join('');

  // 연락처
  document.getElementById('email-link').href = `mailto:${profile.email}`;
  document.getElementById('github-link').href = profile.github;
}

// XSS 방지를 위한 간단한 이스케이프
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ===================================================
// 3. 모바일 메뉴 토글
// ===================================================
function setupMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  const setOpen = (open) => {
    menu.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  };

  toggle.addEventListener('click', () => {
    setOpen(menu.classList.contains('hidden'));
  });

  // 메뉴 링크를 누르면 메뉴 닫기
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  // 화면이 md 이상으로 커지면 메뉴 상태 초기화
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

// ===================================================
// 4. 헤더 스크롤 효과
// ===================================================
function setupHeaderScroll() {
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ===================================================
// 5. 스크롤 시 섹션 페이드인
// ===================================================
function setupReveal() {
  const items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

// ===================================================
// 6. 이메일 복사 버튼
// ===================================================
function setupCopyEmail() {
  const button = document.getElementById('copy-email');
  const originalText = button.textContent;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      button.textContent = '복사되었습니다 ✓';
    } catch (err) {
      // 클립보드 API를 쓸 수 없는 환경 대비
      window.prompt('아래 이메일을 복사하세요:', profile.email);
      button.textContent = originalText;
      return;
    }
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  });
}

// ===================================================
// 7. 초기화
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
  renderProfile();
  setupMobileMenu();
  setupHeaderScroll();
  setupReveal();
  setupCopyEmail();

  document.getElementById('year').textContent = new Date().getFullYear();
});
