/* Sizing specimens. Everything renders the real token and then
   measures itself with getBoundingClientRect, so a number shown
   here is a number the browser actually produced. */
import React, { useEffect, useRef, useState } from 'react';

function useMeasured<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setBox({ w: Math.round(r.width), h: Math.round(r.height) });
  }, []);
  return [ref, box] as const;
}

/* ---- BASE SCALE ------------------------------------------- */
const SCALE: [string, number, string][] = [
  ['3', 12, 'smallest icon'], ['4', 16, 'icon in a compact control'],
  ['5', 20, 'default icon'],  ['6', 24, 'xs control, xs avatar'],
  ['7', 28, 'reserved'],      ['8', 32, 'sm control, sm avatar'],
  ['10', 40, 'DEFAULT control, md avatar'], ['11', 44, 'touch target'],
  ['12', 48, 'lg control, toolbar'], ['14', 56, 'xl control, mobile header'],
  ['16', 64, 'header, lg avatar'], ['20', 80, 'xl avatar'],
  ['24', 96, 'thumbnail'], ['32', 128, 'collapsed sidebar'],
];

export function SizeScale() {
  return (
    <div className="szscale sb-unstyled">
      {SCALE.map(([n, px, use]) => (
        <div key={n} className="szscale__row">
          <code className="szscale__name">--size-{n}</code>
          <code className="szscale__px">{px}px</code>
          <div className="szscale__bar" style={{ width: px, height: 14 }} />
          <span className="szscale__use">{use}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- CONTROLS — real buttons and inputs at every size ------ */
const CONTROLS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export function ControlSizes({ kind = 'button' }: { kind?: 'button' | 'input' | 'icon' }) {
  return (
    <div className="ctrls sb-unstyled">
      {CONTROLS.map((s) => <ControlOne key={s} size={s} kind={kind} />)}
    </div>
  );
}

function ControlOne({ size, kind }: { size: string; kind: string }) {
  const [ref, box] = useMeasured<HTMLDivElement>();
  const style: React.CSSProperties = {
    minHeight: `var(--control-height-${size})`,
    paddingInline: kind === 'icon' ? 0 : `var(--control-padding-${size})`,
    width: kind === 'icon' ? `var(--control-height-${size})` : undefined,
  };
  return (
    <div className="ctrls__cell">
      {kind === 'input' ? (
        <div ref={ref} className="szinput" style={style}>Udaipur</div>
      ) : (
        <div ref={ref} className="szbtn" style={style}>
          <span className="szicon" style={{ width: `var(--icon-size-${size})`, height: `var(--icon-size-${size})` }} />
          {kind !== 'icon' && <span>Search</span>}
        </div>
      )}
      <code className="ctrls__lbl">{size}</code>
      <code className="ctrls__dim">{box ? `${box.h}px` : ''}</code>
    </div>
  );
}

/* ---- ICONS AND AVATARS ------------------------------------- */
export function IconSizes() {
  return (
    <div className="icons sb-unstyled">
      {['xs', 'sm', 'md', 'lg', 'xl'].map((s) => (
        <div key={s} className="icons__cell">
          <span className="szicon szicon--solo"
                style={{ width: `var(--icon-size-${s})`, height: `var(--icon-size-${s})` }} />
          <code className="icons__lbl">{s}</code>
        </div>
      ))}
    </div>
  );
}

export function AvatarSizes() {
  return (
    <div className="icons sb-unstyled">
      {['xs', 'sm', 'md', 'lg', 'xl'].map((s) => (
        <div key={s} className="icons__cell">
          <span className="szavatar"
                style={{ width: `var(--avatar-size-${s})`, height: `var(--avatar-size-${s})` }}>A</span>
          <code className="icons__lbl">{s}</code>
        </div>
      ))}
    </div>
  );
}

/* ---- ASPECT RATIOS ----------------------------------------- */
const RATIOS: [string, string][] = [
  ['ratio-1-1', 'Avatars, map tiles, thumbnails'],
  ['ratio-4-3', 'Property photography'],
  ['ratio-3-2', 'Destination cards'],
  ['ratio-16-9', 'Video, hero banners'],
  ['ratio-2-1', 'Wide promo strips'],
];

export function RatioGrid() {
  return (
    <div className="ratios sb-unstyled">
      {RATIOS.map(([cls, use]) => (
        <div key={cls} className="ratios__cell">
          <div className={`ratios__box ${cls}`}><code>{cls.replace('ratio-', '').replace(/-/g, ':')}</code></div>
          <span className="ratios__use">{use}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- CONTAINERS -------------------------------------------- */
const CONTAINERS: [string, number][] = [
  ['sm', 640], ['md', 768], ['lg', 1024], ['xl', 1200], ['2xl', 1440],
];

export function ContainerBars() {
  return (
    <div className="conts sb-unstyled">
      {CONTAINERS.map(([n, px]) => (
        <div key={n} className="conts__row">
          <code className="conts__name">--container-{n}</code>
          <code className="conts__px">{px}px</code>
          <div className="conts__bar" style={{ width: `${(px / 1440) * 100}%` }} />
        </div>
      ))}
    </div>
  );
}

/* ---- TOUCH TARGETS ------------------------------------------
   The visible control and its hit area are different things. A
   24px icon button can still carry a 44px target by growing its
   padding, and that is nearly always the right fix. */
export function TouchTargets() {
  const rows: [string, number, number, string][] = [
    ['AA floor', 24, 24, 'SC 2.5.8 — the absolute minimum'],
    ['Comfortable', 24, 44, 'A 24px glyph with a 44px hit area'],
    ['Primary', 32, 48, 'Main actions on a phone'],
  ];
  return (
    <div className="touch sb-unstyled">
      {rows.map(([lbl, dot, hit, note]) => (
        <div key={lbl} className="touch__cell">
          <div className="touch__hit" style={{ width: hit, height: hit }}>
            <span className="touch__dot" style={{ width: dot, height: dot }} />
          </div>
          <code className="touch__lbl">{lbl} · {hit}px</code>
          <span className="touch__lbl">{note}</span>
        </div>
      ))}
    </div>
  );
}
