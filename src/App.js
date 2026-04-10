import React, { useState, useEffect } from "react";

/* ─── TOKENS ─────────────────────────────────────────────── */
const CREAM   = "#D8D4CC";
const PAPER   = "#E6E2DA";
const INK     = "#101111";
const DIM     = "#7A7570";
const RULE    = "#C8C4BC";
const ACCENT  = "#154230";
const MUTED   = "#5C5248";
const BURGUNDY = "#5D1E21";
const GOLD    = "#A6824A";

const SERIF = "'Cormorant Garamond', 'Georgia', serif";
const MONO  = "'DM Mono', 'Courier New', monospace";

/* ─── FONTS ──────────────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ─── ATOMS ──────────────────────────────────────────────── */

const HRule = ({ slim }) => (
  <div style={{
    height: 1,
    background: RULE,
    margin: slim ? "16px 0" : "28px 0",
  }} />
);

function FieldLabel({ children, required }) {
  return (
    <div style={{
      fontFamily: MONO, fontSize: 9, letterSpacing: 2.5,
      color: DIM, textTransform: "uppercase", marginBottom: 8,
      display: "flex", alignItems: "center", gap: 6,
    }}>
      {children}
      {required && <span style={{ color: ACCENT, fontSize: 12 }}>*</span>}
    </div>
  );
}

const baseField = {
  width: "100%", boxSizing: "border-box",
  background: CREAM,
  border: `1px solid ${RULE}`,
  borderBottom: `1.5px solid #C8BFB5`,
  color: INK,
  padding: "11px 14px",
  fontSize: 14,
  fontFamily: "'DM Mono', 'Courier New', monospace",
  outline: "none",
  borderRadius: 0,
  transition: "border-color 0.15s, background 0.15s",
};

function Input({ label, type = "text", value, onChange, placeholder, required }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ marginBottom: 22 }}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          ...baseField,
          background: focus ? "#fff" : CREAM,
          borderColor: focus ? ACCENT : RULE,
          borderBottomColor: focus ? ACCENT : "#C8BFB5",
        }}
      />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, required, rows = 4 }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ marginBottom: 22 }}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          ...baseField,
          background: focus ? "#fff" : CREAM,
          borderColor: focus ? ACCENT : RULE,
          borderBottomColor: focus ? ACCENT : "#C8BFB5",
          resize: "vertical",
        }}
      />
    </div>
  );
}

function Select({ label, value, onChange, options, required }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ marginBottom: 22 }}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          ...baseField,
          background: focus ? "#fff" : CREAM,
          borderColor: focus ? ACCENT : RULE,
          borderBottomColor: focus ? ACCENT : "#C8BFB5",
          color: value ? INK : DIM,
          appearance: "none",
          cursor: "pointer",
        }}
      >
        <option value="" style={{ color: DIM }}>— select —</option>
        {options.map(o => <option key={o} value={o} style={{ color: INK }}>{o}</option>)}
      </select>
    </div>
  );
}

function Chips({ label, value, onChange, options, required, multi }) {
  const toggle = (o) => {
    if (!multi) { onChange(o); return; }
    const arr = Array.isArray(value) ? value : [];
    onChange(arr.includes(o) ? arr.filter(x => x !== o) : [...arr, o]);
  };
  const isActive = (o) => multi ? (Array.isArray(value) && value.includes(o)) : value === o;

  return (
    <div style={{ marginBottom: 22 }}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map(o => {
          const active = isActive(o);
          return (
            <button key={o} onClick={() => toggle(o)} style={{
              padding: "7px 16px",
              fontFamily: MONO, fontSize: 11, letterSpacing: 1,
              background: active ? INK : "transparent",
              color: active ? PAPER : MUTED,
              border: `1px solid ${active ? INK : RULE}`,
              cursor: "pointer",
              transition: "all 0.15s",
            }}>
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label style={{ display: "flex", gap: 14, cursor: "pointer", marginBottom: 16, alignItems: "flex-start" }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 15, height: 15, flexShrink: 0, marginTop: 3,
          border: `1.5px solid ${checked ? ACCENT : RULE}`,
          background: checked ? ACCENT : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all 0.15s",
        }}
      >
        {checked && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
      </div>
      <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.7 }}>{label}</span>
    </label>
  );
}

function Btn({ onClick, disabled, children, ghost }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "12px 28px",
        fontFamily: MONO, fontSize: 11, letterSpacing: 3,
        textTransform: "uppercase",
        background: ghost ? "transparent" : hover && !disabled ? "#1E5C40" : ACCENT,
        color: ghost ? (hover ? INK : DIM) : "#fff",
        border: ghost ? `1px solid ${RULE}` : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        transition: "all 0.15s",
      }}
    >
      {children}
    </button>
  );
}

