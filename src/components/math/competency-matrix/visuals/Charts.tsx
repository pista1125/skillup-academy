import React from 'react';

// ============ Bar chart ============
export function BarChart({ bars = [], xLabel = '', yLabel = '', yMax, yMin = 0 }) {
  const safeBars = (Array.isArray(bars) ? bars : []).filter((b) => b && Number.isFinite(Number(b.value)));
  if (safeBars.length === 0) {
    return <div style={{ padding: 8, color: '#94a3b8', fontSize: 12 }}>[BarChart — nincs adat]</div>;
  }
  bars = safeBars.map((b) => ({ ...b, value: Number(b.value) }));
  const W = 480, H = 280, padL = 44, padB = 46, padT = 16, padR = 16;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const max = Number.isFinite(yMax) ? yMax : Math.max(...bars.map((b) => b.value), 1);
  const step = max <= 10 ? 1 : max <= 20 ? 2 : max <= 50 ? 5 : 10;
  const ticks = [];
  for (let v = yMin; v <= max; v += step) ticks.push(v);
  const bw = plotW / bars.length * 0.62;
  const gap = plotW / bars.length - bw;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 520 }} role="img" aria-label="Oszlopdiagram">
      {ticks.map((t) => {
        const y = padT + plotH - ((t - yMin) / (max - yMin)) * plotH;
        return (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#e2e8f0" />
            <text x={padL - 6} y={y + 4} fontSize="11" textAnchor="end" fill="#64748b">{t}</text>
          </g>
        );
      })}
      <line x1={padL} x2={padL} y1={padT} y2={padT + plotH} stroke="#94a3b8" />
      <line x1={padL} x2={W - padR} y1={padT + plotH} y2={padT + plotH} stroke="#94a3b8" />
      {bars.map((b, i) => {
        const h = ((b.value - yMin) / (max - yMin)) * plotH;
        const x = padL + gap / 2 + i * (bw + gap);
        const y = padT + plotH - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={h} fill={b.color || '#2563eb'} rx={3} />
            <text x={x + bw / 2} y={y - 5} fontSize="12" textAnchor="middle" fill="#0f172a" fontWeight="600">{b.value}</text>
            <text x={x + bw / 2} y={padT + plotH + 16} fontSize="11" textAnchor="middle" fill="#334155">{b.label}</text>
          </g>
        );
      })}
      {yLabel && <text x={12} y={padT + plotH / 2} fontSize="11" fill="#64748b" transform={`rotate(-90, 12, ${padT + plotH / 2})`} textAnchor="middle">{yLabel}</text>}
      {xLabel && <text x={padL + plotW / 2} y={H - 6} fontSize="11" fill="#64748b" textAnchor="middle">{xLabel}</text>}
    </svg>
  );
}

