import React from 'react';

// ============ Coordinate grid ============
export function CoordGrid({ xMin = -5, xMax = 5, yMin = -5, yMax = 5, points = [], lines = [] }) {
  if (!Number.isFinite(xMin) || !Number.isFinite(xMax) || xMax <= xMin) { xMin = -5; xMax = 5; }
  if (!Number.isFinite(yMin) || !Number.isFinite(yMax) || yMax <= yMin) { yMin = -5; yMax = 5; }
  const cell = 28;
  const W = (xMax - xMin) * cell + 60;
  const H = (yMax - yMin) * cell + 60;
  const ox = 30 + (-xMin) * cell;
  const oy = 30 + (yMax) * cell;
  const xToPx = (x) => ox + x * cell;
  const yToPx = (y) => oy - y * cell;

  const xs = [], ys = [];
  for (let v = xMin; v <= xMax; v++) xs.push(v);
  for (let v = yMin; v <= yMax; v++) ys.push(v);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: Math.max(320, W) }} role="img" aria-label="Koordináta-rendszer">
      {xs.map((v) => <line key={'vx'+v} x1={xToPx(v)} x2={xToPx(v)} y1={yToPx(yMax)} y2={yToPx(yMin)} stroke={v===0?'#94a3b8':'#e2e8f0'} strokeWidth={v===0?1.5:1}/>)}
      {ys.map((v) => <line key={'vy'+v} x1={xToPx(xMin)} x2={xToPx(xMax)} y1={yToPx(v)} y2={yToPx(v)} stroke={v===0?'#94a3b8':'#e2e8f0'} strokeWidth={v===0?1.5:1}/>)}
      {xs.filter((v) => v !== 0).map((v) => (
        <text key={'tx'+v} x={xToPx(v)} y={yToPx(0)+14} fontSize="10" textAnchor="middle" fill="#64748b">{v}</text>
      ))}
      {ys.filter((v) => v !== 0).map((v) => (
        <text key={'ty'+v} x={xToPx(0)-6} y={yToPx(v)+3} fontSize="10" textAnchor="end" fill="#64748b">{v}</text>
      ))}
      <polygon points={`${xToPx(xMax)+8},${yToPx(0)} ${xToPx(xMax)},${yToPx(0)-4} ${xToPx(xMax)},${yToPx(0)+4}`} fill="#94a3b8"/>
      <polygon points={`${xToPx(0)},${yToPx(yMax)-8} ${xToPx(0)-4},${yToPx(yMax)} ${xToPx(0)+4},${yToPx(yMax)}`} fill="#94a3b8"/>
      {lines.map((l, i) => (
        <line key={i} x1={xToPx(l.x1)} y1={yToPx(l.y1)} x2={xToPx(l.x2)} y2={yToPx(l.y2)} stroke={l.color||'#2563eb'} strokeWidth="2" strokeDasharray={l.dashed?'4 4':undefined}/>
      ))}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={xToPx(p.x)} cy={yToPx(p.y)} r="6" fill={p.color || '#ef4444'} stroke="white" strokeWidth="2"/>
          {p.label && <text x={xToPx(p.x)+10} y={yToPx(p.y)-8} fontSize="13" fontWeight="700" fill="#0f172a">{p.label}</text>}
        </g>
      ))}
    </svg>
  );
}

