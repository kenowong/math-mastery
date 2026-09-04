/* ============================================================
 * 融会贯通 · 核心逻辑
 * 学习路径 + 学习页 + 练习 + 薄弱点复习 + 通关门禁 + 进度持久化
 * ============================================================ */
(function () {
  const KEY = "mathMastery.v1";
  const $ = sel => document.querySelector(sel);
  const view = () => document.getElementById("view");

  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  let state = load(); // { [id]: { mastered:bool, weak:{ [qidx]:{fails,clear} } } }
  let pendingScrollTech = null; // 返回路径时，定位并高亮到此技巧节点
  const STAGES = ["小学", "中学", "高中"];
  const STAGE_DESC = {
    "小学": "1–6 年级 · 数与代数、图形、奥数启蒙",
    "中学": "7–9 年级 · 初中代数、几何、函数",
    "高中": "10–12 年级 · 高中数学核心与专题"
  };
  let curFilter = { stage: null, grade: null }; // 当前侧边栏筛选（学段/年级）

  /* ---- 解锁规则（按年级动态计算，单一事实来源）----
   * 小学 1–6 年级、初中初一/初二（7、8 年级）：
   *   年级内顺序解锁——第一个技巧为入口，掌握后才会解锁本年级下一个。
   * 初三（9 年级）起：所有技巧均可单独进入（无前置依赖）。
   */
  const ORDER = {}; TECHNIQUES.forEach((t, i) => ORDER[t.id] = i);
  function effPrereq(t) {
    const g = gradeNum(t.grade);
    if (g >= 9) return null;                          // 初三及高中：全部独立入口
    const same = TECHNIQUES.filter(x => x.grade === t.grade)
      .sort((a, b) => ORDER[a.id] - ORDER[b.id]);     // 年级内按编写顺序
    const i = same.findIndex(x => x.id === t.id);
    return i > 0 ? same[i - 1].id : null;             // 首技巧为入口，其余依赖上一技巧
  }
  // 用新规则重写每项 prereq，后续 unlocked / 下一技巧 / 排序 直接复用
  TECHNIQUES.forEach(t => { t.prereq = effPrereq(t); });

  function tech(id) { return TECHNIQUES.find(t => t.id === id); }
  function tstate(id) { if (!state[id]) state[id] = { mastered: false, weak: {} }; return state[id]; }
  function unlocked(id) { const t = tech(id); return !t.prereq || !!(state[t.prereq] && state[t.prereq].mastered); }
  function weakCount() { let n = 0; for (const id in state) for (const k in state[id].weak) if (!state[id].weak[k].cleared) n++; return n; }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function gradeNum(g) { const m = { "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9, "十": 10, "十一": 11, "十二": 12 }; const x = /([一二三四五六七八九十]+)年级/.exec(g || ""); return x ? (m[x[1]] || 99) : 99; }
  function sortGroup(arr) {
    return arr.slice().sort((a, b) => ORDER[a.id] - ORDER[b.id]);
  }

  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 2200);
  }
  function updateBadge() {
    const b = $("#weakBadge"); const n = weakCount();
    if (n > 0) { b.textContent = n; b.classList.add("show"); } else b.classList.remove("show");
  }
  function esc(s) { return (s || "").replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }

  /* ---------------- 题目配图 ---------------- */
  function qfigSpec(t, qidx) {
    const q = t.questions[qidx];
    if (q && q.fig) return q.fig;                       // 题目自带
    const k = t.id + "::" + qidx;
    return (window.QFIG_MAP && window.QFIG_MAP[k]) || null; // 逐题注册表
  }
  function qfigSVG(t, qidx) {
    const spec = qfigSpec(t, qidx);
    if (!spec || !window.Fig) return "";
    let name, params = {};
    if (typeof spec === "string") name = spec;
    else { name = spec.name; params = spec; }
    if (!window.Fig[name]) return "";
    try { return `<div class="qfig">${window.Fig[name](params)}</div>`; }
    catch (e) { return ""; }
  }
  // 渲染单题自带配图（生成题也可用 q.fig 指定图元名或 {name,参数}）
  function renderFigOf(q) {
    if (!q || !q.fig || !window.Fig) return "";
    let name, params = {};
    if (typeof q.fig === "string") name = q.fig;
    else { name = q.fig.name; params = q.fig; }
    if (!window.Fig[name]) return "";
    try { return `<div class="qfig">${window.Fig[name](params)}</div>`; }
    catch (e) { return ""; }
  }

  /* ---------------- 路由 ---------------- */
  function route() {
    const h = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    const parts = h.split("/");
    document.querySelectorAll(".nav-link").forEach(a => a.classList.toggle("active", a.dataset.route === parts[0]));
    view().className = "view";
    updateBadge();
    if (parts[0] === "" || parts[0] === "path") return renderPath(parts[1] || null, parts[2] || null);
    if (parts[0] === "learn") return renderLearn(parts[1]);
    if (parts[0] === "practice") return renderQuiz(parts[1], "practice");
    if (parts[0] === "gate") return renderQuiz(parts[1], "gate");
    if (parts[0] === "review") return renderReview();
    if (parts[0] === "progress") return renderProgress();
    if (parts[0] === "resources") return renderResources();
    renderPath(null, null);
  }
  window.addEventListener("hashchange", route);
  // 已在「薄弱点复习」页内再点该导航：hash 不变不会触发路由，手动重渲染，便于清完后立即看空状态
  document.querySelectorAll(".nav-link").forEach(a => a.addEventListener("click", () => {
    if (a.dataset.route === "review" && location.hash.replace(/^#\/?/, "") === "review") renderReview();
  }));

  // 返回学习路径，并定位/高亮到指定技巧节点（避免回到页面最顶部）
  function goPath(techId) {
    pendingScrollTech = techId || null;
    const target = curFilter.stage ? "#/path/" + curFilter.stage + (curFilter.grade ? "/" + curFilter.grade : "") : "#/path";
    if (location.hash.replace(/^#\/?/, "").indexOf("path") === 0) renderPath(curFilter.stage, curFilter.grade);
    else location.hash = target;
  }

  /* ---------------- 学习路径（侧边栏 + 主区） ---------------- */
  function renderPath(stage, grade) {
    curFilter = { stage: stage || null, grade: grade || null };
    const v = view(); v.className = "view path-view"; v.innerHTML = "";
    const layout = document.createElement("div");
    layout.className = "path-layout";
    layout.innerHTML = buildSidebar()
      + '<div class="sb-mask" id="sbMask"></div>'
      + '<div class="path-main" id="pathMain"></div>'
      + '<button class="sb-fab" id="sbFab">☰ 目录</button>';
    v.appendChild(layout);
    const topBtn = document.createElement("button");
    topBtn.className = "sb-top-btn"; topBtn.id = "sbTopBtn";
    topBtn.textContent = "☰ 选择年级 / 学段";
    topBtn.addEventListener("click", () => layout.classList.toggle("sb-drawer-open"));
    layout.querySelector("#pathMain").insertBefore(topBtn, layout.querySelector("#pathMain").firstChild);
    renderPathMain(layout.querySelector("#pathMain"));
    bindSidebar(layout);
  }

  // 侧边栏：学段 → 年级 两级导航
  function buildSidebar() {
    let html = '<aside class="sidebar" id="sidebar">'
      + '<div class="sb-head"><span class="sb-title">年级导航</span>'
      + '<button class="sb-toggle" id="sbToggle" title="收起/展开">«</button></div>';
    html += '<a class="sb-item' + (curFilter.stage ? "" : " active") + '" href="#/path"><span class="sb-ico">☰</span>全部方法</a>';
    STAGES.forEach(stage => {
      const grades = [...new Set(TECHNIQUES.filter(t => t.stage === stage).map(t => t.grade))]
        .sort((a, b) => gradeNum(a) - gradeNum(b));
      if (!grades.length) return;
      const open = !curFilter.stage || curFilter.stage === stage;
      html += '<div class="sb-stage' + (open ? " open" : "") + '">';
      html += '<div class="sb-stage-h" data-stage="' + esc(stage) + '"><span class="sb-caret">' + (open ? "▾" : "▸") + '</span>'
        + esc(stage) + '<span class="sb-cnt">' + grades.length + '</span></div>';
      html += '<div class="sb-grades">';
      html += '<a class="sb-grade' + (curFilter.stage === stage && !curFilter.grade ? " active" : "") + '" href="#/path/' + enc(stage) + '">全部' + esc(stage) + '</a>';
      grades.forEach(g => {
        const cnt = TECHNIQUES.filter(t => t.stage === stage && t.grade === g).length;
        const act = curFilter.stage === stage && curFilter.grade === g ? " active" : "";
        html += '<a class="sb-grade' + act + '" href="#/path/' + enc(stage) + '/' + enc(g) + '">' + esc(g)
          + '<span class="sb-cnt">' + cnt + '</span></a>';
      });
      html += '</div></div>';
    });
    html += '</aside>';
    return html;
  }
  function enc(s) { return encodeURIComponent(s); }

  function bindSidebar(layout) {
    const toggle = layout.querySelector("#sbToggle");
    if (toggle) toggle.addEventListener("click", () => layout.classList.toggle("sb-collapsed"));
    const fab = layout.querySelector("#sbFab");
    if (fab) fab.addEventListener("click", () => layout.classList.toggle("sb-drawer-open"));
    const mask = layout.querySelector("#sbMask");
    if (mask) mask.addEventListener("click", () => layout.classList.remove("sb-drawer-open"));
    layout.querySelectorAll(".sb-stage-h").forEach(h => {
      h.addEventListener("click", () => {
        h.parentElement.classList.toggle("open");
        const caret = h.querySelector(".sb-caret");
        if (caret) caret.textContent = h.parentElement.classList.contains("open") ? "▾" : "▸";
      });
    });
    layout.querySelectorAll(".sb-grade, .sb-item").forEach(a => {
      a.addEventListener("click", () => { if (window.innerWidth <= 820) layout.classList.remove("sb-drawer-open"); });
    });
  }

  // 主区域：按当前筛选渲染学段横幅 + 年级分隔 + 方法节点
  function renderPathMain(main) {
    const h = document.createElement("h2"); h.className = "section"; h.textContent = "学习路径"; main.appendChild(h);
    const hint = document.createElement("div"); hint.className = "hint";
    hint.textContent = "按 小学 → 中学 → 高中 排列，细分到年级。小学各年级、初一·初二年级：年级内顺序解锁——第一个技巧是入口，掌握后才会解锁本年级下一个。初三及高中：所有技巧均可直接进入。练习做错的题进入「薄弱点」，复习通关才算掌握。";
    main.appendChild(hint);

    const groups = {};
    TECHNIQUES.forEach(t => { const k = t.stage + "|" + t.grade; (groups[k] = groups[k] || []).push(t); });

    let stepNo = 0;
    STAGES.forEach(stage => {
      if (curFilter.stage && curFilter.stage !== stage) return;
      const grades = [...new Set(TECHNIQUES.filter(t => t.stage === stage).map(t => t.grade))]
        .sort((a, b) => gradeNum(a) - gradeNum(b));
      if (!grades.length) return;
      const sb = document.createElement("div"); sb.className = "stage-banner";
      sb.innerHTML = `<span class="stage-name">${stage}</span><span class="stage-desc">${STAGE_DESC[stage]}</span>`;
      main.appendChild(sb);
      grades.forEach(g => {
        if (curFilter.grade && curFilter.grade !== g) return;
        const sub = document.createElement("div"); sub.className = "grade-sep";
        sub.innerHTML = `<span class="grade-tag">${g}</span><span class="grade-count">${groups[stage + "|" + g].length} 个技巧</span>`;
        main.appendChild(sub);
        sortGroup(groups[stage + "|" + g]).forEach(t => {
          stepNo++;
          const st = tstate(t.id);
          const open = unlocked(t.id);
          const status = !open ? "lock" : (st.mastered ? "done" : "learn");
          const node = document.createElement("div");
          node.className = "node " + (status === "done" ? "mastered" : status === "lock" ? "locked" : "");
          const weakN = Object.keys(st.weak).filter(k => !st.weak[k].cleared).length;
          node.innerHTML = `
            <div class="step">${status === "done" ? "✓" : stepNo}</div>
            <div class="body">
              <div class="title">${esc(t.name)}
                ${status === "lock" ? '<span class="lock-ico">🔒</span>' : ""}
                <span class="status-pill ${status === "lock" ? "lock" : status === "done" ? "done" : "learn"}">${status === "lock" ? "未解锁" : status === "done" ? "已掌握" : "学习中"}</span>
                ${weakN ? `<span class="tag w">薄弱点 ${weakN}</span>` : ""}
              </div>
              <div class="meta">${esc(t.summary)}</div>
              <div class="acts">
                ${open ? `<a class="btn sm" href="#/learn/${t.id}">去学习</a>` : ""}
                ${open ? `<a class="btn sm ghost" href="#/practice/${t.id}">练习</a>` : ""}
                ${open && !st.mastered ? `<a class="btn sm soft" href="#/gate/${t.id}">通关测试</a>` : ""}
              </div>
              ${status === "lock" ? `<div class="meta" style="color:var(--lock)">需先掌握：${esc(tech(t.prereq).name)}</div>` : ""}
            </div>`;
          node.id = "node-" + t.id;
          main.appendChild(node);
        });
      });
    });
    if (pendingScrollTech) {
      const el = document.getElementById("node-" + pendingScrollTech);
      if (el) { el.scrollIntoView({ block: "center" }); el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 1800); }
      pendingScrollTech = null;
    }
  }

  /* ---------------- 学习页 ---------------- */
  function renderLearn(id) {
    const v = view(); v.innerHTML = "";
    const t = tech(id); if (!t) return renderPath();
    if (!unlocked(id)) { toast("先融会贯通上一技巧才能解锁"); location.hash = "#/path"; return; }
    const st = tstate(id);

    const card = document.createElement("div"); card.className = "card";
    const exHtml = (t.questions || []).map((q, qi) => `
      <div class="ex">
        <div class="ex-q"><span class="ex-no">例${qi + 1}</span><span>${esc(q.q)}</span></div>
        <div class="ex-opts">
          ${q.opts.map((o, oi) => `<span class="ex-opt${oi === q.ans ? " correct" : ""}">${oi === q.ans ? "✓ " : ""}${esc(o)}</span>`).join("")}
        </div>
        <details class="ex-why"><summary>看解析</summary>
          <div class="ex-exp">${esc(q.explain)}</div>
          <div class="ex-point">🎯 要点：${esc(q.point || "")}</div>
        </details>
      </div>`).join("");
    card.innerHTML = `
      <div class="tech-head"><h2 class="section" style="margin:0">${esc(t.name)}</h2><span class="tag">${esc(t.grade)}</span></div>
      <div class="muted">${esc(t.summary)}</div>
      <div class="kou"><b>名师口诀：</b>${esc(t.kou)}</div>
      <h3>解题步骤</h3>
      <ol class="steps">${t.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      <h3>典型例题 <span class="hint-inline">（先读题想一想，再点开解析对照）</span></h3>
      <div class="ex-list">${exHtml || '<div class="muted">该方法暂未配置例题。</div>'}</div>`;
    v.appendChild(card);

    if (t.anim && window.Anim && window.Anim[t.anim]) {
      const aw = document.createElement("div"); aw.className = "card";
      aw.innerHTML = `<h3>动图演示</h3><div class="anim-wrap" id="animBox"></div>`;
      v.appendChild(aw);
      window.Anim[t.anim](aw.querySelector("#animBox"));
    }

    const acts = document.createElement("div"); acts.className = "row";
    acts.style.margin = "4px 0 18px";
    acts.innerHTML = `
      <a class="btn" href="#/practice/${t.id}">开始练习（${typeof t.qgen === "function" ? "每轮 8 题·随机" : t.questions.length + " 题"}）</a>
      ${!st.mastered ? `<a class="btn soft" href="#/gate/${t.id}">通关测试</a>` : `<span class="status-pill done">已掌握 ✓</span>`}
      <a class="btn ghost" id="backBtnL" href="#/path">返回路径</a>`;
    v.appendChild(acts);
    acts.querySelector("#backBtnL").addEventListener("click", (e) => { e.preventDefault(); goPath(t.id); });
  }

  /* ---------------- 练习 / 通关 ---------------- */
  function shuffleOptions(q) {
    const idx = q.opts.map((_, i) => i);
    const sh = shuffle(idx);
    return { opts: sh.map(i => q.opts[i]), ans: sh.indexOf(q.ans) };
  }

  // 判断题识别：仅 2 个选项且语义为「对/错」
  function isJudge(q) {
    if (!q.opts || q.opts.length !== 2) return false;
    const s = q.opts.map(x => String(x).trim());
    const yes = s.some(x => x === "对" || x === "正确" || x === "✓" || x === "✔");
    const no = s.some(x => x === "错" || x === "错误" || x === "✗" || x === "✘");
    return yes && no;
  }
  // 判断题标记：✓ 对 / ✗ 错
  function judgeMark(text) {
    const t = String(text).trim();
    return (t === "对" || t === "正确" || t === "✓" || t === "✔") ? "✓" : "✗";
  }

  /* ---------------- 跨组去重出题引擎 ----------------
   * 目标：同一方法「再练一组」时，新组与最近 10 组已做过的题不重复；
   *       单组内也不重复。题库足够大时即可做到 10 组(80 题)内互不重复。
   */
  const roundHistory = {}; // { techId: [ Set(本轮指纹), ... 最多保留 10 组 ] }
  function quizFP(q) {
    const ans = q.opts ? String(q.opts[q.ans]) : "";
    return (q.q || "").replace(/\s+/g, "") + " " + ans;
  }
  function genRound(t, count) {
    const arr = roundHistory[t.id] || [];
    const hist = new Set();
    arr.slice(-9).forEach(s => s.forEach(f => hist.add(f))); // 最近 9 组，保证 10 组内不重
    const used = new Set();
    const out = [];
    let tries = 0;
    while (out.length < count && tries < 80) {
      tries++;
      const b = t.qgen(count);
      for (const c of b) {
        const f = quizFP(c);
        if (hist.has(f) || used.has(f)) continue;
        used.add(f); out.push(c);
        if (out.length >= count) break;
      }
    }
    // 题库不足时（如某些基础法题型极少），仅保证本轮内不重复，避免卡死
    let t2 = 0;
    while (out.length < count && t2 < 80) {
      t2++;
      const b = t.qgen(count);
      for (const c of b) {
        const f = quizFP(c);
        if (used.has(f)) continue;
        used.add(f); out.push(c);
        if (out.length >= count) break;
      }
    }
    while (out.length < count) { const b = t.qgen(count); out.push(b[out.length % b.length]); }
    arr.push(used);
    if (arr.length > 10) arr.shift();
    roundHistory[t.id] = arr;
    return out.slice(0, count);
  }

  function renderQuiz(id, mode) {
    const v = view(); v.innerHTML = "";
    const t = tech(id); if (!t) return renderPath();
    if (!unlocked(id)) { toast("先融会贯通上一技巧才能解锁"); location.hash = "#/path"; return; }
    const st = tstate(id);

    const genMode = typeof t.qgen === "function";
    let items; // {q, qidx, gen}
    if (genMode) {
      // 参数化出题 + 跨组去重：再练一组会与最近 10 组已做过的题去重，做到 10 组内不重复
      items = genRound(t, 8).map((q, idx) => ({ q, qidx: idx, gen: true }));
    } else {
      let pool;
      if (mode === "gate") {
        const weakIdx = Object.keys(st.weak).filter(k => !st.weak[k].cleared).map(Number);
        const rest = shuffle(t.questions.map((_, i) => i)).filter(i => !weakIdx.includes(i));
        pool = weakIdx.concat(rest).slice(0, Math.max(5, weakIdx.length));
      } else {
        // 自由练习：每次随机抽题（随机子集 + 随机顺序），避免每次都是同一批固定题
        // 题少（≤6 道）时全部出示；题多时抽约 70%，且至少出 5 道，保证「每轮不少于 5 题」
        const n = t.questions.length;
        const k = n <= 6 ? n : Math.max(5, Math.ceil(n * 0.7));
        pool = shuffle(t.questions.map((_, i) => i)).slice(0, k);
      }
      items = pool.map(i => ({ q: t.questions[i], qidx: i, gen: false }));
    }
    const total = items.length;
    let answered = 0, correct = 0;

    const head = document.createElement("div"); head.className = "card";
    head.innerHTML = `<div class="tech-head"><h2 class="section" style="margin:0">${esc(t.name)} · ${mode === "gate" ? "通关测试" : "自由练习"}</h2>
      <span class="tag">${mode === "gate" ? "需 ≥80% 且薄弱点清零" : "不限量"}</span></div>
      <div class="muted">${mode === "gate" ? "通关测试会优先把你之前的薄弱点放进题里；全部答对并清零薄弱点，才算融会贯通、解锁下一技巧。" : "随手练，做错自动记入薄弱点，可去「薄弱点复习」集中攻克。"}</div>`;
    v.appendChild(head);

    const list = document.createElement("div"); v.appendChild(list);

    function finish() {
      const weakRemain = Object.keys(st.weak).filter(k => !st.weak[k].cleared).length;
      const banner = document.createElement("div"); banner.className = "card center";
      if (mode === "gate") {
        const pass = correct >= Math.ceil(total * 0.8) && weakRemain === 0;
        if (pass) {
          st.mastered = true; save(state);
          const nxt = TECHNIQUES.find(x => x.prereq === t.id);
          const freeToEnter = gradeNum(t.grade) >= 9;
          banner.innerHTML = `<div class="qres" style="color:var(--ok)">🎉 融会贯通！${esc(t.name)} 已掌握</div>
            ${nxt ? `<div class="muted">下一技巧已解锁：<b>${esc(nxt.name)}</b></div>
              <a class="btn" href="#/learn/${nxt.id}" style="margin-top:10px">去学习 ${esc(nxt.name)}</a>`
              : (freeToEnter ? `<div class="muted">本年级所有技巧均可直接进入，按需挑选下一个继续吧。</div>`
                : `<div class="muted">已是本年级最后一道技巧，全部通关！</div>`)}`;
        } else {
          banner.innerHTML = `<div class="qres" style="color:var(--warn)">还差一点：本次正确 ${correct}/${total}${weakRemain ? `，还有 ${weakRemain} 个薄弱点没清零` : ""}</div>
            <div class="muted">去「薄弱点复习」或再练几组，清零后才能通关。</div>
            <a class="btn soft" href="#/review" style="margin-top:8px">去复习薄弱点</a>`;
        }
      } else {
        banner.innerHTML = `<div class="qres">本轮完成 ${total} 题，正确 ${correct} 题。</div>
          <a class="btn ghost" id="backBtn2" href="#/path">返回路径</a>`;
        banner.querySelector("#backBtn2").addEventListener("click", (e) => { e.preventDefault(); goPath(t.id); });
      }
      list.appendChild(banner);
      updateBadge();
    }

    items.forEach((it, qi) => {
      const q = it.q;
      const judge = isJudge(q);
      const disp = judge ? { opts: q.opts, ans: q.ans } : shuffleOptions(q);
      const card = document.createElement("div"); card.className = "q"; card.dataset.done = "0";
      const tag = q.level === "易错" ? '<span class="tag w">易错</span>' : (q.level === "进阶" ? '<span class="tag g">进阶</span>' : '<span class="tag">基础</span>');
      const fig = renderFigOf(q);
      card.innerHTML = `<div class="qtext">${qi + 1}. ${esc(q.q)} ${tag}</div>
        ${fig}
        <div class="opts${judge ? " judge" : ""}">${disp.opts.map((o, i) => `<div class="opt${judge ? " judge" : ""}" data-i="${i}"><span class="mark${judge ? " judge" : ""}">${judge ? judgeMark(o) : String.fromCharCode(65 + i)}</span><span>${esc(o)}</span></div>`).join("")}</div>`;
      list.appendChild(card);

      const opts = card.querySelectorAll(".opt");
      opts.forEach(op => op.addEventListener("click", () => {
        if (card.dataset.done === "1") return;
        card.dataset.done = "1";
        const chosen = +op.dataset.i;
        const ans = disp.ans;
        opts.forEach((o, i) => { o.style.pointerEvents = "none"; if (i === ans) o.classList.add("correct"); });
        if (chosen === ans) op.classList.add("correct"); else op.classList.add("wrong");
        const ex = document.createElement("div"); ex.className = "explain"; ex.innerHTML = "解析：" + esc(q.explain); card.appendChild(ex);

        if (chosen === ans) {
          correct++;
          if (mode === "gate") {
            // 通关测试（正式测验）：做对一次即清零该薄弱点
            if (it.gen) st.weak[t.id] = { fails: 0, cleared: true, passes: 1 };
            else if (st.weak["" + it.qidx]) { st.weak["" + it.qidx].cleared = true; st.weak["" + it.qidx].passes = 1; }
          } else {
            // 自由练习：需连对 2 次（跨「再练一组」累计）才消除；单次做对只记 1 次通过
            if (it.gen) {
              const w = st.weak[t.id] || { fails: 0, cleared: false, passes: 0 };
              w.passes = (w.passes || 0) + 1; w.cleared = w.passes >= 2; w.fails = 0; st.weak[t.id] = w;
            } else if (st.weak["" + it.qidx]) {
              const w = st.weak["" + it.qidx]; w.passes = (w.passes || 0) + 1; w.cleared = w.passes >= 2; w.fails = 0;
            }
          }
        } else {
          if (it.gen) { const w = st.weak[t.id] || { fails: 0, cleared: false, passes: 0 }; w.fails++; w.cleared = false; w.passes = 0; st.weak[t.id] = w; }
          else { const w = st.weak["" + it.qidx] || { fails: 0, cleared: false, passes: 0 }; w.fails++; w.cleared = false; w.passes = 0; st.weak["" + it.qidx] = w; }
        }
        save(state); updateBadge();
        answered++;
        if (answered === total) finish();
      }));
    });

    if (mode === "practice") {
      const again = document.createElement("div"); again.className = "row"; again.style.margin = "6px 0 16px";
      again.innerHTML = `<a class="btn ghost" id="againBtn" href="#/practice/${t.id}">🔄 再练一组</a><a class="btn soft" id="backBtn" href="#/path">返回路径</a>`;
      v.appendChild(again);
      // 关键修复：当前页 hash 与按钮 href 相同，hashchange 不会触发，需手动强制重渲染
      again.querySelector("#againBtn").addEventListener("click", (e) => {
        e.preventDefault();
        renderQuiz(t.id, "practice"); // 重新进入会重新随机抽题 / 重新生成，做到「再练一组」立即出新题
      });
      // 返回路径时，定位到当前练习的技巧节点，而不是回到页面顶部
      again.querySelector("#backBtn").addEventListener("click", (e) => {
        e.preventDefault();
        goPath(t.id);
      });
    }
  }

  /* ---------------- 薄弱点复习（连对 2 道同类题才消除） ---------------- */
  function nextWeakQ(it) {
    if (it.gen) return it.t.qgen(1)[0];          // 参数化方法：永远是新生成的同类题
    const qs = it.t.questions, j = Math.floor(Math.random() * qs.length);
    return qs[j];                                 // 静态方法：从本法所有题里抽一道同类题确认
  }
  function renderReview() {
    const v = view(); v.innerHTML = "";
    const h = document.createElement("h2"); h.className = "section"; h.textContent = "薄弱点复习"; v.appendChild(h);
    const items = [];
    TECHNIQUES.forEach(t => {
      const st = tstate(t.id);
      const gen = typeof t.qgen === "function";
      Object.keys(st.weak).forEach(k => {
        if (st.weak[k].cleared) return;
        items.push(gen
          ? { t, gen: true, key: t.id, q: t.qgen(1)[0] }       // 整法为薄弱点
          : { t, gen: false, key: "" + k, q: t.questions[+k] }); // 具体某题
      });
    });
    if (!items.length) {
      v.innerHTML += `<div class="empty">🎉 暂时没有薄弱点，继续保持！</div>`;
      return;
    }
    const tip = document.createElement("div"); tip.className = "hint";
    tip.textContent = `共 ${items.length} 个薄弱点。每个需「连对 2 道同类题」才消除：做对 1 道会再出 1 道同类题确认，做错则回到起点重新计。`;
    v.appendChild(tip);

    let clearedCount = 0; const total = items.length;
    const prog = document.createElement("div"); prog.className = "rev-prog";
    v.appendChild(prog);
    const list = document.createElement("div"); v.appendChild(list);
    function refreshProg() { prog.innerHTML = `已消除 <b>${clearedCount}</b>/${total}　·　待巩固 <b>${total - clearedCount}</b>`; }
    refreshProg();

    function paintCard(card, it, passes) {
      card.dataset.done = "0";
      const q = it.q, judge = isJudge(q);
      const disp = judge ? { opts: q.opts, ans: q.ans } : shuffleOptions(q);
      const fig = renderFigOf(q);
      card.innerHTML = `<div class="qtext">${esc(it.t.name)} ｜ ${esc(q.q)}</div>${fig}
        <div class="opts${judge ? " judge" : ""}">${disp.opts.map((o, j) => `<div class="opt${judge ? " judge" : ""}" data-i="${j}"><span class="mark${judge ? " judge" : ""}">${judge ? judgeMark(o) : String.fromCharCode(65 + j)}</span><span>${esc(o)}</span></div>`).join("")}</div>`;
      const opts = card.querySelectorAll(".opt");
      opts.forEach(op => op.addEventListener("click", () => {
        if (card.dataset.done === "1") return; card.dataset.done = "1";
        const chosen = +op.dataset.i, ans = disp.ans;
        opts.forEach((o, j) => { o.style.pointerEvents = "none"; if (j === ans) o.classList.add("correct"); });
        if (chosen === ans) op.classList.add("correct"); else op.classList.add("wrong");
        const ex = document.createElement("div"); ex.className = "explain"; ex.innerHTML = "解析：" + esc(q.explain); card.appendChild(ex);
        const w = tstate(it.t.id).weak[it.key] || (tstate(it.t.id).weak[it.key] = { fails: 0, cleared: false, passes: 0 });
        if (chosen === ans) {
          passes++; w.passes = passes; w.fails = 0;
          if (passes >= 2) {
            w.cleared = true; clearedCount++; save(state); updateBadge(); refreshProg();
            card.classList.add("cleared");
            const note = document.createElement("div"); note.className = "rev-note ok"; note.textContent = "✅ 连对 2 道，已永久消除"; card.appendChild(note);
            if (clearedCount === total) {
              const b = document.createElement("div"); b.className = "card center";
              b.innerHTML = `<div class="qres" style="color:var(--ok)">🎉 全部 ${total} 个薄弱点已清零！</div>`;
              list.appendChild(b);
              setTimeout(() => renderReview(), 1100); // 自动重渲染，展示空状态
            }
          } else {
            w.cleared = false; save(state); updateBadge();
            const note = document.createElement("div"); note.className = "rev-note ok"; note.textContent = "✅ 第 1 道做对，再来 1 道同类题确认"; card.appendChild(note);
            it.q = nextWeakQ(it);
            setTimeout(() => paintCard(card, it, passes), 650);
          }
        } else {
          passes = 0; w.passes = 0; w.cleared = false; w.fails = (w.fails || 0) + 1; save(state); updateBadge();
          const note = document.createElement("div"); note.className = "rev-note bad"; note.textContent = "❌ 做错了，回到起点，需连对 2 道才能消除"; card.appendChild(note);
          it.q = nextWeakQ(it);
          setTimeout(() => paintCard(card, it, passes), 650);
        }
      }));
    }

    items.forEach(it => {
      const card = document.createElement("div"); card.className = "q"; card.dataset.done = "0";
      list.appendChild(card);
      const w = tstate(it.t.id).weak[it.key];
      paintCard(card, it, (w && w.passes) || 0);
    });
  }

  /* ---------------- 进度 ---------------- */
  function renderProgress() {
    const v = view(); v.innerHTML = "";
    const total = TECHNIQUES.length;
    const mastered = TECHNIQUES.filter(t => state[t.id] && state[t.id].mastered).length;
    const learning = TECHNIQUES.filter(t => unlocked(t.id) && !(state[t.id] && state[t.id].mastered)).length;
    const locked = total - mastered - learning;
    const wn = weakCount();

    const grid = document.createElement("div"); grid.className = "stat-grid";
    grid.innerHTML = `
      <div class="stat"><div class="n">${mastered}</div><div class="l">已掌握</div></div>
      <div class="stat"><div class="n">${learning}</div><div class="l">学习中</div></div>
      <div class="stat"><div class="n">${locked}</div><div class="l">未解锁</div></div>
      <div class="stat"><div class="n">${wn}</div><div class="l">薄弱点</div></div>`;
    v.appendChild(grid);

    const pct = Math.round(mastered / total * 100);
    const bar = document.createElement("div"); bar.className = "card";
    bar.innerHTML = `<div class="muted">总通关进度 ${pct}%</div><div class="bar"><i style="width:${pct}%"></i></div>`;
    v.appendChild(bar);

    const reset = document.createElement("div"); reset.className = "row"; reset.style.marginTop = "8px";
    reset.innerHTML = `<button class="btn ghost sm" id="resetBtn">重置全部进度</button>`;
    v.appendChild(reset);
    $("#resetBtn").addEventListener("click", () => {
      if (confirm("确定清空所有学习进度与薄弱点记录？")) { state = {}; save(state); toast("已重置"); route(); }
    });

    const h = document.createElement("h3"); h.textContent = "各技巧状态"; v.appendChild(h);
    const tree = document.createElement("div"); tree.className = "tree";
    const groups = {};
    TECHNIQUES.forEach(t => { const k = t.stage + "|" + t.grade; (groups[k] = groups[k] || []).push(t); });
    STAGES.forEach(stage => {
      const grades = [...new Set(TECHNIQUES.filter(t => t.stage === stage).map(t => t.grade))]
        .sort((a, b) => gradeNum(a) - gradeNum(b));
      if (!grades.length) return;
      const sb = document.createElement("div"); sb.className = "stage-banner sm";
      sb.innerHTML = `<span class="stage-name">${stage}</span>`;
      tree.appendChild(sb);
      grades.forEach(g => {
        const sub = document.createElement("div"); sub.className = "grade-sep";
        sub.innerHTML = `<span class="grade-tag">${g}</span><span class="grade-count">${groups[stage + "|" + g].length} 个技巧</span>`;
        tree.appendChild(sub);
        sortGroup(groups[stage + "|" + g]).forEach(t => {
          const st = tstate(t.id);
          const open = unlocked(t.id);
          const status = !open ? "lock" : (st.mastered ? "done" : "learn");
          const weakN = Object.keys(st.weak).filter(k => !st.weak[k].cleared).length;
          const node = document.createElement("div");
          node.className = "node " + (status === "done" ? "mastered" : status === "lock" ? "locked" : "");
          node.innerHTML = `<div class="step">${status === "done" ? "✓" : (open ? "●" : "🔒")}</div>
            <div class="body"><div class="title">${esc(t.name)}
              <span class="status-pill ${status === "lock" ? "lock" : status === "done" ? "done" : "learn"}">${status === "lock" ? "未解锁" : status === "done" ? "已掌握" : "学习中"}</span>
              ${weakN ? `<span class="tag w">薄弱点 ${weakN}</span>` : ""}</div>
            ${open ? `<div class="acts"><a class="btn sm" href="#/practice/${t.id}">练习</a>${!st.mastered ? `<a class="btn sm soft" href="#/gate/${t.id}">通关</a>` : ""}</div>` : ""}</div>`;
          tree.appendChild(node);
        });
      });
    });
    v.appendChild(tree);
  }

  /* ---------------- 相关项目推荐 ---------------- */
  function renderResources() {
    const v = view(); v.innerHTML = "";
    const h = document.createElement("h2"); h.className = "section"; h.textContent = "相关项目与资源"; v.appendChild(h);
    const hint = document.createElement("div"); hint.className = "hint";
    hint.textContent = "这里汇集了和「融会贯通」定位相近的可视化数学学习项目：动画引擎、开源练习平台、商业参考课程、资源清单。点击卡片可访问官网或仓库。";
    v.appendChild(hint);

    const cats = window.RELATED_PROJECTS || [];
    cats.forEach(cat => {
      const wrap = document.createElement("div"); wrap.className = "card";
      wrap.innerHTML = `<h3 class="res-cat">${esc(cat.category)}</h3>
        <div class="res-desc">${esc(cat.desc)}</div>`;
      const grid = document.createElement("div"); grid.className = "res-grid";
      (cat.items || []).forEach(it => {
        const link = it.cnUrl || it.url;
        const card = document.createElement("a");
        card.className = "res-item";
        card.href = link;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        const tags = (it.tags || []).map(tg => `<span class="res-tag">${esc(tg)}</span>`).join("");
        card.innerHTML = `
          <div class="res-head">
            <span class="res-name">${esc(it.name)}</span>
            <span class="res-tags">${tags}</span>
          </div>
          <div class="res-summary">${esc(it.summary)}</div>
          <div class="res-why"><b>为什么收录：</b>${esc(it.why)}</div>
          <div class="res-url">${esc(link)}</div>`;
        grid.appendChild(card);
      });
      wrap.appendChild(grid);
      v.appendChild(wrap);
    });

    if (!cats.length) {
      v.innerHTML += `<div class="empty">暂无推荐资源</div>`;
    }
  }

  route();
})();