// ============ Line chart ============
export function LineChart({ series = [], xLabel = '', yLabel = '', yMin = 0, yMax }) {
  const safeSeries = (Array.isArray(series) ? series : []).filter((s) => s && Array.isArray(s.points) && s.points.length > 0);
  if (safeSeries.length === 0) {
    return <div style={{ padding: 8, color: '#94a3b8', fontSize: 12 }}>[LineChart — nincs adat]</div>;
  }
  series = safeSeries;
  const W = 520, H = 300, padL = 44, padB = 46, padT = 16, padR = 16;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const allY = series.flatMap((s) => s.points.map((p) => p.y)).filter(Number.isFinite);
  const yMaxV = Number.isFinite(yMax) ? yMax : (allY.length ? Math.max(...allY) : 10);
  const xLabels = series[0]?.points.map((p) => p.x) ?? [];

  const xToPx = (i) => padL + (plotW / (xLabels.length - 1)) * i;
  const yToPx = (v) => padT + plotH - ((v - yMin) / (yMaxV - yMin)) * plotH;

  const step = yMaxV <= 10 ? 1 : yMaxV <= 30 ? 5 : 10;
  const ticks = [];
  for (let v = yMin; v <= yMaxV; v += step) ticks.push(v);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 560 }} role="img" aria-label="Vonaldiagram">
      {ticks.map((t) => {
        const y = yToPx(t);
        return (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#e2e8f0" />
            <text x={padL - 6} y={y + 4} fontSize="11" textAnchor="end" fill="#64748b">{t}</text>
          </g>
        );
      })}
      <line x1={padL} x2={padL} y1={padT} y2={padT + plotH} stroke="#94a3b8" />
      <line x1={padL} x2={W - padR} y1={padT + plotH} y2={padT + plotH} stroke="#94a3b8" />
      {xLabels.map((lbl, i) => (
        <text key={i} x={xToPx(i)} y={padT + plotH + 16} fontSize="11" textAnchor="middle" fill="#334155">{lbl}</text>
      ))}
      {series.map((s, si) => {
        const d = s.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xToPx(i)} ${yToPx(p.y)}`).join(' ');
        return (
          <g key={si}>
            <path d={d} fill="none" stroke={s.color || '#2563eb'} strokeWidth="2.4" />
            {s.points.map((p, i) => (
              <circle key={i} cx={xToPx(i)} cy={yToPx(p.y)} r="3.5" fill={s.color || '#2563eb'} />
            ))}
          </g>
        );
      })}
      {series.length > 1 && (
        <g transform={`translate(${W - padR - 120}, ${padT + 4})`}>
          {series.map((s, i) => (
            <g key={i} transform={`translate(0, ${i * 16})`}>
              <rect width="12" height="3" y="5" fill={s.color || '#2563eb'} />
              <text x="18" y="10" fontSize="11" fill="#334155">{s.name}</text>
            </g>
          ))}
        </g>
      )}
      {yLabel && <text x={12} y={padT + plotH / 2} fontSize="11" fill="#64748b" transform={`rotate(-90, 12, ${padT + plotH / 2})`} textAnchor="middle">{yLabel}</text>}
      {xLabel && <text x={padL + plotW / 2} y={H - 6} fontSize="11" fill="#64748b" textAnchor="middle">{xLabel}</text>}
    </svg>
  );
}

// ============ Pie chart ============
export function PieChart({ slices = [] }) {
  const safe = (Array.isArray(slices) ? slices : []).filter((s) => s && Number.isFinite(Number(s.value)) && s.value > 0);
  if (safe.length === 0) {
    return <div style={{ padding: 8, color: '#94a3b8', fontSize: 12 }}>[PieChart — nincs adat]</div>;
  }
  slices = safe.map((s) => ({ ...s, value: Number(s.value) }));
  const cx = 110, cy = 110, r = 90;
  const total = slices.reduce((s, x) => s + x.value, 0);
  let ang = -Math.PI / 2;
  return (
    <svg viewBox="0 0 360 240" width="100%" style={{ maxWidth: 440 }} role="img" aria-label="Kördiagram">
      {slices.map((s, i) => {
        const theta = (s.value / total) * 2 * Math.PI;
        const x1 = cx + r * Math.cos(ang);
        const y1 = cy + r * Math.sin(ang);
        const x2 = cx + r * Math.cos(ang + theta);
        const y2 = cy + r * Math.sin(ang + theta);
        const large = theta > Math.PI ? 1 : 0;
        const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
        const midA = ang + theta / 2;
        const lx = cx + (r * 0.62) * Math.cos(midA);
        const ly = cy + (r * 0.62) * Math.sin(midA);
        ang += theta;
        return (
          <g key={i}>
            <path d={d} fill={s.color || '#2563eb'} stroke="white" strokeWidth="2" />
            <text x={lx} y={ly + 4} textAnchor="middle" fontSize="13" fontWeight="600" fill="white">
              {Math.round((s.value / total) * 100)}%
            </text>
          </g>
        );
      })}
      <g transform="translate(220, 20)">
        {slices.map((s, i) => (
          <g key={i} transform={`translate(0, ${i * 20})`}>
            <rect width="12" height="12" fill={s.color || '#2563eb'} rx="2" />
            <text x="18" y="10" fontSize="12" fill="#334155">{s.label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

// ============ Grouped bar chart ============
export function GroupedBar({ categories = [], series = [], yMax = 100, yLabel = '' }) {
  if (!Array.isArray(categories) || categories.length === 0 || !Array.isArray(series) || series.length === 0) {
    return <div style={{ padding: 8, color: '#94a3b8', fontSize: 12 }}>[GroupedBar — nincs adat]</div>;
  }
  if (!Number.isFinite(yMax) || yMax <= 0) yMax = 100;
  const W = 540, H = 300, padL = 44, padB = 50, padT = 16, padR = 120;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const groupW = plotW / categories.length;
  const barW = (groupW * 0.7) / series.length;

  const step = yMax <= 20 ? 5 : yMax <= 100 ? 20 : Math.round(yMax / 5);
  const ticks = [];
  for (let v = 0; v <= yMax; v += step) ticks.push(v);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 600 }} role="img" aria-label="Csoportosított oszlopdiagram">
      {ticks.map((t) => {
        const y = padT + plotH - (t / yMax) * plotH;
        return (
          <g key={t}>
            <line x1={padL} x2={padL + plotW} y1={y} y2={y} stroke="#e2e8f0" />
            <text x={padL - 6} y={y + 4} fontSize="11" textAnchor="end" fill="#64748b">{t}</text>
          </g>
        );
      })}
      {categories.map((cat, ci) => {
        const gx = padL + ci * groupW;
        return (
          <g key={ci}>
            {series.map((s, si) => {
              const v = s.values[ci];
              const h = (v / yMax) * plotH;
              const x = gx + (groupW - barW * series.length) / 2 + si * barW;
              const y = padT + plotH - h;
              return (
                <g key={si}>
                  <rect x={x} y={y} width={barW - 2} height={h} fill={s.color} rx="2" />
                  <text x={x + barW / 2 - 1} y={y - 3} fontSize="10" textAnchor="middle" fill="#334155">{v}</text>
                </g>
              );
            })}
            <text x={gx + groupW / 2} y={padT + plotH + 16} fontSize="12" textAnchor="middle" fill="#334155">{cat}</text>
          </g>
        );
      })}
      <g transform={`translate(${padL + plotW + 12}, ${padT + 4})`}>
        {series.map((s, i) => (
          <g key={i} transform={`translate(0, ${i * 18})`}>
            <rect width="14" height="10" fill={s.color} rx="2" />
            <text x="20" y="9" fontSize="12" fill="#334155">{s.name}</text>
          </g>
        ))}
      </g>
      {yLabel && <text x={12} y={padT + plotH / 2} fontSize="11" fill="#64748b" transform={`rotate(-90, 12, ${padT + plotH / 2})`} textAnchor="middle">{yLabel}</text>}
    </svg>
  );
}

// ============ Scatter plot ============
export function ScatterPlot({ points = [], xMin = 0, xMax = 10, yMin = 0, yMax = 10, xLabel = '', yLabel = '' }) {
  const safe = (Array.isArray(points) ? points : []).filter((p) => p && Number.isFinite(p.x) && Number.isFinite(p.y));
  if (safe.length === 0) {
    return <div style={{ padding: 8, color: '#94a3b8', fontSize: 12 }}>[ScatterPlot — nincs adat]</div>;
  }
  points = safe;
  if (!Number.isFinite(xMin) || !Number.isFinite(xMax) || xMax <= xMin) { xMin = 0; xMax = 10; }
  if (!Number.isFinite(yMin) || !Number.isFinite(yMax) || yMax <= yMin) { yMin = 0; yMax = 10; }
  const W = 440, H = 320, padL = 50, padB = 46, padT = 16, padR = 16;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const xToPx = (x) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
  const yToPx = (y) => padT + plotH - ((y - yMin) / (yMax - yMin)) * plotH;
  const xTicks = [];
  const xStep = (xMax - xMin) / 5;
  for (let v = xMin; v <= xMax + 0.0001; v += xStep) xTicks.push(Math.round(v * 10) / 10);
  const yTicks = [];
  const yStep = (yMax - yMin) / 5;
  for (let v = yMin; v <= yMax + 0.0001; v += yStep) yTicks.push(Math.round(v * 10) / 10);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 520 }} role="img" aria-label="Pontdiagram">
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={padL + plotW} y1={yToPx(t)} y2={yToPx(t)} stroke="#e2e8f0" />
          <text x={padL - 6} y={yToPx(t) + 4} fontSize="10" textAnchor="end" fill="#64748b">{t}</text>
        </g>
      ))}
      {xTicks.map((t) => (
        <g key={t}>
          <line x1={xToPx(t)} x2={xToPx(t)} y1={padT} y2={padT + plotH} stroke="#f1f5f9" />
          <text x={xToPx(t)} y={padT + plotH + 14} fontSize="10" textAnchor="middle" fill="#64748b">{t}</text>
        </g>
      ))}
      <line x1={padL} x2={padL} y1={padT} y2={padT + plotH} stroke="#94a3b8" />
      <line x1={padL} x2={padL + plotW} y1={padT + plotH} y2={padT + plotH} stroke="#94a3b8" />
      {points.map((p, i) => (
        <circle key={i} cx={xToPx(p.x)} cy={yToPx(p.y)} r="5" fill="#2563eb" opacity="0.85" />
      ))}
      {xLabel && <text x={padL + plotW / 2} y={H - 6} fontSize="11" fill="#64748b" textAnchor="middle">{xLabel}</text>}
      {yLabel && <text x={14} y={padT + plotH / 2} fontSize="11" fill="#64748b" transform={`rotate(-90, 14, ${padT + plotH / 2})`} textAnchor="middle">{yLabel}</text>}
    </svg>
  );
}

// ============ Histogram ============
export function Histogram({ bins = [], bars, xLabel = '', yLabel = '' }) {
  // Accept either bins:[{range,mid,count}] or bars:[{label,value}]
  const source = bars && bars.length ? bars : bins.map((b) => ({ label: b.range ?? String(b.mid ?? b.label ?? ''), value: b.count ?? b.value ?? 0, color: b.color || '#2563eb' }));
  return <BarChart bars={source} xLabel={xLabel} yLabel={yLabel} yMin={0} />;
}

// ============ Dot plot ============
export function DotPlot({ values, dots, xMin, xMax, min, max, label = '', xLabel }) {
  // Normalize: if `dots:[{x,count}]` is given, convert; else use `values`
  let freq = {};
  if (dots && dots.length) {
    dots.forEach((d) => { freq[d.x] = (freq[d.x] || 0) + d.count; });
  } else if (values && values.length) {
    values.forEach((v) => { freq[v] = (freq[v] || 0) + 1; });
  }
  const keys = Object.keys(freq).map(Number).sort((a, b) => a - b);
  const mn = xMin ?? min ?? (keys.length ? Math.min(...keys) : 0);
  const mx = xMax ?? max ?? (keys.length ? Math.max(...keys) : 5);
  const allVals = [];
  for (let v = mn; v <= mx; v++) allVals.push(v);

  const W = 500, rowH = 18;
  const padL = 30, padR = 16, padT = 12;
  const freqVals = Object.values(freq);
  const maxFreq = freqVals.length ? Math.max(...freqVals) : 1;
  const H = padT + maxFreq * rowH + 38;
  const plotW = W - padL - padR;
  const step = plotW / (allVals.length - 1 || 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 560 }} role="img" aria-label="Pontdiagram">
      <line x1={padL} x2={padL + plotW} y1={H - 28} y2={H - 28} stroke="#94a3b8" strokeWidth="1.5" />
      {allVals.map((v, i) => {
        const x = padL + i * step;
        const count = freq[v] || 0;
        return (
          <g key={v}>
            <line x1={x} x2={x} y1={H - 28} y2={H - 24} stroke="#94a3b8" />
            <text x={x} y={H - 10} fontSize="11" textAnchor="middle" fill="#334155">{v}</text>
            {Array.from({ length: count }).map((_, k) => (
              <circle key={k} cx={x} cy={H - 32 - k * rowH} r="6.5" fill="#2563eb" />
            ))}
          </g>
        );
      })}
      {label && <text x={padL + plotW / 2} y={12} fontSize="12" textAnchor="middle" fill="#475569" fontWeight="600">{label}</text>}
    </svg>
  );
}