// ============ Number line ============
export function NumberLine({ min = 0, max = 10, divisions = 10, points = [] }) {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) { min = 0; max = 10; }
  if (!Number.isFinite(divisions) || divisions <= 0) divisions = 10;
  const W = 520, H = 90, padL = 30, padR = 30;
  const plotW = W - padL - padR;
  const xToPx = (v) => padL + ((v - min) / (max - min)) * plotW;
  const ticks = [];
  for (let i = 0; i <= divisions; i++) {
    const v = min + (i / divisions) * (max - min);
    ticks.push(v);
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 560 }} role="img" aria-label="Számegyenes">
      <line x1={padL-10} x2={W-padR+10} y1={40} y2={40} stroke="#334155" strokeWidth="2"/>
      <polygon points={`${W-padR+14},40 ${W-padR+6},36 ${W-padR+6},44`} fill="#334155"/>
      <polygon points={`${padL-14},40 ${padL-6},36 ${padL-6},44`} fill="#334155"/>
      {ticks.map((v, i) => (
        <g key={i}>
          <line x1={xToPx(v)} x2={xToPx(v)} y1={34} y2={46} stroke="#334155" strokeWidth={i===0||i===divisions?'2':'1'}/>
          {(i === 0 || i === divisions) && (
            <text x={xToPx(v)} y={62} fontSize="12" textAnchor="middle" fill="#475569">{v}</text>
          )}
        </g>
      ))}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={xToPx(p.x)} cy={40} r="6" fill="#ef4444" stroke="white" strokeWidth="2"/>
          <text x={xToPx(p.x)} y={24} fontSize="13" fontWeight="700" textAnchor="middle" fill="#ef4444">{p.label}</text>
        </g>
      ))}
    </svg>
  );
}

// ============ Scale (measuring) ============
export function Scale({ min = 0, max = 1000, step = 100, value, unit = '', label = '' }) {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) { min = 0; max = 1000; }
  if (!Number.isFinite(step) || step <= 0) step = (max - min) / 10;
  if (!Number.isFinite(value)) value = (min + max) / 2;
  const W = 460, H = 120, padL = 26, padR = 26;
  const plotW = W - padL - padR;
  const ticks = [];
  for (let v = min; v <= max; v += step) ticks.push(v);
  const xToPx = (v) => padL + ((v - min) / (max - min)) * plotW;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 520 }} role="img" aria-label="Skála">
      <rect x={padL-4} y={52} width={plotW+8} height={22} rx={3} fill="#f1f5f9" stroke="#94a3b8"/>
      {ticks.map((v, i) => (
        <g key={i}>
          <line x1={xToPx(v)} x2={xToPx(v)} y1={52} y2={74} stroke="#475569" strokeWidth={i%5===0?'2':'1'}/>
          <text x={xToPx(v)} y={92} fontSize="11" textAnchor="middle" fill="#334155">{v}</text>
        </g>
      ))}
      <polygon points={`${xToPx(value)},50 ${xToPx(value)-7},34 ${xToPx(value)+7},34`} fill="#ef4444"/>
      <text x={xToPx(value)} y={26} fontSize="13" fontWeight="700" textAnchor="middle" fill="#ef4444">{value} {unit}</text>
      {label && <text x={W/2} y={112} fontSize="11" textAnchor="middle" fill="#64748b">{label}</text>}
    </svg>
  );
}

// ============ Clock pair ============
export function ClockPair({ times = [] }) {
  return (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
      {times.map((t, i) => <Clock key={i} {...t} />)}
    </div>
  );
}
function Clock({ label, h, m }) {
  const r = 46, cx = 60, cy = 60;
  const hAng = ((h % 12) + m / 60) * 30 - 90;
  const mAng = m * 6 - 90;
  const rad = (d) => (d * Math.PI) / 180;
  const hx = cx + (r - 18) * Math.cos(rad(hAng));
  const hy = cy + (r - 18) * Math.sin(rad(hAng));
  const mx = cx + (r - 8) * Math.cos(rad(mAng));
  const my = cy + (r - 8) * Math.sin(rad(mAng));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg viewBox="0 0 120 120" width="120" height="120" role="img">
        <circle cx={cx} cy={cy} r={r} fill="white" stroke="#334155" strokeWidth="2"/>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = rad(i * 30 - 90);
          return <line key={i} x1={cx + (r-5)*Math.cos(a)} y1={cy + (r-5)*Math.sin(a)} x2={cx + r*Math.cos(a)} y2={cy + r*Math.sin(a)} stroke="#334155" strokeWidth="1.5"/>;
        })}
        <line x1={cx} y1={cy} x2={hx} y2={hy} stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round"/>
        <line x1={cx} y1={cy} x2={mx} y2={my} stroke="#334155" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx={cx} cy={cy} r="3" fill="#0f172a"/>
      </svg>
      <div style={{ fontSize: 12, color: '#475569' }}>{label}</div>
      <div style={{ fontWeight: 600, fontSize: 14 }}>{String(h).padStart(2,'0')}:{String(m).padStart(2,'0')}</div>
    </div>
  );
}

