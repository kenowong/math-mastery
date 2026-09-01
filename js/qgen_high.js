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
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 集合运算
        const a = rnd(2, 5);
        const b = rnd(2, 5);
        const inter = Math.min(a, b);
        o = opts(inter + "个", () => (a + b) + "个", () => Math.abs(a - b) + "个", () => "0个");
        q = `集合 A 有 ${a} 个元素，集合 B 有 ${b} 个元素，若 A⊆B，则 A∩B 有？`;
        exp = `A⊆B 时 A∩B = A，有 ${a} 个元素。`;
      } else if (type === 1) {
        // 子集个数
        const n = rnd(2, 4);
        const ansCount = Math.pow(2, n);
        o = opts(`${ansCount}个`, () => ansCount + n, () => ansCount - 1, () => n + "个");
        q = `集合有 ${n} 个元素，它的子集共有？`;
        exp = `n 个元素的集合有 2ⁿ 个子集，2^${n} = ${ansCount} 个。`;
      } else if (type === 2) {
        // 充分必要条件
        o = opts("充分不必要", () => "必要不充分", () => "充要", () => "既不充分也不必要");
        q = `"x > 2" 是 "x > 1" 的什么条件？`;
        exp = `x > 2 能推出 x > 1（充分），但 x > 1 不能推出 x > 2（不必要），故为充分不必要条件。`;
      } else {
        // 命题否定
        o = opts("∀x∈R, x² ≥ 0", () => "∃x∈R, x² ≥ 0", () => "∀x∈R, x² < 0", () => "∃x∈R, x² ≤ 0");
        q = `命题 "∃x∈R, x² < 0" 的否定是？`;
        exp = `存在命题的否定是全称命题：∀x∈R, x² ≥ 0。`;
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
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 定义域
        const a = rnd(1, 5);
        o = opts(`x ≠ ${a}`, () => `x ≠ ${a + 1}`, () => `x ≥ 0`, () => `全体实数`);
        q = `函数 f(x) = 1/(x − ${a}) 的定义域是？`;
        exp = `分母不为 0，x − ${a} ≠ 0，即 x ≠ ${a}。`;
      } else if (type === 1) {
        // 值域
        const a = rnd(1, 5);
        o = opts(`y ≥ ${a}`, () => `y ≤ ${a}`, () => `y > ${a}`, () => `全体实数`);
        q = `函数 f(x) = (x − 1)² + ${a} 的值域是？`;
        exp = `平方项 ≥ 0，故 f(x) ≥ ${a}，值域为 y ≥ ${a}。`;
      } else if (type === 2) {
        // 奇偶性
        o = opts("奇函数", () => "偶函数", () => "既是奇函数又是偶函数", () => "非奇非偶");
        q = `函数 f(x) = x³ 是？`;
        exp = `f(−x) = (−x)³ = −x³ = −f(x)，为奇函数。`;
      } else {
        // 单调性
        const a = rnd(1, 5);
        o = opts("在 R 上递增", () => "在 R 上递减", () => "先减后增", () => "先增后减");
        q = `函数 f(x) = ${a}x + 1 (a > 0) 的单调性是？`;
        exp = `一次函数斜率 a > 0，在 R 上单调递增。`;
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
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 指数运算
        const a = rnd(2, 4);
        const m = rnd(1, 3);
        const ansVal = a * m;
        o = opts(`a^${ansVal}`, () => `a^${ansVal + 1}`, () => `a^${ansVal - 1}`, () => `${a * m}`);
        q = `a^${m} · a^${m} = ？`;
        exp = `同底数幂相乘，指数相加：a^${m} · a^${m} = a^${m + m} = a^${ansVal}。`;
      } else if (type === 1) {
        // 对数运算
        const base = rnd(2, 4);
        const ans = rnd(2, 5);
        const val = Math.pow(base, ans);
        o = opts(ans, () => ans + 1, () => ans - 1, () => base);
        q = `log_${base}(${val}) = ？`;
        exp = `由对数定义：${base}^${ans} = ${val}，故 log_${base}(${val}) = ${ans}。`;
      } else if (type === 2) {
        // 对数方程
        const base = rnd(2, 4);
        const ans = rnd(2, 5);
        const val = Math.pow(base, ans);
        o = opts(ans, () => ans + 1, () => ans - 1, () => val);
        q = `解方程 log_${base}(x) = ${ans}，x = ？`;
        exp = `x = ${base}^${ans} = ${val}。`;
      } else {
        // 指数方程
        const base = rnd(2, 4);
        const ans = rnd(1, 4);
        const val = Math.pow(base, ans);
        o = opts(ans, () => ans + 1, () => ans - 1, () => val);
        q = `解方程 ${base}^x = ${val}，x = ？`;
        exp = `x = log_${base}(${val}) = ${ans}。`;
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
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // sin 值
        const angles = [30, 45, 60, 90, 120, 135, 150];
        const angle = pick(angles);
        const sinVals = { 30: "1/2", 45: "√2/2", 60: "√3/2", 90: "1", 120: "√3/2", 135: "√2/2", 150: "1/2" };
        o = opts(sinVals[angle], () => "0", () => "−1/2", () => "−1");
        q = `sin ${angle}° = ？`;
        exp = `sin ${angle}° = ${sinVals[angle]}。`;
      } else if (type === 1) {
        // cos 值
        const angles = [30, 45, 60, 90, 120, 135, 150];
        const angle = pick(angles);
        const sinVals = { 30: "1/2", 45: "√2/2", 60: "√3/2", 90: "1", 120: "√3/2", 135: "√2/2", 150: "1/2" };
        const cosVals = { 30: "√3/2", 45: "√2/2", 60: "1/2", 90: "0", 120: "−1/2", 135: "−√2/2", 150: "−√3/2" };
        o = opts(cosVals[angle], () => sinVals[angle], () => "0", () => "1");
        q = `cos ${angle}° = ？`;
        exp = `cos ${angle}° = ${cosVals[angle]}。`;
      } else if (type === 2) {
        // 三角恒等式
        o = opts("sin²α + cos²α = 1", () => "sin²α − cos²α = 1", () => "sinα + cosα = 1", () => "tanα = sinα/cosα");
        q = `下列等式恒成立的是？`;
        exp = `基本的三角恒等式：sin²α + cos²α = 1。`;
      } else {
        // 诱导公式
        o = opts("-sinα", () => "sinα", () => "cosα", () => "-cosα");
        q = `sin(180° − α) = ？`;
        exp = `诱导公式：sin(180° − α) = sinα。`;
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
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 和角公式
        o = opts("sinαcosβ + cosαsinβ", () => "sinαcosβ − cosαsinβ", () => "cosαcosβ − sinαsinβ", () => "cosαcosβ + sinαsinβ");
        q = `sin(α + β) 的展开式是？`;
        exp = `和角公式：sin(α + β) = sinαcosβ + cosαsinβ。`;
      } else if (type === 1) {
        // 二倍角公式
        o = opts("2sinαcosα", () => "sin²α − cos²α", () => "2cos²α − 1", () => "1 − 2sin²α");
        q = `sin2α 的公式是？`;
        exp = `二倍角公式：sin2α = 2sinαcosα。`;
      } else if (type === 2) {
        // 半角公式
        o = opts("±√((1−cosα)/2)", () => "±√((1+cosα)/2)", () => "1−cosα", () => "1+cosα");
        q = `sin(α/2) 的半角公式是？`;
        exp = `半角公式：sin(α/2) = ±√((1−cosα)/2)。`;
      } else {
        // 积化和差
        o = opts("(1/2)[sin(α+β)+sin(α−β)]", () => "(1/2)[cos(α+β)+cos(α−β)]", () => "(1/2)[sin(α+β)−sin(α−β)]", () => "(1/2)[cos(α+β)−cos(α−β)]");
        q = `sinαcosβ 的积化和差公式是？`;
        exp = `积化和差：sinαcosβ = (1/2)[sin(α+β)+sin(α−β)]。`;
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
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 裂项相消
        const n = rnd(3, 6);
        const ans = n / (n + 1);
        o = opts(`${n}/${n + 1}`, () => `${n + 1}/${n + 2}`, () => `${n - 1}/n`, () => `1/${n + 1}`);
        q = `求和：1/(1×2) + 1/(2×3) + ... + 1/(${n}×(${n}+1)) = ？`;
        exp = `裂项：1/(k(k+1)) = 1/k − 1/(k+1)，相消后得 ${n}/${n + 1}。`;
      } else if (type === 1) {
        // 错位相减
        const a1 = 1, ratio = 2, n = rnd(3, 5);
        const sn = Math.pow(2, n) - 1;
        o = opts(sn, () => sn + 1, () => sn - 1, () => Math.pow(2, n + 1));
        q = `求和：1 + 2 + 4 + ... + 2^${n - 1} = ？`;
        exp = `等比数列求和：S = (2^${n} − 1)/(2 − 1) = ${sn}。`;
      } else if (type === 2) {
        // 分组求和
        const n = rnd(2, 4);
        const an = 2 * n + 1;
        o = opts(an, () => an + 2, () => an - 2, () => 2 * n);
        q = `数列 a_n = 2n + 1，第 ${n} 项 a_${n} = ？`;
        exp = `a_${n} = 2×${n} + 1 = ${an}。`;
      } else {
        // 并项求和
        const n = rnd(2, 5);
        const ans = n * (n + 1) / 2;
        o = opts(ans, () => ans + 1, () => ans - 1, () => n * n);
        q = `求和：1 + 2 − 3 + 4 − 5 + ... + ${2 * n} = ？`;
        exp = `分组：(1+2)+(−3+4)+(−5+6)+... = ${n} 组，每组 1，和为 ${ans}。`;
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
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 正方体性质
        o = opts("4个", () => "6个", () => "8个", () => "12个");
        q = `正方体有 ${rnd(1, 8)} 个顶点，从每个顶点出发的棱有？`;
        exp = `正方体每个顶点连接 3 条棱，但这里问的是从一个顶点出发的棱数 = 3。`;
      } else if (type === 1) {
        // 三视图
        o = opts("正视图、侧视图、俯视图", () => "正视图、俯视图、剖视图", () => "正视图、侧视图、剖视图", () => "主视图、左视图、右视图");
        q = `三视图包括？`;
        exp = `三视图：正视图（主视图）、侧视图（左视图）、俯视图。`;
      } else if (type === 2) {
        // 线面平行
        o = opts("线在面外且与面内一直线平行", () => "线与面内所有直线平行", () => "线与面内一直线垂直", () => "线在面内");
        q = `直线与平面平行的判定条件是？`;
        exp = `线面平行判定：若平面外一直线与平面内一直线平行，则线面平行。`;
      } else {
        // 面面垂直
        o = opts("一平面过另一平面的垂线", () => "两平面交线垂直", () => "两平面平行", () => "两平面相交");
        q = `两平面垂直的判定条件是？`;
        exp = `面面垂直判定：若一平面过另一平面的垂线，则两平面垂直。`;
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
      const type = i % 3;
      let q, ans, o, exp;
      if (type === 0) {
        // 异面直线夹角
        o = opts("锐角或直角", () => "钝角", () => "平角", () => "无法确定");
        q = `异面直线所成角的范围是？`;
        exp = `异面直线所成角范围：(0°, 90°]，即锐角或直角。`;
      } else if (type === 1) {
        // 线面角
        o = opts("线与面内投影的夹角", () => "线与面内任意直线的夹角", () => "两平面的夹角", () => "线与法向量的夹角");
        q = `直线与平面所成角是指？`;
        exp = `线面角是直线与其在平面内投影的夹角，范围 [0°, 90°]。`;
      } else {
        // 二面角
        o = opts("两平面交线的垂面与两平面的交线所成的角", () => "两平面内任意两条直线的夹角", () => "两平面法向量的夹角", () => "两平面内平行线的夹角");
        q = `二面角的平面角是指？`;
        exp = `二面角的平面角是由交线上一点，在两平面内分别作交线的垂线所成的角。`;
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
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 基本导数
        const n_val = rnd(2, 5);
        const ansCoeff = n_val;
        o = opts(`${n_val}x^${n_val - 1}`, () => `x^${n_val}`, () => `${n_val}x^${n_val}`, () => `x^${n_val - 1}`);
        q = `f(x) = x^${n_val} 的导数 f'(x) = ？`;
        exp = `幂函数求导：(x^n)' = n·x^(n−1)，故 f'(x) = ${n_val}x^${n_val - 1}。`;
      } else if (type === 1) {
        // 导数应用（单调性）
        o = opts("f'(x) > 0", () => "f'(x) < 0", () => "f(x) > 0", () => "f(x) < 0");
        q = `函数 f(x) 在区间 I 上单调递增的充要条件是？`;
        exp = `f(x) 在 I 上单调递增 ⇔ f'(x) ≥ 0（在 I 上恒成立）。`;
      } else if (type === 2) {
        // 极值点
        const a = rnd(1, 3);
        o = opts(`f'(x) = 0 且 f''(x) ≠ 0`, () => "f(x) = 0", () => "f'(x) = 0", () => "f''(x) = 0");
        q = `函数 f(x) 在 x₀ 处取得极值的必要条件是？`;
        exp = `极值点必要条件是 f'(x₀) = 0（驻点），但不是充分条件。`;
      } else {
        // 切线方程
        const x0 = rnd(1, 3);
        const slope = rnd(1, 5);
        const y0 = slope * x0;
        o = opts(`y − ${y0} = ${slope}(x − ${x0})`, () => `y − ${x0} = ${slope}(x − ${y0})`, () => `y = ${slope}x + ${x0}`, () => `y = ${slope}x + ${y0}`);
        q = `曲线 y = ${slope}x 在点 (${x0}, ${y0}) 处的切线方程是？`;
        exp = `切线斜率 k = ${slope}，切线方程：y − ${y0} = ${slope}(x − ${x0})。`;
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
      const type = i % 3;
      let q, ans, o, exp;
      if (type === 0) {
        // 求导数
        const a = rnd(2, 5), n_val = rnd(2, 4);
        const coeff = a * n_val;
        o = opts(`${coeff}x^${n_val - 1}`, () => `${a}x^${n_val}`, () => `${coeff}x^${n_val}`, () => `${a * n_val}x^${n_val + 1}`);
        q = `f(x) = ${a}x^${n_val} 的导数 f'(x) = ？`;
        exp = `f'(x) = ${a}·${n_val}·x^${n_val - 1} = ${coeff}x^${n_val - 1}。`;
      } else if (type === 1) {
        // 单调区间
        o = opts("(-∞, 0) 递减，(0, +∞) 递增", () => "(-∞, 0) 递增，(0, +∞) 递减", () => "R 上递增", () => "R 上递减");
        q = `函数 f(x) = x² 的单调区间是？`;
        exp = `f'(x) = 2x，当 x < 0 时 f'(x) < 0（递减），当 x > 0 时 f'(x) > 0（递增）。`;
      } else {
        // 极值
        const a = rnd(1, 3);
        o = opts(`x = 0 处取极小值`, () => `x = 0 处取极大值`, () => `x = ${a} 处取极值`, () => "无极值");
        q = `函数 f(x) = ${a}x² 在 x = 0 处的极值是？`;
        exp = `f'(x) = 2${a}x，x = 0 时 f'(x) = 0，f''(0) = 2${a} > 0，取极小值。`;
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
      const type = i % 3;
      let q, ans, o, exp;
      if (type === 0) {
        // 恒成立条件
        o = opts("f(x) ≥ 0 在 R 上恒成立", () => "f(x) > 0 在 R 上恒成立", () => "f(x) ≤ 0 在 R 上恒成立", () => "f(x) < 0 在 R 上恒成立");
        q = `不等式 f(x) ≥ 0 在定义域内恒成立的含义是？`;
        exp = `恒成立指对于定义域内所有 x，都有 f(x) ≥ 0。`;
      } else if (type === 1) {
        // 最值应用
        const a = rnd(1, 3);
        const ansMin = -a;
        o = opts(`f(x) ≥ ${ansMin}`, () => `f(x) ≥ ${ansMin + 1}`, () => `f(x) ≤ ${ansMin}`, () => `f(x) > ${ansMin}`);
        q = `函数 f(x) = x² − ${a} 的最小值是？`;
        exp = `f(x) = x² − ${a} ≥ −${a}，最小值为 ${ansMin}。`;
      } else {
        // 参数范围
        o = opts("a > 0", () => "a < 0", () => "a ≥ 0", () => "a ≤ 0");
        q = `函数 f(x) = ax² + x 在 R 上单调递增，a 的取值范围是？`;
        exp = `f'(x) = 2ax + 1 ≥ 0 恒成立，需 a ≥ 0 且 1 ≥ 0，故 a ≥ 0。`;
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
      const type = i % 3;
      let q, ans, o, exp;
      if (type === 0) {
        // 零点定义
        o = opts("f(x) = 0 的根", () => "f'(x) = 0 的根", () => "f''(x) = 0 的根", () => "f(x) 的极值点");
        q = `函数 f(x) 的零点是指？`;
        exp = `零点即方程 f(x) = 0 的实数根，或函数图像与 x 轴的交点。`;
      } else if (type === 1) {
        // 零点存在定理
        o = opts("f(a)·f(b) < 0", () => "f(a)·f(b) > 0", () => "f(a) = f(b)", () => "f'(a) = f'(b)");
        q = `函数在 [a,b] 上有零点的充分条件是？`;
        exp = `零点存在定理：若 f(a)·f(b) < 0，则在 (a,b) 内至少有一个零点。`;
      } else {
        // 极值点偏移
        o = opts("f'(x₀) = 0 且 f''(x₀) ≠ 0", () => "f(x₀) = 0", () => "f'(x₀) ≠ 0", () => "f''(x₀) = 0");
        q = `函数 f(x) 在 x₀ 处取得极值的充分条件是？`;
        exp = `极值点充分条件：f'(x₀) = 0 且 f''(x₀) ≠ 0。`;
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
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 椭圆定义
        o = opts("到两定点距离之和为常数", () => "到两定点距离之差为常数", () => "到定点与定直线距离相等", () => "到两定点距离之比为常数");
        q = `椭圆的定义是？`;
        exp = `椭圆：平面内到两定点（焦点）距离之和为常数（大于两焦点距离）的点的轨迹。`;
      } else if (type === 1) {
        // 双曲线定义
        o = opts("到两定点距离之差的绝对值为常数", () => "到两定点距离之和为常数", () => "到定点与定直线距离相等", () => "到两定点距离之比为常数");
        q = `双曲线的定义是？`;
        exp = `双曲线：平面内到两定点（焦点）距离之差的绝对值为常数（小于两焦点距离）的点的轨迹。`;
      } else if (type === 2) {
        // 抛物线定义
        o = opts("到定点与定直线距离相等", () => "到两定点距离之和为常数", () => "到两定点距离之差为常数", () => "到两定点距离之比为常数");
        q = `抛物线的定义是？`;
        exp = `抛物线：平面内到定点（焦点）与定直线（准线）距离相等的点的轨迹。`;
      } else {
        // 离心率
        o = opts("e < 1", () => "e = 1", () => "e > 1", () => "e = 0");
        q = `椭圆的离心率 e 的范围是？`;
        exp = `椭圆离心率 0 < e < 1，e 越接近 0 越圆，越接近 1 越扁。`;
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
      const type = i % 3;
      let q, ans, o, exp;
      if (type === 0) {
        // 中点坐标
        const x1 = rnd(1, 5), x2 = rnd(1, 5);
        const mid = (x1 + x2) / 2;
        o = opts(mid, () => mid + 1, () => mid - 1, () => x1 + x2);
        q = `线段两端点横坐标为 ${x1} 和 ${x2}，中点横坐标是？`;
        exp = `中点横坐标 = (${x1} + ${x2}) / 2 = ${mid}。`;
      } else if (type === 1) {
        // 弦长
        const a = 1, b = rnd(2, 6), c = rnd(1, 5);
        const delta = b * b - 4 * a * c;
        const dist = Math.sqrt(delta) / a;
        o = opts(dist, () => delta, () => Math.sqrt(delta), () => delta / 2);
        q = `方程 x² + ${b}x + ${c} = 0 的两根距离 |x₁−x₂| = ？`;
        exp = `|x₁−x₂| = √Δ/|a| = √${delta} / 1 = ${dist}。`;
      } else {
        // 定点问题
        o = opts("直线过定点 (0, b)", () => "直线过定点 (b, 0)", () => "直线过原点", () => "直线不过定点");
        q = `直线 y = kx + b (k 为参数) 恒过定点？`;
        exp = `当 x = 0 时 y = b，故直线恒过定点 (0, b)。`;
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
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 椭圆性质
        const a = rnd(3, 8);
        const b = rnd(2, a - 1);
        const c = Math.sqrt(a * a - b * b);
        const e = c / a;
        o = opts(e.toFixed(2), () => (e + 0.1).toFixed(2), () => (e - 0.1).toFixed(2), () => "1.00");
        q = `椭圆 x²/${a*a} + y²/${b*b} = 1 的离心率 e ≈ ？`;
        exp = `c = √(a²−b²) = √(${a*a}−${b*b}) = ${c.toFixed(1)}，e = c/a = ${c.toFixed(1)}/${a} ≈ ${e.toFixed(2)}。`;
      } else if (type === 1) {
        // 双曲线性质
        const a = rnd(2, 5);
        const b = rnd(2, 5);
        const c = Math.sqrt(a * a + b * b);
        const e = c / a;
        o = opts(e.toFixed(2), () => (e + 0.1).toFixed(2), () => (e - 0.1).toFixed(2), () => "1.00");
        q = `双曲线 x²/${a*a} − y²/${b*b} = 1 的离心率 e ≈ ？`;
        exp = `c = √(a²+b²) = √(${a*a}+${b*b}) = ${c.toFixed(1)}，e = c/a = ${c.toFixed(1)}/${a} ≈ ${e.toFixed(2)}。`;
      } else if (type === 2) {
        // 抛物线性质
        o = opts("焦点到准线的距离 p", () => "2p", () => "p/2", () => "p²");
        q = `抛物线 y² = 2px 的焦点到准线的距离是？`;
        exp = `抛物线 y² = 2px 的焦点 (p/2, 0)，准线 x = −p/2，距离 = p。`;
      } else {
        // 切线方程
        o = opts("xx₀ + yy₀ = r²", () => "xx₀ − yy₀ = r²", () => "x + y = r", () => "xy = r²");
        q = `圆 x² + y² = r² 在点 (x₀, y₀) 处的切线方程是？`;
        exp = `圆的切线方程：xx₀ + yy₀ = r²。`;
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
      const type = i % 3;
      let q, ans, o, exp;
      if (type === 0) {
        // 参数方程化普通方程
        o = opts("x² + y² = r²", () => "x² − y² = r²", () => "y = kx + b", () => "x = r");
        q = `参数方程 x = rcosθ, y = rsinθ 消参后是？`;
        exp = `x² + y² = r²cos²θ + r²sin²θ = r²(cos²θ + sin²θ) = r²。`;
      } else if (type === 1) {
        // 极坐标化直角坐标
        const r = rnd(2, 5);
        o = opts(`${r}cosθ`, () => `${r}sinθ`, () => `${r}/cosθ`, () => `${r}/sinθ`);
        q = `极坐标 ρ = ${r} 化为直角坐标方程是？`;
        exp = `ρ = ${r} → x² + y² = ${r}²，即圆。`;
      } else {
        // 参数方程应用
        o = opts("t", () => "θ", () => "ρ", () => "φ");
        q = `参数方程 x = t², y = 2t 中的参数通常是？`;
        exp = `参数方程中的变量 t（或 θ）称为参数。`;
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
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 期望计算
        const E = rnd(2, 10);
        o = opts(E, () => E + 1, () => E - 1, () => E * 2);
        q = `随机变量 X 的期望 E(X) = ${E}，则 E(2X) = ？`;
        exp = `E(2X) = 2E(X) = 2 × ${E} = ${E * 2}。`;
      } else if (type === 1) {
        // 方差计算
        const D = rnd(1, 5);
        o = opts(D, () => D * 2, () => D / 2, () => D + 1);
        q = `随机变量 X 的方差 D(X) = ${D}，则 D(2X) = ？`;
        exp = `D(2X) = 4D(X) = 4 × ${D} = ${D * 4}。`;
      } else if (type === 2) {
        // 分布列性质
        o = opts("所有概率之和为 1", () => "所有概率之和为 0", () => "概率可以为负", () => "概率可以大于 1");
        q = `离散型随机变量分布列的基本性质是？`;
        exp = `分布列性质：所有概率 P(X=xᵢ) ≥ 0，且 ΣP(X=xᵢ) = 1。`;
      } else {
        // 期望性质
        o = opts("E(aX+b) = aE(X)+b", () => "E(aX+b) = aE(X)", () => "E(aX+b) = aE(X)+b²", () => "E(aX+b) = E(X)+b");
        q = `期望的线性性质是？`;
        exp = `E(aX + b) = aE(X) + b。`;
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
      const type = i % 4;
      let q, ans, o, exp;
      if (type === 0) {
        // 二项分布期望
        const n_trials = rnd(2, 10);
        const p = 0.5;
        const E = n_trials * p;
        o = opts(E, () => E + 1, () => E - 1, () => p);
        q = `X ~ B(${n_trials}, 0.5)，E(X) = ？`;
        exp = `二项分布期望 E(X) = np = ${n_trials} × 0.5 = ${E}。`;
      } else if (type === 1) {
        // 二项分布方差
        const n_trials = rnd(2, 10);
        const p = 0.5;
        const D = n_trials * p * (1 - p);
        o = opts(D, () => D + 1, () => D - 1, () => p);
        q = `X ~ B(${n_trials}, 0.5)，D(X) = ？`;
        exp = `二项分布方差 D(X) = np(1−p) = ${n_trials} × 0.5 × 0.5 = ${D}。`;
      } else if (type === 2) {
        // 正态分布性质
        o = opts("关于 μ 对称", () => "关于 σ 对称", () => "关于 0 对称", () => "无对称性");
        q = `正态分布 N(μ, σ²) 的图像关于？对称`;
        exp = `正态分布曲线关于 μ 对称，μ 是均值（中心位置）。`;
      } else {
        // 标准正态分布
        o = opts("μ=0, σ=1", () => "μ=0, σ=0", () => "μ=1, σ=0", () => "μ=1, σ=1");
        q = `标准正态分布 N(0,1) 的参数是？`;
        exp = `标准正态分布：均值 μ = 0，标准差 σ = 1。`;
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
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("cosθ + i·sinθ", () => "cosθ − i·sinθ", () => "sinθ + i·cosθ", () => "e^θ");
        q = "欧拉公式：e^(iθ) 等于？";
        exp = "欧拉公式 e^(iθ) = cosθ + i·sinθ，把复数与三角联系起来。";
      } else if (type === 1) {
        o = opts("−1", () => "1", () => "i", () => "0");
        q = "欧拉恒等式中 e^(iπ) 的值是？";
        exp = "e^(iπ) = cosπ + i·sinπ = −1 + 0 = −1，故 e^(iπ) + 1 = 0。";
      } else if (type === 2) {
        o = opts("i", () => "−i", () => "1", () => "−1");
        q = "e^(i·π/2) 的值是？";
        exp = "e^(iπ/2) = cos(π/2) + i·sin(π/2) = 0 + i·1 = i。";
      } else {
        o = opts("1", () => "|cosθ|", () => "θ", () => "e^θ");
        q = "复数 e^(iθ) 的模长 |e^(iθ)| 是？";
        exp = "|cosθ + i·sinθ| = √(cos²θ + sin²θ) = 1，始终在单位圆上。";
      }
      results.push(Q(q, o, "基础", exp, "欧拉公式", "euler_circle"));
    }
    return results;
  }

  function qTaylor(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 5;
      let q, o, exp;
      if (type === 0) {
        o = opts("1/24", () => "1/6", () => "1/12", () => "1/2");
        q = "e^x 的麦克劳林展开中 x⁴ 项的系数是？";
        exp = "e^x = Σ xⁿ/n!，x⁴ 系数 = 1/4! = 1/24。";
      } else if (type === 1) {
        o = opts("0", () => "1", () => "−1", () => "1/2");
        q = "sin x 的麦克劳林展开中 x² 项的系数是？";
        exp = "sin x = x − x³/3! + x⁵/5! − …，只含奇次幂，x² 系数为 0。";
      } else if (type === 2) {
        o = opts("−1/2", () => "1/2", () => "−1", () => "1");
        q = "cos x 的麦克劳林展开中 x² 项的系数是？";
        exp = "cos x = 1 − x²/2! + x⁴/4! − …，x² 系数 = −1/2。";
      } else if (type === 3) {
        o = opts("1", () => "−1", () => "1/2", () => "0");
        q = "ln(1+x) 的麦克劳林展开中 x 项的系数是？";
        exp = "ln(1+x) = x − x²/2 + x³/3 − …，x 项系数为 1。";
      } else {
        o = opts("1", () => "3", () => "1/3", () => "−1");
        q = "把 1/(1−x) 展开成幂级数，x³ 项的系数是？";
        exp = "等比级数 1/(1−x) = 1 + x + x² + x³ + …，x³ 系数 = 1。";
      }
      results.push(Q(q, o, "进阶", exp, "泰勒级数", "taylor_graph"));
    }
    return results;
  }

  function qNumShape(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 5;
      let q, o, exp;
      if (type === 0) {
        o = opts("点 3", () => "原点", () => "点 0", () => "点 x");
        q = "|x − 3| 的几何意义是数轴上点 x 到哪里的距离？";
        exp = "|x − a| 表示点 x 到点 a 的距离，故 |x−3| 是到 3 的距离。";
      } else if (type === 1) {
        o = opts("x < −1 或 x > 1", () => "−1 < x < 1", () => "x > 1", () => "x < −1");
        q = "用数形结合解不等式 x² − 1 > 0，解集是？";
        exp = "抛物线 y = x² − 1 在 x 轴上方时 x² > 1，即 x < −1 或 x > 1。";
      } else if (type === 2) {
        o = opts("−1 和 3", () => "1 和 3", () => "−1 和 −3", () => "1 和 −3");
        q = "函数 f(x) = x² − 2x − 3 的零点（与 x 轴交点横坐标）是？";
        exp = "x² − 2x − 3 = 0 → (x−3)(x+1) = 0 → x = 3 或 x = −1。";
      } else if (type === 3) {
        o = opts("第二象限", () => "第一象限", () => "第三象限", () => "第四象限");
        q = "点 (−2, 3) 在平面直角坐标系位于？";
        exp = "x < 0、y > 0，属于第二象限。";
      } else {
        o = opts("0", () => "1", () => "−1", () => "不存在");
        q = "用数形结合看函数 y = |x| 的最小值是？";
        exp = "V 形图像顶点在原点 (0,0)，最小值为 0。";
      }
      results.push(Q(q, o, "基础", exp, "数形结合", "numshape_coord"));
    }
    return results;
  }

  function qInduction(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("验证 n 取初值（如 n=1）时命题成立", () => "令 n→∞", () => "证明 n=k+1", () => "直接写结论");
        q = "用数学归纳法证明命题，第一步（奠基）要做的是？";
        exp = "第一步验证起始值（如 n=1）时命题成立。";
      } else if (type === 1) {
        o = opts("由 n=k 成立推出 n=k+1 成立", () => "由 n=1 推出 n=2", () => "证明 n=k 成立", () => "令 n→∞");
        q = "归纳法的第二步（递推）要证明的是？";
        exp = "假设 n=k 成立，推出 n=k+1 也成立，形成递推链条。";
      } else if (type === 2) {
        o = opts("5050", () => "5000", () => "10100", () => "100");
        q = "由归纳法可得 1 + 2 + … + 100 = ？";
        exp = "公式 n(n+1)/2，100×101/2 = 5050。";
      } else {
        o = opts("7", () => "8", () => "6", () => "15");
        q = "2⁰ + 2¹ + 2² = ？";
        exp = "1 + 2 + 4 = 7 = 2³ − 1，符合等比求和公式。";
      }
      results.push(Q(q, o, "基础", exp, "数学归纳法", "induction_steps"));
    }
    return results;
  }

  function qAmGm(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("a + b ≥ 2√(ab)", () => "a + b ≤ 2√(ab)", () => "a + b = 2√(ab)", () => "无确定关系");
        q = "对正数 a、b，基本均值不等式是？";
        exp = "a + b ≥ 2√(ab)，当且仅当 a = b 取等号。";
      } else if (type === 1) {
        o = opts("4", () => "2", () => "8", () => "√4");
        q = "x > 0 时，x + 4/x 的最小值（用均值不等式）是？";
        exp = "x + 4/x ≥ 2√(x·4/x) = 2√4 = 4，当 x = 2 时取等。";
      } else if (type === 2) {
        o = opts("a = b = c", () => "a + b + c = 0", () => "任意正数", () => "a = 0");
        q = "a + b + c ≥ 3·³√(abc) 等号成立的条件是？";
        exp = "三元均值不等式等号当且仅当 a = b = c 时成立。";
      } else {
        o = opts("2", () => "1", () => "0", () => "√2");
        q = "x > 0 时，x + 1/x 的最小值是？";
        exp = "x + 1/x ≥ 2√(x·1/x) = 2，当 x = 1 时取等。";
      }
      results.push(Q(q, o, "进阶", exp, "均值不等式", "amgm_rect"));
    }
    return results;
  }

  function qBinomial(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 5;
      let q, o, exp;
      if (type === 0) {
        o = opts("n + 1", () => "n", () => "2n", () => "n − 1");
        q = "(a + b)^n 展开后共有多少项？";
        exp = "从 aⁿ, a^{n−1}b, … 到 bⁿ 共 n + 1 项。";
      } else if (type === 1) {
        o = opts("3", () => "1", () => "6", () => "2");
        q = "(a + b)³ 展开中 a²b 项的系数是？";
        exp = "组合数为 C(3,1) = 3，故系数为 3。";
      } else if (type === 2) {
        o = opts("6", () => "4", () => "1", () => "24");
        q = "(1 + x)^4 展开式中 x² 项的系数是？";
        exp = "C(4,2) = 6，x² 系数为 6。";
      } else if (type === 3) {
        o = opts("1", () => "5", () => "x⁵", () => "0");
        q = "(x + 1)^5 展开式的常数项是？";
        exp = "取 x⁰ 项：C(5,5)·x⁰·1⁵ = 1，常数项为 1。";
      } else {
        o = opts("2ⁿ", () => "n", () => "n + 1", () => "2n");
        q = "(a + b)^n 各项二项式系数之和是？";
        exp = "令 a = b = 1，得系数和 = (1+1)^n = 2ⁿ。";
      }
      results.push(Q(q, o, "进阶", exp, "二项式定理", "binomial_triangle"));
    }
    return results;
  }

  function qInclusion(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("30", () => "35", () => "25", () => "5");
        q = "班中 20 人会英语、15 人会日语，两种都会的 5 人，至少会一种的有几人？";
        exp = "20 + 15 − 5 = 30（人）。容斥：会一种 + 会一种 − 都会。";
      } else if (type === 1) {
        o = opts("|A| + |B| − |A∩B|", () => "|A| + |B|", () => "|A|·|B|", () => "|A∩B|");
        q = "两集合容斥原理：|A∪B| = ？";
        exp = "|A∪B| = |A| + |B| − |A∩B|，减去重复计数的交集。";
      } else if (type === 2) {
        o = opts("+ |A∩B∩C|", () => "0", () => "− |A∩B∩C|", () => "|A|·|B|·|C|");
        q = "三集合 |A∪B∪C| = |A|+|B|+|C| − (两两交之和) + ？";
        exp = "加回被多减一次的三者交集 |A∩B∩C|。";
      } else {
        o = opts("67", () => "50", () => "33", () => "83");
        q = "1 到 100 中能被 2 或 3 整除的数共有几个？";
        exp = "被2整除50个、被3整除33个、被6整除16个 → 50+33−16 = 67。";
      }
      results.push(Q(q, o, "进阶", exp, "容斥原理", "inclusion_venn"));
    }
    return results;
  }

  function qRecurrence(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("16", () => "8", () => "32", () => "2");
        q = "数列 a₁ = 1，a_{n+1} = 2a_n，则 a₅ = ？";
        exp = "等比型：a_n = 2^{n−1}，a₅ = 2⁴ = 16。";
      } else if (type === 1) {
        o = opts("17", () => "15", () => "20", () => "18");
        q = "数列 a₁ = 2，a_{n+1} = a_n + 3，则 a₆ = ？";
        exp = "等差型：a_n = 2 + 3(n−1)，a₆ = 2 + 15 = 17。";
      } else if (type === 2) {
        o = opts("15", () => "7", () => "16", () => "31");
        q = "数列 a₁ = 1，a_{n+1} = 2a_n + 1，则 a₄ = ？";
        exp = "逐项算：1 → 3 → 7 → 15，故 a₄ = 15。";
      } else {
        o = opts("3^{n−1}", () => "3ⁿ", () => "n³", () => "3n");
        q = "数列 1, 3, 9, 27, … 的通项 a_n = ？";
        exp = "首项1、公比3的等比数列，a_n = 3^{n−1}。";
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
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(2, 4), b = rnd(2, 4);
        o = opts(`${a * b} 种`, () => `${a + b} 种`, () => `${a} 种`, () => `${a * b + 1} 种`);
        q = `有 ${a} 件上衣、${b} 条裤子，各选一件共有几种搭配？`;
        exp = `分步乘法原理：${a} × ${b} = ${a * b} 种。`;
      } else if (type === 1) {
        const k = rnd(2, 4);
        const total = Math.pow(2, k);
        o = opts(`${total} 种`, () => `${k} 种`, () => `${2 * k} 种`, () => `${k * k} 种`);
        q = `一枚硬币连续抛 ${k} 次，所有可能的结果序列有几种？`;
        exp = `每步 2 种，逐层翻倍共 2^${k} = ${total} 种（树状图逐层展开）。`;
      } else if (type === 2) {
        const k = rnd(2, 3);
        o = opts(`1 − 1/2^${k}`, () => `1/2^${k}`, () => `1/2`, () => `1`);
        q = `硬币抛 ${k} 次，至少出现 1 次正面的概率是？`;
        exp = `全反面的概率为 1/2^${k}，故至少 1 次正面 = 1 − 1/2^${k}。`;
      } else {
        o = opts(`1/6`, () => `1/12`, () => `1/18`, () => `1/36`);
        q = `同时掷两枚均匀骰子，点数之和为 7 的概率是？`;
        exp = `36 种等可能，和为 7 有 (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) 共 6 种，6/36 = 1/6。`;
      }
      results.push(Q(q, o, "基础", exp, "树状图法", "tree_diagram"));
    }
    return results;
  }

  function qCounting(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        const nn = rnd(4, 6);
        const A = nn * (nn - 1);
        o = opts(`${A}`, () => `${nn * (nn - 1) / 2}`, () => `${nn}`, () => `${nn - 1}`);
        q = `从 ${nn} 人中选 2 人排成一列（有顺序），有几种排法？`;
        exp = `排列数 A(${nn},2) = ${nn} × (${nn}−1) = ${A}。`;
      } else if (type === 1) {
        const nn = rnd(4, 6);
        const C = nn * (nn - 1) / 2;
        o = opts(`${C}`, () => `${nn * (nn - 1)}`, () => `${nn}`, () => `${nn - 1}`);
        q = `从 ${nn} 人中选 2 人组成一个小组（无顺序），有几种选法？`;
        exp = `组合数 C(${nn},2) = ${nn}(${nn}−1)/2 = ${C}。`;
      } else if (type === 2) {
        const nn = rnd(3, 4);
        let f = 1; for (let j = 2; j <= nn; j++) f *= j;
        o = opts(`${f}`, () => `${nn}`, () => `${nn * nn}`, () => `${Math.pow(2, nn)}`);
        q = `${nn} 个人排成一排照相，有几种排法？`;
        exp = `${nn} 个人的全排列 = ${nn}! = ${f}。`;
      } else {
        const nn = rnd(5, 8);
        const C = nn * (nn - 1) / 2;
        o = opts(`${C}`, () => `${nn}`, () => `${2 * nn}`, () => `${nn - 1}`);
        q = `${nn} 个人两两握手一次，共握手几次？`;
        exp = `每两人握一次，C(${nn},2) = ${nn}(${nn}−1)/2 = ${C} 次。`;
      }
      results.push(Q(q, o, "进阶", exp, "排列与组合", "counting_tree"));
    }
    return results;
  }

  function qCauchy(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("两向量共线（对应分量成比例）", () => "两向量垂直", () => "a = c", () => "任意情况");
        q = "二维柯西不等式 (a²+b²)(c²+d²) ≥ (ac+bd)² 中等号成立的条件是？";
        exp = "等号当且仅当向量 (a,b) 与 (c,d) 共线（对应分量成比例）。";
      } else if (type === 1) {
        o = opts(`1`, () => `2`, () => `√2`, () => `0`);
        q = `已知 a²+b²=1 且 c²+d²=1，则 ac+bd 的最大值为？`;
        exp = `柯西：(ac+bd)² ≤ (a²+b²)(c²+d²) = 1，故 ac+bd ≤ 1，最大值 1（两向量同向）。`;
      } else if (type === 2) {
        o = opts("柯西不等式", () => "均值不等式", () => "等差数列", () => "等比数列");
        q = "证明 (x+y)² ≤ 2(x²+y²) 最直接可用？";
        exp = "由柯西：(1²+1²)(x²+y²) ≥ (x+y)²，即 2(x²+y²) ≥ (x+y)²。";
      } else {
        o = opts("任意有限维都成立", () => "只二维", () => "只三维", () => "只一维");
        q = "柯西不等式 (Σaᵢ²)(Σbᵢ²) ≥ (Σaᵢbᵢ)² 适用于？";
        exp = "柯西不等式对任意有限维内积空间都成立。";
      }
      results.push(Q(q, o, "进阶", exp, "柯西不等式", "cauchy_rect"));
    }
    return results;
  }

  function qLinearProg(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        const m = rnd(3, 6);
        o = opts(`${m}`, () => `${2 * m}`, () => `${m / 2}`, () => `${m * m}`);
        q = `约束 x≥0, y≥0, x+y≤${m}，目标 z=x+y 的最大值是？`;
        exp = `在顶点 (${m},0) 或 (0,${m}) 处 z = ${m} 达到最大。`;
      } else if (type === 1) {
        const a = 2 * rnd(2, 4);
        const zmax = 2 * a / 3;
        o = opts(`${zmax}`, () => `${a}`, () => `${a / 3}`, () => `${2 * a}`);
        q = `约束 x≥0, y≥0, 2x+y≤${a}, x+2y≤${a}，目标 z=x+y 的最大值是？`;
        exp = `两约束交于 x=y=${a}/3，z = 2×${a}/3 = ${zmax}；比各坐标轴上的顶点更大。`;
      } else if (type === 2) {
        o = opts("凸多边形（凸集）", () => "任意形状", () => "圆形", () => "一条直线");
        q = "线性规划中，由线性不等式围成的可行域是？";
        exp = "线性约束的交集是凸集，有限情形为凸多边形。";
      } else {
        o = opts("可行域的顶点（角点）", () => "可行域内部", () => "坐标原点", () => "任意边界点");
        q = "线性规划目标函数的最值一定在何处取得？";
        exp = "由线性规划基本定理，最值在可行域的某个顶点取得。";
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
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts(`1`, () => `0`, () => `∞`, () => `−1`);
        q = "极限 lim(x→0) sin x / x = ？（0/0 型，可用洛必达）";
        exp = "洛必达：分子分母求导 → cos x / 1，x→0 得 1。";
      } else if (type === 1) {
        o = opts(`1`, () => `0`, () => `e`, () => `∞`);
        q = "极限 lim(x→0) (e^x − 1) / x = ？";
        exp = "洛必达：分子分母求导 → e^x / 1，x→0 得 1。";
      } else if (type === 2) {
        o = opts(`0`, () => `∞`, () => `1`, () => `1/2`);
        q = "极限 lim(x→∞) (ln x) / x = ？（∞/∞ 型）";
        exp = "洛必达：分子分母求导 → (1/x) / 1 = 1/x → 0（x→∞）。";
      } else {
        o = opts("0/0 或 ∞/∞ 型未定式", () => "0/∞ 型", () => "任意分式", () => "两数之积");
        q = "洛必达法则直接适用的条件是？";
        exp = "仅当极限为 0/0 或 ∞/∞ 未定式时才可直接用洛必达。";
      }
      results.push(Q(q, o, "进阶", exp, "洛必达法则", "lhopital_graph"));
    }
    return results;
  }

  function qMvt(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("(f(b) − f(a)) / (b − a)", () => "f(b) − f(a)", () => "f'(a)", () => "0");
        q = "拉格朗日中值定理：若 f 在[a,b]连续、(a,b)可导，则 ∃ξ∈(a,b) 使 f'(ξ) = ？";
        exp = "存在 ξ 使切线斜率等于割线斜率：f'(ξ) = (f(b)−f(a))/(b−a)。";
      } else if (type === 1) {
        o = opts(`1/2`, () => `1`, () => `0`, () => `2`);
        q = "f(x)=x² 在 [0,1] 上，满足中值定理的 ξ = ？";
        exp = "(1−0)/(1−0)=1，令 f'(ξ)=2ξ=1 → ξ=1/2。";
      } else if (type === 2) {
        o = opts("平行于弦（割线）", () => "垂直于 x 轴", () => "过原点", () => "平行于 y 轴");
        q = "中值定理的几何意义：存在一点切线？";
        exp = "存在 ξ 使该点切线与区间端点的连线（割线）平行。";
      } else {
        const nn = rnd(2, 4);
        const xi = `${nn}/√3`;
        o = opts(xi, () => `${nn}/3`, () => `√${nn}`, () => `${nn * nn}/3`);
        q = `f(x)=x³ 在 [0,${nn}] 上，满足中值定理的 ξ = ？`;
        exp = `(f(${nn})−f(0))/${nn} = ${nn}²，令 3ξ²=${nn}² → ξ=${nn}/√3。`;
      }
      results.push(Q(q, o, "进阶", exp, "中值定理", "mvt_tangent"));
    }
    return results;
  }

  function qBayes(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        const p1 = (rnd(3, 6)) / 10, p2 = (rnd(4, 8)) / 10;
        const prod = p1 * p2;
        o = opts(`${prod}`, () => `${p2}`, () => `${p1}`, () => `${p1 + p2}`);
        q = `已知 P(A)=${p1}，P(B|A)=${p2}，则 P(A∩B) = ？`;
        exp = `乘法公式：P(A∩B) = P(A)·P(B|A) = ${p1} × ${p2} = ${prod}。`;
      } else if (type === 1) {
        o = opts("P(A) + P(B)", () => "P(A)·P(B)", () => "0", () => "1");
        q = "若 A、B 互斥，则 P(A∪B) = ？";
        exp = "互斥事件无交集，P(A∪B) = P(A) + P(B)。";
      } else if (type === 2) {
        o = opts("由结果反推原因（逆概率）", () => "求独立", () => "求期望", () => "求方差");
        q = "贝叶斯公式主要用于解决哪类问题？";
        exp = "贝叶斯公式由已观察到的“结果”反推各“原因”的概率，即逆概率。";
      } else {
        o = opts("P(A)P(B|A) / P(B)", () => "P(A)/P(B)", () => "P(B|A)/P(A)", () => "P(A)+P(B)");
        q = "条件概率 P(A|B) 的计算公式是？";
        exp = "定义：P(A|B) = P(A∩B)/P(B) = P(A)P(B|A)/P(B)（乘法公式）。";
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
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("0", () => "1", () => "∞", () => "f(a)");
        q = "定积分 ∫_a^a f(x) dx = ？";
        exp = "上下限相同，积分区间长度为 0，故为 0。";
      } else if (type === 1) {
        const b = rnd(2, 5);
        const ans = b * b + b;
        o = opts(`${ans}`, () => `${b*b}`, () => `${b}`, () => `${(b+1)*(b+1)}`);
        q = `∫_0^${b} (2x+1) dx = ？`;
        exp = `原函数 x²+x，代入得 ${b}²+${b} = ${ans}。`;
      } else if (type === 2) {
        o = opts("2", () => "0", () => "π", () => "1");
        q = "∫_0^π sin x dx = ？";
        exp = "原函数 −cos x，−cos π − (−cos 0) = 1 + 1 = 2。";
      } else {
        o = opts("∫_a^c = ∫_a^b + ∫_b^c", () => "∫_a^c = ∫_a^b − ∫_b^c", () => "∫_a^c = ∫_a^b · ∫_b^c", () => "∫_a^c = 0");
        q = "定积分的区间可加性是？";
        exp = "∫_a^c f(x)dx = ∫_a^b f(x)dx + ∫_b^c f(x)dx（b 在 a、c 之间）。";
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "定积分"));
    }
    return results;
  }

  function qDiffEq(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        const k = rnd(2, 4);
        o = opts(`y = C·e^{${k}x}`, () => `y = C·x^${k}`, () => `y = e^{${k}x} + C`, () => `y = C·${k}x`);
        q = `微分方程 dy/dx = ${k}y 的通解是？`;
        exp = `分离变量：dy/y = ${k}dx → ln|y| = ${k}x + C → y = C·e^{${k}x}。`;
      } else if (type === 1) {
        o = opts("y = x² + C", () => "y = x³ + C", () => "y = 2x + C", () => "y = e^x + C");
        q = "dy/dx = 2x 的通解是？";
        exp = "两边积分：y = ∫2x dx = x² + C。";
      } else if (type === 2) {
        o = opts("y² = x² + C", () => "y = x² + C", () => "y² = 2x + C", () => "y = x + C");
        q = "由 dy/dx = x/y（y≠0）分离变量并积分得？";
        exp = "y dy = x dx → y²/2 = x²/2 + C → y² = x² + C（C 任意常数）。";
      } else {
        o = opts("含未知函数导数的方程", () => "代数方程", () => "不等式", () => "积分方程");
        q = "微分方程是指？";
        exp = "含有未知函数及其导数（或微分）的方程。";
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "微分方程"));
    }
    return results;
  }

  function qIneqScale(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("1/(n(n+1)) < 1/n", () => "1/(n(n+1)) > 1/n", () => "1/(n(n+1)) = 1/n", () => "1/(n(n+1)) > 1/n²");
        q = "放缩技巧：当 n>0 时，1/(n(n+1)) 与 1/n 的关系是？（裂项放缩基础）";
        exp = "分母 n(n+1) > n，故 1/(n(n+1)) < 1/n。常用于把级数放缩成易求和形式。";
      } else if (type === 1) {
        o = opts("放大成可求和的已知数列", () => "缩小成等差", () => "取对数", () => "平方");
        q = "证明 Σ 1/n² 收敛，常用放缩思路是？";
        exp = "把 1/n² 放缩为 1/(n(n-1)) = 1/(n-1) − 1/n，裂项成可求和形式。";
      } else if (type === 2) {
        const a = rnd(2, 5);
        o = opts(`S_n < a`, () => `S_n > a`, () => `S_n = a`, () => `S_n < 0`);
        q = `已知 0<a_n≤${a}、a_{n+1}≤a_n（递减有上界），则前 n 项和 S_n 满足？`;
        exp = "每项 ≤ ${a}，故 S_n = Σ a_k ≤ n·${a}；更强地由单调有界知 S_n 有上界。此处给出每项上界 ${a}。";
      } else {
        o = opts("把难求的式放缩到易求范围", () => "精确计算", () => "求导", () => "积分");
        q = "不等式放缩法的主要目的是？";
        exp = "当精确值难求时，把目标式放缩到容易求和/比较的范围，从而证明不等式或估计大小。";
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "放缩法"));
    }
    return results;
  }

  function qSeqIneq(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("数学归纳法", () => "代入法", () => "配方法", () => "换元法");
        q = "证明对一切 n∈N* 都有 a_n < M，最常用的方法是？";
        exp = "由 n=1 验证、假设 n=k 再推 n=k+1，即数学归纳法。";
      } else if (type === 1) {
        o = opts("单调有界数列必收敛", () => "单调必发散", () => "有界必发散", () => "无界必收敛");
        q = "数列极限存在准则“单调有界定理”内容是？";
        exp = "单调递增（减）且有上（下）界的数列必收敛。";
      } else if (type === 2) {
        const c = rnd(2, 5);
        o = opts(`≤ ${c}`, () => `≥ ${c}`, () => `= ${c}`, () => `< 0`);
        q = `已知 a_1 = ${c} 且数列 {a_n} 单调递减，则对任意 n 有 a_n ？`;
        exp = `单调递减 ⇒ a_n ≤ a_1 = ${c}。`;
      } else {
        o = opts("先放缩再求和", () => "直接求通项", () => "求导", () => "积分");
        q = "证明 Σ a_n < M（a_n>0）常用思路？";
        exp = "先放缩 a_n 到可求和的已知数列（如等比、裂项），再求和得上界。";
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "数列不等式"));
    }
    return results;
  }

  function qComplexGeo(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(2, 5), b = rnd(1, 4);
        const r = Math.sqrt(a*a + b*b);
        o = opts(`${r.toFixed(2)}`, () => `${a}`, () => `${b}`, () => `${a+b}`);
        q = `复数 z = ${a} + ${b}i 的模 |z|（几何意义：到原点距离）为？`;
        exp = `|z| = √(a²+b²) = √(${a}²+${b}²) = ${r.toFixed(2)}。`;
      } else if (type === 1) {
        const a = rnd(2, 4), b = rnd(1, 3);
        o = opts(`${b} − ${a}i`, () => `${a} + ${b}i`, () => `−${a} + ${b}i`, () => `${b} + ${a}i`);
        q = `复数 z = ${a} + ${b}i 乘 i 后等于？（i·(a+bi)）`;
        exp = `i(a+bi) = ai + bi² = −b + ai = ${b}−${a}i（相当于逆时针旋转 90°）。`;
      } else if (type === 2) {
        o = opts("关于实轴对称", () => "关于原点对称", () => "逆时针转 90°", () => "放大");
        q = "共轭复数 z̄ 的几何意义是？";
        exp = "z=a+bi 与 z̄=a−bi 实部相同、虚部相反，关于实轴对称。";
      } else {
        o = opts("辐角 arg(z)", () => "模长", () => "实部", () => "虚部");
        q = "复数 z 对应向量与正实轴的夹角称为？";
        exp = "该夹角称为辐角 arg(z)。";
      }
      results.push(Q(q, o, type === 3 ? "基础" : "进阶", exp, "复数几何"));
    }
    return results;
  }

  function qSeries(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("|r| < 1", () => "|r| > 1", () => "r > 0", () => "r < 1");
        q = "等比级数 Σ_{n=0}^∞ a rⁿ 收敛的充要条件是？";
        exp = "公比绝对值 |r| < 1 时收敛，否则发散。";
      } else if (type === 1) {
        o = opts("p > 1", () => "p > 0", () => "p ≥ 1", () => "p < 1");
        q = "p 级数 Σ 1/n^p 收敛的条件是？";
        exp = "p > 1 收敛，p ≤ 1 发散（p=1 为调和级数，发散）。";
      } else if (type === 2) {
        o = opts("发散", () => "收敛于 1", () => "收敛于 0", () => "收敛于 ln2");
        q = "调和级数 Σ_{n=1}^∞ 1/n 的敛散性是？";
        exp = "调和级数发散（虽通项趋于 0，但部分和趋于 ∞）。";
      } else {
        const r = rnd(2, 5) / 10;
        const sum = r / (1 - r);
        o = opts(`${sum.toFixed(2)}`, () => `${r.toFixed(2)}`, () => `${(1/(1-r)).toFixed(2)}`, () => `${(r*r).toFixed(2)}`);
        q = `级数 Σ_{n=1}^∞ ${r.toFixed(1)}ⁿ 的和（首项 ${r.toFixed(1)}、公比 ${r.toFixed(1)}）是？`;
        exp = `等比求和（从 n=1 起）= a/(1−r) = ${r.toFixed(1)}/(1−${r.toFixed(1)}) = ${sum.toFixed(2)}。`;
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
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        const fns = [["f(x)=x²", "f''=2>0，下凸（凸）"], ["f(x)=eˣ", "f''=eˣ>0，下凸（凸）"], ["f(x)=ln x (x>0)", "f''=−1/x²<0，上凸（凹）"], ["f(x)=√x (x>0)", "f''=−1/(4x^{3/2})<0，上凸（凹）"]];
        const idx = rnd(0, 3);
        o = opts(fns[idx][1].split("，")[1], () => "常数", () => "既凸又凹", () => "无凹凸性");
        q = `函数 ${fns[idx][0]} 的凹凸性是？`;
        exp = fns[idx][1] + "。";
      } else if (type === 1) {
        o = opts("f((x+y)/2) ≤ (f(x)+f(y))/2", () => "f((x+y)/2) ≥ (f(x)+f(y))/2", () => "f((x+y)/2) = (f(x)+f(y))/2", () => "f((x+y)/2) + (f(x)+f(y))/2 = 0");
        q = "f 为下凸（凸）函数时，对 x,y 有？";
        exp = "凸函数满足 Jensen：f((x+y)/2) ≤ (f(x)+f(y))/2。";
      } else if (type === 2) {
        o = opts("平方平均 ≥ 算术平均 ≥ 几何平均 ≥ 调和平均", () => "算术平均 ≥ 平方平均 ≥ 几何平均 ≥ 调和平均", () => "几何平均 ≥ 算术平均 ≥ 调和平均 ≥ 平方平均", () => "调和平均 ≥ 几何平均 ≥ 算术平均 ≥ 平方平均");
        q = "对正数 a,b，四个经典平均的大小顺序是？";
        exp = "Q ≥ A ≥ G ≥ H。这是 Jensen（凸性）的直接推论。";
      } else {
        o = opts("e^((x+y)/2) ≤ (eˣ+eʸ)/2", () => "e^((x+y)/2) ≥ (eˣ+eʸ)/2", () => "e^((x+y)/2) = (eˣ+eʸ)/2", () => "e^((x+y)/2) · (eˣ+eʸ)/2 = 1");
        q = "由 Jensen 不等式，对 f(t)=eᵗ（x,y 任意）有？";
        exp = "f(t)=eᵗ 下凸，故 e^((x+y)/2)=f((x+y)/2) ≤ (f(x)+f(y))/2 = (eˣ+eʸ)/2。";
      }
      results.push(Q(q, o, "进阶", exp, "琴生不等式"));
    }
    return results;
  }

  /* ---------- 拓展：重要极限（important_limit） ---------- */
  function qImpLimit(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("1", () => "0", () => "∞", () => "不存在");
        q = "lim_{x→0} sin x / x = ？";
        exp = "重要极限一：lim_{x→0} sin x / x = 1（夹逼或几何法证明）。";
      } else if (type === 1) {
        o = opts("e", () => "1", () => "∞", () => "0");
        q = "lim_{x→∞} (1 + 1/x)^x = ？";
        exp = "重要极限二：lim_{x→∞} (1+1/x)^x = e ≈ 2.71828。";
      } else if (type === 2) {
        o = opts("e", () => "1", () => "2", () => "∞");
        q = "lim_{n→∞} (1 + 1/n)^n = ？（n 为正整数）";
        exp = "离散情形极限也是 e。";
      } else {
        o = opts("e", () => "1", () => "0", () => "∞");
        q = "lim_{x→0} (1 + x)^{1/x} = ？";
        exp = "令 t=1/x，则 lim_{t→∞}(1+1/t)^t = e。";
      }
      results.push(Q(q, o, "基础", exp, "重要极限"));
    }
    return results;
  }

  /* ---------- 拓展：棣莫弗定理（de_moivre） ---------- */
  function qDeMoivre(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        const m = rnd(2, 5);
        o = opts(`cos(${m}θ)+i·sin(${m}θ)`, () => `cos θ + i·sin(${m}θ)`, () => `${m}(cos θ + i·sin θ)`, () => `cos(${m}θ)·sin(${m}θ)`);
        q = `(cos θ + i·sin θ)^${m} = ？`;
        exp = `棣莫弗定理：(cosθ+i sinθ)^m = cos(mθ)+i sin(mθ)。`;
      } else if (type === 1) {
        const r = rnd(2, 5), m = rnd(2, 4);
        const root = Math.pow(r, 1 / m).toFixed(2);
        o = opts(`${root}(cos((θ+2kπ)/${m}) + i·sin((θ+2kπ)/${m}))`, () => `${r}(cos(θ/${m}) + i·sin(θ/${m}))`, () => `${root}(cos θ + i·sin θ)`, () => `${Math.pow(r, 1 / m).toFixed(2)}(cos((θ+2kπ)/${m+1}) + i·sin((θ+2kπ)/${m+1}))`);
        q = `复数 z = ${r}(cos θ + i·sin θ) 的 ${m} 次方根（k=0,…,${m-1}）是？`;
        exp = `n 次方根模为 r^{1/${m}}=${root}，辐角 (θ+2kπ)/${m}。`;
      } else if (type === 2) {
        o = opts("n 个", () => "1 个", () => "2 个", () => "无穷多个");
        q = "方程 zⁿ = 1（n 为正整数）在复数范围内的根有？";
        exp = "单位圆上的 n 次单位根共 n 个：e^{2πik/n}（k=0,…,n-1）。";
      } else {
        const p = rnd(0, 1) ? 2 : 4;
        o = opts(p === 2 ? "2i" : "-4", () => p === 2 ? "-2i" : "4", () => "0", () => p === 2 ? "2" : "8");
        q = `(1+i)^${p} = ？`;
        exp = p === 2 ? "(1+i)² = 1+2i+i² = 2i。" : "(1+i)^4 = ((1+i)²)² = (2i)² = -4。";
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
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        o = opts("a₀/2 + Σ(aₙ cos nx + bₙ sin nx)", () => "Σ aₙ xⁿ", () => "Σ aₙ eⁿ", () => "a₀ + Σ aₙ cos nx");
        q = "周期为 2π 的函数可展开为？";
        exp = "傅里叶级数：f(x) ~ a₀/2 + Σ(aₙ cos nx + bₙ sin nx)。";
      } else if (type === 1) {
        o = opts("只有正弦项（bₙ）", () => "只有余弦项（aₙ）", () => "只有常数项", () => "既有正弦又有余弦");
        q = "奇函数 f(−x)=−f(x) 的傅里叶展开？";
        exp = "奇函数：aₙ=0，只含正弦项（正弦级数）。";
      } else if (type === 2) {
        o = opts("只有余弦项（aₙ）", () => "只有正弦项（bₙ）", () => "只有常数项", () => "既有正弦又有余弦");
        q = "偶函数 f(−x)=f(x) 的傅里叶展开？";
        exp = "偶函数：bₙ=0，只含余弦项（余弦级数）。";
      } else {
        const T = [2, 4, 6, 8][rnd(0, 3)], w = (2 * Math.PI / T).toFixed(2);
        o = opts(`ω=${w}`, () => `${(Math.PI / T).toFixed(2)}`, () => `${(4 * Math.PI / T).toFixed(2)}`, () => `${(T / (2 * Math.PI)).toFixed(2)}`);
        q = `周期为 T=${T} 的函数，基频 ω = ？`;
        exp = `基频 ω = 2π/T = 2π/${T} = ${w}。`;
      }
      results.push(Q(q, o, "基础", exp, "傅里叶级数"));
    }
    return results;
  }

  /* ---------- 拓展：定积分应用（integral_app） ---------- */
  function qIntApp(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(0, 2), b = rnd(3, 5), area = (b * b - a * a) / 2;
        o = opts(`${area}`, () => `${b * b - a * a}`, () => `${b - a}`, () => `${(b * b * a * a) / 2}`);
        q = `曲线 y=x 与 x 轴在 [${a}, ${b}] 围成的面积 = ∫_{${a}}^{${b}} x dx = ？`;
        exp = `∫ x dx = x²/2，面积 = (${b}²−${a}²)/2 = ${area}。`;
      } else if (type === 1) {
        const a = rnd(0, 2), b = rnd(2, 4), V = (Math.PI * (b * b * b - a * a * a) / 3).toFixed(2);
        o = opts(`${V}`, () => `${(Math.PI * (b - a) / 3).toFixed(2)}`, () => `${(Math.PI * (b * b - a * a) / 3).toFixed(2)}`, () => `${(Math.PI * (b * b * b - a * a * a) / 2).toFixed(2)}`);
        q = `y=x 绕 x 轴在 [${a}, ${b}] 旋转所得体积 V = π∫_{${a}}^{${b}} x² dx = ？`;
        exp = `π∫ x² dx = π·x³/3，V = π(${b}³−${a}³)/3 = ${V}。`;
      } else if (type === 2) {
        const a = rnd(0, 2), b = rnd(3, 6), avg = (b * b - a * a) / (2 * (b - a));
        o = opts(`${avg.toFixed(2)}`, () => `${(b + a).toFixed(2)}`, () => `${(b * b - a * a).toFixed(2)}`, () => `${(b - a).toFixed(2)}`);
        q = `函数 y=x 在 [${a}, ${b}] 上的平均值 = ？`;
        exp = `平均值 = (1/(b−a))∫ x dx = (a+b)/2 = ${avg.toFixed(2)}。`;
      } else {
        const b = rnd(2, 4), L = (Math.SQRT2 * b).toFixed(2);
        o = opts(`${L}`, () => `${b.toFixed(2)}`, () => `${(2 * b).toFixed(2)}`, () => `${(Math.SQRT2 * (b + 1)).toFixed(2)}`);
        q = `曲线 y=x（0≤x≤${b}）的弧长 = ？`;
        exp = `弧长 = ∫_0^${b} √(1+(y')²) dx = ∫_0^${b} √2 dx = √2·${b} = ${L}。`;
      }
      results.push(Q(q, o, "进阶", exp, "定积分应用"));
    }
    return results;
  }

  /* ---------- 拓展：函数图像变换（graph_transform） ---------- */
  function qGraphTrans(n) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const type = i % 4;
      let q, o, exp;
      if (type === 0) {
        const a = rnd(1, 4);
        o = opts(`向右平移 ${a}`, () => `向左平移 ${a}`, () => `向上平移 ${a}`, () => `关于 y 轴对称`);
        q = `将 y=f(x) 变为 y=f(x−${a}) 的变换是？`;
        exp = `y=f(x−a) 是 y=f(x) 向右平移 ${a} 个单位（左加右减）。`;
      } else if (type === 1) {
        o = opts("关于 y 轴对称", () => "关于 x 轴对称", () => "关于原点对称", () => "向右平移 1");
        q = "y=f(x) → y=f(−x) 的变换是？";
        exp = "x 取相反数，图像关于 y 轴对称。";
      } else if (type === 2) {
        const A = rnd(2, 4);
        o = opts(`纵向拉伸为 ${A} 倍`, () => `纵向压缩为 ${A} 倍`, () => `横向拉伸为 ${A} 倍`, () => `横向压缩为 ${A} 倍`);
        q = `y=f(x) → y=${A}f(x) 的变换是？`;
        exp = `系数乘在函数值上：纵坐标变为原来的 ${A} 倍（纵向伸缩）。`;
      } else {
        o = opts("将 x 轴下方的部分翻折到上方", () => "将 y 轴左侧翻折到右侧", () => "整体向上平移", () => "关于 y 轴对称");
        q = "y=f(x) → y=|f(x)| 的变换是？";
        exp = "y=|f(x)|：保留 x 轴上方，将下方部分沿 x 轴翻折到上方。";
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
    const trips = [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20],[7,24,25]];
    const pz = [[3,4,5],[6,8,10],[5,12,13],[9,12,15]];
    for (let i = 0; i < n; i++) {
      const type = i % 8;
      let q, o, exp;
      if (type === 0) {
        const [a,b,rho] = pick(trips);
        o = opts(`${rho}`, () => `${a+b}`, () => `${Math.abs(a-b)}`, () => `${a*a+b*b}`);
        q = `直角坐标点 (${a}, ${b}) 的极径 ρ = ？`;
        exp = `ρ = √(a²+b²) = √(${a*a}+${b*b}) = ${rho}。`;
      } else if (type === 1) {
        const rho = rnd(2,4) * 2;
        o = opts(`(${rho/2}, ${rho}√3/2)`, () => `(${rho}√3/2, ${rho/2})`, () => `(-${rho/2}, ${rho}√3/2)`, () => `(${rho}, ${rho})`);
        q = `极坐标 (ρ=${rho}, θ=π/3) 的直角坐标是？`;
        exp = `x=ρcos(π/3)=${rho}/2, y=ρsin(π/3)=${rho}√3/2。`;
      } else if (type === 2) {
        const a = rnd(2,4);
        o = opts(`(${a}, 0)`, () => `(0, ${a})`, () => `(-${a}, 0)`, () => `(0, 0)`);
        q = `极坐标方程 ρ = 2·${a}·cosθ 表示的圆，其圆心是？`;
        exp = `ρ=2a cosθ → x²+y²=2ax → (x−${a})²+y²=${a}²，圆心(${a},0)。`;
      } else if (type === 3) {
        const [r1,r2,d] = pick(pz);
        o = opts(`${d}`, () => `${r1+r2}`, () => `${Math.abs(r1-r2)}`, () => `${r1*r2}`);
        q = `极坐标 P1(${r1}, 0)、P2(${r2}, π/2)，两点距离 = ？`;
        exp = `d² = ρ1²+ρ2²−2ρ1ρ2cos(π/2) = ${r1*r1}+${r2*r2} = ${r1*r1+r2*r2}，d=${d}。`;
      } else if (type === 4) {
        const R = rnd(2,5);
        o = opts(`ρ = ${R}`, () => `ρ = ${R*R}`, () => `θ = ${R}`, () => `ρ = 2${R}`);
        q = `直角坐标方程 x² + y² = ${R*R} 化为极坐标是？`;
        exp = `x²+y²=ρ²，故 ρ²=${R*R} → ρ=${R}。`;
      } else if (type === 5) {
        const cases = [["1","√3","π/3"],["√3","1","π/6"],["1","1","π/4"]];
        const [x,y,ang] = pick(cases);
        const pool = ["π/3","π/6","π/4","π/2"].filter(a => a !== ang);
        o = opts(ang, () => pool[0], () => pool[1], () => pool[2]);
        q = `直角坐标点 (${x}, ${y}) 的极角 θ（主值）是？`;
        exp = `tanθ = ${y}/${x}，在第一或第三象限，主值 θ=${ang}。`;
      } else if (type === 6) {
        const b = rnd(2,4);
        o = opts(`y = ${b}`, () => `x = ${b}`, () => `y = ${b*b}`, () => `x²+y² = ${b}`);
        q = `极坐标方程 ρ·sinθ = ${b} 化为直角坐标方程是？`;
        exp = `ρsinθ = y，故 y = ${b}（一条水平直线）。`;
      } else {
        o = opts(`π`, () => `2π`, () => `π/2`, () => `4π`);
        q = `极坐标曲线 ρ = 2 在 θ∈[0, π/2] 扫过的面积 = (1/2)∫ρ²dθ = ？`;
        exp = `面积 = (1/2)∫₀^{π/2} 4 dθ = 2·(π/2) = π。`;
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
      const type = i % 8;
      let q, o, exp;
      if (type === 0) {
        o = opts("√2", () => "1", () => "2", () => "1/√2");
        q = `参数方程 x=cosθ, y=sinθ，则 x+y 的最大值为？`;
        exp = `x+y = cosθ+sinθ，振幅 √(1²+1²)=√2，最大 √2。`;
      } else if (type === 1) {
        o = opts("5", () => "7", () => "12", () => "25");
        q = `参数方程 x=3cosθ, y=4sinθ，则 x+y 的最大值为？`;
        exp = `x+y=3cosθ+4sinθ，振幅 √(3²+4²)=5，最大 5。`;
      } else if (type === 2) {
        o = opts("−1", () => "3", () => "0", () => "−4");
        q = `参数方程 x=t, y=t²−4t+3，则 y 的最小值为？`;
        exp = `y=(t−2)²−1，当 t=2 时取最小 −1。`;
      } else if (type === 3) {
        o = opts("3", () => "1", () => "2√2", () => "5");
        q = `参数方程 x=1+2cosθ, y=2sinθ，点 (x,y) 到原点距离的最大值是？`;
        exp = `d²=(1+2cosθ)²+4sin²θ = 5+4cosθ，cosθ=1 时 d²=9，d=3。`;
      } else if (type === 4) {
        o = opts("1/4", () => "1/2", () => "1", () => "0");
        q = `参数方程 x=cos²θ, y=sin²θ，则 xy 的最大值为？`;
        exp = `xy = cos²θsin²θ = (1/4)sin²2θ ≤ 1/4，最大 1/4。`;
      } else if (type === 5) {
        o = opts("10", () => "5", () => "6", () => "14");
        q = `参数方程 x=2cosθ, y=2sinθ，则 3x+4y 的最大值为？`;
        exp = `3x+4y = 6cosθ+8sinθ，振幅 √(6²+8²)=10，最大 10。`;
      } else if (type === 6) {
        o = opts("2", () => "0", () => "1", () => "t");
        q = `参数 t>0，x = t + 1/t 的最小值为（均值不等式）？`;
        exp = `t>0 时 t+1/t ≥ 2√(t·1/t)=2，t=1 取等。`;
      } else {
        o = opts("20", () => "10", () => "15", () => "25");
        q = `参数方程 y = 20t − 5t²（抛体高度），y 的最大值为？`;
        exp = `二次函数顶点 t=2，y=40−20=20。`;
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
      const type = i % 8;
      let q, o, exp;
      if (type === 0) {
        o = opts("90°", () => "0°", () => "45°", () => "180°");
        q = `方向向量 u=(1,0,0)、v=(0,1,0) 的两直线夹角 = ？`;
        exp = `u·v=0 → 夹角 90°。`;
      } else if (type === 1) {
        o = opts("2/3", () => "1/3", () => "3/2", () => "1");
        q = `直线方向向量 s=(1,2,2)，平面法向量 n=(0,0,1)，则线面角 φ 满足 sinφ = ？`;
        exp = `sinφ = |s·n|/(|s||n|) = 2/(3·1) = 2/3。`;
      } else if (type === 2) {
        o = opts("0", () => "1", () => "1/√2", () => "√2/2");
        q = `两平面法向量 n1=(1,0,0)、n2=(0,1,0)，二面角的余弦绝对值 = ？`;
        exp = `n1·n2=0，cos=0，二面角为 90°。`;
      } else if (type === 3) {
        o = opts("√3", () => "3", () => "1", () => "2");
        q = `平面 x+y+z=0 到点 P(1,1,1) 的距离是？`;
        exp = `d = |1+1+1|/√(1+1+1) = 3/√3 = √3。`;
      } else if (type === 4) {
        o = opts("45°", () => "90°", () => "30°", () => "60°");
        q = `向量 a=(1,0,0)、b=(1,1,0) 的夹角 = ？`;
        exp = `cosθ = 1/√(1·2) = 1/√2 → θ=45°。`;
      } else if (type === 5) {
        o = opts("垂直", () => "平行", () => "夹角 60°", () => "重合");
        q = `方向向量 u=(1,1,0)、v=(−1,1,0) 的两直线位置 = ？`;
        exp = `u·v = −1+1+0 = 0 → 两直线垂直。`;
      } else if (type === 6) {
        o = opts("7", () => "11", () => "√11", () => "49");
        q = `向量 AB = (2,3,6)，则 |AB| = ？`;
        exp = `|AB| = √(4+9+36) = √49 = 7。`;
      } else {
        o = opts("x+2y+3z=0", () => "x+2y+3z=1", () => "x−2y+3z=0", () => "x²+2y²+3z²=0");
        q = `过原点、法向量 n=(1,2,3) 的平面方程是？`;
        exp = `平面: n·(x,y,z) = 0 → x+2y+3z=0。`;
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
      const type = i % 8;
      let q, o, exp;
      if (type === 0) {
        o = opts("(−3, 3)", () => "(−∞,3)", () => "[−3,3]", () => "x<3");
        q = `不等式 |x| < 3 的解集是？`;
        exp = `|x|<3 ⇔ −3 < x < 3，即 (−3,3)。`;
      } else if (type === 1) {
        o = opts("[1, 3]", () => "[2,3]", () => "(−1,1)", () => "x≤3");
        q = `|x−2| ≤ 1 的解集是？`;
        exp = `−1 ≤ x−2 ≤ 1 ⇔ 1 ≤ x ≤ 3，即 [1,3]。`;
      } else if (type === 2) {
        o = opts("(−∞,−3] ∪ [1,+∞)", () => "[−3,1]", () => "x≥1", () => "x≤−3");
        q = `|x+1| ≥ 2 的解集是？`;
        exp = `x+1≥2 或 x+1≤−2 ⇔ x≥1 或 x≤−3。`;
      } else if (type === 3) {
        o = opts("(1, 5)", () => "(3,5)", () => "(1,3)", () => "(−1,5)");
        q = `|x−3| < 2 表示 x 到 3 的距离小于 2，解集 = ？`;
        exp = `3−2 < x < 3+2 ⇔ 1 < x < 5。`;
      } else if (type === 4) {
        o = opts("|a|+|b|", () => "||a|−|b||", () => "|a|−|b|", () => "|a|·|b|");
        q = `对任意实数 a,b，恒有 |a+b| ≤ ？`;
        exp = `绝对值三角不等式：|a+b| ≤ |a|+|b|。`;
      } else if (type === 5) {
        o = opts("ab ≥ 0", () => "ab ≤ 0", () => "a=b", () => "a≥0");
        q = `|a+b| = |a|+|b| 成立的充要条件是？`;
        exp = `等号当且仅当 a,b 同号（或其一为 0），即 ab ≥ 0。`;
      } else if (type === 6) {
        o = opts("2", () => "0", () => "1", () => "4");
        q = `函数 f(x)=|x−1|+|x−3| 的最小值是？`;
        exp = `|x−1|+|x−3| ≥ |(x−1)−(x−3)| = 2，1≤x≤3 时取等。`;
      } else {
        o = opts("x=5 或 x=−1", () => "x=5", () => "x=−1", () => "x=1 或 x=5");
        q = `方程 |2x−4| = 6 的解是？`;
        exp = `2x−4=±6 → x=5 或 x=−1。`;
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
      const type = i % 8;
      let q, o, exp;
      if (type === 0) {
        o = opts("√2", () => "1", () => "2", () => "1/2");
        q = `已知 x²+y²=1，则 x+y 的最大值为（柯西不等式）？`;
        exp = `(1²+1²)(x²+y²) ≥ (x+y)² → 2 ≥ (x+y)² → 最大 √2。`;
      } else if (type === 1) {
        o = opts("10", () => "5", () => "20", () => "√20");
        q = `已知 a²+b²=4，则 3a+4b 的最大值为？`;
        exp = `(a²+b²)(3²+4²) ≥ (3a+4b)² → 4·25 ≥ (...)² → 最大 10。`;
      } else if (type === 2) {
        o = opts("4", () => "2", () => "1", () => "8");
        q = `x,y>0 且 x+y=1，则 1/x+1/y 的最小值为？`;
        exp = `(x+y)(1/x+1/y) ≥ (1+1)² = 4 → ≥ 4。`;
      } else if (type === 3) {
        o = opts("√3", () => "1", () => "3", () => "√2");
        q = `已知 x²+y²+z²=1，则 x+y+z 的最大值为？`;
        exp = `(1+1+1)(x²+y²+z²) ≥ (x+y+z)² → 3 ≥ (x+y+z)² → 最大 √3。`;
      } else if (type === 4) {
        o = opts("1", () => "0", () => "2", () => "√2");
        q = `若 Σaᵢ² = Σbᵢ² = 1，则 Σaᵢbᵢ 的最大值为？`;
        exp = `柯西：(Σaᵢbᵢ)² ≤ 1·1 = 1 → 最大 1（两向量同向）。`;
      } else if (type === 5) {
        o = opts("两向量模平方之积", () => "两向量点积", () => "两向量和", () => "两向量差");
        q = `二维柯西 (a²+b²)(c²+d²) ≥ (ac+bd)² 中，(a²+b²)(c²+d²) 是？`;
        exp = `即向量 (a,b) 与 (c,d) 模平方之积。`;
      } else if (type === 6) {
        o = opts("9", () => "3", () => "6", () => "1");
        q = `正数 a,b,c 且 a+b+c=1，则 1/a+1/b+1/c 的最小值为？`;
        exp = `(a+b+c)(1/a+1/b+1/c) ≥ (1+1+1)² = 9 → ≥ 9。`;
      } else {
        o = opts("13", () => "√13", () => "26", () => "5");
        q = `已知 x²+y²=13，则 2x+3y 的最大值为？`;
        exp = `(x²+y²)(2²+3²) ≥ (2x+3y)² → 13·13 ≥ (...)² → 最大 13。`;
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
    for (let i = 0; i < n; i++) {
      const type = i % 8;
      let q, o, exp;
      if (type === 0) {
        o = opts("同序和（最大）", () => "反序和（最小）", () => "乱序和", () => "平均值");
        q = `两组同序正数 a₁≤…≤aₙ、b₁≤…≤bₙ，乘积和 a₁b₁+…+aₙbₙ 是？`;
        exp = `排序不等式：对应同序相乘得同序和，为三者中最大。`;
      } else if (type === 1) {
        o = opts("14", () => "10", () => "6", () => "12");
        q = `a=(1,2,3)、b=(1,2,3) 同序相乘之和 = ？`;
        exp = `1·1+2·2+3·3 = 1+4+9 = 14。`;
      } else if (type === 2) {
        o = opts("10", () => "14", () => "12", () => "6");
        q = `a=(1,2,3) 与 b=(3,2,1) 反序相乘之和 = ？`;
        exp = `1·3+2·2+3·1 = 3+4+3 = 10。`;
      } else if (type === 3) {
        o = opts("同序（都从小到大）", () => "逆序", () => "随意配对", () => "交叉配对");
        q = `排序不等式：要使两数组对应乘积之和最大，应让两数组如何配对？`;
        exp = `同序配对（都按从小到大）得最大和。`;
      } else if (type === 4) {
        o = opts("≤（前者为乱序/反序）", () => "≥", () => "=", () => "无关");
        q = `若 a₁≥a₂≥a₃>0 且 b₁≥b₂≥b₃>0，则 a₁b₃+a₂b₂+a₃b₁ 与 a₁b₁+a₂b₂+a₃b₃ 的大小？`;
        exp = `前者是乱序/反序和，后者是同序和，故前者 ≤ 后者。`;
      } else if (type === 5) {
        o = opts("同序和 ≥ 乱序和 ≥ 反序和", () => "同序 ≤ 乱序", () => "乱序 ≥ 同序", () => "反序 ≥ 同序");
        q = `排序不等式的三类和大小关系是？`;
        exp = `同序和 ≥ 乱序和 ≥ 反序和。`;
      } else if (type === 6) {
        o = opts("T ≤ S", () => "T ≥ S", () => "T = S", () => "不确定");
        q = `正数同序 x₁≤x₂≤x₃ 与 y₁≤y₂≤y₃，T=x₁y₃+x₂y₂+x₃y₁ 与 S=x₁y₁+x₂y₂+x₃y₃ 的关系？`;
        exp = `T 是反序/乱序和，S 是同序和，故 T ≤ S。`;
      } else {
        o = opts("20", () => "28", () => "24", () => "30");
        q = `a=(2,4,6)、b=(1,2,3) 反序配对（最大配最小）的乘积和 = ？`;
        exp = `反序：6·1+4·2+2·3 = 6+8+6 = 20。`;
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
      const type = i % 8;
      let q, o, exp;
      if (type === 0) {
        o = opts("一步转移矩阵的平方 P²", () => "2P", () => "P 的转置", () => "P 的迹");
        q = `马尔可夫链的“两步转移概率矩阵”等于？`;
        exp = `两步转移概率 = P·P = P²。`;
      } else if (type === 1) {
        o = opts("πP = π", () => "π = Pπ 转置", () => "πP = 1", () => "π + P = π");
        q = `马尔可夫链的平稳分布 π 满足？`;
        exp = `平稳分布满足 πP = π（左特征向量，特征值 1）。`;
      } else if (type === 2) {
        o = opts("0.7", () => "0.3", () => "0.49", () => "1");
        q = `若今天晴，且晴后晴概率 0.7，则明天晴的概率 = ？`;
        exp = `一步转移，明天晴 = P(晴→晴) = 0.7。`;
      } else if (type === 3) {
        o = opts("0.61", () => "0.49", () => "0.7", () => "0.58");
        q = `转移矩阵 P=[[0.7,0.3],[0.4,0.6]]（行：晴,雨），从晴出发两步后仍晴的概率 = ？`;
        exp = `P²₁₁ = 0.7·0.7+0.3·0.4 = 0.49+0.12 = 0.61。`;
      } else if (type === 4) {
        o = opts("当前状态（与更早历史无关）", () => "初始状态", () => "全部历史", () => "下一状态");
        q = `马尔可夫性质是指：下一状态只依赖于？`;
        exp = `无记忆性：下一状态仅取决于当前状态。`;
      } else if (type === 5) {
        o = opts("吸收态", () => "平稳态", () => "暂态", () => "周期态");
        q = `若某状态 i 满足 P(i→i)=1（不再离开），称为？`;
        exp = `进入后不再离开的状态称为吸收态。`;
      } else if (type === 6) {
        o = opts("唯一存在", () => "不存在", () => "有无穷多个", () => "等于初始分布");
        q = `有限状态的不可约、非周期（遍历）马尔可夫链，其平稳分布？`;
        exp = `遍历链有唯一平稳分布。`;
      } else {
        o = opts("平稳分布（与初始无关）", () => "初始分布", () => "均匀分布", () => "零向量");
        q = `对遍历的马尔可夫链，当步数 n→∞，状态分布趋于？`;
        exp = `极限分布 = 平稳分布，与初始分布无关。`;
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
      const type = i % 8;
      let q, o, exp;
      if (type === 0) {
        o = opts("总体期望 E[X]", () => "样本方差", () => "0", () => "总体中位数");
        q = `弱大数定律：n→∞ 时样本均值 X̄ₙ 依概率收敛于？`;
        exp = `弱大数定律：X̄ₙ → E[X]（依概率）。`;
      } else if (type === 1) {
        o = opts("正面概率 p", () => "1/2 固定", () => "0", () => "样本量");
        q = `抛硬币 n 次，正面频率 m/n 当 n→∞ 时依概率收敛于？`;
        exp = `伯努利大数定律：频率依概率收敛于概率 p。`;
      } else if (type === 2) {
        o = opts("独立同分布且期望存在（有限）", () => "正态分布", () => "方差有限即可", () => "相互独立即可");
        q = `辛钦大数定律要求随机变量序列？`;
        exp = `辛钦：独立同分布且期望存在（有限）。`;
      } else if (type === 3) {
        o = opts("切比雪夫不等式", () => "柯西不等式", () => "排序不等式", () => "詹森不等式");
        q = `大数定律常用哪类不等式证明样本均值收敛？`;
        exp = `切比雪夫不等式：P(|X̄−μ|≥ε) ≤ Var(X̄)/ε² → 0。`;
      } else if (type === 4) {
        o = opts("3.5", () => "3", () => "4", () => "6");
        q = `均匀骰子掷很多次，点数平均值趋于？`;
        exp = `期望 = (1+2+3+4+5+6)/6 = 3.5。`;
      } else if (type === 5) {
        o = opts("收敛性（稳定性）", () => "精确分布", () => "方差大小", () => "相关性");
        q = `大数定律研究的是样本均值的什么性质？`;
        exp = `大数定律研究均值随 n 增大而稳定（收敛）于期望。`;
      } else if (type === 6) {
        o = opts("依概率收敛", () => "几乎必然收敛", () => "必然收敛", () => "均方收敛");
        q = `弱大数定律的收敛是？`;
        exp = `弱大数定律是依概率收敛；强大数定律才是几乎必然收敛。`;
      } else {
        o = opts("大量独立风险下频率趋稳于概率", () => "单次赔付确定", () => "损失为零", () => "利率恒定");
        q = `保险业能稳定定价，主要依靠大数定律的哪一点？`;
        exp = `大数定律保证大量独立重复下频率稳定于概率，便于精算。`;
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
      const type = i % 8;
      let q, o, exp;
      if (type === 0) {
        o = opts("重复抽样时约 95% 的区间覆盖参数真值", () => "参数有 95% 概率落在区间", () => "区间一定有真值", () => "真值固定在区间内");
        q = `95% 置信区间的含义是？`;
        exp = `频率派解释：重复抽样下约 95% 的区间含真值。`;
      } else if (type === 1) {
        o = opts("(90.2, 109.8)", () => "(95, 105)", () => "(90, 110)", () => "(100±5)");
        q = `x̄=100, 标准误 SE=5, 95% 置信区间（z=1.96）≈？`;
        exp = `100 ± 1.96·5 = 100 ± 9.8 → (90.2, 109.8)。`;
      } else if (type === 2) {
        o = opts("变宽", () => "变窄", () => "不变", () => "消失");
        q = `置信水平从 95% 提高到 99%，置信区间会？`;
        exp = `更高置信需更大临界值，区间变宽。`;
      } else if (type === 3) {
        o = opts("变窄", () => "变宽", () => "不变", () => "先窄后宽");
        q = `在其他不变时，增大样本量 n，置信区间会？`;
        exp = `SE = σ/√n 随 n 增大而减小，区间变窄。`;
      } else if (type === 4) {
        o = opts("1.96", () => "1.645", () => "2.576", () => "1.0");
        q = `正态总体、大样本下 95% 置信区间的 z 临界值约为？`;
        exp = `双尾 95% 对应 z = 1.96。`;
      } else if (type === 5) {
        o = opts("样本均值 x̄", () => "总体均值", () => "中位数", () => "0");
        q = `置信区间通常以什么为中心？`;
        exp = `区间中心是样本均值 x̄（点估计）。`;
      } else if (type === 6) {
        o = opts("2", () => "0.4", () => "10", () => "50");
        q = `总体标准差 σ=10, n=25，标准误 SE = ？`;
        exp = `SE = σ/√n = 10/5 = 2。`;
      } else {
        o = opts("参数有 95% 的概率落在已算出的这个区间内", () => "它是随机区间，随样本而变", () => "其覆盖率在长期重复抽样下约为 95%", () => "用于估计总体未知参数");
        q = `下列关于 95% 置信区间的说法，错误的是？`;
        exp = `频率派下参数是固定常数，不能说“有 95% 概率落在此区间”。`;
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
      const type = i % 8;
      let q, o, exp;
      if (type === 0) {
        o = opts("原假设 H0", () => "备择假设 H1", () => "样本均值", () => "显著性水平");
        q = `假设检验中，我们通常用证据反对的是？`;
        exp = `检验以“拒绝 H0”为目标，H0 是原假设。`;
      } else if (type === 1) {
        o = opts("第一类错误（弃真）概率不超过 5%", () => "第二类错误概率", () => "置信度", () => "p 值");
        q = `显著性水平 α=0.05 表示？`;
        exp = `α 是犯第一类错误（H0 真却拒绝）的上限，≤5%。`;
      } else if (type === 2) {
        o = opts("拒绝 H0", () => "不拒绝 H0", () => "接受 H0 为真", () => "无法判断");
        q = `若 p 值 = 0.02，α = 0.05，则应？`;
        exp = `p < α → 拒绝 H0。`;
      } else if (type === 3) {
        o = opts("H0 为真时却拒绝了 H0", () => "H0 假时未拒绝", () => "样本错误", () => "计算错误");
        q = `第一类错误（α 错误）是指？`;
        exp = `第一类错误 = 弃真：H0 真却拒绝。`;
      } else if (type === 4) {
        o = opts("H0 为假时却未拒绝 H0", () => "H0 真时拒绝", () => "p 值过大", () => "置信区间过宽");
        q = `第二类错误（β 错误）是指？`;
        exp = `第二类错误 = 取伪：H0 假却未拒绝。`;
      } else if (type === 5) {
        o = opts("拒绝 H0", () => "接受 H0", () => "增大 α", () => "停止检验");
        q = `当检验统计量落入拒绝域时，应当？`;
        exp = `落入拒绝域 → 拒绝 H0。`;
      } else if (type === 6) {
        o = opts("±1.96", () => "±1.645", () => "±2.576", () => "±1.0");
        q = `大样本、α=0.05 的双侧 z 检验临界值约为？`;
        exp = `双尾 95% 对应 ±1.96。`;
      } else {
        o = opts("1.645", () => "1.96", () => "2.576", () => "1.28");
        q = `大样本、α=0.05 的单侧（上侧）z 检验临界值约为？`;
        exp = `单尾 95% 对应 z = 1.645。`;
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
      const type = i % 8;
      let q, o, exp;
      if (type === 0) {
        o = opts("1", () => "∞", () => "0", () => "1/2");
        q = `反常积分 ∫₁^∞ 1/x² dx = ？`;
        exp = `[−1/x]₁^∞ = 0 − (−1) = 1。`;
      } else if (type === 1) {
        o = opts("发散（∞）", () => "收敛到 1", () => "收敛到 ln2", () => "收敛到 0");
        q = `反常积分 ∫₁^∞ 1/x dx 的敛散性？`;
        exp = `[ln x]₁^∞ = ∞，发散。`;
      } else if (type === 2) {
        o = opts("2", () => "1", () => "∞", () => "1/2");
        q = `反常积分 ∫₀¹ 1/√x dx = ？`;
        exp = `[2√x]₀¹ = 2 − 0 = 2。`;
      } else if (type === 3) {
        o = opts("p > 1", () => "p ≥ 1", () => "p > 0", () => "p < 1");
        q = `积分 ∫₁^∞ 1/x^p dx 收敛的充要条件是？`;
        exp = `p>1 收敛于 1/(p−1)；p≤1 发散。`;
      } else if (type === 4) {
        o = opts("1", () => "0", () => "∞", () => "e");
        q = `反常积分 ∫₀^∞ e^(−x) dx = ？`;
        exp = `[−e^(−x)]₀^∞ = 0 − (−1) = 1。`;
      } else if (type === 5) {
        o = opts("π", () => "π/2", () => "2π", () => "1");
        q = `反常积分 ∫_{−∞}^∞ 1/(1+x²) dx = ？`;
        exp = `[arctan x]_{−∞}^∞ = π/2 − (−π/2) = π。`;
      } else if (type === 6) {
        o = opts("发散", () => "收敛到 1", () => "收敛到 0", () => "收敛到 ln2");
        q = `反常积分 ∫₀¹ 1/x dx 的敛散性？`;
        exp = `[ln x]₀¹ = ∞，在 0 处发散。`;
      } else {
        o = opts("1/ln2", () => "∞", () => "ln2", () => "1");
        q = `反常积分 ∫₂^∞ 1/[x(ln x)²] dx 收敛到？`;
        exp = `令 u=ln x：∫_{ln2}^∞ u^{−2} du = [−1/u] = 1/ln2。`;
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
      const type = i % 8;
      let q, o, exp;
      if (type === 0) {
        o = opts("2xy", () => "x²", () => "2x", () => "y");
        q = `f(x,y)=x²y，对 x 的偏导数 ∂f/∂x = ？`;
        exp = `视 y 为常数：∂f/∂x = 2xy。`;
      } else if (type === 1) {
        o = opts("x²", () => "2xy", () => "2x", () => "y");
        q = `f(x,y)=x²y，对 y 的偏导数 ∂f/∂y = ？`;
        exp = `视 x 为常数：∂f/∂y = x²。`;
      } else if (type === 2) {
        o = opts("8", () => "2", () => "5", () => "11");
        q = `f(x,y)=x²+3xy，∂f/∂x 在 (1,2) 的值 = ？`;
        exp = `∂f/∂x = 2x+3y，代入 (1,2)：2+6=8。`;
      } else if (type === 3) {
        o = opts("相等", () => "互为相反数", () => "无关", () => "相差一个常数");
        q = `若二阶混合偏导连续，则 ∂²f/∂x∂y 与 ∂²f/∂y∂x 的关系是？`;
        exp = `克莱罗定理：连续时混合偏导相等。`;
      } else if (type === 4) {
        o = opts("(∂f/∂x)dx + (∂f/∂y)dy", () => "∂f/∂x + ∂f/∂y", () => "(∂f/∂x)(∂f/∂y)", () => "dx+dy");
        q = `二元函数 f(x,y) 的全微分 df = ？`;
        exp = `df = f_x dx + f_y dy。`;
      } else if (type === 5) {
        o = opts("y e^(xy)", () => "x e^(xy)", () => "e^(xy)", () => "xy e^(xy)");
        q = `f(x,y)=e^(xy)，∂f/∂x = ？`;
        exp = `对 x 求导：e^(xy)·y = y e^(xy)。`;
      } else if (type === 6) {
        o = opts("曲面沿 x 方向切线的斜率", () => "曲面法向量", () => "体积变化率", () => "面积");
        q = `偏导数 ∂f/∂x 的几何意义是？`;
        exp = `固定 y=y0，曲面截线对 x 的切线斜率。`;
      } else {
        o = opts("(2,1)", () => "(1,2)", () => "(0,0)", () => "(1,1)");
        q = `f(x,y)=x²+2y²−2xy−2x 的唯一驻点是？`;
        exp = `f_x=2x−2y−2=0, f_y=4y−2x=0 → x=2y, 代入得 y=1,x=2，驻点(2,1)。`;
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
      const type = i % 8;
      let q, o, exp;
      if (type === 0) {
        o = opts("(2x, 2y)", () => "(x,y)", () => "(2,2)", () => "(2x+2y)");
        q = `f(x,y)=x²+y² 的梯度 ∇f = ？`;
        exp = `∇f = (∂f/∂x, ∂f/∂y) = (2x, 2y)。`;
      } else if (type === 1) {
        o = opts("函数值增加最快的方向", () => "减小最快的方向", () => "等高线切线方向", () => "任意方向");
        q = `梯度 ∇f 的方向是？`;
        exp = `梯度方向是函数值增长最快的方向。`;
      } else if (type === 2) {
        o = opts("最大方向导数", () => "函数值", () => "零", () => "偏导数之和");
        q = `梯度的模 |∇f| 等于？`;
        exp = `|∇f| 等于该点方向导数的最大值。`;
      } else if (type === 3) {
        o = opts("垂直（法向）", () => "平行", () => "相切", () => "无关");
        q = `在一点处，梯度 ∇f 与过该点的等高线（等值线）的关系是？`;
        exp = `梯度垂直于等高线，指向函数增大方向（法向）。`;
      } else if (type === 4) {
        o = opts("∇f · u", () => "|∇f|", () => "∇f × u", () => "∂f/∂x");
        q = `沿单位向量 u 的方向导数 D_u f = ？`;
        exp = `D_u f = ∇f · u = |∇f|cosφ。`;
      } else if (type === 5) {
        o = opts("(1,1)", () => "(1,0)", () => "(0,1)", () => "(1,−1)");
        q = `f(x,y)=xy 在 (1,1) 处的梯度 = ？`;
        exp = `∇f = (y, x)，在 (1,1) 为 (1,1)，模 √2。`;
      } else if (type === 6) {
        o = opts("−∇f（负梯度）", () => "∇f", () => "等高线方向", () => "任意");
        q = `要使函数值下降最快，应沿哪个方向？`;
        exp = `最速下降方向 = 负梯度 −∇f。`;
      } else {
        o = opts("(3,4)", () => "(4,3)", () => "(3,4) 模 7", () => "(7,0)");
        q = `f(x,y)=3x+4y 的梯度 ∇f = ？`;
        exp = `∇f = (∂f/∂x, ∂f/∂y) = (3,4)。`;
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