/* ─── PROGRESS ───────────────────────────────────────────── */
function Progress({ current, total }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 2,
            background: i < current ? ACCENT : RULE,
            transition: "background 0.3s",
          }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: MONO, fontSize: 9, color: DIM, letterSpacing: 2 }}>
          {String(current).padStart(2,"0")} / {String(total).padStart(2,"0")}
        </span>
        <span style={{ fontFamily: MONO, fontSize: 9, color: DIM, letterSpacing: 2 }}>
          {Math.round((current / total) * 100)}%
        </span>
      </div>
    </div>
  );
}

/* ─── CALLOUT ────────────────────────────────────────────── */
function Callout({ children }) {
  return (
    <div style={{
      background: CREAM,
      border: `1px solid ${RULE}`,
      borderLeft: `3px solid ${ACCENT}`,
      padding: "12px 16px",
      marginBottom: 22,
      fontFamily: MONO, fontSize: 11,
      color: MUTED, lineHeight: 1.8,
    }}>
      {children}
    </div>
  );
}

/* ─── STEP HEADER ────────────────────────────────────────── */
function StepHeader({ number, total, title, sub }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: MONO, fontSize: 9, color: DIM, letterSpacing: 3, marginBottom: 6 }}>
        STEP {String(number).padStart(2,"0")} OF {String(total).padStart(2,"0")}
      </div>
      <div style={{
        fontFamily: SERIF, fontSize: 32, fontWeight: 600,
        color: INK, lineHeight: 1.1, marginBottom: 6,
      }}>
        {title}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 11, color: DIM, letterSpacing: 1 }}>
        {sub}
      </div>
    </div>
  );
}

