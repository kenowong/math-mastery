/* ============================================================
 * 融会贯通 · 高中数学方法参数化出题引擎
 * 覆盖：集合、函数、指数对数、三角函数、数列、向量、
 *       立体几何、导数、圆锥曲线、参数方程、概率统计、复数
 * ============================================================ */
(function () {
  const K = { ink: "#334155", sub: "#64748b", line: "#cbd5e1", pri: "#2f6fed", ok: "#16a34a", warn: "#d97706", red: "#dc2626", soft: "#eef3ff", blue: "#2563eb" };
  function S(w, h, inner) { return `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;height:auto;display:block" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`; }
  function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[rnd(0, a.length - 1)]; }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function opts(ans, make1, make2, make3) {
    const arr = [String(ans), String(make1()), String(make2()), String(make3())];
    const unique = [...new Set(arr)];
    while (unique.length < 4) { unique.push(String(ans + unique.length)); }
    return { opts: unique.map(String), ans: unique.indexOf(String(ans)) };
  }

  function Q(q, optsObj, level, explain, point, fig) {
    return Object.assign({ q, level: level || "基础", explain, point: point || "" }, optsObj, { fig: fig || null });
  }

  /* ============================================================
   * 1. 集合与逻辑（十年级）
   * ============================================================ */
  function qSet(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const a = rnd(3, 12);
        o = opts(a + "个", () => (a + 1) + "个", () => (a - 1) + "个", () => "0个");
        q = `集合 A 有 ${a} 个元素且 A⊆B，则 A∩B 的元素个数是？`;
        exp = `A⊆B 时 A∩B = A，故为 ${a} 个。`;
      } else if (type === 1) {
        const nn = rnd(2, 8);
        const c = Math.pow(2, nn);
        o = opts(c + "个", () => (c + nn), () => (c - 1) + "个", () => nn + "个");
        q = `含有 ${nn} 个元素的集合，其子集共有？`;
        exp = `n 元集合子集个数为 2ⁿ = 2^${nn} = ${c} 个。`;
      } else if (type === 2) {
        const nn = rnd(2, 8);
        o = opts((Math.pow(2, nn) - 1) + "个", () => Math.pow(2, nn) + "个", () => (nn - 1) + "个", () => nn + "个");
        q = `含有 ${nn} 个元素的集合，其真子集共有？`;
        exp = `真子集个数 = 2ⁿ − 1 = ${Math.pow(2, nn) - 1} 个。`;
      } else if (type === 3) {
        const a = rnd(3, 10), b = rnd(3, 10);
        o = opts((a + b) + "个", () => (a + b - 1) + "个", () => a + "个", () => b + "个");
        q = `集合 A 有 ${a} 个元素，B 有 ${b} 个元素，且 A∩B=∅，则 A∪B 有？`;
        exp = `不相交时 |A∪B| = |A| + |B| = ${a} + ${b} = ${a + b} 个。`;
      } else if (type === 4) {
        const u = rnd(8, 16), a = rnd(2, u - 2);
        o = opts((u - a) + "个", () => a + "个", () => u + "个", () => (u - a - 1) + "个");
        q = `全集 U 有 ${u} 个元素，A⊆U 且 |A|=${a}，则补集 ∁_U A 有？`;
        exp = `补集元素个数 = |U| − |A| = ${u} − ${a} = ${u - a} 个。`;
      } else if (type === 5) {
        const a = rnd(2, 9), b = rnd(1, a - 1);
        o = opts("充分不必要", () => "必要不充分", () => "充要", () => "既不充分也不必要");
        q = `"x > ${a}" 是 "x > ${b}" 的什么条件？`;
        exp = `x>${a} ⇒ x>${b}（充分），但 x>${b} ⇏ x>${a}（不必要），故充分不必要。`;
      } else if (type === 6) {
        const p = rnd(2, 6);
        o = opts(`∀x∈R, x² ≥ ${p}`, () => `∃x∈R, x² ≥ ${p}`, () => `∀x∈R, x² < ${p}`, () => `∃x∈R, x² ≤ ${p}`);
        q = `命题 "∃x∈R, x² < ${p}" 的否定是？`;
        exp = `存在命题的否定是全称命题：∀x∈R, x² ≥ ${p}。`;
      } else if (type === 7) {
        const a = rnd(4, 10), b = rnd(3, 9), c = rnd(1, Math.min(a, b));
        o = opts((a + b - c) + "个", () => (a + b) + "个", () => c + "个", () => (a + b - 2 * c) + "个");
        q = `集合 A 有 ${a} 个、B 有 ${b} 个元素，A∩B 有 ${c} 个，则 A∪B 有？`;
        exp = `容斥：|A∪B| = ${a} + ${b} − ${c} = ${a + b - c} 个。`;
      } else if (type === 8) {
        const nn = rnd(2, 7);
        o = opts(Math.pow(2, nn) + "个", () => Math.pow(2, nn + 1) + "个", () => (nn * 2) + "个", () => (Math.pow(2, nn) - 1) + "个");
        q = `含 ${nn} 个元素的集合，其幂集 P(A) 的元素个数是？`;
        exp = `幂集元素个数 = 2ⁿ = ${Math.pow(2, nn)} 个。`;
      } else {
        const a = rnd(3, 10), b = rnd(3, 10);
        o = opts(Math.min(a, b) + "个", () => Math.max(a, b) + "个", () => (a + b) + "个", () => "0个");
        q = `集合 A 有 ${a} 个、B 有 ${b} 个元素，A∩B 的元素个数最多为？`;
        exp = `交集不超过较小集合，|A∩B| ≤ min(${a},${b}) = ${Math.min(a, b)} 个。`;
      }
      results.push(Q(q, o, "基础", exp, "集合与逻辑"));
    }
    return results;
  }

  /* ============================================================
   * 2. 函数概念与性质（十年级）
   * ============================================================ */
  function qFuncConcept(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const a = rnd(1, 12);
        o = opts(`x ≠ ${a}`, () => `x ≠ ${a + 1}`, () => `x ≥ ${a}`, () => `全体实数`);
        q = `函数 f(x) = 1/(x − ${a}) 的定义域是？`;
        exp = `分母不为 0，x − ${a} ≠ 0，即 x ≠ ${a}。`;
      } else if (type === 1) {
        const k = rnd(1, 12);
        o = opts(`y ≥ ${k}`, () => `y ≤ ${k}`, () => `y > ${k}`, () => `全体实数`);
        q = `函数 f(x) = (x − 1)² + ${k} 的值域是？`;
        exp = `平方项 ≥ 0，故 f(x) ≥ ${k}，值域为 y ≥ ${k}。`;
      } else if (type === 2) {
        const e = 2 * rnd(1, 12) + 1;
        o = opts("奇函数", () => "偶函数", () => "既奇又偶", () => "非奇非偶");
        q = `函数 f(x) = x^${e} 是？`;
        exp = `f(−x) = (−x)^${e} = −x^${e} = −f(x)（指数为奇数），为奇函数。`;
      } else if (type === 3) {
        const a = rnd(1, 15);
        o = opts("在 R 上递增", () => "在 R 上递减", () => "先减后增", () => "先增后减");
        q = `函数 f(x) = ${a}x + 1 (a > 0) 的单调性是？`;
        exp = `一次函数斜率 a = ${a} > 0，在 R 上单调递增。`;
      } else if (type === 4) {
        const a = rnd(1, 15);
        o = opts(`x ≥ ${a}`, () => `x > ${a}`, () => `x ≤ ${a}`, () => `x ≠ ${a}`);
        q = `函数 f(x) = √(x − ${a}) 的定义域是？`;
        exp = `根号内非负：x − ${a} ≥ 0，即 x ≥ ${a}。`;
      } else if (type === 5) {
        const b = rnd(1, 15);
        o = opts(`x > ${b}`, () => `x ≥ ${b}`, () => `x < ${b}`, () => `全体实数`);
        q = `函数 f(x) = log_2(x − ${b}) 的定义域是？`;
        exp = `真数 x − ${b} > 0 ⇒ x > ${b}。`;
      } else if (type === 6) {
        const e = 2 * rnd(1, 12);
        o = opts("偶函数", () => "奇函数", () => "既奇又偶", () => "非奇非偶");
        q = `函数 f(x) = x^${e} 是？`;
        exp = `f(−x) = (−x)^${e} = x^${e} = f(x)（指数为偶数），为偶函数。`;
      } else if (type === 7) {
        const e = rnd(1, 15);
        o = opts(`2π/${e}`, () => `π/${e}`, () => `π`, () => `2π`);
        q = `函数 f(x) = sin(${e}x) 的最小正周期是？`;
        exp = `正弦最小正周期 T = 2π/|ω| = 2π/${e}。`;
      } else if (type === 8) {
        const a = rnd(2, 6);
        o = opts(`y > 0`, () => `y ≥ 0`, () => `y > 1`, () => `全体实数`);
        q = `指数函数 f(x) = ${a}^x (a > 0, a ≠ 1) 的值域是？`;
        exp = `a^x 恒正，值域为 y > 0。`;
      } else {
        const a = rnd(1, 5), b = rnd(1, 5);
        o = opts(`f⁻¹(x) = (x − ${b})/${a}`, () => `(x + ${b})/${a}`, () => `${a}x + ${b}`, () => `(x − ${b})/${a} × ${a}`);
        q = `函数 f(x) = ${a}x + ${b} 的反函数是？`;
        exp = `令 y = ${a}x + ${b}，解 x = (y − ${b})/${a}，故 f⁻¹(x) = (x − ${b})/${a}。`;
      }
      results.push(Q(q, o, "基础", exp, "函数概念与性质"));
    }
    return results;
  }

  /* ============================================================
   * 3. 指数与对数（十年级）
   * ============================================================ */
  function qExpLog(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const a = rnd(2, 5), m = rnd(1, 6);
        o = opts(`a^${2 * m}`, () => `a^${2 * m + 1}`, () => `a^${m}`, () => `${a * m}`);
        q = `a^${m} · a^${m} = ？`;
        exp = `同底数幂相乘指数相加：a^${m}·a^${m} = a^${2 * m}。`;
      } else if (type === 1) {
        const base = rnd(2, 5), ans = rnd(2, 6);
        const val = Math.pow(base, ans);
        o = opts(ans, () => ans + 1, () => ans - 1, () => base);
        q = `log_${base}(${val}) = ？`;
        exp = `由定义 ${base}^${ans} = ${val}，故 log_${base}(${val}) = ${ans}。`;
      } else if (type === 2) {
        const base = rnd(2, 5), ans = rnd(2, 6);
        const val = Math.pow(base, ans);
        o = opts(val, () => val + 1, () => val - 1, () => ans);
        q = `解方程 log_${base}(x) = ${ans}，则 x = ？`;
        exp = `x = ${base}^${ans} = ${val}。`;
      } else if (type === 3) {
        const base = rnd(2, 4), ans = rnd(1, 5);
        const val = Math.pow(base, ans);
        o = opts(ans, () => ans + 1, () => ans - 1, () => val);
        q = `解方程 ${base}^x = ${val}，则 x = ？`;
        exp = `x = log_${base}(${val}) = ${ans}。`;
      } else if (type === 4) {
        const a = rnd(2, 5), m = rnd(3, 7), nn = rnd(1, m - 1);
        o = opts(`a^${m - nn}`, () => `a^${m + nn}`, () => `a^${m}`, () => `a^${nn}`);
        q = `a^${m} ÷ a^${nn} = ？`;
        exp = `同底数幂相除指数相减：a^${m} ÷ a^${nn} = a^${m - nn}。`;
      } else if (type === 5) {
        const a = rnd(2, 4), m = rnd(2, 5), nn = rnd(2, 4);
        o = opts(`a^${m * nn}`, () => `a^${m + nn}`, () => `a^${m}^${nn}`, () => `${a}^${m}`);
        q = `(a^${m})^${nn} = ？`;
        exp = `幂的乘方指数相乘：(a^${m})^${nn} = a^${m * nn}。`;
      } else if (type === 6) {
        const a = rnd(2, 5), x = rnd(2, 9), y = rnd(1, 8);
        o = opts(`log_${a}(${x}) + log_${a}(${y})`, () => `log_${a}(${x}) − log_${a}(${y})`, () => `log_${a}(${x * y})`, () => `log_${a}(${x})·log_${a}(${y})`);
        q = `对数运算：log_${a}(${x}·${y}) = ？`;
        exp = `积的对数 = log_${a}(${x}) + log_${a}(${y})（真数 ${x}·${y} = ${x * y}）。`;
      } else if (type === 7) {
        const a = rnd(2, 5), b = rnd(3, 9);
        o = opts(`(1/2)log_${a}(${b})`, () => `2log_${a}(${b})`, () => `log_${a}(${b})÷2`, () => `log_2(${b})`);
        q = `log_${a * a}(${b}) = ？`;
        exp = `换底/幂的换元：log_{a²}(${b}) = (1/2)log_${a}(${b})。`;
      } else if (type === 8) {
        const a = rnd(2, 4), b = rnd(2, 9);
        o = opts(`x > ${b}`, () => `x ≥ ${b}`, () => `x < ${b}`, () => `x > 0`);
        q = `若底数 a > 1，则 a^x > a^${b} 的解集是？`;
        exp = `a>1 时指数函数递增，a^x > a^${b} ⇔ x > ${b}。`;
      } else {
        const a = rnd(2, 4), k = rnd(2, 6);
        o = opts(k, () => k + 1, () => k - 1, () => a);
        q = `log_${a}(${Math.pow(a, k)}) = ？`;
        exp = `log_a(a^k) = k = ${k}（对数恒等式）。`;
      }
      results.push(Q(q, o, "基础", exp, "指数与对数"));
    }
    return results;
  }

  /* ============================================================
   * 4. 三角函数（十一年级）
   * ============================================================ */
  function qTrig(n) {
    const results = [];
    const ANG = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
    const sinV = { 0: "0", 30: "1/2", 45: "√2/2", 60: "√3/2", 90: "1", 120: "√3/2", 135: "√2/2", 150: "1/2", 180: "0", 210: "−1/2", 225: "−√2/2", 240: "−√3/2", 270: "−1", 300: "−√3/2", 315: "−√2/2", 330: "−1/2", 360: "0" };
    const cosV = { 0: "1", 30: "√3/2", 45: "√2/2", 60: "1/2", 90: "0", 120: "−1/2", 135: "−√2/2", 150: "−√3/2", 180: "−1", 210: "−√3/2", 225: "−√2/2", 240: "−1/2", 270: "0", 300: "1/2", 315: "√2/2", 330: "√3/2", 360: "1" };
    const tanV = { 0: "0", 30: "√3/3", 45: "1", 60: "√3", 90: "不存在", 120: "−√3", 135: "−1", 150: "−√3/3", 180: "0", 210: "√3/3", 225: "1", 240: "√3", 270: "不存在", 300: "−√3", 315: "−1", 330: "−√3/3", 360: "0" };
    const norm = a => ((a % 360) + 360) % 360;
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const ang = pick(ANG);
        o = opts(sinV[ang], () => cosV[ang], () => "0", () => "1");
        q = `sin ${ang}° = ？`;
        exp = `sin ${ang}° = ${sinV[ang]}。`;
      } else if (type === 1) {
        const ang = pick(ANG);
        o = opts(cosV[ang], () => sinV[ang], () => "0", () => "1");
        q = `cos ${ang}° = ？`;
        exp = `cos ${ang}° = ${cosV[ang]}。`;
      } else if (type === 2) {
        const ang = pick(ANG);
        o = opts("sin²α + cos²α = 1", () => "sin²α − cos²α = 1", () => "sinα + cosα = 1", () => "tanα = sinα/cosα");
        q = `对任意角 α = ${ang}°，恒成立的三角等式是？`;
        exp = `基本三角恒等式：sin²α + cos²α = 1（对 ${ang}° 也成立）。`;
      } else if (type === 3) {
        const ang = pick(ANG);
        o = opts(sinV[ang], () => cosV[ang], () => "−" + sinV[ang], () => "1");
        q = `sin(180° − ${ang}°) = ？`;
        exp = `诱导公式：sin(180°−α) = sinα，故 sin(180°−${ang}°) = ${sinV[ang]}。`;
      } else if (type === 4) {
        const ang = pick(ANG);
        const s2 = sinV[norm(2 * ang)];
        o = opts(s2, () => "1", () => "√3/2", () => "−1/2");
        q = `sin(2·${ang}°) = ？`;
        exp = `倍角公式 sin2α = 2sinαcosα；sin ${2 * ang}° = ${s2}。`;
      } else if (type === 5) {
        const ang = pick(ANG);
        const c2 = cosV[norm(2 * ang)];
        o = opts(c2, () => "−1/2", () => "1/2", () => "0");
        q = `cos(2·${ang}°) = ？`;
        exp = `倍角公式 cos2α = cos²α − sin²α；cos ${2 * ang}° = ${c2}。`;
      } else if (type === 6) {
        const ang = pick(ANG);
        o = opts(tanV[ang], () => "√3", () => "1/√3", () => "0");
        q = `tan ${ang}° = ？`;
        exp = `tanα = sinα/cosα；tan ${ang}° = ${tanV[ang]}。`;
      } else if (type === 7) {
        const ang = pick(ANG);
        o = opts(sinV[ang], () => cosV[ang], () => "−" + sinV[ang], () => "0");
        q = `cos(90° − ${ang}°) = ？`;
        exp = `诱导公式 cos(90°−α) = sinα，故 cos(90°−${ang}°) = ${sinV[ang]}。`;
      } else if (type === 8) {
        const w = rnd(1, 9);
        o = opts(`2π/${w}`, () => `π/${w}`, () => `2π`, () => `π`);
        q = `函数 y = sin(${w}x) 的最小正周期是？`;
        exp = `T = 2π/|ω| = 2π/${w}。`;
      } else {
        const ang = pick(ANG);
        o = opts(tanV[ang], () => "1", () => "√3", () => "0");
        q = `tan ${ang}° 的值是？`;
        exp = `tan ${ang}° = ${tanV[ang]}。`;
      }
      results.push(Q(q, o, "基础", exp, "三角函数"));
    }
    return results;
  }

  /* ============================================================
   * 5. 三角恒等变换（十一年级）
   * ============================================================ */
  function qTrigId(n) {
    const results = [];
    const trips = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [7, 24, 25], [8, 15, 17], [9, 12, 15], [9, 40, 41], [12, 16, 20], [12, 35, 37], [15, 20, 25], [10, 24, 26]];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const [a, r, qv] = pick(trips);
        const v = 2 * a * r / (qv * qv);
        o = opts(v.toFixed(3), () => (a * r / (qv * qv)).toFixed(3), () => (2 * a * a / (qv * qv)).toFixed(3), () => (2 * r * r / (qv * qv)).toFixed(3));
        q = `已知 sinα=${a}/${qv}, cosα=${r}/${qv}，则 sin2α = ？`;
        exp = `sin2α = 2sinαcosα = 2·(${a}/${qv})·(${r}/${qv}) = ${2 * a * r}/${qv * qv} ≈ ${v.toFixed(3)}。`;
      } else if (type === 1) {
        const [a, r, qv] = pick(trips);
        const v = (r * r - a * a) / (qv * qv);
        o = opts(v.toFixed(3), () => ((a * a - r * r) / (qv * qv)).toFixed(3), () => (2 * r * r / (qv * qv) - 1).toFixed(3), () => (1 - 2 * a * a / (qv * qv)).toFixed(3));
        q = `已知 sinα=${a}/${qv}, cosα=${r}/${qv}，则 cos2α = ？`;
        exp = `cos2α = cos²α − sin²α = (${r * r}−${a * a})/${qv * qv} = ${v.toFixed(3)}。`;
      } else if (type === 2) {
        const p = rnd(1, 5), q2 = rnd(p + 1, p + 5);
        const v = (2 * p / q2) / (1 + (p / q2) * (p / q2));
        o = opts(v.toFixed(3), () => (p / q2).toFixed(3), () => ((p / q2) * (p / q2)).toFixed(3), () => "1");
        q = `已知 tanα = ${p}/${q2}，则 sin2α = 2tanα/(1+tan²α) 的值约为？`;
        exp = `sin2α = 2·(${p}/${q2})/(1+(${p}/${q2})²) ≈ ${v.toFixed(3)}。`;
      } else if (type === 3) {
        const [a, r, qv] = pick(trips);
        const v = (1 - r / qv) / 2;
        o = opts("±" + Math.sqrt(v).toFixed(3), () => Math.sqrt((1 + r / qv) / 2).toFixed(3), () => (1 - r / qv).toFixed(3), () => (r / qv).toFixed(3));
        q = `已知 cosα = ${r}/${qv} (>0)，则 sin(α/2) = ±√((1−cosα)/2) 的值约为？`;
        exp = `sin(α/2) = ±√((1−${r}/${qv})/2) = ±√${v.toFixed(3)}。`;
      } else if (type === 4) {
        const [a, r, qv] = pick(trips);
        const v = a * r / (qv * qv);
        o = opts(v.toFixed(3), () => (a * a / (qv * qv)).toFixed(3), () => (r * r / (qv * qv)).toFixed(3), () => (2 * a * r / (qv * qv)).toFixed(3));
        q = `已知 sinα=${a}/${qv}, cosα=${r}/${qv}，则 sinα·cosα = ？`;
        exp = `sinαcosα = (${a}/${qv})·(${r}/${qv}) = ${a * r}/${qv * qv} ≈ ${v.toFixed(3)}。`;
      } else if (type === 5) {
        const p = rnd(1, 4), q2 = rnd(p + 1, p + 4);
        const v = (2 * p / q2) / (1 - (p / q2) * (p / q2));
        o = opts(v.toFixed(3), () => (p / q2).toFixed(3), () => ((p / q2) * (p / q2)).toFixed(3), () => "1");
        q = `已知 tanα = ${p}/${q2}，则 tan2α = 2tanα/(1−tan²α) 的值约为？`;
        exp = `tan2α = 2·(${p}/${q2})/(1−(${p}/${q2})²) ≈ ${v.toFixed(3)}。`;
      } else if (type === 6) {
        const [a, r, qv] = pick(trips);
        const v = r / qv;
        o = opts(v.toFixed(3), () => (a / qv).toFixed(3), () => Math.sqrt(1 - (r / qv) * (r / qv)).toFixed(3), () => "1");
        q = `已知 sinα = ${a}/${qv}，且 α 为锐角，则 cosα = ？`;
        exp = `cosα = √(1−sin²α) = √(1−${a * a}/${qv * qv}) = ${r}/${qv} = ${v.toFixed(3)}。`;
      } else if (type === 7) {
        const [a, r, qv] = pick(trips);
        const v = (2 * (r / qv) * (r / qv) - 1);
        o = opts(v.toFixed(3), () => ((r * r - a * a) / (qv * qv)).toFixed(3), () => (2 * (a / qv) * (a / qv) - 1).toFixed(3), () => "1");
        q = `已知 cosα = ${r}/${qv}，则 cos2α = 2cos²α − 1 的值约为？`;
        exp = `cos2α = 2·(${r}/${qv})² − 1 = 2·${r * r}/${qv * qv} − 1 ≈ ${v.toFixed(3)}。`;
      } else if (type === 8) {
        const [a, r, qv] = pick(trips);
        const v = (a * a + r * r) / (qv * qv);
        o = opts(v.toFixed(3), () => ((a * a - r * r) / (qv * qv)).toFixed(3), () => (2 * a * r / (qv * qv)).toFixed(3), () => ((r * r - a * a) / (qv * qv)).toFixed(3));
        q = `已知 sinα=${a}/${qv}, cosα=${r}/${qv}，则 sin²α + cos²α = ？`;
        exp = `sin²α+cos²α = ${a * a}/${qv * qv} + ${r * r}/${qv * qv} = ${a * a + r * r}/${qv * qv} = 1（即 ${v.toFixed(3)}）。`;
      } else {
        const p = rnd(1, 6), q2 = rnd(1, 6);
        o = opts(`${(2 * p * q2)}/(${q2 * q2 - p * p})`, () => `${(p * q2)}/(${q2 * q2 - p * p})`, () => `${(2 * p * q2)}/(${q2 * q2 + p * p})`, () => `${(2 * p)}/(${q2})`);
        q = `已知 tanα = ${p}/${q2}，则 tan2α = ？`;
        exp = `tan2α = 2tanα/(1−tan²α) = 2(${p}/${q2})/(1−(${p}/${q2})²) = ${2 * p * q2}/(${q2 * q2}−${p * p})。`;
      }
      results.push(Q(q, o, "基础", exp, "三角恒等变换"));
    }
    return results;
  }

  /* ============================================================
   * 6. 数列（十一年级）
   * ============================================================ */
  function qSequence(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 等差数列通项
        const a1 = rnd(1, 5);
        const d = rnd(1, 3);
        const n = rnd(3, 6);
        const an = a1 + (n - 1) * d;
        o = opts(an, () => an + d, () => an - d, () => a1 + n * d);
        q = `等差数列首项 ${a1}，公差 ${d}，第 ${n} 项 a_${n} = ？`;
        exp = `a_n = a₁ + (n−1)d = ${a1} + (${n}−1)×${d} = ${an}。`;
      } else if (type === 1) {
        // 等差数列求和
        const a1 = rnd(1, 5);
        const d = rnd(1, 3);
        const n = rnd(3, 6);
        const sn = n * a1 + n * (n - 1) * d / 2;
        o = opts(sn, () => sn + n, () => sn - n, () => a1 * n);
        q = `等差数列首项 ${a1}，公差 ${d}，前 ${n} 项和 S_${n} = ？`;
        exp = `S_n = na₁ + n(n−1)d/2 = ${n}×${a1} + ${n}×${n - 1}×${d}/2 = ${sn}。`;
      } else if (type === 2) {
        // 等比数列通项
        const a1 = rnd(1, 3);
        const q_val = rnd(2, 3);
        const n = rnd(3, 5);
        const an = a1 * Math.pow(q_val, n - 1);
        o = opts(an, () => an * q_val, () => an / q_val, () => a1 * n);
        q = `等比数列首项 ${a1}，公比 ${q_val}，第 ${n} 项 a_${n} = ？`;
        exp = `a_n = a₁ × q^(n−1) = ${a1} × ${q_val}^${n - 1} = ${an}。`;
      } else {
        // 等比数列求和
        const a1 = rnd(1, 3);
        const q_val = rnd(2, 3);
        const n = rnd(2, 4);
        const sn = a1 * (Math.pow(q_val, n) - 1) / (q_val - 1);
        o = opts(sn, () => sn + a1, () => sn - a1, () => a1 * n);
        q = `等比数列首项 ${a1}，公比 ${q_val}，前 ${n} 项和 S_${n} = ？`;
        exp = `S_n = a₁(q^n − 1)/(q − 1) = ${a1}×(${q_val}^${n} − 1)/(${q_val} − 1) = ${sn}。`;
      }
      results.push(Q(q, o, "基础", exp, "数列"));
    }
    return results;
  }

  /* ============================================================
   * 7. 数列求和技巧（十一年级）
   * ============================================================ */
  function qSeqSum(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const nn = rnd(3, 20);
        o = opts(`${nn}/${nn + 1}`, () => `${nn + 1}/${nn + 2}`, () => `${nn - 1}/${nn}`, () => `1/${nn + 1}`);
        q = `求和：1/(1×2) + 1/(2×3) + ... + 1/(${nn}×(${nn}+1)) = ？`;
        exp = `裂项：1/(k(k+1)) = 1/k − 1/(k+1)，相消后得 ${nn}/${nn + 1}。`;
      } else if (type === 1) {
        const nn = rnd(3, 10);
        const sn = Math.pow(2, nn) - 1;
        o = opts(sn, () => sn + 1, () => sn - 1, () => Math.pow(2, nn + 1));
        q = `求和：1 + 2 + 4 + ... + 2^${nn - 1} = ？`;
        exp = `等比求和：S = (2^${nn} − 1)/(2 − 1) = ${sn}。`;
      } else if (type === 2) {
        const nn = rnd(2, 12);
        const an = 2 * nn + 1;
        o = opts(an, () => an + 2, () => an - 2, () => 2 * nn);
        q = `数列 a_n = 2n + 1，第 ${nn} 项 a_${nn} = ？`;
        exp = `a_${nn} = 2×${nn} + 1 = ${an}。`;
      } else if (type === 3) {
        const nn = rnd(2, 10);
        const ans = nn * (nn + 1) / 2;
        o = opts(ans, () => ans + 1, () => ans - 1, () => nn * nn);
        q = `求和：1 + 2 − 3 + 4 − 5 + ... + ${2 * nn} = ？`;
        exp = `分组：(1+2)+(−3+4)+... 共 ${nn} 组，每组 1，和为 ${ans}。`;
      } else if (type === 4) {
        const a1 = rnd(1, 6), d = rnd(1, 5), nn = rnd(3, 10);
        const an = a1 + (nn - 1) * d;
        o = opts(an, () => an + d, () => an - d, () => a1 + nn * d);
        q = `等差数列首项 ${a1}，公差 ${d}，第 ${nn} 项 a_${nn} = ？`;
        exp = `a_n = a₁ + (n−1)d = ${a1} + (${nn}−1)×${d} = ${an}。`;
      } else if (type === 5) {
        const a1 = rnd(1, 4), qv = rnd(2, 4), nn = rnd(3, 6);
        const an = a1 * Math.pow(qv, nn - 1);
        o = opts(an, () => an * qv, () => Math.round(an / qv), () => a1 * nn);
        q = `等比数列首项 ${a1}，公比 ${qv}，第 ${nn} 项 a_${nn} = ？`;
        exp = `a_n = a₁q^(n−1) = ${a1}×${qv}^${nn - 1} = ${an}。`;
      } else if (type === 6) {
        const nn = rnd(2, 12);
        const ans = nn * (nn + 3) / (2 * (nn + 1));
        o = opts(ans.toFixed(3), () => ((nn + 1) / (nn + 2)).toFixed(3), () => ((nn - 1) / nn).toFixed(3), () => "1");
        q = `求和：1/(1×3) + 1/(2×4) + ... + 1/(${nn}×(${nn}+2)) = ？`;
        exp = `裂项：1/(k(k+2)) = (1/2)(1/k − 1/(k+2))，相消得 ${ans.toFixed(3)}。`;
      } else if (type === 7) {
        const a1 = rnd(1, 6), d = rnd(1, 4), nn = rnd(3, 10);
        const sn = nn * a1 + nn * (nn - 1) * d / 2;
        o = opts(sn, () => sn + nn, () => sn - nn, () => a1 * nn);
        q = `等差数列首项 ${a1}，公差 ${d}，前 ${nn} 项和 S_${nn} = ？`;
        exp = `S_n = na₁ + n(n−1)d/2 = ${sn}。`;
      } else if (type === 8) {
        const a1 = rnd(1, 3), qv = rnd(2, 4), nn = rnd(2, 6);
        const sn = a1 * (Math.pow(qv, nn) - 1) / (qv - 1);
        o = opts(sn, () => sn + a1, () => sn - a1, () => a1 * nn);
        q = `等比数列首项 ${a1}，公比 ${qv}，前 ${nn} 项和 S_${nn} = ？`;
        exp = `S_n = a₁(q^n − 1)/(q − 1) = ${sn}。`;
      } else {
        const nn = rnd(2, 12);
        const v = nn * (nn + 1) * (2 * nn + 1) / 6;
        o = opts(v, () => nn * (nn + 1) / 2, () => v + nn, () => nn * nn * nn);
        q = `平方和：1² + 2² + ... + ${nn}² = ？`;
        exp = `平方和公式 n(n+1)(2n+1)/6 = ${nn}×${nn + 1}×${2 * nn + 1}/6 = ${v}。`;
      }
      results.push(Q(q, o, "进阶", exp, "数列求和技巧"));
    }
    return results;
  }

  /* ============================================================
   * 8. 平面向量（十一年级）
   * ============================================================ */
  function qVector(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 向量加法
        const ax = rnd(1, 5), ay = rnd(1, 5);
        const bx = rnd(1, 5), by = rnd(1, 5);
        const sx = ax + bx, sy = ay + by;
        o = opts(`(${sx},${sy})`, () => `(${sx + 1},${sy})`, () => `(${ax},${by})`, () => `(${bx},${ay})`);
        q = `向量 a=(${ax},${ay}), b=(${bx},${by})，a+b=？`;
        exp = `向量加法：(a₁+b₁, a₂+b₂) = (${ax}+${bx}, ${ay}+${by}) = (${sx},${sy})。`;
      } else if (type === 1) {
        // 向量减法
        const ax = rnd(2, 6), ay = rnd(2, 6);
        const bx = rnd(1, 4), by = rnd(1, 4);
        const dx = ax - bx, dy = ay - by;
        o = opts(`(${dx},${dy})`, () => `(${dx + 1},${dy})`, () => `(${ax + bx},${ay + by})`, () => `(${bx - ax},${by - ay})`);
        q = `向量 a=(${ax},${ay}), b=(${bx},${by})，a−b=？`;
        exp = `向量减法：(a₁−b₁, a₂−b₂) = (${ax}−${bx}, ${ay}−${by}) = (${dx},${dy})。`;
      } else if (type === 2) {
        // 数量积
        const ax = rnd(1, 5), ay = rnd(1, 5);
        const bx = rnd(1, 5), by = rnd(1, 5);
        const dot = ax * bx + ay * by;
        o = opts(dot, () => dot + 1, () => dot - 1, () => ax * bx);
        q = `向量 a=(${ax},${ay}), b=(${bx},${by})，a·b=？`;
        exp = `数量积：a·b = a₁b₁ + a₂b₂ = ${ax}×${bx} + ${ay}×${by} = ${dot}。`;
      } else {
        // 向量共线
        const k = rnd(2, 4);
        const ax = rnd(1, 3), ay = ax * k;
        const bx = rnd(1, 3);
        const by = bx * k;
        o = opts("共线", () => "不共线", () => "垂直", () => "无法判断");
        q = `向量 a=(${ax},${ay}), b=(${bx},${by})，它们的关系是？`;
        exp = `a = ${k} × b，两向量共线。`;
      }
      results.push(Q(q, o, "基础", exp, "平面向量"));
    }
    return results;
  }

  /* ============================================================
   * 9. 立体几何（十一年级）
   * ============================================================ */
  function qSolid(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const nn = rnd(3, 8);
        o = opts(2 * nn + "个", () => (2 * nn + 2) + "个", () => (3 * nn) + "个", () => "8个");
        q = `${nn} 棱柱（底面为 ${nn} 边形）的顶点个数是？`;
        exp = `棱柱上下底各 ${nn} 个顶点，共 2${nn} = ${2 * nn} 个。`;
      } else if (type === 1) {
        const nn = rnd(3, 8);
        o = opts(nn + "个", () => (nn + 1) + "个", () => (2 * nn) + "个", () => "3个");
        q = `${nn} 棱锥（底面为 ${nn} 边形）的侧面个数是？`;
        exp = `${nn} 棱锥有 ${nn} 个侧面（每个底边对应一个）。`;
      } else if (type === 2) {
        const nn = rnd(3, 8);
        o = opts(3 * nn + "条", () => (2 * nn) + "条", () => nn + "条", () => "12条");
        q = `${nn} 棱柱的棱的条数是？`;
        exp = `棱柱有 3${nn} 条棱（侧棱 ${nn} + 上下底各 ${nn}）。`;
      } else if (type === 3) {
        const a = rnd(2, 13);
        o = opts(6 * a * a, () => 4 * a * a, () => a * a * a, () => 12 * a);
        q = `棱长为 ${a} 的正方体的表面积是？`;
        exp = `正方体 6 个面，表面积 = 6a² = 6×${a}² = ${6 * a * a}。`;
      } else if (type === 4) {
        const a = rnd(2, 13);
        o = opts(a * a * a, () => 6 * a * a, () => 12 * a, () => a * a);
        q = `棱长为 ${a} 的正方体的体积是？`;
        exp = `正方体体积 = a³ = ${a * a * a}。`;
      } else if (type === 5) {
        const r = rnd(2, 13), h = rnd(2, 13);
        const v = Math.PI * r * r * h;
        o = opts(v.toFixed(1), () => (2 * Math.PI * r * h).toFixed(1), () => (Math.PI * r * r).toFixed(1), () => (Math.PI * r * r * h / 3).toFixed(1));
        q = `底面半径 ${r}、高 ${h} 的圆柱体积是？`;
        exp = `圆柱体积 V = πr²h = π×${r}²×${h} ≈ ${v.toFixed(1)}。`;
      } else if (type === 6) {
        const r = rnd(2, 8);
        o = opts(4 * Math.PI * r * r, () => 2 * Math.PI * r * r, () => Math.PI * r * r, () => 4 * Math.PI * r);
        q = `半径 r = ${r} 的球的表面积是？`;
        exp = `球表面积 S = 4πr² = 4π·${r}² = ${4 * Math.PI * r * r}。`;
      } else if (type === 7) {
        const r = rnd(2, 7);
        const v = 4 / 3 * Math.PI * r * r * r;
        o = opts(v.toFixed(1), () => (Math.PI * r * r * r).toFixed(1), () => (4 * Math.PI * r).toFixed(1), () => (4 / 3 * Math.PI * r * r).toFixed(1));
        q = `半径 r = ${r} 的球的体积是？`;
        exp = `球体积 V = 4πr³/3 ≈ ${v.toFixed(1)}。`;
      } else if (type === 8) {
        const r = rnd(2, 7), h = rnd(3, 9);
        const s = 2 * Math.PI * r * h;
        o = opts(s, () => 2 * Math.PI * r * r, () => Math.PI * r * r * h, () => 2 * Math.PI * r);
        q = `底面半径 ${r}、高 ${h} 的圆柱侧面积是？`;
        exp = `圆柱侧面积 S_侧 = 2πrh = 2π·${r}·${h} = ${s}。`;
      } else {
        const s = rnd(3, 9), h = rnd(2, 8);
        const v = s * h / 3;
        o = opts(v, () => s * h, () => s * h / 2, () => s + h);
        q = `底面积 ${s}、高 ${h} 的棱锥体积是？`;
        exp = `棱锥体积 V = 1/3·Sh = ${s}×${h}/3 = ${v}。`;
      }
      results.push(Q(q, o, "基础", exp, "立体几何"));
    }
    return results;
  }

  /* ============================================================
   * 10. 空间向量建系（十一年级）
   * ============================================================ */
  function qSolidAxis(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 3;
      let q, ans, o, exp;
      if (type === 0) {
        // 坐标计算
        const x = rnd(1, 5), y = rnd(1, 5), z = rnd(1, 5);
        o = opts(`(${x},${y},${z})`, () => `(${x},${z},${y})`, () => `(${y},${x},${z})`, () => `(-${x},-${y},-${z})`);
        q = `空间点 P 的坐标为 (${x}, ${y}, ${z})，其坐标表示是？`;
        exp = `空间直角坐标系中，点 P 的坐标为 (x, y, z)。`;
      } else if (type === 1) {
        // 向量坐标
        const ax = rnd(1, 5), ay = rnd(1, 5), az = rnd(1, 5);
        const bx = rnd(1, 5), by = rnd(1, 5), bz = rnd(1, 5);
        const dx = ax - bx, dy = ay - by, dz = az - bz;
        o = opts(`(${dx},${dy},${dz})`, () => `(${dx + 1},${dy},${dz})`, () => `(${ax + bx},${ay + by},${az + bz})`, () => `(${bx - ax},${by - ay},${bz - az})`);
        q = `向量 a=(${ax},${ay},${az}), b=(${bx},${by},${bz})，a−b=？`;
        exp = `向量减法：(a₁−b₁, a₂−b₂, a₃−b₃) = (${dx},${dy},${dz})。`;
      } else {
        // 法向量
        o = opts("(0,0,1)", () => "(1,0,0)", () => "(0,1,0)", () => "(1,1,1)");
        q = `平面 xOy 的法向量是？`;
        exp = `xOy 平面的法向量垂直于该平面，可取 (0, 0, 1)。`;
      }
      results.push(Q(q, o, "基础", exp, "空间向量建系"));
    }
    return results;
  }

  /* ============================================================
   * 11. 空间角与距离（十一年级）
   * ============================================================ */
  function qSolidAngle(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const m = rnd(1, 12);
        o = opts("锐角或直角（(0°,90°]）", () => "钝角", () => "平角", () => "无法确定");
        q = `（情形 ${m}）空间中异面直线所成角的范围是？`;
        exp = `异面直线所成角范围：(0°, 90°]，即锐角或直角。`;
      } else if (type === 1) {
        const m = rnd(1, 12);
        o = opts("直线与其在平面内投影的夹角", () => "直线与面内任意直线的夹角", () => "两平面的夹角", () => "直线与法向量的夹角");
        q = `（情形 ${m}）直线与平面所成角是指？`;
        exp = `线面角是直线与其在平面内投影的夹角，范围 [0°, 90°]。`;
      } else if (type === 2) {
        const m = rnd(1, 12);
        o = opts("两平面交线上一点分别在两平面内作交线垂线所成的角", () => "两平面内任意两直线夹角", () => "两平面法向量夹角", () => "两平面平行线夹角");
        q = `（情形 ${m}）二面角的平面角是指？`;
        exp = `二面角的平面角由交线上一点分别在两平面内作交线的垂线所成的角。`;
      } else if (type === 3) {
        const a = rnd(1, 12), b = rnd(1, 12);
        o = opts("90°", () => "0°", () => "45°", () => "180°");
        q = `空间向量 u=(${a},0,0)、v=(0,${b},0) 的夹角是？`;
        exp = `u·v=0 → 夹角 90°。`;
      } else if (type === 4) {
        const a = rnd(1, 12);
        o = opts("45°", () => "90°", () => "0°", () => "60°");
        q = `空间向量 u=(${a},${a},0)、v=(${a},0,0) 的夹角是？`;
        exp = `cosθ = ${a}²/(√(${2 * a * a})·${a}) = 1/√2 → θ=45°。`;
      } else if (type === 5) {
        const a = rnd(1, 12);
        o = opts("180°", () => "0°", () => "90°", () => "60°");
        q = `空间向量 u=(${a},0,0)、v=(−${a},0,0) 的夹角是？`;
        exp = `反向共线，夹角 180°。`;
      } else if (type === 6) {
        const a = rnd(1, 12);
        o = opts("0°", () => "90°", () => "45°", () => "180°");
        q = `空间向量 u=(${a},${a},0)、v=(${a},${a},0) 的夹角是？`;
        exp = `两向量相同，夹角 0°。`;
      } else if (type === 7) {
        const a = rnd(1, 12);
        o = opts("线面角为 90°（垂直）", () => "线面角为 0°（平行或在平面内）", () => "45°", () => "60°");
        q = `直线方向向量 s=(0,0,${a})，平面 xOy（法向量 (0,0,1)），则线面角是？`;
        exp = `s 与法向量平行，直线垂直于平面，线面角 90°。`;
      } else if (type === 8) {
        const a = rnd(1, 6);
        o = opts("线面角为 0°", () => "线面角 90°", () => "45°", () => "60°");
        q = `直线方向向量 s=(${a},0,0)，平面 xOy（法向量 (0,0,1)），则线面角是？`;
        exp = `s 平行于平面，线面角 0°（直线平行于平面或在平面内）。`;
      } else {
        const d1 = rnd(1, 6), d2 = rnd(7, 12), a = rnd(1, 5);
        const dist = Math.abs(d1 - d2) / Math.sqrt(3 * a * a);
        o = opts(dist.toFixed(2), () => (Math.abs(d1 - d2)).toFixed(2), () => (d1 + d2).toFixed(2), () => (Math.abs(d1 - d2) / a).toFixed(2));
        q = `平行平面 ${a}x+${a}y+${a}z+${d1}=0 与 ${a}x+${a}y+${a}z+${d2}=0 的距离是？`;
        exp = `距离 = |${d1}−${d2}|/√(${a}²+${a}²+${a}²) = ${Math.abs(d1 - d2)}/√${3 * a * a} = ${dist.toFixed(2)}。`;
      }
      results.push(Q(q, o, "基础", exp, "空间角与距离"));
    }
    return results;
  }

  /* ============================================================
   * 12. 导数与单调性（十二年级）
   * ============================================================ */
  function qDerivative(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const nv = rnd(2, 12);
        o = opts(`${nv}x^${nv - 1}`, () => `x^${nv}`, () => `${nv}x^${nv}`, () => `x^${nv - 1}`);
        q = `f(x) = x^${nv} 的导数 f'(x) = ？`;
        exp = `(x^n)' = n x^(n−1)，故 f'(x) = ${nv}x^${nv - 1}。`;
      } else if (type === 1) {
        const a = rnd(1, 9), b = a + rnd(2, 6);
        o = opts("f'(x) ≥ 0", () => "f'(x) ≤ 0", () => "f(x) > 0", () => "f(x) < 0");
        q = `函数 f(x) 在区间 (${a}, ${b}) 上单调递增的充要条件是？`;
        exp = `f 在 (${a},${b}) 单调递增 ⇔ f'(x) ≥ 0（在该区间恒成立，且不恒为 0）。`;
      } else if (type === 2) {
        const t = rnd(1, 12);
        o = opts("f'(x₀) = 0", () => "f(x₀) = 0", () => "f''(x₀) = 0", () => "f(x₀) 最大");
        q = `函数 f(x) 在 x=${t} 处取得极值的必要条件是？`;
        exp = `极值点必要条件：f'(${t}) = 0（驻点）。`;
      } else if (type === 3) {
        const x0 = rnd(1, 7), slope = rnd(1, 9);
        const y0 = slope * x0;
        o = opts(`y − ${y0} = ${slope}(x − ${x0})`, () => `y − ${x0} = ${slope}(x − ${y0})`, () => `y = ${slope}x + ${x0}`, () => `y = ${slope}x + ${y0}`);
        q = `曲线 y = ${slope}x 在点 (${x0}, ${y0}) 处的切线方程是？`;
        exp = `斜率 k = ${slope}，切线：y − ${y0} = ${slope}(x − ${x0})。`;
      } else if (type === 4) {
        const a = rnd(2, 9);
        o = opts(`${a}·e^x`, () => `e^x`, () => `${a}·x·e^x`, () => `e^${a}x`);
        q = `f(x) = ${a}e^x 的导数是？`;
        exp = `(a e^x)' = a e^x。`;
      } else if (type === 5) {
        const a = rnd(2, 9);
        o = opts(`${a}·cos(${a}x)`, () => `${a}·sin(${a}x)`, () => `cos(${a}x)`, () => `−${a}·sin(${a}x)`);
        q = `f(x) = sin(${a}x) 的导数是？`;
        exp = `链式法则：f'(x) = cos(${a}x)·${a} = ${a}cos(${a}x)。`;
      } else if (type === 6) {
        const a = rnd(2, 9);
        o = opts("1/x", () => "x", () => "ln x", () => "−1/x");
        q = `f(x) = ln(${a}x) 的导数是？`;
        exp = `(ln ${a}x)' = (ln ${a} + ln x)' = 1/x (x>0)。`;
      } else if (type === 7) {
        const a = rnd(2, 9), b = rnd(1, 6);
        o = opts(`${2 * a}`, () => `${2 * a}x`, () => `${2 * a}x + ${b}`, () => `${a}`);
        q = `f(x) = ${a}x² + ${b}x 的二阶导数 f''(x) = ？`;
        exp = `f' = ${2 * a}x + ${b}，再求导 f'' = ${2 * a}（常数）。`;
      } else if (type === 8) {
        o = opts("u'v + uv'", () => "u'v − uv'", () => "u'v'", () => "uv");
        q = `导数的乘积法则：(uv)' = ？`;
        exp = `(uv)' = u'v + uv'。`;
      } else {
        const c = rnd(1, 4), k = rnd(2, 4);
        o = opts(`${k * c}(${c}x+1)^${k - 1}`, () => `${k}(${c}x+1)^${k - 1}`, () => `${c}(${c}x+1)^${k}`, () => `${k * c}(${c}x)^${k - 1}`);
        q = `f(x) = (${c}x + 1)^${k} 的导数是？`;
        exp = `链式法则：f' = ${k}(${c}x+1)^${k - 1}·${c} = ${k * c}(${c}x+1)^${k - 1}。`;
      }
      results.push(Q(q, o, type < 2 ? "基础" : "进阶", exp, "导数与单调性"));
    }
    return results;
  }

  /* ============================================================
   * 13. 导数与单调性极值（十二年级）
   * ============================================================ */
  function qDerivMon(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const a = rnd(2, 6), nv = rnd(2, 5);
        const coeff = a * nv;
        o = opts(`${coeff}x^${nv - 1}`, () => `${a}x^${nv}`, () => `${coeff}x^${nv}`, () => `${a * nv}x^${nv + 1}`);
        q = `f(x) = ${a}x^${nv} 的导数 f'(x) = ？`;
        exp = `f'(x) = ${a}·${nv}·x^${nv - 1} = ${coeff}x^${nv - 1}。`;
      } else if (type === 1) {
        const a = rnd(1, 9);
        o = opts("(-∞, 0) 递减，(0, +∞) 递增", () => "(-∞, 0) 递增，(0, +∞) 递减", () => "R 上递增", () => "R 上递减");
        q = `函数 f(x) = ${a}x² (a>0) 的单调区间是？`;
        exp = `f'(x) = 2${a}x，x<0 递减，x>0 递增。`;
      } else if (type === 2) {
        const a = rnd(1, 9);
        o = opts(`x = 0 处取极小值`, () => `x = 0 处取极大值`, () => `x = ${a} 处取极值`, () => "无极值");
        q = `函数 f(x) = ${a}x² 在 x = 0 处的极值是？`;
        exp = `f'(x) = 2${a}x，x=0 驻点，f''=2${a}>0，取极小值。`;
      } else if (type === 3) {
        const a = rnd(1, 5), b = rnd(1, 5);
        o = opts(`${a}`, () => `${a} − ${b}`, () => `${a} × ${b}`, () => `${a}`);
        q = `f(x) = ${a}x + ${b} 的导数 f'(x) = ？`;
        exp = `线性函数导数 = 斜率 = ${a}。`;
      } else if (type === 4) {
        const a = rnd(2, 9);
        o = opts(`在 R 上递增`, () => `在 R 上递减`, () => `先增后减`, () => `先减后增`);
        q = `f(x) = x³ ${a > 0 ? '+ ' + a : '− ' + a}x 的整体单调性？`;
        exp = `f'(x) = 3x² ${a > 0 ? '+' + a : '− ' + a} > 0 恒成立，在 R 上递增。`;
      } else if (type === 5) {
        const a = rnd(1, 9);
        o = opts(`x = ${a} 处取极小值`, () => `x = ${a} 处取极大值`, () => `x = 0 处取极值`, () => "无极值");
        q = `f(x) = (x − ${a})² 在 x = ${a} 处的极值是？`;
        exp = `f'(x) = 2(x−${a})，x=${a} 时 f'=0，两侧由负变正，取极小值。`;
      } else if (type === 6) {
        const x0 = rnd(1, 4), slope = rnd(1, 5);
        const y0 = slope * x0 * x0;
        o = opts(`${2 * slope * x0}`, () => `${slope}`, () => `${2 * slope * x0 + 1}`, () => `${slope * x0}`);
        q = `曲线 y = ${slope}x² 在点 (${x0}, ${y0}) 处的切线斜率是？`;
        exp = `y' = 2·${slope}x，在 x=${x0} 处斜率 = 2·${slope}·${x0} = ${2 * slope * x0}。`;
      } else if (type === 7) {
        const a = rnd(1, 9);
        o = opts("(-∞, 0) 递减，(0, +∞) 递增", () => "(0, +∞) 递减", () => "R 上递增", () => "R 上递减");
        q = `函数 f(x) = ${a}x² (a>0) 的单调递减区间是？`;
        exp = `f'(x)=2${a}x，x<0 时 f'<0，递减区间 (-∞,0)。`;
      } else if (type === 8) {
        const a = rnd(2, 5), b = rnd(1, 4);
        o = opts(`${a * b}x^${b - 1}`, () => `${a}x^${b}`, () => `${a}x^${b - 1}`, () => `${a * b}x^${b}`);
        q = `f(x) = ${a}x^${b} 的导数是？`;
        exp = `f'(x) = ${a}·${b}·x^${b - 1}。`;
      } else {
        const a = rnd(1, 5);
        o = opts(`${a}`, () => `${a + 1}`, () => `0`, () => `${a - 1}`);
        q = `函数 f(x) = x² + ${a} 的最小值是？`;
        exp = `x² ≥ 0，f(x) ≥ ${a}，最小值 = ${a}（x=0 处）。`;
      }
      results.push(Q(q, o, type < 2 ? "基础" : "进阶", exp, "导数与单调性极值"));
    }
    return results;
  }

  /* ============================================================
   * 14. 导数与不等式恒成立（十二年级）
   * ============================================================ */
  function qDerivIneq(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const k = rnd(1, 12);
        o = opts("对定义域内所有 x 都成立", () => "存在某个 x 成立", () => "仅 x=0 成立", () => "仅 x>0 成立");
        q = `不等式 f(x) ≥ ${k} 在定义域内“恒成立”的含义是？`;
        exp = `恒成立指对定义域内每一个 x 都满足 f(x) ≥ ${k}。`;
      } else if (type === 1) {
        const a = rnd(1, 12);
        o = opts(`最小值 −${a}`, () => `最小值 ${a}`, () => `最大值 −${a}`, () => `最大值 ${a}`);
        q = `函数 f(x) = x² − ${a} 的最值情况是？`;
        exp = `x² ≥ 0，f(x) ≥ −${a}，最小值为 −${a}（无最大值）。`;
      } else if (type === 2) {
        const b = rnd(2, 12);
        o = opts("a ≥ 0", () => "a > 0", () => "a ≤ 0", () => "a < 0");
        q = `函数 f(x) = ax² + ${b}x 在 R 上单调递增，则 a 的取值范围是？`;
        exp = `f'(x) = 2ax + ${b} ≥ 0 恒成立，需 a ≥ 0。`;
      } else if (type === 3) {
        const a = rnd(1, 12);
        o = opts(`最大值 ${a}`, () => `最小值 ${a}`, () => `最大值 −${a}`, () => `最小值 −${a}`);
        q = `函数 f(x) = −x² + ${a} 的最值情况是？`;
        exp = `−x² ≤ 0，f(x) ≤ ${a}，最大值为 ${a}（无最小值）。`;
      } else if (type === 4) {
        const a = rnd(1, 9);
        o = opts(`最小值 0`, () => `最大值 0`, () => `最小值 ${a}`, () => `无最值`);
        q = `函数 f(x) = ${a}x² (a > 0) 的最小值是？`;
        exp = `x² ≥ 0 且 a>0，f(x) ≥ 0，最小值 0（x=0 处）。`;
      } else if (type === 5) {
        const c = rnd(2, 12);
        o = opts("a ≥ 0", () => "a > 0", () => "a ≤ 0", () => "a = 0");
        q = `不等式 a x² + ${c} ≥ 0 对一切实数 x 恒成立，则 a 满足？`;
        exp = `a≥0 时 a x² ≥ 0，整体 ≥ ${c} > 0 恒成立；a<0 时取大 x 不成立，故 a ≥ 0。`;
      } else if (type === 6) {
        const c = rnd(2, 15);
        o = opts(`最小值 ${c - 1}`, () => `最大值 ${c - 1}`, () => `最小值 ${c}`, () => `最小值 ${c + 1}`);
        q = `函数 f(x) = x² − 2x + ${c} 的最小值是？`;
        exp = `配方 f = (x−1)² + (${c}−1)，最小值 = ${c - 1}（x=1 处）。`;
      } else if (type === 7) {
        const a = rnd(2, 12);
        const mx = a * a / 8;
        o = opts(`最大值 ${mx}`, () => `最小值 ${mx}`, () => `最大值 ${a}`, () => `最大值 ${a * a / 4}`);
        q = `函数 f(x) = −2x² + ${a}x 的最大值是？`;
        exp = `顶点 x = ${a}/4，f_max = −2·(${a}/4)² + ${a}·(${a}/4) = ${a * a / 8}。`;
      } else if (type === 8) {
        const b = rnd(1, 10);
        o = opts(`2${b}x`, () => `${b}x`, () => `${b * b}`, () => `x² + ${b * b}`);
        q = `由均值不等式，对任意实数 x 有 x² + ${b * b} ≥ ？`;
        exp = `x² + ${b * b} ≥ 2·x·${b} = 2${b}x（当且仅当 x=${b} 取等）。`;
      } else {
        const K = rnd(2, 15);
        o = opts(`m ≤ ${K}`, () => `m ≥ ${K}`, () => `m < ${K}`, () => `m > ${K}`);
        q = `若 f(x) = x² + ${K} ≥ m 对一切实数 x 恒成立，则参数 m 满足？`;
        exp = `f(x) 最小值为 ${K}，故需 m ≤ ${K} 才能保证恒成立。`;
      }
      results.push(Q(q, o, "进阶", exp, "导数与不等式恒成立"));
    }
    return results;
  }

  /* ============================================================
   * 15. 函数零点与极值点偏移（十二年级）
   * ============================================================ */
  function qFuncZero(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        o = opts("f(x) = 0 的实数根", () => "f'(x) = 0 的根", () => "f''(x) = 0 的根", () => "f(x) 的极值点");
        q = `函数 f(x) 的零点是？`;
        exp = `零点即方程 f(x) = 0 的实数根，或图像与 x 轴交点横坐标。`;
      } else if (type === 1) {
        o = opts("f(a)·f(b) < 0", () => "f(a)·f(b) > 0", () => "f(a) = f(b)", () => "f'(a) = f'(b)");
        q = `连续函数 f 在 [a,b] 上有零点的一个充分条件是？`;
        exp = `零点存在定理：若 f(a)·f(b) < 0，则 (a,b) 内至少有一零点。`;
      } else if (type === 2) {
        o = opts("f'(x₀) = 0 且 f''(x₀) ≠ 0", () => "f(x₀) = 0", () => "f'(x₀) ≠ 0", () => "f''(x₀) = 0");
        q = `函数 f(x) 在 x₀ 处取得极值的充分条件是？`;
        exp = `极值充分条件：f'(x₀) = 0 且 f''(x₀) ≠ 0。`;
      } else if (type === 3) {
        const sq = rnd(2, 9);
        o = opts(`±${sq}`, () => `${sq}`, () => `±${sq + 1}`, () => `无实根`);
        q = `函数 f(x) = x² − ${sq * sq} 的零点是？`;
        exp = `x² = ${sq * sq} ⇒ x = ±${sq}。`;
      } else if (type === 4) {
        const b = rnd(2, 9), c = -rnd(1, 9);
        const delta = b * b - 4 * c;
        o = opts("两个不等实根", () => "两个相等实根", () => "无实根", () => "一个实根");
        q = `方程 x² + ${b}x ${c} = 0（Δ = ${delta} > 0）根的情况是？`;
        exp = `Δ = ${b}² − 4·(${c}) = ${delta} > 0，故有两个不等实根。`;
      } else if (type === 5) {
        o = opts("与 x 轴交点个数", () => "与 y 轴交点个数", () => "极值点个数", () => "单调区间个数");
        q = `函数零点的个数等于其图像？`;
        exp = `零点个数 = 图像与 x 轴交点的个数（重根按重数或按交点计）。`;
      } else if (type === 6) {
        const a = rnd(2, 9);
        o = opts(`${a}`, () => `−${a}`, () => `${a * a}`, () => "0");
        q = `函数 f(x) = x³ − ${a * a * a} 的零点是？`;
        exp = `x³ = ${a * a * a} ⇒ x = ${a}（实数根）。`;
      } else if (type === 7) {
        const b = rnd(2, 9), c = rnd(1, 9);
        const disc = b * b - 4 * c;
        o = opts(disc > 0 ? "两个零点" : disc === 0 ? "一个零点" : "无零点", () => "一个零点", () => "两个零点", () => "无数个");
        q = `二次函数 f(x) = x² − ${b}x + ${c} 的零点个数是？`;
        exp = `判别式 Δ = ${b}² − 4·${c} = ${disc}，${disc > 0 ? "Δ>0 两个零点" : disc === 0 ? "Δ=0 一个零点" : "Δ<0 无实零点"}。`;
      } else if (type === 8) {
        o = opts("方程 f(x)=0 的根", () => "f'(x)=0 的根", () => "f 的极值点", () => "f 的最大值点");
        q = `用二分法求方程 f(x)=0 的近似根，本质上是求 f 的？`;
        exp = `二分法在符号变化区间内不断缩小含根区间，求解 f(x)=0 的根（即零点）。`;
      } else {
        const a = rnd(1, 6), b = rnd(1, 6);
        o = opts(`x = ${b}`, () => `x = ${a}`, () => `x = ${b + a}`, () => `x = 0`);
        q = `若 f(${b}) = 0，则 x = ${b} 是 f(x) 的？`;
        exp = `f(${b})=0 表明 x=${b} 是函数的一个零点（根）。`;
      }
      results.push(Q(q, o, "基础", exp, "函数零点与极值点偏移"));
    }
    return results;
  }

  /* ============================================================
   * 16. 圆锥曲线初步（十二年级）
   * ============================================================ */
  function qConic(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const a = rnd(3, 9), b = rnd(2, a - 1);
        const e = (Math.sqrt(a * a - b * b) / a).toFixed(2);
        o = opts(e, () => (Math.sqrt(a * a + b * b) / a).toFixed(2), () => "1.00", () => (b / a).toFixed(2));
        q = `椭圆 x²/${a * a} + y²/${b * b} = 1 的离心率 e ≈ ？`;
        exp = `c = √(a²−b²) = √(${a * a}−${b * b})，e = c/a ≈ ${e}。`;
      } else if (type === 1) {
        const a = rnd(2, 6), b = rnd(2, 6);
        const e = (Math.sqrt(a * a + b * b) / a).toFixed(2);
        o = opts(e, () => (Math.sqrt(a * a - b * b) / a).toFixed(2), () => "1.00", () => (b / a).toFixed(2));
        q = `双曲线 x²/${a * a} − y²/${b * b} = 1 的离心率 e ≈ ？`;
        exp = `c = √(a²+b²) = √(${a * a}+${b * b})，e = c/a ≈ ${e}。`;
      } else if (type === 2) {
        const p = rnd(2, 8);
        o = opts(`(${p / 2}, 0)`, () => `(0, ${p / 2})`, () => `(${p}, 0)`, () => `(−${p / 2}, 0)`);
        q = `抛物线 y² = ${2 * p}x 的焦点坐标是？`;
        exp = `y² = 2px 焦点为 (p/2, 0) = (${p / 2}, 0)。`;
      } else if (type === 3) {
        o = opts("0 < e < 1", () => "e = 1", () => "e > 1", () => "e = 0");
        q = `椭圆的离心率 e 的范围是？`;
        exp = `椭圆离心率 0 < e < 1。`;
      } else if (type === 4) {
        o = opts("e > 1", () => "0 < e < 1", () => "e = 1", () => "e = 0");
        q = `双曲线的离心率 e 的范围是？`;
        exp = `双曲线离心率 e > 1。`;
      } else if (type === 5) {
        const p = rnd(2, 8);
        o = opts(`x = −${p / 2}`, () => `x = ${p / 2}`, () => `y = −${p / 2}`, () => `y = ${p / 2}`);
        q = `抛物线 y² = ${2 * p}x 的准线方程是？`;
        exp = `y² = 2px 准线 x = −p/2 = −${p / 2}。`;
      } else if (type === 6) {
        const a = rnd(3, 9), b = rnd(2, a - 1);
        const c = Math.round(Math.sqrt(a * a - b * b));
        o = opts(`(±${c}, 0)`, () => `(0, ±${c})`, () => `(±${a}, 0)`, () => `(0, ±${b})`);
        q = `椭圆 x²/${a * a} + y²/${b * b} = 1 的焦点坐标是？`;
        exp = `c = √(${a * a}−${b * b}) = ${c}，焦点在 x 轴：(±${c}, 0)。`;
      } else if (type === 7) {
        const a = rnd(2, 6), b = rnd(2, 6);
        o = opts(`y = ±${b / a}x`, () => `y = ±${a / b}x`, () => `y = ±${b}x`, () => `x = ±${a}y`);
        q = `双曲线 x²/${a * a} − y²/${b * b} = 1 的渐近线方程是？`;
        exp = `渐近线 y = ±(b/a)x = ±${b / a}x。`;
      } else if (type === 8) {
        const a = rnd(3, 9);
        const bsq = rnd(1, a - 1) * rnd(1, a - 1);
        o = opts(2 * a, () => a, () => a * a, () => 2 * a * a);
        q = `椭圆 x²/${a * a} + y²/${bsq} = 1 的长轴长（2a）是？`;
        exp = `长半轴 a = ${a}，长轴长 2a = ${2 * a}。`;
      } else {
        o = opts("到两定点距离之和为常数", () => "到两定点距离之差为常数", () => "到定点与定直线距离相等", () => "到两定点距离之比为常数");
        q = `椭圆的定义是？`;
        exp = `椭圆：到两定点（焦点）距离之和为常数（大于焦距）的点的轨迹。`;
      }
      results.push(Q(q, o, "基础", exp, "圆锥曲线初步"));
    }
    return results;
  }

  /* ============================================================
   * 17. 联立与韦达定理（十二年级）
   * ============================================================ */
  function qConicLink(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 3;
      let q, ans, o, exp;
      if (type === 0) {
        // 韦达定理
        const sum = rnd(1, 10);
        const prod = rnd(1, 10);
        o = opts(`x₁+x₂=${-sum}, x₁x₂=${prod}`, () => `x₁+x₂=${sum}, x₁x₂=${prod}`, () => `x₁+x₂=${-sum}, x₁x₂=${-prod}`, () => `x₁+x₂=${sum}, x₁x₂=${-prod}`);
        q = `方程 x² + ${sum}x + ${prod} = 0 的两根 x₁, x₂，由韦达定理得？`;
        exp = `韦达定理：x₁+x₂ = −b/a = −${sum}，x₁x₂ = c/a = ${prod}。`;
      } else if (type === 1) {
        // 判别式
        const a = 1, b = rnd(2, 6), c = rnd(1, 5);
        const delta = b * b - 4 * a * c;
        o = opts(delta > 0 ? "有两个不等实根" : delta === 0 ? "有两个相等实根" : "无实根", () => "无法判断", () => "只有一个实根", () => "有复数根");
        q = `方程 x² + ${b}x + ${c} = 0 的判别式 Δ = ${delta}，根的情况是？`;
        exp = `Δ = ${b}² − 4×1×${c} = ${delta}，Δ ${delta > 0 ? ">" : delta === 0 ? "=" : "<"} 0，故${delta > 0 ? "有两个不等实根" : delta === 0 ? "有两个相等实根" : "无实根"}。`;
      } else {
        // 弦长公式
        o = opts("√(1+k²)·|x₁−x₂|", () => "√(1+k²)·(x₁+x₂)", () => "|x₁−x₂|", () => "√(1+k²)·√((x₁+x₂)²−4x₁x₂)");
        q = `直线 y = kx + b 与曲线相交，弦长公式是？`;
        exp = `弦长 = √(1+k²)·|x₁−x₂| = √(1+k²)·√Δ/|a|。`;
      }
      results.push(Q(q, o, "进阶", exp, "联立与韦达定理"));
    }
    return results;
  }

  /* ============================================================
   * 18. 弦长·中点·定点定值（十二年级）
   * ============================================================ */
  function qConicChord(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const x1 = rnd(1, 10), x2 = rnd(1, 10);
        const mid = (x1 + x2) / 2;
        o = opts(mid, () => mid + 1, () => mid - 1, () => x1 + x2);
        q = `线段两端点横坐标为 ${x1} 和 ${x2}，中点横坐标是？`;
        exp = `中点横坐标 = (${x1} + ${x2}) / 2 = ${mid}。`;
      } else if (type === 1) {
        const a = 1, b = rnd(2, 12), c = rnd(1, 9);
        const delta = b * b - 4 * a * c;
        const dist = Math.sqrt(delta) / a;
        o = opts(dist, () => delta, () => Math.sqrt(delta), () => delta / 2);
        q = `方程 x² + ${b}x + ${c} = 0 的两根距离 |x₁−x₂| = ？`;
        exp = `|x₁−x₂| = √Δ/|a| = √${delta} / 1 = ${dist}。`;
      } else if (type === 2) {
        const b = rnd(1, 9);
        o = opts(`直线过定点 (0, ${b})`, () => `直线过定点 (${b}, 0)`, () => `直线过原点`, () => `直线不过定点`);
        q = `直线 y = kx + ${b} (k 为参数) 恒过定点？`;
        exp = `当 x = 0 时 y = ${b}，故直线恒过定点 (0, ${b})。`;
      } else if (type === 3) {
        const x1 = rnd(1, 10), y1 = rnd(1, 10), x2 = rnd(1, 10), y2 = rnd(1, 10);
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        o = opts(`(${mx}, ${my})`, () => `(${x1}, ${y1})`, () => `(${x2}, ${y2})`, () => `(${mx}, ${y1})`);
        q = `线段 AB（A(${x1},${y1})、B(${x2},${y2})）的中点坐标是？`;
        exp = `中点 = ((x₁+x₂)/2, (y₁+y₂)/2) = (${mx}, ${my})。`;
      } else if (type === 4) {
        const a = 1, b = rnd(2, 12), c = rnd(1, 9);
        const s = -b / a;
        o = opts(s, () => s + 1, () => s - 1, () => b);
        q = `方程 x² + ${b}x + ${c} = 0 的两根之和 x₁+x₂ = ？`;
        exp = `韦达定理：x₁+x₂ = −b/a = −${b} = ${s}。`;
      } else if (type === 5) {
        const a = 1, b = rnd(2, 12), c = rnd(1, 9);
        const p = c / a;
        o = opts(p, () => p + 1, () => p - 1, () => b);
        q = `方程 x² + ${b}x + ${c} = 0 的两根之积 x₁x₂ = ？`;
        exp = `韦达定理：x₁x₂ = c/a = ${c} = ${p}。`;
      } else if (type === 6) {
        const a = rnd(1, 5);
        o = opts(`直线过定点 (${a}, ${a + 1})`, () => `直线过定点 (0, ${a})`, () => `直线过原点`, () => `直线不过定点`);
        q = `直线 y − ${a + 1} = k(x − ${a}) (k 为参数) 恒过定点？`;
        exp = `整理 y = k(x−${a}) + ${a + 1}，当 x=${a} 时 y=${a + 1}，过定点 (${a}, ${a + 1})。`;
      } else if (type === 7) {
        const a = rnd(2, 6), b = rnd(1, 5), c = rnd(1, 5);
        const delta = b * b - 4 * a * c;
        const dist = Math.sqrt(Math.max(delta, 0)) / a;
        o = opts(dist, () => (-b / a), () => (c / a), () => Math.sqrt(Math.max(delta, 0)));
        q = `方程 ${a}x² + ${b}x + ${c} = 0（Δ=${delta}）的两根距离 |x₁−x₂| = ？`;
        exp = `|x₁−x₂| = √Δ/|a| = √${Math.max(delta, 0)} / ${a} = ${dist}。`;
      } else if (type === 8) {
        const x1 = rnd(1, 12), x2 = rnd(1, 12);
        o = opts(Math.abs(x1 - x2), () => x1 + x2, () => Math.max(x1, x2), () => Math.min(x1, x2));
        q = `两点横坐标 ${x1} 与 ${x2}，它们在 x 轴上的距离是？`;
        exp = `距离 = |${x1} − ${x2}| = ${Math.abs(x1 - x2)}。`;
      } else {
        const s = rnd(3, 10), p = rnd(1, 9);
        o = opts(`x² − ${s}x + ${p} = 0`, () => `x² + ${s}x + ${p} = 0`, () => `x² − ${s}x − ${p} = 0`, () => `${s}x² + x + ${p} = 0`);
        q = `以 ${s} 为两根之和、${p} 为两根之积的一元二次方程可写为？`;
        exp = `由韦达：x² − (和)x + 积 = 0，即 x² − ${s}x + ${p} = 0。`;
      }
      results.push(Q(q, o, "进阶", exp, "弦长·中点·定点定值"));
    }
    return results;
  }

  /* ============================================================
   * 19. 圆锥曲线性质（十二年级）
   * ============================================================ */
  function qConicProp(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const a = rnd(3, 10), b = rnd(2, a - 1);
        const e = (Math.sqrt(a * a - b * b) / a).toFixed(2);
        o = opts(e, () => (Math.sqrt(a * a + b * b) / a).toFixed(2), () => (b / a).toFixed(2), () => "1.00");
        q = `椭圆 x²/${a * a} + y²/${b * b} = 1 的离心率 e ≈ ？`;
        exp = `c = √(a²−b²)，e = c/a ≈ ${e}。`;
      } else if (type === 1) {
        const a = rnd(2, 7), b = rnd(2, 7);
        const e = (Math.sqrt(a * a + b * b) / a).toFixed(2);
        o = opts(e, () => (Math.sqrt(a * a - b * b) / a).toFixed(2), () => (b / a).toFixed(2), () => "1.00");
        q = `双曲线 x²/${a * a} − y²/${b * b} = 1 的离心率 e ≈ ？`;
        exp = `c = √(a²+b²)，e = c/a ≈ ${e}。`;
      } else if (type === 2) {
        const p = rnd(2, 10);
        o = opts(`${p}`, () => `${2 * p}`, () => `${p / 2}`, () => `${p * p}`);
        q = `抛物线 y² = ${2 * p}x 的焦点到准线的距离是？`;
        exp = `焦点 (p/2,0)、准线 x=−p/2，距离 = p = ${p}。`;
      } else if (type === 3) {
        const r = rnd(2, 9);
        o = opts(`xx₀ + yy₀ = ${r * r}`, () => `xx₀ − yy₀ = ${r * r}`, () => `x + y = ${r}`, () => `xy = ${r * r}`);
        q = `圆 x² + y² = ${r * r} 在点 (x₀, y₀) 处的切线方程是？`;
        exp = `圆切线：xx₀ + yy₀ = r² = ${r * r}。`;
      } else if (type === 4) {
        const a = rnd(3, 10), b = rnd(2, a - 1);
        const c = Math.round(Math.sqrt(a * a - b * b));
        o = opts(`(±${c}, 0)`, () => `(0, ±${c})`, () => `(±${a}, 0)`, () => `(0, ±${b})`);
        q = `椭圆 x²/${a * a} + y²/${b * b} = 1 的焦点坐标是？`;
        exp = `c = √(${a * a}−${b * b}) = ${c}，焦点 (±${c}, 0)。`;
      } else if (type === 5) {
        const a = rnd(2, 7), b = rnd(2, 7);
        o = opts(`y = ±${b / a}x`, () => `y = ±${a / b}x`, () => `y = ±${b}x`, () => `x = ±${a}y`);
        q = `双曲线 x²/${a * a} − y²/${b * b} = 1 的渐近线是？`;
        exp = `渐近线 y = ±(b/a)x = ±${b / a}x。`;
      } else if (type === 6) {
        const a = rnd(3, 10), b = rnd(2, a - 1);
        const c = Math.round(Math.sqrt(a * a - b * b));
        o = opts(2 * c, () => c, () => 2 * a, () => a + b);
        q = `椭圆 x²/${a * a} + y²/${b * b} = 1 的焦距（两焦点距离）是？`;
        exp = `焦距 = 2c = 2×${c} = ${2 * c}。`;
      } else if (type === 7) {
        const p = rnd(2, 10);
        o = opts(`(${p / 2}, 0)`, () => `(0, ${p / 2})`, () => `(${p}, 0)`, () => `(−${p / 2}, 0)`);
        q = `抛物线 y² = ${2 * p}x 的焦点坐标是？`;
        exp = `y² = 2px 焦点 (p/2, 0) = (${p / 2}, 0)。`;
      } else if (type === 8) {
        const a = rnd(3, 10), b = rnd(2, a - 1);
        const c = Math.round(Math.sqrt(a * a - b * b));
        o = opts(`x = ±${a * a / c}`, () => `x = ±${c}`, () => `x = ±${a}`, () => `y = ±${a * a / c}`);
        q = `椭圆 x²/${a * a} + y²/${b * b} = 1 的准线方程是？`;
        exp = `准线 x = ±a²/c = ±${a * a}/${c}。`;
      } else {
        const a = rnd(2, 7), b = rnd(2, 7);
        const c = Math.round(Math.sqrt(a * a + b * b));
        o = opts(2 * c, () => c, () => 2 * a, () => a + b);
        q = `双曲线 x²/${a * a} − y²/${b * b} = 1 的焦距是？`;
        exp = `焦距 = 2c = 2×${c} = ${2 * c}。`;
      }
      results.push(Q(q, o, type < 2 ? "进阶" : "基础", exp, "圆锥曲线性质"));
    }
    return results;
  }

  /* ============================================================
   * 20. 参数方程与极坐标（十二年级）
   * ============================================================ */
  function qParamEq(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const r = rnd(2, 12);
        o = opts(`x² + y² = ${r * r}`, () => `x² − y² = ${r * r}`, () => `y = ${r}x`, () => `x = ${r}`);
        q = `参数方程 x = ${r}cosθ, y = ${r}sinθ 消参后是？`;
        exp = `x² + y² = ${r}²cos²θ + ${r}²sin²θ = ${r * r}。`;
      } else if (type === 1) {
        const r = rnd(2, 12);
        o = opts(`x² + y² = ${r * r}`, () => `x² + y² = ${r}`, () => `y = ${r}x`, () => `x = ${r}`);
        q = `极坐标 ρ = ${r} 化为直角坐标方程是？`;
        exp = `ρ = ${r} → x² + y² = ${r}² = ${r * r}，即圆。`;
      } else if (type === 2) {
        const p = rnd(1, 6), q2 = rnd(1, 6);
        o = opts("t（或 θ）", () => "ρ", () => "φ", () => "x");
        q = `参数方程 x = ${p}t², y = ${q2}t 中的参数通常记作？`;
        exp = `参数方程中的变量 t（或 θ）称为参数。`;
      } else if (type === 3) {
        const a = rnd(2, 8), b = rnd(2, 8);
        o = opts(`x²/${a * a} + y²/${b * b} = 1`, () => `x²/${a * a} − y²/${b * b} = 1`, () => `y = ${b / a}x`, () => `x² + y² = 1`);
        q = `参数方程 x = ${a}cosθ, y = ${b}sinθ 消参后是？`;
        exp = `cosθ=x/${a}, sinθ=y/${b}，平方和得 x²/${a * a} + y²/${b * b} = 1（椭圆）。`;
      } else if (type === 4) {
        const c = rnd(2, 12);
        o = opts(`y = x/${c}`, () => `y = ${c}x`, () => `x + y = ${c}`, () => `y = ${c}/x`);
        q = `参数方程 x = ${c}t, y = t (t 为参数) 消参后是？`;
        exp = `t = y，代入 x = ${c}y → y = x/${c}（直线）。`;
      } else if (type === 5) {
        const a = rnd(2, 12);
        o = opts(`x = ${a}`, () => `y = ${a}`, () => `x² + y² = ${a}`, () => `x = −${a}`);
        q = `极坐标方程 ρcosθ = ${a} 化为直角坐标是？`;
        exp = `ρcosθ = x，故 x = ${a}（一条竖直线）。`;
      } else if (type === 6) {
        const b = rnd(2, 12);
        o = opts(`y = ${b}`, () => `x = ${b}`, () => `y = ${b * b}`, () => `x² + y² = ${b}`);
        q = `极坐标方程 ρsinθ = ${b} 化为直角坐标是？`;
        exp = `ρsinθ = y，故 y = ${b}（一条水平线）。`;
      } else if (type === 7) {
        const a = rnd(1, 9), b = rnd(1, 9);
        o = opts(`方向向量 (${a}, ${b})`, () => `方向向量 (${b}, ${a})`, () => `法向量 (${a}, ${b})`, () => `斜率 ${a}`);
        q = `参数方程 x = 1 + ${a}t, y = 2 + ${b}t (t 为参数) 表示直线，其方向向量是？`;
        exp = `参数增加对应 (${a}, ${b})，方向向量为 (${a}, ${b})。`;
      } else if (type === 8) {
        o = opts(`x² + y² = 1`, () => `x² − y² = 1`, () => `x + y = 1`, () => `y = x²`);
        q = `参数方程 x = cosθ, y = sinθ（θ 为参数）消参后是？`;
        exp = `cos²θ + sin²θ = 1 → x² + y² = 1（单位圆）。`;
      } else {
        const r = rnd(2, 8);
        const ang = pick([0, 90, 180, 270]);
        const map = { 0: `(${r}, 0)`, 90: `(0, ${r})`, 180: `(−${r}, 0)`, 270: `(0, −${r})` };
        o = opts(map[ang], () => `(${r}, ${r})`, () => `(0, 0)`, () => `(${r}, 1)`);
        q = `极坐标点 (ρ=${r}, θ=${ang}°) 的直角坐标是？`;
        exp = `x=ρcosθ, y=ρsinθ；θ=${ang}° 时得 ${map[ang]}。`;
      }
      results.push(Q(q, o, "基础", exp, "参数方程与极坐标"));
    }
    return results;
  }

  /* ============================================================
   * 21. 复数运算（十年级）
   * ============================================================ */
  function qComplex(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 复数加法
        const a = rnd(1, 5), b = rnd(1, 5);
        const c = rnd(1, 5), d = rnd(1, 5);
        const real = a + c, imag = b + d;
        o = opts(`${real}+${imag}i`, () => `${real + 1}+${imag}i`, () => `${real}+${imag + 1}i`, () => `${a + c}+${b - d}i`);
        q = `( ${a}+${b}i ) + ( ${c}+${d}i ) = ？`;
        exp = `复数加法：实部加实部，虚部加虚部 = (${real}) + (${imag})i。`;
      } else if (type === 1) {
        // 复数乘法
        const a = rnd(1, 3), b = rnd(1, 3);
        const c = rnd(1, 3), d = rnd(1, 3);
        const real = a * c - b * d;
        const imag = a * d + b * c;
        o = opts(`${real}+${imag}i`, () => `${real + 1}+${imag}i`, () => `${real}+${imag + 1}i`, () => `${a * c}+${b * d}i`);
        q = `( ${a}+${b}i ) · ( ${c}+${d}i ) = ？`;
        exp = `复数乘法：(a+bi)(c+di) = (ac−bd) + (ad+bc)i = ${real} + ${imag}i。`;
      } else if (type === 2) {
        // 共轭复数
        const a = rnd(1, 5), b = rnd(1, 5);
        o = opts(`${a}-${b}i`, () => `${a}+${b}i`, () => `-${a}+${b}i`, () => `-${a}-${b}i`);
        q = `复数 z = ${a}+${b}i 的共轭复数是？`;
        exp = `共轭复数实部不变，虚部变号：z̄ = ${a} − ${b}i。`;
      } else {
        // 模长
        const a = rnd(3, 5), b = rnd(3, 5);
        const mod = Math.sqrt(a * a + b * b);
        o = opts(mod.toFixed(1), () => (mod + 1).toFixed(1), () => (mod - 1).toFixed(1), () => (a + b).toFixed(1));
        q = `复数 z = ${a}+${b}i 的模 |z| = ？`;
        exp = `|z| = √(a²+b²) = √(${a*a}+${b*b}) = ${mod.toFixed(1)}。`;
      }
      results.push(Q(q, o, "基础", exp, "复数运算"));
    }
    return results;
  }

  /* ============================================================
   * 22. 分布列与期望方差（十二年级）
   * ============================================================ */
  function qDistExp(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const E = rnd(2, 12);
        o = opts(E * 2, () => E + 1, () => E - 1, () => E);
        q = `随机变量 X 的期望 E(X) = ${E}，则 E(2X) = ？`;
        exp = `E(2X) = 2E(X) = 2 × ${E} = ${E * 2}。`;
      } else if (type === 1) {
        const D = rnd(1, 8);
        o = opts(D * 4, () => D * 2, () => D / 2, () => D + 1);
        q = `随机变量 X 的方差 D(X) = ${D}，则 D(2X) = ？`;
        exp = `D(2X) = 4D(X) = 4 × ${D} = ${D * 4}。`;
      } else if (type === 2) {
        o = opts("所有概率之和为 1", () => "所有概率之和为 0", () => "概率可以为负", () => "概率可以大于 1");
        q = `离散型随机变量分布列的基本性质是？`;
        exp = `分布列性质：所有 P(X=xᵢ) ≥ 0，且 ΣP(X=xᵢ) = 1。`;
      } else if (type === 3) {
        o = opts("E(aX+b) = aE(X)+b", () => "E(aX+b) = aE(X)", () => "E(aX+b) = aE(X)+b²", () => "E(aX+b) = E(X)+b");
        q = `期望的线性性质是？`;
        exp = `E(aX + b) = aE(X) + b。`;
      } else if (type === 4) {
        const E = rnd(1, 8), a = rnd(2, 5), b = rnd(1, 6);
        o = opts(a * E + b, () => a * E, () => E + b, () => a * E - b);
        q = `若 E(X) = ${E}，则 E(${a}X + ${b}) = ？`;
        exp = `E(${a}X+${b}) = ${a}E(X)+${b} = ${a}×${E}+${b} = ${a * E + b}。`;
      } else if (type === 5) {
        const D = rnd(1, 6), a = rnd(2, 5);
        o = opts(a * a * D, () => a * D, () => D, () => a * a + D);
        q = `若 D(X) = ${D}，则 D(${a}X) = ？`;
        exp = `D(${a}X) = ${a}²D(X) = ${a * a}×${D} = ${a * a * D}。`;
      } else if (type === 6) {
        const ex = rnd(2, 8), ey = rnd(1, 7);
        o = opts(ex + ey, () => ex - ey, () => ex * ey, () => Math.max(ex, ey));
        q = `若 E(X)=${ex}、E(Y)=${ey}，则 E(X+Y) = ？`;
        exp = `期望可加：E(X+Y) = E(X)+E(Y) = ${ex}+${ey} = ${ex + ey}。`;
      } else if (type === 7) {
        const D = rnd(1, 8);
        o = opts(D, () => D + 1, () => D * 2, () => 0);
        q = `若 D(X) = ${D}，则常数平移后 D(X + 5) = ？`;
        exp = `方差平移不变：D(X+5) = D(X) = ${D}。`;
      } else if (type === 8) {
        const ex = rnd(2, 8), ex2 = rnd(ex * ex + 1, ex * ex + 20);
        const D = ex2 - ex * ex;
        o = opts(D, () => ex2, () => ex * ex, () => ex2 + ex);
        q = `若 E(X)=${ex}、E(X²)=${ex2}，则 D(X) = ？`;
        exp = `D(X) = E(X²) − [E(X)]² = ${ex2} − ${ex}² = ${D}。`;
      } else {
        const c = rnd(3, 12);
        o = opts(c, () => 0, () => 1, () => c * 2);
        q = `常数随机变量 X ≡ ${c}，则 E(X) = ？`;
        exp = `常数的期望等于自身：E(X) = ${c}。`;
      }
      results.push(Q(q, o, "基础", exp, "分布列与期望方差"));
    }
    return results;
  }

  /* ============================================================
   * 23. 二项分布与正态分布（十二年级）
   * ============================================================ */
  function qDistBinom(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, ans, o, exp;
      if (type === 0) {
        const nt = rnd(2, 14);
        o = opts(nt * 0.5, () => nt * 0.5 + 1, () => nt * 0.5 - 1, () => 0.5);
        q = `X ~ B(${nt}, 0.5)，E(X) = ？`;
        exp = `E(X) = np = ${nt} × 0.5 = ${nt * 0.5}。`;
      } else if (type === 1) {
        const nt = rnd(2, 14);
        o = opts(nt * 0.25, () => nt * 0.25 + 1, () => nt * 0.25 - 1, () => 0.5);
        q = `X ~ B(${nt}, 0.5)，D(X) = ？`;
        exp = `D(X) = np(1−p) = ${nt} × 0.5 × 0.5 = ${nt * 0.25}。`;
      } else if (type === 2) {
        o = opts("关于 μ 对称", () => "关于 σ 对称", () => "关于 0 对称", () => "无对称性");
        q = `正态分布 N(μ, σ²) 的图像关于？对称`;
        exp = `正态曲线关于 μ 对称。`;
      } else if (type === 3) {
        o = opts("μ=0, σ=1", () => "μ=0, σ=0", () => "μ=1, σ=0", () => "μ=1, σ=1");
        q = `标准正态分布 N(0,1) 的参数是？`;
        exp = `标准正态：μ=0，σ=1。`;
      } else if (type === 4) {
        const nt = rnd(2, 14), p = rnd(1, 9) / 10;
        o = opts((nt * p).toFixed(2), () => (nt * (1 - p)).toFixed(2), () => (p).toFixed(2), () => (nt).toFixed(2));
        q = `X ~ B(${nt}, ${p})，E(X) = ？`;
        exp = `E(X) = np = ${nt} × ${p} = ${(nt * p).toFixed(2)}。`;
      } else if (type === 5) {
        const nt = rnd(2, 14), p = rnd(1, 9) / 10;
        o = opts((nt * p * (1 - p)).toFixed(2), () => (nt * p).toFixed(2), () => (nt * (1 - p)).toFixed(2), () => (p * (1 - p)).toFixed(2));
        q = `X ~ B(${nt}, ${p})，D(X) = ？`;
        exp = `D(X) = np(1−p) = ${nt} × ${p} × ${(1 - p).toFixed(1)} = ${(nt * p * (1 - p)).toFixed(2)}。`;
      } else if (type === 6) {
        o = opts("约 68.27%", () => "约 95.45%", () => "约 99.74%", () => "约 50%");
        q = `正态分布 N(μ,σ²) 中，落入 [μ−σ, μ+σ] 的概率约为？`;
        exp = `3σ 原则：约 68.27%。`;
      } else if (type === 7) {
        o = opts("约 95.45%", () => "约 68.27%", () => "约 99.74%", () => "约 34.13%");
        q = `N(μ,σ²) 中，落入 [μ−2σ, μ+2σ] 的概率约为？`;
        exp = `约 95.45%。`;
      } else if (type === 8) {
        const nt = rnd(2, 12), p = rnd(1, 8) / 10;
        o = opts(Math.pow(1 - p, nt).toFixed(3), () => (1 - Math.pow(1 - p, nt)).toFixed(3), () => (nt * p).toFixed(3), () => (p).toFixed(3));
        q = `X ~ B(${nt}, ${p})，则 P(X = 0) = ？`;
        exp = `P(X=0) = C(${nt},0)p⁰(1−p)^${nt} = (1−p)^${nt} = ${Math.pow(1 - p, nt).toFixed(3)}。`;
      } else {
        const mu = rnd(90, 110), sig = rnd(2, 10);
        o = opts(`[${mu - sig}, ${mu + sig}]`, () => `[${mu - 2 * sig}, ${mu + 2 * sig}]`, () => `[${mu}, ${mu + sig}]`, () => `[${mu - sig}, ${mu}]`);
        q = `某指标 X~N(${mu}, ${sig}²)，约 68.27% 的数据落在哪个区间？`;
        exp = `[μ−σ, μ+σ] = [${mu - sig}, ${mu + sig}]。`;
      }
      results.push(Q(q, o, "基础", exp, "二项分布与正态分布"));
    }
    return results;
  }

  /* ============================================================
   * 24. 统计案例（十二年级）
   * ============================================================ */
  function qStatCase(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 平均数
        const vals = [rnd(60, 100), rnd(60, 100), rnd(60, 100), rnd(60, 100)];
        const avg = Math.round(vals.reduce((a, b) => a + b, 0) / 4);
        o = opts(avg, () => avg + 5, () => avg - 5, () => vals[0]);
        q = `数据 ${vals[0]}, ${vals[1]}, ${vals[2]}, ${vals[3]} 的平均数是？`;
        exp = `平均数 = (${vals[0]}+${vals[1]}+${vals[2]}+${vals[3]})/4 = ${avg}。`;
      } else if (type === 1) {
        // 中位数
        const vals = [rnd(10, 50), rnd(51, 90), rnd(91, 130), rnd(131, 170), rnd(171, 200)];
        vals.sort((a, b) => a - b);
        const med = vals[2];
        o = opts(med, () => vals[1], () => vals[3], () => vals[0]);
        q = `数据 ${vals.join(', ')} 的中位数是？`;
        exp = `排序后中间值为 ${med}。`;
      } else if (type === 2) {
        // 方差
        const mean = rnd(50, 100);
        const vals = [mean - rnd(5, 20), mean, mean + rnd(5, 20), mean];
        const variance = Math.round(vals.reduce((s, v) => s + (v - mean) ** 2, 0) / 4);
        o = opts(variance, () => variance + 10, () => variance - 10, () => mean);
        q = `数据 ${vals.join(', ')}（均值 ${mean}）的方差是？`;
        exp = `方差 = [(v₁−μ)²+...+(v₄−μ)²]/4 = ${variance}。`;
      } else {
        // 频率分布
        o = opts("各组频率之和为 1", () => "各组频率之和为 0", () => "各组频数之和为 1", () => "频率可以大于 1");
        q = `频率分布直方图的基本性质是？`;
        exp = `频率分布性质：各组频率之和 = 1，各组频数之和 = 样本容量。`;
      }
      results.push(Q(q, o, "基础", exp, "统计案例"));
    }
    return results;
  }

  /* ============================================================
   * 拓展专题（高中/大学先修）：欧拉公式、泰勒级数、数形结合、
   *       数学归纳法、均值不等式、二项式定理、容斥原理、递推数列
   * ============================================================ */
  function qEuler(n) {
    const results = [];
    const D = [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      const a = pick(D);
      const r = a * Math.PI / 180;
      const cv = Math.cos(r), sv = Math.sin(r);
      const f = (x) => (Math.round(x * 100) / 100).toString();
      const a2 = pick(D), r2 = a2 * Math.PI / 180, cv2 = Math.cos(r2), sv2 = Math.sin(r2);
      if (type === 0) {
        o = opts(`${f(cv)}`, () => `${f(sv)}`, () => `${f(-cv)}`, () => `${f(-sv)}`);
        q = `欧拉公式 e^(i·${a}°) 的实部（即 cos ${a}°）是？`;
        exp = `e^(iθ)=cosθ+i·sinθ，θ=${a}° 时实部 = cos ${a}° = ${f(cv)}。`;
      } else if (type === 1) {
        o = opts(`${f(sv)}`, () => `${f(cv)}`, () => `${f(-sv)}`, () => `${f(-cv)}`);
        q = `欧拉公式 e^(i·${a}°) 的虚部（即 sin ${a}°）是？`;
        exp = `虚部 = sin ${a}° = ${f(sv)}。`;
      } else if (type === 2) {
        o = opts("1", () => `${f(cv)}`, () => `${f(sv)}`, () => `${f(Math.abs(cv) + Math.abs(sv))}`);
        q = `复数 e^(i·${a}°) 的模长 |e^(i·${a}°)| 是？`;
        exp = `|cosθ+i·sinθ| = √(cos²+sin²) = 1，与 ${a}° 无关。`;
      } else if (type === 3) {
        o = opts(`${f(cv)} + i·${f(sv)}`, () => `${f(sv)} + i·${f(cv)}`, () => `${f(-cv)} + i·${f(sv)}`, () => `${f(cv)} − i·${f(sv)}`);
        q = `把 e^(i·${a}°) 写成 a+bi 形式（实部+虚部 i）？`;
        exp = `e^(i·${a}°) = cos ${a}° + i·sin ${a}° = ${f(cv)} + i·${f(sv)}。`;
      } else if (type === 4) {
        o = opts(`${f(cv)} − i·${f(sv)}`, () => `${f(cv)} + i·${f(sv)}`, () => `${f(-cv)} + i·${f(sv)}`, () => `${f(cv)} + i·${f(-sv)}`);
        q = `e^(−i·${a}°) = cos ${a}° − i·sin ${a}° 等于？`;
        exp = `取共轭：e^(−iθ)=cosθ−i·sinθ = ${f(cv)} − i·${f(sv)}。`;
      } else if (type === 5) {
        const k = rnd(2, 5);
        const ang = (a * k) % 360;
        o = opts(`${ang}`, () => `${a}`, () => `${a + k}`, () => `${(a * k * k) % 360}`);
        q = `若 z = e^(i·${a}°)，则 z^${k} 的辐角（角度，模 360）是？`;
        exp = `z^k = e^(i·${a}°·${k})，辐角为 ${a * k}° ≡ ${ang}°（模 360）。`;
      } else if (type === 6) {
        const ang = (a + a2) % 360;
        o = opts(`${ang}`, () => `${a}`, () => `${a2}`, () => `${(a + 360 - a2) % 360}`);
        q = `e^(i·${a}°) · e^(i·${a2}°) 的辐角（角度，模 360）是？`;
        exp = `相乘辐角相加：${a}° + ${a2}° = ${a + a2}° ≡ ${ang}°（模 360）。`;
      } else if (type === 7) {
        const diff = (a - a2 + 360) % 360;
        o = opts(`${diff}`, () => `${a}`, () => `${a2}`, () => `${(a + a2) % 360}`);
        q = `e^(i·${a}°) / e^(i·${a2}°) 的辐角（角度，取 [0,360)）是？`;
        exp = `相除辐角相减：${a}° − ${a2}° = ${a - a2}°，归一到 [0,360) 为 ${diff}°。`;
      } else if (type === 8) {
        o = opts(`${f(cv2)} + i·${f(sv2)}`, () => `${f(cv2)} − i·${f(sv2)}`, () => `${f(-cv2)} + i·${f(sv2)}`, () => `${f(cv)} + i·${f(sv)}`);
        q = `e^(i·${a2}°) 的 a+bi 形式是？`;
        exp = `e^(i·${a2}°) = cos ${a2}° + i·sin ${a2}° = ${f(cv2)} + i·${f(sv2)}。`;
      } else {
        o = opts(`${f(Math.cos(2 * r))}`, () => `${f(cv)}`, () => `${f(sv)}`, () => `${f(Math.cos(r / 2))}`);
        q = `e^(i·${a}°) 的平方 e^(i·${2 * a}°) 的实部是？`;
        exp = `e^(i·2θ) 实部 = cos(2θ)，θ=${a}° 时为 ${f(Math.cos(2 * r))}。`;
      }
      results.push(Q(q, o, "基础", exp, "欧拉公式", "euler_circle"));
    }
    return results;
  }

  function qTaylor(n) {
    const results = [];
    const fact = (m) => { let p = 1; for (let j = 2; j <= m; j++) p *= j; return p; };
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const m = rnd(2, 12), c = rnd(1, 5);
        const ans = `${Math.pow(c, m)}/${fact(m)}`;
        o = opts(ans, () => `1/${fact(m)}`, () => `${Math.pow(c, m - 1)}/${fact(m - 1)}`, () => `${Math.pow(c, m)}`);
        q = `e^(${c}x) 的麦克劳林展开中 x^${m} 项的系数是？`;
        exp = `e^(${c}x)=Σ (${c}ⁿxⁿ)/n!，x^${m} 系数 = ${c}^${m}/${m}! = ${ans}。`;
      } else if (type === 1) {
        const m = rnd(2, 12), c = rnd(1, 5);
        let ans;
        if (m % 2 === 0) ans = "0";
        else { const sign = ((m - 1) / 2) % 2 === 0 ? "" : "−"; ans = `${sign}${Math.pow(c, m)}/${fact(m)}`; }
        o = opts(ans, () => "0", () => `${c}/${fact(m)}`, () => `${((m - 1) / 2) % 2 === 0 ? "−" : ""}${Math.pow(c, m)}/${fact(m)}`);
        q = `sin(${c}x) 的麦克劳林展开中 x^${m} 项的系数是？`;
        exp = `sin x 只含奇次幂；sin(${c}x) 中 x^${m} 系数 = ${ans}。`;
      } else if (type === 2) {
        const m = rnd(2, 12), c = rnd(1, 5);
        let ans;
        if (m % 2 === 1) ans = "0";
        else { const sign = (m / 2) % 2 === 0 ? "" : "−"; ans = `${sign}${Math.pow(c, m)}/${fact(m)}`; }
        o = opts(ans, () => "0", () => `${c}/${fact(m)}`, () => `${(m / 2) % 2 === 0 ? "−" : ""}${Math.pow(c, m)}/${fact(m)}`);
        q = `cos(${c}x) 的麦克劳林展开中 x^${m} 项的系数是？`;
        exp = `cos x 只含偶次幂；cos(${c}x) 中 x^${m} 系数 = ${ans}。`;
      } else if (type === 3) {
        const m = rnd(2, 12), c = rnd(1, 5);
        const sign = (m - 1) % 2 === 0 ? "" : "−";
        const ans = `${sign}${Math.pow(c, m)}/${m}`;
        o = opts(ans, () => `${Math.pow(c, m)}/${m}`, () => `${sign}${Math.pow(c, m - 1)}/${m - 1}`, () => `${sign}${Math.pow(c, m)}`);
        q = `ln(1+${c}x) 的麦克劳林展开中 x^${m} 项的系数是？`;
        exp = `ln(1+${c}x) = Σ (−1)^{n−1} (${c}x)ⁿ/n，x^${m} 系数 = ${ans}。`;
      } else if (type === 4) {
        const m = rnd(2, 12), c = rnd(1, 5);
        const ans = `${Math.pow(c, m)}`;
        o = opts(ans, () => `1`, () => `${Math.pow(c, m - 1)}`, () => `${fact(m)}`);
        q = `把 1/(1−${c}x) 展开成幂级数，x^${m} 项的系数是？`;
        exp = `等比级数 1/(1−${c}x) = 1 + ${c}x + ${c}²x² + …，x^${m} 系数 = ${c}^${m} = ${ans}。`;
      } else if (type === 5) {
        const mm = rnd(3, 9), k = rnd(1, mm - 1), c = rnd(1, 5);
        let C = 1; for (let j = 0; j < k; j++) C = C * (mm - j) / (j + 1);
        const ans = `${C * Math.pow(c, k)}`;
        o = opts(ans, () => `${C}`, () => `${C + 1}`, () => `${mm}`);
        q = `(1+${c}x)^${mm} 的二项展开中 x^${k} 项的系数是？`;
        exp = `二项式系数 C(${mm},${k}) · ${c}^${k} = ${C}·${Math.pow(c, k)} = ${ans}。`;
      } else if (type === 6) {
        const m = rnd(2, 12), c = rnd(1, 5);
        const ans = `${Math.pow(-c, m)}`;
        o = opts(ans, () => `${Math.pow(c, m)}`, () => `1`, () => `${Math.pow(c, m - 1)}`);
        q = `把 1/(1+${c}x) 展开成幂级数，x^${m} 项的系数是？`;
        exp = `1/(1+${c}x) = Σ (−${c})ⁿxⁿ，x^${m} 系数 = (−${c})^${m} = ${ans}。`;
      } else if (type === 7) {
        const mm = rnd(3, 9), k = rnd(1, mm - 1), c = rnd(1, 5);
        let C = 1; for (let j = 0; j < k; j++) C = C * (mm - j) / (j + 1);
        const sign = (k % 2 === 0) ? "" : "−";
        const ans = `${sign}${C * Math.pow(c, k)}`;
        o = opts(ans, () => `${C * Math.pow(c, k)}`, () => `−${C * Math.pow(c, k)}`, () => `${mm}`);
        q = `(1−${c}x)^${mm} 的二项展开中 x^${k} 项的系数是？`;
        exp = `(1−${c}x)^${mm} = Σ (−${c})^k C(${mm},k) x^k，x^${k} 系数 = ${ans}。`;
      } else if (type === 8) {
        const m = rnd(2, 12);
        o = opts("1", () => "0", () => `${m}`, () => `${fact(m)}`);
        q = `函数 f(x)=x^${m} 的麦克劳林展开中 x^${m} 项的系数是？`;
        exp = `单项式 x^${m} 本身就是其自身的展开，x^${m} 系数 = 1。`;
      } else {
        const m = rnd(2, 12), nn = rnd(1, 12);
        const bad = (nn === m);
        o = opts(bad ? "1" : "0", () => "1", () => `${m}`, () => `${nn}`);
        q = `函数 f(x)=x^${m} 的麦克劳林展开中 x^${nn} 项（${bad ? "n=m" : "n≠m"}）的系数是？`;
        exp = `x^${m} 只含一项，当 ${nn} = ${m} 时系数为 1，否则为 0，故为 ${bad ? "1" : "0"}。`;
      }
      results.push(Q(q, o, "进阶", exp, "泰勒级数", "taylor_graph"));
    }
    return results;
  }

  function qNumShape(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const A = rnd(2, 9);
        o = opts(`点 ${A}`, () => "原点", () => "点 0", () => "点 x");
        q = `|x − ${A}| 的几何意义是数轴上点 x 到哪里的距离？`;
        exp = `|x − a| 表示点 x 到点 a 的距离，故 |x−${A}| 是到 ${A} 的距离。`;
      } else if (type === 1) {
        const r = rnd(2, 9), A = r * r;
        o = opts(`x < −${r} 或 x > ${r}`, () => `−${r} < x < ${r}`, () => `x > ${r}`, () => `x < −${r}`);
        q = `用数形结合解不等式 x² − ${A} > 0，解集是？`;
        exp = `抛物线 y = x² − ${A} 在 x 轴上方时 x² > ${A} = ${r}²，即 x < −${r} 或 x > ${r}。`;
      } else if (type === 2) {
        const p = rnd(1, 6), q2 = rnd(1, 6);
        o = opts(`${p} 和 ${q2}`, () => `${p} 和 −${q2}`, () => `−${p} 和 ${q2}`, () => `${p + q2}`);
        q = `函数 f(x) = x² − ${p + q2}x + ${p * q2} 的零点（与 x 轴交点横坐标）是？`;
        exp = `x² − ${p + q2}x + ${p * q2} = (x−${p})(x−${q2}) = 0 → x = ${p} 或 x = ${q2}。`;
      } else if (type === 3) {
        const sx = rnd(1, 6) * (Math.random() < 0.5 ? -1 : 1);
        const sy = rnd(1, 6) * (Math.random() < 0.5 ? -1 : 1);
        let quad;
        if (sx > 0 && sy > 0) quad = "第一象限";
        else if (sx < 0 && sy > 0) quad = "第二象限";
        else if (sx < 0 && sy < 0) quad = "第三象限";
        else quad = "第四象限";
        o = opts(quad, () => "第一象限", () => "第二象限", () => "第三象限", () => "第四象限");
        q = `点 (${sx}, ${sy}) 在平面直角坐标系位于？`;
        exp = `x=${sx > 0 ? "正" : "负"}、y=${sy > 0 ? "正" : "负"}，属于${quad}。`;
      } else if (type === 4) {
        const A = rnd(2, 9);
        o = opts("0", () => `${A}`, () => `−${A}`, () => "不存在");
        q = `用数形结合看函数 y = |x − ${A}| 的最小值是？`;
        exp = `V 形图像顶点在 x=${A} 处，最小值为 0。`;
      } else if (type === 5) {
        const A = rnd(1, 9), B = rnd(1, 9);
        const d = Math.abs(A - B);
        o = opts(`${d}`, () => `${A + B}`, () => `${Math.min(A, B)}`, () => `${d + 1}`);
        q = `数轴上点 ${A} 与点 ${B} 之间的距离是？`;
        exp = `两点距离 = |${A} − ${B}| = ${d}。`;
      } else if (type === 6) {
        const A = rnd(2, 9), R = rnd(2, 8);
        o = opts(`${A - R} < x < ${A + R}`, () => `x < ${A - R} 或 x > ${A + R}`, () => `x = ${A}`, () => `x > ${A + R}`);
        q = `用数形结合解不等式 |x − ${A}| < ${R}，解集是？`;
        exp = `|x−${A}| < ${R} ⇔ −${R} < x−${A} < ${R} ⇔ ${A - R} < x < ${A + R}。`;
      } else if (type === 7) {
        const a = rnd(1, 4) * (Math.random() < 0.5 ? -1 : 1);
        const b = rnd(1, 6), c = rnd(1, 6);
        const dir = a > 0 ? "向上" : "向下";
        o = opts(dir, () => a > 0 ? "向下" : "向上", () => "向左", () => "向右");
        q = `抛物线 y = ${a}x² ${b >= 0 ? "+ " + b + "x" : "− " + (-b) + "x"} ${c >= 0 ? "+ " + c : "− " + (-c)} 的开口朝向是？`;
        exp = `二次项系数 a = ${a} ${a > 0 ? "> 0" : "< 0"}，抛物线开口${dir}。`;
      } else if (type === 8) {
        const A = rnd(1, 6), B = rnd(1, 6), R = rnd(2, 6);
        o = opts(`(${A}, ${B})`, () => `(${A}, 0)`, () => `(0, ${B})`, () => `(${A + R}, ${B})`);
        q = `圆 (x − ${A})² + (y − ${B})² = ${R * R} 的圆心坐标是？`;
        exp = `标准圆方程 (x−a)²+(y−b)²=r² 的圆心为 (a,b) = (${A}, ${B})。`;
      } else {
        const A = rnd(1, 9), B = rnd(1, 9);
        o = opts(`${B}`, () => `${A}`, () => `0`, () => `${-B}`);
        q = `直线 y = ${A}x + ${B} 与 y 轴交点的纵坐标是？`;
        exp = `令 x=0，得 y = ${B}，故与 y 轴交点纵坐标为 ${B}。`;
      }
      results.push(Q(q, o, "基础", exp, "数形结合", "numshape_coord"));
    }
    return results;
  }

  function qInduction(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const N = rnd(1, 12);
        o = opts(`验证 n = ${N} 时命题成立`, () => `令 n → ∞`, () => `证明 n = k+1`, () => "直接写结论");
        q = `用数学归纳法证明命题，第一步（奠基）通常先验证 n = ${N} 时命题成立，这步叫？`;
        exp = `第一步验证起始值（如 n=${N}）时命题成立，称为奠基步骤。`;
      } else if (type === 1) {
        const k = rnd(1, 12);
        o = opts(`由 n = ${k} 成立推出 n = ${k + 1} 成立`, () => `由 n = 1 推出 n = 2`, () => `证明 n = ${k} 成立`, () => "令 n → ∞");
        q = `归纳法第二步（递推）：假设 n = ${k} 时成立，要证明的是？`;
        exp = `假设 n=${k} 成立，推出 n=${k + 1} 也成立，形成递推链条。`;
      } else if (type === 2) {
        const N = rnd(5, 40);
        const s = N * (N + 1) / 2;
        o = opts(`${s}`, () => `${s + 1}`, () => `${s - 1}`, () => `${N * N}`);
        q = `由归纳法公式 1 + 2 + … + ${N} = ？`;
        exp = `公式 n(n+1)/2，${N}×${N + 1}/2 = ${s}。`;
      } else if (type === 3) {
        const N = rnd(1, 12);
        o = opts(`${Math.pow(2, N + 1) - 1}`, () => `${Math.pow(2, N + 1)}`, () => `${Math.pow(2, N)}`, () => `${Math.pow(2, N) - 1}`);
        q = `等比数列求和：2⁰ + 2¹ + … + 2^${N} = ？`;
        exp = `首项 1、公比 2 的等比和 = 2^${N + 1} − 1。`;
      } else if (type === 4) {
        const N = rnd(2, 25);
        o = opts(`${N * N}`, () => `${N * (N + 1)}`, () => `${N * (N + 1) / 2}`, () => `${2 * N - 1}`);
        q = `前 ${N} 个正奇数之和 1 + 3 + 5 + … + (2·${N} − 1) = ？`;
        exp = `前 n 个奇数和 = n²，故为 ${N}² = ${N * N}。`;
      } else if (type === 5) {
        const N = rnd(2, 25);
        o = opts(`${N * (N + 1)}`, () => `${N * N}`, () => `${N * (N + 1) / 2}`, () => `${2 * N}`);
        q = `前 ${N} 个正偶数之和 2 + 4 + … + 2·${N} = ？`;
        exp = `前 n 个偶数和 = n(n+1)，故为 ${N}(${N}+1) = ${N * (N + 1)}。`;
      } else if (type === 6) {
        const N = rnd(2, 40);
        const s = N * (N + 1) * (2 * N + 1) / 6;
        o = opts(`${s}`, () => `${s + 1}`, () => `${N * (N + 1) / 2}`, () => `${N * N}`);
        q = `平方和公式：1² + 2² + … + ${N}² = ？`;
        exp = `平方和 = n(n+1)(2n+1)/6，代入得 ${s}。`;
      } else if (type === 7) {
        const k = rnd(1, 12);
        o = opts(`n = ${k} 时的命题（归纳假设）`, () => `n = 1 时`, () => `n = ${k + 1} 时`, () => "结论本身");
        q = `归纳递推中「假设 n = ${k} 时命题成立」这一步中的假设称为？`;
        exp = `该假设称为归纳假设，是递推的桥梁。`;
      } else if (type === 8) {
        const N = rnd(2, 5);
        o = opts(`所有 n ≥ 1 的正整数`, () => `仅 n = 1`, () => `仅 n ≤ ${N}`, () => "所有实数");
        q = `若 P(1) 成立，且「P(k) 成立 ⇒ P(k+1) 成立」，则可推出命题对？成立`;
        exp = `由奠基与递推，归纳法可推出对一切正整数 n ≥ 1 成立。`;
      } else {
        const N = rnd(3, 7);
        o = opts(`${N * N}`, () => `${N * (N + 1)}`, () => `${2 * N - 1}`, () => `${N}`);
        q = `用归纳法可证 1 + 3 + … + (2·${N} − 1) = ？`;
        exp = `前 ${N} 个奇数和 = ${N}² = ${N * N}。`;
      }
      results.push(Q(q, o, "基础", exp, "数学归纳法", "induction_steps"));
    }
    return results;
  }

  function qAmGm(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const A = rnd(2, 12);
        const m = (2 * Math.sqrt(A)).toFixed(2);
        o = opts(`${m}`, () => `${(Math.sqrt(A)).toFixed(2)}`, () => `${A}`, () => `${(A + 1).toFixed(2)}`);
        q = `x > 0 时，x + ${A}/x 的最小值（用均值不等式）是？`;
        exp = `x + ${A}/x ≥ 2√(x·${A}/x) = 2√${A} ≈ ${m}，当 x = √${A} 时取等。`;
      } else if (type === 1) {
        const A = rnd(2, 6), B = rnd(2, 6);
        const m = (2 * Math.sqrt(A * B)).toFixed(2);
        o = opts(`${m}`, () => `${(Math.sqrt(A * B)).toFixed(2)}`, () => `${A + B}`, () => `${(A * B).toFixed(2)}`);
        q = `x > 0 时，${A}x + ${B}/x 的最小值是？`;
        exp = `${A}x + ${B}/x ≥ 2√(${A}·${B}) ≈ ${m}。`;
      } else if (type === 2) {
        const C = rnd(2, 12);
        const m = (C * C / 4).toFixed(2);
        o = opts(`${m}`, () => `${C}`, () => `${(C * C).toFixed(2)}`, () => `${(C / 2).toFixed(2)}`);
        q = `正数 x 满足 0 < x < ${C} 时，x(${C} − x) 的最大值是？`;
        exp = `x(${C}−x) ≤ (${C}/2)² = ${m}，当 x = ${C}/2 时取等。`;
      } else if (type === 3) {
        const a = rnd(2, 9), b = rnd(2, 9);
        const am = ((a + b) / 2).toFixed(2), gm = (Math.sqrt(a * b)).toFixed(2);
        o = opts(`算术平均 ≥ 几何平均 (${am} ≥ ${gm})`, () => `算术平均 < 几何平均`, () => `相等`, () => `无法确定`);
        q = `对正数 a = ${a}, b = ${b}：比较算术平均 (a+b)/2 与几何平均 √(ab)？`;
        exp = `均值不等式：算术平均 ≥ 几何平均，此处 ${am} ≥ ${gm}。`;
      } else if (type === 4) {
        const A = rnd(2, 9), B = rnd(2, 9);
        o = opts(`a = b`, () => `a + b = 0`, () => `任意正数`, () => `a = 0`);
        q = `正数 a、b 满足 a + b = ${A + B}，则 ab 在何时取最大值？`;
        exp = `和定积最大：当 a = b = ${(A + B) / 2} 时 ab 最大。`;
      } else if (type === 5) {
        const A = rnd(2, 8);
        const m = (2 * A).toFixed(2);
        o = opts(`${m}`, () => `${A}`, () => `${(A * A).toFixed(2)}`, () => `${(2 * Math.sqrt(A)).toFixed(2)}`);
        q = `x > 0 时，x² + ${A * A}/x² 的最小值是？`;
        exp = `x² + ${A * A}/x² ≥ 2·${A} = ${m}（令 t=x²，t + ${A * A}/t ≥ 2${A}）。`;
      } else if (type === 6) {
        const S = rnd(4, 14);
        const m = (S * S / 4).toFixed(2);
        o = opts(`${m}`, () => `${S}`, () => `${(S * S).toFixed(2)}`, () => `${(S / 2).toFixed(2)}`);
        q = `a, b > 0 且 a + b = ${S}，则 ab 的最大值是？`;
        exp = `和定积最大：ab ≤ (${S}/2)² = ${m}。`;
      } else if (type === 7) {
        const P = rnd(2, 12);
        const m = (2 * Math.sqrt(P)).toFixed(2);
        o = opts(`${m}`, () => `${P}`, () => `${(Math.sqrt(P)).toFixed(2)}`, () => `${(P + 1).toFixed(2)}`);
        q = `a, b > 0 且 ab = ${P}，则 a + b 的最小值是？`;
        exp = `积定和最小：a + b ≥ 2√${P} ≈ ${m}。`;
      } else if (type === 8) {
        o = opts("a = b = c", () => "a + b + c = 0", () => "任意正数", () => "a = 0");
        q = `三元均值不等式 a + b + c ≥ 3·³√(abc) 等号成立的条件是？`;
        exp = `三元均值不等式等号当且仅当 a = b = c 时成立。`;
      } else {
        const B = rnd(2, 8), C = rnd(1, 9);
        const m = (2 * Math.sqrt(B) + C).toFixed(2);
        o = opts(`${m}`, () => `${(Math.sqrt(B) + C).toFixed(2)}`, () => `${(2 * B + C).toFixed(2)}`, () => `${C}`);
        q = `x > 0 时，x + ${B}/x + ${C} 的最小值是？`;
        exp = `x + ${B}/x ≥ 2√${B}，故整体最小值 ≈ 2√${B} + ${C} = ${m}。`;
      }
      results.push(Q(q, o, "进阶", exp, "均值不等式", "amgm_rect"));
    }
    return results;
  }

  function qBinomial(n) {
    const results = [];
    const comb = (N, K) => { let c = 1; for (let j = 0; j < K; j++) c = c * (N - j) / (j + 1); return c; };
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const N = rnd(2, 9);
        o = opts(`${N + 1}`, () => `${N}`, () => `${2 * N}`, () => `${N - 1}`);
        q = `(a + b)^${N} 展开后共有多少项？`;
        exp = `从 a^${N}, a^${N - 1}b, … 到 b^${N} 共 ${N} + 1 = ${N + 1} 项。`;
      } else if (type === 1) {
        const N = rnd(3, 8), k = rnd(1, N - 1);
        const c = comb(N, k);
        o = opts(`${c}`, () => `${c + 1}`, () => `${c - 1}`, () => `${N}`);
        q = `(a + b)^${N} 展开中 a^${N - k}b^${k} 项的系数是？`;
        exp = `该系数为二项式系数 C(${N},${k}) = ${c}。`;
      } else if (type === 2) {
        const N = rnd(4, 9), k = rnd(2, N - 1);
        const c = comb(N, k);
        o = opts(`${c}`, () => `${c + 1}`, () => `${c - 1}`, () => `${N}`);
        q = `(1 + x)^${N} 展开式中 x^${k} 项的系数是？`;
        exp = `x^${k} 系数 = C(${N},${k}) = ${c}。`;
      } else if (type === 3) {
        const N = rnd(3, 8);
        o = opts("1", () => `${N}`, () => `${N + 1}`, () => "0");
        q = `(x + 1)^${N} 展开式的常数项（x⁰ 项）是？`;
        exp = `取 x⁰ 项：C(${N},${N})·x⁰·1^${N} = 1，常数项为 1。`;
      } else if (type === 4) {
        const N = rnd(2, 9);
        o = opts(`2^${N}`, () => `${N}`, () => `${N + 1}`, () => `${2 * N}`);
        q = `(a + b)^${N} 各项二项式系数（即 C(${N},k) 之和）是？`;
        exp = `令 a = b = 1，得系数和 = (1+1)^${N} = 2^${N}。`;
      } else if (type === 5) {
        const N = rnd(3, 9);
        o = opts(`2^${N - 1}`, () => `2^${N}`, () => `${N}`, () => `2^${N + 1}`);
        q = `(a + b)^${N} 展开中奇数项（第 1,3,5,… 项）二项式系数之和是？`;
        exp = `(1+1)^${N} 与 (1−1)^${N} 相减/相加可得奇偶项和均为 2^${N - 1}。`;
      } else if (type === 6) {
        const N = rnd(4, 10);
        const mid = N >> 1;
        const c = comb(N, mid);
        o = opts(`${c}`, () => `${c - 1}`, () => `${c + 1}`, () => `${N}`);
        q = `(a + b)^${N} 展开中二项式系数最大的那一项系数是？`;
        exp = `中间项系数最大：C(${N},${mid}) = ${c}。`;
      } else if (type === 7) {
        const N = rnd(3, 8), k = rnd(1, N - 1);
        const c = comb(N, k);
        const sign = (k % 2 === 0) ? "" : "−";
        o = opts(`${sign}${c}`, () => `${c}`, () => `−${c}`, () => `${N}`);
        q = `(1 − x)^${N} 展开中 x^${k} 项的系数是？`;
        exp = `(1−x)^${N} = Σ (−1)^k C(${N},k) x^k，x^${k} 系数 = ${sign}${c}。`;
      } else if (type === 8) {
        const N = rnd(3, 7), k = rnd(1, N - 1);
        const c = comb(N, k);
        const val = c * Math.pow(2, N - k);
        o = opts(`${val}`, () => `${c}`, () => `${c * Math.pow(2, k)}`, () => `${N}`);
        q = `(x + 2)^${N} 展开中 x^${k} 项的系数是？`;
        exp = `项为 C(${N},${k})·x^${k}·2^${N - k}，系数 = ${c}·2^${N - k} = ${val}。`;
      } else {
        const N = rnd(2, 7);
        o = opts(`${Math.pow(3, N)}`, () => `${Math.pow(2, N)}`, () => `${N}`, () => `${Math.pow(3, N) + 1}`);
        q = `(2x + 3)^${N} 展开中的常数项（x⁰ 项）是？`;
        exp = `x⁰ 项 = C(${N},${N})·(2x)⁰·3^${N} = 3^${N} = ${Math.pow(3, N)}。`;
      }
      results.push(Q(q, o, "进阶", exp, "二项式定理", "binomial_triangle"));
    }
    return results;
  }

  function qInclusion(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const A = rnd(10, 30), B = rnd(10, 30), I = rnd(1, Math.min(A, B));
        o = opts(`${A + B - I}`, () => `${A + B}`, () => `${I}`, () => `${A + B + I}`);
        q = `班中 ${A} 人会英语、${B} 人会日语，两种都会的 ${I} 人，至少会一种的有几人？`;
        exp = `${A} + ${B} − ${I} = ${A + B - I}（人）。容斥：会英 + 会日 − 都会。`;
      } else if (type === 1) {
        const A = rnd(5, 20), B = rnd(5, 20);
        o = opts(`|A| + |B| − |A∩B|`, () => `|A| + |B|`, () => `|A|·|B|`, () => `|A∩B|`);
        q = `集合 A 有 ${A} 个元素、B 有 ${B} 个元素，两集合容斥原理 |A∪B| = ？`;
        exp = `|A∪B| = |A| + |B| − |A∩B|，减去重复计数的交集。`;
      } else if (type === 2) {
        const A = rnd(5, 15), B = rnd(5, 15), C = rnd(5, 15);
        o = opts(`+ |A∩B∩C|`, () => `0`, () => `− |A∩B∩C|`, () => `|A|·|B|·|C|`);
        q = `三集合 A(${A}个)、B(${B}个)、C(${C}个)，|A∪B∪C| = |A|+|B|+|C| − (两两交之和) + ？`;
        exp = `加回被多减一次的三者交集 |A∩B∩C|。`;
      } else if (type === 3) {
        const N = rnd(50, 120), a = rnd(2, 4), b = rnd(4, 7);
        const cnt = Math.floor(N / a) + Math.floor(N / b) - Math.floor(N / (a * b));
        o = opts(`${cnt}`, () => `${Math.floor(N / a) + Math.floor(N / b)}`, () => `${Math.floor(N / a)}`, () => `${cnt + 1}`);
        q = `1 到 ${N} 中能被 ${a} 或 ${b} 整除的数共有几个？`;
        exp = `被${a}整除 ${Math.floor(N / a)} 个、被${b}整除 ${Math.floor(N / b)} 个、被${a * b}整除 ${Math.floor(N / (a * b))} 个 → 容斥得 ${cnt}。`;
      } else if (type === 4) {
        const N = rnd(50, 120), a = rnd(2, 4), b = rnd(4, 7);
        const cnt = Math.floor(N / a) + Math.floor(N / b) - Math.floor(N / (a * b));
        o = opts(`${N - cnt}`, () => `${cnt}`, () => `${N}`, () => `${N - cnt - 1}`);
        q = `1 到 ${N} 中既不能被 ${a} 整除也不能被 ${b} 整除的数有几个？`;
        exp = `总数 ${N} 减去「能被 ${a} 或 ${b} 整除」的 ${cnt} 个，余 ${N - cnt} 个。`;
      } else if (type === 5) {
        const A = rnd(10, 20), B = rnd(10, 20), C = rnd(10, 20);
        const ab = rnd(1, Math.min(A, B)), ac = rnd(1, Math.min(A, C)), bc = rnd(1, Math.min(B, C)), abc = rnd(1, Math.min(ab, bc, ac));
        const u = A + B + C - (ab + ac + bc) + abc;
        o = opts(`${u}`, () => `${A + B + C}`, () => `${A + B + C - (ab + ac + bc)}`, () => `${u - 1}`);
        q = `|A|=${A},|B|=${B},|C|=${C}，两两交 ${ab},${ac},${bc}，三者交 ${abc}，则 |A∪B∪C| = ？`;
        exp = `三集合容斥：${A}+${B}+${C}−(${ab}+${ac}+${bc})+${abc} = ${u}。`;
      } else if (type === 6) {
        const A = rnd(10, 30), B = rnd(10, 30), I = rnd(1, Math.min(A, B));
        o = opts(`${A - I}`, () => `${A}`, () => `${I}`, () => `${B - I}`);
        q = `班中 ${A} 人会英语、${B} 人会日语、都会 ${I} 人，则只会英语的有几人？`;
        exp = `会英语中扣除也会日语的：${A} − ${I} = ${A - I} 人。`;
      } else if (type === 7) {
        const A = rnd(10, 30), B = rnd(10, 30), U = rnd(A + B - 10, A + B + 5);
        const inter = A + B - U;
        o = opts(`${inter}`, () => `${A}`, () => `${B}`, () => `${U}`);
        q = `|A|=${A},|B|=${B},|A∪B|=${U}，则由容斥 |A∩B| = ？`;
        exp = `|A∩B| = |A|+|B|−|A∪B| = ${A}+${B}−${U} = ${inter}。`;
      } else if (type === 8) {
        const A = rnd(8, 16), B = rnd(8, 16), C = rnd(8, 16);
        const ab = rnd(1, Math.min(A, B)), ac = rnd(1, Math.min(A, C)), bc = rnd(1, Math.min(B, C)), abc = rnd(1, Math.min(ab, ac, bc));
        const u = A + B + C - (ab + ac + bc) + abc;
        o = opts(`${u}`, () => `${A + B + C}`, () => `${u + 1}`, () => `${A + B + C - abc}`);
        q = `三集合 |A|=${A},|B|=${B},|C|=${C}，两两交 ${ab}/${ac}/${bc}，三者交 ${abc}，并集大小是？`;
        exp = `|A∪B∪C| = ${A}+${B}+${C}−${ab}−${ac}−${bc}+${abc} = ${u}。`;
      } else {
        const A = rnd(10, 30), B = rnd(10, 30), I = rnd(1, Math.min(A, B));
        o = opts(`${A + B - I}`, () => `${A}`, () => `${B}`, () => `${I}`);
        q = `总体 ${A + B} 人中，会英语 ${A} 人、会日语 ${B} 人、都会 ${I} 人，则两种都不会的有几人？`;
        exp = `至少会一种 = ${A}+${B}−${I} = ${A + B - I}，两种都不会 = ${A + B} − ${A + B - I} = ${I} 人。`;
      }
      results.push(Q(q, o, "进阶", exp, "容斥原理", "inclusion_venn"));
    }
    return results;
  }

  function qRecurrence(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const A = rnd(1, 5), r = rnd(2, 4), N = rnd(3, 6);
        const val = A * Math.pow(r, N - 1);
        o = opts(`${val}`, () => `${A * Math.pow(r, N)}`, () => `${val + 1}`, () => `${A + (N - 1) * r}`);
        q = `等比数列 a₁ = ${A}，a_{n+1} = ${r}a_n，则 a_${N} = ？`;
        exp = `a_n = ${A}·${r}^{n−1}，a_${N} = ${A}·${r}^{${N}−1} = ${val}。`;
      } else if (type === 1) {
        const A = rnd(1, 5), d = rnd(2, 6), N = rnd(3, 7);
        const val = A + (N - 1) * d;
        o = opts(`${val}`, () => `${A + N * d}`, () => `${val - 1}`, () => `${A * N}`);
        q = `等差数列 a₁ = ${A}，a_{n+1} = a_n + ${d}，则 a_${N} = ？`;
        exp = `a_n = ${A} + (n−1)·${d}，a_${N} = ${A} + ${N - 1}·${d} = ${val}。`;
      } else if (type === 2) {
        const A = rnd(1, 4), r = rnd(2, 3), c = rnd(1, 4), N = rnd(3, 6);
        let v = A; for (let j = 1; j < N; j++) v = v * r + c;
        o = opts(`${v}`, () => `${v + 1}`, () => `${A * Math.pow(r, N - 1)}`, () => `${v - 1}`);
        q = `数列 a₁ = ${A}，a_{n+1} = ${r}a_n + ${c}，则 a_${N} = ？`;
        exp = `逐项递推 ${N - 1} 次得 a_${N} = ${v}。`;
      } else if (type === 3) {
        const A = rnd(1, 5), B = rnd(6, 12), N = rnd(3, 6);
        const d = B - A, val = A + (N - 1) * d;
        o = opts(`${val}`, () => `${val + 1}`, () => `${A + N * d}`, () => `${B}`);
        q = `等差数列 a₁ = ${A}, a₂ = ${B}（公差 ${d}），则 a_${N} = ？`;
        exp = `公差 d = ${B}−${A} = ${d}，a_${N} = ${A} + ${N - 1}·${d} = ${val}。`;
      } else if (type === 4) {
        const A = rnd(1, 5), r = rnd(2, 4), N = rnd(3, 6);
        const val = A * (1 - Math.pow(r, N)) / (1 - r);
        o = opts(`${val}`, () => `${val + 1}`, () => `${A * Math.pow(r, N)}`, () => `${A * N}`);
        q = `等比数列 a₁ = ${A}，公比 ${r}，则前 ${N} 项和 S_${N} = ？`;
        exp = `S_${N} = ${A}(1−${r}^${N})/(1−${r}) = ${val}。`;
      } else if (type === 5) {
        const A = rnd(1, 4), B = rnd(1, 4), N = rnd(4, 7);
        let x = A, y = B; for (let j = 3; j <= N; j++) { const t = x + y; x = y; y = t; }
        o = opts(`${y}`, () => `${y + 1}`, () => `${x}`, () => `${A + B}`);
        q = `数列 a₁ = ${A}, a₂ = ${B}，且 a_{n+2} = a_{n+1} + a_n（类斐波那契），则 a_${N} = ？`;
        exp = `递推得 a_${N} = ${y}。`;
      } else if (type === 6) {
        const X = rnd(5, 20), d = rnd(2, 6), m = rnd(2, 5), k = rnd(1, 4);
        o = opts(`${X + k * d}`, () => `${X + (k - 1) * d}`, () => `${X}`, () => `${X * 2}`);
        q = `等差数列中已知 a_${m} = ${X}，公差 ${d}，则 a_${m + k} = ？`;
        exp = `a_${m + k} = a_${m} + ${k}·${d} = ${X} + ${k * d} = ${X + k * d}。`;
      } else if (type === 7) {
        const A = rnd(1, 5), d = rnd(2, 6), N = rnd(3, 7);
        const val = N * (2 * A + (N - 1) * d) / 2;
        o = opts(`${val}`, () => `${val + 1}`, () => `${A * N + d}`, () => `${N * (A + (N - 1) * d)}`);
        q = `等差数列 a₁ = ${A}，公差 ${d}，则前 ${N} 项和 S_${N} = ？`;
        exp = `S_${N} = ${N}(2·${A} + (${N}−1)·${d})/2 = ${val}。`;
      } else if (type === 8) {
        const r = rnd(2, 4), N = rnd(3, 6), Y = rnd(8, 40);
        const a1 = Y / Math.pow(r, N - 1);
        o = opts(`${a1}`, () => `${a1 + 1}`, () => `${Y}`, () => `${a1 - 1}`);
        q = `等比数列公比 ${r}，已知 a_${N} = ${Y}，则首项 a₁ = ？`;
        exp = `a_${N} = a₁·${r}^{${N}−1} = ${Y} ⇒ a₁ = ${Y}/${Math.pow(r, N - 1)} = ${a1}。`;
      } else {
        const A = rnd(1, 3), B = rnd(1, 3), N = rnd(4, 7);
        let x = A, y = B; for (let j = 3; j <= N; j++) { const t = x + y; x = y; y = t; }
        o = opts(`${y}`, () => `${y + 1}`, () => `${x}`, () => `${A + B}`);
        q = `数列 a₁ = ${A}, a₂ = ${B}，a_{n+2} = a_{n+1} + a_n，求 a_${N} = ？`;
        exp = `递推得 a_${N} = ${y}。`;
      }
      results.push(Q(q, o, "进阶", exp, "递推数列", "recurrence_tree"));
    }
    return results;
  }

  /* ============================================================
   * 拓展专题（第二批）：树状图法、排列组合、柯西不等式、
   *       线性规划、矩阵与行列式、洛必达法则、中值定理、贝叶斯
   * ============================================================ */
  function qTree(n) {
    const results = [];
    const comb = (N, K) => { let c = 1; for (let j = 0; j < K; j++) c = c * (N - j) / (j + 1); return c; };
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(2, 5), b = rnd(2, 5);
        o = opts(`${a * b} 种`, () => `${a + b} 种`, () => `${a} 种`, () => `${a * b + 1} 种`);
        q = `有 ${a} 件上衣、${b} 条裤子，各选一件共有几种搭配（树状图逐层展开）？`;
        exp = `分步乘法原理：${a} × ${b} = ${a * b} 种。`;
      } else if (type === 1) {
        const k = rnd(2, 5);
        const total = Math.pow(2, k);
        o = opts(`${total} 种`, () => `${k} 种`, () => `${2 * k} 种`, () => `${k * k} 种`);
        q = `一枚硬币连续抛 ${k} 次，所有可能的结果序列有几种？`;
        exp = `每步 2 种，逐层翻倍共 2^${k} = ${total} 种（树状图逐层展开）。`;
      } else if (type === 2) {
        const k = rnd(2, 5);
        o = opts(`1 − 1/2^${k}`, () => `1/2^${k}`, () => `1/2`, () => `1`);
        q = `硬币抛 ${k} 次，至少出现 1 次正面的概率是？`;
        exp = `全反面的概率为 1/2^${k}，故至少 1 次正面 = 1 − 1/2^${k}。`;
      } else if (type === 3) {
        const S = rnd(2, 12);
        const cnt = (S <= 7) ? S - 1 : 13 - S;
        o = opts(`${cnt}/36`, () => `${cnt + 1}/36`, () => `${cnt - 1}/36`, () => `${cnt}/6`);
        q = `同时掷两枚均匀骰子，点数之和为 ${S} 的概率是？`;
        exp = `36 种等可能，和为 ${S} 有 ${cnt} 种，概率 = ${cnt}/36。`;
      } else if (type === 4) {
        const k = rnd(3, 6), m = rnd(1, k - 1);
        const cnt = comb(k, m);
        o = opts(`${cnt}/2^${k}`, () => `${cnt + 1}/2^${k}`, () => `1/2^${k}`, () => `${cnt}/2^${k - 1}`);
        q = `硬币抛 ${k} 次，恰好出现 ${m} 次正面的概率是（用树状图/二项）？`;
        exp = `C(${k},${m}) 种正面位置，概率 = C(${k},${m})/2^${k} = ${cnt}/2^${k}。`;
      } else if (type === 5) {
        const R = rnd(2, 6), B = rnd(2, 6);
        o = opts(`${R}/${R + B}`, () => `${B}/${R + B}`, () => `${R}/(R + B + 1)`, () => `1/2`);
        q = `盒中有 ${R} 个红球、${B} 个蓝球，随机取 1 个，取到红球的概率是？`;
        exp = `共 ${R + B} 个球，红球 ${R} 个，概率 = ${R}/${R + B}。`;
      } else if (type === 6) {
        const R = rnd(2, 5), B = rnd(2, 5);
        const p = (R / (R + B)) * (B / (R + B - 1));
        o = opts(`${p.toFixed(3)}`, () => `${(p + 0.1).toFixed(3)}`, () => `${(R / (R + B)).toFixed(3)}`, () => `${(B / (R + B)).toFixed(3)}`);
        q = `盒中 ${R} 红 ${B} 蓝，不放回依次取 2 个，先红后蓝的概率是？`;
        exp = `P = (${R}/${R + B}) × (${B}/${R + B - 1}) ≈ ${p.toFixed(3)}。`;
      } else if (type === 7) {
        const T = rnd(1, 5);
        o = opts(`${(6 - T)}/6`, () => `${T}/6`, () => `${(6 - T + 1)}/6`, () => `1/6`);
        q = `掷一枚均匀骰子，点数大于 ${T} 的概率是？`;
        exp = `点数 ${T + 1},…,6 共 ${6 - T} 种，概率 = ${6 - T}/6。`;
      } else if (type === 8) {
        const a = rnd(2, 5), b = rnd(2, 5);
        o = opts(`${a * b}`, () => `${a + b}`, () => `${a}`, () => `${a * b - 1}`);
        q = `用树状图：第一阶段有 ${a} 种选择，第二阶段各有 ${b} 种，总路径数是？`;
        exp = `乘法原理：总路径 = ${a} × ${b} = ${a * b}。`;
      } else {
        const R = rnd(2, 5), B = rnd(2, 5);
        const p = Math.pow(R / (R + B), 2);
        o = opts(`${p.toFixed(3)}`, () => `${(p + 0.1).toFixed(3)}`, () => `${(R / (R + B)).toFixed(3)}`, () => `${(B / (R + B)).toFixed(3)}`);
        q = `盒中 ${R} 红 ${B} 蓝，有放回取 2 次，两次都是红球的概率是？`;
        exp = `每次红球概率 ${R}/${R + B}，放回独立，P = (${R}/${R + B})² ≈ ${p.toFixed(3)}。`;
      }
      results.push(Q(q, o, "基础", exp, "树状图法", "tree_diagram"));
    }
    return results;
  }

  function qCounting(n) {
    const results = [];
    const comb = (N, K) => { let c = 1; for (let j = 0; j < K; j++) c = c * (N - j) / (j + 1); return c; };
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const nn = rnd(4, 13);
        const A = nn * (nn - 1);
        o = opts(`${A}`, () => `${nn * (nn - 1) / 2}`, () => `${nn}`, () => `${nn - 1}`);
        q = `从 ${nn} 人中选 2 人排成一列（有顺序），有几种排法？`;
        exp = `排列数 A(${nn},2) = ${nn} × (${nn}−1) = ${A}。`;
      } else if (type === 1) {
        const nn = rnd(4, 13);
        const C = nn * (nn - 1) / 2;
        o = opts(`${C}`, () => `${nn * (nn - 1)}`, () => `${nn}`, () => `${nn - 1}`);
        q = `从 ${nn} 人中选 2 人组成一个小组（无顺序），有几种选法？`;
        exp = `组合数 C(${nn},2) = ${nn}(${nn}−1)/2 = ${C}。`;
      } else if (type === 2) {
        const nn = rnd(3, 10);
        let f = 1; for (let j = 2; j <= nn; j++) f *= j;
        o = opts(`${f}`, () => `${nn}`, () => `${nn * nn}`, () => `${Math.pow(2, nn)}`);
        q = `${nn} 个人排成一排照相，有几种排法？`;
        exp = `${nn} 个人的全排列 = ${nn}! = ${f}。`;
      } else if (type === 3) {
        const nn = rnd(5, 13);
        const C = nn * (nn - 1) / 2;
        o = opts(`${C}`, () => `${nn}`, () => `${2 * nn}`, () => `${nn - 1}`);
        q = `${nn} 个人两两握手一次，共握手几次？`;
        exp = `每两人握一次，C(${nn},2) = ${nn}(${nn}−1)/2 = ${C} 次。`;
      } else if (type === 4) {
        const nn = rnd(5, 13), k = rnd(2, 5);
        let A = 1; for (let j = 0; j < k; j++) A *= (nn - j);
        o = opts(`${A}`, () => `${comb(nn, k)}`, () => `${A + 1}`, () => `${nn}`);
        q = `从 ${nn} 个不同元素中选 ${k} 个排成一列（排列 A(${nn},${k})），有几种？`;
        exp = `A(${nn},${k}) = ${nn}×${nn - 1}×…×${nn - k + 1} = ${A}。`;
      } else if (type === 5) {
        const nn = rnd(5, 13), k = rnd(2, 5);
        const C = comb(nn, k);
        let perm = 1; for (let j = 0; j < k; j++) perm *= (nn - j);
        o = opts(`${C}`, () => `${perm}`, () => `${C + 1}`, () => `${nn}`);
        q = `从 ${nn} 个不同元素中选 ${k} 个组成一组（组合 C(${nn},${k})），有几种？`;
        exp = `C(${nn},${k}) = ${nn}!/((${nn}-${k})!·${k}!) = ${C}。`;
      } else if (type === 6) {
        const m = rnd(2, 8), nn = rnd(2, 8);
        const C = comb(m + nn, m);
        o = opts(`${C}`, () => `${m * nn}`, () => `${C + 1}`, () => `${m + nn}`);
        q = `在 ${m} × ${nn} 的方格网格中，从左上角只向右/下走到右下角，有几种路径？`;
        exp = `共走 ${m}+${nn} 步选 ${m} 步向右：C(${m}+${nn},${m}) = ${C}。`;
      } else if (type === 7) {
        const nn = rnd(3, 10);
        const val = nn * (nn - 1);
        o = opts(`${val}`, () => `${nn}`, () => `${nn * nn}`, () => `${val / 2}`);
        q = `用 ${nn} 个不同数字组成两位数（数字不重复）有几种？`;
        exp = `十位 ${nn} 种、个位 ${nn - 1} 种，共 ${nn}×(${nn}−1) = ${val} 种。`;
      } else if (type === 8) {
        const nn = rnd(3, 7);
        let f = 1; for (let j = 2; j <= nn - 1; j++) f *= j;
        o = opts(`${f}`, () => `${nn}`, () => `${f * nn}`, () => `${Math.pow(2, nn)}`);
        q = `${nn} 个人围圆桌而坐（圆排列），有几种坐法？`;
        exp = `圆排列 = (${nn}−1)! = ${f}。`;
      } else {
        const nn = rnd(2, 6);
        o = opts(`${Math.pow(2, nn)}`, () => `${nn}`, () => `${Math.pow(2, nn) - 1}`, () => `${nn * 2}`);
        q = `用 2 种颜色给一排 ${nn} 个格子涂色（每格一色），共有几种涂法？`;
        exp = `每格 2 种选择且独立，共 2^${nn} = ${Math.pow(2, nn)} 种。`;
      }
      results.push(Q(q, o, "进阶", exp, "排列与组合", "counting_tree"));
    }
    return results;
  }

  function qCauchy(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const A = rnd(1, 6), B = rnd(1, 6), C = rnd(1, 6), D = rnd(1, 6);
        o = opts("两向量 (a,b) 与 (c,d) 共线（对应分量成比例）", () => "两向量垂直", () => "a = c", () => "任意情况");
        q = `二维柯西 (${A}²+${B}²)(${C}²+${D}²) ≥ (${A}${C}+${B}${D})² 中等号成立的条件是？`;
        exp = `等号当且仅当向量 (a,b) 与 (c,d) 共线（对应分量成比例）。`;
      } else if (type === 1) {
        const P = rnd(2, 9), Q = rnd(2, 9);
        const m = (Math.sqrt(P * Q)).toFixed(2);
        o = opts(`${m}`, () => `${(Math.sqrt(P)).toFixed(2)}`, () => `${(Math.sqrt(Q)).toFixed(2)}`, () => `${P + Q}`);
        q = `已知 a²+b²=${P} 且 c²+d²=${Q}，则 ac+bd 的最大值为？`;
        exp = `柯西：(ac+bd)² ≤ (a²+b²)(c²+d²) = ${P}×${Q} = ${P * Q}，故最大值 = √${P * Q} ≈ ${m}。`;
      } else if (type === 2) {
        const K = rnd(3, 8);
        o = opts("2", () => `${K}`, () => "1", () => "4");
        q = `要使不等式 (x+y)² ≤ M(x²+y²) 对任意 x,y 成立，M 的最小整数值是（与常数 2 比较，这里验证 M=${K} 时）？`;
        exp = `由柯西 (1²+1²)(x²+y²) ≥ (x+y)²，即 2(x²+y²) ≥ (x+y)²，故最小 M = 2（${K} ≥ 2 显然也成立）。`;
      } else if (type === 3) {
        const N = rnd(2, 8);
        o = opts("任意有限维（n 维）都成立", () => "只二维", () => "只三维", () => "只一维");
        q = `柯西不等式 (Σ_{i=1}^{${N}} aᵢ²)(Σ_{i=1}^{${N}} bᵢ²) ≥ (Σ_{i=1}^{${N}} aᵢbᵢ)² 适用于？`;
        exp = `柯西不等式对任意有限维（此处 ${N} 维）内积空间都成立。`;
      } else if (type === 4) {
        const R = rnd(2, 8), p = rnd(1, 5), q2 = rnd(1, 5);
        const m = (R * Math.sqrt(p * p + q2 * q2)).toFixed(2);
        o = opts(`${m}`, () => `${(R * (p + q2)).toFixed(2)}`, () => `${(R * Math.sqrt(p * p + q2 * q2) + 1).toFixed(2)}`, () => `${R}`);
        q = `已知 x²+y²=${R * R}，则 ${p}x + ${q2}y 的最大值是？`;
        exp = `柯西：((${p}x+${q2}y)²) ≤ (${p}²+${q2}²)(x²+y²) = (${p * p + q2 * q2})·${R * R}，最大值 ≈ ${m}。`;
      } else if (type === 5) {
        const A = rnd(1, 6), B = rnd(1, 6);
        o = opts("向量 (x,y) 与 (a,b) 共线（成比例）", () => "两向量垂直", () => "x = y", () => "任意");
        q = `由柯西 (${A}x + ${B}y)² ≤ (${A}²+${B}²)(x²+y²)，等号成立（取等）的条件是？`;
        exp = `等号当且仅当 (x,y) 与 (${A},${B}) 共线（对应分量成比例）。`;
      } else if (type === 6) {
        const N = rnd(2, 6), P = rnd(2, 9);
        const m = (Math.sqrt(N * P)).toFixed(2);
        o = opts(`${m}`, () => `${(Math.sqrt(P)).toFixed(2)}`, () => `${N}`, () => `${P}`);
        q = `已知 ${N} 个数 a₁…a_${N} 满足 Σ aᵢ² = ${P}，则由柯西 Σaᵢ 的最大值是？`;
        exp = `(Σaᵢ)² ≤ ${N}·Σaᵢ² = ${N * P}，故 Σaᵢ 最大值 = √(${N * P}) ≈ ${m}。`;
      } else if (type === 7) {
        const A = rnd(2, 8), B = rnd(2, 8);
        o = opts("4", () => `${A + B}`, () => "2", () => "1");
        q = `对任意正数 a = ${A}, b = ${B}，由柯西 (a+b)(1/a+1/b) ≥ (1+1)² = ？`;
        exp = `(a+b)(1/a+1/b) ≥ (√a·1/√a + √b·1/√b)² = (1+1)² = 4。`;
      } else if (type === 8) {
        const K = rnd(2, 6);
        o = opts("3", () => `${K}`, () => "2", () => "1");
        q = `由柯西 (x+y+z)² ≤ M(x²+y²+z²) 对任意 x,y,z 成立，M 的最小整数值是（验证 M=${K}）？`;
        exp = `(x+y+z)² = (1·x+1·y+1·z)² ≤ (1²+1²+1²)(x²+y²+z²) = 3(x²+y²+z²)，最小 M = 3。`;
      } else {
        const A = rnd(1, 5), B = rnd(1, 5), C = rnd(1, 5), D = rnd(1, 5), E = rnd(1, 5), F = rnd(1, 5);
        o = opts("两向量 (a,b,c) 与 (d,e,f) 共线", () => "两向量垂直", () => "a=d", () => "任意");
        q = `三维柯西 (${A}²+${B}²+${C}²)(${D}²+${E}²+${F}²) ≥ (${A}${D}+${B}${E}+${C}${F})² 等号条件是？`;
        exp = `等号当且仅当三维向量 (a,b,c) 与 (d,e,f) 共线。`;
      }
      results.push(Q(q, o, "进阶", exp, "柯西不等式", "cauchy_rect"));
    }
    return results;
  }

  function qLinearProg(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const m = rnd(3, 12);
        o = opts(`${m}`, () => `${2 * m}`, () => `${m / 2}`, () => `${m * m}`);
        q = `约束 x≥0, y≥0, x+y≤${m}，目标 z = x+y 的最大值是？`;
        exp = `在顶点 (${m},0) 或 (0,${m}) 处 z = ${m} 达到最大。`;
      } else if (type === 1) {
        const a = 2 * rnd(2, 6);
        const zmax = 2 * a / 3;
        o = opts(`${zmax}`, () => `${a}`, () => `${a / 3}`, () => `${2 * a}`);
        q = `约束 x≥0, y≥0, 2x+y≤${a}, x+2y≤${a}，目标 z = x+y 的最大值是？`;
        exp = `两约束交于 x=y=${a}/3，z = 2×${a}/3 = ${zmax}；比坐标轴上的顶点更大。`;
      } else if (type === 2) {
        const ncons = rnd(2, 5);
        o = opts("凸多边形（凸集）", () => "任意形状", () => "圆形", () => "一条直线");
        q = `线性规划中，由 ${ncons} 个线性不等式围成的有限可行域是？`;
        exp = "线性约束的交集是凸集，有限情形为凸多边形。";
      } else if (type === 3) {
        const m = rnd(3, 10);
        o = opts("可行域的顶点（角点）", () => "可行域内部", () => "坐标原点", () => "任意边界点");
        q = `在约束 x≥0, y≥0, x+y≤${m} 下，目标函数的最值一定在何处取得？`;
        exp = "由线性规划基本定理，最值在可行域的某个顶点取得。";
      } else if (type === 4) {
        const a = rnd(2, 6), b = rnd(2, 6), m = rnd(4, 16);
        const val = (m / a).toFixed(2);
        o = opts(`${val}`, () => `${(m / b).toFixed(2)}`, () => `${m}`, () => `${(m / (a + b)).toFixed(2)}`);
        q = `约束 x≥0, y≥0, ${a}x + ${b}y ≤ ${m}，目标 z = x 的最大值是？`;
        exp = `让 y=0 得 x ≤ ${m}/${a}，故 z=x 最大 = ${val}（在 (${val},0)）。`;
      } else if (type === 5) {
        const m = rnd(3, 12);
        o = opts(`${3 * m}`, () => `${2 * m}`, () => `${m}`, () => `${4 * m}`);
        q = `约束 x≥0, y≥0, x+y≤${m}，目标 z = 2x + 3y 的最大值是？`;
        exp = `角点 (0,${m}) 处 z = 3·${m} = ${3 * m}，大于 (${m},0) 的 2·${m}，故最大 ${3 * m}。`;
      } else if (type === 6) {
        const m = rnd(4, 14);
        o = opts(`${m}`, () => `${m / 2}`, () => `${2 * m}`, () => `${m + 1}`);
        q = `约束 x≥0, y≥0, x + 2y ≤ ${m}，目标 z = x + 2y 的最大值是？`;
        exp = `目标恰为左端，沿约束线 z = ${m} 恒定达到，故最大 = ${m}。`;
      } else if (type === 7) {
        const m = rnd(6, 18);
        const val = (m / 3).toFixed(2);
        o = opts(`${val}`, () => `${(m / 4).toFixed(2)}`, () => `${m}`, () => `${(m / 2).toFixed(2)}`);
        q = `约束 x≥0, y≥0, 3x + 4y ≤ ${m}，目标 z = x + y 的最大值是？`;
        exp = `角点 (${m}/3,0) 处 z = ${val}，大于 (0,${m}/4) 的 ${m / 4}，故最大 ≈ ${val}。`;
      } else if (type === 8) {
        const m = rnd(3, 10);
        o = opts("变量非负（x≥0, y≥0 等）", () => "变量可任意实数", () => "变量为整数", () => "变量为正数");
        q = `标准线性规划中，除约束外通常还要求决策变量满足（如本题 x≥0, y≥0, x+y≤${m}）？`;
        exp = "线性规划一般要求变量非负，可行域才有界可求最值。";
      } else {
        const m = rnd(3, 12);
        o = opts(`${m}`, () => `${-m}`, () => `0`, () => `${2 * m}`);
        q = `约束 x≥0, y≥0, x+y≤${m}，目标 z = x − y 的最大值是？`;
        exp = `在角点 (${m},0) 处 z = ${m} − 0 = ${m}，为最大（(0,${m}) 给 −${m}）。`;
      }
      results.push(Q(q, o, "进阶", exp, "线性规划", "lprog_region"));
    }
    return results;
  }

  function qMatrix(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(1, 4), b = rnd(1, 4), c = rnd(1, 4), d = rnd(1, 4);
        const det = a * d - b * c;
        o = opts(`${det}`, () => `${a * d + b * c}`, () => `${a * b - c * d}`, () => `${a + d - b - c}`);
        q = `二阶行列式 |${a} ${b}; ${c} ${d}| = ？`;
        exp = `二阶行列式 = 主对角积 − 副对角积 = ${a}·${d} − ${b}·${c} = ${det}。`;
      } else if (type === 1) {
        o = opts("A 本身", () => "零矩阵", () => "单位矩阵 I", () => "A²");
        q = "单位矩阵 I 与任意矩阵 A 满足 IA = ？";
        exp = "单位矩阵是乘法单位元，IA = A。";
      } else if (type === 2) {
        const a = rnd(2, 5), d = rnd(2, 5);
        o = opts(`${a * d}`, () => `${a + d}`, () => `0`, () => `1`);
        q = `对角阵 |${a} 0; 0 ${d}| 的行列式 = ？`;
        exp = `对角阵行列式 = 对角元乘积 = ${a} × ${d} = ${a * d}。`;
      } else {
        o = opts("不可逆（奇异）", () => "可逆", () => "对称", () => "对角");
        q = "若二阶矩阵行列式为 0，则该矩阵？";
        exp = "行列式为 0 ⇔ 矩阵不可逆（奇异矩阵）。";
      }
      results.push(Q(q, o, "进阶", exp, "矩阵与行列式", "matrix_det"));
    }
    return results;
  }

  function qLhopital(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const k = rnd(2, 15);
        o = opts(`${k}`, () => `${k + 1}`, () => `1`, () => `0`);
        q = `极限 lim(x→0) sin(${k}x) / x = ？（0/0 型，可用洛必达）`;
        exp = `洛必达：分子分母求导 → ${k}cos(${k}x)/1，x→0 得 ${k}。`;
      } else if (type === 1) {
        const k = rnd(2, 15);
        o = opts(`${k}`, () => `${k + 1}`, () => `1`, () => `0`);
        q = `极限 lim(x→0) (e^(${k}x) − 1) / x = ？`;
        exp = `洛必达：分子分母求导 → ${k}e^(${k}x)/1，x→0 得 ${k}。`;
      } else if (type === 2) {
        const k = rnd(2, 15);
        o = opts(`${k}`, () => `${k / 2}`, () => `1`, () => `0`);
        q = `极限 lim(x→0) ln(1 + ${k}x) / x = ？`;
        exp = `洛必达：分子分母求导 → (${k}/(1+${k}x))/1，x→0 得 ${k}。`;
      } else if (type === 3) {
        const k = rnd(2, 15);
        const val = (k * k / 2).toFixed(2);
        o = opts(`${val}`, () => `${k}`, () => `${k * k}`, () => `0`);
        q = `极限 lim(x→0) (1 − cos(${k}x)) / x² = ？`;
        exp = `洛必达两次或等价无穷小：1−cos(${k}x) ~ (${k}²x²)/2，故极限 = ${k}²/2 = ${val}。`;
      } else if (type === 4) {
        const k = rnd(2, 15);
        o = opts(`${k}`, () => `${k + 1}`, () => `1`, () => `0`);
        q = `极限 lim(x→0) tan(${k}x) / x = ？`;
        exp = `洛必达：分子分母求导 → ${k}sec²(${k}x)/1，x→0 得 ${k}。`;
      } else if (type === 5) {
        const k = rnd(2, 15);
        const val = (k / 2).toFixed(2);
        o = opts(`${val}`, () => `${k}`, () => `0`, () => `1`);
        q = `极限 lim(x→0) (√(${1 + k}x) − 1) / x = ？`;
        exp = `洛必达：分子求导 (${k}/(2√(${1 + k}x)))/1，x→0 得 ${k}/2 = ${val}。`;
      } else if (type === 6) {
        const k = rnd(2, 15);
        o = opts(`${k}`, () => `${k + 1}`, () => `1`, () => `0`);
        q = `极限 lim(x→0) arcsin(${k}x) / x = ？`;
        exp = `洛必达：分子求导 (${k}/√(1−${k}²x²))/1，x→0 得 ${k}。`;
      } else if (type === 7) {
        const a = rnd(2, 12);
        const val = Math.log(a).toFixed(3);
        o = opts(`${val}`, () => `${a}`, () => `1`, () => `0`);
        q = `极限 lim(x→0) (${a}^x − 1) / x = ？（提示：答案与 ln ${a} 有关）`;
        exp = `由导数定义 (a^x)' = a^x ln a，在 x=0 处得 ln ${a} ≈ ${val}。`;
      } else if (type === 8) {
        const k = rnd(2, 5);
        o = opts("0/0 或 ∞/∞ 型未定式", () => "0/∞ 型", () => "任意分式", () => "两数之积");
        q = `极限 lim(x→0) sin(${k}x) / x 属于什么未定式，才可直接用洛必达？`;
        exp = `分子→0、分母→0，属 0/0 未定式，可直接洛必达。`;
      } else {
        const p = rnd(1, 4);
        o = opts("0", () => `∞`, () => `${p}`, () => `1`);
        q = `极限 lim(x→∞) (ln x) / x^${p} = ？（p = ${p} > 0，∞/∞ 型）`;
        exp = `洛必达：分子求导 (1/x)/(${p}x^{${p}−1}) = 1/(${p}x^${p}) → 0（x→∞）。`;
      }
      results.push(Q(q, o, "进阶", exp, "洛必达法则", "lhopital_graph"));
    }
    return results;
  }

  function qMvt(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(1, 4), b = a + rnd(1, 5);
        o = opts(`(f(${b}) − f(${a})) / (${b} − ${a})`, () => `f(${b}) − f(${a})`, () => `f'(${a})`, () => `0`);
        q = `拉格朗日中值定理：f 在[${a},${b}]连续、(${a},${b})可导，则 ∃ξ∈(${a},${b}) 使 f'(ξ) = ？`;
        exp = `存在 ξ 使切线斜率等于割线斜率：f'(ξ) = (f(${b})−f(${a}))/(${b}−${a})。`;
      } else if (type === 1) {
        const A = rnd(2, 8);
        o = opts(`${A / 2}`, () => `${A}`, () => `0`, () => `2`);
        q = `f(x)=x² 在 [0,${A}] 上，满足中值定理的 ξ = ？`;
        exp = `(${A}²−0)/${A} = ${A}，令 2ξ = ${A} → ξ = ${A}/2。`;
      } else if (type === 2) {
        o = opts("平行于弦（割线）", () => "垂直于 x 轴", () => "过原点", () => "平行于 y 轴");
        q = "中值定理的几何意义：存在一点切线？";
        exp = "存在 ξ 使该点切线与区间端点的连线（割线）平行。";
      } else if (type === 3) {
        const N = rnd(2, 6);
        o = opts(`${N}/√3`, () => `${N}/3`, () => `√${N}`, () => `${N * N}/3`);
        q = `f(x)=x³ 在 [0,${N}] 上，满足中值定理的 ξ = ？`;
        exp = `(f(${N})−f(0))/${N} = ${N}²，令 3ξ²=${N}² → ξ=${N}/√3。`;
      } else if (type === 4) {
        const B = rnd(1, 4), C = B + rnd(2, 5);
        const xi = ((B + C) / 2).toFixed(2);
        o = opts(`${xi}`, () => `${B}`, () => `${C}`, () => `${(B + C).toFixed(2)}`);
        q = `f(x)=x² 在 [${B},${C}] 上，满足中值定理的 ξ = ？`;
        exp = `割线斜率 = (${C}²−${B}²)/(${C}−${B}) = ${B}+${C}，令 2ξ=${B}+${C} → ξ=${(B + C) / 2}。`;
      } else if (type === 5) {
        const A = rnd(2, 6), B = A + rnd(1, 5);
        const xi = (Math.sqrt(A * B)).toFixed(2);
        o = opts(`${xi}`, () => `${(A + B) / 2}`, () => `${A}`, () => `${B}`);
        q = `f(x)=1/x 在 [${A},${B}] 上，满足中值定理的 ξ = ？`;
        exp = `割线斜率 = (1/${B}−1/${A})/(${B}−${A}) = −1/(${A}${B})，令 −1/ξ² = −1/(${A}${B}) → ξ=√(${A}${B}) ≈ ${xi}。`;
      } else if (type === 6) {
        const A = rnd(2, 9);
        o = opts(`${A / 4}`, () => `${A / 2}`, () => `√${A}`, () => `${A}`);
        q = `f(x)=√x 在 [0,${A}] 上，满足中值定理的 ξ = ？`;
        exp = `割线斜率 = √${A}/${A} = 1/√${A}，令 1/(2√ξ)=1/√${A} → √ξ=√${A}/2 → ξ=${A}/4。`;
      } else if (type === 7) {
        const A = rnd(2, 9);
        const xi = ((A - 1) / Math.log(A)).toFixed(2);
        o = opts(`${xi}`, () => `${(A - 1).toFixed(2)}`, () => `${A}`, () => `1`);
        q = `f(x)=ln x 在 [1,${A}] 上，满足中值定理的 ξ = ？`;
        exp = `割线斜率 = ln ${A}/(${A}−1)，令 1/ξ = ln ${A}/(${A}−1) → ξ = (${A}−1)/ln ${A} ≈ ${xi}。`;
      } else if (type === 8) {
        const a = rnd(1, 5), b = a + rnd(1, 5);
        o = opts(`f(${a}) = f(${b})`, () => `f(${a}) ≠ f(${b})`, () => `f'(ξ) = 0`, () => `f(${a})·f(${b}) = 0`);
        q = `罗尔定理要求 f 在[${a},${b}]连续、(${a},${b})可导，且还需满足？`;
        exp = `罗尔定理还要端点函数值相等：f(${a}) = f(${b})，则存在 ξ 使 f'(ξ) = 0。`;
      } else {
        const A = rnd(1, 4), B = A + rnd(1, 4);
        const val = (Math.sqrt((B * B + A * B + A * A) / 3)).toFixed(2);
        o = opts(`${val}`, () => `${(A + B) / 2}`, () => `${B}`, () => `√${(A * A + A * B + B * B)}`);
        q = `f(x)=x³ 在 [${A},${B}] 上，满足中值定理的 ξ = ？`;
        exp = `割线斜率 = (${B}³−${A}³)/(${B}−${A}) = ${B}²+${A}${B}+${A}²，令 3ξ² = 该值 → ξ ≈ ${val}。`;
      }
      results.push(Q(q, o, "进阶", exp, "中值定理", "mvt_tangent"));
    }
    return results;
  }

  function qBayes(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const p1 = rnd(3, 9) / 10, p2 = rnd(4, 9) / 10;
        const prod = (p1 * p2).toFixed(3);
        o = opts(`${prod}`, () => `${p2}`, () => `${p1}`, () => `${(p1 + p2).toFixed(3)}`);
        q = `已知 P(A)=${p1.toFixed(1)}，P(B|A)=${p2.toFixed(1)}，则 P(A∩B) = ？`;
        exp = `乘法公式：P(A∩B) = P(A)·P(B|A) = ${p1.toFixed(1)} × ${p2.toFixed(1)} = ${prod}。`;
      } else if (type === 1) {
        const pa = rnd(2, 8) / 10, pb = rnd(1, 7) / 10;
        o = opts(`${(pa + pb).toFixed(3)}`, () => `${(pa * pb).toFixed(3)}`, () => `0`, () => `1`);
        q = `若 A、B 互斥，P(A)=${pa.toFixed(1)}，P(B)=${pb.toFixed(1)}，则 P(A∪B) = ？`;
        exp = `互斥事件无交集，P(A∪B) = P(A)+P(B) = ${(pa + pb).toFixed(3)}。`;
      } else if (type === 2) {
        const s = rnd(8, 9) / 10;
        o = opts("由结果反推原因（逆概率）", () => "求独立", () => "求期望", () => "求方差");
        q = `某检测灵敏度 ${s.toFixed(1)}，贝叶斯公式主要用于解决哪类问题？`;
        exp = "贝叶斯公式由已观察到的“结果（如阳性）”反推各“原因（如患病）”的概率，即逆概率。";
      } else if (type === 3) {
        const a = rnd(3, 8) / 10, b = rnd(4, 9) / 10;
        const c = Math.min(0.99, a * b + 0.1);
        const ans = (a * b / c).toFixed(3);
        o = opts(`${ans}`, () => `${(a).toFixed(3)}`, () => `${(b).toFixed(3)}`, () => `${(c).toFixed(3)}`);
        q = `P(A)=${a.toFixed(2)}，P(B|A)=${b.toFixed(2)}，P(B)=${c.toFixed(2)}，则 P(A|B) = ？`;
        exp = `贝叶斯：P(A|B) = P(A)P(B|A)/P(B) = ${a.toFixed(2)}×${b.toFixed(2)}/${c.toFixed(2)} ≈ ${ans}。`;
      } else if (type === 4) {
        const a = rnd(3, 7) / 10, b = rnd(4, 9) / 10, cc = rnd(3, 8) / 10;
        const pb = (a * b + (1 - a) * cc).toFixed(3);
        o = opts(`${pb}`, () => `${(a * b).toFixed(3)}`, () => `${(cc).toFixed(3)}`, () => `${(a).toFixed(3)}`);
        q = `A1,A2 完备，P(A1)=${a.toFixed(1)}，P(B|A1)=${b.toFixed(1)}，P(B|A2)=${cc.toFixed(1)}，由全概率公式 P(B) = ？`;
        exp = `P(B)=P(A1)P(B|A1)+P(A2)P(B|A2)=${a.toFixed(1)}×${b.toFixed(1)}+${(1 - a).toFixed(1)}×${cc.toFixed(1)}≈${pb}。`;
      } else if (type === 5) {
        const p = rnd(1, 8) / 100, s = rnd(8, 9) / 10, t = rnd(8, 9) / 10;
        const num = p * s, den = num + (1 - p) * (1 - t);
        const ans = (num / den).toFixed(4);
        o = opts(`${ans}`, () => `${(num).toFixed(4)}`, () => `${(s).toFixed(2)}`, () => `${(p).toFixed(3)}`);
        q = `某病患病率 ${p.toFixed(2)}，检测灵敏度 ${s.toFixed(1)}、特异度 ${t.toFixed(1)}。随机一人检测呈阳性，则其患病概率（贝叶斯）≈ ？`;
        exp = `P(病|阳)=P(病)P(阳|病)/(P(病)P(阳|病)+P(无病)P(阳|无病))≈${ans}。`;
      } else if (type === 6) {
        const a = rnd(3, 8) / 10, b = rnd(2, 8) / 10;
        o = opts(`${(a * b).toFixed(3)}`, () => `${(a + b).toFixed(3)}`, () => `0`, () => `1`);
        q = `若 A、B 独立，P(A)=${a.toFixed(1)}，P(B)=${b.toFixed(1)}，则 P(A∩B) = ？`;
        exp = `独立事件 P(A∩B) = P(A)·P(B) = ${a.toFixed(1)}×${b.toFixed(1)} = ${(a * b).toFixed(3)}。`;
      } else if (type === 7) {
        const x = rnd(2, 6) / 10, y = rnd(4, 9) / 10;
        o = opts(`${(x / y).toFixed(3)}`, () => `${(x).toFixed(3)}`, () => `${(y).toFixed(3)}`, () => `${(x * y).toFixed(3)}`);
        q = `已知 P(A∩B)=${x.toFixed(2)}，P(B)=${y.toFixed(2)}，则条件概率 P(A|B) = ？`;
        exp = `P(A|B) = P(A∩B)/P(B) = ${x.toFixed(2)}/${y.toFixed(2)} ≈ ${(x / y).toFixed(3)}。`;
      } else if (type === 8) {
        const a = rnd(3, 8) / 10, b = rnd(2, 8) / 10;
        o = opts(`P(A∩B) = P(A)P(B)`, () => `P(A∩B) = 0`, () => `P(A∪B) = 0`, () => `P(A) = P(B)`);
        q = `已知 P(A)=${a.toFixed(1)}，P(B)=${b.toFixed(1)}，若 A、B 独立则必满足？`;
        exp = `独立等价于 P(A∩B) = P(A)·P(B)。`;
      } else {
        const a = rnd(3, 8) / 10, b = rnd(3, 8) / 10;
        o = opts(`P(A)`, () => `P(B)`, () => `P(A)P(B)`, () => `P(A∪B)`);
        q = `若 A、B 独立，则条件概率 P(A|B) = ？`;
        exp = `独立时 P(A|B) = P(A∩B)/P(B) = P(A)P(B)/P(B) = P(A)。`;
      }
      results.push(Q(q, o, "进阶", exp, "条件概率与贝叶斯", "bayes_tree"));
    }
    return results;
  }

  /* ============================================================
   * 拓展第三批：衔接 / 大学预备方法（8 个）
   * ============================================================ */
  function qFullProb(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        const p1 = rnd(3, 7) / 10;
        const a = rnd(4, 9) / 10;
        const b = rnd(1, 4) / 10;
        const pb = p1 * a + (1 - p1) * b;
        o = opts(pb.toFixed(2), () => (p1 * a).toFixed(2), () => (a * b).toFixed(2), () => ((1 - p1) * b).toFixed(2));
        q = `A1、A2 为完备事件组，P(A1)=${p1.toFixed(1)}，P(B|A1)=${a.toFixed(1)}，P(B|A2)=${b.toFixed(1)}。由全概率公式求 P(B)=？`;
        exp = `P(B)=P(A1)P(B|A1)+P(A2)P(B|A2)=${p1.toFixed(1)}×${a.toFixed(1)}+${(1-p1).toFixed(1)}×${b.toFixed(1)}=${pb.toFixed(2)}。`;
      } else if (type === 1) {
        const k = rnd(2, 9);
        o = opts(`1/${k}`, () => `1/${k+1}`, () => `2/${k}`, () => `${(k-1)}/${k}`);
        q = `抽签问题：共 ${k} 张签中有 1 张中奖，第 1 个人抽中的概率是？`;
        exp = `抽签公平：无论先后，每人抽中概率都是 1/${k}。`;
      } else if (type === 2) {
        const p = rnd(1, 6) / 100;
        const sens = rnd(8, 9) / 10;
        const ppos = p * sens + (1 - p) * 0.05;
        o = opts(ppos.toFixed(3), () => (p * sens).toFixed(3), () => sens.toFixed(3), () => p.toFixed(3));
        q = `某病患病率 ${p.toFixed(2)}，检测灵敏度 ${sens.toFixed(1)}、误诊率 0.05。随机一人检测呈阳性的概率约为？`;
        exp = `P(阳性)=P(病)P(阳|病)+P(无病)P(阳|无病)=${p.toFixed(2)}×${sens.toFixed(1)}+${(1-p).toFixed(2)}×0.05≈${ppos.toFixed(3)}。`;
      } else {
        o = opts("由因导果求总概率", () => "由果溯因", () => "求期望", () => "求方差");
        q = "全概率公式主要用于？";
        exp = "全概率公式由“原因”推“结果”的总概率；贝叶斯公式才是由果溯因。";
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "全概率公式"));
    }
    return results;
  }

  function qNormalApp(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("约 68.27%", () => "约 95.45%", () => "约 99.74%", () => "约 50%");
        q = "正态分布 N(μ,σ²) 中，落入 [μ−σ, μ+σ] 的概率约为？";
        exp = "3σ 原则：P(μ−σ<X<μ+σ)≈0.6827（约 68.27%）。";
      } else if (type === 1) {
        o = opts("约 95.45%", () => "约 68.27%", () => "约 99.74%", () => "约 34.13%");
        q = "N(μ,σ²) 中，落入 [μ−2σ, μ+2σ] 的概率约为？";
        exp = "P(μ−2σ<X<μ+2σ)≈0.9545（约 95.45%）。";
      } else if (type === 2) {
        const mu = rnd(95, 105), sig = rnd(2, 8);
        o = opts(`[${mu-sig}, ${mu+sig}]`, () => `[${mu-2*sig}, ${mu+2*sig}]`, () => `[${mu}, ${mu+sig}]`, () => `[${mu-sig}, ${mu}]`);
        q = `某指标 X~N(${mu}, ${sig}²)，约 68.27% 的数据落在哪个区间？`;
        exp = `[μ−σ, μ+σ] = [${mu-sig}, ${mu+sig}]。`;
      } else {
        o = opts("μ 决定位置，σ 决定胖瘦", () => "都决定位置", () => "都决定胖瘦", () => "无关");
        q = "正态分布参数 μ 与 σ 的几何意义是？";
        exp = "μ 是对称中心（位置），σ 是离散程度（胖瘦）。";
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "正态分布"));
    }
    return results;
  }

  function qDefiniteInt(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(1, 9);
        o = opts("0", () => "1", () => `${a}`, () => "f(a)");
        q = `定积分 ∫_${a}^${a} f(x) dx = ？`;
        exp = `上下限相同，积分区间长度为 0，故为 0。`;
      } else if (type === 1) {
        const b = rnd(2, 9);
        const ans = b * b + b;
        o = opts(`${ans}`, () => `${b*b}`, () => `${b}`, () => `${(b+1)*(b+1)}`);
        q = `∫_0^${b} (2x+1) dx = ？`;
        exp = `原函数 x²+x，代入得 ${b}²+${b} = ${ans}。`;
      } else if (type === 2) {
        const N = rnd(1, 4);
        o = opts(`${2 * N}`, () => `${N}`, () => `0`, () => `${2 * N + 1}`);
        q = `∫_0^${N}π |sin x| dx = ？（每个半周期面积为 2）`;
        exp = `|sin x| 每 π 面积为 2，共 ${N} 段 → 2×${N} = ${2 * N}。`;
      } else if (type === 3) {
        const a = rnd(1, 4), b = a + rnd(1, 4), c = b + rnd(1, 4);
        o = opts(`∫_a^c = ∫_a^b + ∫_b^c`, () => `∫_a^c = ∫_a^b − ∫_b^c`, () => `∫_a^c = ∫_a^b · ∫_b^c`, () => `∫_a^c = 0`);
        q = `定积分的区间可加性（a=${a},b=${b},c=${c}）是？`;
        exp = `∫_a^c f(x)dx = ∫_a^b f(x)dx + ∫_b^c f(x)dx（b 在 a、c 之间）。`;
      } else if (type === 4) {
        const b = rnd(2, 9);
        o = opts(`${(b * b / 2).toFixed(1)}`, () => `${b * b}`, () => `${b}`, () => `${(b*b/2 + 1).toFixed(1)}`);
        q = `∫_0^${b} x dx = ？`;
        exp = `原函数 x²/2，代入 0..${b} 得 ${b}²/2 = ${(b*b/2).toFixed(1)}。`;
      } else if (type === 5) {
        const b = rnd(2, 6);
        o = opts(`${b * b * b}`, () => `${b * b}`, () => `${b}`, () => `${3 * b * b}`);
        q = `∫_0^${b} 3x² dx = ？`;
        exp = `原函数 x³，代入 0..${b} 得 ${b}³ = ${b * b * b}。`;
      } else if (type === 6) {
        const k = rnd(1, 3), b = rnd(1, 3);
        const val = ((Math.exp(k * b) - 1) / k).toFixed(2);
        o = opts(`${val}`, () => `${(Math.exp(k * b)).toFixed(2)}`, () => `${(b).toFixed(2)}`, () => `${(Math.exp(b) - 1).toFixed(2)}`);
        q = `∫_0^${b} e^(${k}x) dx = ？`;
        exp = `原函数 e^(${k}x)/${k}，代入得 (e^(${k * b})−1)/${k} ≈ ${val}。`;
      } else if (type === 7) {
        const b = rnd(2, 8);
        const val = Math.sin(b).toFixed(2);
        o = opts(`${val}`, () => `${Math.cos(b).toFixed(2)}`, () => `${b}`, () => `0`);
        q = `∫_0^${b} cos x dx = ？`;
        exp = `原函数 sin x，代入得 sin ${b} ≈ ${val}。`;
      } else if (type === 8) {
        const a = rnd(2, 8), b = rnd(2, 8);
        o = opts(`${a * b}`, () => `${a}`, () => `${b}`, () => `${a + b}`);
        q = `∫_0^${b} ${a} dx = ？（常数积分）`;
        exp = `常数积分 = ${a} × (${b}−0) = ${a * b}。`;
      } else {
        const b = rnd(2, 6);
        o = opts("0", () => `${b * b}`, () => `${b}`, () => `${2 * b}`);
        q = `∫_${(-b)}^${b} x³ dx = ？（被积函数为奇函数）`;
        exp = `x³ 为奇函数，对称区间积分 = 0。`;
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "定积分"));
    }
    return results;
  }

  function qDiffEq(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const k = rnd(1, 12);
        o = opts(`y = C·e^{${k}x}`, () => `y = C·x^${k}`, () => `y = e^{${k}x} + C`, () => `y = C·${k}x`);
        q = `微分方程 dy/dx = ${k}y 的通解是？`;
        exp = `分离变量：dy/y = ${k}dx → ln|y| = ${k}x + C → y = C·e^{${k}x}。`;
      } else if (type === 1) {
        const m = rnd(1, 12);
        o = opts(`y = ${m / 2}x² + C`, () => `y = ${m}x² + C`, () => `y = x^${m} + C`, () => `y = e^${m}x + C`);
        q = `dy/dx = ${m}x 的通解是？`;
        exp = `两边积分：y = ∫${m}x dx = (${m}/2)x² + C。`;
      } else if (type === 2) {
        const a = rnd(2, 12);
        o = opts(`y² = ${a}x² + C`, () => `y² = x² + C`, () => `y = ${a}x + C`, () => `y² = ${a}x + C`);
        q = `由 dy/dx = ${a}x/y（y≠0）分离变量并积分得？`;
        exp = `y dy = ${a}x dx → y²/2 = ${a}x²/2 + C → y² = ${a}x² + C（C 任意常数）。`;
      } else if (type === 3) {
        const k = rnd(1, 12);
        o = opts("含未知函数导数的方程", () => "代数方程", () => "不等式", () => "积分方程");
        q = `微分方程 dy/dx = ${k}y 在概念上是指？`;
        exp = "含有未知函数及其导数（或微分）的方程，称为微分方程。";
      } else if (type === 4) {
        const k = rnd(1, 12);
        o = opts(`y = ${k}x + C`, () => `y = ${k}x² + C`, () => `y = C·e^${k}x`, () => `y = ${k} + C`);
        q = `dy/dx = ${k}（导数等于常数）的通解是？`;
        exp = `直接积分：y = ${k}x + C（直线族）。`;
      } else if (type === 5) {
        const b = rnd(1, 12);
        o = opts(`y = ${b / 2}x² + C1·x + C2`, () => `y = C1·x + C2`, () => `y = C·e^x`, () => `y = ${b}x + C2`);
        q = `二阶方程 y'' = ${b}（常数）的通解是？`;
        exp = `两次积分：y' = ${b}x + C1，y = (${b}/2)x² + C1·x + C2。`;
      } else if (type === 6) {
        const k = rnd(1, 8), A = rnd(2, 12);
        o = opts(`y = ${A}·e^{${k}x}`, () => `y = C·e^(${k}x)`, () => `y = ${A}·e^(${k}x) + 1`, () => `y = ${A}x + C`);
        q = `初值问题 dy/dx = ${k}y，y(0) = ${A} 的特解是？`;
        exp = `通解 y = C·e^(${k}x)，代入 x=0 得 C = ${A}，故 y = ${A}·e^(${k}x)。`;
      } else if (type === 7) {
        const p = rnd(1, 12);
        o = opts(`y = C·e^(−${p}x)`, () => `y = C·e^(${p}x)`, () => `y = C·x`, () => `y = ${p}·e^(−x)`);
        q = `dy/dx + ${p}y = 0 的通解是？`;
        exp = `分离变量 dy/y = −${p}dx → y = C·e^(−${p}x)。`;
      } else if (type === 8) {
        o = opts("y = C·x", () => "y = C·x²", () => "y = C·e^x", () => "y = ln x + C");
        q = "齐次方程 dy/dx = y/x（x≠0）的通解是？";
        exp = "分离变量 dy/y = dx/x → ln|y| = ln|x| + C → y = C·x。";
      } else {
        const k = rnd(1, 8), A = rnd(1, 12);
        o = opts(`y = ${A} + C·e^(${k}x)`, () => `y = ${A}·e^(${k}x)`, () => `y = C·e^(${k}x)`, () => `y = ${A} + C·x`);
        q = `方程 dy/dx = ${k}(y − ${A}) 的通解是？`;
        exp = `令 u = y − ${A}，则 du/dx = ${k}u → u = C·e^(${k}x)，故 y = ${A} + C·e^(${k}x)。`;
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "微分方程"));
    }
    return results;
  }

  function qIneqScale(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const nn = rnd(2, 18);
        o = opts(`1/(${nn}(${nn}+1)) < 1/${nn}`, () => `1/(${nn}(${nn}+1)) > 1/${nn}`, () => `1/(${nn}(${nn}+1)) = 1/${nn}`, () => `1/(${nn}(${nn}+1)) > 1/${nn}²`);
        q = `放缩技巧：当 n=${nn}>0 时，1/(n(n+1)) 与 1/n 的关系是？（裂项放缩基础）`;
        exp = `分母 n(n+1) > n，故 1/(n(n+1)) < 1/n。常用于把级数放缩成易求和形式。`;
      } else if (type === 1) {
        const N = rnd(2, 12);
        o = opts(`1/((n-1)n)`, () => `1/n²`, () => `1/(n+1)`, () => `1/(2n)`);
        q = `证明 Σ_{n=${N}}^∞ 1/n² 收敛，可把通项 1/n² 放缩为（便于裂项）？`;
        exp = `对 n≥2，1/n² < 1/((n-1)n) = 1/(n-1) − 1/n，裂项求和得上界。`;
      } else if (type === 2) {
        const a = rnd(2, 15);
        o = opts(`a_n ≤ ${a}`, () => `a_n ≥ ${a}`, () => `a_n = ${a}`, () => `a_n < 0`);
        q = `已知 0<a_n≤${a} 且 {a_n} 单调递减，则对任意 n 有 a_n ？`;
        exp = `单调递减且首项 ≤ ${a} ⇒ 之后每项 a_n ≤ a_1 ≤ ${a}。`;
      } else if (type === 3) {
        const N = rnd(3, 18);
        o = opts("把难求的式放缩到易求范围", () => "精确计算", () => "求导", () => "积分");
        q = `用放缩法估计 Σ_{k=1}^{${N}} 1/k 的上界时，主要思路是？`;
        exp = `当精确值难求时，把目标式放缩到容易求和/比较的范围，从而证明不等式或估计大小。`;
      } else if (type === 4) {
        const nn = rnd(2, 18);
        o = opts(`1/${nn} − 1/(${nn}+1)`, () => `1/${nn} + 1/(${nn}+1)`, () => `1/${nn} − 1/${nn}`, () => `1/(${nn}+1) − 1/${nn}`);
        q = `裂项放缩：1/(n(n+1))（取 n=${nn}）可拆成？`;
        exp = `1/(n(n+1)) = 1/n − 1/(n+1)，故 n=${nn} 时为 1/${nn} − 1/(${nn}+1)。`;
      } else if (type === 5) {
        const N = rnd(2, 12);
        o = opts("也收敛", () => "必发散", () => "和为 0", () => "无法判断");
        q = `比较判别：若对 n≥${N} 有 0≤a_n≤b_n 且 Σ b_n 收敛，则 Σ a_n ？`;
        exp = `小者被收敛级数控制，由比较判别法 Σ a_n 也收敛。`;
      } else if (type === 6) {
        const nn = rnd(2, 18);
        o = opts(`1/√${nn} > 2(√(${nn}+1) − √${nn})`, () => `1/√${nn} < 2(√(${nn}+1) − √${nn})`, () => `=`, () => `1/√${nn} = √(${nn}+1) − √${nn}`);
        q = `根式放缩：比较 1/√n（取 n=${nn}）与 2(√(n+1) − √n) 的大小？`;
        exp = `2(√(n+1)−√n) = 2/(√(n+1)+√n) < 2/(2√n) = 1/√n，故 1/√n 更大。`;
      } else if (type === 7) {
        const N = rnd(2, 12);
        o = opts(`1/n! ≤ 1/2^{n-1}（n≥${N}）`, () => `1/n! ≥ 1/2^{n-1}`, () => `1/n! = 1/2^{n-1}`, () => `1/n! ≤ 1/n`);
        q = `证明 Σ 1/n! 收敛，可放缩（对 n≥${N}）为？`;
        exp = `n! ≥ 2^{n-1}（n≥1），故 1/n! ≤ 1/2^{n-1}，等比级数收敛 ⇒ 原级数收敛。`;
      } else if (type === 8) {
        const nn = rnd(3, 8);
        o = opts(`1/(${nn}-1) − 1/${nn}`, () => `1/(${nn}-1) + 1/${nn}`, () => `1/${nn} − 1/(${nn}-1)`, () => `1/(${nn}·${nn})`);
        q = `裂项：1/((n-1)n)（取 n=${nn}）等于？`;
        exp = `1/((n-1)n) = 1/(n-1) − 1/n，故 n=${nn} 时为 1/(${nn}-1) − 1/${nn}。`;
      } else {
        const N = rnd(2, 5);
        o = opts(`Σ a_n < 2`, () => `Σ a_n > 2`, () => `Σ a_n = 2`, () => `Σ a_n < 1`);
        q = `若对 n≥${N} 有 0<a_n<1/n²，则由放缩可知 Σ_{n=${N}}^∞ a_n ？`;
        exp = `Σ 1/n² < 1 + Σ_{n=2}∞ 1/((n-1)n) = 1+1 = 2，故 Σ a_n < 2。`;
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "放缩法"));
    }
    return results;
  }

  function qSeqIneq(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const M = rnd(3, 15);
        o = opts("数学归纳法", () => "代入法", () => "配方法", () => "换元法");
        q = `证明对一切 n∈N* 都有 a_n < ${M}，最常用的方法是？`;
        exp = `由 n=1 验证、假设 n=k 再推 n=k+1，即数学归纳法。`;
      } else if (type === 1) {
        const N = rnd(3, 15);
        o = opts("单调有界数列必收敛", () => "单调必发散", () => "有界必发散", () => "无界必收敛");
        q = `对前 ${N} 项组成的数列，极限存在准则“单调有界定理”内容是？`;
        exp = `单调递增（减）且有上（下）界的数列必收敛。`;
      } else if (type === 2) {
        const c = rnd(2, 15);
        o = opts(`≤ ${c}`, () => `≥ ${c}`, () => `= ${c}`, () => `< 0`);
        q = `已知 a_1 = ${c} 且数列 {a_n} 单调递减，则对任意 n 有 a_n ？`;
        exp = `单调递减 ⇒ a_n ≤ a_1 = ${c}。`;
      } else if (type === 3) {
        const M = rnd(3, 15);
        o = opts("先放缩再求和", () => "直接求通项", () => "求导", () => "积分");
        q = `证明 Σ a_n < ${M}（a_n>0）常用思路？`;
        exp = `先放缩 a_n 到可求和的已知数列（如等比、裂项），再求和得上界。`;
      } else if (type === 4) {
        const c = rnd(2, 15);
        o = opts(`≥ ${c}`, () => `≤ ${c}`, () => `= ${c}`, () => `< 0`);
        q = `已知 a_1 = ${c} 且数列 {a_n} 单调递增，则对任意 n 有 a_n ？`;
        exp = `单调递增 ⇒ a_n ≥ a_1 = ${c}。`;
      } else if (type === 5) {
        const M = rnd(3, 15);
        o = opts(`L ≤ ${M}`, () => `L ≥ ${M}`, () => `L = ${M}`, () => `L > ${M}`);
        q = `若 a_n → L（极限存在）且对每个 n 有 a_n < ${M}，则极限 L 满足？`;
        exp = `极限保号（保不等式）：由 a_n < ${M} 恒成立，得 L ≤ ${M}。`;
      } else if (type === 6) {
        const L = rnd(1, 12);
        o = opts(`a_n → ${L}`, () => `a_n → 0`, () => `a_n 发散`, () => `a_n → ${L + 1}`);
        q = `若 b_n ≤ a_n ≤ c_n 且 b_n → ${L}、c_n → ${L}，则由夹逼定理 a_n ？`;
        exp = `夹逼定理：双边被同极限 ${L} 控制，故 a_n → ${L}。`;
      } else if (type === 7) {
        const N = rnd(2, 10);
        o = opts("也收敛", () => "必发散", () => "和为 0", () => "无法判断");
        q = `比较判别：若对 n≥${N} 有 0≤a_n≤b_n 且 Σ b_n 收敛，则 Σ a_n ？`;
        exp = `小者被收敛级数控制，由比较判别法 Σ a_n 也收敛。`;
      } else if (type === 8) {
        const A = rnd(2, 12), r = rnd(2, 9);
        o = opts(`≤ ${A}`, () => `≥ ${A}`, () => `= ${A}`, () => `< 0`);
        q = `数列 a_n = ${A}·(${r}/10)^n（|${r}/10|<1），则 |a_n| 满足？`;
        exp = `|${r}/10|<1 ⇒ |a_n| = ${A}·(${r}/10)^n ≤ ${A}，且 a_n → 0。`;
      } else {
        const B = rnd(2, 12);
        o = opts("收敛", () => "发散", () => "趋于 ∞", () => "无界");
        q = `若 a_{n+1} ≤ a_n（递减）且对所有 n 有 a_n ≥ ${B}（有下界），则 {a_n} ？`;
        exp = `单调递减且有下界（≥ ${B}），由单调有界定理知 {a_n} 收敛。`;
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "数列不等式"));
    }
    return results;
  }

  function qComplexGeo(n) {
    const results = [];
    const fmt = (re, im) => (im >= 0 ? `${re} + ${im}i` : `${re} − ${-im}i`);
    const ANG = [30, 45, 60, 90, 120, 135, 150, 180];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(1, 6), b = rnd(1, 6);
        const r = Math.sqrt(a * a + b * b);
        o = opts(`${r.toFixed(2)}`, () => `${a}`, () => `${b}`, () => `${(a + b)}`);
        q = `复数 z = ${a} + ${b}i 的模 |z|（几何意义：到原点距离）为？`;
        exp = `|z| = √(a²+b²) = √(${a}²+${b}²) = ${r.toFixed(2)}。`;
      } else if (type === 1) {
        const a = rnd(2, 5), b = rnd(1, 4);
        o = opts(`${b} − ${a}i`, () => `${a} + ${b}i`, () => `−${a} + ${b}i`, () => `${b} + ${a}i`);
        q = `复数 z = ${a} + ${b}i 乘 i 后等于？（i·(a+bi)）`;
        exp = `i(a+bi) = ai + bi² = −b + ai = ${b}−${a}i（相当于逆时针旋转 90°）。`;
      } else if (type === 2) {
        const a = rnd(1, 5), b = rnd(1, 4);
        o = opts("关于实轴对称", () => "关于原点对称", () => "逆时针转 90°", () => "放大");
        q = `复数 z = ${a} + ${b}i 与它的共轭 z̄ 在复平面上的位置关系是？`;
        exp = `z=a+bi 与 z̄=a−bi 实部相同、虚部相反，关于实轴对称。`;
      } else if (type === 3) {
        const a = rnd(1, 5), b = rnd(1, 5);
        o = opts("辐角 arg(z)", () => "模长", () => "实部", () => "虚部");
        q = `复数 z = ${a} + ${b}i 对应向量与正实轴的夹角称为？`;
        exp = `该夹角称为辐角 arg(z)，由 tanθ = b/a 确定（注意象限）。`;
      } else if (type === 4) {
        const a1 = rnd(1, 6), b1 = rnd(1, 5), a2 = rnd(1, 6), b2 = rnd(1, 5);
        const re = a1 + a2, im = b1 + b2;
        o = opts(fmt(re, im), () => fmt(a1 - a2, b1 - b2), () => fmt(a1 + a2, b1 - b2), () => fmt(a1, b2));
        q = `复数加法 (${a1}+${b1}i) + (${a2}+${b2}i) = ？`;
        exp = `实部相加、虚部相加：(${a1}+${a2}) + (${b1}+${b2})i = ${fmt(re, im)}。`;
      } else if (type === 5) {
        const a1 = rnd(1, 5), b1 = rnd(1, 4), a2 = rnd(1, 5), b2 = rnd(1, 4);
        const re = a1 * a2 - b1 * b2;
        const imv = a1 * b2 + b1 * a2;
        o = opts(fmt(re, imv), () => fmt(a1 * a2, b1 * b2), () => fmt(re, -imv), () => fmt(a1 + a2, b1 + b2));
        q = `复数乘法 (${a1}+${b1}i)(${a2}+${b2}i) = ？`;
        exp = `= (${a1}${a2}−${b1}${b2}) + (${a1}${b2}+${b1}${a2})i = ${fmt(re, imv)}。`;
      } else if (type === 6) {
        const a1 = rnd(1, 5), b1 = rnd(1, 4), a2 = rnd(1, 5), b2 = rnd(1, 4);
        const r1 = Math.sqrt(a1 * a1 + b1 * b1), r2 = Math.sqrt(a2 * a2 + b2 * b2);
        o = opts(`${(r1 / r2).toFixed(2)}`, () => `${(r2 / r1).toFixed(2)}`, () => `${(r1 + r2).toFixed(2)}`, () => `${(r1 * r2).toFixed(2)}`);
        q = `复数 z₁=${a1}+${b1}i、z₂=${a2}+${b2}i，则 |z₁/z₂| = ？`;
        exp = `商的模 = 模的商：|z₁/z₂| = |z₁|/|z₂| = ${r1.toFixed(2)}/${r2.toFixed(2)} ≈ ${(r1 / r2).toFixed(2)}。`;
      } else if (type === 7) {
        const t1 = pick(ANG), t2 = pick(ANG);
        const sum = (t1 + t2) % 360;
        o = opts(`${sum}°`, () => `${t1}°`, () => `${t2}°`, () => `${(t1 - t2 + 360) % 360}°`);
        q = `复数 z₁ 辐角 ${t1}°、z₂ 辐角 ${t2}°，则 z₁·z₂ 的辐角是？`;
        exp = `乘积辐角 = 辐角之和（模 360）：${t1}°+${t2}° = ${sum}°。`;
      } else if (type === 8) {
        const a = rnd(1, 6), b = rnd(1, 6);
        const den = a * a + b * b;
        o = opts(fmt((a / den).toFixed(3), (-b / den).toFixed(3)), () => fmt((a / den).toFixed(3), (b / den).toFixed(3)), () => `${a} + ${b}i`, () => `${den}`);
        q = `求 1/(${a}+${b}i) = ？`;
        exp = `分子分母同乘共轭：${a}−${b}i 除以 (${a})²+(${b})² = ${den}，得 ${fmt((a / den).toFixed(3), (-b / den).toFixed(3))}。`;
      } else {
        const a = rnd(1, 6), b = rnd(1, 6);
        o = opts(`${a * a + b * b}`, () => `${a * a - b * b}`, () => `${2 * a * b}`, () => `${a + b}`);
        q = `复数 z = ${a}+${b}i 与共轭乘积 z·z̄ = ？`;
        exp = `z·z̄ = (${a}+${b}i)(${a}−${b}i) = ${a}²+${b}² = ${a * a + b * b} = |z|²。`;
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "复数几何"));
    }
    return results;
  }

  function qSeries(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(1, 9);
        o = opts("|r| < 1", () => "|r| > 1", () => "r > 0", () => "r < 1");
        q = `等比级数 Σ_{n=0}^∞ ${a}·rⁿ 收敛的充要条件是（r 为公比）？`;
        exp = "公比绝对值 |r| < 1 时收敛，否则发散。";
      } else if (type === 1) {
        const N = rnd(2, 9);
        o = opts("p > 1", () => "p > 0", () => "p ≥ 1", () => "p < 1");
        q = `p 级数 Σ_{n=1}^${N} 1/n^p（取极限 n→∞）收敛的条件是？`;
        exp = "p > 1 收敛，p ≤ 1 发散（p=1 为调和级数，发散）。";
      } else if (type === 2) {
        const N = rnd(10, 99);
        o = opts("发散", () => "收敛于 1", () => "收敛于 0", () => "收敛于 ln2");
        q = `调和级数 Σ_{n=1}^${N} 1/n（与无穷级数同敛散）的敛散性是？`;
        exp = "调和级数发散（虽通项趋于 0，但部分和趋于 ∞）。";
      } else if (type === 3) {
        const r = rnd(2, 6) / 10;
        const sum = r / (1 - r);
        o = opts(`${sum.toFixed(2)}`, () => `${r.toFixed(2)}`, () => `${(1/(1-r)).toFixed(2)}`, () => `${(r*r).toFixed(2)}`);
        q = `级数 Σ_{n=1}^∞ ${r.toFixed(1)}ⁿ 的和（首项 ${r.toFixed(1)}、公比 ${r.toFixed(1)}）是？`;
        exp = `等比求和（从 n=1 起）= a/(1−r) = ${r.toFixed(1)}/(1−${r.toFixed(1)}) = ${sum.toFixed(2)}。`;
      } else if (type === 4) {
        const a = rnd(2, 8), r = rnd(2, 6) / 10;
        const sum = a / (1 - r);
        o = opts(`${sum.toFixed(2)}`, () => `${(a*r).toFixed(2)}`, () => `${(a).toFixed(2)}`, () => `${(a/(1+r)).toFixed(2)}`);
        q = `级数 Σ_{n=0}^∞ ${a}·(${r.toFixed(1)})ⁿ（首项 ${a}、公比 ${r.toFixed(1)}）的和是？`;
        exp = `等比求和（从 n=0 起）= a/(1−r) = ${a}/(1−${r.toFixed(1)}) = ${sum.toFixed(2)}。`;
      } else if (type === 5) {
        o = opts("≈ 0.693（ln 2）", () => "发散", () => "= 1", () => "= 0");
        q = "交错调和级数 Σ_{n=1}^∞ (−1)^{n−1}/n 的和收敛于？";
        exp = "交错级数满足莱布尼茨条件，收敛到 ln 2 ≈ 0.693。";
      } else if (type === 6) {
        const N = rnd(2, 6);
        o = opts("也收敛", () => "必发散", () => "和为 0", () => "无法判断");
        q = `比较判别：若对 n≥${N} 有 0≤a_n≤b_n 且 Σ b_n 收敛，则 Σ a_n ？`;
        exp = "小者被收敛级数控制，由比较判别法 Σ a_n 也收敛。";
      } else if (type === 7) {
        const L = rnd(2, 8) / 10;
        o = opts("收敛", () => "发散", () => "条件收敛", () => "无法判断");
        q = `比值判别：若 lim|a_{n+1}/a_n| = ${L.toFixed(1)} < 1，则正项级数 Σ a_n ？`;
        exp = "比值极限 L = ${L.toFixed(1)} < 1，由比值判别法级数收敛。";
      } else if (type === 8) {
        const N = rnd(2, 9);
        o = opts("≈ 1.645（π²/6）", () => "= 1", () => "发散", () => "= 2");
        q = `巴塞尔问题：Σ_{n=1}^${N} 1/n²（取 n→∞ 极限）的和是？`;
        exp = "Σ 1/n² = π²/6 ≈ 1.645（著名结果）。";
      } else {
        const a = rnd(1, 5), r = rnd(2, 6) / 10, N = rnd(3, 7);
        const s = a * (1 - Math.pow(r, N)) / (1 - r);
        o = opts(`${s.toFixed(2)}`, () => `${(a * (1 - Math.pow(r, N + 1)) / (1 - r)).toFixed(2)}`, () => `${(a * N).toFixed(2)}`, () => `${(a / (1 - r)).toFixed(2)}`);
        q = `有限等比和 Σ_{n=0}^{${N}} ${a}·(${r.toFixed(1)})ⁿ = ？`;
        exp = `S_${N} = ${a}(1−${r.toFixed(1)}^${N})/(1−${r.toFixed(1)}) ≈ ${s.toFixed(2)}。`;
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "数项级数"));
    }
    return results;
  }

  /* ---------- 拓展：解析几何综合（coord_geo） ---------- */
  function qCoordGeo(n) {
    const results = [];
    const sgn = v => v === 0 ? "" : (v > 0 ? "-" + v : "+" + (-v));
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        let x1 = rnd(-6, 6), y1 = rnd(-6, 6), x2 = rnd(-6, 6), y2 = rnd(-6, 6);
        while (x1 === x2 && y1 === y2) { x2 = rnd(-6, 6); y2 = rnd(-6, 6); }
        const d2 = (x2 - x1) ** 2 + (y2 - y1) ** 2, d = Math.sqrt(d2);
        o = opts(d.toFixed(2), () => Math.sqrt(d2 + rnd(1, 10)).toFixed(2), () => Math.sqrt(Math.abs(d2 - rnd(1, 10))).toFixed(2), () => (Math.abs(x2 - x1) + Math.abs(y2 - y1)).toFixed(2));
        q = `点 A(${x1},${y1}) 与 B(${x2},${y2}) 的距离是？`;
        exp = `d = √[(${x2}−${x1})² + (${y2}−${y1})²] = √${d2} ≈ ${d.toFixed(2)}。`;
      } else if (type === 1) {
        const x1 = rnd(-8, 8), y1 = rnd(-8, 8), x2 = rnd(-8, 8), y2 = rnd(-8, 8);
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        o = opts(`(${mx},${my})`, () => `(${x1},${y1})`, () => `(${x2},${y2})`, () => `(${mx},${y1})`);
        q = `线段 AB 中点（A(${x1},${y1})、B(${x2},${y2})）是？`;
        exp = `中点 = ((x₁+x₂)/2,(y₁+y₂)/2) = (${mx},${my})。`;
      } else if (type === 2) {
        let x1 = rnd(-5, 5), y1 = rnd(-5, 5);
        let x2 = rnd(-5, 5); while (x2 === x1) x2 = rnd(-5, 5);
        const y2 = rnd(-5, 5), k = (y2 - y1) / (x2 - x1);
        o = opts(k.toFixed(2), () => ((y1 - y2) / (x2 - x1)).toFixed(2), () => ((x2 - x1) / (y2 - y1)).toFixed(2), () => rnd(1, 5).toFixed(2));
        q = `过 A(${x1},${y1})、B(${x2},${y2}) 的直线斜率 k = ？`;
        exp = `k = (y₂−y₁)/(x₂−x₁) = (${y2}−${y1})/(${x2}−${x1}) = ${k.toFixed(2)}。`;
      } else {
        const a = rnd(-5, 5), b = rnd(-5, 5), r = rnd(2, 6);
        o = opts(`(x${sgn(a)})²+(y${sgn(b)})²=${r * r}`, () => `(x${sgn(a)})²+(y${sgn(b)})²=${r * r + 1}`, () => `(x${sgn(a)})²+y²=${r * r}`, () => `x²+y²=${r * r}`);
        q = `圆心 (${a},${b})、半径 ${r} 的圆的标准方程是？`;
        exp = `标准方程 (x−a)²+(y−b)²=r² → (x${sgn(a)})²+(y${sgn(b)})²=${r * r}。`;
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "解析几何"));
    }
    return results;
  }

  /* ---------- 拓展：琴生不等式与凸函数（jensen） ---------- */
  function qJensen(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const A = rnd(1, 5);
        o = opts("下凸（凸）", () => "上凸（凹）", () => "线性", () => "既凸又凹");
        q = `函数 f(x)=${A}x²（${A}>0）的凹凸性是？`;
        exp = `f''=${2 * A}>0，二阶导为正，故为下凸（凸）函数。`;
      } else if (type === 1) {
        const A = rnd(1, 5);
        o = opts("上凸（凹）", () => "下凸（凸）", () => "线性", () => "既凸又凹");
        q = `函数 f(x)=−${A}x² 的凹凸性是？`;
        exp = `f''=−${2 * A}<0，二阶导为负，故为上凸（凹）函数。`;
      } else if (type === 2) {
        const x = rnd(1, 5), y = rnd(6, 10);
        o = opts(`f((${x}+${y})/2) ≤ (f(${x})+f(${y}))/2`, () => `f((${x}+${y})/2) ≥ (f(${x})+f(${y}))/2`, () => `f((${x}+${y})/2) = (f(${x})+f(${y}))/2`, () => `f((${x}+${y})/2) + (f(${x})+f(${y}))/2 = 0`);
        q = `若 f 为下凸（凸）函数，则对任意 x=${x}, y=${y} 有？`;
        exp = `凸函数满足 Jensen：f((x+y)/2) ≤ (f(x)+f(y))/2。`;
      } else if (type === 3) {
        const a = rnd(2, 9), b = rnd(2, 9);
        o = opts("平方平均 ≥ 算术平均 ≥ 几何平均 ≥ 调和平均", () => "算术平均 ≥ 平方平均 ≥ 几何平均 ≥ 调和平均", () => "几何平均 ≥ 算术平均 ≥ 调和平均 ≥ 平方平均", () => "调和平均 ≥ 几何平均 ≥ 算术平均 ≥ 平方平均");
        q = `对正数 a=${a}, b=${b}，四个经典平均（平方/算术/几何/调和）的大小顺序是？`;
        exp = `Q ≥ A ≥ G ≥ H。这是 Jensen（凸性）的直接推论。`;
      } else if (type === 4) {
        const x = rnd(1, 5), y = rnd(6, 10);
        o = opts(`e^((${x}+${y})/2) ≤ (e^${x}+e^${y})/2`, () => `e^((${x}+${y})/2) ≥ (e^${x}+e^${y})/2`, () => `e^((${x}+${y})/2) = (e^${x}+e^${y})/2`, () => `e^((${x}+${y})/2) · (e^${x}+e^${y})/2 = 1`);
        q = `由 Jensen 不等式，对 f(t)=eᵗ 与 x=${x}, y=${y} 有？`;
        exp = `f(t)=eᵗ 下凸，故 e^((x+y)/2)=f((x+y)/2) ≤ (f(x)+f(y))/2 = (e^${x}+e^${y})/2。`;
      } else if (type === 5) {
        const x = rnd(1, 5), y = rnd(6, 10);
        o = opts(`f((${x}+${y})/2) ≥ (f(${x})+f(${y}))/2`, () => `f((${x}+${y})/2) ≤ (f(${x})+f(${y}))/2`, () => `f((${x}+${y})/2) = (f(${x})+f(${y}))/2`, () => `两者之和为 0`);
        q = `若 f 为上凸（凹）函数，则对任意 x=${x}, y=${y} 有？`;
        exp = `凹函数满足反向 Jensen：f((x+y)/2) ≥ (f(x)+f(y))/2。`;
      } else if (type === 6) {
        const x = rnd(2, 9), y = rnd(2, 9);
        o = opts(`ln((${x}+${y})/2) ≥ (ln ${x}+ln ${y})/2`, () => `ln((${x}+${y})/2) ≤ (ln ${x}+ln ${y})/2`, () => `ln((${x}+${y})/2) = (ln ${x}+ln ${y})/2`, () => `ln((${x}+${y})/2) + (ln ${x}+ln ${y})/2 = 0`);
        q = `由 f(t)=ln t 的凹性，对 x=${x}, y=${y} 有？`;
        exp = `ln t 上凸，故 ln((x+y)/2) ≥ (ln x+ln y)/2 = ln√(xy)，即 (x+y)/2 ≥ √(xy)。`;
      } else if (type === 7) {
        const lam = rnd(2, 8) / 10;
        o = opts(`f(${lam}x+(1−${lam})y) ≤ ${lam}f(x)+(1−${lam})f(y)`, () => `≥`, () => `=`, () => `f(${lam}x+(1−${lam})y) + ${lam}f(x) = 0`);
        q = `下凸函数 f 与 λ=${lam}（0<λ<1），Jensen 一般形式是？`;
        exp = `f(λx+(1−λ)y) ≤ λf(x)+(1−λ)f(y)（λ=${lam}）。`;
      } else if (type === 8) {
        const x = rnd(2, 9), y = rnd(2, 9);
        o = opts(`(${x}+${y})/2 ≥ √(${x}·${y})`, () => `(${x}+${y})/2 ≤ √(${x}·${y})`, () => `(${x}+${y})/2 = √(${x}·${y})`, () => `(${x}+${y})/2 · √(${x}·${y}) = 1`);
        q = `对正数 x=${x}, y=${y}，算术平均与几何平均的关系（Jensen 推论）是？`;
        exp = `由 ln 的凹性得 (x+y)/2 ≥ √(xy)（算术平均 ≥ 几何平均）。`;
      } else {
        const x = rnd(2, 9), y = rnd(2, 9);
        o = opts(`2·${x}·${y}/(${x}+${y}) ≤ √(${x}·${y})`, () => `≥`, () => `=`, () => `2·${x}·${y}/(${x}+${y}) + √(${x}·${y}) = 0`);
        q = `对正数 x=${x}, y=${y}，调和平均与几何平均的关系（Jensen 推论）是？`;
        exp = `调和平均 H=2xy/(x+y) ≤ √(xy)=G，故调和 ≤ 几何 ≤ 算术 ≤ 平方。`;
      }
      results.push(Q(q, o, "进阶", exp, "琴生不等式"));
    }
    return results;
  }

  /* ---------- 拓展：重要极限（important_limit） ---------- */
  function qImpLimit(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const k = rnd(1, 12);
        o = opts("1", () => "0", () => `${k}`, () => "∞");
        q = `lim_{x→0} sin(${k}x)/(${k}x) = ？（重要极限一）`;
        exp = `令 t=${k}x，lim_{t→0} sin t / t = 1。`;
      } else if (type === 1) {
        const a = rnd(2, 12);
        const val = Math.exp(a).toFixed(3);
        o = opts(`${val}（即 e^${a}）`, () => `${a}`, () => `1`, () => `${val}·${a}`);
        q = `lim_{x→∞} (1 + ${a}/x)^x = ？`;
        exp = `重要极限二推广：lim (1 + a/x)^x = e^${a} ≈ ${val}。`;
      } else if (type === 2) {
        const a = rnd(2, 12);
        const val = Math.exp(a).toFixed(3);
        o = opts(`${val}（即 e^${a}）`, () => `${a}`, () => `1`, () => `${Math.exp(a - 1).toFixed(3)}`);
        q = `lim_{n→∞} (1 + ${a}/n)^n = ？（n 为正整数）`;
        exp = `离散推广：lim (1 + a/n)^n = e^${a} ≈ ${val}。`;
      } else if (type === 3) {
        const k = rnd(1, 12);
        const val = Math.exp(k).toFixed(3);
        o = opts(`${val}（即 e^${k}）`, () => `1`, () => `0`, () => `${k}`);
        q = `lim_{x→0} (1 + ${k}x)^{1/x} = ？`;
        exp = `令 t=1/x，则 lim (1 + ${k}/t)^t = e^${k} ≈ ${val}。`;
      } else if (type === 4) {
        const a = rnd(2, 12);
        const val = Math.log(a).toFixed(3);
        o = opts(`${val}（即 ln ${a}）`, () => `${a}`, () => `1`, () => `0`);
        q = `lim_{x→0} (${a}^x − 1)/x = ？（指数型重要极限）`;
        exp = `由 (a^x)' = a^x ln a 在 x=0 处，极限 = ln ${a} ≈ ${val}。`;
      } else if (type === 5) {
        const x = rnd(2, 12);
        const val = Math.exp(x).toFixed(3);
        o = opts(`${val}（即 e^${x}）`, () => `${x}`, () => `1`, () => `${Math.exp(x / 2).toFixed(3)}`);
        q = `lim_{n→∞} (1 + ${x}/n)^n = ？`;
        exp = `lim (1 + x/n)^n = e^${x} ≈ ${val}（第二个重要极限的推广）。`;
      } else if (type === 6) {
        const a = rnd(1, 12);
        o = opts(`${(a * a / 2).toFixed(2)}`, () => `0`, () => `${a}`, () => `1`);
        q = `lim_{x→0} (1 − cos(${a}x)) / x² = ？`;
        exp = `1−cos(${a}x) ~ (${a}²x²)/2，故极限 = ${a}²/2 = ${(a * a / 2).toFixed(2)}。`;
      } else if (type === 7) {
        const k = rnd(1, 12);
        o = opts(`${k}`, () => `0`, () => `1`, () => `∞`);
        q = `lim_{x→0} tan(${k}x)/x = ？`;
        exp = `tan(${k}x) ~ ${k}x，故极限 = ${k}（亦可归为重要极限一）。`;
      } else if (type === 8) {
        const k = rnd(1, 5);
        o = opts(`${k}`, () => `0`, () => `1`, () => `∞`);
        q = `lim_{x→0} ln(1 + ${k}x)/x = ？`;
        exp = `ln(1+${k}x) ~ ${k}x，故极限 = ${k}。`;
      } else {
        const k = rnd(1, 5);
        o = opts(`${k}`, () => `0`, () => `1`, () => `∞`);
        q = `lim_{x→0} (e^(${k}x) − 1)/x = ？`;
        exp = `e^(${k}x)−1 ~ ${k}x，故极限 = ${k}。`;
      }
      results.push(Q(q, o, "基础", exp, "重要极限"));
    }
    return results;
  }

  /* ---------- 拓展：棣莫弗定理（de_moivre） ---------- */
  function qDeMoivre(n) {
    const results = [];
    const pow1i = (p) => {
      const mag = Math.pow(2, p / 2), ang = p * Math.PI / 4;
      const re = Math.round(mag * Math.cos(ang)), im = Math.round(mag * Math.sin(ang));
      if (im === 0) return `${re}`;
      if (re === 0) return `${im}i`;
      return `${re} + ${im}i`;
    };
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const m = rnd(2, 6);
        o = opts(`cos(${m}θ)+i·sin(${m}θ)`, () => `cos θ + i·sin(${m}θ)`, () => `${m}(cos θ + i·sin θ)`, () => `cos(${m}θ)·sin(${m}θ)`);
        q = `(cos θ + i·sin θ)^${m} = ？`;
        exp = `棣莫弗定理：(cosθ+i sinθ)^${m} = cos(${m}θ)+i sin(${m}θ)。`;
      } else if (type === 1) {
        const r = rnd(2, 6), m = rnd(2, 5);
        const root = Math.pow(r, 1 / m).toFixed(2);
        o = opts(`${root}(cos((θ+2kπ)/${m}) + i·sin((θ+2kπ)/${m}))`, () => `${r}(cos(θ/${m}) + i·sin(θ/${m}))`, () => `${root}(cos θ + i·sin θ)`, () => `${Math.pow(r, 1 / m).toFixed(2)}(cos((θ+2kπ)/${m + 1}) + i·sin((θ+2kπ)/${m + 1}))`);
        q = `复数 z = ${r}(cos θ + i·sin θ) 的 ${m} 次方根（k=0,…,${m - 1}）是？`;
        exp = `${m} 次方根模为 r^{1/${m}}=${root}，辐角 (θ+2kπ)/${m}。`;
      } else if (type === 2) {
        const nn = rnd(2, 8);
        o = opts(`${nn} 个`, () => `1 个`, () => `2 个`, () => `无穷多个`);
        q = `方程 z^${nn} = 1（${nn} 为正整数）在复数范围内的根有？`;
        exp = `单位圆上的 ${nn} 次单位根共 ${nn} 个：e^{2πik/${nn}}（k=0,…,${nn}-1）。`;
      } else if (type === 3) {
        const p = [2, 4, 6, 8][rnd(0, 3)];
        const val = pow1i(p);
        o = opts(val, () => p === 2 ? "-2i" : "4", () => "0", () => `${p}`);
        q = `(1+i)^${p} = ？`;
        exp = `1+i = √2·e^{iπ/4}，故 (1+i)^${p} = 2^{${p}/2}·e^{i${p}π/4} = ${val}。`;
      } else if (type === 4) {
        const th = rnd(15, 75);
        o = opts(`cos ${th}° − i·sin ${th}°`, () => `cos ${th}° + i·sin ${th}°`, () => `−cos ${th}° + i·sin ${th}°`, () => `1/(cos ${th}° + i·sin ${th}°)`);
        q = `(cos ${th}° + i·sin ${th}°)^{−1} = ？`;
        exp = `由棣莫弗：(cosθ+i sinθ)^{−1} = cos(−θ)+i sin(−θ) = cosθ − i sinθ。`;
      } else if (type === 5) {
        const m = rnd(2, 5);
        o = opts(`cos(${m}θ) − i·sin(${m}θ)`, () => `cos(${m}θ) + i·sin(${m}θ)`, () => `−cos(${m}θ) + i·sin(${m}θ)`, () => `${m}(cos θ − i·sin θ)`);
        q = `(cos θ + i·sin θ)^{−${m}} = ？`;
        exp = `负幂：= cos(−${m}θ)+i sin(−${m}θ) = cos(${m}θ) − i·sin(${m}θ)。`;
      } else if (type === 6) {
        const th = rnd(20, 70);
        o = opts("cos²θ − sin²θ", () => "2·sinθ·cosθ", () => "cos²θ + sin²θ", () => "1 − 2sin²θ");
        q = `由棣莫弗，(cos ${th}° + i·sin ${th}°)² 的实部（即 cos 2${th}°）等于？`;
        exp = `(cosθ+i sinθ)² = cos2θ + i sin2θ = cos²θ−sin²θ + i·2sinθcosθ，实部 = cos²θ−sin²θ。`;
      } else if (type === 7) {
        const nn = rnd(2, 8);
        o = opts("0", () => "1", () => `${nn}`, () => "−1");
        q = `方程 z^${nn} = 1 的全部 ${nn} 个根（单位根）之和 = ？`;
        exp = `单位根 e^{2πik/${nn}}（k=0..${nn}-1）是等比数列求和，和为 0。`;
      } else if (type === 8) {
        const r = rnd(2, 8), m = rnd(2, 5);
        o = opts(`r^{1/${m}} = ${Math.pow(r, 1 / m).toFixed(2)}`, () => `r`, () => `${r * m}`, () => `${Math.pow(r, m).toFixed(2)}`);
        q = `复数 z = ${r}(cos θ + i·sin θ) 的 ${m} 次方根的模（公共）是？`;
        exp = `n 次方根模均为 r^{1/${m}（≈ ${Math.pow(r, 1 / m).toFixed(2)}）}`;
      } else {
        const th = rnd(15, 60);
        o = opts("2·sinθ·cosθ（即 sin 2θ）", () => "cos²θ − sin²θ", () => "sin²θ + cos²θ", () => "2·cos²θ − 1");
        q = `由棣莫弗，(cos ${th}° + i·sin ${th}°)² 的虚部（即 sin 2${th}°）等于？`;
        exp = `展开虚部 = 2sinθcosθ，即 sin2θ。`;
      }
      results.push(Q(q, o, type === 2 ? "基础" : "进阶", exp, "棣莫弗定理"));
    }
    return results;
  }

  /* ---------- 拓展：随机变量与数字特征（random_var） ---------- */
  function qRandVar(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(2, 5), b = rnd(1, 5), mu = rnd(1, 4);
        o = opts(`${a * mu + b}`, () => `${a * mu}`, () => `${mu + b}`, () => `${a * mu - b}`);
        q = `若 E(X)=${mu}，则 E(${a}X+${b}) = ？`;
        exp = `线性性质：E(aX+b)=aE(X)+b = ${a}·${mu}+${b} = ${a * mu + b}。`;
      } else if (type === 1) {
        const a = rnd(2, 5), s2 = rnd(1, 4);
        o = opts(`${a * a * s2}`, () => `${a * s2}`, () => `${s2}`, () => `${a * a + s2}`);
        q = `若 D(X)=${s2}，则 D(${a}X) = ？`;
        exp = `D(aX)=a²D(X)=${a}²·${s2}=${a * a * s2}。`;
      } else if (type === 2) {
        const p = rnd(2, 8) / 10, dp = (p * (1 - p)).toFixed(2);
        o = opts(`E=${p}, D=${dp}`, () => `E=${p}, D=${(p * p).toFixed(2)}`, () => `E=${dp}, D=${p}`, () => `E=${1 - p}, D=${p}`);
        q = `X~两点分布，P(X=1)=${p}，则 E(X)、D(X) 是？`;
        exp = `两点分布：E=p=${p}，D=p(1-p)=${dp}。`;
      } else {
        const nn = rnd(5, 15), p = rnd(2, 7) / 10, e = (nn * p).toFixed(0), d = (nn * p * (1 - p)).toFixed(2);
        o = opts(`E=${e}, D=${d}`, () => `E=${nn}, D=${d}`, () => `E=${e}, D=${(nn * p * nn * p).toFixed(2)}`, () => `E=${p}, D=${d}`);
        q = `X~B(${nn}, ${p})（二项分布），则 E(X)、D(X) 是？`;
        exp = `二项分布：E=np=${nn}·${p}=${e}，D=np(1-p)=${d}。`;
      }
      results.push(Q(q, o, "进阶", exp, "随机变量"));
    }
    return results;
  }

  /* ---------- 拓展：傅里叶级数初步（fourier） ---------- */
  function qFourier(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const T = rnd(2, 20);
        o = opts("a₀/2 + Σ(aₙ cos(nωx) + bₙ sin(nωx))", () => "Σ aₙ xⁿ", () => "Σ aₙ eⁿ", () => "a₀ + Σ aₙ cos(nx)");
        q = `周期为 T=${T} 的函数可展开为（ω=2π/T）？`;
        exp = `傅里叶级数：f(x) ~ a₀/2 + Σ(aₙ cos(nωx) + bₙ sin(nωx))。`;
      } else if (type === 1) {
        const k = rnd(1, 12);
        o = opts("只有正弦项（bₙ）", () => "只有余弦项（aₙ）", () => "只有常数项", () => "既有正弦又有余弦");
        q = `奇函数 f(x)=sin(${k}x)（满足 f(−x)=−f(x)）的傅里叶展开？`;
        exp = `奇函数：aₙ=0，只含正弦项（正弦级数）。`;
      } else if (type === 2) {
        const k = rnd(1, 12);
        o = opts("只有余弦项（aₙ）", () => "只有正弦项（bₙ）", () => "只有常数项", () => "既有正弦又有余弦");
        q = `偶函数 f(x)=cos(${k}x)（满足 f(−x)=f(x)）的傅里叶展开？`;
        exp = `偶函数：bₙ=0，只含余弦项（余弦级数）。`;
      } else if (type === 3) {
        const T = rnd(2, 20);
        const w = (2 * Math.PI / T).toFixed(2);
        o = opts(`ω=${w}`, () => `${(Math.PI / T).toFixed(2)}`, () => `${(4 * Math.PI / T).toFixed(2)}`, () => `${(T / (2 * Math.PI)).toFixed(2)}`);
        q = `周期为 T=${T} 的函数，基频 ω = ？`;
        exp = `基频 ω = 2π/T = 2π/${T} = ${w}。`;
      } else if (type === 4) {
        const A = rnd(1, 8);
        o = opts(`(1/π)∫_{−π}^{π} f(x) dx`, () => `(1/T)∫ f`, () => `(2/π)∫ f`, () => `∫ f`);
        q = `对周期 2π 的函数 f(x)=${A}·g(x)，傅里叶系数 a₀（出现在 a₀/2 中）的计算公式是？`;
        exp = `a₀ = (1/π)∫_{−π}^{π} f(x) dx（故常数项为 a₀/2）。`;
      } else if (type === 5) {
        const N = rnd(1, 12);
        o = opts(`(1/π)∫_{−π}^{π} f(x) sin(${N}x) dx`, () => `(1/π)∫ f(x) cos(${N}x) dx`, () => `(1/${N})∫ f`, () => `∫ f(x) sin(${N}x) dx`);
        q = `对周期 2π 的函数，傅里叶正弦系数 b_${N} = ？`;
        exp = `b_n = (1/π)∫_{−π}^{π} f(x) sin(nx) dx，取 n=${N}。`;
      } else if (type === 6) {
        const k = rnd(1, 10);
        o = opts("bₙ = 0（全为 0）", () => "aₙ = 0", () => "a₀ = 0", () => "全部非零");
        q = `若 f(x)=cos(${k}x)（偶函数），则其傅里叶正弦系数 bₙ ？`;
        exp = `偶函数只含余弦项，故所有 bₙ = 0。`;
      } else if (type === 7) {
        const x0 = rnd(1, 12);
        o = opts(`(f(x₀⁺) + f(x₀⁻)) / 2`, () => `f(x₀)`, () => `0`, () => `(f(x₀⁺) − f(x₀⁻)) / 2`);
        q = `在间断点 x=${x0} 处，傅里叶级数收敛到？`;
        exp = `狄利克雷定理：收敛到左右极限的平均值 (f(x₀⁺)+f(x₀⁻))/2。`;
      } else if (type === 8) {
        const N = rnd(1, 5);
        const sign = (N % 2 === 1) ? "" : "−";
        o = opts(`${sign}2/${N}`, () => `2/${N}`, () => `${sign}1/${N}`, () => `${sign}2/${N + 1}`);
        q = `f(x)=x（−π<x<π）的傅里叶正弦系数 b_${N} = ？`;
        exp = `b_n = 2(−1)^{n+1}/n，取 n=${N} 得 ${sign}2/${N}。`;
      } else {
        const L = rnd(2, 6);
        o = opts("正弦级数（奇延拓）", () => "余弦系列（偶延拓）", () => "既有正弦又有余弦", () => "只有常数项");
        q = `定义在 [0,${L}] 上的函数做奇延拓后，其傅里叶展开是？`;
        exp = `奇延拓把函数变成奇函数，展开为正弦级数。`;
      }
      results.push(Q(q, o, "基础", exp, "傅里叶级数"));
    }
    return results;
  }

  /* ---------- 拓展：定积分应用（integral_app） ---------- */
  function qIntApp(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(0, 2), b = rnd(3, 6), area = (b * b - a * a) / 2;
        o = opts(`${area}`, () => `${b * b - a * a}`, () => `${b - a}`, () => `${(b * b * a * a) / 2}`);
        q = `曲线 y=x 与 x 轴在 [${a}, ${b}] 围成的面积 = ∫_{${a}}^{${b}} x dx = ？`;
        exp = `∫ x dx = x²/2，面积 = (${b}²−${a}²)/2 = ${area}。`;
      } else if (type === 1) {
        const a = rnd(0, 2), b = rnd(2, 5), V = (Math.PI * (b * b * b - a * a * a) / 3).toFixed(2);
        o = opts(`${V}`, () => `${(Math.PI * (b - a) / 3).toFixed(2)}`, () => `${(Math.PI * (b * b - a * a) / 3).toFixed(2)}`, () => `${(Math.PI * (b * b * b - a * a * a) / 2).toFixed(2)}`);
        q = `y=x 绕 x 轴在 [${a}, ${b}] 旋转所得体积 V = π∫_{${a}}^{${b}} x² dx = ？`;
        exp = `π∫ x² dx = π·x³/3，V = π(${b}³−${a}³)/3 = ${V}。`;
      } else if (type === 2) {
        const a = rnd(0, 3), b = rnd(4, 8), avg = (b * b - a * a) / (2 * (b - a));
        o = opts(`${avg.toFixed(2)}`, () => `${(b + a).toFixed(2)}`, () => `${(b * b - a * a).toFixed(2)}`, () => `${(b - a).toFixed(2)}`);
        q = `函数 y=x 在 [${a}, ${b}] 上的平均值 = ？`;
        exp = `平均值 = (1/(b−a))∫ x dx = (a+b)/2 = ${avg.toFixed(2)}。`;
      } else if (type === 3) {
        const b = rnd(2, 6), L = (Math.SQRT2 * b).toFixed(2);
        o = opts(`${L}`, () => `${b.toFixed(2)}`, () => `${(2 * b).toFixed(2)}`, () => `${(Math.SQRT2 * (b + 1)).toFixed(2)}`);
        q = `曲线 y=x（0≤x≤${b}）的弧长 = ？`;
        exp = `弧长 = ∫_0^${b} √(1+(y')²) dx = ∫_0^${b} √2 dx = √2·${b} = ${L}。`;
      } else if (type === 4) {
        const a = rnd(0, 2), b = rnd(2, 5), area = (b * b * b - a * a * a) / 3;
        o = opts(`${area}`, () => `${(b * b - a * a).toFixed(2)}`, () => `${b - a}`, () => `${(b * b * b * b - a * a * a * a) / 4}`);
        q = `曲线 y=x² 与 x 轴在 [${a}, ${b}] 围成的面积 = ∫_{${a}}^{${b}} x² dx = ？`;
        exp = `∫ x² dx = x³/3，面积 = (${b}³−${a}³)/3 = ${area}。`;
      } else if (type === 5) {
        const a = rnd(0, 2), b = rnd(2, 4), V = (Math.PI * (Math.pow(b, 5) - Math.pow(a, 5)) / 5).toFixed(2);
        o = opts(`${V}`, () => `${(Math.PI * (b * b * b - a * a * a) / 3).toFixed(2)}`, () => `${(Math.PI * (b - a) / 5).toFixed(2)}`, () => `${(Math.PI * (Math.pow(b, 5) - Math.pow(a, 5)) / 3).toFixed(2)}`);
        q = `y=x² 绕 x 轴在 [${a}, ${b}] 旋转所得体积 = π∫_{${a}}^{${b}} x⁴ dx = ？`;
        exp = `π∫ x⁴ dx = π·x⁵/5，V = π(${b}⁵−${a}⁵)/5 = ${V}。`;
      } else if (type === 6) {
        const a = rnd(0, 2), b = rnd(3, 6);
        const avg = (b * b * b - a * a * a) / (3 * (b - a));
        o = opts(`${avg.toFixed(2)}`, () => `${(b * b - a * a).toFixed(2)}`, () => `${(b + a).toFixed(2)}`, () => `${(b - a).toFixed(2)}`);
        q = `函数 y=x² 在 [${a}, ${b}] 上的平均值 = ？`;
        exp = `平均值 = (1/(b−a))∫ x² dx = (b³−a³)/(3(b−a)) = ${avg.toFixed(2)}。`;
      } else if (type === 7) {
        const a = rnd(0, 2), b = rnd(3, 6), c = rnd(1, 3);
        const area = (b * b - a * a) / 2 - c * (b - a);
        o = opts(`${area}`, () => `${(b * b - a * a) / 2}`, () => `${c * (b - a)}`, () => `${b - a}`);
        q = `曲线 y=x 与直线 y=${c} 在 [${a}, ${b}] 之间围成的面积 = ？`;
        exp = `面积 = ∫(x−${c})dx = (${b}²−${a}²)/2 − ${c}(${b}−${a}) = ${area}。`;
      } else if (type === 8) {
        const k = rnd(1, 4), b = rnd(2, 5);
        const L = (b * Math.sqrt(1 + k * k)).toFixed(2);
        o = opts(`${L}`, () => `${(b * k).toFixed(2)}`, () => `${b.toFixed(2)}`, () => `${(b * Math.sqrt(k)).toFixed(2)}`);
        q = `曲线 y=${k}x（0≤x≤${b}）的弧长 = ？`;
        exp = `弧长 = ∫_0^${b} √(1+${k}²) dx = ${b}√(1+${k}²) = ${L}。`;
      } else {
        const b = rnd(2, 6), area = (b * b) / 2;
        o = opts(`${area}`, () => `${b * b}`, () => `${b}`, () => `${(b * b * b) / 3}`);
        q = `曲线 y=x 与 x 轴在 [0, ${b}] 围成的三角形面积 = ？`;
        exp = `面积 = ∫_0^${b} x dx = ${b}²/2 = ${area}。`;
      }
      results.push(Q(q, o, "进阶", exp, "定积分应用"));
    }
    return results;
  }

  /* ---------- 拓展：函数图像变换（graph_transform） ---------- */
  function qGraphTrans(n) {
    const results = [];
    const FN = ["x²", "sin x", "eˣ", "ln x", "√x"];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(1, 12);
        o = opts(`向右平移 ${a}`, () => `向左平移 ${a}`, () => `向上平移 ${a}`, () => `关于 y 轴对称`);
        q = `将 y=f(x) 变为 y=f(x−${a}) 的变换是？`;
        exp = `y=f(x−a) 是 y=f(x) 向右平移 ${a} 个单位（左加右减）。`;
      } else if (type === 1) {
        const fn = pick(FN), c = rnd(2, 9);
        o = opts("关于 y 轴对称", () => "关于 x 轴对称", () => "关于原点对称", () => "向右平移 1");
        q = `y=f(x)=${c}·${fn} → y=f(−x) 的变换是？`;
        exp = "x 取相反数，图像关于 y 轴对称。";
      } else if (type === 2) {
        const A = rnd(2, 12);
        o = opts(`纵向拉伸为 ${A} 倍`, () => `纵向压缩为 ${A} 倍`, () => `横向拉伸为 ${A} 倍`, () => `横向压缩为 ${A} 倍`);
        q = `y=f(x) → y=${A}f(x) 的变换是？`;
        exp = `系数乘在函数值上：纵坐标变为原来的 ${A} 倍（纵向伸缩）。`;
      } else if (type === 3) {
        const fn = pick(FN), c = rnd(2, 9);
        o = opts("将 x 轴下方的部分翻折到上方", () => "将 y 轴左侧翻折到右侧", () => "整体向上平移", () => "关于 y 轴对称");
        q = `y=f(x)=${c}·${fn} → y=|f(x)| 的变换是？`;
        exp = "y=|f(x)|：保留 x 轴上方，将下方部分沿 x 轴翻折到上方。";
      } else if (type === 4) {
        const a = rnd(1, 12);
        o = opts(`向上平移 ${a}`, () => `向下平移 ${a}`, () => `向左平移 ${a}`, () => `纵向拉伸 ${a} 倍`);
        q = `y=f(x) → y=f(x)+${a} 的变换是？`;
        exp = `函数值整体加 ${a}：图像向上平移 ${a} 个单位。`;
      } else if (type === 5) {
        const a = rnd(2, 12);
        o = opts(`横向压缩为原来的 1/${a}`, () => `横向拉伸为 ${a} 倍`, () => `纵向压缩为 1/${a}`, () => `向右平移 ${a}`);
        q = `y=f(x) → y=f(${a}x)（${a}>1）的变换是？`;
        exp = `x 乘 ${a}>1：周期变短，图像横向压缩为原来的 1/${a}。`;
      } else if (type === 6) {
        const fn = pick(FN), c = rnd(2, 9);
        o = opts("关于 x 轴对称", () => "关于 y 轴对称", () => "关于原点对称", () => "向上平移 1");
        q = `y=f(x)=${c}·${fn} → y=−f(x) 的变换是？`;
        exp = "函数值取相反数，图像关于 x 轴对称（上下翻转）。";
      } else if (type === 7) {
        const a = rnd(1, 12);
        o = opts(`向左平移 ${a}`, () => `向右平移 ${a}`, () => `向上平移 ${a}`, () => `关于 y 轴对称`);
        q = `y=f(x) → y=f(x+${a}) 的变换是？`;
        exp = `y=f(x+a) 是 y=f(x) 向左平移 ${a} 个单位（左加右减）。`;
      } else if (type === 8) {
        const a = rnd(1, 8), b = rnd(1, 8);
        o = opts(`先关于 y 轴对称再向上平移 ${b}`, () => `先向上平移 ${b} 再关于 y 轴对称`, () => `向右平移 ${a} 再上移 ${b}`, () => `关于原点对称再上移 ${b}`);
        q = `y=f(x) → y=f(−x)+${b} 的变换顺序是？`;
        exp = `先作 x→−x（关于 y 轴对称），再加 ${b}（向上平移 ${b}）。`;
      } else {
        const a = rnd(1, 8), b = rnd(1, 8);
        o = opts(`向右平移 ${a} 且向上平移 ${b}`, () => `向左平移 ${a} 且向下平移 ${b}`, () => `关于 y 轴对称`, () => `纵向拉伸 ${a} 倍`);
        q = `y=f(x) → y=f(x−${a})+${b} 的变换是？`;
        exp = `右移 ${a} 单位、上移 ${b} 单位（x−${a} 右移、+${b} 上移）。`;
      }
      results.push(Q(q, o, "基础", exp, "图像变换"));
    }
    return results;
  }

  /* ============================================================
   * 拓展 · 极坐标深化（十二年级+）
   * ============================================================ */
  function qPolarDeep(n) {
    const results = [];
    const TH = [Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(1, 12), b = rnd(1, 12);
        const rho = Math.sqrt(a * a + b * b);
        o = opts(`${rho.toFixed(2)}`, () => `${(a + b).toFixed(2)}`, () => `${Math.abs(a - b)}`, () => `${(a * a + b * b)}`);
        q = `直角坐标点 (${a}, ${b}) 的极径 ρ = ？`;
        exp = `ρ = √(a²+b²) = √(${a*a}+${b*b}) ≈ ${rho.toFixed(2)}。`;
      } else if (type === 1) {
        const th = pick(TH), rho = rnd(2, 8);
        const x = (rho * Math.cos(th)).toFixed(2), y = (rho * Math.sin(th)).toFixed(2);
        o = opts(`(${x}, ${y})`, () => `(${y}, ${x})`, () => `(${-x}, ${y})`, () => `(${rho}, ${rho})`);
        q = `极坐标 (ρ=${rho}, θ=${(th * 180 / Math.PI).toFixed(0)}°) 的直角坐标是？`;
        exp = `x=ρcosθ≈${x}, y=ρsinθ≈${y}。`;
      } else if (type === 2) {
        const a = rnd(1, 6);
        o = opts(`(${a}, 0)`, () => `(0, ${a})`, () => `(-${a}, 0)`, () => `(0, 0)`);
        q = `极坐标方程 ρ = 2·${a}·cosθ 表示的圆，其圆心是？`;
        exp = `ρ=2a cosθ → x²+y²=2ax → (x−${a})²+y²=${a}²，圆心(${a},0)。`;
      } else if (type === 3) {
        const r1 = rnd(2, 7), r2 = rnd(2, 7), th = pick(TH);
        const d = Math.sqrt(r1 * r1 + r2 * r2 - 2 * r1 * r2 * Math.cos(th));
        o = opts(`${d.toFixed(2)}`, () => `${(r1 + r2).toFixed(2)}`, () => `${Math.abs(r1 - r2).toFixed(2)}`, () => `${(r1 * r2).toFixed(2)}`);
        q = `极坐标 P1(${r1}, 0)、P2(${r2}, ${(th * 180 / Math.PI).toFixed(0)}°)，两点距离 = ？`;
        exp = `d² = ρ1²+ρ2²−2ρ1ρ2cos(${(th * 180 / Math.PI).toFixed(0)}°) ≈ ${d.toFixed(2)}²。`;
      } else if (type === 4) {
        const R = rnd(2, 9);
        o = opts(`ρ = ${R}`, () => `ρ = ${R * R}`, () => `θ = ${R}`, () => `ρ = 2${R}`);
        q = `直角坐标方程 x² + y² = ${R * R} 化为极坐标是？`;
        exp = `x²+y²=ρ²，故 ρ²=${R * R} → ρ=${R}。`;
      } else if (type === 5) {
        const x = rnd(2, 9), y = rnd(2, 9);
        const ang = (Math.atan2(y, x) * 180 / Math.PI).toFixed(1);
        o = opts(`${ang}°`, () => `${(Math.atan2(x, y) * 180 / Math.PI).toFixed(1)}°`, () => `${(90 - Math.atan2(y, x) * 180 / Math.PI).toFixed(1)}°`, () => `0°`);
        q = `直角坐标点 (${x}, ${y}) 的极角 θ（主值，度）约为？`;
        exp = `tanθ = ${y}/${x}，第一象限，θ ≈ ${ang}°。`;
      } else if (type === 6) {
        const b = rnd(1, 7);
        o = opts(`y = ${b}`, () => `x = ${b}`, () => `y = ${b * b}`, () => `x²+y² = ${b}`);
        q = `极坐标方程 ρ·sinθ = ${b} 化为直角坐标方程是？`;
        exp = `ρsinθ = y，故 y = ${b}（一条水平直线）。`;
      } else if (type === 7) {
        const a = rnd(1, 6);
        o = opts(`(0, ${a})`, () => `(${a}, 0)`, () => `(-${a}, 0)`, () => `(0, 0)`);
        q = `极坐标方程 ρ = 2·${a}·sinθ 表示的圆，其圆心是？`;
        exp = `ρ=2a sinθ → x²+y²=2ay → x²+(y−${a})²=${a}²，圆心(0,${a})。`;
      } else if (type === 8) {
        const R = rnd(2, 6), th = pick(TH);
        const area = (0.5 * R * R * th).toFixed(2);
        o = opts(`${area}`, () => `${(R * R * th).toFixed(2)}`, () => `${(0.5 * R * th).toFixed(2)}`, () => `${R.toFixed(2)}`);
        q = `极坐标曲线 ρ = ${R} 在 θ∈[0, ${(th * 180 / Math.PI).toFixed(0)}°] 扫过的面积 = ？`;
        exp = `面积 = (1/2)∫ρ²dθ = (1/2)·${R}²·${(th * 180 / Math.PI).toFixed(0)}°(弧度) ≈ ${area}。`;
      } else {
        const x = rnd(1, 9), y = rnd(1, 9);
        const rho = Math.sqrt(x * x + y * y);
        o = opts(`${rho.toFixed(2)}`, () => `${(x + y).toFixed(2)}`, () => `${(x * x + y * y)}`, () => `${Math.abs(x - y).toFixed(2)}`);
        q = `直角坐标点 (${x}, ${y}) 的极径 ρ = ？`;
        exp = `ρ = √(x²+y²) = √(${x*x}+${y*y}) ≈ ${rho.toFixed(2)}。`;
      }
      results.push(Q(q, o, "进阶", exp, "极坐标深化", type === 0 ? "polar_grid" : null));
    }
    return results;
  }

  /* ============================================================
   * 拓展 · 参数方程求最值（十二年级+）
   * ============================================================ */
  function qParamExtremum(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(1, 8);
        const m = (a * Math.SQRT2).toFixed(2);
        o = opts(`${m}`, () => `${a}`, () => `${2 * a}`, () => `1`);
        q = `参数方程 x=${a}cosθ, y=${a}sinθ，则 x+y 的最大值为？`;
        exp = `x+y = ${a}(cosθ+sinθ)，振幅 ${a}√2，最大 ${m}。`;
      } else if (type === 1) {
        const a = rnd(1, 7), b = rnd(1, 7);
        const m = Math.sqrt(a * a + b * b).toFixed(2);
        o = opts(`${m}`, () => `${(a + b).toFixed(2)}`, () => `${Math.max(a, b)}`, () => `${a * b}`);
        q = `参数方程 x=${a}cosθ, y=${b}sinθ，则 x+y 的最大值为？`;
        exp = `a cosθ+b sinθ 振幅 √(a²+b²)=√(${a*a}+${b*b}) ≈ ${m}。`;
      } else if (type === 2) {
        const p = rnd(2, 8), q2 = rnd(1, 9);
        const m = (q2 - p * p / 4).toFixed(2);
        o = opts(`${m}`, () => `${q2}`, () => `${(q2 - p).toFixed(2)}`, () => `${-p}`);
        q = `参数方程 x=t, y=t²−${p}t+${q2}，则 y 的最小值为？`;
        exp = `y=(t−${p}/2)² + (${q2} − ${p}²/4)，顶点处最小 ≈ ${m}。`;
      } else if (type === 3) {
        const a = rnd(1, 6), b = rnd(1, 6);
        o = opts(`${a + b}`, () => `${a}`, () => `${b}`, () => `${Math.sqrt(a * a + b * b).toFixed(2)}`);
        q = `参数方程 x=${a}+${b}cosθ, y=${b}sinθ（圆），点 (x,y) 到原点距离的最大值是？`;
        exp = `圆心(${a},0)、半径 ${b}，到原点最大距离 = ${a}+${b}。`;
      } else if (type === 4) {
        const A = rnd(1, 6), B = rnd(1, 6);
        const m = (A * B / 4).toFixed(2);
        o = opts(`${m}`, () => `${(A * B).toFixed(2)}`, () => `${(A / 4).toFixed(2)}`, () => `${(B / 4).toFixed(2)}`);
        q = `参数方程 x=${A}cos²θ, y=${B}sin²θ，则 xy 的最大值为？`;
        exp = `xy = ${A}${B}cos²θsin²θ = (${A}${B}/4)sin²2θ ≤ ${A}${B}/4 ≈ ${m}。`;
      } else if (type === 5) {
        const a = rnd(1, 6), b = rnd(1, 6), p = rnd(1, 5), q2 = rnd(1, 5);
        const m = Math.sqrt(p * p * a * a + q2 * q2 * b * b).toFixed(2);
        o = opts(`${m}`, () => `${(p * a + q2 * b).toFixed(2)}`, () => `${(p * b + q2 * a).toFixed(2)}`, () => `${a + b}`);
        q = `参数方程 x=${a}cosθ, y=${b}sinθ，则 ${p}x+${q2}y 的最大值为？`;
        exp = `${p}·${a}cosθ+${q2}·${b}sinθ 振幅 √((${p}${a})²+(${q2}${b})²) ≈ ${m}。`;
      } else if (type === 6) {
        const a = rnd(1, 9);
        const m = (2 * Math.sqrt(a)).toFixed(2);
        o = opts(`${m}`, () => `${a}`, () => `${Math.sqrt(a).toFixed(2)}`, () => `1`);
        q = `参数 t>0，x = t + ${a}/t 的最小值为（均值不等式）？`;
        exp = `t>0 时 t+${a}/t ≥ 2√(${a}) ≈ ${m}，t=√${a} 取等。`;
      } else if (type === 7) {
        const a = rnd(1, 6), b = rnd(2, 9);
        const m = (b * b / (4 * a)).toFixed(2);
        o = opts(`${m}`, () => `${(b / (2 * a)).toFixed(2)}`, () => `${(b * b / a).toFixed(2)}`, () => `${b}`);
        q = `参数方程 y = −${a}t² + ${b}t（抛体高度），y 的最大值为？`;
        exp = `顶点 t=${b}/(2${a})，y = ${b}²/(4${a}) ≈ ${m}。`;
      } else if (type === 8) {
        const R = rnd(1, 8);
        o = opts(`${R * R}`, () => `${R}`, () => `${2 * R}`, () => `${R * R * R}`);
        q = `参数方程 x=${R}cosθ, y=${R}sinθ，则 x²+y² = ？`;
        exp = `x²+y² = ${R}²cos²θ+${R}²sin²θ = ${R}²（`;
      } else {
        const A = rnd(1, 6), B = rnd(1, 6);
        const area = (Math.PI * A * B).toFixed(2);
        o = opts(`${area}`, () => `${(2 * A * B).toFixed(2)}`, () => `${(Math.PI * Math.max(A, B)).toFixed(2)}`, () => `${(A * B).toFixed(2)}`);
        q = `参数方程 x=${A}cosθ, y=${B}sinθ 表示的椭圆面积是？`;
        exp = `椭圆面积 = π·${A}·${B} ≈ ${area}。`;
      }
      results.push(Q(q, o, "进阶", exp, "参数方程求最值", type === 3 ? "param_curve" : null));
    }
    return results;
  }

  /* ============================================================
   * 拓展 · 向量法解立体几何进阶（十二年级+）
   * ============================================================ */
  function qVectorGeoAdv(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(1, 9), b = rnd(1, 9);
        o = opts("90°", () => "0°", () => "45°", () => "180°");
        q = `方向向量 u=(${a},0,0)、v=(0,${b},0) 的两直线夹角 = ？`;
        exp = `u·v=0 → 夹角 90°。`;
      } else if (type === 1) {
        const a = rnd(1, 9), b = rnd(1, 9), c = rnd(1, 9);
        const s = Math.sqrt(a * a + b * b + c * c);
        const sinp = (c / s).toFixed(3);
        o = opts(`${sinp}`, () => `${(a / s).toFixed(3)}`, () => `${(Math.sqrt(a * a + c * c) / s).toFixed(3)}`, () => `1`);
        q = `直线方向向量 s=(${a},${b},${c})，平面法向量 n=(0,0,1)，则线面角 φ 满足 sinφ = ？`;
        exp = `sinφ = |s·n|/(|s||n|) = ${c}/${s.toFixed(3)} ≈ ${sinp}。`;
      } else if (type === 2) {
        const a = rnd(1, 9), b = rnd(1, 9);
        o = opts("0", () => "1", () => "1/√2", () => "√2/2");
        q = `两平面法向量 n1=(${a},0,0)、n2=(0,${b},0)，二面角的余弦绝对值 = ？`;
        exp = `n1·n2=0，cos=0，二面角为 90°。`;
      } else if (type === 3) {
        const a = rnd(1, 6), b = rnd(1, 6), c = rnd(1, 6);
        const p = rnd(1, 6), q2 = rnd(1, 6), r = rnd(1, 6);
        const num = a * p + b * q2 + c * r;
        const den = Math.sqrt(a * a + b * b + c * c);
        const d = (Math.abs(num) / den).toFixed(2);
        o = opts(`${d}`, () => `${(Math.abs(num)).toFixed(2)}`, () => `${den.toFixed(2)}`, () => `${(Math.abs(num) / (a + b + c)).toFixed(2)}`);
        q = `平面 ${a}x+${b}y+${c}z=0 到点 P(${p},${q2},${r}) 的距离是？`;
        exp = `d = |${a}·${p}+${b}·${q2}+${c}·${r}|/√(${a*a}+${b*b}+${c*c}) = |${num}|/${den.toFixed(2)} ≈ ${d}。`;
      } else if (type === 4) {
        const a = rnd(1, 9), b = rnd(1, 9), c = rnd(1, 9);
        const cosv = (b / Math.sqrt(b * b + c * c)).toFixed(3);
        o = opts(`${cosv}`, () => `${(a / Math.sqrt(b * b + c * c)).toFixed(3)}`, () => `${(c / Math.sqrt(a * a + b * b)).toFixed(3)}`, () => `1`);
        q = `向量 a=(${a},0,0)、b=(${b},${c},0) 的夹角余弦 cosθ = ？`;
        exp = `cosθ = a·b/(|a||b|) = ${a}·${b}/(${a}·√(${b*b}+${c*c})) = ${b}/√(${b*b}+${c*c}) ≈ ${cosv}。`;
      } else if (type === 5) {
        const a = rnd(1, 9), b = rnd(1, 9);
        o = opts("垂直", () => "平行", () => "夹角 60°", () => "重合");
        q = `方向向量 u=(${a},${b},0)、v=(−${b},${a},0) 的两直线位置 = ？`;
        exp = `u·v = −${a}·${b}+${b}·${a}+0 = 0 → 两直线垂直。`;
      } else if (type === 6) {
        const a = rnd(1, 9), b = rnd(1, 9), c = rnd(1, 9);
        const len = Math.sqrt(a * a + b * b + c * c).toFixed(2);
        o = opts(`${len}`, () => `${(a * a + b * b + c * c)}`, () => `${a + b + c}`, () => `${Math.max(a, b, c)}`);
        q = `向量 AB = (${a},${b},${c})，则 |AB| = ？`;
        exp = `|AB| = √(${a*a}+${b*b}+${c*c}) = √(${a*a+b*b+c*c}) ≈ ${len}。`;
      } else if (type === 7) {
        const a = rnd(1, 9), b = rnd(1, 9), c = rnd(1, 9);
        o = opts(`${a}x+${b}y+${c}z=0`, () => `${a}x+${b}y+${c}z=1`, () => `${a}x−${b}y+${c}z=0`, () => `${a}x²+${b}y²+${c}z²=0`);
        q = `过原点、法向量 n=(${a},${b},${c}) 的平面方程是？`;
        exp = `平面: n·(x,y,z) = 0 → ${a}x+${b}y+${c}z=0。`;
      } else if (type === 8) {
        const a = rnd(1, 9), b = rnd(1, 9), c = rnd(1, 9);
        const dot = a * b + b * c + c * a;
        o = opts(`${dot}`, () => `${a * a + b * b + c * c}`, () => `${a + b + c}`, () => `0`);
        q = `向量 u=(${a},${b},${c})、v=(${b},${c},${a}) 的点积 u·v = ？`;
        exp = `u·v = ${a}·${b}+${b}·${c}+${c}·${a} = ${dot}。`;
      } else {
        const a = rnd(1, 9), b = rnd(1, 9), c = rnd(1, 9);
        o = opts("0", () => `${a * a + b * b + c * c}`, () => `${a + b + c}`, () => `${a * b * c}`);
        q = `向量 u=(${a},${b},${c}) 与自身的叉积 u×u = ？`;
        exp = `任意向量与自身的叉积为 0 向量。`;
      }
      results.push(Q(q, o, "进阶", exp, "向量法解立体几何", type === 6 ? "vector_solid_adv" : null));
    }
    return results;
  }

  /* ============================================================
   * 拓展 · 绝对值不等式（十二年级+）
   * ============================================================ */
  function qAbsIneq(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const A = rnd(2, 9);
        o = opts(`(−${A}, ${A})`, () => `(−∞,${A})`, () => `[−${A},${A}]`, () => `x<${A}`);
        q = `不等式 |x| < ${A} 的解集是？`;
        exp = `|x|<${A} ⇔ −${A} < x < ${A}，即 (−${A},${A})。`;
      } else if (type === 1) {
        const B = rnd(1, 9), C = rnd(1, 9);
        const lo = B - C, hi = B + C;
        o = opts(`[${lo}, ${hi}]`, () => `[${B},${hi}]`, () => `(−∞,${hi}]`, () => `x≤${hi}`);
        q = `|x−${B}| ≤ ${C} 的解集是？`;
        exp = `−${C} ≤ x−${B} ≤ ${C} ⇔ ${lo} ≤ x ≤ ${hi}，即 [${lo},${hi}]。`;
      } else if (type === 2) {
        const a = rnd(1, 9), b = rnd(2, 9);
        const lo = -b - a, hi = b - a;
        o = opts(`(−∞,${lo}] ∪ [${hi},+∞)`, () => `[${lo},${hi}]`, () => `x≥${hi}`, () => `x≤${lo}`);
        q = `|x+${a}| ≥ ${b} 的解集是？`;
        exp = `x+${a}≥${b} 或 x+${a}≤−${b} ⇔ x≥${hi} 或 x≤${lo}。`;
      } else if (type === 3) {
        const c = rnd(1, 10), d = rnd(1, 8);
        o = opts(`(${c - d}, ${c + d})`, () => `(${c},${c + d})`, () => `(${c - d},${c})`, () => `(−${d},${c + d})`);
        q = `|x−${c}| < ${d} 表示 x 到 ${c} 的距离小于 ${d}，解集 = ？`;
        exp = `${c}−${d} < x < ${c}+${d} ⇔ ${c - d} < x < ${c + d}。`;
      } else if (type === 4) {
        const A = rnd(1, 9), B = rnd(1, 9);
        o = opts(`${A + B}`, () => `${Math.abs(A - B)}`, () => `${A * B}`, () => `${Math.max(A, B)}`);
        q = `已知 |x|=${A}, |y|=${B}，则 |x+y| 的最大值是（三角不等式）？`;
        exp = `|x+y| ≤ |x|+|y| = ${A}+${B}，同号时取等。`;
      } else if (type === 5) {
        const a = rnd(1, 9), b = rnd(1, 9);
        o = opts(`${a + b}`, () => `${Math.abs(a - b)}`, () => `${a * b}`, () => `${Math.max(a, b)}`);
        q = `实数 a=${a}, b=${b}（均大于 0），则 |a+b| = ？`;
        exp = `a,b>0 时 |a+b| = a+b = ${a + b}。`;
      } else if (type === 6) {
        const e = rnd(1, 9), f = rnd(1, 9);
        const mn = Math.abs(e - f);
        o = opts(`${mn}`, () => `0`, () => `${e + f}`, () => `${Math.max(e, f)}`);
        q = `函数 f(x)=|x−${e}|+|x−${f}| 的最小值是？`;
        exp = `|x−${e}|+|x−${f}| ≥ |(x−${e})−(x−${f})| = |${f}-${e}| = ${mn}。`;
      } else if (type === 7) {
        const k = rnd(2, 9), m = rnd(1, 20), p = rnd(1, 9);
        const s1 = (m + p) / k, s2 = (m - p) / k;
        o = opts(`x=${s1} 或 x=${s2}`, () => `x=${s1}`, () => `x=${s2}`, () => `x=${m / k}`);
        q = `方程 |${k}x−${m}| = ${p} 的解是？`;
        exp = `${k}x−${m}=±${p} → x=(${m}±${p})/${k} = ${s1} 或 ${s2}。`;
      } else if (type === 8) {
        const A = rnd(2, 9);
        o = opts(`(−∞,−${A}] ∪ [${A},+∞)`, () => `(−${A},${A})`, () => `x≥${A}`, () => `[−${A},${A}]`);
        q = `不等式 |x| ≥ ${A} 的解集是？`;
        exp = `|x|≥${A} ⇔ x≤−${A} 或 x≥${A}。`;
      } else {
        o = opts(`|a|+|b|`, () => `||a|−|b||`, () => `|a|−|b|`, () => `|a|·|b|`);
        q = `对任意实数 a,b，恒有 |a+b| ≤ ？`;
        exp = `绝对值三角不等式：|a+b| ≤ |a|+|b|。`;
      }
      results.push(Q(q, o, "进阶", exp, "绝对值不等式"));
    }
    return results;
  }

  /* ============================================================
   * 拓展 · 柯西不等式应用（十二年级+）
   * ============================================================ */
  function qCauchyApp(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const R = rnd(1, 9);
        const m = (R * Math.SQRT2).toFixed(2);
        o = opts(`${m}`, () => `${R}`, () => `${2 * R}`, () => `1`);
        q = `已知 x²+y²=${R * R}，则 x+y 的最大值为（柯西不等式）？`;
        exp = `(1²+1²)(x²+y²) ≥ (x+y)² → 2·${R * R} ≥ (x+y)² → 最大 √(${2 * R * R}) = ${m}。`;
      } else if (type === 1) {
        const S = rnd(2, 20);
        const m = (5 * Math.sqrt(S)).toFixed(2);
        o = opts(`${m}`, () => `${Math.sqrt(S).toFixed(2)}`, () => `${2 * S}`, () => `${S}`);
        q = `已知 a²+b²=${S}，则 3a+4b 的最大值为？`;
        exp = `(a²+b²)(3²+4²) ≥ (3a+4b)² → ${S}·25 ≥ (...)² → 最大 5√${S} ≈ ${m}。`;
      } else if (type === 2) {
        const A = rnd(2, 12);
        const m = (4 / A).toFixed(3);
        o = opts(`${m}`, () => `${A}`, () => `${(2 / A).toFixed(3)}`, () => `4`);
        q = `x,y>0 且 x+y=${A}，则 1/x+1/y 的最小值为？`;
        exp = `(x+y)(1/x+1/y) ≥ (1+1)² = 4 → 1/x+1/y ≥ 4/${A} ≈ ${m}。`;
      } else if (type === 3) {
        const T = rnd(1, 15);
        const m = (Math.sqrt(3 * T)).toFixed(2);
        o = opts(`${m}`, () => `${T}`, () => `${Math.sqrt(T).toFixed(2)}`, () => `3`);
        q = `已知 x²+y²+z²=${T}，则 x+y+z 的最大值为？`;
        exp = `(1+1+1)(x²+y²+z²) ≥ (x+y+z)² → 3·${T} ≥ (x+y+z)² → 最大 √(${3 * T}) ≈ ${m}。`;
      } else if (type === 4) {
        const deg = pick([0, 30, 45, 60, 90, 120, 150, 180]);
        const cs = Math.cos(deg * Math.PI / 180).toFixed(3);
        o = opts(`${cs}`, () => `${Math.sin(deg * Math.PI / 180).toFixed(3)}`, () => `1`, () => `0`);
        q = `n 维单位向量 u,v，若夹角为 ${deg}°，则 Σaᵢbᵢ（点积） = ？`;
        exp = `点积 = |u||v|cos ${deg}° = cos ${deg}° = ${cs}。`;
      } else if (type === 5) {
        const R = rnd(1, 9);
        const m = (R * Math.sqrt(13)).toFixed(2);
        o = opts(`${m}`, () => `${(R * 2).toFixed(2)}`, () => `${(R * 3).toFixed(2)}`, () => `${R}`);
        q = `已知 x²+y²=${R * R}，则 2x+3y 的最大值为？`;
        exp = `(x²+y²)(2²+3²) ≥ (2x+3y)² → ${R * R}·13 ≥ (...)² → 最大 ${R}√13 ≈ ${m}。`;
      } else if (type === 6) {
        const A = rnd(2, 12);
        const m = (9 / A).toFixed(3);
        o = opts(`${m}`, () => `${A}`, () => `${(3 / A).toFixed(3)}`, () => `9`);
        q = `正数 a,b,c 且 a+b+c=${A}，则 1/a+1/b+1/c 的最小值为？`;
        exp = `(a+b+c)(1/a+1/b+1/c) ≥ (1+1+1)² = 9 → ≥ 9/${A} ≈ ${m}。`;
      } else if (type === 7) {
        const S = rnd(1, 15), p = rnd(1, 6), q2 = rnd(1, 6);
        const m = (Math.sqrt(S * (p * p + q2 * q2))).toFixed(2);
        o = opts(`${m}`, () => `${(Math.sqrt(S) * (p + q2)).toFixed(2)}`, () => `${(Math.sqrt(S * p * p + q2 * q2)).toFixed(2)}`, () => `${S}`);
        q = `已知 x²+y²=${S}，则 ${p}x+${q2}y 的最大值为？`;
        exp = `(x²+y²)(${p}²+${q2}²) ≥ (${p}x+${q2}y)² → ${S}·${p * p + q2 * q2} ≥ (...)² → 最大 √(${S * (p * p + q2 * q2)}) ≈ ${m}。`;
      } else if (type === 8) {
        const R = rnd(1, 9);
        o = opts(`${(R * Math.SQRT2).toFixed(2)}`, () => `${R}`, () => `${2 * R}`, () => `1`);
        q = `已知 x²+y²=${R * R}，则 |x−y| 的最大值约为？`;
        exp = `|x−y| ≤ √(1²+(−1)²)·√(x²+y²) = √2·${R}。`;
      } else {
        const S = rnd(2, 20);
        o = opts(`${(5 * Math.sqrt(S)).toFixed(2)}`, () => `${Math.sqrt(S).toFixed(2)}`, () => `${2 * S}`, () => `${S}`);
        q = `已知 a²+b²=${S}，则 |3a−4b| 的最大值约为？`;
        exp = `|3a−4b| ≤ √(3²+4²)·√(a²+b²) = 5√${S}。`;
      }
      results.push(Q(q, o, "进阶", exp, "柯西不等式应用"));
    }
    return results;
  }

  /* ============================================================
   * 拓展 · 排序不等式（十二年级+）
   * ============================================================ */
  function qRearrIneq(n) {
    const results = [];
    const mk = () => { const v = [rnd(1, 4), rnd(2, 6), rnd(4, 9)]; return v.slice().sort((x, y) => x - y); };
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = mk(), b = mk();
        const same = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        const rev = a[0] * b[2] + a[1] * b[1] + a[2] * b[0];
        const shuf = a[0] * b[1] + a[1] * b[2] + a[2] * b[0];
        o = opts(`${same}`, () => `${rev}`, () => `${shuf}`, () => `${a[0] + a[1] + a[2]}`);
        q = `a=(${a.join(',')})、b=(${b.join(',')}) 均升序，同序乘积和 = ？`;
        exp = `同序和 = ${a[0]}·${b[0]}+${a[1]}·${b[1]}+${a[2]}·${b[2]} = ${same}。`;
      } else if (type === 1) {
        const a = mk();
        const same = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
        const rev = a[0] * a[2] + a[1] * a[1] + a[2] * a[0];
        o = opts(`${same}`, () => `${rev}`, () => `${a[0] + a[1] + a[2]}`, () => `${(a[0] + a[1] + a[2]) * 2}`);
        q = `a=(${a.join(',')}) 与自身同序相乘之和 = ？`;
        exp = `${a[0]}·${a[0]}+${a[1]}·${a[1]}+${a[2]}·${a[2]} = ${same}。`;
      } else if (type === 2) {
        const a = mk(), b = mk();
        const rev = a[0] * b[2] + a[1] * b[1] + a[2] * b[0];
        const same = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        const shuf = a[0] * b[1] + a[1] * b[0] + a[2] * b[2];
        o = opts(`${rev}`, () => `${same}`, () => `${shuf}`, () => `${a[0] + a[1] + a[2]}`);
        q = `a=(${a.join(',')}) 升序、b=(${b.join(',')}) 升序，反序配对（最大配最小）乘积和 = ？`;
        exp = `反序和 = ${a[0]}·${b[2]}+${a[1]}·${b[1]}+${a[2]}·${b[0]} = ${rev}。`;
      } else if (type === 3) {
        const a = mk(), b = mk();
        o = opts("同序（都从小到大）", () => "逆序", () => "随意配对", () => "交叉配对");
        q = `数组 a=(${a.join(',')})、b=(${b.join(',')}) 均升序，要使对应乘积和最大，应让两数组如何配对？`;
        exp = `同序配对（都按从小到大）得最大和。`;
      } else if (type === 4) {
        const a = mk(), b = mk();
        o = opts("≤（前者为乱序/反序）", () => "≥", () => "=", () => "无关");
        q = `a=(${a.join(',')}) 降序、b=(${b.join(',')}) 升序，则 a₁b₃+a₂b₂+a₃b₁ 与 a₁b₁+a₂b₂+a₃b₃ 的大小？`;
        exp = `前者是乱序/反序和，后者是同序和，故前者 ≤ 后者。`;
      } else if (type === 5) {
        const nn = rnd(3, 8);
        o = opts("同序和 ≥ 乱序和 ≥ 反序和", () => "同序 ≤ 乱序", () => "乱序 ≥ 同序", () => "反序 ≥ 同序");
        q = `对 ${nn} 项两组正数，排序不等式的三类和大小关系是？`;
        exp = `同序和 ≥ 乱序和 ≥ 反序和。`;
      } else if (type === 6) {
        const x = mk(), y = mk();
        o = opts("T ≤ S", () => "T ≥ S", () => "T = S", () => "不确定");
        q = `正数 x=(${x.join(',')}) 升序、y=(${y.join(',')}) 升序，T=x₁y₃+x₂y₂+x₃y₁ 与 S=x₁y₁+x₂y₂+x₃y₃ 的关系？`;
        exp = `T 是反序/乱序和，S 是同序和，故 T ≤ S。`;
      } else if (type === 7) {
        const a = mk(), b = mk();
        const rev = a[0] * b[2] + a[1] * b[1] + a[2] * b[0];
        const same = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        o = opts(`${rev}`, () => `${same}`, () => `${a[0] * b[1] + a[1] * b[2] + a[2] * b[0]}`, () => `${a[0] + a[1] + a[2]}`);
        q = `a=(${a.join(',')})、b=(${b.join(',')}) 反序配对（最大配最小）的乘积和 = ？`;
        exp = `反序 = ${a[0]}·${b[2]}+${a[1]}·${b[1]}+${a[2]}·${b[0]} = ${rev}。`;
      } else if (type === 8) {
        const a = mk(), b = mk();
        const same = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        const shuf = a[0] * b[2] + a[1] * b[0] + a[2] * b[1];
        o = opts("同序和最大", () => "乱序和最大", () => "反序和最大", () => "三者相等");
        q = `a=(${a.join(',')})、b=(${b.join(',')}) 任意配对乘积和，哪种配对最大？`;
        exp = `排序不等式：同序和 ≥ 乱序和 ≥ 反序和，故同序和最大（=${same}）。`;
      } else {
        const a = mk(), b = mk();
        const rev = a[0] * b[2] + a[1] * b[1] + a[2] * b[0];
        o = opts(`${rev}`, () => `${a[0] * b[0] + a[1] * b[1] + a[2] * b[2]}`, () => `${a[0] + a[1] + a[2]}`, () => `${(a[0] + a[1] + a[2]) * 2}`);
        q = `a=(${a.join(',')})、b=(${b.join(',')}) 反序（逆序）乘积和 = ？`;
        exp = `反序和 = ${a[0]}·${b[2]}+${a[1]}·${b[1]}+${a[2]}·${b[0]} = ${rev}。`;
      }
      results.push(Q(q, o, "进阶", exp, "排序不等式"));
    }
    return results;
  }

  /* ============================================================
   * 拓展 · 马尔可夫链入门（大学预科）
   * ============================================================ */
  function qMarkov(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(1, 9) / 10, b = rnd(1, 9) / 10;
        const p11 = a * a + (1 - a) * b;
        o = opts(`${p11.toFixed(3)}`, () => `${a.toFixed(1)}`, () => `${b.toFixed(1)}`, () => `${(a * b).toFixed(3)}`);
        q = `转移矩阵 P=[[${a.toFixed(1)},${(1 - a).toFixed(1)}],[${b.toFixed(1)},${(1 - b).toFixed(1)}]]（行：状态1,2），从状态1出发两步后仍在状态1的概率 = ？`;
        exp = `P²₁₁ = ${a.toFixed(1)}·${a.toFixed(1)}+${(1 - a).toFixed(1)}·${b.toFixed(1)} = ${p11.toFixed(3)}。`;
      } else if (type === 1) {
        const a = rnd(1, 9) / 10, b = rnd(1, 9) / 10;
        const pi1 = b / (1 - a + b);
        o = opts(`${pi1.toFixed(3)}`, () => `${a.toFixed(1)}`, () => `${(1 - pi1).toFixed(3)}`, () => `${b.toFixed(1)}`);
        q = `转移矩阵 P=[[${a.toFixed(1)},${(1 - a).toFixed(1)}],[${b.toFixed(1)},${(1 - b).toFixed(1)}]] 的平稳分布 π=(π₁,π₂) 中 π₁ = ？`;
        exp = `平稳分布满足 π=πP，解得 π₁ = ${b.toFixed(1)}/(${(1 - a).toFixed(1)}+${b.toFixed(1)}) = ${pi1.toFixed(3)}。`;
      } else if (type === 2) {
        const a = rnd(1, 9) / 10;
        o = opts(`${a.toFixed(1)}`, () => `${(1 - a).toFixed(1)}`, () => `${(a * a).toFixed(3)}`, () => `1`);
        q = `若今天处于状态1，且一步转移 P(1→1)=${a.toFixed(1)}，则明天仍在状态1的概率 = ？`;
        exp = `一步转移，明天状态1 = P(1→1) = ${a.toFixed(1)}。`;
      } else if (type === 3) {
        const a = rnd(1, 9) / 10, b = rnd(1, 9) / 10;
        const p21 = b * a + (1 - b) * b;
        o = opts(`${p21.toFixed(3)}`, () => `${a.toFixed(1)}`, () => `${b.toFixed(1)}`, () => `${(a * b).toFixed(3)}`);
        q = `转移矩阵 P=[[${a.toFixed(1)},${(1 - a).toFixed(1)}],[${b.toFixed(1)},${(1 - b).toFixed(1)}]]，从状态2出发两步后到状态1的概率 = ？`;
        exp = `P²₂₁ = ${b.toFixed(1)}·${a.toFixed(1)}+${(1 - b).toFixed(1)}·${b.toFixed(1)} = ${p21.toFixed(3)}。`;
      } else if (type === 4) {
        const x = rnd(1, 9) / 10;
        o = opts("当前状态（与更早历史无关）", () => "初始状态", () => "全部历史", () => "下一状态");
        q = `若马尔可夫链中 P(A→B)=${x.toFixed(1)}，则“下一状态只依赖于”什么？`;
        exp = `无记忆性：下一状态仅取决于当前状态。`;
      } else if (type === 5) {
        const ii = rnd(1, 6);
        o = opts("吸收态", () => "平稳态", () => "暂态", () => "周期态");
        q = `若某状态 ${ii} 满足 P(${ii}→${ii})=1（进入后不再离开），称为？`;
        exp = `进入后不再离开的状态称为吸收态。`;
      } else if (type === 6) {
        const nn = rnd(2, 8);
        o = opts("唯一存在", () => "不存在", () => "有无穷多个", () => "等于初始分布");
        q = `有限状态、不可约且非周期（共 ${nn} 个状态）的马尔可夫链，其平稳分布？`;
        exp = `遍历链有唯一平稳分布。`;
      } else if (type === 7) {
        const nn = rnd(2, 8);
        o = opts("平稳分布（与初始无关）", () => "初始分布", () => "均匀分布", () => "零向量");
        q = `对含 ${nn} 个状态的遍历马尔可夫链，当步数 n→∞，状态分布趋于？`;
        exp = `极限分布 = 平稳分布，与初始分布无关。`;
      } else if (type === 8) {
        o = opts("一步转移矩阵的平方 P²", () => "2P", () => "P 的转置", () => "P 的迹");
        q = `马尔可夫链的“两步转移概率矩阵”等于？`;
        exp = `两步转移概率 = P·P = P²。`;
      } else {
        o = opts("πP = π", () => "π = Pπ 转置", () => "πP = 1", () => "π + P = π");
        q = `马尔可夫链的平稳分布 π 满足？`;
        exp = `平稳分布满足 πP = π（左特征向量，特征值 1）。`;
      }
      results.push(Q(q, o, "进阶", exp, "马尔可夫链"));
    }
    return results;
  }

  /* ============================================================
   * 拓展 · 大数定律（大学预科）
   * ============================================================ */
  function qLLN(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const nn = rnd(50, 500);
        o = opts("总体期望 E[X]", () => "样本方差", () => "0", () => "总体中位数");
        q = `弱大数定律：样本量 n=${nn} 时，样本均值 X̄ₙ 依概率收敛于？`;
        exp = `弱大数定律：X̄ₙ → E[X]（依概率）。`;
      } else if (type === 1) {
        const nn = rnd(50, 500), p = rnd(1, 9) / 10;
        o = opts(`${p.toFixed(1)}`, () => `0.5`, () => `0`, () => `${nn}`);
        q = `抛硬币 ${nn} 次，正面概率 p=${p.toFixed(1)}，正面频率 m/n 当 n→∞ 时依概率收敛于？`;
        exp = `伯努利大数定律：频率依概率收敛于概率 ${p.toFixed(1)}。`;
      } else if (type === 2) {
        const nn = rnd(20, 200);
        o = opts("独立同分布且期望存在（有限）", () => "正态分布", () => "方差有限即可", () => "相互独立即可");
        q = `辛钦大数定律要求 ${nn} 个随机变量的序列？`;
        exp = `辛钦：独立同分布且期望存在（有限）。`;
      } else if (type === 3) {
        const nn = rnd(20, 200);
        o = opts("切比雪夫不等式", () => "柯西不等式", () => "排序不等式", () => "詹森不等式");
        q = `用切比雪夫类不等式证明 ${nn} 个样本均值收敛，常用的是？`;
        exp = `切比雪夫：P(|X̄−μ|≥ε) ≤ Var(X̄)/ε² → 0。`;
      } else if (type === 4) {
        const m = rnd(4, 12);
        const mu = (m + 1) / 2;
        o = opts(`${mu}`, () => `${m}`, () => `${mu + 1}`, () => `${(m / 2).toFixed(1)}`);
        q = `均匀 ${m} 面骰子（点数 1..${m}）掷很多次，点数平均值趋于？`;
        exp = `期望 = (1+${m})/2 = ${mu}。`;
      } else if (type === 5) {
        const nn = rnd(100, 1000);
        o = opts("收敛性（稳定性）", () => "精确分布", () => "方差大小", () => "相关性");
        q = `大数定律研究 ${nn} 次试验下样本均值随 n 增大的什么性质？`;
        exp = `大数定律研究均值随 n 增大而稳定（收敛）于期望。`;
      } else if (type === 6) {
        const nn = rnd(100, 1000);
        o = opts("依概率收敛", () => "几乎必然收敛", () => "必然收敛", () => "均方收敛");
        q = `对 ${nn} 次独立同分布试验，弱大数定律的收敛是？`;
        exp = `弱大数定律是依概率收敛；强大数定律才是几乎必然收敛。`;
      } else if (type === 7) {
        const k = rnd(100, 5000);
        o = opts("大量独立风险下频率趋稳于概率", () => "单次赔付确定", () => "损失为零", () => "利率恒定");
        q = `保险公司承保 ${k} 份独立保单能稳定定价，主要依据大数定律的哪一点？`;
        exp = `大数定律保证大量独立重复下频率稳定于概率，便于精算。`;
      } else if (type === 8) {
        const a = rnd(1, 9), b = rnd(1, 9);
        const mu = ((a + b) / 2).toFixed(1);
        o = opts(`${mu}`, () => `${a}`, () => `${b}`, () => `${(a + b)}`);
        q = `独立同分布随机变量 X 取值 ${a},${b} 等可能，则大量抽样后 X̄ 趋于？`;
        exp = `E[X] = (${a}+${b})/2 = ${mu}。`;
      } else {
        const nn = rnd(50, 500);
        o = opts("样本均值", () => "总体均值", () => "中位数", () => "0");
        q = `对 ${nn} 个独立同分布样本，依概率收敛于真实期望的是？`;
        exp = `样本均值依概率收敛于总体期望（弱大数定律）。`;
      }
      results.push(Q(q, o, "进阶", exp, "大数定律"));
    }
    return results;
  }

  /* ============================================================
   * 拓展 · 置信区间（大学预科）
   * ============================================================ */
  function qConfidence(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const lv = pick([90, 95, 99]);
        o = opts(`重复抽样时约 ${lv}% 的区间覆盖参数真值`, () => `参数有 ${lv}% 概率落在区间`, () => `区间一定有真值`, () => `真值固定在区间内`);
        q = `${lv}% 置信区间的含义是？`;
        exp = `频率派解释：重复抽样下约 ${lv}% 的区间含真值。`;
      } else if (type === 1) {
        const A = rnd(80, 120), B = rnd(2, 12);
        const z = 1.96;
        const lo = (A - z * B).toFixed(1), hi = (A + z * B).toFixed(1);
        o = opts(`(${lo}, ${hi})`, () => `(${A}, ${A + B})`, () => `(${A - B}, ${A + B})`, () => `${A}±${B}`);
        q = `x̄=${A}, 标准误 SE=${B}, 95% 置信区间（z=${z}）≈？`;
        exp = `${A} ± ${z}·${B} = ${A} ± ${(z * B).toFixed(1)} → (${lo}, ${hi})。`;
      } else if (type === 2) {
        const a = rnd(90, 95), b = a + rnd(2, 5);
        o = opts("变宽", () => "变窄", () => "不变", () => "消失");
        q = `置信水平从 ${a}% 提高到 ${b}%，置信区间会？`;
        exp = `更高置信需更大临界值，区间变宽。`;
      } else if (type === 3) {
        const n1 = rnd(20, 100), n2 = n1 * 2;
        o = opts("变窄", () => "变宽", () => "不变", () => "先窄后宽");
        q = `样本量从 ${n1} 增大到 ${n2}（其他不变），置信区间会？`;
        exp = `SE = σ/√n 随 n 增大而减小，区间变窄。`;
      } else if (type === 4) {
        const lv = pick([90, 95, 99]);
        const z = lv === 90 ? 1.645 : lv === 95 ? 1.96 : 2.576;
        o = opts(`${z}`, () => `1.645`, () => `1.96`, () => `2.576`);
        q = `正态总体、大样本下 ${lv}% 置信区间的双尾 z 临界值约为？`;
        exp = `双尾 ${lv}% 对应 z = ${z}。`;
      } else if (type === 5) {
        const A = rnd(80, 120);
        o = opts("样本均值 x̄", () => "总体均值", () => "中位数", () => "0");
        q = `以 x̄=${A} 为点估计构造的置信区间，通常是以什么为中心？`;
        exp = `区间中心是样本均值 x̄（点估计）。`;
      } else if (type === 6) {
        const sig = rnd(5, 20), nn = pick([25, 36, 49, 64, 100]);
        const se = sig / Math.sqrt(nn);
        o = opts(`${se.toFixed(2)}`, () => `${sig}`, () => `${(sig / nn).toFixed(2)}`, () => `${nn}`);
        q = `总体标准差 σ=${sig}, n=${nn}，标准误 SE = ？`;
        exp = `SE = σ/√n = ${sig}/√${nn} = ${sig}/${Math.sqrt(nn).toFixed(2)} ≈ ${se.toFixed(2)}。`;
      } else if (type === 7) {
        const lv = pick([90, 95, 99]);
        o = opts(`参数有 ${lv}% 概率落在已算出的这个区间内`, () => `它是随机区间，随样本而变`, () => `其覆盖率在长期重复抽样下约为 ${lv}%`, () => `用于估计总体未知参数`);
        q = `下列关于 ${lv}% 置信区间的说法，错误的是？`;
        exp = `频率派下参数是固定常数，不能说“有 ${lv}% 概率落在此区间”。`;
      } else if (type === 8) {
        const A = rnd(50, 150), B = rnd(3, 15);
        const lo = (A - B).toFixed(1), hi = (A + B).toFixed(1);
        o = opts(`(${lo}, ${hi})`, () => `(${A}, ${hi})`, () => `(${lo}, ${A})`, () => `${A}±${(2 * B).toFixed(1)}`);
        q = `已知 95% 置信区间为 (${A} ± ${B})，则完整写法是？`;
        exp = `${A} ± ${B} 即 (${lo}, ${hi})。`;
      } else {
        const n1 = rnd(30, 80), n2 = n1 + rnd(50, 200);
        o = opts("变窄", () => "变宽", () => "不变", () => "无法判断");
        q = `将样本量由 ${n1} 增至 ${n2} 且置信水平不变，置信区间宽度会？`;
        exp = `SE = σ/√n 变小，区间宽度变窄。`;
      }
      results.push(Q(q, o, "进阶", exp, "置信区间"));
    }
    return results;
  }

  /* ============================================================
   * 拓展 · 假设检验入门（大学预科）
   * ============================================================ */
  function qHypothesis(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const mu = rnd(50, 150);
        o = opts("原假设 H0", () => "备择假设 H1", () => "样本均值", () => "显著性水平");
        q = `在检验 H0: μ=${mu} 时，我们通常用证据反对的是？`;
        exp = `检验以“拒绝 H0”为目标，H0 是原假设。`;
      } else if (type === 1) {
        const a = pick([0.01, 0.05, 0.10]);
        o = opts(`第一类错误（弃真）概率不超过 ${a}`, () => `第二类错误概率`, () => `置信度`, () => `p 值`);
        q = `显著性水平 α=${a} 表示？`;
        exp = `α 是犯第一类错误（H0 真却拒绝）的上限，≤${a}。`;
      } else if (type === 2) {
        const a = pick([0.01, 0.05, 0.10]);
        const p = pick([0.02, 0.03, 0.08, 0.15]);
        const rej = p < a;
        o = opts(rej ? "拒绝 H0" : "不拒绝 H0", () => rej ? "不拒绝 H0" : "拒绝 H0", () => "接受 H0 为真", () => "无法判断");
        q = `若 p 值 = ${p}, α = ${a}，则应？`;
        exp = `p ${rej ? "<" : "≥"} α → ${rej ? "拒绝" : "不拒绝"} H0。`;
      } else if (type === 3) {
        const mu = rnd(50, 150);
        o = opts("H0 为真时却拒绝了 H0", () => "H0 假时未拒绝", () => "样本错误", () => "计算错误");
        q = `检验 H0: μ=${mu}，第一类错误（α 错误）是指？`;
        exp = `第一类错误 = 弃真：H0 真却拒绝。`;
      } else if (type === 4) {
        const mu = rnd(50, 150);
        o = opts("H0 为假时却未拒绝 H0", () => "H0 真时拒绝", () => "p 值过大", () => "置信区间过宽");
        q = `检验 H0: μ=${mu}，第二类错误（β 错误）是指？`;
        exp = `第二类错误 = 取伪：H0 假却未拒绝。`;
      } else if (type === 5) {
        const z = (rnd(15, 30) / 10).toFixed(2);
        o = opts("拒绝 H0", () => "接受 H0", () => "增大 α", () => "停止检验");
        q = `当检验统计量 z=${z} 落入拒绝域时，应当？`;
        exp = `落入拒绝域 → 拒绝 H0。`;
      } else if (type === 6) {
        const a = pick([0.05, 0.01, 0.10]);
        const cv = a === 0.05 ? "±1.96" : a === 0.01 ? "±2.576" : "±1.645";
        o = opts(`${cv}`, () => `±1.645`, () => `±2.576`, () => `±1.0`);
        q = `大样本、α=${a} 的双侧 z 检验临界值约为？`;
        exp = `双尾 ${a} 对应 ${cv}。`;
      } else if (type === 7) {
        const a = pick([0.05, 0.01, 0.10]);
        const cv = a === 0.05 ? "1.645" : a === 0.01 ? "2.326" : "1.282";
        o = opts(`${cv}`, () => `1.96`, () => `2.576`, () => `1.28`);
        q = `大样本、α=${a} 的单侧（上侧）z 检验临界值约为？`;
        exp = `单尾 ${a} 对应 z = ${cv}。`;
      } else if (type === 8) {
        o = opts("拒绝域越大，越易拒绝 H0", () => "拒绝域越小越好", () => "拒绝域固定不变", () => "与 α 无关");
        q = `在其他不变时，提高显著性水平 α 会使拒绝域如何？`;
        exp = `α 增大 → 临界值减小 → 拒绝域变大，更易拒绝 H0。`;
      } else {
        const mu = rnd(50, 150);
        o = opts("p 值越小越反对 H0", () => "p 值越大越反对 H0", () => "p 值是 H0 为真的概率", () => "p 值固定为 α");
        q = `检验 H0: μ=${mu}，关于 p 值的正确说法是？`;
        exp = `p 值是在 H0 下观测到当前或更极端结果的概率，越小越反对 H0。`;
      }
      results.push(Q(q, o, "进阶", exp, "假设检验"));
    }
    return results;
  }

  /* ============================================================
   * 拓展 · 反常积分（大学预科）
   * ============================================================ */
  function qImproperInt(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const p = rnd(2, 15);
        const v = (1 / (p - 1)).toFixed(3);
        o = opts(`${v}`, () => `∞`, () => `0`, () => `${(1 / p).toFixed(3)}`);
        q = `反常积分 ∫₁^∞ 1/x^${p} dx = ？`;
        exp = `[−1/(${p - 1})x^{${p - 1}}]₁^∞ = 0 − (−1/(${p - 1})) = ${v}。`;
      } else if (type === 1) {
        const a = rnd(2, 15);
        o = opts("发散（∞）", () => `收敛到 1`, () => `收敛到 ln${a}`, () => `收敛到 0`);
        q = `反常积分 ∫${a}^∞ 1/x dx 的敛散性？`;
        exp = `[ln x]${a}^∞ = ∞，发散。`;
      } else if (type === 2) {
        const qe = rnd(1, 9) / 10;
        const v = (1 / (1 - qe)).toFixed(3);
        o = opts(`${v}`, () => `1`, () => `∞`, () => `${(1 / qe).toFixed(3)}`);
        q = `反常积分 ∫₀¹ 1/x^${qe.toFixed(1)} dx = ？`;
        exp = `[x^{${(1 - qe).toFixed(1)}}/${(1 - qe).toFixed(1)}]₀¹ = ${v}（收敛）。`;
      } else if (type === 3) {
        const p = rnd(1, 15) / 2;
        o = opts("p > 1", () => "p ≥ 1", () => "p > 0", () => "p < 1");
        q = `积分 ∫₁^∞ 1/x^${p.toFixed(1)} dx 收敛的充要条件是？`;
        exp = `p>1 收敛于 1/(p−1)；p≤1 发散。`;
      } else if (type === 4) {
        const k = rnd(1, 12);
        o = opts("1", () => "0", () => `${k}`, () => "∞");
        q = `反常积分 ∫₀^∞ ${k}e^(−${k}x) dx = ？`;
        exp = `∫₀^∞ ${k}e^{−${k}x} dx = [−e^{−${k}x}]₀^∞ = 0 − (−1) = 1。`;
      } else if (type === 5) {
        const a = rnd(1, 9);
        o = opts("π", () => `${Math.PI / 2}`, () => `2π`, () => `${a}π`);
        q = `反常积分 ∫_{−∞}^∞ ${a}/(${a * a}+x²) dx = ？`;
        exp = `[arctan(x/${a})]_{−∞}^∞ = π/2 − (−π/2) = π。`;
      } else if (type === 6) {
        const a = rnd(2, 15);
        o = opts("发散", () => `收敛到 1`, () => `收敛到 0`, () => `收敛到 ln${a}`);
        q = `反常积分 ∫₀^${a} 1/x dx 的敛散性？`;
        exp = `[ln x]₀^${a} = ∞，在 0 处发散。`;
      } else if (type === 7) {
        const a = rnd(2, 15);
        const v = (1 / Math.log(a)).toFixed(3);
        o = opts(`${v}`, () => `∞`, () => `${Math.log(a).toFixed(3)}`, () => `1`);
        q = `反常积分 ∫${a}^∞ 1/[x(ln x)²] dx 收敛到？`;
        exp = `令 u=ln x：∫_{ln ${a}}^∞ u^{−2} du = [−1/u] = 1/ln ${a} ≈ ${v}。`;
      } else if (type === 8) {
        const p = rnd(2, 6);
        const v = (1 / ((p - 1) * Math.pow(2, p - 1))).toFixed(3);
        o = opts(`${v}`, () => `∞`, () => `0`, () => `1`);
        q = `反常积分 ∫₂^∞ 1/x^${p} dx = ？`;
        exp = `[−1/(${p - 1})x^{${p - 1}}]₂^∞ = 1/(${p - 1})·2^{−${p - 1}} = ${v}。`;
      } else {
        const k = rnd(1, 5);
        const v = (1 / k).toFixed(3);
        o = opts(`${v}`, () => `1`, () => `0`, () => `∞`);
        q = `反常积分 ∫₀^∞ e^(−${k}x) dx = ？`;
        exp = `[−e^(−${k}x)/${k}]₀^∞ = 1/${k} = ${v}。`;
      }
      results.push(Q(q, o, "进阶", exp, "反常积分"));
    }
    return results;
  }

  /* ============================================================
   * 拓展 · 多元函数偏导（大学预科）
   * ============================================================ */
  function qPartialDeriv(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(1, 6), X = rnd(1, 5), Y = rnd(1, 5);
        const v = 2 * a * X * Y;
        o = opts(`${v}`, () => `${a * X * Y}`, () => `${2 * a * X}`, () => `${Y}`);
        q = `f(x,y)=${a}x²y，求 ∂f/∂x 在 (${X},${Y}) 的值 = ？`;
        exp = `∂f/∂x = 2${a}xy = 2·${a}·${X}·${Y} = ${v}。`;
      } else if (type === 1) {
        const a = rnd(1, 6), X = rnd(1, 5);
        const v = a * X * X;
        o = opts(`${v}`, () => `${2 * a * X}`, () => `${a}`, () => `${2 * a * v}`);
        q = `f(x,y)=${a}x²y，求 ∂f/∂y 在 (${X},${rnd(1, 5)}) 的值 = ？`;
        exp = `∂f/∂y = ${a}x² = ${a}·${X}² = ${v}。`;
      } else if (type === 2) {
        const a = rnd(1, 6), b = rnd(1, 6), X = rnd(1, 5), Y = rnd(1, 5);
        const v = 2 * a * X + b * Y;
        o = opts(`${v}`, () => `${2 * a * X}`, () => `${a * X + b * Y}`, () => `${b * Y}`);
        q = `f(x,y)=${a}x²+${b}xy，求 ∂f/∂x 在 (${X},${Y}) 的值 = ？`;
        exp = `∂f/∂x = 2${a}x+${b}y = 2·${a}·${X}+${b}·${Y} = ${v}。`;
      } else if (type === 3) {
        const nn = rnd(2, 4);
        o = opts("相等", () => "互为相反数", () => "无关", () => "相差一个常数");
        q = `若 ${nn} 元函数二阶混合偏导连续，则 ∂²f/∂x∂y 与 ∂²f/∂y∂x 的关系是？`;
        exp = `克莱罗定理：连续时混合偏导相等。`;
      } else if (type === 4) {
        const a = rnd(1, 6), b = rnd(1, 6);
        o = opts("(∂f/∂x)dx + (∂f/∂y)dy", () => "∂f/∂x + ∂f/∂y", () => "(∂f/∂x)(∂f/∂y)", () => "dx+dy");
        q = `二元函数 f(x,y)=${a}x²+${b}y² 的全微分 df = ？`;
        exp = `df = f_x dx + f_y dy = 2${a}x dx + 2${b}y dy（形式即 f_x dx + f_y dy）。`;
      } else if (type === 5) {
        const a = rnd(1, 5), X = rnd(1, 4), Y = rnd(1, 4);
        const v = (a * Y * Math.exp(a * X * Y)).toFixed(3);
        o = opts(`${v}`, () => `${(X * Math.exp(a * X * Y)).toFixed(3)}`, () => `${(Math.exp(a * X * Y)).toFixed(3)}`, () => `${(a * X * Y * Math.exp(a * X * Y)).toFixed(3)}`);
        q = `f(x,y)=e^(${a}xy)，求 ∂f/∂x 在 (${X},${Y}) 的值 = ？`;
        exp = `∂f/∂x = e^{${a}xy}·${a}y = ${a}·${Y}·e^{${a}·${X}·${Y}} ≈ ${v}。`;
      } else if (type === 6) {
        const a = rnd(1, 9);
        o = opts("曲面沿 x 方向切线的斜率", () => "曲面法向量", () => "体积变化率", () => "面积");
        q = `偏导数 ∂f/∂x（如 f(x,y)=x²+y²+${a}）的几何意义是？`;
        exp = `固定 y=y0，曲面截线对 x 的切线斜率。`;
      } else if (type === 7) {
        const P = rnd(1, 6), Q = rnd(1, 6);
        o = opts(`(${P},${Q})`, () => `(${Q},${P})`, () => `(0,0)`, () => `(${P + Q},${P})`);
        q = `f(x,y)=x²+y²−2${P}x−2${Q}y 的唯一驻点是？`;
        exp = `f_x=2x−2${P}=0, f_y=2y−2${Q}=0 → x=${P}, y=${Q}，驻点(${P},${Q})。`;
      } else if (type === 8) {
        const a = rnd(1, 6), b = rnd(1, 6), X = rnd(1, 5), Y = rnd(1, 5);
        const v = 2 * b * Y + a * X;
        o = opts(`${v}`, () => `${2 * b * Y}`, () => `${a * X + b * Y}`, () => `${a * X}`);
        q = `f(x,y)=${a}xy+${b}y²，求 ∂f/∂y 在 (${X},${Y}) 的值 = ？`;
        exp = `∂f/∂y = ${a}x+2${b}y = ${a}·${X}+2·${b}·${Y} = ${v}。`;
      } else {
        const c = rnd(1, 6), d = rnd(1, 6);
        const v = (c * d).toFixed(3);
        o = opts(`${v}`, () => `${c}`, () => `${d}`, () => `${(c / d).toFixed(3)}`);
        q = `f(x,y)=${c}x·${d}y，求 ∂²f/∂x∂y = ？`;
        exp = `∂f/∂x = ${c * d}y，再对 y 求偏导 = ${c * d}。`;
      }
      results.push(Q(q, o, "进阶", exp, "多元函数偏导"));
    }
    return results;
  }

  /* ============================================================
   * 拓展 · 梯度（大学预科）
   * ============================================================ */
  function qGradient(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 10;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(1, 6), b = rnd(1, 6), X = rnd(1, 5), Y = rnd(1, 5);
        const v = `(${2 * a * X}, ${2 * b * Y})`;
        o = opts(`${v}`, () => `(${a * X}, ${b * Y})`, () => `(${2 * a}, ${2 * b})`, () => `(${2 * a * X + 2 * b * Y})`);
        q = `f(x,y)=${a}x²+${b}y² 的梯度 ∇f 在 (${X},${Y}) = ？`;
        exp = `∇f = (2${a}x, 2${b}y)，在 (${X},${Y}) 为 (${2 * a * X}, ${2 * b * Y})。`;
      } else if (type === 1) {
        const a = rnd(1, 9);
        o = opts("函数值增加最快的方向", () => "减小最快的方向", () => "等高线切线方向", () => "任意方向");
        q = `对 f(x,y)=x²+y²+${a}，梯度 ∇f 的方向是？`;
        exp = `梯度方向是函数值增长最快的方向。`;
      } else if (type === 2) {
        const a = rnd(1, 9);
        o = opts("最大方向导数", () => "函数值", () => "零", () => "偏导数之和");
        q = `对 f(x,y)=${a}x+${a}y，梯度的模 |∇f| 等于？`;
        exp = `|∇f| 等于该点方向导数的最大值。`;
      } else if (type === 3) {
        const a = rnd(1, 9);
        o = opts("垂直（法向）", () => "平行", () => "相切", () => "无关");
        q = `对 f(x,y)=x²+${a}y，在一点处 ∇f 与过该点的等高线的关系是？`;
        exp = `梯度垂直于等高线，指向函数增大方向（法向）。`;
      } else if (type === 4) {
        const a = rnd(1, 9);
        o = opts("∇f · u", () => "|∇f|", () => "∇f × u", () => "∂f/∂x");
        q = `沿单位向量 u 的方向导数 D_u f（如 f(x,y)=x²+${a}y）等于？`;
        exp = `D_u f = ∇f · u = |∇f|cosφ。`;
      } else if (type === 5) {
        const c = rnd(1, 6), X = rnd(1, 5), Y = rnd(1, 5);
        const v = `(${c * Y}, ${c * X})`;
        o = opts(`${v}`, () => `(${c * X}, ${c * Y})`, () => `(${c}, ${c})`, () => `(${X}, ${Y})`);
        q = `f(x,y)=${c}xy 在 (${X},${Y}) 处的梯度 = ？`;
        exp = `∇f = (${c}y, ${c}x)，在 (${X},${Y}) 为 (${c * Y}, ${c * X})，模 ${Math.sqrt(c * c * (X * X + Y * Y)).toFixed(2)}。`;
      } else if (type === 6) {
        const a = rnd(1, 9);
        o = opts("−∇f（负梯度）", () => "∇f", () => "等高线方向", () => "任意");
        q = `对 f(x,y)=${a}x²+y²，要使函数值下降最快，应沿哪个方向？`;
        exp = `最速下降方向 = 负梯度 −∇f。`;
      } else if (type === 7) {
        const p = rnd(1, 9), q2 = rnd(1, 9);
        o = opts(`(${p}, ${q2})`, () => `(${q2}, ${p})`, () => `(${p + q2}, 0)`, () => `(${p}, 0)`);
        q = `f(x,y)=${p}x+${q2}y 的梯度 ∇f = ？`;
        exp = `∇f = (∂f/∂x, ∂f/∂y) = (${p}, ${q2})。`;
      } else if (type === 8) {
        const c = rnd(1, 6), X = rnd(1, 5), Y = rnd(1, 5);
        const mod = (c * Math.sqrt(X * X + Y * Y)).toFixed(2);
        o = opts(`${mod}`, () => `${c}`, () => `${(c * X).toFixed(2)}`, () => `${(c * (X + Y)).toFixed(2)}`);
        q = `f(x,y)=${c}(x²+y²) 在 (${X},${Y}) 处梯度的模 = ？`;
        exp = `∇f = (2${c}x, 2${c}y)，模 = 2${c}√(${X}²+${Y}²) = ${mod}。`;
      } else {
        const c = rnd(1, 6);
        const dir = `(${c}, ${c})`;
        o = opts(`${dir}`, () => `(${-c}, ${-c})`, () => `(${c}, 0)`, () => `(0, ${c})`);
        q = `f(x,y)=${c}x+${c}y，使函数值增长最快的单位方向梯度的指向是？`;
        exp = `∇f = (${c}, ${c})，指向 (${c}, ${c})（增长最快方向）。`;
      }
      results.push(Q(q, o, "进阶", exp, "梯度"));
    }
    return results;
  }

  /* ============================================================
   * 注册到 window.TECHNIQUES
   * ============================================================ */
  const GEN = {
    euler: qEuler,
    taylor: qTaylor,
    numshape: qNumShape,
    induction: qInduction,
    amgm: qAmGm,
    binomial: qBinomial,
    inclusion_hs: qInclusion,
    recurrence: qRecurrence,
    tree: qTree,
    counting: qCounting,
    cauchy: qCauchy,
    linearprog: qLinearProg,
    matrix: qMatrix,
    lhopital: qLhopital,
    mvt: qMvt,
    bayes: qBayes,
    fullprob: qFullProb,
    normal_app: qNormalApp,
    definite_int: qDefiniteInt,
    diffeq: qDiffEq,
    ineq_scale: qIneqScale,
    seq_ineq: qSeqIneq,
    complex_geo: qComplexGeo,
    series: qSeries,
    coord_geo: qCoordGeo,
    jensen: qJensen,
    important_limit: qImpLimit,
    de_moivre: qDeMoivre,
    random_var: qRandVar,
    fourier: qFourier,
    integral_app: qIntApp,
    graph_transform: qGraphTrans,
    set: qSet,
    funcconcept: qFuncConcept,
    explog: qExpLog,
    trig: qTrig,
    sequence: qSequence,
    vector: qVector,
    solid: qSolid,
    derivative: qDerivative,
    conic: qConic,
    complex: qComplex,
    dist_exp: qDistExp,
    dist_binom: qDistBinom,
    stat_case: qStatCase,
    trig_id: qTrigId,
    seqsum: qSeqSum,
    solid_axis: qSolidAxis,
    solid_angle: qSolidAngle,
    deriv_mon: qDerivMon,
    deriv_ineq: qDerivIneq,
    func_zero: qFuncZero,
    conic_link: qConicLink,
    conic_chord: qConicChord,
    conic_prop: qConicProp,
    param_eq: qParamEq,
    polar_deep: qPolarDeep,
    param_extremum: qParamExtremum,
    vector_geo_adv: qVectorGeoAdv,
    abs_ineq: qAbsIneq,
    cauchy_app: qCauchyApp,
    rearrange_ineq: qRearrIneq,
    markov: qMarkov,
    lln: qLLN,
    confidence: qConfidence,
    hypothesis: qHypothesis,
    improper_int: qImproperInt,
    partial_deriv: qPartialDeriv,
    gradient: qGradient
  };

  if (window.TECHNIQUES) {
    window.TECHNIQUES.forEach(t => {
      if (GEN[t.id]) t.qgen = GEN[t.id];
    });
  }
  window.QGEN_HIGH_READY = true;
})();