// ============ Timeline (events on a timeline) ============
export function Timeline({ events = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 520 }}>
      {events.map((e, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 12px',
          border: `2px solid ${e.color || '#cbd5e1'}`,
          borderRadius: 8,
          background: e.highlight ? '#fef3c7' : 'white',
        }}>
          <div style={{
            minWidth: 66, fontFamily: 'ui-monospace, monospace',
            fontWeight: 700, color: e.color || '#0f172a'
          }}>{e.t}</div>
          <div style={{ color: '#334155' }}>{e.label}</div>
        </div>
      ))}
    </div>
  );
}

// ============ Timeline years (periodic events) ============
export function TimelineYears({ start, end, series = [] }) {
  const W = 560, padL = 40, padR = 20, rowH = 40;
  const years = end - start + 1;
  const colW = (W - padL - padR) / (years - 1);
  const H = rowH * series.length + 46;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 620 }} role="img">
      {Array.from({ length: years }).map((_, i) => (
        <g key={i}>
          <line x1={padL + i*colW} x2={padL + i*colW} y1={18} y2={H-18} stroke="#f1f5f9"/>
          {i % 2 === 0 && <text x={padL+i*colW} y={H-4} fontSize="10" textAnchor="middle" fill="#64748b">{start+i}</text>}
        </g>
      ))}
      {series.map((s, si) => {
        const y = 30 + si * rowH;
        return (
          <g key={si}>
            <text x={6} y={y+4} fontSize="11" fill="#334155">{s.label}</text>
            <line x1={padL} x2={W-padR} y1={y} y2={y} stroke="#cbd5e1"/>
            {Array.from({ length: years }).map((_, i) => {
              if ((i % s.step) === 0) {
                return <circle key={i} cx={padL + i*colW} cy={y} r="5.5" fill={s.color} stroke="white" strokeWidth="1.5"/>;
              }
              return null;
            })}
          </g>
        );
      })}
    </svg>
  );
}

// ============ Compass ============
export function Compass({ center = '•', points = [] }) {
  const cx = 120, cy = 120, r = 92;
  const dirMap = {
    N: [0, -1], NE: [0.707, -0.707], E: [1, 0], SE: [0.707, 0.707],
    S: [0, 1], SW: [-0.707, 0.707], W: [-1, 0], NW: [-0.707, -0.707],
  };
  return (
    <svg viewBox="0 0 240 240" width="240" height="240" role="img" aria-label="Iránytű">
      <circle cx={cx} cy={cy} r={r} fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5"/>
      <circle cx={cx} cy={cy} r="4" fill="#0f172a"/>
      <text x={cx} y={cy-r-4} fontSize="13" fontWeight="700" fill="#ef4444" textAnchor="middle">É</text>
      <text x={cx} y={cy+r+14} fontSize="13" fontWeight="600" fill="#334155" textAnchor="middle">D</text>
      <text x={cx-r-8} y={cy+4} fontSize="13" fontWeight="600" fill="#334155" textAnchor="end">Ny</text>
      <text x={cx+r+8} y={cy+4} fontSize="13" fontWeight="600" fill="#334155" textAnchor="start">K</text>
      <text x={cx} y={cy+4} fontSize="12" fontWeight="600" textAnchor="middle" fill="#0f172a">{center}</text>
      {points.map((p, i) => {
        const d = dirMap[p.direction];
        if (!d) return null;
        const px = cx + d[0] * 60, py = cy + d[1] * 60;
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={px} y2={py} stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3"/>
            <circle cx={px} cy={py} r="10" fill="#2563eb"/>
            <text x={px} y={py+4} fontSize="12" fontWeight="700" textAnchor="middle" fill="white">{p.label}</text>
          </g>
        );
      })}
    </svg>
  );
}