/* ─── IMAGE UPLOAD ───────────────────────────────────────── */
function ImageUpload({ label, value = [], onChange }) {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onChange(prev => {
          const current = Array.isArray(prev) ? prev : [];
          return [...current, { name: file.name, src: ev.target.result }];
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const remove = (i) => onChange(prev => prev.filter((_, idx) => idx !== i));

  return (
    <div style={{ marginBottom: 22 }}>
      <FieldLabel>{label}</FieldLabel>
      <label style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 10, padding: "16px",
        border: `1.5px dashed ${RULE}`,
        background: CREAM,
        cursor: "pointer", transition: "border-color 0.15s",
        fontFamily: MONO, fontSize: 11, color: DIM, letterSpacing: 1,
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = ACCENT}
        onMouseLeave={e => e.currentTarget.style.borderColor = RULE}
      >
        <span style={{ fontSize: 18 }}>↑</span>
        <span>UPLOAD IMAGE(S)</span>
        <input type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: "none" }} />
      </label>

      {value.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
          {value.map((img, i) => (
            <div key={i} style={{ position: "relative" }}>
              <img src={img.src} alt={img.name} style={{
                width: 80, height: 80, objectFit: "cover",
                border: `1px solid ${RULE}`,
              }} />
              <button onClick={() => remove(i)} style={{
                position: "absolute", top: -6, right: -6,
                width: 18, height: 18,
                background: ACCENT, border: "none", color: "#fff",
                fontSize: 10, cursor: "pointer", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, lineHeight: 1,
              }}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── STEPS DEFINITION ───────────────────────────────────── */
const STEPS = [
  { title: "Contact",      sub: "How do we reach you"           },
  { title: "Your Piece",   sub: "What are you getting"          },
  { title: "References",   sub: "Show us your direction"        },
  { title: "Dimensions",   sub: "Size and placement"            },
  { title: "Health",       sub: "A few safety questions"        },
  { title: "Schedule",     sub: "When works for you"            },
  { title: "Confirm",      sub: "Review and lock your slot"     },
];

/* ─── MAIN FORM ──────────────────────────────────────────── */
function BookingForm({ onReset }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [f, setF] = useState({
    name: "", via: "Instagram", contact: "",
    description: "",
    refImages: [], refLink: "", refNotes: "",
    size: "", placement: "", placementDetail: "",
    budget: "",
    firstTattoo: "", skinNotes: "",
    date: "", time: "", payment: "",
    deposit: false, terms: false,
  });
  const set = k => v => setF(p => ({ ...p, [k]: typeof v === "function" ? v(p[k]) : v }));

  const valid = () => {
    if (step === 0) return f.name && f.contact;
    if (step === 1) return f.description.length > 15;
    if (step === 3) return f.size && f.placement;
    if (step === 4) return f.firstTattoo;
    if (step === 5) return f.date;
    if (step === 6) return f.deposit && f.terms;
    return true;
  };

  if (done) return <Success name={f.name} onReset={onReset} />;

  return (
    <div>
      <Progress current={step + 1} total={STEPS.length} />
      <StepHeader number={step + 1} total={STEPS.length} title={STEPS[step].title} sub={STEPS[step].sub} />
      <HRule slim />

      {/* ── Step 0: Contact ── */}
      {step === 0 && <>
        <Input label="Full name" value={f.name} onChange={set("name")} placeholder="Your name" required />
        <Chips label="Preferred contact" value={f.via} onChange={set("via")} options={["Instagram", "WhatsApp", "Phone", "Email"]} />
        <Input
          label={f.via === "Email" ? "Email address" : f.via === "WhatsApp" ? "WhatsApp number" : f.via === "Phone" ? "Phone number" : "Instagram handle"}
          value={f.contact} onChange={set("contact")}
          placeholder={f.via === "Email" ? "you@email.com" : f.via === "WhatsApp" || f.via === "Phone" ? "+63 number" : "@yourhandle"}
          required
        />
      </>}

      {/* ── Step 1: Your Piece ── */}
      {step === 1 && <>
        <Textarea
          label="Describe your tattoo"
          value={f.description} onChange={set("description")} rows={6} required
          placeholder="Subject, style, mood, symbols, meaning. What you definitely want. What you don't want. The more detail, the better the result."
        />
        <div style={{ fontFamily: MONO, fontSize: 10, color: f.description.length >= 15 ? ACCENT : DIM, marginTop: -14, marginBottom: 16, letterSpacing: 1 }}>
          {f.description.length < 15
            ? `${15 - f.description.length} more characters needed`
            : "✓ good to go"}
        </div>
      </>}

      {/* ── Step 2: References ── */}
      {step === 2 && <>
        <ImageUpload label="Upload reference image(s) (optional)" value={f.refImages} onChange={set("refImages")} />
        <Input label="Or share a link (optional)" value={f.refLink} onChange={set("refLink")}
          placeholder="Pinterest board, Google Drive, or Instagram link" />
        <Callout>
          Share <strong>style references</strong> — how you want it to look — not just subject references. Search "black and grey engraving tattoo", "ornamental fine line tattoo", "prison style tattoo", or "dot work tattoo" on Pinterest to find the right direction.
        </Callout>
        <Textarea label="What do you like about your references? (optional)" value={f.refNotes} onChange={set("refNotes")} rows={3}
          placeholder="E.g. Love the thick outlines. Don't want any grey wash or colour fill." />
      </>}

      {/* ── Step 3: Dimensions ── */}
      {step === 3 && <>
        <Chips label="Approximate size" value={f.size} onChange={set("size")} required
          options={['Small (< 3")', 'Medium (3–5")', 'Large (5–8")', 'Sleeve / XL']} />
        <Select label="Body placement" value={f.placement} onChange={set("placement")} required
          options={["Forearm", "Upper arm", "Shoulder", "Chest", "Back", "Ribs", "Hand / Fingers", "Leg", "Calf / Ankle", "Neck", "Other"]} />
        <Textarea label="Describe placement more precisely (optional)" value={f.placementDetail} onChange={set("placementDetail")} rows={2}
          placeholder="E.g. Inner left forearm, starting 2 inches above the wrist" />
        <HRule slim />
        <Select label="Budget range (₱)" value={f.budget} onChange={set("budget")}
          options={["₱2,000–₱3,500", "₱3,500–₱6,000", "₱6,000–₱10,000", "₱10,000–₱20,000", "₱20,000+", "I'd like a quote first"]} />
        <div style={{ fontFamily: MONO, fontSize: 10, color: MUTED, letterSpacing: 1, marginTop: -14, marginBottom: 22, lineHeight: 1.6 }}>
          Minimum charge is ₱2,000. Final price depends on size, complexity, and placement.
        </div>
      </>}

      {/* ── Step 4: Health ── */}
      {step === 4 && <>
        <Chips label="Is this your first tattoo?" value={f.firstTattoo} onChange={set("firstTattoo")} required
          options={["Yes, first one", "No, I have others"]} />
        <Textarea label="Skin conditions or health notes" value={f.skinNotes} onChange={set("skinNotes")} rows={3}
          placeholder="Keloid tendency, allergies, diabetes, blood thinners, recent sun exposure on the area, etc. Leave blank if none." />
        <Callout>
          This information is confidential and used only to ensure your safety and the best possible healing outcome.
        </Callout>
      </>}

      {/* ── Step 5: Schedule ── */}
      {step === 5 && <>
        <Input label="Preferred date" type="date" value={f.date} onChange={set("date")} required />
        <Chips label="Preferred time" value={f.time} onChange={set("time")}
          options={["Morning (9–12)", "Afternoon (12–4)", "Evening (4–7)", "Flexible"]} />
        <Select label="Payment preference" value={f.payment} onChange={set("payment")}
          options={["GCash", "Cash (₱)", "Maya", "Bank transfer"]} />
      </>}

      {/* ── Step 6: Confirm ── */}
      {step === 6 && <>
        {/* Summary */}
        <div style={{ background: CREAM, border: `1px solid ${RULE}`, padding: 20, marginBottom: 24 }}>
          <div style={{ fontFamily: MONO, fontSize: 9, color: DIM, letterSpacing: 3, marginBottom: 14 }}>BOOKING SUMMARY</div>
          {[
            ["Name",        f.name],
            ["Contact",     `${f.via}: ${f.contact}`],
            ["Size",        f.size],
            ["Placement",   f.placement],
            ["Budget",      f.budget || "Quote requested"],
            ["References",  f.refImages.length > 0 ? `${f.refImages.length} image(s) uploaded` : f.refLink || "None"],
            ["Date",        f.date],
            ["Time",        f.time || "Flexible"],
            ["Payment",     f.payment || "TBD"],
          ].filter(([,v]) => v).map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, gap: 16 }}>
              <span style={{ fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: 1, flexShrink: 0 }}>{k.toUpperCase()}</span>
              <span style={{ fontFamily: MONO, fontSize: 11, color: INK, textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Deposit policy */}
        <div style={{ border: `1px solid ${RULE}`, padding: 20, marginBottom: 16 }}>
          <div style={{ fontFamily: MONO, fontSize: 9, color: ACCENT, letterSpacing: 3, marginBottom: 12 }}>DEPOSIT / DOWNPAYMENT</div>
          <p style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 2, margin: "0 0 12px" }}>
            A downpayment of <span style={{ color: INK, fontWeight: 600 }}>30% of the final cost</span> is required to secure your booking.
            Once paid, it covers drawing and design work, and is <span style={{ color: INK }}>deducted from your total upon completion</span>.
          </p>
          <div style={{ height: 1, background: RULE, margin: "12px 0" }} />
          <ul style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 2.2, margin: 0, paddingLeft: 18 }}>
            <li><span style={{ color: BURGUNDY }}>Non-refundable and non-transferable.</span></li>
            <li>Deposit is <span style={{ color: BURGUNDY }}>forfeited</span> in the event of a no-show or last-minute cancellation.</li>
            <li>Deposits expire after <span style={{ color: INK }}>6 months</span> if unused.</li>
          </ul>
        </div>

        <div style={{ border: `1px solid ${RULE}`, padding: 20, marginBottom: 24 }}>
          <div style={{ fontFamily: MONO, fontSize: 9, color: ACCENT, letterSpacing: 3, marginBottom: 12 }}>RESCHEDULING</div>
          <p style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 2, margin: 0 }}>
            Rescheduling is allowed <span style={{ color: INK }}>once only</span>. Please give at least <span style={{ color: INK }}>48 hours' notice</span> before your session so the artist can ensure you get rebooked.
            Requests made within 48 hours of your appointment are treated as a cancellation — <span style={{ color: BURGUNDY }}>the deposit will be forfeited</span>.
          </p>
        </div>

        <HRule slim />
        <Checkbox checked={f.deposit} onChange={set("deposit")}
          label="I have read and accept the deposit, cancellation, and rescheduling policy. I understand the downpayment is 30% of my final cost, non-refundable, and non-transferable." />
        <Checkbox checked={f.terms} onChange={set("terms")}
          label="I confirm I am 18 years or older. I understand tattoos are permanent and that final designs may vary from references. Isla Ink reserves the right to decline any design." />
      </>}

      <HRule />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {step > 0
          ? <Btn ghost onClick={() => setStep(s => s - 1)}>← Back</Btn>
          : <div />}
        {step < STEPS.length - 1
          ? <Btn onClick={() => setStep(s => s + 1)} disabled={!valid()}>Continue →</Btn>
          : <Btn onClick={() => setDone(true)} disabled={!valid()}>Submit booking</Btn>}
      </div>
    </div>
  );
}

