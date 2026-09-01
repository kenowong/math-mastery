/* ============================================================
 * 融会贯通 · 题目配图库
 * window.Fig:   名字 -> 生成 SVG 的函数（返回 svg 字符串）
 * window.QFIG:  技巧id -> 配图规格（字符串 或 按题目下标的数组）
 * 渲染见 app.js 的 qfigSVG()：优先用题目自带的 q.fig，否则回退 QFIG。
 * 颜色跟随浅色主题（蓝 / 灰 / 强调）。
 * ============================================================ */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const K = {
    ink: "#334155", sub: "#64748b", line: "#cbd5e1", grid: "#e2e8f0",
    pri: "#2f6fed", ok: "#16a34a", warn: "#d97706", red: "#dc2626",
    fill: "#f8fafc", soft: "#eef3ff", orange: "#ea580c", green: "#16a34a",
    blue: "#2563eb", purple: "#7c3aed"
  };
  function S(w, h, inner, maxw) {
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${maxw || w}px;height:auto;display:block" xmlns="${NS}">${inner}</svg>`;
  }

  const Fig = {};

  /* ---------------- 数轴 ---------------- */
  Fig.numline = function (p) {
    p = p || {};
    const min = p.min != null ? p.min : 0, max = p.max != null ? p.max : 10;
    const x0 = 34, x1 = 286, y = 96;
    const sx = v => x0 + (v - min) / (max - min) * (x1 - x0);
    let s = `<line x1="${x0}" y1="${y}" x2="${x1 + 14}" y2="${y}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<path d="M ${x1} ${y} L ${x1 + 14} ${y - 5} L ${x1 + 14} ${y + 5} Z" fill="${K.ink}"/>`;
    for (let v = min; v <= max; v++) {
      const x = sx(v);
      s += `<line x1="${x}" y1="${y - 5}" x2="${x}" y2="${y + 5}" stroke="${K.sub}" stroke-width="1.5"/>`;
      s += `<text x="${x}" y="${y + 22}" font-size="11" fill="${K.sub}" text-anchor="middle" font-family="inherit">${v}</text>`;
    }
    (p.pts || []).forEach(pt => {
      const x = sx(pt.v);
      s += `<circle cx="${x}" cy="${y}" r="5" fill="${pt.color || K.pri}"/>`;
      s += `<text x="${x}" y="${y - 12}" font-size="12" fill="${K.ink}" text-anchor="middle" font-weight="700" font-family="inherit">${pt.label || pt.v}</text>`;
    });
    return S(320, 140, s, 320);
  };

  /* ---------------- 线段 ---------------- */
  Fig.seg = function (p) {
    p = p || {};
    const a = p.a || "A", b = p.b || "B";
    const x1 = 50, x2 = 270, y = 80;
    let s = `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${K.ink}" stroke-width="3"/>`;
    s += `<circle cx="${x1}" cy="${y}" r="5" fill="${K.pri}"/>`;
    s += `<circle cx="${x2}" cy="${y}" r="5" fill="${K.pri}"/>`;
    s += `<text x="${x1}" y="${y - 14}" font-size="13" fill="${K.pri}" font-weight="700" text-anchor="middle" font-family="inherit">${a}</text>`;
    s += `<text x="${x2}" y="${y - 14}" font-size="13" fill="${K.pri}" font-weight="700" text-anchor="middle" font-family="inherit">${b}</text>`;
    if (p.label) s += `<text x="${(x1 + x2) / 2}" y="${y + 24}" font-size="13" fill="${K.ink}" text-anchor="middle" font-family="inherit">${p.label}</text>`;
    return S(320, 120, s, 320);
  };

  /* ---------------- 角 ---------------- */
  function angleInner(deg, label, bis) {
    const vx = 60, vy = 130, r = 90;
    const a1 = 0, a2 = -deg * Math.PI / 180;
    const x2 = vx + r * Math.cos(a1), y2 = vy + r * Math.sin(a1);
    const x3 = vx + r * Math.cos(a2), y3 = vy + r * Math.sin(a2);
    let s = `<line x1="${vx}" y1="${vy}" x2="${x2}" y2="${y2}" stroke="${K.ink}" stroke-width="2.5"/>`;
    s += `<line x1="${vx}" y1="${vy}" x2="${x3}" y2="${y3}" stroke="${K.ink}" stroke-width="2.5"/>`;
    const ar = 34;
    s += `<path d="M ${vx + ar} ${vy} A ${ar} ${ar} 0 0 0 ${vx + ar * Math.cos(a2)} ${vy + ar * Math.sin(a2)}" fill="none" stroke="${K.warn}" stroke-width="1.5"/>`;
    s += `<text x="${vx + 14}" y="${vy - 10}" font-size="12" fill="${K.warn}" text-anchor="middle" font-family="inherit">${label || deg + "°"}</text>`;
    if (bis) {
      const am = (a1 + a2) / 2;
      s += `<line x1="${vx}" y1="${vy}" x2="${vx + (r + 6) * Math.cos(am)}" y2="${vy + (r + 6) * Math.sin(am)}" stroke="${K.ok}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
      s += `<text x="${vx + (r + 18) * Math.cos(am)}" y="${vy + (r + 18) * Math.sin(am)}" font-size="11" fill="${K.ok}" text-anchor="middle" font-family="inherit">平分线</text>`;
    }
    s += `<circle cx="${vx}" cy="${vy}" r="3.5" fill="${K.ink}"/>`;
    return s;
  }
  Fig.angle = function (p) { p = p || {}; return S(320, 160, angleInner(p.deg || 60, p.label, false), 320); };
  Fig.bisector = function (p) { p = p || {}; return S(320, 160, angleInner(p.deg || 60, p.label, true), 320); };
  Fig.supp = function () {
    const vx = 60, vy = 90, r = 90;
    let s = `<line x1="${vx - r}" y1="${vy}" x2="${vx + r}" y2="${vy}" stroke="${K.ink}" stroke-width="2.5"/>`;
    const deg = 50 * Math.PI / 180;
    const x3 = vx + r * Math.cos(-deg), y3 = vy + r * Math.sin(-deg);
    s += `<line x1="${vx}" y1="${vy}" x2="${x3}" y2="${y3}" stroke="${K.ink}" stroke-width="2.5"/>`;
    s += `<path d="M ${vx + 30} ${vy} A 30 30 0 0 0 ${vx + 30 * Math.cos(-deg)} ${vy + 30 * Math.sin(-deg)}" fill="none" stroke="${K.warn}" stroke-width="1.5"/>`;
    s += `<text x="${vx + 16}" y="${vy - 8}" font-size="12" fill="${K.warn}" font-family="inherit">α</text>`;
    s += `<text x="${vx - 22}" y="${vy - 8}" font-size="12" fill="${K.pri}" font-family="inherit">β</text>`;
    s += `<text x="${vx}" y="${vy + 26}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">α + β = 180°（互补）</text>`;
    s += `<circle cx="${vx}" cy="${vy}" r="3.5" fill="${K.ink}"/>`;
    return S(320, 140, s, 320);
  };

  /* ---------------- 三角形 ---------------- */
  function triPath(type) {
    // 返回 {pts:[{x,y}], right:{x,y}, marks:[{a,b,t}]}
    const A = { x: 60, y: 130 }, B = { x: 250, y: 130 }, C = { x: 150, y: 40 };
    if (type === "iso") { C.x = 155; C.y = 45; }
    if (type === "right") { return { A: { x: 60, y: 130 }, B: { x: 230, y: 130 }, C: { x: 60, y: 40 }, right: { x: 60, y: 130 } }; }
    return { A, B, C, right: null };
  }
  function drawTri(type, labels) {
    const t = triPath(type);
    const { A, B, C, right } = t;
    let s = `<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    if (right) {
      const sz = 16;
      s += `<path d="M ${right.x} ${right.y - sz} L ${right.x + sz} ${right.y - sz} L ${right.x + sz} ${right.y}" fill="none" stroke="${K.warn}" stroke-width="1.5"/>`;
    }
    if (type === "iso") {
      // 两腰刻度
      s += `<line x1="${(A.x + C.x) / 2 - 4}" y1="${(A.y + C.y) / 2 - 7}" x2="${(A.x + C.x) / 2 + 4}" y2="${(A.y + C.y) / 2 - 7}" stroke="${K.ok}" stroke-width="2"/>`;
      s += `<line x1="${(B.x + C.x) / 2 + 4}" y1="${(B.y + C.y) / 2 - 7}" x2="${(B.x + C.x) / 2 - 4}" y2="${(B.y + C.y) / 2 - 7}" stroke="${K.ok}" stroke-width="2"/>`;
    }
    // 顶点标签
    s += `<text x="${A.x - 10}" y="${A.y + 4}" font-size="13" fill="${K.pri}" font-weight="700" font-family="inherit">A</text>`;
    s += `<text x="${B.x + 8}" y="${B.y + 4}" font-size="13" fill="${K.pri}" font-weight="700" font-family="inherit">B</text>`;
    s += `<text x="${C.x}" y="${C.y - 8}" font-size="13" fill="${K.pri}" font-weight="700" font-family="inherit">C</text>`;
    if (labels) {
      s += `<text x="${(A.x + B.x) / 2}" y="${(A.y + B.y) / 2 + 18}" font-size="12" fill="${K.ink}" font-family="inherit">${labels.base || ""}</text>`;
      s += `<text x="${(A.x + C.x) / 2 - 8}" y="${(A.y + C.y) / 2}" font-size="12" fill="${K.ink}" font-family="inherit">${labels.l || ""}</text>`;
      s += `<text x="${(B.x + C.x) / 2 + 8}" y="${(B.y + C.y) / 2}" font-size="12" fill="${K.ink}" font-family="inherit">${labels.r || ""}</text>`;
    }
    return s;
  }
  Fig.tri = function () { return S(320, 160, drawTri("acute"), 320); };
  Fig.triSide = function () { return S(320, 160, drawTri("acute", { base: "4", l: "3", r: "5" }), 320); };
  Fig.triIso = function () { return S(320, 160, drawTri("iso", { base: "腰" }), 320); };
  Fig.triRight = function () { return S(320, 160, drawTri("right", { base: "直角边", l: "直角边" }), 320); };

  /* ---------------- 全等 / 相似 两三角形 ---------------- */
  function twoTri(mode) {
    function tri(cx, cy, sc, fillc, labels, lblc) {
      labels = labels || ["A", "B", "C"];
      lblc = lblc || K.pri;
      const A = { x: cx, y: cy }, B = { x: cx + 70 * sc, y: cy }, C = { x: cx + 30 * sc, y: cy - 60 * sc };
      let s = `<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="${fillc}" stroke="${K.ink}" stroke-width="2.5"/>`;
      const pts = [A, B, C];
      const off = [{ x: -8, y: 4 }, { x: 6, y: 4 }, { x: 0, y: -6 }];
      labels.forEach((lab, i) => {
        s += `<text x="${pts[i].x + off[i].x}" y="${pts[i].y + off[i].y}" font-size="12" fill="${lblc}" font-weight="700" font-family="inherit">${lab}</text>`;
      });
      // 对应边刻度
      const tick = (p, q, offv) => {
        const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
        const dx = (q.x - p.x), dy = (q.y - p.y), len = Math.hypot(dx, dy);
        const nx = -dy / len * offv, ny = dx / len * offv;
        s += `<line x1="${mx - 5}" y1="${my - 5}" x2="${mx + 5}" y2="${my + 5}" stroke="${K.ok}" stroke-width="2"/>`;
      };
      tick(A, B, 6); tick(B, C, 6); tick(C, A, 6);
      return s;
    }
    let s = tri(40, 120, 1, K.soft, ["A", "B", "C"], K.pri);
    const r = mode === "similar" ? 0.66 : 1;
    s += tri(200, 135, r, "#e7f6ee", ["D", "E", "F"], K.purple);
    if (mode === "similar") {
      s += `<text x="160" y="40" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">相似：对应边成比例</text>`;
    } else {
      s += `<text x="160" y="40" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">全等：△ABC ≌ △DEF</text>`;
    }
    return S(320, 160, s, 320);
  }
  Fig.twoTriCong = function () { return twoTri("cong"); };
  Fig.twoTriSim = function () { return twoTri("sim"); };

  /* ---------------- 直角三角形（勾股） ---------------- */
  Fig.rightTri = function (p) {
    p = p || {};
    const a = p.a || 3, b = p.b || 4, c = p.c || 5;
    const ox = 60, oy = 140, sx = 34, sy = 26;
    const A = { x: ox, y: oy }, B = { x: ox + b * sx, y: oy }, C = { x: ox, y: oy - a * sy };
    let s = `<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    const sz = 16;
    s += `<path d="M ${A.x} ${A.y - sz} L ${A.x + sz} ${A.y - sz} L ${A.x + sz} ${A.y}" fill="none" stroke="${K.warn}" stroke-width="1.5"/>`;
    s += `<text x="${(A.x + C.x) / 2 - 8}" y="${(A.y + C.y) / 2}" font-size="13" fill="${K.ink}" font-family="inherit">a=${a}</text>`;
    s += `<text x="${(A.x + B.x) / 2}" y="${(A.y + B.y) / 2 + 18}" font-size="13" fill="${K.ink}" font-family="inherit">b=${b}</text>`;
    s += `<text x="${(B.x + C.x) / 2 + 10}" y="${(B.y + C.y) / 2}" font-size="13" fill="${K.red}" font-weight="700" font-family="inherit">c=${c}</text>`;
    s += `<text x="160" y="34" font-size="13" fill="${K.red}" font-weight="700" text-anchor="middle" font-family="inherit">a² + b² = c²</text>`;
    return S(320, 170, s, 320);
  };

  /* ---------------- 四边形 ---------------- */
  function quad(type) {
    let pts;
    if (type === "rect") pts = "60,60 260,60 260,140 60,140";
    else if (type === "rhombus") pts = "160,40 270,100 160,160 50,100";
    else if (type === "trap") pts = "70,140 250,140 210,60 110,60";
    else pts = "70,60 260,50 270,150 60,140"; // parallelogram
    let s = `<polygon points="${pts}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    const labels = { rect: "矩形", rhombus: "菱形", trap: "梯形", para: "平行四边形" };
    s += `<text x="160" y="175" font-size="13" fill="${K.ink}" text-anchor="middle" font-family="inherit">${labels[type]}</text>`;
    return s;
  }
  Fig.para = function () { return S(320, 195, quad("para"), 320); };
  Fig.rect = function () { return S(320, 195, quad("rect"), 320); };
  Fig.rhombus = function () { return S(320, 195, quad("rhombus"), 320); };
  Fig.trap = function () { return S(320, 195, quad("trap"), 320); };

  /* ---------------- 圆 ---------------- */
  Fig.circleR = function (p) {
    p = p || {};
    const cx = 160, cy = 90, r = 60;
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="3.5" fill="${K.ink}"/>`;
    s += `<text x="${cx + 6}" y="${cy - 6}" font-size="12" fill="${K.ink}" font-family="inherit">O</text>`;
    s += `<line x1="${cx}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="${K.red}" stroke-width="2"/>`;
    s += `<text x="${cx + r / 2}" y="${cy - 8}" font-size="12" fill="${K.red}" font-family="inherit">r</text>`;
    if (p.withD) {
      s += `<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="${K.pri}" stroke-width="2" stroke-dasharray="4 3"/>`;
      s += `<text x="${cx}" y="${cy + 20}" font-size="12" fill="${K.pri}" font-family="inherit">d = 2r</text>`;
    }
    return S(320, 175, s, 320);
  };

  function circleBase(cx, cy, r) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>` +
      `<circle cx="${cx}" cy="${cy}" r="3.5" fill="${K.ink}"/><text x="${cx + 6}" y="${cy - 6}" font-size="12" fill="${K.ink}" font-family="inherit">O</text>`;
  }
  Fig.chord = function () {
    const cx = 160, cy = 95, r = 62;
    let s = circleBase(cx, cy, r);
    const A = { x: cx - 50, y: cy + 36 }, B = { x: cx + 46, y: cy + 40 };
    s += `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${K.red}" stroke-width="2.5"/>`;
    s += `<circle cx="${A.x}" cy="${A.y}" r="3.5" fill="${K.pri}"/><text x="${A.x - 6}" y="${A.y + 16}" font-size="12" fill="${K.pri}" font-family="inherit">A</text>`;
    s += `<circle cx="${B.x}" cy="${B.y}" r="3.5" fill="${K.pri}"/><text x="${B.x + 6}" y="${B.y + 16}" font-size="12" fill="${K.pri}" font-family="inherit">B</text>`;
    s += `<text x="${cx}" y="${cy - r - 6}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">弦 AB 与所对弧</text>`;
    return S(320, 180, s, 320);
  };
  Fig.chordDia = function () {
    const cx = 160, cy = 95, r = 62;
    let s = circleBase(cx, cy, r);
    s += `<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="${K.red}" stroke-width="2.5"/>`;
    s += `<text x="${cx}" y="${cy - 10}" font-size="12" fill="${K.red}" font-family="inherit">直径（最长弦）</text>`;
    return S(320, 180, s, 320);
  };
  Fig.tangent = function () {
    const cx = 160, cy = 95, r = 62;
    let s = circleBase(cx, cy, r);
    const P = { x: cx + r, y: cy };
    s += `<line x1="${cx - 20}" y1="${cy}" x2="${cx + r + 40}" y2="${cy}" stroke="${K.ok}" stroke-width="2.5"/>`;
    s += `<circle cx="${P.x}" cy="${P.y}" r="4" fill="${K.ok}"/>`;
    // 直角标记
    s += `<path d="M ${P.x - 14} ${P.y} L ${P.x - 14} ${P.y - 14} L ${P.x} ${P.y - 14}" fill="none" stroke="${K.warn}" stroke-width="1.5"/>`;
    s += `<text x="${cx + r + 18}" y="${cy - 10}" font-size="12" fill="${K.ok}" font-family="inherit">切线</text>`;
    s += `<text x="${cx}" y="${cy - r - 6}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">切线 ⊥ 过切点的半径</text>`;
    return S(320, 180, s, 320);
  };
  Fig.central = function () {
    const cx = 160, cy = 95, r = 62;
    let s = circleBase(cx, cy, r);
    const A = { x: cx + r, y: cy }, B = { x: cx + r * Math.cos(-55 * Math.PI / 180), y: cy + r * Math.sin(-55 * Math.PI / 180) };
    s += `<line x1="${cx}" y1="${cy}" x2="${A.x}" y2="${A.y}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<line x1="${cx}" y1="${cy}" x2="${B.x}" y2="${B.y}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<path d="M ${cx + 26} ${cy} A 26 26 0 0 0 ${cx + 26 * Math.cos(-55 * Math.PI / 180)} ${cy + 26 * Math.sin(-55 * Math.PI / 180)}" fill="none" stroke="${K.warn}" stroke-width="1.5"/>`;
    s += `<text x="${cx + 40}" y="${cy - 14}" font-size="12" fill="${K.warn}" font-family="inherit">60°</text>`;
    s += `<text x="${cx}" y="${cy - r - 6}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">弧的度数 = 圆心角</text>`;
    return S(320, 180, s, 320);
  };

  /* ---------------- 圆柱 / 圆锥 ---------------- */
  Fig.cyl3d = function () {
    const cx = 160, top = 40, bot = 150, w = 46, k = 14;
    let s = `<ellipse cx="${cx}" cy="${top}" rx="${w}" ry="${k}" fill="#dbeafe" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<path d="M ${cx - w} ${top} L ${cx - w} ${bot} A ${w} ${k} 0 0 0 ${cx + w} ${bot} L ${cx + w} ${top}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<ellipse cx="${cx}" cy="${bot}" rx="${w}" ry="${k}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<text x="${cx}" y="${bot + 22}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">圆柱 V = πr²h</text>`;
    return S(320, 190, s, 320);
  };
  Fig.cone3d = function () {
    const cx = 160, top = 45, bot = 150, w = 56, k = 16;
    let s = `<path d="M ${cx} ${top} L ${cx - w} ${bot} A ${w} ${k} 0 0 0 ${cx + w} ${bot} Z" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<ellipse cx="${cx}" cy="${bot}" rx="${w}" ry="${k}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<text x="${cx}" y="${bot + 22}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">圆锥 V = ⅓πr²h</text>`;
    return S(320, 190, s, 320);
  };

  /* ---------------- 饼图 / 占比 ---------------- */
  Fig.pie = function (p) {
    p = p || {};
    const frac = p.frac != null ? p.frac : 0.75;
    const cx = 110, cy = 90, r = 60;
    const a0 = -90, a1 = a0 + frac * 360;
    const rad = d => d * Math.PI / 180;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(rad(a0)), y0 = cy + r * Math.sin(rad(a0));
    const x1 = cx + r * Math.cos(rad(a1)), y1 = cy + r * Math.sin(rad(a1));
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<path d="M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z" fill="${K.pri}" stroke="${K.ink}" stroke-width="1"/>`;
    s += `<text x="${cx}" y="${cy + 4}" font-size="14" fill="#fff" font-weight="700" text-anchor="middle" font-family="inherit">${Math.round(frac * 100)}%</text>`;
    s += `<text x="230" y="80" font-size="13" fill="${K.ink}" font-family="inherit">阴影部分</text>`;
    s += `<text x="230" y="100" font-size="13" fill="${K.pri}" font-weight="700" font-family="inherit">=${frac}</text>`;
    return S(320, 180, s, 320);
  };
  Fig.pieChart = function (p) {
    p = p || {};
    const data = p.data || [{ v: 40, c: K.pri }, { v: 35, c: K.ok }, { v: 25, c: K.warn }];
    const cx = 160, cy = 90, r = 60;
    const total = data.reduce((a, b) => a + b.v, 0);
    let ang = -90;
    let s = "";
    data.forEach(d => {
      const a1 = ang + d.v / total * 360;
      const large = (d.v / total) > 0.5 ? 1 : 0;
      const rad = dd => dd * Math.PI / 180;
      const x0 = cx + r * Math.cos(rad(ang)), y0 = cy + r * Math.sin(rad(ang));
      const x1 = cx + r * Math.cos(rad(a1)), y1 = cy + r * Math.sin(rad(a1));
      s += `<path d="M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z" fill="${d.c}" stroke="#fff" stroke-width="1.5"/>`;
      ang = a1;
    });
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${K.ink}" stroke-width="1"/>`;
    return S(320, 180, s, 320);
  };
  Fig.percentBar = function (p) {
    p = p || {};
    const pct = p.pct != null ? p.pct : 80;
    const x = 30, y = 70, w = 260, h = 34;
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${K.soft}" stroke="${K.line}" stroke-width="1.5"/>`;
    s += `<rect x="${x}" y="${y}" width="${w * pct / 100}" height="${h}" rx="6" fill="${K.pri}"/>`;
    s += `<text x="${x + w * pct / 100 / 2}" y="${y + 23}" font-size="14" fill="#fff" font-weight="700" text-anchor="middle" font-family="inherit">${pct}%</text>`;
    s += `<text x="${x}" y="${y - 12}" font-size="12" fill="${K.ink}" font-family="inherit">占整体的比例</text>`;
    return S(320, 130, s, 320);
  };
  Fig.barModel = function (p) {
    p = p || {};
    const a = p.a != null ? p.a : 2, b = p.b != null ? p.b : 3;
    const x = 40, y = 60, h = 70, uw = 34;
    let s = `<rect x="${x}" y="${y}" width="${a * uw}" height="${h}" rx="4" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<text x="${x + a * uw / 2}" y="${y + h / 2 + 5}" font-size="14" fill="${K.ink}" font-weight="700" text-anchor="middle" font-family="inherit">${a}</text>`;
    s += `<rect x="${x + a * uw + 24}" y="${y}" width="${b * uw}" height="${h}" rx="4" fill="${K.pri}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<text x="${x + a * uw + 24 + b * uw / 2}" y="${y + h / 2 + 5}" font-size="14" fill="#fff" font-weight="700" text-anchor="middle" font-family="inherit">${b}</text>`;
    s += `<text x="${x}" y="${y - 12}" font-size="12" fill="${K.ink}" font-family="inherit">比 ${a}:${b}（前:后）</text>`;
    return S(320, 150, s, 320);
  };

  /* ---------------- 植树 / 线段 ---------------- */
  Fig.treeLine = function (p) {
    p = p || {};
    const n = p.n || 5, mode = p.mode || "both";
    const x0 = 30, x1 = 290, y = 90;
    const step = (x1 - x0) / (n - 1 || 1);
    let s = `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${K.line}" stroke-width="4"/>`;
    for (let i = 0; i < n; i++) {
      const x = x0 + i * step;
      s += `<circle cx="${x}" cy="${y - 18}" r="9" fill="${K.ok}" stroke="${K.ink}" stroke-width="1.5"/>`;
      s += `<rect x="${x - 1.5}" y="${y - 9}" width="3" height="9" fill="${K.ink}"/>`;
    }
    const cap = mode === "one" ? "只栽一端：棵数 = 间隔数" : mode === "none" ? "两端不栽：棵数 = 间隔数 − 1" : "两端都栽：棵数 = 间隔数 + 1";
    s += `<text x="160" y="${y + 30}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">${cap}</text>`;
    return S(320, 150, s, 320);
  };

  /* ---------------- 行程：A—B 直线 ---------------- */
  Fig.trackAB = function (p) {
    p = p || {};
    const x0 = 40, x1 = 280, y = 90;
    let s = `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${K.ink}" stroke-width="3"/>`;
    s += `<text x="${x0}" y="${y - 16}" font-size="14" fill="${K.pri}" font-weight="700" text-anchor="middle" font-family="inherit">A</text>`;
    s += `<text x="${x1}" y="${y - 16}" font-size="14" fill="${K.pri}" font-weight="700" text-anchor="middle" font-family="inherit">B</text>`;
    (p.pts || [{ pos: 0.35, label: "甲", color: K.blue }, { pos: 0.65, label: "乙", color: K.red }]).forEach(pt => {
      const x = x0 + (x1 - x0) * pt.pos;
      s += `<circle cx="${x}" cy="${y}" r="9" fill="${pt.color}" stroke="#fff" stroke-width="2"/>`;
      s += `<text x="${x}" y="${y + 26}" font-size="12" fill="${pt.color}" font-weight="700" text-anchor="middle" font-family="inherit">${pt.label}</text>`;
    });
    if (p.cap) s += `<text x="160" y="${y + 44}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">${p.cap}</text>`;
    return S(320, 150, s, 320);
  };
  Fig.trackRiver = function () {
    let s = `<line x1="40" y1="70" x2="280" y2="70" stroke="${K.blue}" stroke-width="3"/>`;
    s += `<line x1="40" y1="110" x2="280" y2="110" stroke="${K.blue}" stroke-width="3"/>`;
    s += `<text x="40" y="58" font-size="12" fill="${K.blue}" font-family="inherit">顺流</text>`;
    s += `<text x="40" y="128" font-size="12" fill="${K.blue}" font-family="inherit">逆流</text>`;
    s += `<circle cx="120" cy="70" r="7" fill="${K.pri}"/><circle cx="200" cy="110" r="7" fill="${K.red}"/>`;
    return S(320, 150, s, 320);
  };
  Fig.ring = function () {
    const cx = 160, cy = 90, r = 60;
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${K.ink}" stroke-width="3"/>`;
    s += `<circle cx="${cx + r}" cy="${cy}" r="8" fill="${K.pri}"/>`;
    s += `<circle cx="${cx - r}" cy="${cy}" r="8" fill="${K.red}"/>`;
    s += `<text x="${cx}" y="${cy - r - 8}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">环形跑道</text>`;
    return S(320, 180, s, 320);
  };

  /* ---------------- 鸡兔同笼 ---------------- */
  Fig.crt = function () {
    let s = "";
    // 鸡
    s += `<ellipse cx="90" cy="110" rx="26" ry="18" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<circle cx="90" cy="78" r="14" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<path d="M 90 64 q 5 -8 0 -12 q -5 4 0 12" fill="${K.red}"/>`;
    s += `<path d="M 104 78 l 12 -3 l -10 6 z" fill="${K.warn}"/>`;
    s += `<line x1="78" y1="128" x2="78" y2="142" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<line x1="102" y1="128" x2="102" y2="142" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<text x="90" y="160" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">鸡：2 脚</text>`;
    // 兔
    s += `<ellipse cx="220" cy="110" rx="28" ry="20" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<circle cx="220" cy="74" r="14" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<line x1="214" y1="60" x2="212" y2="42" stroke="${K.ink}" stroke-width="3"/><ellipse cx="212" cy="40" rx="4" ry="9" fill="${K.ink}"/>`;
    s += `<line x1="226" y1="60" x2="228" y2="42" stroke="${K.ink}" stroke-width="3"/><ellipse cx="228" cy="40" rx="4" ry="9" fill="${K.ink}"/>`;
    s += `<line x1="200" y1="128" x2="200" y2="142" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<line x1="216" y1="128" x2="216" y2="142" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<line x1="232" y1="128" x2="232" y2="142" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<line x1="240" y1="128" x2="240" y2="142" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<text x="220" y="160" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">兔：4 脚</text>`;
    return S(320, 175, s, 320);
  };

  /* ---------------- 统计柱状 ---------------- */
  Fig.dataBars = function (p) {
    p = p || {};
    const data = p.data || [2, 4, 6, 8];
    const x = 40, base = 140, maxh = 90, w = 200 / data.length;
    const mx = Math.max.apply(null, data);
    let s = `<line x1="${x}" y1="${base}" x2="${x + 220}" y2="${base}" stroke="${K.ink}" stroke-width="2"/>`;
    data.forEach((d, i) => {
      const h = d / mx * maxh;
      const bx = x + 10 + i * w;
      s += `<rect x="${bx}" y="${base - h}" width="${w - 12}" height="${h}" rx="3" fill="${K.pri}"/>`;
      s += `<text x="${bx + (w - 12) / 2}" y="${base - h - 6}" font-size="11" fill="${K.ink}" text-anchor="middle" font-family="inherit">${d}</text>`;
    });
    return S(320, 165, s, 320);
  };
  Fig.barChart = function (p) {
    p = p || {};
    const data = p.data || [{ l: "A", v: 8, c: K.pri }, { l: "B", v: 5, c: K.ok }, { l: "C", v: 3, c: K.warn }];
    const x = 50, base = 140, maxh = 90;
    const mx = Math.max.apply(null, data.map(d => d.v));
    const w = 200 / data.length;
    let s = `<line x1="${x}" y1="${base}" x2="${x + 210}" y2="${base}" stroke="${K.ink}" stroke-width="2"/>`;
    data.forEach((d, i) => {
      const h = d.v / mx * maxh; const bx = x + 10 + i * w;
      s += `<rect x="${bx}" y="${base - h}" width="${w - 14}" height="${h}" rx="3" fill="${d.c}"/>`;
      s += `<text x="${bx + (w - 14) / 2}" y="${base + 16}" font-size="11" fill="${K.ink}" text-anchor="middle" font-family="inherit">${d.l}</text>`;
    });
    return S(320, 170, s, 320);
  };
  Fig.normalCurve = function () {
    const cx = 160, cy = 130, w = 120, h = 90;
    let s = `<line x1="30" y1="${cy}" x2="290" y2="${cy}" stroke="${K.ink}" stroke-width="2"/>`;
    let path = "M 30 " + cy;
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const x = 30 + t * 260;
      const y = cy - h * Math.exp(-Math.pow((t - 0.5) * 4, 2));
      path += " L " + x.toFixed(1) + " " + y.toFixed(1);
    }
    s += `<path d="${path}" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<text x="${cx}" y="${cy - h - 10}" font-size="12" fill="${K.pri}" text-anchor="middle" font-family="inherit">正态分布</text>`;
    return S(320, 160, s, 320);
  };

  /* ---------------- 概率 ---------------- */
  Fig.coin = function (p) {
    p = p || {};
    const side = p.side || "heads";
    let s = `<circle cx="160" cy="90" r="58" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    if (side === "heads") {
      s += `<text x="160" y="100" font-size="30" fill="${K.warn}" text-anchor="middle" font-family="inherit">￥</text>`;
      s += `<text x="160" y="158" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">正面（字面）</text>`;
    } else {
      s += `<text x="160" y="100" font-size="16" fill="${K.pri}" text-anchor="middle" font-family="inherit">字</text>`;
      s += `<text x="160" y="158" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">反面（花面）</text>`;
    }
    return S(320, 180, s, 320);
  };
  Fig.dice = function (p) {
    p = p || {};
    const v = p.v || 3;
    const map = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]], 5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]] };
    const cx = 160, cy = 90, r = 52, cell = r * 2 / 3;
    let s = `<rect x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}" rx="10" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    (map[v] || map[1]).forEach(([gx, gy]) => {
      const px = cx - r + cell / 2 + gx * cell;
      const py = cy - r + cell / 2 + gy * cell;
      s += `<circle cx="${px}" cy="${py}" r="6" fill="${K.ink}"/>`;
    });
    s += `<text x="160" y="162" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">点数 ${v}</text>`;
    return S(320, 180, s, 320);
  };
  Fig.eventCertain = function () {
    let s = `<rect x="60" y="40" width="200" height="80" rx="8" fill="${K.ok}" stroke="${K.ink}" stroke-width="2.5"/>`;
    s += `<text x="160" y="90" font-size="16" fill="#fff" font-weight="700" text-anchor="middle" font-family="inherit">必然事件</text>`;
    s += `<text x="160" y="150" font-size="13" fill="${K.ink}" text-anchor="middle" font-family="inherit">P = 1</text>`;
    return S(320, 170, s, 320);
  };
  Fig.eventImpossible = function () {
    let s = `<rect x="60" y="40" width="200" height="80" rx="8" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5" stroke-dasharray="6 4"/>`;
    s += `<text x="160" y="90" font-size="16" fill="${K.sub}" font-weight="700" text-anchor="middle" font-family="inherit">不可能事件</text>`;
    s += `<text x="160" y="150" font-size="13" fill="${K.ink}" text-anchor="middle" font-family="inherit">P = 0</text>`;
    return S(320, 170, s, 320);
  };

  /* ---------------- 集合 Venn ---------------- */
  Fig.venn = function (p) {
    p = p || {};
    const n = p.n || 2;
    let s = "";
    if (n >= 2) {
      s += `<circle cx="130" cy="90" r="55" fill="rgba(47,111,237,.18)" stroke="${K.pri}" stroke-width="2"/>`;
      s += `<circle cx="190" cy="90" r="55" fill="rgba(22,163,74,.18)" stroke="${K.ok}" stroke-width="2"/>`;
      s += `<text x="110" y="96" font-size="13" fill="${K.pri}" text-anchor="middle" font-family="inherit">A</text>`;
      s += `<text x="210" y="96" font-size="13" fill="${K.ok}" text-anchor="middle" font-family="inherit">B</text>`;
      s += `<text x="160" y="170" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">A∩B 公共部分</text>`;
    }
    if (n === 3) {
      s += `<circle cx="160" cy="55" r="42" fill="rgba(217,119,6,.15)" stroke="${K.warn}" stroke-width="2"/>`;
      s += `<text x="160" y="60" font-size="12" fill="${K.warn}" text-anchor="middle" font-family="inherit">C</text>`;
    }
    return S(320, 185, s, 320);
  };

  /* ---------------- 坐标系 ---------------- */
  function axes(w, h, x0, y0) {
    return `<line x1="30" y1="${y0}" x2="${w - 14}" y2="${y0}" stroke="${K.ink}" stroke-width="1.5"/>` +
      `<path d="M ${w - 22} ${y0} L ${w - 14} ${y0 - 5} L ${w - 14} ${y0 + 5} Z" fill="${K.ink}"/>` +
      `<line x1="${x0}" y1="${h - 20}" x2="${x0}" y2="16" stroke="${K.ink}" stroke-width="1.5"/>` +
      `<path d="M ${x0} 16 L ${x0 - 5} 24 L ${x0 + 5} 24 Z" fill="${K.ink}"/>`;
  }
  Fig.axis = function (p) {
    p = p || {};
    const w = 320, h = 180, x0 = 60, y0 = 140;
    let s = axes(w, h, x0, y0);
    s += `<text x="${w - 16}" y="${y0 - 8}" font-size="11" fill="${K.sub}" font-family="inherit">x</text>`;
    s += `<text x="${x0 + 8}" y="22" font-size="11" fill="${K.sub}" font-family="inherit">y</text>`;
    (p.points || []).forEach(pt => {
      const x = x0 + pt.x * 26, y = y0 - pt.y * 26;
      s += `<circle cx="${x}" cy="${y}" r="5" fill="${pt.color || K.pri}"/>`;
      if (pt.label) s += `<text x="${x + 8}" y="${y - 4}" font-size="11" fill="${K.ink}" font-family="inherit">${pt.label}</text>`;
    });
    if (p.line) {
      const a = { x: x0 + p.line.x1 * 26, y: y0 - p.line.y1 * 26 };
      const b = { x: x0 + p.line.x2 * 26, y: y0 - p.line.y2 * 26 };
      s += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${K.red}" stroke-width="2.5"/>`;
    }
    return S(w, h, s, 320);
  };
  Fig.graphLine = function (p) {
    p = p || {};
    const m = p.m != null ? p.m : 1, b = p.b != null ? p.b : -1;
    const w = 320, h = 180, x0 = 60, y0 = 140, sc = 26;
    let s = axes(w, h, x0, y0);
    const f = x => m * x + b;
    let path = "";
    for (let x = -2; x <= 6; x += 0.2) {
      const px = x0 + x * sc, py = y0 - f(x) * sc;
      if (py < 10 || py > h - 24) continue;
      path += (path ? " L " : "M ") + px.toFixed(1) + " " + py.toFixed(1);
    }
    s += `<path d="${path}" fill="none" stroke="${K.red}" stroke-width="2.5"/>`;
    s += `<text x="${w - 70}" y="30" font-size="12" fill="${K.red}" font-family="inherit">y = ${m}x ${b >= 0 ? "+" : ""}${b}</text>`;
    return S(w, h, s, 320);
  };
  Fig.parab = function (p) {
    p = p || {};
    const a = p.a != null ? p.a : 1;
    const w = 320, h = 180, x0 = 160, y0 = 150, sc = 18;
    let s = axes(w, h, x0, y0);
    let path = "";
    for (let x = -4; x <= 4; x += 0.15) {
      const px = x0 + x * sc, py = y0 - a * x * x * sc * 0.5;
      if (py < 12) continue;
      path += (path ? " L " : "M ") + px.toFixed(1) + " " + py.toFixed(1);
    }
    s += `<path d="${path}" fill="none" stroke="${K.red}" stroke-width="2.5"/>`;
    s += `<text x="40" y="40" font-size="12" fill="${K.red}" font-family="inherit">y = ${a}x²</text>`;
    return S(w, h, s, 320);
  };
  Fig.hyperb = function (p) {
    p = p || {};
    const k = p.k != null ? p.k : 6;
    const w = 320, h = 180, x0 = 160, y0 = 90, sc = 22;
    let s = axes(w, h, x0, y0);
    let path1 = "", path2 = "";
    for (let x = 0.4; x <= 5; x += 0.15) {
      const px = x0 + x * sc, py = y0 - (k / x) * sc * 0.4;
      const px2 = x0 - x * sc, py2 = y0 + (k / x) * sc * 0.4;
      path1 += (path1 ? " L " : "M ") + px.toFixed(1) + " " + py.toFixed(1);
      path2 += (path2 ? " L " : "M ") + px2.toFixed(1) + " " + py2.toFixed(1);
    }
    s += `<path d="${path1}" fill="none" stroke="${K.red}" stroke-width="2.5"/>`;
    s += `<path d="${path2}" fill="none" stroke="${K.red}" stroke-width="2.5"/>`;
    s += `<text x="40" y="30" font-size="12" fill="${K.red}" font-family="inherit">y = ${k}/x</text>`;
    return S(w, h, s, 320);
  };

  /* ---------------- 单位圆 ---------------- */
  Fig.unitCircle = function (p) {
    p = p || {};
    const deg = p.deg != null ? p.deg : 30;
    const cx = 160, cy = 95, r = 60;
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += axes(320, 180, cx, cy);
    const a = -deg * Math.PI / 180;
    const px = cx + r * Math.cos(a), py = cy + r * Math.sin(a);
    s += `<line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="${K.red}" stroke-width="2.5"/>`;
    s += `<circle cx="${px}" cy="${py}" r="4" fill="${K.red}"/>`;
    s += `<text x="${cx + 10}" y="${cy - 8}" font-size="11" fill="${K.ink}" font-family="inherit">O</text>`;
    s += `<text x="${(cx + px) / 2 + 6}" y="${(cy + py) / 2}" font-size="11" fill="${K.red}" font-family="inherit">${deg}°</text>`;
    return S(320, 180, s, 320);
  };

  /* ---------------- 向量 ---------------- */
  Fig.vector2 = function () {
    const x0 = 70, y0 = 120, w = 320, h = 175;
    let s = `<line x1="20" y1="${y0}" x2="${w - 14}" y2="${y0}" stroke="${K.grid}" stroke-width="1.5"/>`;
    s += `<line x1="${x0}" y1="${h - 20}" x2="${x0}" y2="16" stroke="${K.grid}" stroke-width="1.5"/>`;
    s += `<circle cx="${x0}" cy="${y0}" r="3.5" fill="${K.ink}"/>`;
    const v1 = { x: 120, y: 50 }, v2 = { x: 60, y: -40 };
    const a = { x: x0 + v1.x, y: y0 - v1.y }, b = { x: x0 + v2.x, y: y0 - v2.y }, c = { x: x0 + v1.x + v2.x, y: y0 - (v1.y + v2.y) };
    s += `<line x1="${x0}" y1="${y0}" x2="${a.x}" y2="${a.y}" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<text x="${(x0 + a.x) / 2 - 6}" y="${(y0 + a.y) / 2}" font-size="12" fill="${K.pri}" font-family="inherit">a</text>`;
    s += `<line x1="${a.x}" y1="${a.y}" x2="${c.x}" y2="${c.y}" stroke="${K.ok}" stroke-width="2.5"/>`;
    s += `<line x1="${x0}" y1="${y0}" x2="${b.x}" y2="${b.y}" stroke="${K.orange}" stroke-width="2.5"/>`;
    s += `<line x1="${b.x}" y1="${b.y}" x2="${c.x}" y2="${c.y}" stroke="${K.purple}" stroke-width="2.5" stroke-dasharray="4 3"/>`;
    s += `<text x="${(x0 + c.x) / 2}" y="${(y0 + c.y) / 2 - 6}" font-size="12" fill="${K.purple}" font-family="inherit">a+b</text>`;
    return S(w, h, s, 320);
  };

  /* ---------------- 立体几何 ---------------- */
  Fig.cube3d = function () {
    const cx = 160, cy = 100, s = 46, d = 18;
    const f = [
      [cx - s, cy - s], [cx + s, cy - s], [cx + s, cy + s], [cx - s, cy + s]
    ];
    const b = f.map(([x, y]) => [x + d, y - d]);
    let g = `<polygon points="${f[0]} ${f[1]} ${f[2]} ${f[3]}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    g += `<polygon points="${b[0]} ${b[1]} ${b[2]} ${b[3]}" fill="#dbeafe" stroke="${K.ink}" stroke-width="2"/>`;
    g += `<line x1="${f[0][0]}" y1="${f[0][1]}" x2="${b[0][0]}" y2="${b[0][1]}" stroke="${K.ink}" stroke-width="2"/>`;
    g += `<line x1="${f[1][0]}" y1="${f[1][1]}" x2="${b[1][0]}" y2="${b[1][1]}" stroke="${K.ink}" stroke-width="2"/>`;
    g += `<line x1="${f[2][0]}" y1="${f[2][1]}" x2="${b[2][0]}" y2="${b[2][1]}" stroke="${K.ink}" stroke-width="2"/>`;
    g += `<line x1="${f[3][0]}" y1="${f[3][1]}" x2="${b[3][0]}" y2="${b[3][1]}" stroke="${K.ink}" stroke-width="2"/>`;
    g += `<text x="${cx}" y="${cy + s + d + 24}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">正方体（长方体）</text>`;
    return S(320, 180, g, 320);
  };
  Fig.rectSolid = function () { return Fig.cube3d(); };

  /* ---------------- 导数曲线 ---------------- */
  Fig.derivCurve = function () {
    const w = 320, h = 180, x0 = 40, y0 = 140;
    let s = axes(w, h, x0, y0);
    let path = "";
    for (let x = -2; x <= 5; x += 0.1) {
      const px = x0 + x * 30, py = y0 - (x * x * 4 - x * 2) * 1.4;
      if (py < 14 || py > h - 24) continue;
      path += (path ? " L " : "M ") + px.toFixed(1) + " " + py.toFixed(1);
    }
    s += `<path d="${path}" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    const tx = 3, px = x0 + tx * 30, py = y0 - (tx * tx * 4 - tx * 2) * 1.4;
    s += `<circle cx="${px}" cy="${py}" r="5" fill="${K.red}"/>`;
    s += `<line x1="${px - 36}" y1="${py - 22}" x2="${px + 36}" y2="${py + 22}" stroke="${K.red}" stroke-width="2" stroke-dasharray="4 3"/>`;
    s += `<text x="${px + 30}" y="${py - 26}" font-size="11" fill="${K.red}" font-family="inherit">切线（斜率=导数）</text>`;
    return S(w, h, s, 320);
  };

  /* ---------------- 圆锥曲线 ---------------- */
  Fig.conicFig = function (p) {
    p = p || {};
    const type = p.type || "ellipse";
    const cx = 160, cy = 90, w = 320, h = 180;
    let s = axes(w, h, 40, cy);
    if (type === "hyperbola") {
      let p1 = "", p2 = "";
      for (let t = -3; t <= 3; t += 0.1) {
        const x = 160 + 70 * Math.cosh(t), y = 90 - 45 * Math.sinh(t);
        const x2 = 160 - 70 * Math.cosh(t), y2 = 90 + 45 * Math.sinh(t);
        p1 += (p1 ? " L " : "M ") + x.toFixed(1) + " " + y.toFixed(1);
        p2 += (p2 ? " L " : "M ") + x2.toFixed(1) + " " + y2.toFixed(1);
      }
      s += `<path d="${p1}" fill="none" stroke="${K.red}" stroke-width="2.5"/>`;
      s += `<path d="${p2}" fill="none" stroke="${K.red}" stroke-width="2.5"/>`;
    } else if (type === "parabola") {
      let pp = "";
      for (let x = -4; x <= 4; x += 0.15) {
        const px = 160 + x * 22, py = 90 - x * x * 4;
        if (py < 14) continue;
        pp += (pp ? " L " : "M ") + px.toFixed(1) + " " + py.toFixed(1);
      }
      s += `<path d="${pp}" fill="none" stroke="${K.red}" stroke-width="2.5"/>`;
    } else {
      s += `<ellipse cx="${cx}" cy="${cy}" rx="78" ry="46" fill="none" stroke="${K.red}" stroke-width="2.5"/>`;
      s += `<circle cx="${cx - 60}" cy="${cy}" r="3" fill="${K.ink}"/><text x="${cx - 60}" y="${cy - 8}" font-size="11" fill="${K.ink}" font-family="inherit">F₁</text>`;
      s += `<circle cx="${cx + 60}" cy="${cy}" r="3" fill="${K.ink}"/><text x="${cx + 60}" y="${cy - 8}" font-size="11" fill="${K.ink}" font-family="inherit">F₂</text>`;
    }
    return S(w, h, s, 320);
  };

  /* ---------------- 复平面 ---------------- */
  Fig.complexPlane = function (p) {
    p = p || {};
    const re = p.re != null ? p.re : 3, im = p.im != null ? p.im : 2;
    const w = 320, h = 180, x0 = 90, y0 = 120, sc = 22;
    let s = axes(w, h, x0, y0);
    const px = x0 + re * sc, py = y0 - im * sc;
    s += `<line x1="${x0}" y1="${y0}" x2="${px}" y2="${py}" stroke="${K.red}" stroke-width="2.5"/>`;
    s += `<line x1="${px}" y1="${y0}" x2="${px}" y2="${py}" stroke="${K.grid}" stroke-width="1.5" stroke-dasharray="3 3"/>`;
    s += `<line x1="${x0}" y1="${py}" x2="${px}" y2="${py}" stroke="${K.grid}" stroke-width="1.5" stroke-dasharray="3 3"/>`;
    s += `<circle cx="${px}" cy="${py}" r="4" fill="${K.red}"/>`;
    s += `<text x="${px + 8}" y="${py - 6}" font-size="12" fill="${K.red}" font-family="inherit">z = ${re}+${im}i</text>`;
    return S(w, h, s, 320);
  };

  /* ---------------- 巧求周长（阶梯） ---------------- */
  Fig.stair = function () {
    const x = 50, y = 130, u = 30;
    const pts = [
      [x, y], [x, y - u], [x + u, y - u], [x + u, y - 2 * u],
      [x + 2 * u, y - 2 * u], [x + 2 * u, y - 3 * u], [x + 3 * u, y - 3 * u], [x + 3 * u, y]
    ].map(p => p.join(",")).join(" ");
    let s = `<polygon points="${pts}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    const lbl = [
      [x - 14, y - u / 2, "3"], [x + u - 14, y - 3 * u / 2, "3"], [x + 2 * u - 14, y - 5 * u / 2, "3"],
      [x + 1.5 * u, y + 16, "3+3+3=9"]
    ];
    lbl.forEach(([lx, ly, t]) => { s += `<text x="${lx}" y="${ly}" font-size="12" fill="${K.ink}" font-family="inherit">${t}</text>`; });
    s += `<text x="160" y="40" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">平移凹角 → 周长 = 各段之和</text>`;
    return S(320, 175, s, 320);
  };

  /* ---------------- 半圆 / 同心圆（圆进阶） ---------------- */
  Fig.semicircle = function () {
    const cx = 160, cy = 110, r = 60;
    let s = `<path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    s += `<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="${K.ink}" stroke-width="2.5"/>`;
    s += `<text x="${cx}" y="${cy + 22}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">直径 2r｜弧长 πr</text>`;
    s += `<text x="${cx}" y="${cy - r - 10}" font-size="13" fill="${K.red}" font-weight="700" text-anchor="middle" font-family="inherit">半圆周长 = πr + 2r</text>`;
    return S(320, 180, s, 320);
  };
  Fig.twoCircle = function () {
    const cx = 160, cy = 95;
    let s = `<circle cx="${cx}" cy="${cy}" r="40" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<text x="${cx}" y="${cy + 4}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">r</text>`;
    s += `<circle cx="${cx}" cy="${cy}" r="80" fill="rgba(47,111,237,.10)" stroke="${K.pri}" stroke-width="2" stroke-dasharray="4 3"/>`;
    s += `<text x="${cx + 56}" y="${cy + 4}" font-size="12" fill="${K.pri}" font-family="inherit">2r</text>`;
    s += `<text x="${cx}" y="${cy - 96}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">半径扩 2 倍 → 面积扩 4 倍</text>`;
    return S(320, 195, s, 320);
  };

  /* ---------------- 圆周角 / 直径直角（圆性质） ---------------- */
  Fig.inscribed = function () {
    const cx = 160, cy = 100, r = 64;
    let s = circleBase(cx, cy, r);
    const A = { x: cx - r, y: cy };
    const B = { x: cx + r * Math.cos(-40 * Math.PI / 180), y: cy + r * Math.sin(-40 * Math.PI / 180) };
    const P = { x: cx + r * Math.cos(-110 * Math.PI / 180), y: cy + r * Math.sin(-110 * Math.PI / 180) };
    s += `<line x1="${A.x}" y1="${A.y}" x2="${P.x}" y2="${P.y}" stroke="${K.pri}" stroke-width="2"/>`;
    s += `<line x1="${B.x}" y1="${B.y}" x2="${P.x}" y2="${P.y}" stroke="${K.pri}" stroke-width="2"/>`;
    s += `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${K.sub}" stroke-width="1.5" stroke-dasharray="3 3"/>`;
    s += `<text x="${A.x - 8}" y="${A.y + 16}" font-size="12" fill="${K.ink}" font-family="inherit">A</text>`;
    s += `<text x="${B.x + 6}" y="${B.y + 14}" font-size="12" fill="${K.ink}" font-family="inherit">B</text>`;
    s += `<text x="${P.x - 8}" y="${P.y - 8}" font-size="12" fill="${K.pri}" font-weight="700" font-family="inherit">P</text>`;
    s += `<text x="${cx}" y="${cy - r - 8}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">同弧所对圆周角 ∠APB 都相等</text>`;
    return S(320, 185, s, 320);
  };
  Fig.thales = function () {
    const cx = 160, cy = 100, r = 64;
    let s = circleBase(cx, cy, r);
    const A = { x: cx - r, y: cy }, B = { x: cx + r, y: cy }, P = { x: cx, y: cy - r };
    s += `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${K.sub}" stroke-width="1.5" stroke-dasharray="3 3"/>`;
    s += `<line x1="${A.x}" y1="${A.y}" x2="${P.x}" y2="${P.y}" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<line x1="${B.x}" y1="${B.y}" x2="${P.x}" y2="${P.y}" stroke="${K.pri}" stroke-width="2.5"/>`;
    const sz = 14;
    s += `<path d="M ${P.x - sz} ${P.y} L ${P.x - sz} ${P.y + sz} L ${P.x} ${P.y + sz}" fill="none" stroke="${K.warn}" stroke-width="1.5"/>`;
    s += `<text x="${A.x - 8}" y="${A.y + 16}" font-size="12" fill="${K.ink}" font-family="inherit">A</text>`;
    s += `<text x="${B.x + 6}" y="${B.y + 16}" font-size="12" fill="${K.ink}" font-family="inherit">B</text>`;
    s += `<text x="${P.x + 8}" y="${P.y - 4}" font-size="12" fill="${K.pri}" font-weight="700" font-family="inherit">P</text>`;
    s += `<text x="${cx}" y="${cy - r - 8}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">直径 AB 所对圆周角 ∠APB = 90°</text>`;
    return S(320, 185, s, 320);
  };

  /* ---------------- 平行两直线 ---------------- */
  Fig.twoLines = function () {
    const w = 320, h = 180, x0 = 60, y0 = 140;
    let s = axes(w, h, x0, y0);
    s += `<line x1="50" y1="120" x2="290" y2="60" stroke="${K.red}" stroke-width="2.5"/>`;
    s += `<line x1="50" y1="90" x2="290" y2="30" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<text x="244" y="56" font-size="12" fill="${K.red}" font-family="inherit">k 相等</text>`;
    s += `<text x="244" y="26" font-size="12" fill="${K.pri}" font-family="inherit">两直线平行</text>`;
    return S(w, h, s, 320);
  };

  /* ---------------- 直角三角形三角函数 ---------------- */
  Fig.trigTri = function () {
    const A = { x: 70, y: 140 }, B = { x: 250, y: 140 }, C = { x: 70, y: 60 };
    let s = `<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    const sz = 16;
    s += `<path d="M ${A.x} ${A.y - sz} L ${A.x + sz} ${A.y - sz} L ${A.x + sz} ${A.y}" fill="none" stroke="${K.warn}" stroke-width="1.5"/>`;
    s += `<text x="${A.x - 10}" y="${A.y + 4}" font-size="13" fill="${K.pri}" font-weight="700" font-family="inherit">A</text>`;
    s += `<text x="${B.x + 8}" y="${B.y + 4}" font-size="13" fill="${K.pri}" font-weight="700" font-family="inherit">B</text>`;
    s += `<text x="${C.x - 6}" y="${C.y - 8}" font-size="13" fill="${K.pri}" font-weight="700" font-family="inherit">C</text>`;
    s += `<text x="${(B.x + C.x) / 2 + 12}" y="${(B.y + C.y) / 2}" font-size="12" fill="${K.red}" font-weight="700" font-family="inherit">对边</text>`;
    s += `<text x="${(A.x + B.x) / 2}" y="${(A.y + B.y) / 2 + 20}" font-size="12" fill="${K.blue}" font-weight="700" font-family="inherit">斜边</text>`;
    s += `<text x="160" y="36" font-size="13" fill="${K.ink}" text-anchor="middle" font-family="inherit">sin A = 对边 / 斜边</text>`;
    return S(320, 170, s, 320);
  };

  /* ---------------- 几何体：棱锥 / 球 ---------------- */
  Fig.pyramid = function () {
    const B1 = { x: 90, y: 140 }, B2 = { x: 230, y: 140 }, B3 = { x: 160, y: 95 }, A = { x: 160, y: 55 };
    let s = `<polygon points="${B1.x},${B1.y} ${B2.x},${B2.y} ${B3.x},${B3.y}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<line x1="${A.x}" y1="${A.y}" x2="${B1.x}" y2="${B1.y}" stroke="${K.pri}" stroke-width="2"/>`;
    s += `<line x1="${A.x}" y1="${A.y}" x2="${B2.x}" y2="${B2.y}" stroke="${K.pri}" stroke-width="2"/>`;
    s += `<line x1="${A.x}" y1="${A.y}" x2="${B3.x}" y2="${B3.y}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<text x="${A.x + 8}" y="${A.y + 4}" font-size="12" fill="${K.ink}" font-family="inherit">顶点</text>`;
    s += `<text x="160" y="172" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">三棱锥 V = ⅓ × 底面积 × 高</text>`;
    return S(320, 190, s, 320);
  };
  Fig.sphere = function () {
    const cx = 160, cy = 95, r = 62;
    let s = `<defs><radialGradient id="sg" cx="35%" cy="30%" r="75%"><stop offset="0%" stop-color="#eaf1ff"/><stop offset="100%" stop-color="${K.soft}"/></radialGradient></defs>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#sg)" stroke="${K.ink}" stroke-width="2.5"/>`;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.32}" fill="none" stroke="${K.sub}" stroke-width="1.2"/>`;
    s += `<text x="${cx}" y="${cy + r + 22}" font-size="13" fill="${K.ink}" text-anchor="middle" font-family="inherit">球表面积 = 4πr²</text>`;
    return S(320, 185, s, 320);
  };

  /* ---------------- 正方形 / 矩形尺寸 ---------------- */
  Fig.square = function (p) {
    p = p || {}; const sd = p.side || 5;
    const x = 70, y = 45, W = 160;
    let g = `<rect x="${x}" y="${y}" width="${W}" height="${W}" rx="4" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    g += `<text x="${x + W / 2}" y="${y + W + 22}" font-size="13" fill="${K.ink}" text-anchor="middle" font-family="inherit">边长 ${sd}｜周长 4×${sd}=${4 * sd}</text>`;
    return S(320, 240, g, 320);
  };
  Fig.rectDim = function (p) {
    p = p || {}; const w = p.w || 6, h = p.h || 4;
    const x = 60, y = 50, W = 200, H = 110;
    let g = `<rect x="${x}" y="${y}" width="${W}" height="${H}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    g += `<text x="${x + W / 2}" y="${y + H + 22}" font-size="13" fill="${K.ink}" text-anchor="middle" font-family="inherit">长 ${w}</text>`;
    g += `<text x="${x - 16}" y="${y + H / 2 + 4}" font-size="13" fill="${K.ink}" font-family="inherit">宽 ${h}</text>`;
    g += `<text x="160" y="38" font-size="13" fill="${K.ink}" text-anchor="middle" font-family="inherit">周长 = 2×(长+宽) = ${2 * (w + h)}</text>`;
    return S(320, 195, g, 320);
  };

  /* ---------------- 三角形面积 / 等积变形 ---------------- */
  Fig.triBase = function () {
    const A = { x: 60, y: 140 }, B = { x: 260, y: 140 }, C = { x: 150, y: 50 };
    let s = `<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    s += `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${K.red}" stroke-width="2"/>`;
    s += `<text x="${(A.x + B.x) / 2}" y="${A.y + 20}" font-size="13" fill="${K.red}" font-weight="700" font-family="inherit">底 8</text>`;
    s += `<line x1="${C.x}" y1="${C.y}" x2="${C.x}" y2="${A.y}" stroke="${K.pri}" stroke-width="2" stroke-dasharray="4 3"/>`;
    s += `<text x="${C.x + 6}" y="${(C.y + A.y) / 2}" font-size="13" fill="${K.pri}" font-weight="700" font-family="inherit">高 5</text>`;
    s += `<text x="160" y="36" font-size="13" fill="${K.ink}" text-anchor="middle" font-family="inherit">面积 = ½ × 8 × 5 = 20</text>`;
    return S(320, 170, s, 320);
  };
  Fig.triPara = function () {
    const base = 80, h = 70, x = 40, y = 130;
    let s = `<polygon points="${x},${y} ${x + base},${y} ${x + base / 2},${y - h}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    const px = x + base + 36;
    s += `<polygon points="${px},${y} ${px + base},${y} ${px + base + 22},${y - h} ${px + 22},${y - h}" fill="#e7f6ee" stroke="${K.ink}" stroke-width="2.5"/>`;
    s += `<text x="${x + base / 2}" y="${y + 20}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">△</text>`;
    s += `<text x="${px + base / 2 + 11}" y="${y + 20}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">▱ = 2×△</text>`;
    s += `<text x="160" y="40" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">等底等高：平行四边形面积 = 三角形 × 2</text>`;
    return S(320, 175, s, 320);
  };
  Fig.triSameBase = function () {
    const x0 = 50, x1 = 270, yTop = 60, yBot = 140;
    let s = `<line x1="${x0}" y1="${yTop}" x2="${x1}" y2="${yTop}" stroke="${K.sub}" stroke-width="2"/>`;
    s += `<line x1="${x0}" y1="${yBot}" x2="${x1}" y2="${yBot}" stroke="${K.sub}" stroke-width="2"/>`;
    const A = { x: 80, y: yTop }, B = { x: 240, y: yTop };
    const P1 = { x: 130, y: yBot }, P2 = { x: 200, y: yBot };
    s += `<polygon points="${A.x},${A.y} ${B.x},${B.y} ${P1.x},${P1.y}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<polygon points="${A.x},${A.y} ${B.x},${B.y} ${P2.x},${P2.y}" fill="#e7f6ee" stroke="${K.pri}" stroke-width="2"/>`;
    s += `<text x="160" y="172" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">同底、平行线间：任意顶点 → 面积都相等</text>`;
    return S(320, 188, s, 320);
  };

  /* ---------------- 圆锥曲线 + 直线 / 散点回归 ---------------- */
  Fig.conicLine = function () {
    const w = 320, h = 180;
    let s = axes(w, h, 40, 90);
    s += `<ellipse cx="160" cy="90" rx="78" ry="46" fill="none" stroke="${K.red}" stroke-width="2.5"/>`;
    s += `<line x1="60" y1="130" x2="270" y2="50" stroke="${K.ink}" stroke-width="2.5"/>`;
    s += `<circle cx="110" cy="111" r="3.5" fill="${K.ink}"/><circle cx="225" cy="71" r="3.5" fill="${K.ink}"/>`;
    s += `<text x="160" y="166" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">直线与二次曲线联立 → 一元二次方程</text>`;
    return S(w, h, s, 320);
  };
  Fig.scatter = function () {
    const w = 320, h = 180, x0 = 50, y0 = 150;
    let s = `<line x1="${x0}" y1="${y0}" x2="${w - 20}" y2="${y0}" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<line x1="${x0}" y1="${h - 20}" x2="${x0}" y2="20" stroke="${K.ink}" stroke-width="1.5"/>`;
    const pts = [[20, 30], [60, 55], [100, 60], [140, 80], [180, 95], [220, 110], [255, 120]];
    pts.forEach(([dx, dy]) => { const px = x0 + dx, py = y0 - dy; s += `<circle cx="${px}" cy="${py}" r="4" fill="${K.pri}"/>`; });
    s += `<line x1="${x0 + 10}" y1="${y0 - 15}" x2="${w - 30}" y2="${y0 - 130}" stroke="${K.red}" stroke-width="2" stroke-dasharray="5 4"/>`;
    s += `<text x="205" y="34" font-size="12" fill="${K.red}" font-family="inherit">趋势线（回归）</text>`;
    return S(w, h, s, 320);
  };

  /* ---------------- 比例尺 / 分数比较条 / 分数条 / 锯木 / 矩形动点 ---------------- */
  Fig.scaleFig = function () {
    let s = `<line x1="50" y1="70" x2="90" y2="70" stroke="${K.ink}" stroke-width="3"/>`;
    s += `<text x="70" y="58" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">图上 2 cm</text>`;
    s += `<line x1="50" y1="120" x2="290" y2="120" stroke="${K.ink}" stroke-width="3"/>`;
    s += `<text x="170" y="108" font-size="12" fill="${K.pri}" text-anchor="middle" font-family="inherit">实际 20 m</text>`;
    s += `<text x="160" y="155" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">比例尺 1:1000 → 图上1cm代表实际10m</text>`;
    return S(320, 175, s, 320);
  };
  Fig.fracCmp = function () {
    const x1 = 40, x2 = 180, y = 60, w = 100, h = 34;
    let s = `<rect x="${x1}" y="${y}" width="${w}" height="${h}" fill="${K.soft}" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<rect x="${x1}" y="${y}" width="${w * 2 / 3}" height="${h}" fill="${K.pri}"/>`;
    s += `<text x="${x1 + w / 2}" y="${y - 8}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">2/3</text>`;
    s += `<rect x="${x2}" y="${y + 50}" width="${w}" height="${h}" fill="${K.soft}" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<rect x="${x2}" y="${y + 50}" width="${w * 3 / 5}" height="${h}" fill="${K.ok}"/>`;
    s += `<text x="${x2 + w / 2}" y="${y + 50 - 8}" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">3/5</text>`;
    s += `<text x="160" y="168" font-size="13" fill="${K.ink}" text-anchor="middle" font-family="inherit">2/3 > 3/5</text>`;
    return S(320, 185, s, 320);
  };
  Fig.fracBar = function () {
    const x = 40, y = 80, w = 240, h = 46, n = 5, uw = w / n;
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${K.soft}" stroke="${K.ink}" stroke-width="1.5"/>`;
    for (let i = 0; i < n; i++) {
      s += `<line x1="${x + i * uw}" y1="${y}" x2="${x + i * uw}" y2="${y + h}" stroke="${K.line}" stroke-width="1"/>`;
      if (i < 2) s += `<rect x="${x + i * uw}" y="${y}" width="${uw}" height="${h}" fill="${K.pri}"/>`;
    }
    s += `<text x="${x + w / 4}" y="${y + h / 2 + 5}" font-size="13" fill="#fff" font-weight="700" text-anchor="middle" font-family="inherit">2/5</text>`;
    s += `<text x="160" y="40" font-size="13" fill="${K.ink}" text-anchor="middle" font-family="inherit">1 米分 5 段，取 2 段 = 2/5 米</text>`;
    return S(320, 150, s, 320);
  };
  Fig.cutbar = function () {
    const x = 40, y = 80, w = 240, h = 34, n = 5, uw = w / (n - 1);
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    for (let i = 1; i < n; i++) { const cx = x + i * uw; s += `<line x1="${cx}" y1="${y - 8}" x2="${cx}" y2="${y + h + 8}" stroke="${K.red}" stroke-width="2"/>`; }
    s += `<text x="160" y="50" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">锯成 5 段 → 锯 4 次</text>`;
    s += `<text x="160" y="150" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">段数 = 锯次数 + 1</text>`;
    return S(320, 170, s, 320);
  };
  Fig.rectMove = function () {
    const x = 70, y = 60, W = 180, H = 110;
    let s = `<rect x="${x}" y="${y}" width="${W}" height="${H}" fill="${K.soft}" stroke="${K.ink}" stroke-width="2.5"/>`;
    s += `<circle cx="${x}" cy="${y}" r="4" fill="${K.ink}"/><text x="${x - 6}" y="${y - 6}" font-size="12" fill="${K.ink}" font-family="inherit">A</text>`;
    const P = { x: x + W * 0.6, y: y + H * 0.5 };
    s += `<circle cx="${P.x}" cy="${P.y}" r="6" fill="${K.red}"/><text x="${P.x + 10}" y="${P.y + 4}" font-size="12" fill="${K.red}" font-weight="700" font-family="inherit">P</text>`;
    s += `<text x="160" y="200" font-size="12" fill="${K.ink}" text-anchor="middle" font-family="inherit">动点 P 沿边移到 C，AP 长度随位置变化</text>`;
    return S(320, 215, s, 320);
  };

  /* ============================================================
   * 题目配图注册表：技巧id -> 配图规格
   *  - 字符串：该技术所有题目用同一配图
   *  - 数组：按题目下标对应（缺省下标不配图）
   * 规格可为 "名字" 或 {name:"名字", ...参数}
   * ============================================================ */
  window.QFIG = {};
  window.QFIG_MAP = {
    /* 植树问题 */
    "plant::0": { name: "treeLine", n: 5, mode: "both" },
    "plant::1": { name: "treeLine", n: 5, mode: "one" },
    "plant::2": { name: "treeLine", n: 5, mode: "none" },
    "plant::3": "cutbar",
    /* 分数 */
    "fraction::2": "fracCmp",
    "fraction::3": "fracBar",
    /* 百分数 */
    "percent::1": { name: "percentBar", pct: 80 },
    /* 比和比例 */
    "ratio::0": { name: "barModel", a: 2, b: 4 },
    "ratio::2": "scaleFig",
    "ratio::3": { name: "graphLine", m: 3, b: 0 },
    /* 鸡兔同笼 */
    "chicken::0": "crt", "chicken::1": "crt", "chicken::2": "crt", "chicken::3": "crt",
    /* 行程：相遇/追及/速度/环形 各异 */
    "trip::0": { name: "trackAB", cap: "相遇：速度和 × 时间" },
    "trip::1": { name: "trackAB", cap: "同向追及" },
    "trip::3": "ring",
    /* 圆（认识/周长面积） */
    "circle::0": "circleR",
    "circle::1": { name: "circleR", withD: true },
    "circle::2": "semicircle",
    "circle::3": "twoCircle",
    /* 圆柱圆锥 */
    "cylinder::0": "cyl3d", "cylinder::1": "cone3d", "cylinder::2": "cyl3d", "cylinder::3": "cone3d",
    /* 有理数与数轴 */
    "rational::1": "numline", "rational::2": "numline", "rational::3": "numline",
    /* 线段与角 */
    "segangle::0": "seg", "segangle::1": "bisector", "segangle::2": { name: "angle", deg: 90 }, "segangle::3": "supp",
    /* 三角形性质 */
    "triangle::0": "tri", "triangle::1": "triSide", "triangle::2": "triIso", "triangle::3": "triRight",
    /* 全等/相似 */
    "congruent::0": "twoTriCong", "congruent::1": "twoTriCong", "congruent::2": "twoTriCong", "congruent::3": "twoTriCong", "congruent::4": "twoTriCong", "congruent::5": "twoTriCong", "congruent::6": "twoTriCong",
    "similar::0": "twoTriSim", "similar::1": "twoTriSim", "similar::2": "twoTriSim", "similar::3": "twoTriSim",
    /* 勾股定理（含具体边长） */
    "pyth::0": { name: "rightTri", a: 3, b: 4, c: 5 },
    "pyth::1": { name: "rightTri", a: 5, b: 12, c: 13 },
    "pyth::2": { name: "rightTri", a: 3, b: 4, c: 5 },
    "pyth::3": { name: "rightTri", a: 5, b: 12, c: 13 },
    /* 四边形 */
    "quad::0": "para", "quad::1": "rect", "quad::2": "rhombus", "quad::3": "trap",
    /* 圆的性质：圆周角/直径直角/切线/圆心角 各异 */
    "circ::0": "inscribed", "circ::1": "thales", "circ::2": "tangent", "circ::3": "central",
    /* 动点 */
    "moving::0": { name: "graphLine", m: 1, b: 0 },
    "moving::2": "rectMove",
    /* 一次函数 */
    "func1::0": { name: "graphLine", m: 2, b: 1 },
    "func1::1": { name: "graphLine", m: 1, b: -1 },
    "func1::2": { name: "graphLine", m: -1, b: 3 },
    "func1::3": "twoLines",
    /* 反比例函数 */
    "inverse::0": "hyperb", "inverse::1": "hyperb", "inverse::2": "hyperb", "inverse::3": "hyperb",
    /* 二次函数 */
    "quadfunc::0": { name: "parab", a: 1 }, "quadfunc::1": { name: "parab", a: 1 }, "quadfunc::2": { name: "parab", a: 1 }, "quadfunc::3": { name: "parab", a: -1 },
    /* 统计图表 */
    "stats::0": "dataBars", "stats::1": "dataBars", "stats::2": "pieChart", "stats::3": "dataBars",
    /* 概率 */
    "prob::0": "coin", "prob::1": "dice", "prob::2": "eventCertain", "prob::3": "eventImpossible",
    /* 集合 */
    "set::2": "venn", "set::3": "venn",
    /* 函数概念 */
    "funcconcept::3": { name: "graphLine", m: 1, b: 0 },
    /* 三角函数 */
    "trig::2": "trigTri",
    /* 向量 */
    "vector::0": "vector2", "vector::3": "vector2",
    /* 立体几何 */
    "solid::0": "cube3d", "solid::1": "cube3d", "solid::2": "pyramid", "solid::3": "sphere",
    /* 导数 */
    "derivative::0": "derivCurve", "derivative::1": "derivCurve", "derivative::2": "derivCurve", "derivative::3": "derivCurve",
    /* 圆锥曲线（椭圆/双曲线/抛物线各异） */
    "conic::0": { name: "conicFig", type: "ellipse" },
    "conic::1": { name: "conicFig", type: "hyperbola" },
    "conic::2": { name: "conicFig", type: "parabola" },
    "conic::3": { name: "conicFig", type: "ellipse" },
    /* 相遇/追及/流水/环形 */
    "meet::0": { name: "trackAB", cap: "相向而行" }, "meet::1": { name: "trackAB", cap: "相向而行" }, "meet::2": { name: "trackAB", cap: "相向而行" },
    "chase::0": { name: "trackAB", cap: "同向追及" }, "chase::1": { name: "trackAB", cap: "同向追及" }, "chase::2": { name: "trackAB", cap: "同向追及" },
    "boat::0": "trackRiver", "boat::1": "trackRiver", "boat::2": "trackRiver",
    "circle_track::0": "ring", "circle_track::1": "ring", "circle_track::2": "ring",
    /* 巧求周长 */
    "perim::0": { name: "rectDim", w: 6, h: 4 }, "perim::1": { name: "square", side: 5 }, "perim::2": "stair",
    /* 等积变形（原误用椭圆，改为面积图） */
    "area_equal::0": "triBase", "area_equal::1": "triPara", "area_equal::2": "triSameBase",
    /* 复数 */
    "complex::0": "complexPlane", "complex::1": "complexPlane", "complex::2": "complexPlane", "complex::3": "complexPlane",
    /* 圆锥曲线进阶 */
    "conic_link::0": "conicLine",
    "conic_link::1": { name: "conicFig", type: "ellipse" }, "conic_link::2": { name: "conicFig", type: "ellipse" }, "conic_link::3": { name: "conicFig", type: "ellipse" },
    "conic_chord::0": { name: "conicFig", type: "ellipse" },
    "conic_chord::1": { name: "conicFig", type: "parabola" },
    "conic_chord::3": { name: "conicFig", type: "ellipse" },
    "conic_prop::0": { name: "conicFig", type: "ellipse" },
    "conic_prop::1": { name: "conicFig", type: "hyperbola" },
    "conic_prop::2": { name: "conicFig", type: "parabola" },
    "conic_prop::3": { name: "conicFig", type: "hyperbola" },
    /* 二项分布与正态 */
    "dist_binom::0": { name: "barChart", data: [{ l: "0", v: 1, c: K.pri }, { l: "1", v: 4, c: K.ok }, { l: "2", v: 6, c: K.warn }, { l: "3", v: 4, c: K.Orange }, { l: "4", v: 1, c: K.purple }] },
    "dist_binom::1": { name: "barChart", data: [{ l: "0", v: 1, c: K.pri }, { l: "1", v: 4, c: K.ok }, { l: "2", v: 6, c: K.warn }, { l: "3", v: 4, c: K.Orange }, { l: "4", v: 1, c: K.purple }] },
    "dist_binom::2": "normalCurve", "dist_binom::3": "normalCurve",
    /* 统计案例（仅相关图配） */
    "stat_case::2": "scatter",
    /* 拓展专题 */
    "euler::0": "euler_circle", "euler::1": "euler_circle", "euler::2": "euler_circle", "euler::3": "euler_circle",
    "taylor::0": "taylor_graph", "taylor::1": "taylor_graph", "taylor::2": "taylor_graph", "taylor::3": "taylor_graph",
    "numshape::0": "numshape_coord", "numshape::1": "numshape_coord", "numshape::2": "numshape_coord", "numshape::3": "numshape_coord",
    "induction::0": "induction_steps", "induction::1": "induction_steps", "induction::2": "induction_steps", "induction::3": "induction_steps",
    "amgm::0": "amgm_rect", "amgm::1": "amgm_rect", "amgm::2": "amgm_rect", "amgm::3": "amgm_rect",
    "binomial::0": "binomial_triangle", "binomial::1": "binomial_triangle", "binomial::2": "binomial_triangle", "binomial::3": "binomial_triangle",
    "inclusion_hs::0": "inclusion_venn", "inclusion_hs::1": "inclusion_venn", "inclusion_hs::2": "inclusion_venn", "inclusion_hs::3": "inclusion_venn",
    "recurrence::0": "recurrence_tree", "recurrence::1": "recurrence_tree", "recurrence::2": "recurrence_tree", "recurrence::3": "recurrence_tree",
    /* 第二批拓展：树状图/排列组合/柯西/线性规划/矩阵/洛必达/中值定理/贝叶斯 */
    "tree::0": "tree_diagram", "tree::1": "tree_diagram", "tree::2": "tree_diagram", "tree::3": "tree_diagram",
    "counting::0": "counting_tree", "counting::1": "counting_tree", "counting::2": "counting_tree", "counting::3": "counting_tree",
    "cauchy::0": "cauchy_rect", "cauchy::1": "cauchy_rect", "cauchy::2": "cauchy_rect", "cauchy::3": "cauchy_rect",
    "linearprog::0": "lprog_region", "linearprog::1": "lprog_region", "linearprog::2": "lprog_region", "linearprog::3": "lprog_region",
    "matrix::0": "matrix_det", "matrix::1": "matrix_det", "matrix::2": "matrix_det", "matrix::3": "matrix_det",
    "lhopital::0": "lhopital_graph", "lhopital::1": "lhopital_graph", "lhopital::2": "lhopital_graph", "lhopital::3": "lhopital_graph",
    "mvt::0": "mvt_tangent", "mvt::1": "mvt_tangent", "mvt::2": "mvt_tangent", "mvt::3": "mvt_tangent",
    "bayes::0": "bayes_tree", "bayes::1": "bayes_tree", "bayes::2": "bayes_tree", "bayes::3": "bayes_tree",
    "fullprob::0": "fullprob_tree", "fullprob::1": "fullprob_tree", "fullprob::2": "fullprob_tree", "fullprob::3": "fullprob_tree",
    "normal_app::0": "normal_curve", "normal_app::1": "normal_curve", "normal_app::2": "normal_curve", "normal_app::3": "normal_curve",
    "definite_int::0": "definite_area", "definite_int::1": "definite_area", "definite_int::2": "definite_area", "definite_int::3": "definite_area",
    "diffeq::0": "diffeq_slope", "diffeq::1": "diffeq_slope", "diffeq::2": "diffeq_slope", "diffeq::3": "diffeq_slope",
    "ineq_scale::0": "ineq_scale", "ineq_scale::1": "ineq_scale", "ineq_scale::2": "ineq_scale", "ineq_scale::3": "ineq_scale",
    "seq_ineq::0": "seq_ineq", "seq_ineq::1": "seq_ineq", "seq_ineq::2": "seq_ineq", "seq_ineq::3": "seq_ineq",
    "complex_geo::0": "complex_plane", "complex_geo::1": "complex_plane", "complex_geo::2": "complex_plane", "complex_geo::3": "complex_plane",
    "series::0": "series_partial", "series::1": "series_partial", "series::2": "series_partial", "series::3": "series_partial",
    /* 第四批拓展 */
    "coord_geo::0": "coord_dist", "coord_geo::1": "coord_mid", "coord_geo::2": "coord_slope", "coord_geo::3": "coord_circle",
    "jensen::0": "jensen_conv", "jensen::1": "jensen_ineq", "jensen::2": "jensen_means", "jensen::3": "jensen_ineq",
    "important_limit::0": "lim_sinx", "important_limit::1": "lim_exp", "important_limit::2": "lim_exp", "important_limit::3": "lim_exp",
    "de_moivre::0": "demoivre_pow", "de_moivre::1": "demoivre_root", "de_moivre::2": "demoivre_unit", "de_moivre::3": "demoivre_pow",
    "random_var::0": "rv_linear", "random_var::1": "rv_linear", "random_var::2": "rv_bernoulli", "random_var::3": "rv_binom",
    "fourier::0": "fourier_series", "fourier::1": "fourier_odd", "fourier::2": "fourier_even", "fourier::3": "fourier_series",
    "integral_app::0": "int_area", "integral_app::1": "int_volume", "integral_app::2": "int_avg", "integral_app::3": "int_arc",
    "graph_transform::0": "gtrans_shift", "graph_transform::1": "gtrans_sym", "graph_transform::2": "gtrans_scale", "graph_transform::3": "gtrans_abs"
  };


  /* ---------------- 拓展专题配图 ---------------- */
  Fig.euler_circle = function () {
    const cx = 150, cy = 150, R = 110;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<line x1="${cx}" y1="20" x2="${cx}" y2="280" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${K.pri}" stroke-width="2"/>`;
    const ang = Math.PI / 3;
    const x = cx + R * Math.cos(ang), y = cy - R * Math.sin(ang);
    s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${K.warn}" stroke-width="3"/>`;
    s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${cy}" stroke="${K.red}" stroke-width="2" stroke-dasharray="4 3"/>`;
    s += `<line x1="${x}" y1="${cy}" x2="${x}" y2="${y}" stroke="${K.green}" stroke-width="2" stroke-dasharray="4 3"/>`;
    s += `<circle cx="${x}" cy="${y}" r="5" fill="${K.warn}"/>`;
    s += `<text x="${x + 8}" y="${y - 8}" fill="${K.ink}" font-size="13">e^(iθ)</text>`;
    s += `<text x="${cx + R / 2 - 10}" y="${cy + 20}" fill="${K.red}" font-size="12">cosθ</text>`;
    s += `<text x="${x + 8}" y="${cy - 4}" fill="${K.green}" font-size="12">sinθ</text>`;
    s += `<text x="24" y="22" fill="${K.sub}" font-size="12">欧拉公式 e^(iθ)=cosθ+i·sinθ</text>`;
    return S(300, 300, s);
  };

  Fig.taylor_graph = function () {
    const W = 320, H = 220, cx = 40, cy = 180;
    const X = v => cx + v * 28;
    const Y = v => { let w = v; if (w > 9) w = 9; return cy - w * 16; };
    let s = `<line x1="${cx}" y1="10" x2="${cx}" y2="${cy}" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<line x1="${cx}" y1="${cy}" x2="312" y2="${cy}" stroke="${K.ink}" stroke-width="1.5"/>`;
    function curve(fn, color, w) {
      let pts = [];
      for (let i = -1; i <= 2.8001; i += 0.1) { let v = fn(i); if (v > 9) v = 9; pts.push([X(i), Y(v)]); }
      s += `<polyline points="${pts.map(p => p[0] + "," + p[1]).join(" ")}" fill="none" stroke="${color}" stroke-width="${w}"/>`;
    }
    curve(Math.exp, K.pri, 2.5);
    curve(x => 1 + x + x * x / 2 + x * x * x / 6, K.warn, 2.5);
    s += `<text x="20" y="22" fill="${K.sub}" font-size="12">蓝：e^x　橙：1+x+x²/2+x³/6</text>`;
    return S(W, H, s);
  };

  Fig.numshape_coord = function () {
    const W = 300, H = 300, cx = 150, cy = 150;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<line x1="${cx}" y1="20" x2="${cx}" y2="280" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<rect x="20" y="20" width="${cx - 20}" height="${cy - 20}" fill="${K.soft}"/>`;
    s += `<text x="40" y="42" fill="${K.pri}" font-size="13">第二象限</text>`;
    s += `<text x="${cx + 8}" y="42" fill="${K.sub}" font-size="13">第一象限</text>`;
    s += `<text x="40" y="272" fill="${K.sub}" font-size="13">第三象限</text>`;
    s += `<text x="${cx + 8}" y="272" fill="${K.sub}" font-size="13">第四象限</text>`;
    const px = cx - 50, py = cy - 60;
    s += `<circle cx="${px}" cy="${py}" r="5" fill="${K.warn}"/>`;
    s += `<text x="${px + 8}" y="${py - 8}" fill="${K.ink}" font-size="13">(−2, 3)</text>`;
    return S(W, H, s);
  };

  Fig.induction_steps = function () {
    let s = `<rect x="20" y="30" width="250" height="44" rx="8" fill="${K.soft}" stroke="${K.pri}" stroke-width="1.5"/>`;
    s += `<text x="40" y="58" fill="${K.ink}" font-size="14">① 奠基：验证 n=1 成立</text>`;
    s += `<text x="150" y="108" fill="${K.sub}" font-size="20" text-anchor="middle">↓</text>`;
    s += `<rect x="20" y="120" width="250" height="44" rx="8" fill="${K.soft}" stroke="${K.pri}" stroke-width="1.5"/>`;
    s += `<text x="40" y="148" fill="${K.ink}" font-size="14">② 假设 n=k 成立</text>`;
    s += `<text x="150" y="198" fill="${K.sub}" font-size="20" text-anchor="middle">↓</text>`;
    s += `<rect x="20" y="210" width="250" height="44" rx="8" fill="${K.soft}" stroke="${K.ok}" stroke-width="1.5"/>`;
    s += `<text x="40" y="238" fill="${K.ink}" font-size="14">③ 推出 n=k+1 成立</text>`;
    return S(290, 270, s);
  };

  Fig.amgm_rect = function () {
    let s = `<rect x="40" y="80" width="120" height="80" fill="${K.soft}" stroke="${K.pri}" stroke-width="2"/>`;
    s += `<text x="92" y="70" fill="${K.ink}" font-size="14">a</text>`;
    s += `<text x="152" y="128" fill="${K.ink}" font-size="14">b</text>`;
    s += `<line x1="40" y1="165" x2="280" y2="165" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<rect x="40" y="165" width="200" height="14" fill="${K.warn}" opacity="0.45"/>`;
    s += `<text x="40" y="205" fill="${K.ink}" font-size="14">a + b ≥ 2√(ab)</text>`;
    s += `<text x="40" y="40" fill="${K.sub}" font-size="13">周长固定时，正方形面积最大</text>`;
    return S(300, 220, s);
  };

  Fig.binomial_triangle = function () {
    const rows = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]];
    let s = "";
    const y0 = 36, dx = 34, dy = 34;
    rows.forEach((r, i) => {
      const startX = 150 - (r.length - 1) * dx / 2;
      r.forEach((v, j) => {
        const x = startX + j * dx, y = y0 + i * dy;
        s += `<text x="${x - 6}" y="${y + 5}" fill="${K.ink}" font-size="13" text-anchor="middle">${v}</text>`;
      });
    });
    s += `<text x="55" y="224" fill="${K.sub}" font-size="12">(a+b)^4 系数：1 4 6 4 1</text>`;
    return S(300, 240, s);
  };

  Fig.inclusion_venn = function () {
    let s = `<circle cx="110" cy="150" r="70" fill="${K.soft}" stroke="${K.pri}" stroke-width="2"/>`;
    s += `<circle cx="190" cy="150" r="70" fill="${K.soft}" stroke="${K.warn}" stroke-width="2"/>`;
    s += `<text x="78" y="156" fill="${K.ink}" font-size="14">A</text>`;
    s += `<text x="200" y="156" fill="${K.ink}" font-size="14">B</text>`;
    s += `<text x="40" y="42" fill="${K.sub}" font-size="13">|A∪B| = |A|+|B|−|A∩B|</text>`;
    return S(300, 300, s);
  };

  Fig.recurrence_tree = function () {
    let s = `<circle cx="50" cy="150" r="16" fill="${K.soft}" stroke="${K.pri}" stroke-width="1.5"/><text x="42" y="155" font-size="13" fill="${K.ink}" text-anchor="middle">a₁</text>`;
    s += `<circle cx="140" cy="110" r="16" fill="${K.soft}" stroke="${K.pri}" stroke-width="1.5"/><text x="132" y="115" font-size="13" fill="${K.ink}" text-anchor="middle">a₂</text>`;
    s += `<circle cx="140" cy="190" r="16" fill="${K.soft}" stroke="${K.pri}" stroke-width="1.5"/><text x="132" y="195" font-size="13" fill="${K.ink}" text-anchor="middle">a₂</text>`;
    s += `<line x1="66" y1="144" x2="124" y2="112" stroke="${K.line}"/><line x1="66" y1="156" x2="124" y2="188" stroke="${K.line}"/>`;
    s += `<circle cx="230" cy="110" r="16" fill="${K.soft}" stroke="${K.ok}" stroke-width="1.5"/><text x="222" y="115" font-size="13" fill="${K.ink}" text-anchor="middle">a₃</text>`;
    s += `<circle cx="230" cy="190" r="16" fill="${K.soft}" stroke="${K.ok}" stroke-width="1.5"/><text x="222" y="195" font-size="13" fill="${K.ink}" text-anchor="middle">a₃</text>`;
    s += `<line x1="156" y1="110" x2="214" y2="110" stroke="${K.line}"/><line x1="156" y1="190" x2="214" y2="190" stroke="${K.line}"/>`;
    s += `<text x="40" y="42" fill="${K.sub}" font-size="12">递推：aₙ₊₁ = f(aₙ)</text>`;
    return S(300, 260, s);
  };

  /* ---------------- 第二批拓展配图 ---------------- */
  Fig.tree_diagram = function () {
    let s = `<text x="20" y="28" fill="${K.sub}" font-size="12">树状图：逐层分支</text>`;
    s += `<circle cx="40" cy="80" r="14" fill="${K.soft}" stroke="${K.pri}" stroke-width="1.5"/>`;
    s += `<line x1="54" y1="80" x2="110" y2="50" stroke="${K.line}"/><line x1="54" y1="80" x2="110" y2="110" stroke="${K.line}"/>`;
    s += `<circle cx="130" cy="50" r="13" fill="${K.soft}" stroke="${K.ok}" stroke-width="1.5"/><text x="121" y="54" font-size="11" fill="${K.ink}">A</text>`;
    s += `<circle cx="130" cy="110" r="13" fill="${K.soft}" stroke="${K.ok}" stroke-width="1.5"/><text x="121" y="114" font-size="11" fill="${K.ink}">B</text>`;
    s += `<line x1="143" y1="50" x2="200" y2="35" stroke="${K.line}"/><line x1="143" y1="50" x2="200" y2="65" stroke="${K.line}"/>`;
    s += `<line x1="143" y1="110" x2="200" y2="95" stroke="${K.line}"/><line x1="143" y1="110" x2="200" y2="125" stroke="${K.line}"/>`;
    s += `<circle cx="215" cy="35" r="11" fill="${K.soft}" stroke="${K.warn}" stroke-width="1.5"/><circle cx="215" cy="65" r="11" fill="${K.soft}" stroke="${K.warn}" stroke-width="1.5"/>`;
    s += `<circle cx="215" cy="95" r="11" fill="${K.soft}" stroke="${K.warn}" stroke-width="1.5"/><circle cx="215" cy="125" r="11" fill="${K.soft}" stroke="${K.warn}" stroke-width="1.5"/>`;
    s += `<text x="118" y="152" fill="${K.sub}" font-size="11">分支数相乘：2 × 2 = 4 种结果</text>`;
    return S(300, 170, s);
  };
  Fig.counting_tree = function () {
    let s = `<text x="20" y="26" fill="${K.sub}" font-size="12">排列 A(n,2)：有顺序</text>`;
    s += `<circle cx="40" cy="80" r="14" fill="${K.soft}" stroke="${K.pri}" stroke-width="1.5"/>`;
    s += `<line x1="54" y1="80" x2="120" y2="55" stroke="${K.line}"/><line x1="54" y1="80" x2="120" y2="105" stroke="${K.line}"/>`;
    s += `<circle cx="135" cy="55" r="13" fill="${K.soft}" stroke="${K.ok}" stroke-width="1.5"/><text x="127" y="59" font-size="11" fill="${K.ink}">①</text>`;
    s += `<circle cx="135" cy="105" r="13" fill="${K.soft}" stroke="${K.ok}" stroke-width="1.5"/><text x="127" y="109" font-size="11" fill="${K.ink}">②</text>`;
    s += `<line x1="148" y1="55" x2="210" y2="40" stroke="${K.line}"/><line x1="148" y1="55" x2="210" y2="70" stroke="${K.line}"/>`;
    s += `<line x1="148" y1="105" x2="210" y2="90" stroke="${K.line}"/><line x1="148" y1="105" x2="210" y2="120" stroke="${K.line}"/>`;
    s += `<text x="216" y="44" font-size="11" fill="${K.ink}">①②</text><text x="216" y="74" font-size="11" fill="${K.ink}">②①</text>`;
    s += `<text x="216" y="94" font-size="11" fill="${K.ink}">②①</text><text x="216" y="124" font-size="11" fill="${K.ink}">①②</text>`;
    s += `<text x="64" y="152" fill="${K.sub}" font-size="11">顺序不同算不同：A(2,2)=2</text>`;
    return S(300, 170, s);
  };
  Fig.cauchy_rect = function () {
    let s = `<text x="20" y="26" fill="${K.sub}" font-size="12">柯西：|u·v| ≤ |u||v|</text>`;
    s += `<line x1="60" y1="150" x2="60" y2="40" stroke="${K.line}"/><line x1="40" y1="150" x2="210" y2="150" stroke="${K.line}"/>`;
    s += `<line x1="60" y1="150" x2="160" y2="80" stroke="${K.pri}" stroke-width="3"/>`;
    s += `<line x1="60" y1="150" x2="140" y2="120" stroke="${K.ok}" stroke-width="3"/>`;
    s += `<text x="112" y="72" font-size="12" fill="${K.ink}">u</text><text x="100" y="135" font-size="12" fill="${K.ink}">v</text>`;
    s += `<path d="M60 150 L160 80 L205 80 L105 150 Z" fill="${K.soft}" opacity="0.5"/>`;
    s += `<text x="96" y="178" fill="${K.sub}" font-size="11">夹角越小投影越大 → 等号在共线</text>`;
    return S(300, 195, s);
  };
  Fig.lprog_region = function () {
    let s = `<text x="16" y="24" fill="${K.sub}" font-size="12">可行域（阴影）+ 目标线</text>`;
    s += `<polygon points="50,160 50,90 150,50 200,90 200,160" fill="${K.soft}" stroke="${K.pri}" stroke-width="1.5"/>`;
    s += `<line x1="60" y1="170" x2="210" y2="40" stroke="${K.warn}" stroke-width="2" stroke-dasharray="5 4"/>`;
    s += `<circle cx="50" cy="160" r="4" fill="${K.red}"/><circle cx="50" cy="90" r="4" fill="${K.red}"/><circle cx="150" cy="50" r="4" fill="${K.red}"/><circle cx="200" cy="90" r="4" fill="${K.red}"/><circle cx="200" cy="160" r="4" fill="${K.red}"/>`;
    s += `<text x="150" y="44" font-size="11" fill="${K.ink}">顶点取最值</text>`;
    s += `<text x="78" y="188" fill="${K.sub}" font-size="11">目标线平移，截距最大处即最优</text>`;
    return S(300, 200, s);
  };
  Fig.matrix_det = function () {
    let s = `<text x="56" y="26" fill="${K.sub}" font-size="12">|a b; c d| = ad − bc</text>`;
    s += `<rect x="80" y="55" width="100" height="90" fill="none" stroke="${K.ink}" stroke-width="2"/>`;
    s += `<text x="98" y="100" font-size="24" fill="${K.pri}">a</text><text x="150" y="100" font-size="24" fill="${K.pri}">b</text>`;
    s += `<text x="98" y="135" font-size="24" fill="${K.ok}">c</text><text x="150" y="135" font-size="24" fill="${K.ok}">d</text>`;
    s += `<line x1="88" y1="63" x2="172" y2="127" stroke="${K.red}" stroke-width="2"/>`;
    s += `<line x1="172" y1="63" x2="88" y2="127" stroke="${K.warn}" stroke-width="2" stroke-dasharray="4 3"/>`;
    s += `<text x="62" y="178" fill="${K.sub}" font-size="11">主对角积 − 副对角积</text>`;
    return S(300, 195, s);
  };
  Fig.lhopital_graph = function () {
    let s = `<text x="20" y="24" fill="${K.sub}" font-size="12">lim sinx/x = 1（x→0）</text>`;
    s += `<line x1="50" y1="150" x2="260" y2="150" stroke="${K.line}"/><line x1="155" y1="30" x2="155" y2="170" stroke="${K.line}"/>`;
    s += `<path d="M60 118 Q155 150 250 118" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<line x1="60" y1="150" x2="250" y2="150" stroke="${K.warn}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    s += `<circle cx="155" cy="150" r="5" fill="${K.red}"/>`;
    s += `<text x="160" y="44" font-size="11" fill="${K.ink}">曲线趋于 1</text>`;
    return S(300, 180, s);
  };
  Fig.mvt_tangent = function () {
    let s = `<text x="20" y="24" fill="${K.sub}" font-size="12">切线 ∥ 弦（中值定理）</text>`;
    s += `<path d="M50 150 Q150 60 260 150" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<line x1="70" y1="135" x2="240" y2="135" stroke="${K.warn}" stroke-width="2"/>`;
    s += `<line x1="120" y1="105" x2="190" y2="105" stroke="${K.ok}" stroke-width="2"/>`;
    s += `<circle cx="95" cy="120" r="4" fill="${K.red}"/><circle cx="215" cy="120" r="4" fill="${K.red}"/>`;
    s += `<text x="78" y="172" font-size="11" fill="${K.ink}">端点连线(弦)</text>`;
    s += `<text x="92" y="186" fill="${K.sub}" font-size="11">中间存在切线与之平行</text>`;
    return S(300, 195, s);
  };
  Fig.bayes_tree = function () {
    let s = `<text x="20" y="24" fill="${K.sub}" font-size="12">贝叶斯：由果溯因（逆概率）</text>`;
    s += `<circle cx="40" cy="100" r="14" fill="${K.soft}" stroke="${K.pri}" stroke-width="1.5"/>`;
    s += `<line x1="54" y1="100" x2="120" y2="70" stroke="${K.line}"/><line x1="54" y1="100" x2="120" y2="130" stroke="${K.line}"/>`;
    s += `<circle cx="135" cy="70" r="13" fill="${K.soft}" stroke="${K.ok}" stroke-width="1.5"/><text x="123" y="74" font-size="11" fill="${K.ink}">因A</text>`;
    s += `<circle cx="135" cy="130" r="13" fill="${K.soft}" stroke="${K.ok}" stroke-width="1.5"/><text x="123" y="134" font-size="11" fill="${K.ink}">因B</text>`;
    s += `<line x1="148" y1="70" x2="220" y2="55" stroke="${K.line}"/><line x1="148" y1="70" x2="220" y2="85" stroke="${K.line}"/>`;
    s += `<line x1="148" y1="130" x2="220" y2="115" stroke="${K.line}"/><line x1="148" y1="130" x2="220" y2="145" stroke="${K.line}"/>`;
    s += `<circle cx="235" cy="55" r="10" fill="${K.soft}" stroke="${K.warn}" stroke-width="1.3"/><circle cx="235" cy="85" r="10" fill="${K.soft}" stroke="${K.warn}" stroke-width="1.3"/>`;
    s += `<circle cx="235" cy="115" r="10" fill="${K.soft}" stroke="${K.warn}" stroke-width="1.3"/><circle cx="235" cy="145" r="10" fill="${K.soft}" stroke="${K.warn}" stroke-width="1.3"/>`;
    s += `<text x="96" y="172" fill="${K.sub}" font-size="11">观测“结果”后，反推各原因概率</text>`;
    return S(300, 185, s);
  };

  Fig.fullprob_tree = function () {
    const W = 300, H = 200;
    let s = `<line x1="40" y1="40" x2="40" y2="170" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<circle cx="40" cy="40" r="5" fill="${K.pri}"/>`;
    s += `<text x="48" y="44" fill="${K.ink}" font-size="12">样本空间</text>`;
    s += `<line x1="40" y1="60" x2="130" y2="110" stroke="${K.sub}" stroke-width="1.2"/>`;
    s += `<line x1="40" y1="60" x2="130" y2="60" stroke="${K.sub}" stroke-width="1.2"/>`;
    s += `<circle cx="130" cy="110" r="4" fill="${K.ok}"/>`;
    s += `<circle cx="130" cy="60" r="4" fill="${K.ok}"/>`;
    s += `<text x="138" y="114" fill="${K.ink}" font-size="12">A₁</text>`;
    s += `<text x="138" y="64" fill="${K.ink}" font-size="12">A₂</text>`;
    s += `<line x1="130" y1="110" x2="220" y2="150" stroke="${K.warn}" stroke-width="1.2"/>`;
    s += `<line x1="130" y1="60" x2="220" y2="150" stroke="${K.warn}" stroke-width="1.2"/>`;
    s += `<circle cx="220" cy="150" r="5" fill="${K.warn}"/>`;
    s += `<text x="228" y="154" fill="${K.ink}" font-size="12">B（汇总 P）</text>`;
    return S(W, H, s);
  };

  Fig.normal_curve = function () {
    const W = 300, H = 180, cx = 150, cy = 150;
    let s = `<line x1="10" y1="${cy}" x2="290" y2="${cy}" stroke="${K.ink}" stroke-width="1.5"/>`;
    for (let i = 0; i < 120; i++) {
      const x = 10 + i * 2.33;
      const t = (x - cx) / 55;
      const y = cy - 120 * Math.exp(-t * t / 2);
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="0.9" fill="${K.pri}"/>`;
    }
    s += `<rect x="${cx-55}" y="20" width="110" height="${cy-20}" fill="${K.soft}" opacity="0.5"/>`;
    s += `<line x1="${cx}" y1="20" x2="${cx}" y2="${cy}" stroke="${K.sub}" stroke-dasharray="3 3"/>`;
    s += `<text x="${cx-30}" y="${cy-6}" fill="${K.pri}" font-size="11">μ</text>`;
    s += `<text x="14" y="14" fill="${K.sub}" font-size="11">μ−σ　μ+σ</text>`;
    return S(W, H, s);
  };

  Fig.definite_area = function () {
    const W = 300, H = 200, cx = 30, cy = 170;
    const X = v => cx + v * 50, Y = v => cy - v * 40;
    let s = `<line x1="${cx}" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<line x1="${cx}" y1="20" x2="${cx}" y2="${cy}" stroke="${K.ink}" stroke-width="1.5"/>`;
    let pts = [];
    for (let i = 0; i <= 4.0001; i += 0.1) pts.push([X(i), Y(i * i / 4)]);
    s += `<polyline points="${pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}" fill="none" stroke="${K.pri}" stroke-width="2"/>`;
    s += `<polygon points="${cx},${cy} ${X(4)},${cy} ${pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}" fill="${K.soft}" opacity="0.6"/>`;
    s += `<text x="${cx+10}" y="30" fill="${K.sub}" font-size="12">∫_a^b f(x)dx = 面积</text>`;
    return S(W, H, s);
  };

  Fig.diffeq_slope = function () {
    const W = 300, H = 200, cx = 30, cy = 170;
    let s = `<line x1="${cx}" y1="20" x2="${cx}" y2="${cy}" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<line x1="${cx}" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.5"/>`;
    for (let gx = 0; gx < 5; gx++) for (let gy = 0; gy < 4; gy++) {
      const px = cx + 30 + gx * 45, py = cy - 30 - gy * 40;
      s += `<line x1="${px-10}" y1="${py-10}" x2="${px+10}" y2="${py+10}" stroke="${K.sub}" stroke-width="1"/>`;
      s += `<circle cx="${px}" cy="${py}" r="1.5" fill="${K.pri}"/>`;
    }
    s += `<path d="M ${cx+30} ${cy-30} Q ${cx+120} ${cy-90} ${cx+220} ${cy-160}" fill="none" stroke="${K.warn}" stroke-width="2.5"/>`;
    s += `<text x="${cx+10}" y="30" fill="${K.sub}" font-size="12">方向场 + 积分曲线</text>`;
    return S(W, H, s);
  };

  Fig.ineq_scale = function () {
    const W = 300, H = 160;
    let s = `<line x1="20" y1="80" x2="280" y2="80" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<rect x="40" y="64" width="200" height="32" rx="6" fill="${K.soft}" stroke="${K.pri}" stroke-width="1.5"/>`;
    s += `<text x="120" y="85" fill="${K.ink}" font-size="13">目标式（难求）</text>`;
    s += `<rect x="20" y="110" width="240" height="30" rx="6" fill="${K.ok}" opacity="0.18" stroke="${K.ok}" stroke-width="1.5"/>`;
    s += `<text x="40" y="130" fill="${K.ok}" font-size="12">放缩到易求和/比较的范围</text>`;
    s += `<text x="150" y="58" fill="${K.sub}" font-size="20" text-anchor="middle">↓ 放缩</text>`;
    return S(W, H, s);
  };

  Fig.seq_ineq = function () {
    const W = 300, H = 180;
    let s = `<line x1="20" y1="150" x2="280" y2="150" stroke="${K.ink}" stroke-width="1.5"/>`;
    const ys = [150, 120, 100, 88, 80, 76, 74, 73];
    for (let i = 0; i < ys.length; i++) {
      const x = 30 + i * 34;
      s += `<circle cx="${x}" cy="${ys[i]}" r="4" fill="${K.pri}"/>`;
      if (i > 0) s += `<line x1="${x-34}" y1="${ys[i-1]}" x2="${x}" y2="${ys[i]}" stroke="${K.sub}" stroke-width="1.2"/>`;
    }
    s += `<line x1="20" y1="60" x2="280" y2="60" stroke="${K.ok}" stroke-dasharray="4 3" stroke-width="1.5"/>`;
    s += `<text x="200" y="55" fill="${K.ok}" font-size="12">上界 M（单调有界）</text>`;
    return S(W, H, s);
  };

  Fig.complex_plane = function () {
    const W = 300, H = 220, cx = 150, cy = 110;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<line x1="${cx}" y1="20" x2="${cx}" y2="200" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<text x="270" y="${cy-6}" fill="${K.sub}" font-size="11">实轴</text>`;
    s += `<text x="${cx+6}" y="30" fill="${K.sub}" font-size="11">虚轴</text>`;
    const px = cx + 60, py = cy - 50;
    s += `<line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="${K.pri}" stroke-width="2"/>`;
    s += `<circle cx="${px}" cy="${py}" r="5" fill="${K.pri}"/>`;
    s += `<text x="${px+6}" y="${py-6}" fill="${K.ink}" font-size="12">z=a+bi</text>`;
    s += `<text x="${cx+4}" y="${cy+14}" fill="${K.sub}" font-size="11">O</text>`;
    return S(W, H, s);
  };

  Fig.series_partial = function () {
    const W = 300, H = 180, cx = 30, cy = 150;
    let s = `<line x1="${cx}" y1="20" x2="${cx}" y2="${cy}" stroke="${K.ink}" stroke-width="1.5"/>`;
    s += `<line x1="${cx}" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.5"/>`;
    const terms = [0.5, 0.75, 0.875, 0.9375, 0.96875, 0.984375];
    let px = cx, py = cy;
    s += `<circle cx="${px}" cy="${py}" r="3" fill="${K.pri}"/>`;
    terms.forEach((t, i) => {
      const nx = cx + 35 + i * 40, ny = cy - t * 120;
      s += `<line x1="${px}" y1="${py}" x2="${nx}" y2="${ny}" stroke="${K.sub}" stroke-width="1.2"/>`;
      s += `<circle cx="${nx}" cy="${ny}" r="3.5" fill="${K.pri}"/>`;
      px = nx; py = ny;
    });
    s += `<line x1="${cx}" y1="${cy-120}" x2="280" y2="${cy-120}" stroke="${K.ok}" stroke-dasharray="4 3" stroke-width="1.5"/>`;
    s += `<text x="190" y="${cy-126}" fill="${K.ok}" font-size="11">极限和 S</text>`;
    return S(W, H, s);
  };

  /* ===================== 第四批拓展配图 ===================== */
  Fig.coord_dist = function () {
    const W = 300, H = 200, cx = 60, cy = 170;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<line x1="${cx}" y1="20" x2="${cx}" y2="190" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<circle cx="90" cy="120" r="4" fill="${K.pri}"/><circle cx="220" cy="60" r="4" fill="${K.pri}"/>`;
    s += `<line x1="90" y1="120" x2="220" y2="60" stroke="${K.ok}" stroke-width="2" stroke-dasharray="4 3"/>`;
    s += `<text x="135" y="92" fill="${K.ok}" font-size="11">d</text>`;
    s += `<text x="80" y="138" fill="${K.sub}" font-size="11">A</text><text x="226" y="55" fill="${K.sub}" font-size="11">B</text>`;
    return S(W, H, s);
  };
  Fig.coord_mid = function () {
    const W = 300, H = 200, cy = 150;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<circle cx="60" cy="${cy}" r="4" fill="${K.pri}"/><circle cx="240" cy="${cy}" r="4" fill="${K.pri}"/>`;
    s += `<circle cx="150" cy="${cy}" r="5" fill="${K.ok}"/>`;
    s += `<line x1="60" y1="${cy}" x2="240" y2="${cy}" stroke="${K.sub}" stroke-width="1.5"/>`;
    s += `<text x="145" y="${cy-10}" fill="${K.ok}" font-size="11">M</text>`;
    return S(W, H, s);
  };
  Fig.coord_slope = function () {
    const W = 300, H = 200;
    let s = `<line x1="20" y1="180" x2="280" y2="180" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<line x1="20" y1="20" x2="280" y2="20" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<line x1="40" y1="160" x2="250" y2="50" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<text x="120" y="105" fill="${K.pri}" font-size="11">k>0 上升</text>`;
    return S(W, H, s);
  };
  Fig.coord_circle = function () {
    const W = 280, H = 220, cx = 140, cy = 110;
    let s = `<line x1="10" y1="${cy}" x2="270" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<line x1="${cx}" y1="15" x2="${cx}" y2="205" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="70" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="4" fill="${K.ok}"/>`;
    s += `<text x="${cx+6}" y="${cy-6}" fill="${K.ok}" font-size="11">圆心</text>`;
    return S(W, H, s);
  };
  Fig.jensen_conv = function () {
    const W = 300, H = 200, cy = 180;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    let d = "M 30 170 Q 150 20 270 170";
    s += `<path d="${d}" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<line x1="30" y1="170" x2="270" y2="170" stroke="${K.sub}" stroke-width="1.5"/>`;
    s += `<text x="110" y="70" fill="${K.ok}" font-size="11">下凸（弦在上）</text>`;
    return S(W, H, s);
  };
  Fig.jensen_ineq = function () {
    const W = 300, H = 200, cy = 180;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<path d="M 40 160 Q 150 60 260 160" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<line x1="40" y1="160" x2="260" y2="160" stroke="${K.sub}" stroke-width="1.5"/>`;
    s += `<line x1="150" y1="160" x2="150" y2="118" stroke="${K.ok}" stroke-width="2" stroke-dasharray="4 3"/>`;
    s += `<text x="155" y="112" fill="${K.ok}" font-size="11">f中点≤均值</text>`;
    return S(W, H, s);
  };
  Fig.jensen_means = function () {
    const W = 300, H = 180;
    const rows = [["Q", 40, 240], ["A", 60, 220], ["G", 85, 195], ["H", 110, 170]];
    let s = "";
    rows.forEach((r, i) => {
      const y = 30 + i * 35;
      s += `<line x1="${r[1]}" y1="${y}" x2="${r[2]}" y2="${y}" stroke="${K.pri}" stroke-width="6" stroke-linecap="round"/>`;
      s += `<text x="10" y="${y+4}" fill="${K.sub}" font-size="11">${r[0]}</text>`;
    });
    return S(W, H, s);
  };
  Fig.lim_sinx = function () {
    const W = 300, H = 200, cx = 150, cy = 150;
    let s = `<line x1="10" y1="${cy}" x2="290" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<line x1="${cx}" y1="20" x2="${cx}" y2="190" stroke="${K.ink}" stroke-width="1.2"/>`;
    let pts = [];
    for (let i = 0; i <= 60; i++) { const x = -2.6 + i * 0.087; const px = cx + x * 50; const py = cy - 50 * Math.sin(x) / x; pts.push(px.toFixed(1) + "," + py.toFixed(1)); }
    s += `<polyline points="${pts.join(" ")}" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<line x1="10" y1="${cy-50}" x2="290" y2="${cy-50}" stroke="${K.ok}" stroke-dasharray="4 3"/>`;
    s += `<text x="210" y="${cy-56}" fill="${K.ok}" font-size="11">极限 1</text>`;
    return S(W, H, s);
  };
  Fig.lim_exp = function () {
    const W = 300, H = 200, cx = 150, cy = 150;
    let s = `<line x1="10" y1="${cy}" x2="290" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<line x1="${cx}" y1="20" x2="${cx}" y2="190" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<line x1="10" y1="${cy-110}" x2="290" y2="${cy-110}" stroke="${K.ok}" stroke-dasharray="4 3"/>`;
    s += `<text x="200" y="${cy-116}" fill="${K.ok}" font-size="11">e ≈ 2.718</text>`;
    s += `<path d="M 20 170 Q 150 15 280 40" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    return S(W, H, s);
  };
  Fig.demoivre_pow = function () {
    const W = 240, H = 240, cx = 120, cy = 120;
    let s = `<line x1="10" y1="${cy}" x2="230" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<line x1="${cx}" y1="10" x2="${cx}" y2="230" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="80" fill="none" stroke="${K.sub}" stroke-width="1.2"/>`;
    s += `<line x1="${cx}" y1="${cy}" x2="${cx+69}" y2="${cy-40}" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<text x="${cx+40}" y="${cy-30}" fill="${K.pri}" font-size="11">θ→nθ</text>`;
    return S(W, H, s);
  };
  Fig.demoivre_root = function () {
    const W = 240, H = 240, cx = 120, cy = 120, R = 80;
    let s = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${K.sub}" stroke-width="1.2"/>`;
    for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2; const x = cx + R * Math.cos(a), y = cy - R * Math.sin(a); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${K.pri}"/>`; }
    s += `<line x1="10" y1="${cy}" x2="230" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    return S(W, H, s);
  };
  Fig.demoivre_unit = function () {
    const W = 240, H = 240, cx = 120, cy = 120, R = 80;
    let s = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    for (let k = 0; k < 5; k++) { const a = k * 2 * Math.PI / 5; const x = cx + R * Math.cos(a), y = cy - R * Math.sin(a); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${K.ok}"/>`; }
    return S(W, H, s);
  };
  Fig.rv_linear = function () {
    const W = 300, H = 160, cy = 90;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<circle cx="100" cy="${cy}" r="5" fill="${K.sub}"/><text x="86" y="${cy+18}" fill="${K.sub}" font-size="11">E(X)</text>`;
    s += `<circle cx="190" cy="${cy}" r="6" fill="${K.pri}"/><text x="178" y="${cy-14}" fill="${K.pri}" font-size="11">aE(X)+b</text>`;
    s += `<line x1="100" y1="${cy}" x2="190" y2="${cy}" stroke="${K.ok}" stroke-dasharray="4 3"/>`;
    return S(W, H, s);
  };
  Fig.rv_bernoulli = function () {
    const W = 280, H = 200, cy = 170;
    let s = `<line x1="20" y1="${cy}" x2="260" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<rect x="80" y="60" width="40" height="110" fill="${K.pri}"/><text x="78" y="188" fill="${K.sub}" font-size="11">X=1 (p)</text>`;
    s += `<rect x="160" y="120" width="40" height="50" fill="${K.sub}"/><text x="158" y="188" fill="${K.sub}" font-size="11">X=0</text>`;
    return S(W, H, s);
  };
  Fig.rv_binom = function () {
    const W = 300, H = 200, cy = 180;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    const hs = [40, 90, 120, 90, 40];
    hs.forEach((h, i) => { s += `<rect x="${40 + i * 42}" y="${cy - h}" width="26" height="${h}" fill="${K.pri}" opacity="0.85"/>`; });
    return S(W, H, s);
  };
  Fig.fourier_series = function () {
    const W = 300, H = 200, cy = 100;
    let s = `<line x1="10" y1="${cy}" x2="290" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    let pts = [];
    for (let i = 0; i <= 120; i++) { const x = -3 + i * 0.05; const y = Math.sin(x) + 0.4 * Math.sin(3 * x); pts.push((10 + (x + 3) * 47).toFixed(1) + "," + (cy - 40 * y).toFixed(1)); }
    s += `<polyline points="${pts.join(" ")}" fill="none" stroke="${K.pri}" stroke-width="2"/>`;
    return S(W, H, s);
  };
  Fig.fourier_odd = function () {
    const W = 300, H = 200, cy = 100;
    let s = `<line x1="10" y1="${cy}" x2="290" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    let pts = [];
    for (let i = 0; i <= 120; i++) { const x = -3 + i * 0.05; pts.push((10 + (x + 3) * 47).toFixed(1) + "," + (cy - 50 * Math.sin(x)).toFixed(1)); }
    s += `<polyline points="${pts.join(" ")}" fill="none" stroke="${K.pri}" stroke-width="2"/>`;
    return S(W, H, s);
  };
  Fig.fourier_even = function () {
    const W = 300, H = 200, cy = 100;
    let s = `<line x1="10" y1="${cy}" x2="290" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    let pts = [];
    for (let i = 0; i <= 120; i++) { const x = -3 + i * 0.05; pts.push((10 + (x + 3) * 47).toFixed(1) + "," + (cy - 50 * Math.cos(x)).toFixed(1)); }
    s += `<polyline points="${pts.join(" ")}" fill="none" stroke="${K.pri}" stroke-width="2"/>`;
    return S(W, H, s);
  };
  Fig.int_area = function () {
    const W = 300, H = 200, cy = 170;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<path d="M 50 ${cy} L 50 90 Q 150 40 250 ${cy} Z" fill="${K.pri}" opacity="0.3"/>`;
    s += `<path d="M 50 90 Q 150 40 250 ${cy}" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<text x="120" y="120" fill="${K.ok}" font-size="11">面积 S</text>`;
    return S(W, H, s);
  };
  Fig.int_volume = function () {
    const W = 260, H = 220, cy = 200;
    let s = `<path d="M 70 ${cy} Q 70 50 130 50 Q 190 50 190 ${cy} Z" fill="${K.pri}" opacity="0.3" stroke="${K.pri}" stroke-width="2"/>`;
    s += `<ellipse cx="130" cy="50" rx="60" ry="12" fill="none" stroke="${K.sub}" stroke-width="1.2"/>`;
    s += `<text x="100" y="120" fill="${K.ok}" font-size="11">V=π∫f²</text>`;
    return S(W, H, s);
  };
  Fig.int_avg = function () {
    const W = 300, H = 200, cy = 150;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<path d="M 50 ${cy} Q 150 40 250 ${cy}" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<line x1="40" y1="${cy-30}" x2="260" y2="${cy-30}" stroke="${K.ok}" stroke-dasharray="4 3"/>`;
    s += `<text x="190" y="${cy-36}" fill="${K.ok}" font-size="11">平均值</text>`;
    return S(W, H, s);
  };
  Fig.int_arc = function () {
    const W = 300, H = 200, cy = 170;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<path d="M 50 ${cy} Q 150 30 250 ${cy}" fill="none" stroke="${K.pri}" stroke-width="3"/>`;
    s += `<text x="120" y="90" fill="${K.ok}" font-size="11">弧长 L</text>`;
    return S(W, H, s);
  };
  Fig.gtrans_shift = function () {
    const W = 300, H = 200, cy = 150;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<path d="M 30 130 Q 120 50 210 130" fill="none" stroke="${K.sub}" stroke-width="2"/>`;
    s += `<path d="M 90 130 Q 180 50 270 130" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<text x="150" y="60" fill="${K.pri}" font-size="11">右移 a</text>`;
    return S(W, H, s);
  };
  Fig.gtrans_sym = function () {
    const W = 300, H = 200, cy = 150;
    let s = `<line x1="150" y1="20" x2="150" y2="190" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<path d="M 150 60 Q 220 100 150 160" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<path d="M 150 60 Q 80 100 150 160" fill="none" stroke="${K.sub}" stroke-width="2"/>`;
    s += `<text x="155" y="40" fill="${K.pri}" font-size="11">f(x) 与 f(−x) 对称 y 轴</text>`;
    return S(W, H, s);
  };
  Fig.gtrans_scale = function () {
    const W = 300, H = 200, cy = 160;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<path d="M 40 150 Q 120 90 200 60" fill="none" stroke="${K.sub}" stroke-width="2"/>`;
    s += `<path d="M 40 150 Q 120 50 200 10" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<text x="120" y="100" fill="${K.pri}" font-size="11">纵向拉伸</text>`;
    return S(W, H, s);
  };
  Fig.gtrans_abs = function () {
    const W = 300, H = 200, cy = 130;
    let s = `<line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<path d="M 40 ${cy} Q 110 200 180 ${cy} Q 250 40 270 ${cy}" fill="none" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<path d="M 110 200 L 110 ${cy}" stroke="${K.ok}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
    s += `<text x="90" y="180" fill="${K.ok}" font-size="11">翻折向上</text>`;
    return S(W, H, s);
  };

  /* ---------------- 极坐标网格 ---------------- */
  Fig.polar_grid = function (p) {
    p = p || {};
    const W = 240, H = 240, cx = 120, cy = 120, R = 100;
    let s = `<line x1="20" y1="${cy}" x2="220" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<line x1="${cx}" y1="20" x2="${cx}" y2="220" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${K.line}" stroke-width="1"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${R/2}" fill="none" stroke="${K.line}" stroke-width="1"/>`;
    const th = Math.PI/6, rr = R*0.8;
    const px = cx + rr*Math.cos(th), py = cy - rr*Math.sin(th);
    s += `<line x1="${cx}" y1="${cy}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" stroke="${K.pri}" stroke-width="2"/>`;
    s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" fill="${K.pri}"/>`;
    s += `<text x="${(px+4).toFixed(1)}" y="${(py-4).toFixed(1)}" font-size="11" fill="${K.pri}" font-family="inherit">P(ρ,θ)</text>`;
    s += `<path d="M ${(cx+30).toFixed(1)} ${cy} A 30 30 0 0 0 ${(cx+30*Math.cos(th)).toFixed(1)} ${(cy-30*Math.sin(th)).toFixed(1)}" fill="none" stroke="${K.warn}" stroke-width="1.5"/>`;
    s += `<text x="${(cx+34).toFixed(1)}" y="${cy-10}" font-size="10" fill="${K.warn}" font-family="inherit">θ</text>`;
    return S(W, H, s, 240);
  };

  /* ---------------- 参数曲线（椭圆） ---------------- */
  Fig.param_curve = function (p) {
    p = p || {};
    const W = 240, H = 200, cx = 120, cy = 100;
    let s = `<line x1="10" y1="${cy}" x2="230" y2="${cy}" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<line x1="${cx}" y1="10" x2="${cx}" y2="190" stroke="${K.ink}" stroke-width="1.2"/>`;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="90" ry="55" fill="none" stroke="${K.pri}" stroke-width="2"/>`;
    s += `<circle cx="${cx+90}" cy="${cy}" r="3.5" fill="${K.warn}"/>`;
    s += `<text x="${cx+30}" y="${cy-30}" font-size="11" fill="${K.pri}" font-family="inherit">x = a cosθ</text>`;
    s += `<text x="${cx+30}" y="${cy+44}" font-size="11" fill="${K.pri}" font-family="inherit">y = b sinθ</text>`;
    return S(W, H, s, 240);
  };

  /* ---------------- 向量法解立体几何（立方体） ---------------- */
  Fig.vector_solid_adv = function (p) {
    p = p || {};
    const W = 240, H = 220;
    const a = 40, b = 50, c = 150, d = 160, dx = 42, dy = -32;
    const front = [[a,b],[c,b],[c,d],[a,d]];
    const back = front.map(pt => [pt[0]+dx, pt[1]+dy]);
    const poly = pts => `<polygon points="${pts.map(pt => pt[0]+","+pt[1]).join(" ")}" fill="${K.fill}" stroke="${K.ink}" stroke-width="1.2"/>`;
    let s = poly(front) + poly(back);
    for (let i = 0; i < 4; i++) {
      s += `<line x1="${front[i][0]}" y1="${front[i][1]}" x2="${back[i][0]}" y2="${back[i][1]}" stroke="${K.ink}" stroke-width="1.2"/>`;
    }
    const x1 = a, y1 = d, x2 = back[2][0], y2 = back[2][1];
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${K.pri}" stroke-width="2.5"/>`;
    s += `<circle cx="${x1}" cy="${y1}" r="3.5" fill="${K.pri}"/>`;
    s += `<circle cx="${x2}" cy="${y2}" r="3.5" fill="${K.warn}"/>`;
    s += `<text x="${x2-22}" y="${y2-6}" font-size="11" fill="${K.pri}" font-family="inherit">向量</text>`;
    return S(W, H, s, 240);
  };

  window.Fig = Fig;
})();