/* ─── SUCCESS ────────────────────────────────────────────── */
function Success({ name, onReset }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{
        fontFamily: SERIF, fontSize: 64, color: ACCENT,
        lineHeight: 1, marginBottom: 20, fontStyle: "italic",
      }}>✓</div>
      <div style={{
        fontFamily: SERIF, fontSize: 34, fontWeight: 600,
        color: INK, letterSpacing: 1, marginBottom: 8,
      }}>
        Booking received
      </div>
      <HRule />
      <p style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 2, margin: "0 0 28px" }}>
        Thank you, <span style={{ color: INK }}>{name}</span>.<br />
        Isla will review your submission and reach out<br />
        within 24–48 hours to confirm availability.
      </p>
      <div style={{ fontFamily: MONO, fontSize: 9, color: DIM, letterSpacing: 3, marginBottom: 8 }}>
        FOLLOW FOR FLASH DROPS & OPEN SLOTS
      </div>
      <div style={{
        fontFamily: SERIF, fontSize: 22, fontStyle: "italic",
        color: ACCENT, letterSpacing: 1,
      }}>
        @isla_ink.co
      </div>
    </div>
  );
}

/* ─── LANDING ────────────────────────────────────────────── */
function Landing({ onStart }) {
  return (
    <div>
      {/* Logo block */}
      <div style={{ marginBottom: 36, borderBottom: `1px solid ${RULE}`, paddingBottom: 32 }}>
        <div style={{ fontFamily: MONO, fontSize: 9, color: DIM, letterSpacing: 4, marginBottom: 16 }}>
          SBMA · OLONGAPO · PHILIPPINES
        </div>
        <div style={{
          fontFamily: SERIF, fontSize: 58, fontWeight: 700,
          color: INK, lineHeight: 0.95, letterSpacing: -1,
        }}>
          Isla<br />
          <span style={{ color: ACCENT, fontStyle: "italic" }}>Ink.</span>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: 3, marginTop: 16 }}>
          BLACK & GREY · ENGRAVING · FINE & BOLD LINEWORK · ORNAMENTAL · PRISON TATS · DOT WORK
        </div>
      </div>

      {/* Intro */}
      <p style={{
        fontFamily: SERIF, fontSize: 18, fontStyle: "italic",
        color: MUTED, lineHeight: 1.7, marginBottom: 32,
      }}>
        Custom tattoos, designed for you. Fill out this form and Isla will be in touch to confirm your appointment.
      </p>

      <button
        onClick={onStart}
        style={{
          width: "100%", padding: "18px 24px",
          background: INK, color: PAPER,
          border: "none", cursor: "pointer",
          fontFamily: MONO, fontSize: 12,
          letterSpacing: 3, textTransform: "uppercase",
          transition: "background 0.15s",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#1E5C40"}
        onMouseLeave={e => e.currentTarget.style.background = INK}
      >
        <span>Book your appointment</span>
        <span>→</span>
      </button>

      <HRule />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {[
          ["Style",    "Black & grey · Engraving · Fine & bold linework · Ornamental · Prison Tats · Dot work"],
          ["Location", "SBMA, Olongapo"],
          ["Walk-ins", "Subject to availability"],
          ["Payment",  "GCash · Cash · Maya"],
        ].map(([k, v]) => (
          <div key={k}>
            <div style={{ fontFamily: MONO, fontSize: 9, color: DIM, letterSpacing: 2, marginBottom: 4 }}>{k.toUpperCase()}</div>
            <div style={{ fontFamily: SERIF, fontSize: 14, color: MUTED, lineHeight: 1.4 }}>{v}</div>
          </div>
        ))}
      </div>

      <HRule />
      <p style={{ fontFamily: MONO, fontSize: 9, color: DIM, lineHeight: 2, margin: 0, letterSpacing: 1 }}>
        BY PROCEEDING YOU CONFIRM YOU ARE 18 YEARS OR OLDER.
      </p>
    </div>
  );
}

/* ─── ROOT ───────────────────────────────────────────────── */
export default function App() {
  useFonts();
  const [started, setStarted] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#CCC8C0",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "40px 16px 80px",
    }}>
      <div style={{
        width: "100%", maxWidth: 480,
        background: PAPER,
        borderTop: `3px solid ${ACCENT}`,
        padding: "36px 32px",
        boxShadow: "0 4px 6px #0000000a, 0 20px 48px #00000012",
      }}>
        {!started
          ? <Landing onStart={() => setStarted(true)} />
          : <BookingForm onReset={() => setStarted(false)} />}
      </div>
    </div>
  );
}
